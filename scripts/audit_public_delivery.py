#!/usr/bin/env python3
"""Read-only live app-ads/AASA audit. Never modifies the deployed files."""
import argparse
import hashlib
import json
import ssl
from datetime import datetime, timezone
import urllib.error
import urllib.parse
import urllib.request
from urllib.robotparser import RobotFileParser

EXPECTED = b"google.com, pub-9100319027189512, DIRECT, f08c47fec0942fa0\n"
AGENTS = {
    "normal": "Mozilla/5.0 JMApps-ReadOnly-Acceptance/1.0",
    "Googlebot": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mediapartners-Google": "Mediapartners-Google",
    "Google-adstxt": "Google-adstxt",
}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def fetch(url, method, agent, context):
    opener = urllib.request.build_opener(NoRedirect(), urllib.request.HTTPSHandler(context=context))
    chain = []
    for _ in range(6):
        request = urllib.request.Request(url, method=method, headers={"User-Agent": agent})
        try:
            response = opener.open(request, timeout=20)
        except urllib.error.HTTPError as error:
            response = error
        except urllib.error.URLError as error:
            return {"chain": chain, "error": str(error.reason)}
        with response:
            body = response.read()
            headers = {k.lower(): v for k, v in response.headers.items()}
            chain.append({"url": url, "status": response.status, "headers": {
                k: v for k, v in headers.items() if k in {
                    "content-type", "content-length", "location", "content-disposition",
                    "server", "cache-control", "age", "etag", "last-modified", "x-cache",
                    "www-authenticate", "content-encoding", "via"
                }
            }})
            if response.status in (301, 302, 303, 307, 308) and "location" in headers:
                url = urllib.parse.urljoin(url, headers["location"])
                continue
            return {"chain": chain, "body": body}
    return {"chain": chain, "error": "redirect_limit"}


def body_evidence(body):
    try:
        decoded = body.decode("utf-8", errors="strict")
        utf8 = True
    except UnicodeError:
        decoded, utf8 = "", False
    return {
        "length": len(body), "sha256": hashlib.sha256(body).hexdigest(),
        "hex": body.hex(), "utf8": utf8, "bom": body.startswith(b"\xef\xbb\xbf"),
        "crlf": body.count(b"\r\n"), "lf": body.count(b"\n"),
        "final_newline": body.endswith(b"\n"), "exact_expected": body == EXPECTED,
        "non_ascii_or_control": [i for i, byte in enumerate(body) if byte > 126 or byte < 32 and byte != 10],
        "html": "<html" in decoded.lower() or "<!doctype" in decoded.lower(),
    }


def audit(context):
    result = {"checked_at": datetime.now(timezone.utc).isoformat(), "app_ads": [], "robots": [], "aasa": []}
    for base in ["https://jm-apps.de", "http://jm-apps.de", "https://www.jm-apps.de", "http://www.jm-apps.de"]:
        for name, agent in AGENTS.items():
            for method in ["GET", "HEAD"]:
                value = fetch(base + "/app-ads.txt", method, agent, context)
                body = value.pop("body", None)
                if body is not None and method == "GET": value["bytes"] = body_evidence(body)
                result["app_ads"].append({"url": base + "/app-ads.txt", "agent": name, "method": method, **value})
    for name, agent in AGENTS.items():
        value = fetch("https://jm-apps.de/robots.txt", "GET", agent, context)
        raw = value.pop("body", b"").decode("utf-8")
        robots = RobotFileParser()
        robots.parse(raw.splitlines())
        reachable = bool(value["chain"]) and value["chain"][-1]["status"] == 200 and "error" not in value
        result["robots"].append({"agent": name, **value, "text": raw, "app_ads_allowed": robots.can_fetch(name, "https://jm-apps.de/app-ads.txt") if reachable else None})
    for path in ["/.well-known/apple-app-site-association", "/apple-app-site-association"]:
        for method in ["GET", "HEAD"]:
            value = fetch("https://jm-apps.de" + path, method, AGENTS["normal"], context)
            body = value.pop("body", None)
            if body is not None and method == "GET":
                value["body_sha256"] = hashlib.sha256(body).hexdigest()
                try:
                    value["json"] = json.loads(body)
                except (ValueError, UnicodeError): value["json_error"] = True
            result["aasa"].append({"path": path, "method": method, **value})
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", required=True)
    parser.add_argument("--ca-file")
    args = parser.parse_args()
    result = audit(ssl.create_default_context(cafile=args.ca_file))
    with open(args.output, "w") as output: json.dump(result, output, indent=2)
    for row in result["app_ads"]:
        print(row["url"], row["agent"], row["method"], [x["status"] for x in row["chain"]], row.get("bytes", {}).get("exact_expected", "HEAD"), row.get("error", ""))
    for row in result["aasa"]:
        final = row["chain"][-1] if row["chain"] else {}
        print("AASA", row["path"], row["method"], final.get("headers", {}).get("content-type"), row.get("error", ""))

#!/usr/bin/env python3
"""Offline deployment-package validator. It never performs a network request."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CANDIDATES = ROOT / "docs/sprint-2026-09-24/domain-candidates"
PLACEHOLDER = re.compile(r"<[^>]+>|\b(?:TODO|CHANGEME|REPLACE_ME)\b", re.I)
SECRET = re.compile(r"(?:BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|api[_-]?key\s*[:=]|client[_-]?secret\s*[:=])", re.I)
ROUTES = {
    "assetlinks.template.json": ("/.well-known/assetlinks.json", "application/json", False),
}
AASA_DEPLOY_PATHS = (
    ".well-known/apple-app-site-association",
    "apple-app-site-association",
)
APPLE_TEAM_ID = re.compile(r"^[A-Z0-9]{10}$")
VERIFIED_APPLICATION_PREFIX = "26TTLFCACJ"
EXPECTED_APP_ADS = "google.com, pub-9100319027189512, DIRECT, f08c47fec0942fa0"


def validate(root: Path = ROOT, candidates: Path = CANDIDATES) -> dict:
    checks, blockers = [], []
    for name, (route, mime, redirects) in ROUTES.items():
        path = candidates / name
        entry = {"file": str(path), "targetPath": route, "expectedMime": mime, "redirectsAllowed": redirects}
        if not path.is_file():
            blockers.append(f"missing:{name}")
        else:
            raw = path.read_text(encoding="utf-8")
            if name.endswith(".json"):
                try:
                    json.loads(raw)
                    entry["jsonSyntax"] = "PASS"
                except json.JSONDecodeError:
                    entry["jsonSyntax"] = "FAIL"
                    blockers.append(f"invalid_json:{name}")
            placeholders = sorted(set(PLACEHOLDER.findall(raw)))
            entry["placeholders"] = placeholders
            if placeholders:
                blockers.append(f"placeholders:{name}")
            if SECRET.search(raw):
                blockers.append(f"possible_secret:{name}")
            entry["secretScan"] = "PASS" if not SECRET.search(raw) else "FAIL"
        checks.append(entry)
    for page in ("support/index.html", "privacy/index.html", "account-deletion/index.html"):
        if not (root / page).is_file():
            blockers.append(f"missing:{page}")
    app_ads = root / "app-ads.txt"
    if not app_ads.is_file():
        blockers.append("missing:app-ads.txt")
    elif app_ads.read_text(encoding="utf-8").strip() != EXPECTED_APP_ADS:
        blockers.append("app_ads_content")
    for path in root.rglob("*.html"):
        text = path.read_text(encoding="utf-8")
        for target in re.findall(r'(?:href|content)="(https?://[^"]+)"', text):
            if not target.startswith("https://"):
                blockers.append(f"non_https:{path.relative_to(root)}")
    deployed_aasa = []
    for relative in AASA_DEPLOY_PATHS:
        path = root / relative
        if not path.is_file():
            blockers.append(f"missing:{relative}")
            continue
        try:
            document = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            blockers.append(f"invalid_json:{relative}")
            continue
        raw = path.read_text(encoding="utf-8")
        if PLACEHOLDER.search(raw):
            blockers.append(f"placeholders:{relative}")
        details = document.get("applinks", {}).get("details", [])
        app_ids = {item.get("appID", "") for item in details}
        suffixes = {value[value.find(".") :] for value in app_ids if "." in value}
        if suffixes != {".de.jmapps.knowi", ".de.jmapps.talumi"}:
            blockers.append(f"app_ids:{relative}")
        team_ids = {value.split(".", 1)[0] for value in app_ids if "." in value}
        if (
            len(team_ids) != 1
            or not APPLE_TEAM_ID.fullmatch(next(iter(team_ids), ""))
            or team_ids != {VERIFIED_APPLICATION_PREFIX}
        ):
            blockers.append(f"application_prefix:{relative}")
        deployed_aasa.append(raw)
    if len(deployed_aasa) == 2 and deployed_aasa[0] != deployed_aasa[1]:
        blockers.append("aasa_copies_differ")
    return {
        "state": "READY" if not blockers else "BLOCKED",
        "offline": True,
        "networkCalls": 0,
        "checks": checks,
        "blockers": sorted(set(blockers)),
    }


def main() -> None:
    result = validate()
    print(json.dumps(result, ensure_ascii=False, indent=2))
    raise SystemExit(0 if result["state"] == "READY" else 2)


if __name__ == "__main__":
    main()

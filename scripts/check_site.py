#!/usr/bin/env python3
"""Validate the dependency-free JM Apps website using only Python's stdlib."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
REQUIRED = (
    "index.html", "knowi/index.html", "talumi/index.html", "support/index.html",
    "privacy/index.html", "imprint/index.html", "404.html", "app-ads.txt",
    "robots.txt", "sitemap.xml",
)
REQUIRED_META = ("description",)
FORBIDDEN = (
    "file://", "localhost", "/Users/" + "JulianMentges", "pub-000000000",
)


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []
        self.lang = None
        self.title = ""
        self.in_title = False
        self.meta_names = set()
        self.meta_properties = set()
        self.canonical = False

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "html":
            self.lang = values.get("lang")
        if tag == "title":
            self.in_title = True
        if tag == "meta":
            if values.get("name"):
                self.meta_names.add(values["name"])
            if values.get("property"):
                self.meta_properties.add(values["property"])
        if tag == "link" and values.get("rel") == "canonical":
            self.canonical = True
        for attribute in ("href", "src"):
            if attribute in values:
                self.references.append(values[attribute])

    def handle_data(self, data):
        if self.in_title:
            self.title += data

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False


def local_target(page, reference):
    path = urlsplit(reference).path
    target = page.parent / path
    if path.endswith("/") or not target.suffix:
        target /= "index.html"
    return target.resolve()


def main():
    errors = []
    for relative in REQUIRED:
        if not (ROOT / relative).is_file():
            errors.append(f"Missing required file: {relative}")

    for page in sorted(ROOT.rglob("*.html")):
        parser = PageParser()
        text = page.read_text(encoding="utf-8")
        parser.feed(text)
        label = page.relative_to(ROOT)
        if not parser.lang:
            errors.append(f"{label}: missing language declaration")
        if not parser.title.strip():
            errors.append(f"{label}: missing title")
        if page.name != "404.html":
            if not parser.canonical:
                errors.append(f"{label}: missing canonical URL")
            for name in REQUIRED_META:
                if name not in parser.meta_names:
                    errors.append(f"{label}: missing meta {name}")
            for prop in ("og:title", "og:description", "og:url"):
                if prop not in parser.meta_properties:
                    errors.append(f"{label}: missing {prop}")
        for reference in parser.references:
            if reference.startswith(("http://", "https://", "mailto:", "#")):
                continue
            target = local_target(page, reference)
            if ROOT not in target.parents and target != ROOT:
                errors.append(f"{label}: reference leaves site root: {reference}")
            elif not target.exists():
                errors.append(f"{label}: broken local reference: {reference}")

    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts:
            continue
        if path.suffix.lower() not in {".html", ".css", ".js", ".txt", ".xml"}:
            continue
        text = path.read_text(encoding="utf-8")
        for forbidden in FORBIDDEN:
            if forbidden in text:
                errors.append(f"{path.relative_to(ROOT)}: forbidden text: {forbidden}")

    if errors:
        print("Site validation failed:")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)
    print(f"Site validation passed: {len(list(ROOT.rglob('*.html')))} HTML pages checked.")


if __name__ == "__main__":
    main()

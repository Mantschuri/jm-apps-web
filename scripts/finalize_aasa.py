#!/usr/bin/env python3
"""Materialize AASA files from the verified distribution application prefix."""
from __future__ import annotations

import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "docs/sprint-2026-09-24/domain-candidates/apple-app-site-association.template.json"
PLACEHOLDER = "<APPLE_PAID_TEAM_ID>"
TEAM_ID_PATTERN = re.compile(r"^[A-Z0-9]{10}$")
VERIFIED_APPLICATION_PREFIX = "26TTLFCACJ"


def finalize(root: Path = ROOT, team_id: str | None = None) -> tuple[Path, Path]:
    value = (team_id if team_id is not None else os.environ.get("APPLE_PAID_TEAM_ID", "")).strip()
    if not TEAM_ID_PATTERN.fullmatch(value):
        raise ValueError("APPLE_PAID_TEAM_ID must be exactly 10 uppercase letters/digits")
    if value != VERIFIED_APPLICATION_PREFIX:
        raise ValueError(
            "APPLE_PAID_TEAM_ID must match the application-identifier prefix "
            "verified in both signed Build 5 distribution artifacts"
        )

    raw = TEMPLATE.read_text(encoding="utf-8")
    if raw.count(PLACEHOLDER) != 2:
        raise ValueError("AASA template must contain exactly two paid-team placeholders")
    rendered = raw.replace(PLACEHOLDER, value)
    document = json.loads(rendered)
    expected_ids = {
        f"{value}.de.jmapps.knowi",
        f"{value}.de.jmapps.talumi",
    }
    actual_ids = {
        item.get("appID")
        for item in document.get("applinks", {}).get("details", [])
    }
    if actual_ids != expected_ids:
        raise ValueError("AASA app IDs do not match the two JM Apps bundle IDs")

    payload = json.dumps(document, ensure_ascii=False, indent=2) + "\n"
    well_known = root / ".well-known/apple-app-site-association"
    root_copy = root / "apple-app-site-association"
    well_known.parent.mkdir(parents=True, exist_ok=True)
    well_known.write_text(payload, encoding="utf-8")
    root_copy.write_text(payload, encoding="utf-8")
    return well_known, root_copy


def main() -> None:
    paths = finalize()
    for path in paths:
        print(path.relative_to(ROOT))


if __name__ == "__main__":
    main()

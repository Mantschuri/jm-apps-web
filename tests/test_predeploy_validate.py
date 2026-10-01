import json
import os
import tempfile
import unittest
from unittest.mock import patch
from pathlib import Path

from scripts.finalize_aasa import finalize
from scripts.predeploy_validate import validate


class PredeployValidatorTests(unittest.TestCase):
    def test_android_template_is_parseable_but_missing_play_signing_values_block(self):
        result = validate()
        self.assertEqual(result["state"], "BLOCKED")
        self.assertEqual(result["networkCalls"], 0)
        self.assertTrue(any(item.startswith("placeholders:assetlinks") for item in result["blockers"]))
        self.assertTrue(all(item.get("jsonSyntax") == "PASS" for item in result["checks"] if item["file"].endswith("json")))

    def test_complete_isolated_package_can_be_ready(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            candidates = root / "candidates"
            candidates.mkdir()
            for page in ("support/index.html", "privacy/index.html", "account-deletion/index.html"):
                path = root / page
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text('<a href="https://jm-apps.de/">ok</a>')
            (candidates / "assetlinks.template.json").write_text(json.dumps([]))
            (root / "app-ads.txt").write_text("google.com, pub-9100319027189512, DIRECT, f08c47fec0942fa0")
            finalize(root, "26TTLFCACJ")
            self.assertEqual(validate(root, candidates)["state"], "READY")

    def test_aasa_finalizer_fails_closed_without_paid_team(self):
        with tempfile.TemporaryDirectory() as folder, patch.dict(os.environ, {}, clear=True):
            root = Path(folder)
            with self.assertRaisesRegex(ValueError, "APPLE_PAID_TEAM_ID"):
                finalize(root)
            self.assertFalse((root / ".well-known/apple-app-site-association").exists())

    def test_aasa_finalizer_rejects_unverified_prefix(self):
        with tempfile.TemporaryDirectory() as folder:
            with self.assertRaisesRegex(ValueError, "verified"):
                finalize(Path(folder), "A1B2C3D4E5")

    def test_validator_rejects_unverified_application_prefix(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            candidates = root / "candidates"
            candidates.mkdir()
            for page in ("support/index.html", "privacy/index.html", "account-deletion/index.html"):
                path = root / page
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text('<a href="https://jm-apps.de/">ok</a>')
            (candidates / "assetlinks.template.json").write_text(json.dumps([]))
            (root / "app-ads.txt").write_text("google.com, pub-9100319027189512, DIRECT, f08c47fec0942fa0")
            document = {
                "applinks": {
                    "details": [
                        {"appID": "A1B2C3D4E5.de.jmapps.knowi"},
                        {"appID": "A1B2C3D4E5.de.jmapps.talumi"},
                    ]
                }
            }
            payload = json.dumps(document)
            for relative in (".well-known/apple-app-site-association", "apple-app-site-association"):
                path = root / relative
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(payload)
            result = validate(root, candidates)
            self.assertEqual(result["state"], "BLOCKED")
            self.assertTrue(any(item.startswith("application_prefix:") for item in result["blockers"]))

    def test_aasa_finalizer_writes_identical_extensionless_files(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            well_known, root_copy = finalize(root, "26TTLFCACJ")
            self.assertEqual(well_known.read_bytes(), root_copy.read_bytes())
            details = json.loads(well_known.read_text())["applinks"]["details"]
            self.assertEqual(
                {entry["appID"] for entry in details},
                {
                    "26TTLFCACJ.de.jmapps.knowi",
                    "26TTLFCACJ.de.jmapps.talumi",
                },
            )


if __name__ == "__main__":
    unittest.main()

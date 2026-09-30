# JM Apps release checklist

All items below are manual and intentionally remain incomplete until real release information is available.

## Domain

- [x] Order `jm-apps.de`.
- [x] Enable GitHub Pages from `main` and `/ (root)`.
- [ ] Confirm whether netcup is only registrar/DNS or an intended future website host; do not migrate without a separate decision.
- [x] Add `jm-apps.de` as the GitHub Pages custom domain and preserve `CNAME`.
- [ ] Reconfirm the existing DNS records and Pages custom-domain settings before deployment; do not change them as part of a website content release.
- [x] Verify that the current domain answers over HTTPS from GitHub Pages (observed 2026-09-30).

## Legal

- [x] Add the verified operator name.
- [x] Add the verified postal address.
- [x] Add the verified legal and privacy contact email address.
- [ ] Complete the final legal review of the imprint.
- [ ] Complete and review the website privacy information.
- [ ] Complete and review the release-specific privacy information for both apps.
- [ ] Obtain professional review of the terms of use and account-deletion wording.
- [ ] Verify whether a public VSBG statement is required from the operator's actual employee count and circumstances.
- [x] Recheck the current official technical/store/legal source links used by the 2026-09-30 release report.
- [ ] Obtain qualified legal review, including competent supervisory authority, provider roles, transfers and retention.

## Support

- [x] Add the approved support email to `support/index.html`.
- [x] Validate the resulting `mailto:` links syntactically.

## Stores

- [ ] Add the KNOWI App Store URL.
- [ ] Add the KNOWI Google Play URL.
- [ ] Add the TALUMI App Store URL.
- [ ] Add the TALUMI Google Play URL.
- [ ] Complete Apple App Privacy disclosures against each production build.
- [ ] Complete Google Play Data Safety declarations against each production build.
- [ ] Configure and verify the public privacy and account-deletion URLs in store records.
- [x] Implement in-app deletion for registered accounts and automatically created server guests.
- [ ] Verify the deletion flow with the final deployed backend and both final store binaries without affecting real user data.

## Audience and children

- [ ] Decide the target age group for KNOWI and the KNOWI Kids area.
- [ ] Decide whether either offering is directed to children.
- [ ] Review Apple Kids Category and Google Play Families requirements.
- [ ] Review advertising restrictions and account/social-feature implications for the chosen audience.
- [ ] Do not invent or claim a parental-consent mechanism before one is designed and reviewed.

## AdMob

- [x] Verify the Publisher ID from the current 2026-09-30 AdMob/release handoff.
- [x] Put the exact evidenced seller line in `app-ads.txt`.
- [ ] Confirm `https://jm-apps.de/app-ads.txt` is publicly reachable.
- [ ] Verify the developer website in the relevant store records.
- [ ] Reconcile AdMob/UMP behavior with consent, privacy notice, Apple privacy labels, and Google Data Safety before production activation.

## Infrastructure and agreements

- [ ] Review production hosting, email, backend, database and other processor arrangements and agreements once final providers/configuration are selected.
- [ ] Verify international-transfer disclosures against the actual production providers and contracts.

## Final QA

- [ ] Before the final public KNOWI/TALUMI app release, Astra must re-audit the complete website, legal and store state against the final app builds and store declarations, including App Privacy, Data Safety, UMP/Privacy Options, Kids/Families, ATT/tracking, Android App Links, AASA, app-ads.txt, account deletion, support contacts, DSA/trader information and actual store availability.
- [x] Run `python3 scripts/check_site.py` (PASS 2026-09-30).
- [x] Preview the site locally at 320, 390, 768 and 1440 px (PASS 2026-09-30).
- [x] Test keyboard navigation, skip link, mobile menu, Escape and focus restoration (PASS 2026-09-30).
- [ ] Verify all production pages and store/support links after deployment.
- [x] Add the approved social preview image and metadata to all public pages.

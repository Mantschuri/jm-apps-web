# JM Apps release checklist

All items below are manual and intentionally remain incomplete until real release information is available.

## Domain

- [x] Order `jm-apps.de`.
- [x] Enable GitHub Pages from `main` and `/ (root)`.
- [ ] Complete netcup domain activation.
- [x] Add `jm-apps.de` as the GitHub Pages custom domain and preserve `CNAME`.
- [ ] Configure the exact DNS records currently specified by GitHub.
- [ ] Verify the domain and enable HTTPS.

## Legal

- [x] Add the verified operator name.
- [x] Add the verified postal address.
- [x] Add the verified legal and privacy contact email address.
- [ ] Complete the final legal review of the imprint.
- [ ] Complete and review the website privacy information.
- [ ] Complete and review the release-specific privacy information for both apps.
- [ ] Obtain professional review of the terms of use and account-deletion wording.
- [ ] Verify whether a public VSBG statement is required from the operator's actual employee count and circumstances.
- [ ] Manually verify the current official-source links and BayLDA competence; external source retrieval was unavailable during the engineering pass.

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
- [ ] Implement and verify in-app account deletion before release where required by store policy.

## Audience and children

- [ ] Decide the target age group for KNOWI and the KNOWI Kids area.
- [ ] Decide whether either offering is directed to children.
- [ ] Review Apple Kids Category and Google Play Families requirements.
- [ ] Review advertising restrictions and account/social-feature implications for the chosen audience.
- [ ] Do not invent or claim a parental-consent mechanism before one is designed and reviewed.

## AdMob

- [ ] Obtain the real Publisher ID after AdMob account and app setup.
- [ ] Put Google's exact supplied publisher line in `app-ads.txt`.
- [ ] Confirm `https://jm-apps.de/app-ads.txt` is publicly reachable.
- [ ] Verify the developer website in the relevant store records.
- [ ] Reconcile AdMob/UMP behavior with consent, privacy notice, Apple privacy labels, and Google Data Safety before production activation.

## Infrastructure and agreements

- [ ] Review production hosting, email, backend, database and other processor arrangements and agreements once final providers/configuration are selected.
- [ ] Verify international-transfer disclosures against the actual production providers and contracts.

## Final QA

- [ ] Run `python3 scripts/check_site.py`.
- [ ] Preview the site locally at common phone, tablet, and desktop widths.
- [ ] Test keyboard navigation, the mobile menu, and the Escape key.
- [ ] Verify all production pages and store/support links after deployment.
- [x] Add the approved social preview image and metadata to all public pages.

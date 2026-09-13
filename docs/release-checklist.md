# JM Apps release checklist

All items below are manual and intentionally remain incomplete until real release information is available.

## Domain

- [x] Order `jm-apps.de`.
- [x] Enable GitHub Pages from `main` and `/ (root)`.
- [ ] Complete netcup domain activation.
- [ ] Add `jm-apps.de` as the GitHub Pages custom domain.
- [ ] Configure the exact DNS records currently specified by GitHub.
- [ ] Verify the domain and enable HTTPS.

## Legal

- [x] Add the verified operator name.
- [x] Add the verified postal address.
- [x] Add the verified legal and privacy contact email address.
- [ ] Complete the final legal review of the imprint.
- [ ] Complete and review the website privacy information.
- [ ] Complete and review the release-specific privacy information for both apps.

## Support

- [x] Add the approved support email to `support/index.html`.
- [x] Validate the resulting `mailto:` links syntactically.

## Stores

- [ ] Add the KNOWI App Store URL.
- [ ] Add the KNOWI Google Play URL.
- [ ] Add the TALUMI App Store URL.
- [ ] Add the TALUMI Google Play URL.

## AdMob

- [ ] Obtain the real Publisher ID after AdMob account and app setup.
- [ ] Put Google's exact supplied publisher line in `app-ads.txt`.
- [ ] Confirm `https://jm-apps.de/app-ads.txt` is publicly reachable.
- [ ] Verify the developer website in the relevant store records.

## Final QA

- [ ] Run `python3 scripts/check_site.py`.
- [ ] Preview the site locally at common phone, tablet, and desktop widths.
- [ ] Test keyboard navigation, the mobile menu, and the Escape key.
- [ ] Verify all production pages and store/support links after deployment.
- [x] Add the approved social preview image and metadata to all public pages.

# JM Apps release checklist

All items below are manual and intentionally remain incomplete until real release information is available.

## Domain

- [ ] Confirm ownership of `jm-apps.de`.
- [ ] Enable GitHub Pages from `main` and `/ (root)`.
- [ ] Add `jm-apps.de` as the GitHub Pages custom domain.
- [ ] Configure the exact DNS records currently specified by GitHub.
- [ ] Verify the domain and enable HTTPS.

## Legal

- [ ] Add the legal operator name.
- [ ] Add the complete postal address.
- [ ] Add the legal contact email address.
- [ ] Complete and review the imprint.
- [ ] Complete and review the website privacy information.
- [ ] Complete and review the release-specific privacy information for both apps.

## Support

- [ ] Add the real support email to `support/index.html`.
- [ ] Test the resulting `mailto:` link.

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
- [ ] Add a social preview image and `og:image` metadata only after an approved asset exists.

# JM Apps legal and privacy baseline

Engineering audit dated 2026-09-13. This is a compliance register, not a legal opinion or a claim of guaranteed compliance. The execution environment could not retrieve the external official sites during this pass; source content, current wording and applicability therefore require manual/professional verification. Public text must also be reviewed against the actual production apps, providers, contracts, audiences and store declarations before release.

| Topic | Scope | Actual implementation | Official source/reference | Audit date | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| DDG imprint | Website | `/imprint/` identifies Julian Mentges operating as JM Apps, postal address and direct email; linked from every standard footer | [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html) | 2026-09-13 | Implemented; legal review needed | No corporate, register, tax, VAT, phone, chamber or supervisory details invented |
| GDPR transparency | Website | `/privacy/` states controller, processing, purposes, bases, recipient categories, hosting, transfer possibility, retention criteria and rights | [Art. 13 GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/art_13/oj) | 2026-09-13 | Implemented; legal review needed | Re-check actual providers and contracts before launch |
| GDPR rights | Website/apps | Email process for access, rectification, deletion, restriction, portability where applicable, objection, withdrawal and complaint | [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | 2026-09-13 | Implemented; operational process needed | Identity checks must be proportionate; users are told not to email secrets |
| Supervisory authority | Website/apps | Public notice preserves the general right to complain to a competent authority without naming an unverified exclusive authority | [BayLDA complaints](https://www.lda.bayern.de/de/beschwerde.html) | 2026-09-13 | Manual official-source and legal verification needed | Confirm BayLDA competence for this non-public Munich operator, then decide whether to name it publicly |
| GitHub Pages hosting | Website | Discloses technical connection/server data, GitHub recipient possibility and possible processing outside the EU; no invented retention or contractual guarantees | [GitHub Privacy Statement](https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement) | 2026-09-13 | Implemented; external review needed | Verify contractual role and transfer mechanism before final legal sign-off |
| TDDDG device access | Website | Source audit found no cookies, local/session storage, IndexedDB, fingerprinting or tracking identifiers | [§ 25 TDDDG](https://www.gesetze-im-internet.de/tdddg/__25.html) | 2026-09-13 | Implemented | No consent banner added because the site does not perform non-essential device storage/access |
| Email contact | Website/apps | Direct `mailto:` links; processing purpose, bases and retention criteria described | [Art. 6 GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/art_6/oj) | 2026-09-13 | Implemented; provider review needed | Current public address is operator-approved; review email provider arrangement |
| Account deletion | KNOWI/TALUMI | Public `/account-deletion/` provides no-login request path and future in-app route; no instant or blanket deletion promise | [Google Play account deletion](https://support.google.com/googleplay/android-developer/answer/13327111), [Apple account deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/) | 2026-09-13 | Public resource implemented; app/backend action required | No deletion endpoint or generally available in-app flow exists yet |
| Apple privacy policy | KNOWI/TALUMI | Stable privacy URL prepared | [App Review Guidelines § 5.1](https://developer.apple.com/app-store/review/guidelines/#privacy) | 2026-09-13 | External action | Match policy and App Privacy answers to each final binary and provider |
| Google user-data policy | KNOWI/TALUMI | Stable privacy and deletion URLs prepared | [Google Play User Data](https://support.google.com/googleplay/android-developer/answer/10144311) | 2026-09-13 | External action | Complete Data Safety and store configuration against production behavior |
| AdMob and consent | KNOWI/TALUMI | Public notice says technical test/release foundation exists but production ads are off; `app-ads.txt` remains empty | [Google UMP for Flutter](https://developers.google.com/admob/flutter/privacy) | 2026-09-13 | External action; legal review needed | Configure live IDs/messages and reconcile consent/store disclosures before activation |
| KNOWI Kids/audience | KNOWI | No public claim that the whole app is a children's app | [Apple Kids](https://developer.apple.com/app-store/kids-apps/), [Google Families](https://support.google.com/googleplay/android-developer/answer/9893335) | 2026-09-13 | Decision and legal/store review needed | Decide target ages, child-directed status, advertising and account/social implications before submission |
| VSBG | Imprint | No generic public dispute-resolution statement added | [§ 36 VSBG](https://www.gesetze-im-internet.de/vsbg/__36.html), [§ 37 VSBG](https://www.gesetze-im-internet.de/vsbg/__37.html) | 2026-09-13 | Legal review needed | § 36(3) contains an employee-count exception; actual prior-year employee count and any later § 37 duty must be verified |
| EU ODR platform | Imprint | No obsolete ODR/OS-platform link or statement | [Regulation (EU) 2024/3228](https://eur-lex.europa.eu/eli/reg/2024/3228/oj) | 2026-09-13 | Implemented | Platform/regulation ended in 2025; do not restore generator boilerplate |
| Terms | KNOWI/TALUMI | Conservative `/terms/` page; statutory liability and mandatory consumer rights preserved | German statutory law and final counsel review | 2026-09-13 | Implemented as baseline; legal review needed | No purchases, subscriptions, absolute exclusions or unilateral-change clause invented |
| Security contact | Website/apps | No `security.txt` created | [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116) | 2026-09-13 | Deliberately deferred | Current public support email is available; a dated file would add expiry maintenance without a dedicated security process |
| Store privacy disclosures | KNOWI/TALUMI | Internal checklist records Apple privacy labels, Google Data Safety, deletion and URLs | Apple/Google sources above | 2026-09-13 | External action | Must reflect actual binaries, SDKs, production ads and backend behavior |

## Public URL baseline

- `https://jm-apps.de/privacy/`
- `https://jm-apps.de/imprint/`
- `https://jm-apps.de/terms/`
- `https://jm-apps.de/account-deletion/`
- `https://jm-apps.de/support/`

These are canonical production URLs. Until the custom domain is active, document-relative site links continue to work on the GitHub Pages project URL.

## Website source audit

The public source contains no form, analytics or advertising script, external font, social/video embed, cookie API, `localStorage`, `sessionStorage`, IndexedDB, tracking identifier or browser fingerprinting. The only JavaScript controls the responsive menu and displays the current year. Re-run this audit whenever frontend dependencies or behavior change.

## Deliberate exclusions

- No cookie banner: there is no non-essential device storage/access to consent to.
- No ODR/OS-platform link: it is obsolete.
- No VSBG boilerplate: applicability needs the operator's verified circumstances; § 37 duties after a dispute are a separate operational issue.
- No `security.txt`: useful only with an owned maintenance process and future expiry date.
- No invented legal-entity, register, tax, VAT, authority, phone or processor-contract facts.

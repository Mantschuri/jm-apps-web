# Domain-, HTTPS- und Release-Lücken

Stand: 2026-09-23. Keine DNS-, Hosting-, Store- oder Deploymentaktion wurde ausgeführt.

## Bestätigt im Quellstand

- Website-Canonical/CNAME: `jm-apps.de`; statische relative Navigation, keine Tracker/Cookies/externe Laufzeitbibliotheken.
- iOS-Bundle-IDs: `de.jmapps.knowi`, `de.jmapps.talumi`; Team `26TTLFCACJ` ist lokal als **Personal Team** bestätigt. Es ist daher kein belegtes finales Distributionsteam und wird nicht in eine veröffentlichbare AASA-Datei übernommen.
- Android-Application-IDs: `de.jmapps.knowi`, `de.jmapps.talumi`.
- Apppfade: KNOWI `/knowi/daily`, `/knowi/friends`, `/knowi/duel/<lowercase UUID>`; TALUMI `/talumi/join/<6-stelliger Code>`.
- Beide iOS-Entitlementdateien nennen `applinks:jm-apps.de`; Android hat passende HTTPS-Intentfilter. TALUMI benötigt laut App-Dokumentation noch die explizit verifizierte Release-Build-Setting-Zuordnung seiner Entitlementdatei.

## Bewusst nicht veröffentlicht

- Keine `/.well-known/apple-app-site-association`: finales Apple-App-Identifier-Präfix/Distributionsteam und tatsächlich provisionierte Associated-Domains-Berechtigung sind noch nicht belegt.
- Keine `/.well-known/assetlinks.json`: die beiden SHA-256-Fingerprints der **Play App Signing**-Zertifikate fehlen. Upload-Key-Fingerprints wären kein zulässiger Ersatz.
- Nicht deploybare, absichtlich mit klaren Platzhaltern versehene Kandidaten liegen unter `docs/sprint-2026-09-24/domain-candidates/`. Erst Distribution-Team-ID beziehungsweise beide Play-App-Signing-Fingerprints ersetzen, dann als JSON validieren und in einem getrennt freigegebenen Deploy unter `/.well-known/` veröffentlichen.
- Keine synthetischen Fallbackrouten für Duell-/Raumcodes. Vor Veröffentlichung muss entschieden werden, welche sichere Browserfallbackseite unbekannte, abgelaufene oder nicht installierte App-Links zeigt; Codes/UUIDs dürfen dabei nicht geloggt oder als Marketingdaten verwendet werden.
- HTTPS, DNS, GitHub-Pages-Quelle und öffentliche Auslieferung der korrekten MIME-Typen wurden in diesem lokalen Block nicht als live bestätigt.

## Exakte externe Eingaben für Auftrag 05

1. Distribution-Profil je iOS-App: finaler Team-/App-Identifier-Präfix und Nachweis, dass Associated Domains im signierten Release enthalten ist.
2. Play Console je Android-App: SHA-256 des aktiven Play-App-Signing-Zertifikats (nicht Uploadzertifikat).
3. Hostingprüfung: `jm-apps.de` DNS/HTTPS, Pages-Quelle/Branch und Fähigkeit, beide Well-known-Dateien ohne Redirect, Authentifizierung oder HTML-Fallback als JSON auszuliefern.
4. Gerätestest je Plattform: kalter und warmer Start, angemeldet/abgemeldet, ungültiger Link, falscher Benutzer/Fremdduell, abgelaufener TALUMI-Code und Browserfallback.

## Finaler Einsetzplan ohne Deploy

Die Templates sind mit allen derzeit belegten, nicht geheimen Werten bereits maximal konkret. Nach Signing dürfen ausschließlich diese Platzhalter ersetzt werden:

| Datei | Platzhalter | einzusetzende Quelle | ausdrücklich nicht verwenden |
|---|---|---|---|
| `apple-app-site-association.template.json` | `<APPLE_DISTRIBUTION_TEAM_ID>` (zweimal) | Team-/App-Identifier-Präfix des tatsächlich verwendeten Apple-Developer-Program-Distributionprofils | derzeitiges Personal Team `26TTLFCACJ`, solange es nicht das signierende Distributionsteam ist |
| `assetlinks.template.json` | `<KNOWI_PLAY_APP_SIGNING_SHA256>` | Play Console → KNOWI → App-Integrität → App-Signing-Zertifikat | Debug- oder Upload-Key-Fingerprint |
| `assetlinks.template.json` | `<TALUMI_PLAY_APP_SIGNING_SHA256>` | Play Console → TALUMI → App-Integrität → App-Signing-Zertifikat | Debug- oder Upload-Key-Fingerprint |

Unveränderliche belegte Werte sind `de.jmapps.knowi`, `de.jmapps.talumi` sowie die vier bereits aufgelisteten Routenfamilien. Nach Ersetzung: JSON parsen, AASA gegen die Entitlements des signierten Archivs prüfen, dann erst in einem separaten freigegebenen Website-Deploy ohne Redirect unter `/.well-known/` veröffentlichen. Bis dahin bleiben beide Live-404-Gates offen.

## Weitere Releaseblocker im selben Reviewfenster

- Keine Store-URLs/IDs vorhanden; Website bleibt korrekt bei „Bald“.
- Website-Supportadresse ist der bereits freigegebene Kontakt `contact.jm.apps@gmail.com`; der App-Privacy-Center-Quellstand nennt für Datenrechte abweichend `julian.mentges@gmail.com`. Vor Release eine einzige freigegebene Kontaktstrategie festlegen und beide Repositories in getrennten Schreibblöcken angleichen.
- Betreiberangaben bleiben unverändert, brauchen aber weiterhin professionelle rechtliche Prüfung. Zielalter/Kids/Families, finale App-Privacy/Data-Safety-Antworten, Werbung/UMP und reale Produktionsprovider sind offen.
- `app-ads.txt` bleibt leer, solange keine echte Google-Publisherzeile und keine Werbefreigabe vorliegen.

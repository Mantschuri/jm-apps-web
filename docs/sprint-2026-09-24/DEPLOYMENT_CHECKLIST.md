# Einmalige Website-Release-Checkliste

Stand: 24.09.2026. Lokale Vorbereitung, kein Deploy. Die produktive Rootdatei `app-ads.txt` bleibt absichtlich leer, bis die echte Google-Sellerzeile vorliegt.

## 1. Werte einsetzen

| Ziel | Kandidat | exakt fehlender Wert | Quelle |
|---|---|---|---|
| `/.well-known/apple-app-site-association` | `domain-candidates/apple-app-site-association.template.json` | `<APPLE_DISTRIBUTION_TEAM_ID>` zweimal | App-Identifier-Präfix/Team des tatsächlich signierenden Apple-Distributionprofils |
| `/.well-known/assetlinks.json` | `domain-candidates/assetlinks.template.json` | KNOWI- und TALUMI-Play-App-Signing-SHA-256 | Play Console → Setup → App integrity → App signing certificate; nie Upload-/Debug-Key |
| `/app-ads.txt` | `domain-candidates/app-ads.template.txt` | vollständige echte Google-Sellerzeile beziehungsweise Publisher-ID | AdMob → app-ads.txt; keine Ableitung aus Test-IDs |
| KNOWI/TALUMI Landing Pages | vorhandene `knowi/index.html`, `talumi/index.html` | vier echte Store-URLs | jeweilige öffentliche Storeeinträge; „Bald“ bis dahin beibehalten |

Keine anderen Package-/Bundle-/Routenwerte ändern. Belegt sind `de.jmapps.knowi`, `de.jmapps.talumi`, `/knowi/daily`, `/knowi/friends`, `/knowi/duel/*` und `/talumi/join/*`.

## 2. Vor Deploy lokal prüfen

1. Platzhalterfreiheit nur für tatsächlich zu veröffentlichende Dateien prüfen; keine Fakewerte einsetzen.
2. Beide JSON-Dateien mit `python3 -m json.tool` parsen. AASA bleibt ohne Dateiendung.
3. `python3 scripts/check_site.py` ausführen; derzeit **PASS, 9 HTML-Seiten**.
4. Accountlöschung gegen den finalen In-App-Pfad, Datenschutz gegen finalen SDK-/Providerstand und Supportadresse gegen die Betreiberentscheidung prüfen.
5. Storelinks erst ersetzen, wenn die Ziel-URLs öffentlich und appgenau sind. Keine Preview-/Console-URL verwenden.
6. Deploymentdiff muss ausschließlich die drei Releasefiles, bestätigte Storelinks und erforderliche Textkorrekturen enthalten. Vieraugenreview vor Freigabe.

## 3. Nach separat freigegebenem Deploy verifizieren

- HTTPS 200, kein Redirect/Login/HTML-Fallback:
  - `https://jm-apps.de/.well-known/apple-app-site-association`
  - `https://jm-apps.de/.well-known/assetlinks.json`
  - `https://jm-apps.de/app-ads.txt`
- Content-Type für beide Associationdateien JSON-kompatibel; app-ads.txt `text/plain`.
- Antworten erneut parsen und bytegenau gegen den freigegebenen Kandidaten vergleichen.
- Apple- und Android-App-Link-Prüfung am signierten Releaseartefakt und physischen Gerät durchführen; kalter/warmer Start, angemeldet/abgemeldet, ungültig/abgelaufen und Browserfallback.
- Alle sieben öffentlichen Seiten prüfen: KNOWI, TALUMI, Datenschutz, Support, Accountlöschung, Impressum, Bedingungen. Keine internen Pfade, Tokens oder Platzhalter.

## 4. Rollback

Vorherigen statischen Stand als Releaseartefakt behalten. Bei falscher Team-ID, Fingerprint, Sellerzeile, Store-URL oder unerwartetem Content-Type ausschließlich den letzten bekannten statischen Stand wiederherstellen; keine Appkonfiguration als Kompensation verändern. Danach Associationcache berücksichtigen und erneut prüfen.

## Aktueller Status

- Account Deletion: lokaler Text am implementierten gemeinsamen Löschablauf ausgerichtet; Produktions-E2E/Storeeintrag extern.
- Datenschutz: lokaler aktueller Vorbereitungsstand, AdMob noch ausdrücklich nicht produktiv; finale rechtliche/Providerprüfung extern.
- Support: technisch fertig, `contact.jm.apps@gmail.com`; einheitliche Betreiberentscheidung noch offen.
- KNOWI/TALUMI Landing Pages: technisch fertig, Storelinks bewusst „Bald“.
- AASA/assetlinks/app-ads.txt: Kandidaten fertig, öffentliche Signing-/AdMob-Werte fehlen.

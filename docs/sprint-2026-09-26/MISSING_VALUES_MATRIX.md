# Missing Values Matrix – Association und AdMob

Lokale Vorbereitung, kein Deploy. Werte niemals raten oder aus Uploadzertifikaten ableiten.

| Fehlender Wert | Wo Julian ihn erhält | Einsetzstelle | Danach freigeschalteter Nachweis |
|---|---|---|---|
| `APPLE_TEAM_ID` | Apple Developer → Membership details; exakte Distribution-Team-ID des finalen Teams | `docs/sprint-2026-09-24/domain-candidates/apple-app-site-association.template.json`, alle `appID`-Präfixe | AASA ohne Platzhalter; `/.well-known/apple-app-site-association`, MIME `application/json`, kein Redirect; danach signierte Associated-Domains-App auf Gerät prüfen |
| `KNOWI_PLAY_APP_SIGNING_SHA256` | Play Console → KNOWI → Setup/App integrity → App signing key certificate → SHA-256 | KNOWI-Eintrag in `assetlinks.template.json` | `de.jmapps.knowi` App Link verifizierbar; `/.well-known/assetlinks.json`, MIME `application/json`, kein Redirect |
| `TALUMI_PLAY_APP_SIGNING_SHA256` | Play Console → TALUMI → Setup/App integrity → App signing key certificate → SHA-256 | TALUMI-Eintrag in `assetlinks.template.json` | `de.jmapps.talumi` App Link verifizierbar; gleiche Pfad-/MIME-Regel |
| `ADMOB_PUBLISHER_ID` | AdMob → Settings/Account information beziehungsweise die von AdMob angezeigte app-ads.txt-Sellerzeile | `app-ads.template.txt`; die vollständige von AdMob vorgegebene Zeile verwenden | `/app-ads.txt`, MIME `text/plain`, kein Redirect; AdMob-Verifikation erst nach Store-Website-Linkage und freigegebenem Deploy |

Der Play-App-Signing-SHA-256 ist **nicht** der Upload-Key-Fingerprint. Beide Androidwerte müssen aus dem jeweiligen Feld „App signing key certificate“ stammen.

## Lokale Abschlussfolge nach Erhalt

1. Werte in Kopien der Templates einsetzen; keine Schlüssel, Tokens oder Zertifikatsdateien aufnehmen.
2. `python3 -B scripts/predeploy_validate.py` muss `READY` liefern.
3. JSON syntaktisch prüfen und exakte Paket-/Bundle-IDs gegen finale signierte Artefakte vergleichen.
4. Separaten Website-Deploy freigeben.
5. Öffentlich per HTTPS prüfen: Status 200, exakter MIME-Typ, kein Redirect, Inhalt unverändert.
6. Erst danach reale iOS Universal Links und Android App Links kalt/warm auf Geräten abnehmen.

Aktuell bleibt der Validator korrekt `BLOCKED`, weil alle vier externen Werte Platzhalter sind. Das ist kein Website-Codefehler.

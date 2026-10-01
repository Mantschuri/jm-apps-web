# JM Apps Website – Releaseprüfung 30.09.2026

## 0. Ergebnis und Geltungsbereich

Lokale, reviewbare Websitefassung erstellt. **Kein Commit, Push, Merge, Upload, DNS-/Pages-/Portalzugriff oder Deploy.** Dieser Bericht ist technische und redaktionelle Evidenz, keine Rechtsberatung, keine Storeerklärung und keine Veröffentlichungsfreigabe.

Geprüfter Zeitpunkt: 30.09.2026, abends, Europe/Berlin. Schreibscope war ausschließlich `jm-apps-web`; `knowi-talumi`, `jm-apps-studio` und `jm-apps-content` wurden nur gelesen. In den drei Nur-Lese-Repositories wurde nichts geändert.

Offene Pflichtgates:

1. `HOSTING_TARGET_REQUIRED`: Die Website wird nach README und erneutem HTTP-Nachweis tatsächlich von GitHub Pages ausgeliefert. Die genaue netcup-Rolle (nur Registrar/DNS oder beabsichtigter Websitehost) ist nicht bestätigt.
2. `ANDROID_SIGNING_EVIDENCE_REQUIRED`: Beide Android-Apps deklarieren verifizierte HTTPS-App-Links; die zwei Play-App-Signing-SHA-256-Fingerprints fehlen. Deshalb wurde kein `/.well-known/assetlinks.json` veröffentlicht.
3. `CONSENT_OPTIONS_RELEASE_BLOCKER`: Code und synthetische UI-Evidenz sind vorhanden; reale Production-UMP-Nachricht, Privacy-Options-Formular und spätere Anzeigenkonfiguration wurden nicht auf physischen Geräten beziehungsweise im Portal verifiziert.
4. `KIDS_AUDIENCE_OR_TRACKING_REQUIRED`: KNOWI-Kids blockiert Ad Requests, aber UMP/SDK starten appweit. Storezielgruppe, Umgang mit unbekanntem Alter, Families-/Kids-Einordnung und Apple-Tracking-/ATT-Entscheidung sind offen.
5. `LEGAL_OR_PROVIDER_INPUT_REQUIRED`: SMTP-Anbieter, Vertragsrollen/Übermittlungsgrundlagen, produktive Log-/Backupfristen, Restore-nach-Löschung und die tatsächliche regelmäßige 35-Tage-Bereinigung sind nicht vollständig belegt.
6. App-Releaseblocker außerhalb des Schreibscopes: `packages/connected_accounts/lib/src/privacy_center.dart:10` verwendet einen anderen, nicht für diese Website freigegebenen Kontakt als `contact.jm.apps@gmail.com`. Vor Apprelease angleichen und neu bauen.
7. `DEPLOYMENT_APPROVAL_REQUIRED`: immer; GitHub Pages veröffentlicht nach dokumentiertem Stand direkt aus `main` und `/ (root)`.

## 1. Ausgangsstand und vorhandene Arbeit

| Repository | Branch | HEAD bei Beginn | Status / Umgang |
| --- | --- | --- | --- |
| `jm-apps-web` | `backup/project-pause-2026-09-17` | `ca3aee2e45cb09e67a418ac69a44c15fece6d26e` | Vorbestehend geändert: `README.md`, `account-deletion/index.html`, `knowi/index.html`, `privacy/index.html`, `support/index.html`; außerdem untracked Sprintdokumente, AASA-/Predeployskripte und Tests. Alles erhalten und gezielt weitergeführt. |
| `knowi-talumi` | `wip/v1-regression-2026-09-22` | `4e5a5937b457b9016a4e72ef7be1d83c2a0629a5` | Umfangreiche bewusste lokale App-/Releasearbeit; ausschließlich gelesen. Relevanter aktueller `origin/main`: `d53063b648f7dff353ca27d202e952a154df8d63` vom 30.09.2026. Die hier ausgewerteten Konto-/Lösch-/Datenmodelldateien unterscheiden sich nicht von `origin/main`; `render.yaml` hat darüber hinausgehende Branchunterschiede. |
| `jm-apps-studio` | `main` | `e8ef9add4ce6bfa0728621c06c28c700fb5902db` | Lokale Companion-Arbeit vorhanden; nicht geändert und mangels Endnutzerkontakt nicht als Appdaten-Empfänger behandelt. |
| `jm-apps-content` | `wip/content-quality-2026-09-21` | `299834838ff0747b84db93f7efa9afe625b61600` | Lokale Dokument-/Skriptarbeit vorhanden; nicht geändert. |

Websitevergleich: `origin/main` und Remote-Default-Branch zeigen weiterhin auf `51950b363dff8808e3e33b4afd9fcc3e977542ef`. Der lokale Branch enthält zusätzlich `ca3aee2` und die oben genannten uncommittierten Arbeiten. Kein alter Remotezustand wurde über den lokalen Stand kopiert.

Tatsächlich in dieser Reviewfassung neu oder weiter geändert:

- `privacy/index.html`: Ads/UMP, Build 5, App-/Backenddaten, Kids, Empfänger, Löschung und Rechte neu abgeglichen.
- `account-deletion/index.html`: reale In-App-Schritte, gemeinsames Konto, lokale Daten, Retrybeleg, Backups und E-Mail-Alternative.
- `support/index.html`: getrennte KNOWI-/TALUMI-, Datenschutz- und Löschwege mit sinnvollen Betreffzeilen; vorbestehenden, nicht endnutzerbezogenen Companion-Block entfernt.
- `knowi/index.html`: vorbestehende Korrektur von „jeden Alters“ zu einer belegbaren allgemeinen Beschreibung beibehalten.
- `app-ads.txt`: belegte Sellerzeile eingesetzt.
- `.well-known/apple-app-site-association` und Rootkopie: aus signierten Build-5-Entitlements finalisiert.
- `assets/css/styles.css`: Navigation bei 200 % Textvergrößerung ohne horizontalen Überlauf.
- `README.md`, `scripts/check_site.py`, `scripts/finalize_aasa.py`, `scripts/predeploy_validate.py`, `tests/test_predeploy_validate.py`: Hosting-/AASA-/app-ads-/Fragmentprüfung aktualisiert.
- `scripts/browser_audit.cjs` und `docs/release/screenshots/*`: reproduzierbarer Browseraudit und vier Reviewbilder.

Unverändert, weil bereits konsistent: `index.html`, `talumi/index.html`, `imprint/index.html`, `terms/index.html`, `robots.txt`, `sitemap.xml`, Markenbilder und eigenes Vanilla-JavaScript. Storeflächen bleiben inaktiv „Bald …“, weil keine öffentliche Storeverfügbarkeit belegt ist.

## 2. Deployment- und Hostingbefund

| Rolle | Nachweis | Status |
| --- | --- | --- |
| Registrar / DNS | netcup wird im Auftrag genannt; lokale oder öffentliche Evidenz für die genaue Rolle fehlt | `EXTERN / NICHT VERIFIZIERBAR` |
| Websitehost / CDN | README: GitHub Pages aus `main` und `/ (root)`; `CNAME=jm-apps.de`; HTTP/2-Antwort am 30.09.2026: `server: GitHub.com`, GitHub/Fastly-Header, keine beobachtete Weiterleitung | `AKTIV VERWENDET` |
| APIhost / Datenbank | `render.yaml`: Render-Webservice und PostgreSQL in Frankfurt; öffentliches `/health`: 200, `server: cloudflare`, `x-render-origin-server: uvicorn` | `KONFIGURIERT`; konkrete laufende Ressource/Verträge nur teilweise extern verifizierbar |
| E-Mail | öffentliche Supportadresse ist Gmail; Backend unterstützt konfigurierbaren SMTP-Versand | Gmail `AKTIV VERWENDET`; SMTP-Anbieter `EXTERN / NICHT VERIFIZIERBAR` |

Livebefund vor Deploy: `/`, `/privacy/`, `/support/`, `/account-deletion/` und weitere Produkt-/Legalrouten 200; `/app-ads.txt` 200 aber leer; beide AASA-Pfade und `/.well-known/assetlinks.json` 404. Das ist der alte öffentliche Stand und kein Fehler der lokalen Fassung.

Risiko: Ein Push/Merge nach `main` kann ohne weiteren manuellen Build unmittelbar live gehen. Keine GitHub-Action liegt im Repository; Pages-Settings sind trotzdem vor jeder Freigabe erneut extern zu prüfen. Keine netcup-Migration, `.htaccess`, DNSänderung oder Proxyarchitektur wurde erfunden.

## 3. Evidenzgrundlage und Statusbegriffe

Statusangaben sind absichtlich nicht gegenseitig ausschließend:

- `IMPLEMENTIERT`: Quellpfad/Funktion vorhanden.
- `KONFIGURIERT`: Release-/Plattformkonfiguration vorhanden.
- `AKTIV VERWENDET`: im untersuchten Releasepfad aufgerufen oder in einem Artefakt wirksam.
- `NICHT VERWENDET`: in klar benanntem Umfang negativ belegt.
- `EXTERN / NICHT VERIFIZIERBAR`: Portal, Vertrag, Productionruntime oder fremde Infrastruktur nicht zugänglich.

Appartefakte:

| Kandidat | Evidenz |
| --- | --- |
| KNOWI iOS | Build 5, `de.jmapps.knowi`, SHA-256 `8cffd99e1a64ae87a54892e333c97ca91e630e3693fe6281a3c999d7f9d38d29`; Distribution-Entitlements enthalten `26TTLFCACJ.de.jmapps.knowi`, `applinks:jm-apps.de`, `get-task-allow=false`; GMA-App-ID vorhanden, verzögerte Messinitialisierung wahr, keine ATT-Usage-Description. |
| TALUMI iOS | Build 5, `de.jmapps.talumi`, SHA-256 `551063bcd75b2dcd27213a597e5dd296a0de40980bdd9f0cf7a087132b619364`; entsprechender Application-Identifier/Associated Domain; keine ATT-Usage-Description. |
| KNOWI Android | AAB Build 5, SHA-256 `ba3675c4e89bfa5899ee16bae7e34c09a5e1cd7c7d7b46eb1feaceaff9b89646`; merged Manifest enthält AD_ID/AdServices, Produktions-App-ID und MobileAdsInitProvider; Release-Pushkomponenten entfernt. |
| TALUMI Android | AAB Build 5, SHA-256 `45678811e562b9ac26a6cc3e9be1b5bd5e47f217f51d31642ed4d1f954c2e077`; merged Manifest enthält AD_ID/AdServices, Produktions-App-ID, MobileAdsInitProvider und ML-Kit-Komponenten. |

Aufgelöste relevante SDKs: Flutter-Plug-in `google_mobile_ads 9.1.0`; iOS GMA 13.9.0 / UMP 3.1.0; Android GMA 25.4.0 / UMP 4.0.0; `app_links 7.2.1`; `flutter_secure_storage 10.3.2`; `shared_preferences 2.5.5`; TALUMI `mobile_scanner 7.4.1`; KNOWI Firebase Core 4.15.0 / Messaging 16.7.0 ohne Firebase Analytics.

## 4. Datenflussmatrix

### WEBSITE

| Funktion / Datenfluss | Datenkategorie / Felder | Auslöser / Nutzergruppe | Zweck | Quelle → Empfänger | Dienstleister / Rolle | Ebene | Speicher / Frist | Nutzersteuerung | Rechtsgrundlage | Policy-Relevanz | Apple | Play | Quelle / Commit / Datum | Evidenzstatus |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Statische Auslieferung | IP, Zeit, Ressource, HTTP-/Clientdaten | jeder Abruf | Auslieferung, Stabilität, Sicherheit | Browser → GitHub/Fastly | GitHub, Websitehosting/CDN | Übertragung/Provider | GitHub-Frist nicht belegt | Abruf vermeiden; Browser-/Netzwerksteuerung | Art. 6(1)(f), fachjuristisch bestätigen | ja | N/A | N/A | Liveheader + README, 30.09.2026 | `AKTIV VERWENDET`; Retention/Transfer `EXTERN` |
| Website-JavaScript | Menüstatus im DOM; lokales Jahr | Seitenaufruf/Interaktion | Navigation | Browser → nur Browser | keiner | lokal, flüchtig | bis Seitenende | JS/Browser | keine zusätzliche personenbezogene Verarbeitung festgestellt | ja, Negativaussage | N/A | N/A | `assets/js/main.js:1-35`, Browseraudit | `IMPLEMENTIERT`, `AKTIV VERWENDET`; Cookies/Storage/3rd party `NICHT VERWENDET` im geprüften Umfang |
| E-Mailkontakt | Adresse, Betreff, Inhalt, Zustelldaten | freiwillige Support-/Rechteanfrage | Bearbeitung/Nachweis | Mailclient → Google/Empfänger-Mailprovider | Google, Mailboxdienst; Vertragsrolle offen | Übertragung/serverseitig | erforderlicher Bearbeitungs-/Nachweiszeitraum; keine feste belegte Frist | freiwillig; Inhalt minimieren | Art. 6(1)(b)/(f), je Anfrage | ja | Customer Support, fallabhängig | Entwicklerkommunikation/Accountmanagement, fallabhängig | öffentliche Seiten/README, 30.09.2026 | `IMPLEMENTIERT`; Mailbox `AKTIV VERWENDET`; Vertragsdetails `EXTERN` |

### KNOWI iOS

| Funktion / Datenfluss | Datenkategorie / Felder | Auslöser / Nutzergruppe | Zweck | Quelle → Empfänger | Dienstleister / Rolle | Ebene | Speicher / Frist | Nutzersteuerung | Rechtsgrundlage | Policy-Relevanz | Apple | Play | Quelle / Commit / Datum | Evidenzstatus |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Gast/Konto/Auth | UUID, Typ/Status, Benutzer-/Anzeigename, optionale E-Mail, Hashes, Sitzungszeiten | Onlinebootstrap; freiwillige Registrierung/Login | Identität, Konto, Sync/Sozialfunktionen | App → JM-API/DB | Render/Cloudflare; Rollen offen | Keychain + HTTPS + Server | Konto; Access 20 min, Refresh 30 T., Gast bis 365 T.; physische Expired-Row-Frist offen | lokale Nutzung teilweise möglich; Logout/Löschung | Art. 6(1)(b), Sicherheit Art. 6(1)(f) | ja | Name, Email, User ID; verknüpft, Funktion/Account | Name, Email, User IDs; erhoben, Funktion/Account, optional soweit Gastmodus | `connected_accounts`, Backend `models/user.py`, Build 5, 30.09. | `IMPLEMENTIERT`, `KONFIGURIERT`, `AKTIV VERWENDET` |
| Lernen/Quiz/Sync/Sozial | Quiz-/Frage-/Antwort-IDs, Auswahl, Richtigkeit, Zeit, Punkte, Fortschritt, Daily, Karten/Notizen, Freundschaften, Duelle/Nachrichten | lokale Nutzung; Sync/Sozial teils registriert | Appfunktion, Lernfortschritt, Vergleich | Gerät ↔ JM-Backend; begrenzte DTOs an Freunde/Gegner | erster Teil JM/Hosting; andere Nutzer als erwartete Empfänger | lokal + HTTPS + Server | lokale Dateien; Server bis Inhalt-/Kontolöschung; Historien/Tombstones offen | Funktion wählen; Inhalte löschen; Konto löschen | überwiegend Art. 6(1)(b); Missbrauch Art. 6(1)(f), offen prüfen | ja | Gameplay/Other User Content, Product Interaction, Contacts/social graph | App activity/Other actions, UGC, Contacts; Funktion/optional je Feature | `apps/knowi/lib/core/sync`, Backend sync/social/duel; relevante Dateien identisch `origin/main d53063b`, 30.09. | `IMPLEMENTIERT`, `AKTIV VERWENDET`; Productiondeploy einzelner Pfade nicht vollständig runtimeverifiziert |
| Ads/UMP | IP/ungefähre Region, Appstarts/Interaktionen, Diagnostik/Performance, Device-/App-/Ad-ID, Advertising Data; keine App-Profildaten als Requestparameter | Appstart nach UMP; Placements nur allgemeiner Kontext | Consent, Werbung/Messung, Analytics, Betrugsprävention | App → Google/konfigurierte Adpartner | Google/Adpartner; genaue Portalliste offen | SDK lokal + Übertragung | Google/Partnerfristen offen; lokale UMP-Daten SDK-verwaltet; lokale Frequenzzähler | UMP; Privacy Options wenn `required`; Kernnutzung bei Ablehnung | Einwilligung, soweit erforderlich; übrige Zwecke/Interessen fachjuristisch offen | zwingend | Device ID, Advertising Data, Diagnostics, Performance, Product Interaction, ggf. coarse location; Tracking/Linkage offen | Device IDs, Approx. location, App interactions, Diagnostics; erhoben/geteilt für Ads/Analytics/Fraud nach SDK-Definition | `ad_core.dart:130-403,480-804`, iOS Build 5, 30.09. | `IMPLEMENTIERT`, `KONFIGURIERT`, `AKTIV VERWENDET` im Kandidat; echte Productionauslieferung `EXTERN` |
| Kids-Grenze | lokales Alter; bei Sync Altersband; keine Ad Requests innerhalb Kids | Kids-Modus | kindgerechte Lernerfahrung / Requestblock | lokal; Altersband ggf. JM-Backend | JM; SDK kann vorher appweit initialisiert sein | lokal/optional Server | Konto-/Inhaltslebensdauer; lokale Auswahl bis Löschung | Kids-Modus/Syncwahl; keine neutrale Altersprüfung | Appfunktion; Zielgruppe/Art. 8/Families offen | zwingend präzise begrenzen | Gameplay/Other User Content; SDKfluss appweit gesondert | Other info/Other actions; SDKfluss appweit gesondert | Ads-Policy `AdAudienceContext.knowiKids`, Build-5-Tests/Report | `IMPLEMENTIERT`; Kids Ad Requests `NICHT VERWENDET`; Audiencegate offen |
| Push | FCM-Token/Installation/Ereignis bei Aktivierung | Release Build 5 | im Kandidat nicht aktiv | keine Releaseübertragung belegt | Firebase wäre Dienstleister | Release: nicht aktiv | N/A im Release; Backendmodelle vorhanden | N/A | N/A solange aus | Negativaussage eng begrenzen | nicht als aktuelle Collection | nicht als aktuelle Collection | Releaseentitlements/Manifest; `push_controller.dart`; ADS_READINESS | Code `IMPLEMENTIERT`, Release `KONFIGURIERT AUS`, Releasepfad `NICHT VERWENDET` |

### KNOWI Android

| Funktion / Datenfluss | Datenkategorie / Felder | Auslöser / Nutzergruppe | Zweck | Quelle → Empfänger | Dienstleister / Rolle | Ebene | Speicher / Frist | Nutzersteuerung | Rechtsgrundlage | Policy-Relevanz | Apple | Play | Quelle / Commit / Datum | Evidenzstatus |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Konto + KNOWI-Daten | wie KNOWI iOS | wie KNOWI iOS | App-/Kontofunktion | App ↔ JM-Backend/Teilnehmende | Render/Cloudflare | Secure Storage, lokale JSON-Dateien, HTTPS, Server | wie oben; geschützter Speicher von Android-Backup ausgeschlossen | Gastmodus, Featurewahl, Löschung | wie oben | ja | N/A | User IDs/Name/Email, Contacts, UGC, App activity/Other actions; Funktion/Account, teils optional | App-/Backendcode + Build 5 | `IMPLEMENTIERT`, `AKTIV VERWENDET` |
| GMA/UMP + Werbe-ID | SDKdaten wie oben; Android Advertising ID, App Set ID und ggf. weitere Geräte-/Kontokennungen | UMP-Freigabe und Placement | Werbung, Analytics, Betrugsprävention | App → Google/Adpartner | Google/Partner | SDK + HTTPS | Providerfristen offen; lokale Frequenzwerte | UMP/Privacy Options; Android Werbe-ID-Steuerung | Einwilligung/weitere Prüfung | zwingend | N/A | Approximate location, App interactions, Diagnostics, Device IDs; collected/shared; Ads, Analytics, Fraud; nicht ephemeral für Profilzwecke annehmen | merged Manifest Build 5: AD_ID/AdServices/MobileAdsInitProvider; GMA 25.4.0 | `KONFIGURIERT`, `AKTIV VERWENDET` im Kandidat; Portal/real Ads `EXTERN` |
| HTTPS-App-Links | aufgerufene URL/Pfad; Daily/Friends/Duell-ID | Nutzer öffnet passenden Link | sichere Navigation | Android/Browser → App; Domainprüfung gegen Website | Android/Google-Resolver | OS/App, flüchtig | Inbox bis Verbrauch | Link nicht öffnen | Appfunktion | ja als Funktions-/Associationangabe | N/A | keine gesonderte Collection bei rein lokaler Übergabe | Manifest `autoVerify`; `app_links.dart:5-40`; Build 5 | `IMPLEMENTIERT`, `KONFIGURIERT`; Websitezuordnung durch fehlenden Play-Fingerprint `BLOCKED` |
| Push | wie iOS; Releasekomponenten und Notification-Permission entfernt | Build 5 | nicht aktiv | keine Releaseübertragung belegt | Firebase im Quellbaum | Release nicht aktiv | N/A | N/A | N/A | eng begrenzte Negativaussage | N/A | nicht gesammelt im Releasepfad | Releaseoverlay/merged Manifest | Code `IMPLEMENTIERT`, Release `NICHT VERWENDET` |

### TALUMI iOS

| Funktion / Datenfluss | Datenkategorie / Felder | Auslöser / Nutzergruppe | Zweck | Quelle → Empfänger | Dienstleister / Rolle | Ebene | Speicher / Frist | Nutzersteuerung | Rechtsgrundlage | Policy-Relevanz | Apple | Play | Quelle / Commit / Datum | Evidenzstatus |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Konto/Favoriten/Präferenzen/Sync | gemeinsames Konto; Anzeigename, Kontext, Mood, Favoriten, Prompt-/Sitzungs-IDs und Zeiten | Onlinebootstrap; freiwilliges Konto/Sync | Konto, Personalisierung, Verlauf | App ↔ JM-Backend | Render/Cloudflare | Keychain/lokal/HTTPS/Server | Konto-/Inhaltslebensdauer; einzelne Retention offen | lokale Nutzung, Syncwahl, Löschung | Art. 6(1)(b)/(f), prüfen | ja | Name/User ID/Email; Gameplay/Other User Content/Product Interaction | Personal info/User IDs; App activity/Other actions; Funktion/Account | `talumi_repository.dart:11-273`, Synccode, Backend | `IMPLEMENTIERT`, `AKTIV VERWENDET` |
| Together/Party | Raumcode, Teilnehmer-ID/Name, Account-ID, Status, Stimmen, Auswahl, Zeit, Recovery; ausdrücklich eingegebene eigene Begriffe | Nutzer erstellt/betritt Raum | Mehrspieler-/Gesprächsfunktion | Teilnehmergeräte ↔ JM-Backend ↔ berechtigte Raumteilnehmer | JM/Hosting | Secure Storage + HTTPS + temporärer Serverstate | max. 6 Std.; nach Finish Secrets/Votes weg, Raum max. 10 Min.; Entrybeleg 7 T. | ausdrücklicher Beitritt/Eingabe; Leave/Löschung | Art. 6(1)(b); Sicherheit Art. 6(1)(f) | ja | Name/User ID, Gameplay/Other User Content, Product Interaction | Name/User IDs, UGC, Other actions; funktional/optional | `together_client.dart`, Backend `talumi/*`; Löschservice | `IMPLEMENTIERT`, `AKTIV VERWENDET`; Spoken answers/Mikrofon `NICHT VERWENDET` im Appcode |
| QR-Kamera | Kameraframes lokal; erkannter öffentlicher Raumcode; SDK-Diagnostik möglich | Nutzer öffnet Scanner | QR-Beitritt | Kamera → lokaler Scanner; SDK ggf. Google | Google ML Kit indirekt über Scanner | lokal + mögliche SDK-Übertragung | keine First-party Bildspeicherung; SDK-Frist offen | Scanner optional; manueller Code möglich | Appfunktion; SDKdiagnostik gesondert prüfen | ja | Photos/Video `NICHT` als First-party Collection; Diagnostics/Device ID möglich | Photos/Videos nicht First-party collected; Device IDs/Diagnostics durch SDK prüfen | `qr_scanner_screen.dart`, `mobile_scanner 7.4.1`, Build 5 | Scanner `AKTIV`; Upload/Speicherung von Frames im JM-Code `NICHT VERWENDET` |
| Ads/UMP | wie KNOWI ohne Kids-Grenze | Appstart/zulässige Home-/Sessionabschluss-/Exit-Placements | Consent/Werbung/Messung | App → Google/Partner | Google/Partner | SDK + Übertragung | offen / lokale Frequenzwerte | UMP/Privacy Options | wie KNOWI | zwingend | Device ID/Advertising/Diagnostics/Performance/Interaction; Tracking offen | N/A | `ad_core`, TALUMI Build 5 | `IMPLEMENTIERT`, `AKTIV VERWENDET` im Kandidat; echte Productionauslieferung `EXTERN` |

### TALUMI Android

| Funktion / Datenfluss | Datenkategorie / Felder | Auslöser / Nutzergruppe | Zweck | Quelle → Empfänger | Dienstleister / Rolle | Ebene | Speicher / Frist | Nutzersteuerung | Rechtsgrundlage | Policy-Relevanz | Apple | Play | Quelle / Commit / Datum | Evidenzstatus |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Konto/Sync/Together | wie TALUMI iOS | wie TALUMI iOS | App-/Kontofunktion | App ↔ JM-Backend/Teilnehmende | Render/Cloudflare | Secure Storage/lokal/HTTPS/Server | wie oben | wie oben | wie oben | ja | N/A | Name/User IDs/Email, UGC, App activity/Other actions; Funktion/Account, teils optional | App-/Backendcode + Build 5 | `IMPLEMENTIERT`, `AKTIV VERWENDET` |
| QR/ML Kit | Frames lokal; Raumcode; mögliche Installations-/App-/Performance-/Konfigurations-/Event-/Fehlerdaten | optionaler Scanner | QR + SDKdiagnose | Kamera lokal; SDK ggf. Google | Google ML Kit | lokal + mögliche Übertragung | keine First-party Bildspeicherung; Vendorfristen offen | manueller Code statt Kamera | Vertrag/Appfunktion; SDKzwecke prüfen | ja | N/A | Device IDs, Diagnostics/App interactions als SDK-Kandidaten; Camera frames nicht First-party collection | merged Manifest ML-Kit-Registrar; Scanner 7.4.1 | `IMPLEMENTIERT`, `AKTIV VERWENDET`; konkrete Vendorruntime `EXTERN` |
| GMA/UMP + AD_ID | wie KNOWI Android | UMP-Freigabe + Placement | Ads/Analytics/Fraud | App → Google/Partner | Google/Partner | SDK + HTTPS | Providerfristen offen | UMP/Privacy Options/OS | offen | zwingend | N/A | Approximate location, App interactions, Diagnostics, Device IDs; Ads/Analytics/Fraud | merged Manifest Build 5 | `KONFIGURIERT`, `AKTIV VERWENDET` im Kandidat; Portal `EXTERN` |
| App-Link | TALUMI-Join-URL und öffentlicher 6-Zeichen-Code; keine Capability | Link/QR öffnen | Raumbeitritt | OS/Browser → App | Android-Resolver | lokal/flüchtig | bis Navigation | Link nicht öffnen/manueller Code | Appfunktion | ja | N/A | keine gesonderte Collection allein durch lokale Übergabe | Manifest `/talumi/join/`; `join_invitation.dart:1-25` | `IMPLEMENTIERT`, `KONFIGURIERT`; Websitezuordnung `BLOCKED` |

### GEMEINSAMES BACKEND

| Funktion / Datenfluss | Datenkategorie / Felder | Auslöser / Nutzergruppe | Zweck | Quelle → Empfänger | Dienstleister / Rolle | Ebene | Speicher / Frist | Nutzersteuerung | Rechtsgrundlage | Policy-Relevanz | Apple | Play | Quelle / Commit / Datum | Evidenzstatus |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Identität/Auth/Recovery | UUID, Accounttyp/status, Nutzer-/Anzeigename, optionale E-Mail, Argon2id-/HMAC-Hashes, Sitzungen, 10-Min.-Actioncodes | Gastbootstrap, Register/Login/Recovery | Konto/Sicherheit | Apps → API → PostgreSQL; E-Mail ggf. SMTP | Render/Cloudflare; SMTP offen | Server + Mailtransfer | Konto; Tokenlaufzeiten 20 Min./30 T./365 T.; Actioncode 10 Min.; physische Altrow-Frist offen | Gastmodus, Login/Logout/Löschung, optionale E-Mail | Art. 6(1)(b)/(f), Mail/Rechtsfragen prüfen | ja | Name/Email/User ID | Name/Email/User IDs; Accountmanagement | Backend user/account/recovery, `origin/main d53063b`, 30.09. | `IMPLEMENTIERT`; Productionkonfiguration teilweise `EXTERN` |
| Sync/Daily/Freunde/Duelle | Eigentümer-IDs, Payloads, Punkte, Antworten, Zeiten, Graph, Nachrichten | registrierte/ausdrücklich genutzte Features | Appfunktion | App ↔ API/DB ↔ berechtigte Mitspieler | JM/Hosting | Server | meist bis Inhalts-/Kontolöschung; abgeschlossene Historien/Tombstones offen | Featurewahl, Inhalt-/Kontolöschung | Art. 6(1)(b); Integrität/Sicherheit (f) | ja | UGC/Gameplay/Contacts/Product Interaction | UGC/Contacts/App activity/Other actions | models/sync/social/duel + APIs | `IMPLEMENTIERT`, `AKTIV VERWENDET` im Code; aktuelle Productionversion nicht per Commitheader belegt |
| TALUMI-Räume | siehe TALUMI | Raumfunktion | temporärer Multiplayer | Apps ↔ API/DB ↔ Raumteilnehmer | JM/Hosting | Server | 6 Std.; finish 10 Min.; Entry 7 T. | Join/Leave/Finish/Löschung | Art. 6(1)(b)/(f) | ja | wie oben | wie oben | `backend/app/talumi/*` | `IMPLEMENTIERT` |
| Betrieb/Activity | Request-ID, Routenvorlage, Methode, Status, Dauer; Konto/App/UTC-Tag | API-Aufruf | Sicherheit/Betrieb/grobe Nutzung | API → Logs/DB/Provider | JM, Render, Cloudflare | Server/Provider | Activity-Code 35 T.; Schedulernachweis offen; Providerlogs/backups offen | keine direkte UI; Rechteanfrage | Art. 6(1)(f), Abwägung/Fristen offen | ja | Diagnostics/Product Interaction | Diagnostics/App interactions | logging/analytics + `RETENTION_DAYS=35` | `IMPLEMENTIERT`; regelmäßige Productionbereinigung `EXTERN` |
| Kontolöschung | authentifizierter Löschauftrag, Request-Key; HMAC-Beleg ohne User-ID | Gast oder Konto bestätigt in App | vollständige Löschung/sichere Wiederholung | App → API/DB; lokale Cleanupjournale | JM/Hosting | lokal + Servertransaktion | Userdaten gelöscht; HMAC-Beleg 7 T.; fremde Inhalte bleiben, Identitätsbezug entfernt | klare Bestätigung; Retry; E-Mail-Alternative | Art. 6(1)(b)/(c), genaue Einordnung prüfen | zwingend | Account deletion | Deletion request | `account_service.dart:253-373`; `account_deletion.py:20-121`; Tests | `IMPLEMENTIERT`; lokaler Testnachweis, keine echte Productionlöschung ausgeführt |

## 5. AdMob, UMP, ATT und Kids

- Nur Native und Interstitial sind implementiert. Rewarded, Banner, Rewarded Interstitial und App Open wurden im Quell-/Artefaktaudit nicht gefunden.
- UMP-Reihenfolge entspricht der installierten API: `requestConsentInfoUpdate` → `loadAndShowConsentFormIfRequired` → Requirementstatus/`canRequestAds`; doppelte Initialisierung wird zentral verhindert. Bei Updatefehler darf nur ein bereits autoritativer früherer `canRequestAds=true`-Status genutzt werden; sonst fail-closed.
- Privacy Options sind als `AdPrivacyEntry` integriert: KNOWI Profil/App & Hilfe, TALUMI Einstellungen. Sichtbarkeit hängt korrekt von `PrivacyOptionsRequirementStatus.required` ab. `reset()` ist nur als Testutility erreichbar.
- Erste Appsession, erste Contentsession und unter zehn Minuten aktive Nutzung sperren Interstitials. Cooldown mindestens 15 Minuten; keine direkt folgende Contentsession; Native und Interstitial nicht in derselben Contentsession.
- KNOWI Kids blockiert Native, Interstitial und Preload vor Requesterstellung. UMP-Update und mögliche SDK-Initialisierung starten trotzdem appweit beim Start. Daher keine pauschale „keine Werbedaten von Kindern“-Aussage.
- No-fill, Offline, Consent-/Loadfehler und 15-Sekunden-Timeout blockieren die Kernnavigation nicht.
- Requests sind normale `AdRequest()` ohne erzwungenes NPA. Globales Inhaltsrating `T`; keine pauschalen Child-/Under-Age-Tags. Das ist weder Altersprüfung noch Families-Nachweis.
- iOS: kein ATT-Code, kein Usage-String, keine appseitige IDFA-Abfrage. Ob die tatsächliche Portal-/Partnerkonfiguration Apple-Tracking auslöst, bleibt offen.
- Android: Build 5 enthält AD_ID und AdServices-Rechte. Die gemeldete Play-Erklärung „Werbe-ID: Ja / Werbung oder Marketing“ ist damit technisch konsistent; zusätzliche SDKzwecke Analytics und Betrugsprävention sind für Data Safety gesondert zu bewerten.
- `app-ads.txt`: exakt `google.com, pub-9100319027189512, DIRECT, f08c47fec0942fa0`; Herkunft ist der aktuelle lokale Ads-/Releasehandoff, nicht aus einer App-ID geraten. Öffentliche Crawlerprüfung bleibt nach Deploy offen.

## 6. Löschung und Support

In-App-Pfad und Backendwirkung sind codeverifiziert. Automatisch erzeugte Servergäste werden eingeschlossen. Ein registriertes Konto gilt appübergreifend; lokale Datenbereinigung erfolgt nur in der ausführenden Installation, andere Offlinegeräte bleiben außerhalb unmittelbarer Fernwirkung. Gemeinsame Duelle/Räume werden beendet beziehungsweise entkoppelt; fremde Inhalte werden nicht gelöscht. Die Website verlangt keine Passwörter/Tokens per E-Mail.

Apple- und Google-Grundanforderungen sind technisch vorbereitet: In-App-Initiierung existiert und die öffentliche Webressource beschreibt den alternativen Weg. Nicht durchgeführt wurde eine echte Löschung auf Produktion. Backend-/Restorebetrieb muss sicherstellen, dass gelöschte Daten nicht unkontrolliert aus Backups wieder wirksam werden.

Support bietet getrennte KNOWI-/TALUMI-Mailkontakte, Datenschutzanfrage und Löschseite. Minimal erforderliche Appkorrektur außerhalb des Scopes: freigegebene Kontaktadresse in `LegalLinks.contact` angleichen.

## 7. Impressum und rechtliche Einordnung

`imprint/index.html` enthält den bestehenden Betreiber, ladungsfähige Anschrift und E-Mail. § 5 DDG verlangt unter anderem Name/Anschrift und eine schnelle elektronische Kontaktaufnahme einschließlich E-Mail. Register, Aufsichtsbehörde, berufsrechtliche oder Umsatzsteuer-/Wirtschafts-ID-Angaben sind nur bei tatsächlicher Einschlägigkeit aufzunehmen; nichts wurde erfunden, und keine persönliche Steuernummer wurde veröffentlicht.

Offen für fachjuristische/Betreiberprüfung: tatsächliche geschäftliche Konstellation, gegebenenfalls vorhandene USt-/Wirtschafts-ID, VSBG-Anwendbarkeit, DSA-Traderstatus, Rechtsgrundlagen/Interessenabwägungen, Art.-28-/Drittlandrollen, Zielgruppe/Minderjährige und konkrete Retention. Storetelefon/DSA-Kontakte wurden nicht als Websitepflicht konstruiert.

## 8. AASA und Android App Links

### Apple

Lokale AASA ist **inhaltlich PASS**:

- KNOWI: `26TTLFCACJ.de.jmapps.knowi`; Komponenten exakt `/knowi/daily`, `/knowi/friends`, `/knowi/duel/*`.
- TALUMI: `26TTLFCACJ.de.jmapps.talumi`; Komponente exakt `/talumi/join/*`.
- Beide signierten Build-5-IPAs enthalten denselben `application-identifier` und `applinks:jm-apps.de`.
- KNOWI-Parser akzeptiert nur exakte Daily/Friends-URLs oder lowercase UUIDs; TALUMI akzeptiert nur sechs erlaubte Zeichen und keine Query-/Fragment-/Credential-/Portvarianten. AASA gibt keinen Backendzugriff frei.
- Root- und `/.well-known/`-Datei sind byteidentisch und valides JSON.

Nach Deploy weiterhin `BLOCKED`: HTTPS 200 ohne Redirect/Login, tatsächliches `application/json`, Apple-CDN-Abruf und echtes Geräteverhalten. Der Pythonserver belegt keinen GitHub-Pages-MIME-Type.

Der lokale Pythonserver liefert die extensionlosen Dateien erwartungsgemäß als `application/octet-stream`; das ist ausdrücklich kein Produktionsnachweis. GitHub Pages erlaubt in diesem Branch-Deploy keine lokale Headerkonfiguration. Ob Pages die AASA-Sonderdatei nach dem Deploy akzeptabel ausliefert, muss deshalb mit echten Responseheadern geprüft werden. Falls nicht, ist eine gesonderte Hostingentscheidung nötig; eine Proxy-/Hostingmigration ist nicht Teil dieses Auftrags.

### Android

`assetlinks.json` ist **anwendbar, aber BLOCKED**. Beide merged Manifeste enthalten `android:autoVerify=true` für getrennte Pfade. Erforderlich sind die Play-App-Signing-Zertifikate für `de.jmapps.knowi` und `de.jmapps.talumi`. Lokale Upload-/Debug-Fingerprints wurden absichtlich nicht eingesetzt. Das Kandidatentemplate bleibt nur unter `docs/` und wird nicht als `/.well-known/assetlinks.json` ausgeliefert.

## 9. Storekonsistenzmatrix

### KNOWI iOS

| Belegter Datenfluss | Website | Apple-Vorschlag | UMP/AdMob | Nachweis | Offen |
| --- | --- | --- | --- | --- | --- |
| Konto/Gast/Sync/Social | §§ 3, 5, 8 | Name, Email Address, User ID; Contacts/social graph; Gameplay/Other User Content; Product Interaction; überwiegend linked, App Functionality/Account Management | keine Übergabe als Adparameter | Build 5 + Source/Backend | finale App-Privacy-Portalantwort und optionale/regionale Varianten |
| GMA/UMP | § 4 | Device ID, Advertising Data, Diagnostics, Performance Data, Product Interaction, ggf. Coarse Location; Third-Party Advertising/Analytics; linked/tracking nach realer Konfiguration | normaler Request, T, Privacy Options | GMA 13.9/UMP 3.1 im IPA | Adpartner/Tracking/ATT/Portal |
| Kids | § 5 eng begrenzt | lokale Daten nicht automatisch „collected“; synchronisiertes Altersband/Gameplay berücksichtigen; appweiter SDKfluss bleibt | keine Requests im Kids-Modus | Policytests | Kids Category/Audience/unknown age |

### KNOWI Android

| Belegter Datenfluss | Website | Play-Vorschlag | UMP/AdMob | Nachweis | Offen |
| --- | --- | --- | --- | --- | --- |
| Konto/Sync/Social | §§ 3, 5, 8 | Name/Email/User IDs, Contacts, UGC, App activity/Other actions; collected; service-provider exception nur nach Vertragsprüfung; account features optional soweit Gastmodus real nutzbar; Löschung vorhanden | N/A | Source/Backend | Portalstatus/Sharingklassifikation |
| GMA/UMP/AD_ID | § 4 | Approximate location, App interactions, Diagnostics, Device IDs; collected/shared laut SDK-Hinweis; Ads/Marketing, Analytics, Fraud Prevention; nicht pauschal ephemeral | GMA 25.4 (offizielle Seite beschreibt 25.5.0 und darf nicht schematisch kopiert werden), UMP 4.0 | merged Build-5-Manifest | versionspezifische Abweichung/Portalpartner |
| Push | § 3 sagt Build 5 aus | keine aktuelle Collection im Releasepfad | aus | Releaseoverlay | späterer Aktivierungsbuild |

### TALUMI iOS

| Belegter Datenfluss | Website | Apple-Vorschlag | UMP/AdMob | Nachweis | Offen |
| --- | --- | --- | --- | --- | --- |
| Konto/Sync/Together | §§ 3, 6, 8 | Name/Email/User ID; Gameplay/Other User Content/Product Interaction; linked soweit Konto/Raum | keine Accountdaten als Adparameter | Source/Backend/Build 5 | finale Portalantwort |
| Kamera/QR | § 6 | keine First-party Photos/Video-Collection belegt; Device ID/Diagnostics durch Scanner-SDK prüfen | N/A | Scanner-/Manifestaudit | Apple aggregate privacy report |
| Ads | § 4 | wie KNOWI iOS | normaler Request, T, UMP | IPA | Tracking/ATT/Partner |

### TALUMI Android

| Belegter Datenfluss | Website | Play-Vorschlag | UMP/AdMob | Nachweis | Offen |
| --- | --- | --- | --- | --- | --- |
| Konto/Sync/Together | §§ 3, 6, 8 | Name/Email/User IDs, UGC, Other actions; Funktion/Account; Löschung vorhanden | N/A | Source/Backend | Sharing-/optional-/ephemeral-Portalantworten |
| QR/ML Kit | § 6 | Device IDs, Diagnostics und App interactions nach tatsächlicher ML-Kit-Verarbeitung; Kameraframes nicht als First-party Upload | N/A | merged Manifest + Scanner | Vendorversionscheck |
| Ads/AD_ID | § 4 | wie KNOWI Android | normaler Request, T, UMP | AAB/Manifest | Partner/Portal |

Keine Portalangabe wurde gelesen, geändert oder als bereits eingereicht ausgegeben. Storetaxonomien wurden nicht 1:1 gleichgesetzt. Reine lokale Daten, vorübergehende Übertragung und serverseitige Speicherung sind getrennt beschrieben.

## 10. Offizielle Quellen (Abruf 30.09.2026)

- Google UMP Flutter: <https://developers.google.com/admob/flutter/privacy> – Update bei jedem Start, Formular, sichtbare Privacy Options, `canRequestAds`, keine Production-Nutzung von `reset()`; Seite zuletzt 29.09.2026 aktualisiert.
- Google Android GMA Data Disclosure: <https://developers.google.com/admob/android/privacy/play-data-disclosure> – Seite beschreibt ausdrücklich Legacy 25.5.0; installiert ist 25.4.0, daher nur als aktuelle Anbieterorientierung und nicht als behaupteter bytegleicher SDKbericht verwendet.
- Google iOS GMA Disclosure: <https://developers.google.com/admob/ios/privacy/data-disclosure> – mögliche IP-, Crash-/Diagnose-, Performance-, Device-ID-, Advertising- und Interaktionsdaten; installiert ist GMA 13.9.0.
- Google Targeting: <https://developers.google.com/admob/flutter/targeting> – Altersbehandlung und Inhaltsrating getrennt.
- Google Data Safety: <https://support.google.com/googleplay/android-developer/answer/10787469> – SDK-Daten, Pseudonyme, ephemeral/on-device, Sharingausnahmen und Zwecke.
- Google Account Deletion: <https://support.google.com/googleplay/android-developer/answer/13327111>.
- Google Families: <https://support.google.com/googleplay/android-developer/answer/9893335>.
- Google app-ads.txt: <https://support.google.com/admob/answer/9363762>.
- Android Asset Links: <https://developer.android.com/training/app-links/configure-assetlinks> – bei Play App Signing zählt der Play-Fingerprint.
- Apple App Privacy: <https://developer.apple.com/app-store/app-privacy-details/>.
- Apple Account Deletion: <https://developer.apple.com/support/offering-account-deletion-in-your-app/>.
- Apple Third-Party SDK Requirements: <https://developer.apple.com/support/third-party-SDK-requirements/>.
- Apple Review Guidelines: <https://developer.apple.com/app-store/review/guidelines/>.
- Apple Universal Links / AASA: <https://developer.apple.com/documentation/technotes/tn3155-debugging-universal-links> und <https://developer.apple.com/documentation/xcode/supporting-associated-domains> – HTTPS, keine Weiterleitung, passende Domain/Entitlements, Header-/CDN-Prüfung.
- § 5 DDG: <https://www.gesetze-im-internet.de/ddg/__5.html>.
- § 25 TDDDG (amtliche URL weiterhin `ttdsg`): <https://www.gesetze-im-internet.de/ttdsg/__25.html>.
- GitHub Privacy: <https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement>.

## 11. Tests und Reviewfassung

| Prüfung | Ergebnis | Gegenstand / Grenze |
| --- | --- | --- |
| `python3 -B scripts/check_site.py` | `PASS` | 9 HTML-Seiten, Pflichtdateien, relative Links/Assets, Fragmente, Metadaten, Root-Escape und lokale Pfade |
| `python3 -B -m unittest discover -s tests -v` | `PASS` | 6/6 AASA-/Predeploytests |
| `python3 -B scripts/predeploy_validate.py` | `BLOCKED` erwartbar | einziger Blocker: Play-App-Signing-Platzhalter im internen `assetlinks`-Template; AASA und app-ads lokal valide |
| JSON/AASA | `PASS` lokal | beide Dateien valides, identisches JSON; IDs/Routen gegen signierte IPAs und Parser geprüft |
| app-ads Format/Inhalt | `PASS` lokal | genau eine belegte Sellerzeile + LF; öffentliche alte Datei bleibt bis Deploy leer |
| Build | `N/A` | statische HTML/CSS/JS-Website, kein Paketmanager/Buildschritt |
| Browseraudit | `PASS` | 8 Routen × 320/390/768/1440; je genau ein H1, keine Heading-Sprünge, alle Bild-Alttexte, kein horizontaler Overflow; zusätzlich 200 % Textgröße |
| Menü/Tastatur/Skiplink | `PASS` | mobiles Menü öffnen, Escape schließen, Fokus zurück; Skiplink erster Tastaturfokus |
| Browsernetzwerk/Storage | `PASS` | 0 Drittanbieterrequests, 0 fehlgeschlagene Requests, 0 Console Errors, keine Cookies/Local-/Session-Storage-Einträge |
| lokaler 404-Status | `PASS` | Pythonserver liefert für fehlende Route HTTP 404; er verwendet nicht die produktive GitHub-404-Seite |
| Live-404 | `PASS` beobachtet | `/impressum/`, AASA und assetlinks aktuell 404; `/imprint/` korrekt 200. AASA/assetlinks ändern sich erst nach Deploy. |
| öffentliche/externe Links | `PASS` mit Ausnahme N/A API-Root | GitHub/Google und bestehende Websiteziele 200. `api.jm-apps.de/health` 200; API-Root 404 ist normal und wird nicht als Website-Link angeboten. |
| Kontrast | `PASS` rechnerisch | Hauptkombinationen: 12,97:1; Sekundärtext 6,63–7,27:1; Weiß/Pflaume 14,47:1; Notice 12,3:1 |
| Browserzoom exakt | `N/A` | automatisiert wurde 200 % Textskalierung geprüft; native Browserzoom-/OS-Vergrößerung bleibt manueller Gerätecheck |
| physische Geräte / echte Ads / UMP Production | `BLOCKED` | nicht ausgeführt; keine echte Anzeige angeklickt |
| GitHub-/Apple-CDN-/AdMob-Crawler-/Produktions-MIME | `BLOCKED` | erst nach autorisiertem Deploy möglich |
| `git diff --check` | `PASS` | keine Whitespacefehler |
| Secretscan | `PASS` | keine Datei mit Private-Key-, Client-Secret-, API-Key-, Passwortzuweisungs- oder langem Bearer-Muster gefunden; öffentliche App-/Publisher-Identifier sind erwartete Konfiguration |

Lokale Vorschau:

```sh
cd jm-apps-web
python3 -m http.server 8080 --bind 127.0.0.1
```

Dann `http://127.0.0.1:8080/` öffnen. Browseraudit, sofern Playwright und Chrome vorhanden:

```sh
JM_SITE_ORIGIN=http://127.0.0.1:8080 node scripts/browser_audit.cjs
```

Reviewbilder:

- `docs/release/screenshots/home-320.png`
- `docs/release/screenshots/privacy-390.png`
- `docs/release/screenshots/support-768.png`
- `docs/release/screenshots/knowi-1440.png`

## 12. Exakter späterer statischer Veröffentlichungssatz

Der produktive Laufzeitsatz ist unten vollständig gehasht. Er enthält keine `assetlinks.json`, solange die Play-Fingerprints fehlen. Storelinks bleiben inaktiv. Scripts, Tests, Rohlogs, Buildartefakte, App-/Backendquellen und lokale `.local`-Artefakte gehören nicht zum Website-Laufzeitsatz.

| SHA-256 | Relativer Pfad |
| --- | --- |
| `01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b` | `.nojekyll` |
| `c359bf7aaabf9da66d4951343ef785d10eb1092c585a09198ea85ba79b4a3175` | `CNAME` |
| `51d4ab207f4bdc9b2cf2537f4da78469d7af898554efed3ea6760a78dd1c89ff` | `404.html` |
| `552dbc9785a5667688710b8e1f95f9ef9e1f111fb24d9897d89bd26e8b527d28` | `index.html` |
| `eae597c4b1845ac2987b9a30f5d4b72608bb1981e7259ac774b2b30e2eddfaa0` | `knowi/index.html` |
| `d4a41f23d90ef7f20c4048381987115d247bfeb3382deb55588d04fad8cd88ea` | `talumi/index.html` |
| `ad6041feb2393eeb0cb8fece9d01e5998eb6ee9ef62301e108684d6d276642f7` | `support/index.html` |
| `67296b7409d1c525be52ed8db5fe4d718a98eb4a4fa96b50eec172d1375ded57` | `privacy/index.html` |
| `7c0182ca2af70fd1f3fa6ff71c9e7a064becb8dd4470805008cf3228008ba35e` | `imprint/index.html` |
| `b08ab9e05f7bce767371fa6783e4d55b290c5913fd85922ca361c446a13f4e87` | `terms/index.html` |
| `5b670fcb88f2d459845a39d6bf994deed479fcd2825c96f813bbb836fd3fb031` | `account-deletion/index.html` |
| `34b612af0a2737b3b50af80a3e976f1f7ebb39e8f9bc200a0596623e74d7da97` | `assets/css/styles.css` |
| `61b4acd3331e1cf0c78227cf851c618ae453f148d3b6888d56898a0b67415ff8` | `assets/js/main.js` |
| `59bc70c2494a37574eb98990c89a465c44284004a7d488bea20e8fe66dc56f86` | `assets/images/favicon.svg` |
| `115b194bed8c4498be8063adf562c046569077e951ed12fb6bb2b64171c7c257` | `assets/images/knowi-mark.png` |
| `75ac1cb8744d44b7ebf618663f0cf044e7ea3f1842ae1348982ae056a0ecd0e2` | `assets/images/talumi-mark.png` |
| `bc27bdc55a8ebaa28ef718194deb32a3ee38bbe5536349d42c0f8a8ee05616a1` | `assets/images/og-jm-apps.png` |
| `868a8632aed95f005edd05ed7a6de2f2a1f41c9c2ba7b58cf1c7773ac5f93af1` | `app-ads.txt` |
| `150253e52e90c75374bd5aa833ccd5f3442182eb914148d3bddd86c002646c58` | `robots.txt` |
| `2a4a9e75d3f04a4ec02d2ee49ba7448b819dd32a78ef6d64ca1f15ff84c2b63b` | `sitemap.xml` |
| `fb8776919862331a04922086394e53151d77b926115eda2f3d2122863465a067` | `.well-known/apple-app-site-association` |
| `fb8776919862331a04922086394e53151d77b926115eda2f3d2122863465a067` | `apple-app-site-association` |

Wichtige Pages-Grenze: Weil GitHub Pages aus dem Branch-Root veröffentlicht, sind committed `README.md`-, `docs/`-, Test- und Skriptdateien grundsätzlich ebenfalls per erratbarer URL abrufbar, auch wenn sie nicht zum Produktlaufzeitsatz gehören. Dieser Bericht und die vorhandenen Auditunterlagen wurden deshalb auf öffentliche, nicht geheime Angaben beschränkt. Ein echter technischer Ausschluss dieser Pfade würde eine gesonderte Änderung des Publishingmodells erfordern und wurde nicht vorgenommen.

## 13. Gebündelte benötigte Inputs

1. Hosting: Ist GitHub Pages weiterhin der beabsichtigte Websitehost und netcup nur Registrar/DNS, oder existiert ein bereits eingerichteter netcup-Webspace, der künftig tatsächlich hosten soll?
2. Android: je App die SHA-256-Fingerprints des **Play-App-Signing-Zertifikats** beziehungsweise die exakten Digital-Asset-Links-Snippets aus Play Console; keine privaten Schlüssel und keine Upload-Key-Datei.
3. Ads/Consent/Kids: bestätigte Production-UMP-Nachricht und Adpartnerliste, reale Privacy-Options-Abnahme, Storezielgruppe/Kids-/Families-Entscheidung sowie Apple-Tracking-/ATT-Entscheidung für die tatsächliche AdMob-Konfiguration.
4. Provider/Legal: produktiver SMTP-Anbieter, Rollen/Verträge/Übermittlungsmechanismen für Render, Cloudflare, Google/Gmail und SMTP sowie Log-/Backupfristen, Restore-Löschprozess und Nachweis der 35-Tage-Aktivitätsbereinigung.
5. Appkorrektur: Freigabe/Umsetzung, `LegalLinks.contact` in den Apps auf den veröffentlichten Kontakt anzugleichen und neue Kandidaten zu bauen.
6. Erst nach Review aller Punkte: separate, ausdrückliche Deploymentfreigabe.

## 14. Externe Restprüfungen

- Store- und AdMobstatus, Developer-Website-Verknüpfung und Crawlerstatus.
- App-Privacy-/Data-Safety-Portaleinträge, DSA/Trader und qualifizierte Rechtsprüfung.
- Physische iOS-/Android-Geräte, echte Production-UMP-/No-fill-/Offline-/Resume-Pfade; keine echten Anzeigen anklicken.
- Apple-CDN-/Universal-Link- und Android-App-Link-Verifikation.
- Nach Deploy echte Header/MIME/Redirects für AASA, assetlinks und app-ads.
- GitHub-Pages-Quelle/Autodeployrisiko und netcup-Rolle vor jeder Veröffentlichung erneut bestätigen.

**Freigabefähigkeit: NEIN — HOSTING_TARGET_REQUIRED, ANDROID_SIGNING_EVIDENCE_REQUIRED, CONSENT_OPTIONS_RELEASE_BLOCKER, KIDS_AUDIENCE_OR_TRACKING_REQUIRED, LEGAL_OR_PROVIDER_INPUT_REQUIRED, App-Kontaktangleichung und DEPLOYMENT_APPROVAL_REQUIRED sind offen.**

**Übergabestatus: READY FOR WEBSITE DEPLOYMENT APPROVAL** – die lokale Fassung ist zur Freigabeentscheidung vorbereitet; dies ist keine Empfehlung oder Erlaubnis zur Veröffentlichung.

## Interner Folgepunkt vor finaler App-/Store-Veröffentlichung

Vor der finalen öffentlichen Veröffentlichung von KNOWI oder TALUMI muss Astra den vollständigen Website-, Legal- und Store-Stand erneut gegen die finalen App-Builds und Storeangaben prüfen. Die Prüfung umfasst mindestens Apple App Privacy, Google Play Data Safety, UMP/Privacy Options, Kids/Families/Altersgruppen, ATT/Tracking, Android App Links samt Play-Signing-Fingerprints, AASA, app-ads.txt, Account-Löschung, Support-/Kontaktangaben, DSA/Trader sowie Storelinks und tatsächliche öffentliche Verfügbarkeit.

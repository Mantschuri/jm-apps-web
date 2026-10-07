# JM Apps Website

Statische Website für JM Apps, das unabhängige Studio hinter KNOWI und TALUMI. Die Seite kommt ohne Build-Prozess, Tracking, Cookies oder externe Laufzeit-Abhängigkeiten aus und ist für GitHub Pages vorbereitet.

## Architektur und Struktur

Die Architektur besteht ausschließlich aus semantischem HTML, gemeinsamem CSS und wenig Vanilla-JavaScript. Alle internen Links und Assets sind dokument-relative URLs. Dadurch funktionieren sie sowohl unter der vorläufigen GitHub-Pages-Projekt-URL als auch später mit der Custom Domain.

- `index.html` – Studio-Homepage und App-Übersicht
- `knowi/` und `talumi/` – Produktseiten
- `support/` – zentraler Support-Einstieg
- `privacy/` und `imprint/` – Datenschutz- und Anbieterinformationen
- `terms/` – Nutzungsbedingungen
- `account-deletion/` – öffentlicher Account-Löschweg für App-Store-Angaben
- `assets/css/styles.css` – gemeinsames Design
- `assets/js/main.js` – mobile Navigation und dynamisches Jahr
- `assets/images/` – freigegebene Produktmarken und JM Apps Favicon
- `404.html` – Fehlerseite
- `app-ads.txt` – reserviert für den echten AdMob-Eintrag
- `robots.txt` und `sitemap.xml` – technische SEO-Dateien für `jm-apps.de`
- `scripts/check_site.py` – lokale, dependency-freie Website-Prüfung
- `docs/release-checklist.md` – offene manuelle Schritte vor dem Launch

## Lokal ansehen

Im Repository ausführen:

```sh
python3 -m http.server 8080
```

Danach [http://127.0.0.1:8080](http://127.0.0.1:8080) öffnen. Es gibt keinen Installations- oder Build-Schritt.

## Wartung und QA

Nach Änderungen die automatische Prüfung ausführen:

```sh
python3 scripts/check_site.py
```

Sie prüft erforderliche Dateien, lokale Links und Assets, zentrale Metadaten sowie versehentlich veröffentlichte lokale Pfade. Zusätzlich sollte die Seite im Browser bei Smartphone-, Tablet- und Desktopbreiten sowie mit Tastatur getestet werden. Die vollständige manuelle Launch-Liste steht in `docs/release-checklist.md`.

## Öffentlicher Kontakt

Der derzeit freigegebene allgemeine Kontakt sowie Support-, Datenschutz- und Impressumskontakt ist `contact.jm.apps@gmail.com`. Er wird zentral auf der Supportseite sowie auf den rechtlichen Seiten verwendet. Später kann er durch eine dedizierte Domain-Adresse wie `support@jm-apps.de` ersetzt werden; dann müssen `support/index.html`, `privacy/index.html`, `imprint/index.html`, `terms/index.html`, `account-deletion/index.html` und diese Dokumentation gemeinsam aktualisiert werden.

## Vor dem öffentlichen Start

Die Betreiber- und Kontaktangaben sind mit den freigegebenen Daten befüllt. Folgende externe Angaben und Prüfungen bleiben offen:

1. Impressum, Website-Datenschutz, Nutzungsbedingungen und die release-spezifischen Datenschutzhinweise müssen final professionell rechtlich geprüft werden.
2. iOS-CTAs für KNOWI und TALUMI sind aktiv (07.10.2026); Deutschland/EU unterliegt noch Apples DSA-Prüfung. Google-Play-CTAs bleiben bis zur öffentlichen Verfügbarkeit inaktiv.
3. `app-ads.txt` enthält die im lokalen AdMob-/Releasehandoff vom 30.09.2026 belegte Sellerzeile. Sie wird unter `https://jm-apps.de/app-ads.txt` ohne Umleitung als Klartext bereitgestellt und muss nach Veröffentlichungen zusätzlich im AdMob-Crawler geprüft werden.
4. Das freigegebene Social-Preview-Bild liegt unter `assets/images/og-jm-apps.png` und wird von den öffentlichen Seiten per Open-Graph- und Twitter-Card-Metadaten referenziert.

Die interne Entscheidungs- und Quellenübersicht steht in `docs/compliance/legal-baseline.md`. Sie dokumentiert auch die bewusst nicht eingefügten ODR- und VSBG-Texte, den Website-Speicheraudit sowie offene Store-, Kids- und AdMob-Prüfungen. Diese technische Baseline ersetzt keine Rechtsberatung.

## GitHub Pages und Domain

Die Website wird nach Repository-Dokumentation und erneutem HTTP-Nachweis vom 30.09.2026 per GitHub Pages direkt aus `main` und dem Ordner `/ (root)` bereitgestellt. Die eingecheckte `CNAME`-Datei setzt `jm-apps.de` als Custom Domain; HTTPS antwortet öffentlich mit `server: GitHub.com`. Netcup ist als möglicher Domain-/DNS-Anbieter genannt, seine genaue Rolle ist aber nicht belegt. Daraus folgt kein Hostingwechsel. Für Veröffentlichungen:

1. Im GitHub-Repository **Settings → Pages** den bestehenden Branch-Deploy und mögliche Automationen erneut prüfen.
2. Unter **Custom domain** prüfen, dass `jm-apps.de` aus der `CNAME`-Konfiguration angezeigt wird und HTTPS erzwungen bleibt.
3. Die tatsächliche Registrar-/DNS-Rolle von netcup getrennt vom Websitehosting dokumentieren; keine DNS-Werte raten oder ändern.
4. Beachten, dass ein Push oder Merge nach `main` nach diesem Stand unmittelbar veröffentlichen kann.

Die vorhandene `CNAME`-Datei muss bei künftigen Deployments erhalten bleiben.

### Apple Universal Links vorbereiten

GitHub Pages veröffentlicht dieses Repository direkt aus `/ (root)`. Durch `.nojekyll` kann auch `/.well-known/` statisch ausgeliefert werden. Die lokale AASA-Fassung verwendet den Application-Identifier-Prefix `26TTLFCACJ`, der am 30.09.2026 direkt aus beiden signierten Build-5-Distribution-IPAs gelesen wurde. Beide Artefakte enthalten außerdem `applinks:jm-apps.de` und `get-task-allow=false`.

Die identische Zuordnung ist unter `/.well-known/apple-app-site-association` und `/apple-app-site-association` eingecheckt. Die lokale JSON-/Routingprüfung ersetzt nicht die Apple-CDN-/Geräteprüfung nach einem autorisierten Deploy. `assetlinks.json` bleibt gesperrt, bis die beiden echten Play-App-Signing-SHA-256-Fingerprints vorliegen; Upload-Key- oder Debug-Fingerprints sind kein Ersatz.

### Öffentliche Delivery-Abnahme (07.10.2026)

`python3 scripts/audit_public_delivery.py --output /tmp/jm-public-delivery.json`
prüft GET/HEAD, Redirectketten und exakte Bytes für app-ads.txt mit normalem
User-Agent, Googlebot, Mediapartners-Google und Google-adstxt sowie robots.txt
und beide AASA-Pfade. Falls die lokale Python-Installation keinen CA-Pfad
kennt, kann unter macOS `--ca-file /etc/ssl/cert.pem` verwendet werden.
Die Ausgabe ist ein Diagnoseprotokoll; ein erfolgreich beendeter Prozess
bedeutet nicht, dass alle Anforderungen bestanden wurden.

app-ads.txt ist unverändert korrekt: 59 Bytes, UTF-8 ohne BOM, ein abschließendes
LF, HTTP 200 und `text/plain; charset=utf-8`. Beide öffentlichen Apple-Listings
liefern die Produktseiten auf `jm-apps.de` als Entwickler-Website. AdMobs
asynchrone Bestätigung muss getrennt vom technischen HTTP-Ergebnis geprüft werden.

**Offener Hostingfehler:** Beide AASA-Pfade liefern HTTP 200 und identisches,
korrektes JSON, aber `application/octet-stream`. WebKit startet deshalb einen
Download. Das bestehende GitHub-Pages-Hosting bietet keine konfigurierbaren
Response-Header. `_headers`, `.htaccess`, Jekyll-Frontmatter oder eine zusätzliche
JSON-Datei korrigieren diesen Header nicht. Die [Pages-Konfigurations-API](https://docs.github.com/en/rest/pages/pages)
bietet dafür keinen Parameter; siehe auch die [GitHub-Antwort zu HTTP-Headern](https://github.com/orgs/community/discussions/54257).
Eine wirksame Korrektur benötigt eine kontrollierbare HTTP-Auslieferung vor
GitHub Pages oder anderes Hosting. Im Abschlussauftrag sind Hostingmigrationen
ausgeschlossen; DNS, Hosting und AASA-Inhalt wurden deshalb nicht verändert.
Der MIME-Fix ist ausdrücklich **nicht** als erledigt zu bewerten.

## Adding a new app

1. Einen neuen Ordner wie `app-name/index.html` anlegen und eine bestehende Produktseite als strukturelle Vorlage verwenden.
2. Seitentitel, Beschreibung, Canonical URL und Open-Graph-Angaben auf das neue Produkt anpassen.
3. Nur freigegebene Markenassets optimiert in `assets/images/` ablegen und feste `width`-/`height`-Attribute verwenden.
4. In `index.html` eine weitere `.app-card` ergänzen. Für produktspezifische Farben eine Klasse nach dem Muster `.app-card--app-name` in `assets/css/styles.css` definieren; das Raster passt sich automatisch an.
5. Navigation oder Footer nur erweitern, wenn die Informationsarchitektur dies wirklich benötigt.
6. Die neue öffentliche URL zu `sitemap.xml` hinzufügen und `python3 scripts/check_site.py` ausführen.

Auf strukturiertes JSON-LD wird vorerst verzichtet. JM Apps ist ein Projekt-/Studioname, keine separate juristische Person. Präzise Metadaten haben Vorrang vor SEO-Dekoration.

## Kanonische Storelinks

Die Apple-URLs werden in `knowi-talumi/backend/app/services/social_marketing.py` gepflegt. Die HTML-CTAs sind statische Exportartefakte dieser Konfiguration. Nach Änderungen im Backend-Repository ausführen:

```sh
python3 backend/scripts/export_store_links.py ../jm-apps-web
python3 backend/scripts/export_store_links.py ../jm-apps-web --check
```

Kein Client benötigt eine zweite Storelinktabelle. Androidstatus bleibt separat.

## Responsive Browser-Abnahme (07.10.2026)

`node scripts/browser_audit.cjs` nutzt ein installiertes Playwright (`playwright` im Node-Suchpfad). `JM_SITE_ORIGIN` wählt den lokalen HTTP-Testserver oder `https://jm-apps.de`, `JM_BROWSER=webkit` den Safari-nahen WebKit-Browser; standardmäßig wird installiertes Chrome verwendet. Bei gemeinsamem lokalem Tooling kann `NODE_PATH` auf dessen `node_modules` zeigen. WebKit wird über `playwright install webkit` bereitgestellt.

Geprüft werden acht Seiten bei 320, 375, 390, 430, 768 und 1440 px: Seitenverhältnisse, Clipping/Overflow, Download-CTAs, Touch-Menü, Footer-Touchflächen, Tastaturzugang, 200% Textgröße und Netzwerkfehler. Screenshots und Resultate liegen ausschließlich unter `.local/responsive-2026-10-07/` (Git-ignored).

Marketing/Social/Bio verwenden die bestehenden Produktseiten. Diese führen über „Im App Store laden“ zum kanonischen Apple-Ziel; es gibt keine zusätzlichen Download- oder Redirect-Routen.

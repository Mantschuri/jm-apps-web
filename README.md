# JM Apps Website

Statische Website für JM Apps, das unabhängige Studio hinter KNOWI und TALUMI. Die Seite kommt ohne Build-Prozess, Tracking, Cookies oder externe Laufzeit-Abhängigkeiten aus und ist für GitHub Pages vorbereitet.

## Architektur und Struktur

Die Architektur besteht ausschließlich aus semantischem HTML, gemeinsamem CSS und wenig Vanilla-JavaScript. Alle internen Links und Assets sind dokument-relative URLs. Dadurch funktionieren sie sowohl unter der vorläufigen GitHub-Pages-Projekt-URL als auch später mit der Custom Domain.

- `index.html` – Studio-Homepage und App-Übersicht
- `knowi/` und `talumi/` – Produktseiten
- `support/` – zentraler Support-Einstieg
- `privacy/` und `imprint/` – Datenschutz- und Anbieterinformationen
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

Danach [http://localhost:8080](http://localhost:8080) öffnen. Es gibt keinen Installations- oder Build-Schritt.

## Wartung und QA

Nach Änderungen die automatische Prüfung ausführen:

```sh
python3 scripts/check_site.py
```

Sie prüft erforderliche Dateien, lokale Links und Assets, zentrale Metadaten sowie versehentlich veröffentlichte lokale Pfade. Zusätzlich sollte die Seite im Browser bei Smartphone-, Tablet- und Desktopbreiten sowie mit Tastatur getestet werden. Die vollständige manuelle Launch-Liste steht in `docs/release-checklist.md`.

## Öffentlicher Kontakt

Der derzeit freigegebene allgemeine Kontakt sowie Support-, Datenschutz- und Impressumskontakt ist `julian.mentges@gmail.com`. Er wird zentral auf der Supportseite sowie auf den rechtlichen Seiten verwendet. Später kann er durch eine dedizierte Domain-Adresse wie `support@jm-apps.de` ersetzt werden; dann müssen `support/index.html`, `privacy/index.html`, `imprint/index.html` und diese Dokumentation gemeinsam aktualisiert werden.

## Vor dem öffentlichen Start

Die Betreiber- und Kontaktangaben sind mit den freigegebenen Daten befüllt. Folgende externe Angaben und Prüfungen bleiben offen:

1. Impressum, Website-Datenschutz und die release-spezifischen Datenschutzhinweise müssen final rechtlich geprüft werden.
2. In `knowi/index.html` und `talumi/index.html`: echte App-Store- und Google-Play-Links anstelle der inaktiven Store-Elemente einsetzen.
3. In `app-ads.txt`: Nach Einrichtung des AdMob-Kontos und der Apps die aktuelle leere Datei exakt mit der von Google bereitgestellten Publisher-Zeile befüllen. Sie muss später unter `https://jm-apps.de/app-ads.txt` erreichbar sein.
4. Das freigegebene Social-Preview-Bild liegt unter `assets/images/og-jm-apps.png` und wird von den öffentlichen Seiten per Open-Graph- und Twitter-Card-Metadaten referenziert.

## GitHub Pages und Domain

Die Website wird bereits per GitHub Pages direkt aus `main` und dem Ordner `/ (root)` bereitgestellt. `jm-apps.de` ist bestellt, aber Domain-Aktivierung, DNS und Custom-Domain-Konfiguration sind noch nicht abgeschlossen. Für die Umstellung:

1. Die Domain-Aktivierung beim Anbieter abschließen.
2. Im GitHub-Repository **Settings → Pages** öffnen und den bestehenden Branch-Deploy prüfen.
3. Unter **Custom domain** `jm-apps.de` eintragen. GitHub erzeugt dabei bei Bedarf die Domain-Konfiguration.
4. Beim DNS-Anbieter die von GitHub aktuell dokumentierten DNS-Einträge setzen; keine Werte aus diesem Repository übernehmen oder raten.
5. DNS-Prüfung und gegebenenfalls Domain-Verifizierung in GitHub abschließen.
6. Nach erfolgreicher DNS-Auflösung **Enforce HTTPS** aktivieren.

Eine `CNAME`-Datei wird absichtlich erst bei der Einrichtung der Custom Domain angelegt.

## Adding a new app

1. Einen neuen Ordner wie `app-name/index.html` anlegen und eine bestehende Produktseite als strukturelle Vorlage verwenden.
2. Seitentitel, Beschreibung, Canonical URL und Open-Graph-Angaben auf das neue Produkt anpassen.
3. Nur freigegebene Markenassets optimiert in `assets/images/` ablegen und feste `width`-/`height`-Attribute verwenden.
4. In `index.html` eine weitere `.app-card` ergänzen. Für produktspezifische Farben eine Klasse nach dem Muster `.app-card--app-name` in `assets/css/styles.css` definieren; das Raster passt sich automatisch an.
5. Navigation oder Footer nur erweitern, wenn die Informationsarchitektur dies wirklich benötigt.
6. Die neue öffentliche URL zu `sitemap.xml` hinzufügen und `python3 scripts/check_site.py` ausführen.

Auf strukturiertes JSON-LD wird vorerst verzichtet: Die Apps haben noch keine Store-URLs und JM Apps ist ein Projekt-/Studioname, keine separate juristische Person. Präzise Metadaten haben Vorrang vor SEO-Dekoration.

# JM Apps Website

Statische Website für JM Apps, das unabhängige Studio hinter KNOWI und TALUMI. Die Seite kommt ohne Build-Prozess, Tracking, Cookies oder externe Laufzeit-Abhängigkeiten aus und ist für GitHub Pages vorbereitet.

## Architektur und Struktur

Die Architektur besteht ausschließlich aus semantischem HTML, gemeinsamem CSS und wenig Vanilla-JavaScript. Alle internen Links und Assets sind dokument-relative URLs. Dadurch funktionieren sie sowohl unter der vorläufigen GitHub-Pages-Projekt-URL als auch später mit der Custom Domain.

- `index.html` – Studio-Homepage und App-Übersicht
- `knowi/` und `talumi/` – Produktseiten
- `support/` – zentraler Support-Einstieg
- `privacy/` und `imprint/` – rechtliche Vorabseiten
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

## Vor dem öffentlichen Start

Folgende Angaben sind bewusst nicht erfunden und müssen ergänzt beziehungsweise rechtlich geprüft werden:

1. In `imprint/index.html`: Betreibername, ladungsfähige Anschrift, Kontakt und alle tatsächlich erforderlichen Anbieterangaben.
2. In `privacy/index.html`: verantwortliche Stelle, Kontakt und release-spezifische Datenschutzangaben für Website, KNOWI und TALUMI.
3. In `support/index.html`: echter Supportkontakt. Die zentrale sichtbare Platzhaltermeldung kann anschließend durch einen `mailto:`-Link ersetzt werden.
4. In `knowi/index.html` und `talumi/index.html`: echte App-Store- und Google-Play-Links anstelle der inaktiven „Bald verfügbar“-Elemente.
5. In `app-ads.txt`: Nach Einrichtung des AdMob-Kontos und der Apps die aktuelle leere Datei exakt mit der von Google bereitgestellten Publisher-Zeile befüllen. Sie muss später unter `https://jm-apps.de/app-ads.txt` erreichbar sein.
6. Ein Social-Preview-Bild wird bewusst noch nicht veröffentlicht. Ein später freigegebenes Bild kann als `assets/images/og-jm-apps.png` ergänzt und dann per `og:image` referenziert werden.

## GitHub Pages und Domain

Deployment ist direkt aus `main` und dem Ordner `/ (root)` vorgesehen. Nach dem Push:

1. Im GitHub-Repository **Settings → Pages** öffnen.
2. Unter **Build and deployment** „Deploy from a branch“ wählen.
3. Branch `main` und Ordner `/ (root)` wählen und speichern.
4. Den von GitHub erzeugten Pages-Link abwarten und alle Seiten prüfen.
5. Unter **Custom domain** `jm-apps.de` eintragen. GitHub erzeugt dabei bei Bedarf die Domain-Konfiguration.
6. Beim DNS-Anbieter die von GitHub aktuell dokumentierten DNS-Einträge setzen; keine Werte aus diesem Repository übernehmen oder raten.
7. DNS-Prüfung und gegebenenfalls Domain-Verifizierung in GitHub abschließen.
8. Nach erfolgreicher DNS-Auflösung **Enforce HTTPS** aktivieren.

Eine `CNAME`-Datei wird absichtlich erst bei der Einrichtung der Custom Domain angelegt.

## Adding a new app

1. Einen neuen Ordner wie `app-name/index.html` anlegen und eine bestehende Produktseite als strukturelle Vorlage verwenden.
2. Seitentitel, Beschreibung, Canonical URL und Open-Graph-Angaben auf das neue Produkt anpassen.
3. Nur freigegebene Markenassets optimiert in `assets/images/` ablegen und feste `width`-/`height`-Attribute verwenden.
4. In `index.html` eine weitere `.app-card` ergänzen. Für produktspezifische Farben eine Klasse nach dem Muster `.app-card--app-name` in `assets/css/styles.css` definieren; das Raster passt sich automatisch an.
5. Navigation oder Footer nur erweitern, wenn die Informationsarchitektur dies wirklich benötigt.
6. Die neue öffentliche URL zu `sitemap.xml` hinzufügen und `python3 scripts/check_site.py` ausführen.

Auf strukturiertes JSON-LD wird vorerst verzichtet: Ohne finale Betreiberangaben und Store-URLs wäre der Nutzen begrenzt und eine vollständige Darstellung nicht zuverlässig. Präzise Metadaten haben Vorrang vor SEO-Dekoration.

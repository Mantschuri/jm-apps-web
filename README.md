# JM Apps Website

Statische Website für JM Apps, das unabhängige Studio hinter KNOWI und TALUMI. Die Seite kommt ohne Build-Prozess, Tracking, Cookies oder externe Laufzeit-Abhängigkeiten aus und ist für GitHub Pages vorbereitet.

## Struktur

- `index.html` – Studio-Homepage und App-Übersicht
- `knowi/` und `talumi/` – Produktseiten
- `support/` – zentraler Support-Einstieg
- `privacy/` und `imprint/` – rechtliche Vorabseiten
- `assets/css/styles.css` – gemeinsames Design
- `assets/js/main.js` – mobile Navigation und dynamisches Jahr
- `assets/images/` – freigegebene Produktmarken und JM Apps Favicon
- `404.html` – Fehlerseite
- `app-ads.txt` – reserviert für den echten AdMob-Eintrag

## Lokal ansehen

Im Repository ausführen:

```sh
python3 -m http.server 8080
```

Danach [http://localhost:8080](http://localhost:8080) öffnen. Es gibt keinen Installations- oder Build-Schritt.

## Vor dem öffentlichen Start

Folgende Angaben sind bewusst nicht erfunden und müssen ergänzt beziehungsweise rechtlich geprüft werden:

1. In `imprint/index.html`: Betreibername, ladungsfähige Anschrift, Kontakt und alle tatsächlich erforderlichen Anbieterangaben.
2. In `privacy/index.html`: verantwortliche Stelle, Kontakt und release-spezifische Datenschutzangaben für Website, KNOWI und TALUMI.
3. In `support/index.html`: echter Supportkontakt. Die zentrale sichtbare Platzhaltermeldung kann anschließend durch einen `mailto:`-Link ersetzt werden.
4. In `knowi/index.html` und `talumi/index.html`: echte App-Store- und Google-Play-Links anstelle der inaktiven „Bald verfügbar“-Elemente.
5. In `app-ads.txt`: Sobald AdMob die reale Publisher-Zeile bereitstellt, den aktuellen leeren Inhalt exakt durch diese Zeile ersetzen. Sie muss später unter `https://jm-apps.de/app-ads.txt` erreichbar sein.

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

## Eine weitere App hinzufügen

Einen neuen Ordner mit eigener `index.html` anlegen, dabei Navigation, Footer, Metadaten und relative Asset-Pfade aus einer bestehenden Produktseite übernehmen. Danach auf der Homepage eine weitere Produktkarte ergänzen und bei Bedarf die CSS-Raster anpassen. Nur freigegebene Markenassets in `assets/images/` ablegen.

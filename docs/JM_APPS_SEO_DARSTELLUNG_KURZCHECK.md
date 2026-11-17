# JM Apps – SEO-/Darstellungskurzcheck

Stand: 18. November 2026. Umfang: JM-Apps-Hauptseite, KNOWI- und TALUMI-Produktseite, öffentliche Storelinks und zulässige Metadatenänderungen. Keine ASO-Neubearbeitung, App-Entwicklung oder Store-Einreichung.

## A. Bereits vorhanden

- Alle drei Seiten besitzen eigene, kurze Browser-Titel, Meta-Descriptions, Canonical-URLs, deutsche Sprachkennzeichnung und Open-Graph-Titel, -Beschreibung und -Bild. Die vorhandenen Texte wurden beibehalten.
- KNOWI und TALUMI verwenden jeweils ihr originales 720 × 720-Pixel-Logo als Vorschau und Browser-Favicon. JM Apps verwendet das vorhandene Studio-Favicon und das bestehende 1731 × 909-Pixel-Vorschaubild. Farben, Schriftarten, Logos und Seitenlayout bleiben unverändert.
- Die vier Apple-/Google-Storelinks führen zu den richtigen Apps und antworten mit HTTP 200. Öffentliche Produktnamen: Apple „KNOWI – Quiz & Allgemeinwissen“ / „TALUMI – Fragen für Gespräche“, Google „KNOWI“ / „TALUMI“. Die Links und Store-Einträge wurden nicht geändert.
- Es gibt auf diesen Seiten keine bestehenden JSON-LD-App-Daten. Im kleinen Auftrag wurden keine zusätzlichen App-/Bewertungsdaten oder Rich-Result-Versprechen eingeführt. Die vorhandene Website-Prüfung einschließlich lokaler Links und Metadaten besteht.

Google unterstützt ein Suchergebnis-Favicon je Hostname: `/knowi/` und `/talumi/` teilen sich daher grundsätzlich das Website-Favicon von `jm-apps.de`. Die eigenen Logos in Browser-Tabs und Linkvorschauen bleiben möglich. Für getrennte Google-Favicons wäre eine andere Domainstruktur nötig; das wäre für diesen Auftrag unverhältnismäßig und wurde nicht umgesetzt. [Google: Favicon in Suchergebnissen](https://developers.google.com/search/docs/appearance/favicon-in-search)

## B. Jetzt optimiert

Veröffentlicht auf [JM Apps](https://jm-apps.de/), [KNOWI](https://jm-apps.de/knowi/) und [TALUMI](https://jm-apps.de/talumi/):

- Explizite X-/Twitter-Titel, Beschreibungen und Bildalternativtexte ergänzt; sie übernehmen die vorhandenen Open-Graph-Texte.
- Open-Graph-Markenname, deutsche Locale und tatsächliche PNG-Bildabmessungen/-typen ergänzt. Das stellt Vorschauinformationen direkt im HTML bereit. [Open Graph Protocol](https://ogp.me/)
- Für KNOWI und TALUMI das X-Kartenformat auf `summary` passend zum vorhandenen quadratischen Logo gesetzt. JM Apps behält `summary_large_image` für sein breites Bild. Keine Bilder erzeugt, beschnitten oder ersetzt.
- Auf beiden App-Seiten `apple-touch-icon` mit dem jeweiligen vorhandenen Originalbild ergänzt.

Technisch geändert wurden nur die HTML-Kopfbereiche von drei Seiten. Die sichtbaren Seiteninhalte sind bytegleich geblieben. Website-Codecommit: **e7b3f3f**, Repository `Mantschuri/jm-apps-web`, Branch `codex/seo-darstellung-2026-11-18`; über den bestehenden Push nach `main` und GitHub Pages veröffentlicht. Kein Backend-Deploy und keine Änderung an Companion, Videoideen, Social-Automatik oder laufenden Store-Verfahren.

**Verifikation:** Bestehender Website-Check: 12 HTML-Seiten bestanden. Live-Prüfung: drei Seiten mit normalem Browser-, WhatsApp- und Twitterbot-User-Agent, vier vorhandene Bild-/Favicon-Dateien und `robots.txt` – alle HTTP 200, Inhalte exakt wie im veröffentlichten Quellstand; PNG-/SVG-Inhaltstypen korrekt. Alle vier Storelinks ebenfalls HTTP 200. Private Belege: `knowi-talumi/.local/seo-darstellung-2026-11-18/`.

Die Prüfung belegt korrekte Meta-Tags und öffentliche Abrufbarkeit. Es wurden keine Nachrichten oder Social-Posts zum Testen versendet. Die tatsächliche Darstellung in WhatsApp, iMessage und X wurde nicht auf allen Clients visuell abgenommen; Vorschau-Caches und Clientlayouts können abweichen. Google entscheidet selbst über Titel, Snippet, Logo und Aktualisierungszeitpunkt. Es gibt keine Garantie für eine bestimmte Darstellung oder ein Ranking.

## C. Für den nächsten App-Upload vormerken

**Aktuell kein zusätzlicher ASO-Änderungsbedarf festgestellt.** Die kürzlich optimierten Storetexte, Keywords, Logos und Screenshots bleiben vollständig unangetastet. Die Store-Grenzen wurden anhand offizieller Dokumentation geprüft; in den angemeldeten Storekonsolen wurde nichts bearbeitet.

- **Apple:** Änderungen an Name/Untertitel sowie versionsgebundenen Screenshots und weiteren Produktinformationen nur im dafür zulässigen Versionsstatus und regulären Prüfablauf einplanen. Ein App-Icon-Austausch gehört zum nächsten Build. Falls später nötig, beim nächsten ohnehin geplanten Upload die Darstellung neuer Funktionen in Screenshots prüfen; jetzt keine neuen Grafiken oder Texte. [Apple: bearbeitbare Eigenschaften](https://developer.apple.com/help/app-store-connect/reference/app-information/required-localizable-and-editable-properties)
- **Apple-Ausnahme:** Der Werbetext („Promotional Text“) lässt sich ohne aktualisierte Einreichung ändern. Es wurde keine konkrete Lücke festgestellt, daher auch diesen Text nicht geändert. [Apple: Versionsinformationen](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information)
- **Google:** Titel, Kurz-/Langbeschreibung, Store-Icon und Grafiken können ohne neues AAB bearbeitet werden, sind aber Store-Listing-Änderungen im Prüf-/Veröffentlichungsprozess. Sie erfüllen damit nicht die Vorgabe „ohne neue Prüfung oder Veröffentlichung“ und wurden nicht angefasst. Nur bei künftigem Bedarf zusammen mit dem nächsten regulären Store-Vorgang prüfen; ein neuer Build ist für reine Listing-Änderungen nicht grundsätzlich erforderlich. [Google: Prüfung und Veröffentlichung von Änderungen](https://support.google.com/googleplay/android-developer/answer/9859654)

Ergebnis: Beide Marken erhalten vollständigere Website-Linkvorschauen bei unveränderter Identität. **Kein neuer Store-Release, keine neue Store-Prüfung und kein Eingriff in die laufende KNOWI-Einreichung.**

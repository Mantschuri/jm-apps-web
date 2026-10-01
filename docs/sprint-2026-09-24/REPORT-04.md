# REPORT-04 – Website und Storetexte

Zeitpunkt: 2026-09-23, Europe/Berlin  
Ausgangs- und End-HEAD: `ca3aee2e45cb09e67a418ac69a44c15fece6d26e` auf `backup/project-pause-2026-09-17` (keine Git-Aktion)  
Fremde Ausgangsänderungen: keine.

## Checkpoints

1. **Website-/Vertragsprüfung abgeschlossen:** acht öffentliche Seiten, Navigation, lokale Assets, Hosting-/CNAME-/SEO-Dateien, Recht-/Supportbaseline und App-Link-Verträge gelesen. Keine Liveerreichbarkeit behauptet.
2. **Gezielte Inhaltskorrektur abgeschlossen:** Die KNOWI-Seite behauptet nicht länger pauschal eine Zielgruppe „jeden Alters“. Die Account-Löschseite entspricht jetzt dem implementierten In-App-Ablauf mit expliziter Bestätigung, wiederaufnehmbarem Fehlerfall, gemeinsamem Konto und lokaler Offlinegrenze.
3. **Releaseunterlagen vorbereitet:** deutsche Storetexte, Alters-/Kategoriefragen, reale Screenshot-Aufnahmeliste und präzise Domain-/Associationblocker erstellt. Keine englische Website, kein Tracking, keine Werbung und kein Hostingwechsel.

## Eigener Diff

- `knowi/index.html`: unbelegte Altersreichweitenbehauptung entfernt.
- `account-deletion/index.html`: veralteten „noch nicht verfügbar“-Text durch den tatsächlichen App-/Backendfluss ersetzt.
- `docs/sprint-2026-09-24/STORE_COPY_DE.md`: Apple-/Google-Texte und Reviewfragen.
- `docs/sprint-2026-09-24/SCREENSHOT_PLAN.md`: je sechs reale Motive plus sichere Aufnahmeregeln.
- `docs/sprint-2026-09-24/DOMAIN_RELEASE_GAPS.md`: bestätigte IDs/Pfade und fehlende Distributionnachweise.
- `docs/sprint-2026-09-24/REPORT-04.md`: dieser Bericht.

## Prüfung

- `python3 scripts/check_site.py`: **PASS**, 9 HTML-Seiten; lokale Links, Assets, Metadaten und Pfad-Leaks.
- Storetext-Längenprüfung: **PASS**; Unicode-Zeichen für Apple/Google-Textfelder sowie UTF-8-Bytes für Apple-Keywords. Längster Untertitel 29/30, Werbetext 151/170, Keywordfeld 68/100 Byte, Google-Kurztext 69/80.
- Lokaler Headless-Browser bei 1440 × 900 und iPhone-13-Profil: **PASS**; KNOWI und Account-Löschung ohne horizontales Überlaufen, mobiles Menü öffnet, Escape schließt und stellt Fokus wieder her.
- `git diff --check`: **PASS**.

Der Browserlauf verwendete nur einen temporären, an `127.0.0.1` gebundenen statischen Server und den bereits installierten Chromium. Ein lokaler Browserlauf ist kein Live-HTTPS-/Associationnachweis.

## Nicht ausgeführt / offen

- Kein Deployment, DNS-/Pages-/Storezugriff, Storeupload oder Associationdatei.
- Kein Appbuild und keine neuen Screenshots; Ressourcen-Gate bleibt unter 25 GiB und Time-Machine-Abschluss ungeklärt.
- Keine Änderung veröffentlichter Betreiberdaten oder rechtliche Zusicherung; professionelle Rechtsprüfung bleibt offen.
- Kein E2E-Test der Kontolöschung in Produktion; Grundlage sind implementierter Client-/Backendvertrag und vorhandene isolierte Tests aus Auftrag 01.

## Gebündelte Julian-Aktion (ca. 15 Minuten)

1. Storetexte, Kategorie-/Zielgruppenrichtung und die abweichenden Supportadressen gemeinsam entscheiden (8 Min).
2. In Apple/Google-Konsolen lediglich die finalen Distribution-Team-/Signing-Fingerprints und später die echten Store-URLs notieren; nichts veröffentlichen (5 Min).
3. Betreiber-/Datenschutzblocker einer professionellen Rechtsprüfung zuweisen (2 Min).

**Genau nächster Schritt:** In Auftrag 05 die realen Distributionkennungen und Ressourcen erneut prüfen; Associationdateien erst nach vollständigem Nachweis als separaten Reviewdiff erzeugen.

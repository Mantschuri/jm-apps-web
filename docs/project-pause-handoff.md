# Projektpause: Website-Handoff

Stand: 17. September 2026

## Gesicherter Ist-Stand

- Statische JM-Apps-Website ohne Build-Schritt, Tracking, Cookies oder externe Laufzeit-Abhängigkeiten.
- Ausgangspunkt dieser Sicherung: `main` bei Commit `51950b363dff8808e3e33b4afd9fcc3e977542ef`.
- GitHub Pages ist laut Repository-Dokumentation aus `main` und `/ (root)` aktiviert; `CNAME` verweist auf `jm-apps.de`.
- Im Repository sind keine GitHub-Actions-Workflows vorhanden. Während der Pause dürfen Änderungen nicht nach `main` zusammengeführt oder dorthin gepusht werden, ohne die aktuellen Pages-Einstellungen erneut zu prüfen.
- Der freigegebene öffentliche Kontakt ist `contact.jm.apps@gmail.com`.

## Offene Aufgaben vor dem App-Release

### Datenschutz und Impressum

- Impressum, Website-Datenschutzhinweise, Nutzungsbedingungen und Account-Löschhinweise abschließend professionell rechtlich prüfen lassen.
- Release-spezifische Datenschutzhinweise für KNOWI und TALUMI mit den tatsächlichen Produktionsdaten, Empfängern, Rechtsgrundlagen, Aufbewahrungsregeln und internationalen Übermittlungen abgleichen.
- Prüfen, ob aufgrund der tatsächlichen Umstände ein VSBG-Hinweis erforderlich ist.
- Apple App Privacy, Google Play Data Safety, Zielgruppe/Kinder-Angebot und gegebenenfalls AdMob/UMP mit der finalen Produktionskonfiguration abstimmen.

### Support und Account-Löschung

- Die Supportseite und alle rechtlichen Seiten verwenden den zentralen Kontakt `contact.jm.apps@gmail.com`; vor Release noch einen vollständigen Kontakt- und Mailto-Test durchführen.
- Der öffentliche Löschweg ist unter `/account-deletion/` dokumentiert. Die tatsächliche Löschung in den Apps und im Backend sowie eine angemessene Identitätsprüfung müssen vor dem Store-Release implementiert und Ende-zu-Ende verifiziert werden.
- Die öffentlichen Datenschutz-, Support- und Account-Lösch-URLs in beiden Store-Einträgen hinterlegen und nach Veröffentlichung testen.

### Universal Links und Android App Links

- Es sind derzeit weder `.well-known/apple-app-site-association` noch `.well-known/assetlinks.json` vorhanden.
- Vor der Veröffentlichung die finalen iOS-Team-/Bundle-Kennungen, Android-Application-ID und den SHA-256-Fingerprint des tatsächlichen Play-Signing-Zertifikats verifizieren.
- Erst danach die Association-Dateien mit den final benötigten Pfaden anlegen, korrekt ausliefern und auf realen Geräten testen. Keine Kennungen oder Fingerprints raten.

### Store-Verweise und Auslieferung

- Die vier echten Store-URLs für KNOWI und TALUMI ergänzen; aktuell zeigen beide Produktseiten nur inaktive „Bald“-Elemente.
- `app-ads.txt` erst mit der exakt von Google bereitgestellten Publisher-Zeile befüllen und anschließend öffentlich prüfen.
- Vor einer Wiederaufnahme die offenen Punkte in `docs/release-checklist.md` abarbeiten und `python3 scripts/check_site.py` sowie die manuellen Browser-, Tastatur- und Geräteprüfungen ausführen.
- Vor jedem Merge nach `main` die GitHub-Pages-Quelle und mögliche Automationen erneut kontrollieren: Ein Push nach `main` ist nach dem dokumentierten Stand eine Veröffentlichung auf der verbundenen Website.

Diese Übergabe beschreibt den technischen Prüfstand und ersetzt keine Rechtsberatung.

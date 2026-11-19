# Kompakte Einladungsseiten – 19. November 2026

## Änderung

KNOWI-Gruppen (Lernen, Quiz, Abstimmung, Wichteln), TALUMI-Wichtelgruppen,
TALUMI-Runden und geteilte Fragen beider Apps verwenden einen kurzen Ablauf:
App herunterladen, anschließend den ursprünglichen Link in der Nachricht erneut
öffnen. Auf Mobilgeräten erscheint der passende Store, auf Desktop beide.
Markenbilder und bestehende Markenfarben bleiben erhalten.

Manuelle Gruppeneingabe bzw. Rundencode sind aufklappbar. Die ausführlichen,
doppelten „Schon installiert?“-Absätze sind entfernt. Der notwendige Hinweis
auf TALUMI 1.2.2 für Wichteln bleibt knapp sichtbar, solange die neue Funktion
noch nicht in älteren Storefassungen verfügbar ist.

KNOWI-Tagesquiz-, Freunde- und Duelllinks führen ohne native Appübernahme jetzt
zu einer passenden kompakten Fortsetzungsseite statt zur allgemeinen
Produktwerbung. Der Originalpfad einschließlich Query/Fragment bleibt lokal
im Fragment der Fortsetzungsseite erhalten und wird für Apples Banner benutzt.
Alte TALUMI-Rundenpfade bleiben auf die neue Rundeneinladung abgebildet.
Nur fest erlaubte eigene Pfade sind zulässig; keine offene Weiterleitung.

Keine App-/Backendänderung, keine Storeaktion, keine Änderung an
Association-Dateien oder bestehender Referral-Ereignislogik. Keine neue
Installationsverfolgung und keine automatischen Storeumleitungen.

## Prüfung vor Veröffentlichung

- Websitevalidator: 15 HTML-Seiten bestanden.
- `scripts/check_group_invitation.cjs`: 36 Szenarien bestanden,
  Chromium/WebKit, iPhone/Android, 320/390/768 px, große Schrift,
  aufklappbare Hilfe, Kopieren, Unicode/XSS, ungültige Einladungen,
  Zurücksetzen nach Fragmentwechsel, Passwörter nicht in HTTP-Requests.
- `scripts/check_invitation_fallbacks.cjs`: 56 Szenarien bestanden,
  Chromium/WebKit, iPhone/Android/iPad/Desktop, 200 % Schrift,
  Storeauswahl, Smart-App-Banner, exakter Erhalt der ursprünglichen Links,
  alte TALUMI-Rundenpfade und Ablehnung fremder Zieladressen.
- Ein gefundenes Überlaufen langer Überschriften bei 200 % Schrift ist
  korrigiert und anschließend erneut geprüft.
- Drei mobile Ansichten visuell geprüft: KNOWI-Gruppe, TALUMI-Gruppe,
  TALUMI-Runde. Echte Referral-Ereignisse wurden im Test abgefangen.

## Grenzen

Eine installierte passende App kann den Link direkt übernehmen. Das ist keine
Garantie für jeden Browser oder jede Geräteeinstellung. Die Website kann eine
Installation nicht zuverlässig erkennen. Insbesondere Safari kann gleichnamige
Domainlinks weiter im Browser öffnen; fremde Browser müssen Universal Links
selbst unterstützen. Quellen:
[Apple Universal Links](https://developer.apple.com/documentation/technotes/tn3155-debugging-universal-links),
[Android App-Link-Prüfung](https://developer.android.com/training/app-links/verify-applinks).

Die Browserprüfung ist kein echter WhatsApp-/iMessage-Appwechseltest und kein
Android-FCM-Empfangsnachweis. Die zuvor dokumentierten Grenzen dieser nativen
Prüfungen bleiben bestehen. Veröffentlichung über den bestehenden
GitHub-Pages-Prozess (Website-main); App-Storefassungen bleiben unverändert.

(() => {
  const render = () => {
  document.getElementById("invitation").hidden = true;
  document.getElementById("status").hidden = false;
  document.getElementById("round-code").textContent = "";
  document.getElementById("copy-status").textContent = "";
  document.querySelector('meta[name="apple-itunes-app"]').content = "app-id=6817282136";
  const match = /^#code=([A-HJ-NP-Z2-9]{6})$/.exec(location.hash);
  if (!match) return;
  const code = match[1];
  document.getElementById('status').hidden = true;
  document.getElementById('round-code').textContent = code;
  document.getElementById('invitation').hidden = false;
  document.querySelector('meta[name="apple-itunes-app"]').content = 'app-id=6817282136, app-argument=' + location.href;
  const ua = navigator.userAgent;
  document.getElementById('google-store').hidden = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  document.getElementById('apple-store').hidden = /Android/.test(ua);
  document.getElementById('copy-invite').onclick = async () => {
    try {
      await navigator.clipboard.writeText(code);
      document.getElementById('copy-status').textContent = 'Kopiert. In TALUMI auf der Startseite „Gemeinsamer Runde beitreten“ einfügen.';
    } catch (_) {
      document.getElementById('copy-status').textContent = 'Markiere den Einladungscode oben und kopiere ihn manuell.';
    }
  };
  };
  // Platform choice only; this does not attempt to detect installation.
  const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent) || (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
  const android = /Android/i.test(navigator.userAgent);
  if (ios !== android) {
    const target = document.getElementById(ios ? 'apple-store' : 'google-store');
    target.textContent = 'Verstanden – App herunterladen';
    target.setAttribute('aria-label', `Verstanden – App herunterladen (${ios ? 'App Store' : 'Google Play'})`);
  } else {
    document.getElementById('apple-store').textContent = 'Verstanden – im App Store laden';
    document.getElementById('google-store').textContent = 'Verstanden – bei Google Play laden';
  }
  render();
  window.addEventListener("hashchange", render);
})();

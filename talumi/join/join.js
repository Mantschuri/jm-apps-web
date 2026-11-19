(() => {
  const render = () => {
  document.getElementById("invitation").hidden = true;
  document.getElementById("round-code").textContent = "";
  document.getElementById("copy-status").textContent = "";
  document.querySelector('meta[name="apple-itunes-app"]').content = "app-id=6817282136";
  const match = /^#code=([A-HJ-NP-Z2-9]{6})$/.exec(location.hash);
  if (!match) return;
  const code = match[1];
  document.getElementById('status').textContent = 'Eure Runde wartet auf dich. Öffne die Einladung in TALUMI oder kopiere den Code für später.';
  document.getElementById('round-code').textContent = code;
  document.getElementById('invitation').hidden = false;
  document.querySelector('meta[name="apple-itunes-app"]').content = 'app-id=6817282136, app-argument=' + location.href;
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) document.getElementById('google-store').hidden = true;
  if (/Android/.test(ua)) document.getElementById('apple-store').hidden = true;
  document.getElementById('copy-invite').onclick = async () => {
    try {
      await navigator.clipboard.writeText(code);
      document.getElementById('copy-status').textContent = 'Kopiert. In TALUMI unter „Gemeinsame Runde“ → „Beitreten“ einfügen.';
    } catch (_) {
      document.getElementById('copy-status').textContent = 'Markiere den Einladungscode oben und kopiere ihn manuell.';
    }
  };
  };
  render();
  window.addEventListener("hashchange", render);
})();

/* No analytics, storage, fetches, or server-side secrets. URL fragments stay local. */
(() => {
  'use strict';
  const parse = hash => {
    if (hash.length > 6000) return null;
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const code = params.get('code') || '';
    const name = params.get('name') || '';
    const password = params.get('password') || '';
    if (!/^[A-F0-9]{10}$/.test(code) || !name || name.length > 200 || [...password].length < 4 || [...password].length > 128) return null;
    return { code, name, password };
  };
  if (typeof module !== 'undefined') { module.exports = { parse }; return; }
  const render = () => {
    const invitation = parse(window.location.hash);
    document.getElementById('status').hidden = !!invitation;
    document.getElementById('invitation').hidden = !invitation;
    document.getElementById('copy-status').textContent = '';
    for (const id of ['group-name', 'visible-name', 'password']) document.getElementById(id).textContent = '';
    const banner = document.querySelector('meta[name="apple-itunes-app"]');
    banner.content = 'app-id=6817282136';
    if (!invitation) return;
    const { name, password } = invitation;
    banner.content += `, app-argument=${window.location.href}`;
    document.getElementById('apple-store').hidden = /Android/i.test(navigator.userAgent);
    document.getElementById('google-store').hidden = (/iPhone|iPad|iPod/i.test(navigator.userAgent) || (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1));
    document.getElementById('group-name').textContent = name;
    document.getElementById('visible-name').textContent = name;
    document.getElementById('password').textContent = password;
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
  window.addEventListener('hashchange', render);
  document.getElementById('copy-invite').addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText(window.location.href);
      status.textContent = 'Kopiert. In TALUMI „Wichteln“ → „Gruppe beitreten“ wählen und die Einladung einfügen.';
    } catch (_) { status.textContent = 'Bitte den Link aus der Adresszeile kopieren.'; }
  });
})();

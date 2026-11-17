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
  const invitation = parse(window.location.hash);
  if (!invitation) return;
  const { code, name, password } = invitation;
  const app = `knowi-private://group/${code}#${new URLSearchParams({name, password})}`;
  document.getElementById('status').hidden = true;
  document.getElementById('invitation').hidden = false;
  document.getElementById('group-name').textContent = name;
  document.getElementById('visible-name').textContent = name;
  document.getElementById('password').textContent = password;
  document.getElementById('open-app').href = app;
  document.getElementById('copy-invite').addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText(window.location.href);
      status.textContent = 'Kopiert. In KNOWI Privat „Einladung einfügen“ wählen.';
    } catch (_) { status.textContent = 'Bitte den Link aus der Adresszeile kopieren.'; }
  });
})();

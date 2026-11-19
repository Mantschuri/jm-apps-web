/* Keep the original app link local. Only known KNOWI routes are accepted. */
(() => {
  const render = () => {
    const banner = document.querySelector('meta[name="apple-itunes-app"]');
    const status = document.getElementById('link-status');
    const title = document.getElementById('content-title');
    banner.content = 'app-id=6817281226';
    title.textContent = 'Weiter mit KNOWI';
    status.textContent = 'Öffne nach dem Download den ursprünglichen Link aus deiner Nachricht.';
    const params = new URLSearchParams(location.hash.slice(1));
    const target = params.get('link') || '';
    if (target.length > 6000 || !target.startsWith('/knowi/')) return;
    const url = new URL(target, location.origin);
    if (url.origin !== location.origin) return;
    const match = /^\/knowi\/(daily|friends|duel\/[^/]+)\/?$/.exec(url.pathname);
    if (!match) return;
    title.textContent = match[1] === 'daily' ? 'Dein Tagesquiz wartet.' : match[1] === 'friends' ? 'Gemeinsam macht’s mehr Spaß.' : 'Bereit fürs Quizduell?';
    status.textContent = '';
    banner.content += ', app-argument=' + url.href;
  };
  render();
  window.addEventListener('hashchange', render);
})();

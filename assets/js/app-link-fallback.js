// Existing app pages provide store links when a shared app link opens on the web.
// Fixed destinations only: do not trust query parameters or room codes as URLs.
(() => {
  const path = window.location.pathname;
  if (/^\/knowi\/(?:daily|friends|duel\/[^/]+)\/?$/.test(path)) {
    const link = path + window.location.search + window.location.hash;
    window.location.replace('/knowi/oeffnen/#' + new URLSearchParams({link}));
  } else if (/^\/talumi\/join\/[A-HJ-NP-Z2-9]{6}\/?$/.test(path)) {
    const code = path.split('/')[3];
    window.location.replace('/talumi/join/#code=' + code);
  }
})();

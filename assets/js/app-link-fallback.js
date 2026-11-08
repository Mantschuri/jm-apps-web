// Existing app pages provide store links when a shared app link opens on the web.
// Fixed destinations only: do not trust query parameters or room codes as URLs.
(() => {
  const path = window.location.pathname;
  if (/^\/knowi\/(?:daily|friends|duel\/[^/]+)\/?$/.test(path)) {
    window.location.replace('/knowi/');
  } else if (/^\/talumi\/join\/[^/]+\/?$/.test(path)) {
    window.location.replace('/talumi/');
  }
})();

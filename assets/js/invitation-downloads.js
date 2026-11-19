/* Presentation only: does not detect installation or redirect to a store. */
(() => {
  const ua = navigator.userAgent;
  const apple = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  document.querySelector('[data-referral-store="ios"]').hidden = /Android/.test(ua);
  document.querySelector('[data-referral-store="android"]').hidden = apple;
  const banner = document.querySelector('meta[name="apple-itunes-app"]');
  if (banner) banner.content += ', app-argument=' + location.href;
})();

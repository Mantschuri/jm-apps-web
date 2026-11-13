(() => {
  'use strict';
  const url = new URL(window.location.href);
  const match = /^\/(knowi|talumi)\/invite\/?$/.exec(url.pathname);
  const reference = url.searchParams.get('ref');
  if (!match || !/^[a-f0-9]{32}$/.test(reference || '')) {
    document.getElementById('referral-status').textContent = 'Diese Einladung ist unvollständig. Die App kannst du trotzdem entdecken.';
    return;
  }
  const brand = match[1];
  // Backend remains disabled until the owner's Phase-B activation. No cookies,
  // device fingerprint, recipient information or post-install attribution.
  const record = event => fetch('https://api.jm-apps.de/v1/referrals/events', {
    method:'POST', mode:'cors', credentials:'omit', keepalive:true,
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({brand,reference,event}),
  }).catch(() => {});
  record('link_opened');
  document.querySelectorAll('[data-referral-store]').forEach(link => {
    link.addEventListener('click', () => record('store_redirect'));
  });
})();

#!/usr/bin/env node
const { chromium, webkit } = require('playwright');
const engine = process.env.JM_BROWSER || 'chromium';
const fs = require('node:fs');
const path = require('node:path');

const origin = process.env.JM_SITE_ORIGIN || 'http://127.0.0.1:8080';
const root = path.resolve(__dirname, '..');
const screenshotDir = path.join(root, '.local', 'responsive-2026-10-07', engine);
const routes = ['/', '/knowi/', '/talumi/', '/support/', '/privacy/', '/imprint/', '/terms/', '/account-deletion/'];
const widths = [320, 375, 390, 430, 768, 1440];

(async () => {
  fs.mkdirSync(screenshotDir, { recursive: true });
  const browser = await (engine === 'webkit' ? webkit : chromium).launch(
    engine === 'webkit' ? { headless: true } : { headless: true, channel: 'chrome' }
  );
  const findings = [];
  try {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width <= 430, hasTouch: width <= 430 });
      const page = await context.newPage();
      page.setDefaultTimeout(15000);
      const thirdParty = new Set();
      const failed = [];
      const consoleErrors = [];
      page.on('request', request => {
        const url = new URL(request.url());
        if (url.origin !== origin) thirdParty.add(url.origin);
      });
      page.on('requestfailed', request => failed.push(`${request.method()} ${request.url()}`));
      page.on('console', message => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      for (const route of routes) {
        process.stderr.write(`${engine}: ${width}px ${route}\n`);
        const response = await page.goto(origin + route, { waitUntil: 'networkidle' });
        if (!response || response.status() !== 200) throw new Error(`${route}: HTTP ${response && response.status()}`);
        await page.locator('.site-footer').scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0));
        const audit = await page.evaluate(() => {
          const headings = [...document.querySelectorAll('h1,h2,h3')].map(node => Number(node.tagName[1]));
          const headingJump = headings.some((level, index) => index > 0 && level > headings[index - 1] + 1);
          return {
            h1: document.querySelectorAll('h1').length,
            headingJump,
            missingAlt: [...document.querySelectorAll('img')].filter(image => !image.hasAttribute('alt')).length,
            distortedImages: [...document.images].filter(image => {
              const r = image.getBoundingClientRect();
              return Math.abs(r.width / r.height - image.naturalWidth / image.naturalHeight) > 0.02;
            }).map(image => image.getAttribute('src')),
            clippedElements: [...document.querySelectorAll('h1,h2,h3,p,li,img,.button,.brand')].filter(node => {
              const r = node.getBoundingClientRect();
              return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1);
            }).map(node => node.tagName + '.' + node.className),
            viewport: document.querySelector('meta[name="viewport"]')?.content,
            footerTargets: [...document.querySelectorAll('.footer-links a')].every(a => a.getBoundingClientRect().height >= 44),
            overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
            cookies: document.cookie,
            localStorage: localStorage.length,
            sessionStorage: sessionStorage.length,
          };
        });
        if (audit.h1 !== 1 || audit.headingJump || audit.missingAlt || audit.distortedImages.length || audit.clippedElements.length || !audit.footerTargets || !audit.viewport.includes("width=device-width") || audit.overflow || audit.cookies || audit.localStorage || audit.sessionStorage) {
          throw new Error(`${route} @ ${width}: ${JSON.stringify(audit)}`);
        }
        if (route === '/knowi/' || route === '/talumi/') {
          const brand = route.slice(1, -1);
          const target = brand === 'knowi' ? 'https://apps.apple.com/us/app/knowi-quiz-wissen/id6817281226' : 'https://apps.apple.com/us/app/talumi-gemeinsam-reden/id6817282136';
          const cta = page.getByRole('link', { name: 'Im App Store laden', exact: true });
          if (await cta.count() !== 1 || await cta.getAttribute('href') !== target) throw Error(`${route}: incorrect Apple CTA`);
          const box = await cta.boundingBox();
          if (!box || box.height < 44 || box.width < 44 || box.x < 0 || box.x + box.width > width || (width <= 430 && box.y + box.height > 900)) throw Error(`${route} @ ${width}: CTA outside mobile hero`);
          if (await page.locator('a[href*="testflight"]').count()) throw Error('TestFlight CTA remains');
        }
        if (width <= 430) {
          await page.locator('.menu-button').click();
          if (await page.locator('.menu-button').getAttribute('aria-expanded') !== 'true') throw Error('Mobile menu unavailable');
          const support = page.locator('.nav-links').getByRole('link', { name: 'Support', exact: true });
          await support.click();
          await page.waitForURL('**/support/');
          if (await page.locator('.menu-button').getAttribute('aria-expanded') !== 'false') throw Error('Menu not closed after navigation');
        }
      }
      await page.goto(origin + '/', { waitUntil: 'networkidle' });
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      const zoomAudit = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        offenders: [...document.querySelectorAll('body *')]
          .filter(node => node.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
          .slice(0, 8)
          .map(node => `${node.tagName.toLowerCase()}.${node.className}`),
      }));
      if (zoomAudit.overflow) throw new Error(`200% text overflow @ ${width}: ${zoomAudit.offenders.join(', ')}`);
      if (width === 390) {
        await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
        await page.locator('.menu-button').click();
        if (await page.locator('.menu-button').getAttribute('aria-expanded') !== 'true') throw new Error('menu did not open');
        await page.keyboard.press('Escape');
        if (await page.locator('.menu-button').getAttribute('aria-expanded') !== 'false') throw new Error('menu did not close');
        if (!(await page.locator('.menu-button').evaluate(node => node === document.activeElement))) throw new Error('Escape did not restore menu focus');
        await page.keyboard.press('Tab');
        await page.goto(origin + '/support/', { waitUntil: 'networkidle' });
        // Safari's default Tab navigation skips links; Option-Tab includes them.
        await page.keyboard.press(engine === 'webkit' ? 'Alt+Tab' : 'Tab');
        const skipFocused = await page.locator('.skip-link').evaluate(node => node === document.activeElement);
        if (!skipFocused) throw new Error('skip link is not first keyboard target');
      }
      if (thirdParty.size || failed.length || consoleErrors.length) {
        throw new Error(`network/console @ ${width}: ${JSON.stringify({ thirdParty: [...thirdParty], failed, consoleErrors })}`);
      }
      findings.push({ width, routes: routes.length, thirdPartyRequests: 0, storageEntries: 0, horizontalOverflow: false });
      await context.close();
    }

    const shots = [
      [320, '/', 'home-320.png'],
      [390, '/', 'home-390.png'],
      [1440, '/', 'home-1440.png'],
      [390, '/knowi/', 'knowi-390.png'],
      [390, '/talumi/', 'talumi-390.png'],
      [390, '/privacy/', 'privacy-390.png'],
      [768, '/support/', 'support-768.png'],
      [1440, '/knowi/', 'knowi-1440.png'],
    ];
    for (const [width, route, name] of shots) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(origin + route, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(screenshotDir, name), fullPage: true });
      await page.close();
    }
    const missing = await browser.newPage();
    const missingResponse = await missing.goto(origin + '/route-does-not-exist', { waitUntil: 'domcontentloaded' });
    findings.push({ localMissingRouteStatus: missingResponse && missingResponse.status() });
    await missing.close();
    const result = { result: 'PASS', engine, origin, findings };
    fs.writeFileSync(path.join(screenshotDir, 'results.json'), JSON.stringify(result, null, 2));
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  } finally {
    await browser.close();
  }
})().catch(error => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exit(1);
});

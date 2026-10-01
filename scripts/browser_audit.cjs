#!/usr/bin/env node
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const origin = process.env.JM_SITE_ORIGIN || 'http://127.0.0.1:8080';
const root = path.resolve(__dirname, '..');
const screenshotDir = path.join(root, 'docs', 'release', 'screenshots');
const routes = ['/', '/knowi/', '/talumi/', '/support/', '/privacy/', '/imprint/', '/terms/', '/account-deletion/'];
const widths = [320, 390, 768, 1440];

(async () => {
  fs.mkdirSync(screenshotDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const findings = [];
  try {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
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
        const response = await page.goto(origin + route, { waitUntil: 'networkidle' });
        if (!response || response.status() !== 200) throw new Error(`${route}: HTTP ${response && response.status()}`);
        const audit = await page.evaluate(() => {
          const headings = [...document.querySelectorAll('h1,h2,h3')].map(node => Number(node.tagName[1]));
          const headingJump = headings.some((level, index) => index > 0 && level > headings[index - 1] + 1);
          return {
            h1: document.querySelectorAll('h1').length,
            headingJump,
            missingAlt: [...document.querySelectorAll('img')].filter(image => !image.hasAttribute('alt')).length,
            overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
            cookies: document.cookie,
            localStorage: localStorage.length,
            sessionStorage: sessionStorage.length,
          };
        });
        if (audit.h1 !== 1 || audit.headingJump || audit.missingAlt || audit.overflow || audit.cookies || audit.localStorage || audit.sessionStorage) {
          throw new Error(`${route} @ ${width}: ${JSON.stringify(audit)}`);
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
        await page.keyboard.press('Tab');
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
    process.stdout.write(JSON.stringify({ result: 'PASS', findings }, null, 2) + '\n');
  } finally {
    await browser.close();
  }
})().catch(error => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exit(1);
});

const {chromium, webkit} = require('playwright');
const assert = require('node:assert/strict');
const origin = process.env.JM_SITE_ORIGIN || 'http://127.0.0.1:8087';
(async () => {
  let count = 0;
  for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
    const browser = await engine.launch(name === 'chromium' ? {channel:'chrome', headless:true} : {headless:true});
    try {
      for (const [device, ua] of [['iphone','Mozilla/5.0 (iPhone; CPU iPhone OS 26_5 like Mac OS X) AppleWebKit/605.1.15 Version/26.5 Mobile Safari/604.1'],['android','Mozilla/5.0 (Linux; Android 16) AppleWebKit/537.36 Chrome/140 Mobile Safari/537.36']]) {
        for (const brand of ['knowi', 'talumi']) {
        for (const width of [320, 390, 768]) {
          const page = await browser.newPage({viewport:{width,height:844},userAgent:ua});
          const requests=[];
          page.on('request', r => requests.push(r.url()));
          await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', {value:{writeText:async text=>window.copiedInvitation=text}}));
          const fragment = new URLSearchParams({code:'ABCDEF0123',name:'Julian Test ä & <b>',password:'T!ä🧠'});
          const url = origin+'/'+brand+'/gruppe/#'+fragment;
          assert.equal((await page.goto(url)).status(),200);
          await page.waitForSelector('#group-name');
          assert.equal(await page.locator('#group-name').textContent(),'Julian Test ä & <b>');
          assert.equal(await page.locator('#group-name b').count(),0);
          assert.equal(await page.locator('#apple-store').isVisible(),device==='iphone');
          assert.equal(await page.locator('#google-store').isVisible(),device==='android');
          for (const href of await page.locator('a').evaluateAll(nodes=>nodes.map(n=>n.href))) {
            assert.match(href,/^https?:\/\//); // No unknown custom scheme with missing app.
            assert.ok(!href.includes('password='));
          }
          assert.equal(await page.locator('details').getAttribute('open'),null);
          assert.equal(await page.locator('summary').textContent(),'Wie funktioniert das Beitreten?');
          assert.equal(await page.locator('h3').textContent(),'Noch kein '+brand.toUpperCase()+'?');
          assert.match(await page.locator('.next-step strong').textContent(),/denselben Einladungslink aus WhatsApp erneut/);
          assert.equal(await page.locator(device==='iphone'?'#apple-store':'#google-store').textContent(),'Verstanden – App herunterladen');
          assert.ok(!(await page.locator('body').innerText()).includes('Schon installiert?'));
          await page.locator('summary').click();
          await page.locator('#copy-invite').click();
          assert.equal(await page.evaluate(()=>window.copiedInvitation),url);
          assert.match(await page.locator('#copy-status').textContent(),/(?:Einladungslink einfügen|Gruppe beitreten)/);
          assert.ok(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)));
          await page.evaluate(()=>document.documentElement.style.fontSize='200%');
          assert.ok(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)));
          assert.ok(requests.every(u=>!u.includes('password=')));
          assert.match(await page.locator('meta[name="apple-itunes-app"]').getAttribute('content'),/app-argument=.*#code=/);
          await page.goto(origin+'/'+brand+'/gruppe/#code=bad&password=Test');
          assert.equal(await page.locator('#invitation').isVisible(),false);
          if (brand === 'talumi') {
            await page.goto(origin+'/talumi/join/#code=ABC234');
            assert.equal(await page.locator('#round-code').textContent(),'ABC234');
            assert.equal(await page.locator('#apple-store').isVisible(),device==='iphone');
            assert.equal(await page.locator('#google-store').isVisible(),device==='android');
            assert.equal(await page.locator('#status').isVisible(),false);
            await page.locator('summary').click();
            await page.locator('#copy-invite').click();
            assert.equal(await page.evaluate(()=>window.copiedInvitation),'ABC234');
            assert.ok(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)));
            await page.goto(origin+'/talumi/join/#code=ABC234&token=bad');
            assert.equal(await page.locator('#invitation').isVisible(),false);
            assert.equal(await page.locator('#status').isVisible(),true);
            assert.equal(await page.locator('#round-code').textContent(),'');
            count++;
          }
          await page.close();count++;
        }
        }
      }
    } finally {await browser.close();}
  }
  console.log(`${count} invitation scenarios passed across Chromium/WebKit and iPhone/Android layouts.`);
})().catch(e=>{console.error(e);process.exitCode=1;});

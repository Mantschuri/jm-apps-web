const {chromium, webkit} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const origin = process.env.JM_SITE_ORIGIN || 'http://127.0.0.1:8089';
const devices = [
  ['iphone','Mozilla/5.0 (iPhone; CPU iPhone OS 26_5 like Mac OS X) AppleWebKit/605.1.15 Version/26.5 Mobile Safari/604.1',0],
  ['android','Mozilla/5.0 (Linux; Android 16) AppleWebKit/537.36 Chrome/140 Mobile Safari/537.36',0],
  ['ipad','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 Version/26.0 Safari/605.1.15',5],
  ['desktop','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 Version/26.0 Safari/605.1.15',0],
];
(async()=>{
  let count=0;
  for(const [engineName,engine] of [['chromium',chromium],['webkit',webkit]]){
    const browser=await engine.launch(engineName==='chromium'?{channel:'chrome',headless:true}:{headless:true});
    try{
      for(const [device,userAgent,touches] of devices){
        const page=await browser.newPage({viewport:{width:320,height:844},userAgent});
        await page.addInitScript(n=>Object.defineProperty(navigator,'maxTouchPoints',{get:()=>n}),touches);
        // Preserve existing referral behavior, but never write synthetic events to production.
        await page.route('https://api.jm-apps.de/**',r=>r.fulfill({status:204,body:''}));
        for(const brand of ['knowi','talumi']){
          await page.goto(`${origin}/${brand}/invite/?ref=${'a'.repeat(32)}`);
          assert.equal(await page.locator('[data-referral-store="ios"]').isVisible(),device!=='android');
          assert.equal(await page.locator('[data-referral-store="android"]').isVisible(),!['iphone','ipad'].includes(device));
          assert.match(await page.locator('meta[name="apple-itunes-app"]').getAttribute('content'),/app-argument=.*ref=/);
          assert.equal(await page.locator('#referral-status').textContent(),'');
          await page.evaluate(()=>document.documentElement.style.fontSize='200%');
          assert.ok(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)));
          count++;
        }
        // Local HTTP server's 404 is replaced with the actual Pages error document.
        for(const original of ['/knowi/daily?from=test#day','/knowi/friends','/knowi/duel/abc-123?mode=quiz#round']){
          await page.route(origin+original.split('#')[0],r=>r.fulfill({status:404,contentType:'text/html',body:fs.readFileSync(path.join(__dirname,'../404.html'),'utf8')}));
          await page.goto(origin+original);
          await page.waitForURL('**/knowi/oeffnen/**');
          await page.waitForFunction(()=>document.getElementById('link-status')?.textContent==='');
          assert.equal(new URLSearchParams(new URL(page.url()).hash.slice(1)).get('link'),original);
          assert.equal(await page.locator('meta[name="apple-itunes-app"]').getAttribute('content'),'app-id=6817281226, app-argument='+origin+original);
          assert.ok(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)));
          count++;
        }
        await page.route(origin+'/talumi/join/ABC234',r=>r.fulfill({status:404,contentType:'text/html',body:fs.readFileSync(path.join(__dirname,'../404.html'),'utf8')}));
        await page.goto(origin+'/talumi/join/ABC234');
        await page.waitForURL('**/talumi/join/#code=ABC234');
        assert.equal(await page.locator('#round-code').textContent(),'ABC234');
        count++;
        await page.goto(origin+'/knowi/oeffnen/#link='+encodeURIComponent('https://evil.invalid/knowi/daily'));
        assert.equal(await page.locator('meta[name="apple-itunes-app"]').getAttribute('content'),'app-id=6817281226');
        assert.ok(!page.url().startsWith('https://evil.invalid'));
        count++;
        await page.close();
      }
    }finally{await browser.close();}
  }
  console.log(`${count} referral/content fallback scenarios passed (Chromium/WebKit, iPhone/Android/iPad/desktop, large text, original link preservation).`);
})().catch(e=>{console.error(e);process.exitCode=1;});

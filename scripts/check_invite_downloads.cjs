const {chromium, webkit}=require('playwright');
const assert=require('node:assert/strict');
const origin=process.env.JM_SITE_ORIGIN || 'http://127.0.0.1:8093';
(async()=>{
 let count=0;
 for(const [name,engine] of [['chromium',chromium],['webkit',webkit]]) {
  const browser=await engine.launch(name==='chromium'?{channel:'chrome'}:{});
  try {
   for(const ua of ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)','Mozilla/5.0 (Linux; Android 16)','Mozilla/5.0 (X11; Linux x86_64)']) {
    const page=await browser.newPage({userAgent:ua,viewport:{width:375,height:812}});
    for(const route of ['knowi/gruppe','talumi/gruppe','talumi/join']) {
     const fragment=route.endsWith('join')?'code=ABC234':new URLSearchParams({code:'ABCDEF0123',name:'Freunde',password:'Täst!'}).toString();
     const url=origin+'/'+route+'/#'+fragment;
     const requests=[];page.on('request',r=>requests.push(r.url()));
     await page.goto(url);
     assert.equal(await page.locator('h3').textContent(),`Noch kein ${route.startsWith('knowi')?'KNOWI':'TALUMI'}?`);
     assert.match(await page.locator('.next-step strong').textContent(),/denselben Einladungslink aus WhatsApp erneut/);
     assert.equal(await page.locator('summary').textContent(),'Wie funktioniert das Beitreten?');
     assert.equal(await page.locator('details').getAttribute('open'),null);
     const links=page.locator('.downloads a:visible');
     assert.equal(await links.count(),ua.includes('X11')?2:1);
     if(!ua.includes('X11')) assert.equal(await links.first().textContent(),'Verstanden – App herunterladen');
     for(const href of await links.evaluateAll(es=>es.map(e=>e.href))) {
      assert.match(href,/^https:\/\/(apps\.apple\.com|play\.google\.com)\//);
      assert.ok(!href.includes('password')&&!href.includes('#'));
     }
     assert.ok(requests.every(r=>!r.includes('password=')));
     await page.locator('summary').click();
     assert.ok(await page.locator('#copy-invite').isVisible());
     await page.goto(origin+'/'+route+'/#invalid');
     assert.equal(await page.locator('#invitation').isVisible(),false);
     count++;
    }
    await page.close();
   }
  } finally {await browser.close();}
 }
 console.log(count+' download guidance scenarios passed: mobile/desktop, both engines, valid/invalid invitations, local fragments.');
})().catch(e=>{console.error(e);process.exitCode=1});

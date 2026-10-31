// Requires Playwright and an installed Chromium browser.
// SOLAR_BROWSER optionally selects the browser executable.
const { chromium } = require('playwright');
const { createServer } = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const output = process.env.SOLAR_QA_OUTPUT || path.join(root, '..', 'solar-qa');
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml' };
const server = createServer(async (req,res) => {
  try {
    const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
    if (!file.startsWith(root + path.sep)) throw Error('Outside root');
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.end(await fs.readFile(file));
  } catch { res.statusCode=404; res.end(); }
});
(async () => {
  await fs.mkdir(output,{recursive:true});
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const browser = await chromium.launch({executablePath:process.env.SOLAR_BROWSER || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try {
    for (const viewport of [{width:1440,height:1000},{width:390,height:844}]) {
      const page=await browser.newPage({viewport});
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400) errors.push(r.url());});
      for (const file of ['index.html','studio.html']) {
        await page.goto(`http://127.0.0.1:${server.address().port}/${file}`);
        await page.evaluate(()=>document.fonts.ready);
        const target=page.locator(file==='index.html'?'.portal-sun .portal-image':'.solar-stage');
        assert.equal(await page.locator('.solar-emission').count(),3);
        assert.deepEqual(await page.locator('.solar-emission').evaluateAll(es=>es.map(e=>e.getAnimations()[0].effect.getTiming().duration)),[12000,12000,12000]);
        const shot=async()=>{
          const b=await target.boundingBox();
          const x=Math.max(0,b.x),y=Math.max(0,b.y);
          return page.screenshot({clip:{x,y,width:Math.min(viewport.width,b.x+b.width)-x,height:Math.min(viewport.height,b.y+b.height)-y}});
        };
        const freeze=async time=>page.evaluate(async t=>{
          for(const a of document.getAnimations()) {a.pause();a.currentTime=t;}
          await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
        },time);
        await freeze(6000);
        await shot(); // Warm the compositor and stabilize scrolling.
        await freeze(0);
        const initialOpacity=await page.locator('.solar-emission').evaluateAll(es=>es.map(e=>getComputedStyle(e).opacity));
        const initial=await shot();
        const before=await target.boundingBox();
        await freeze(12000);
        assert.deepEqual(await page.locator('.solar-emission').evaluateAll(es=>es.map(e=>getComputedStyle(e).opacity)),initialOpacity);
        const end=await shot();
        await fs.writeFile(path.join(output,`${file}-${viewport.width}-start.png`),initial);
        await fs.writeFile(path.join(output,`${file}-${viewport.width}-end.png`),end);
        const delta=await page.evaluate(async urls=>{
          const pixels=await Promise.all(urls.map(async src=>{
            const image=new Image();image.src=src;await image.decode();
            const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;
            const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);return ctx.getImageData(0,0,canvas.width,canvas.height).data;
          }));
          let max=0,changed=0;
          for(let i=0;i<pixels[0].length;i++){const d=Math.abs(pixels[0][i]-pixels[1][i]);max=Math.max(max,d);if(d)changed++;}
          return {max,changed,total:pixels[0].length};
        },[initial,end].map(b=>'data:image/png;base64,'+b.toString('base64')));
        console.log(file,viewport.width,delta);
        assert(delta.max<=1 && delta.changed/delta.total<.001,`${file}: loop frames differ beyond compositor rounding`);
        await freeze(6000);
        assert(!initial.equals(await shot()),`${file}: emission has no visible effect`);
        assert.deepEqual(before,await target.boundingBox());
        await page.mouse.move(Math.min(viewport.width-2,before.x+before.width/2),Math.min(viewport.height-2,before.y+before.height/2));
        assert.deepEqual(before,await target.boundingBox(),`${file}: hover moved Sun`);
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Horizontal overflow');
        await page.evaluate(()=>scrollTo(0,0));
        await page.screenshot({path:path.join(output,`${file}-${viewport.width}.png`),fullPage:true});
        await page.emulateMedia({reducedMotion:'reduce'});
        assert.equal(await page.locator('.solar-emission').evaluateAll(els=>els.filter(e=>getComputedStyle(e).animationName!=='none').length),0);
        await page.emulateMedia({reducedMotion:'no-preference'});
      }
      assert.deepEqual(errors,[]);
      await page.close();
    }
    console.log('PASS: 0/12s frames match within compositor rounding, visible activity, fixed geometry/hover, mobile layout, reduced motion, no missing assets or page errors.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());

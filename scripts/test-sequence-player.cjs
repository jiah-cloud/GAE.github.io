// Run against scripts/preview.py using a Node environment with Playwright installed.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--autoplay-policy=no-user-gesture-required']});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}), errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
 await page.goto('http://127.0.0.1:8766',{waitUntil:'load'});
 async function state(prefix){return page.evaluate(p=>{const a=document.querySelector(p==='teaser'?'#teaser-rgb':`#${p}-video`),b=document.querySelector(p==='teaser'?'#teaser-progressive':`#${p}-progressive-video`);return {a:a.currentTime/a.duration,b:b.currentTime/b.duration,paused:a.paused&&b.paused,ready:a.readyState>=3&&b.readyState>=3,pose:document.querySelector(p==='teaser'?'.teaser-pair canvas':`#${p}-pose-overlay`).hidden===false};},prefix);}
 async function control(prefix,action,value){await page.evaluate(({p,action,value})=>{const c=p==='teaser'?document.querySelector('.teaser-playback'):document.querySelector(`#${p}-video`).closest('.media-panel').querySelector('.sequence-playback');if(action==='seek'){const r=c.querySelector('input');r.value=value;r.dispatchEvent(new Event('input'));}else c.querySelector('button').click();},{p:prefix,action,value});}
 async function toggle(prefix,mode){await page.evaluate(({p,m})=>document.querySelector(`#${p}-media-toggle [data-mode=${m}]`).click(),{p:prefix,m:mode});await page.waitForTimeout(300);}
 for(const prefix of ['i2v','outdoor','teaser']){
  await page.locator(prefix==='teaser'?'#teaser-rgb':`#${prefix}-video`).scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
  let s=await state(prefix);assert(s.ready);assert(Math.abs(s.a-s.b)*81<1,`${prefix} playback drift`);
  await control(prefix,'play');await control(prefix,'seek',3000);await page.waitForTimeout(250);
  for(const mode of ['depth','pose','rgb']){
   await toggle(prefix,mode);s=await state(prefix);assert(Math.abs(s.b-.5)<.002,`${prefix} ${mode} lost midpoint`);assert(s.paused);if(mode!=='pose')assert(Math.abs(s.a-.5)<.002);else assert(s.pose);
  }
  await control(prefix,'seek',5800);await page.waitForTimeout(100);await control(prefix,'play');await page.waitForTimeout(750);s=await state(prefix);assert(s.b<.2,`${prefix} loop failed`);assert(Math.abs(s.a-s.b)*81<1);
  await control(prefix,'play');console.log(prefix+': playback, pause, seek, RGB/depth/pose preservation and loop passed');
 }
 // Every available Depth/Pose button should load the scene's own matched asset.
 let checked=0;
 for(const prefix of ['i2v','outdoor','teaser']){
  const tabs=prefix==='teaser'?'#teaser-scenes':`#${prefix}-tabs`;
  const count=await page.locator(tabs+' > button').count();
  await page.locator(prefix==='teaser'?'.teaser-pair':`#${prefix}-video`).scrollIntoViewIfNeeded();
  for(let i=0;i<count;i++){
   await page.evaluate(({tabs,i})=>document.querySelector(tabs).children[i].click(),{tabs,i});
   await page.waitForTimeout(100);
   const hasDepth=await page.locator(`#${prefix}-media-toggle [data-mode=depth]`).isVisible();
   if(hasDepth){await toggle(prefix,'depth');assert((await state(prefix)).ready,`${prefix} case ${i} missing depth`);await toggle(prefix,'pose');assert((await state(prefix)).pose);checked++;}
  }
 }
 assert.equal(checked,53);assert.deepEqual(errors,[]);
 await page.setViewportSize({width:390,height:844});await page.locator('.teaser-pair').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/gae-mobile.png'});
 console.log(`All ${checked} depth/pose cases loaded; no browser or HTTP errors.`);
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});

/* One six-second scene timeline for RGB, depth, progressive geometry and poses.
 * Each clip contains the same ordered views; duration ratios compensate for FPS.
 */
window.createSequencePlayer = function ({left, right, host, controls, canvas, image, label}) {
  const videos = [left, right];
  videos.forEach(v => { v.dataset.sequenceOutput = ''; v.loop = false; v.controls = false; v.autoplay = false; });
  if (!controls) {
    controls = document.createElement('div'); controls.className = 'teaser-playback sequence-playback';
    controls.innerHTML = '<button type="button">Play</button><input type="range" min="0" max="6000" step="1" value="0" aria-label="Synchronized sequence position"><span>0:00 / 0:06</span>';
    host.append(controls);
  }
  const button = controls.querySelector('button'), seek = controls.querySelector('input'), time = controls.querySelector('span');
  if (!canvas) { canvas = document.createElement('canvas'); canvas.width=640; canvas.height=400; canvas.hidden=true; left.after(canvas); }
  canvas.classList.add('sequence-pose'); canvas.setAttribute('aria-label','Synchronized camera trajectory');
  let sample, mode='rgb', position=0, visible=false, loaded=false, frame=0;
  let wanted=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pending = new Set(), blocked = new Set();
  const active = () => mode === 'pose' ? [right] : videos;
  const valid = v => Number.isFinite(v.duration) && v.duration>0;
  const stop = () => { cancelAnimationFrame(frame); frame=0; videos.forEach(v=>v.pause()); };
  function paint() {
    seek.value = Math.round(position*6000); time.textContent=`0:0${Math.min(6,Math.floor(position*6))} / 0:06`;
    button.textContent=wanted?'Pause':'Play'; button.setAttribute('aria-label',wanted?'Pause synchronized videos':'Play synchronized videos');
    if (mode !== 'pose') return;
    const data=window.NGD_DIRECT_POSES?.[sample.poseData];
    if (!data) return;
    const ctx=canvas.getContext('2d'), w=canvas.width,h=canvas.height;
    const count=data.frameCount, index=Math.min(count-1,Math.floor(position*count));
    ctx.fillStyle='#080e17';ctx.fillRect(0,0,w,h);ctx.font='18px system-ui';ctx.fillStyle='#fff';ctx.fillText(`CAMERA POSE     ${index+1} / ${count}`,24,32);
    for (const [name,color] of [['input','#67e8f9'],['predicted','#f0abfc']]) {
      const path=data[name]; if (!path) continue;
      const point=p=>[24+p[0]*(w-48),55+p[1]*(h-85)];
      for (const [end,alpha] of [[count-1,.22],[index,1]]) {
        ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=3;ctx.beginPath();
        path.xy.slice(0,end+1).forEach((p,i)=>{const q=point(p); i?ctx.lineTo(...q):ctx.moveTo(...q);});ctx.stroke();
      }
      ctx.globalAlpha=1;ctx.fillStyle=color;ctx.beginPath();ctx.arc(...point(path.xy[index]),6,0,Math.PI*2);ctx.fill();
      ctx.font='14px system-ui';ctx.fillText(name==='input'?'INPUT':'GAE',name==='input'?24:105,h-12);
    }
    canvas.title = data.referenceType || 'Input/reference and GAE predicted camera trajectories';
  }
  function align(v) {
    if (!valid(v)) return;
    v.playbackRate=v.duration/6;
    const target=Math.min(position*v.duration,Math.max(0,v.duration-.001));
    if (Math.abs(v.currentTime-target)>.001) v.currentTime=target;
    pending.delete(v);
  }
  function resume() {
    paint();
    if (!loaded || !visible || document.hidden || !wanted || active().some(v=>pending.has(v)||blocked.has(v)||v.readyState<3||v.seeking||v.error)) return;
    active().forEach(v=>{if(v.paused)v.play().catch(error=>{if(error.name==='AbortError')return;wanted=false;stop();paint();});});
    if (!frame) frame=requestAnimationFrame(tick);
  }
  function tick() {
    frame=0;
    if (!wanted || !visible || document.hidden) return;
    if (active().some(v=>v.readyState<3||v.seeking)) { stop(); return; }
    position=right.currentTime/right.duration;
    if (mode!=='pose' && valid(left)) {
      const drift=left.currentTime/left.duration-position;
      // Correct at less than half an 81-view frame; no accumulated loop drift.
      if (Math.abs(drift)>1/200) { stop();align(left);resume();return; }
    }
    paint();frame=requestAnimationFrame(tick);
  }
  function load(v, source, poster) {
    if (v.dataset.sequenceSource===source) return;
    pending.add(v); blocked.delete(v); v.dataset.sequenceSource=source;
    v.poster=poster||source.replace(/\.mp4$/,'_poster.jpg');v.preload='auto';
    v.replaceChildren();v.src=source;v.load();
  }
  function loadSelection() {
    if (!sample || !visible) return;
    loaded=true;
    load(right,sample.progressive,sample.progressivePoster);
    if (mode!=='pose') load(left,sample[mode],sample[mode+'Poster']);
    active().forEach(v=>{if(!pending.has(v))align(v);});
    resume();
  }
  videos.forEach(v=>{
    v.addEventListener('loadedmetadata',()=>{align(v);resume();});
    v.addEventListener('canplay',()=>{blocked.delete(v);resume();});
    v.addEventListener('seeked',resume);
    v.addEventListener('waiting',()=>{blocked.add(v);stop();});
    v.addEventListener('error',()=>{stop();button.textContent='Retry';});
    v.addEventListener('ended',()=>{stop();position=0;active().forEach(align);resume();});
  });
  button.addEventListener('click',()=>{wanted=!wanted;if(!wanted)stop();resume();});
  seek.max=6000;
  seek.addEventListener('input',()=>{stop();position=Number(seek.value)/6000;active().forEach(align);paint();resume();});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){loadSelection();resume();}else stop();},{threshold:.05}).observe(host);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else resume();});
  return {select(next,nextMode='rgb') {
    if (sample?.key===next.key && mode===nextMode) return;
    stop();
    if(sample?.key!==next.key) {position=0;pending.clear();blocked.clear();}
    sample=next;mode=nextMode;
    left.hidden=mode==='pose';if(image)image.hidden=true;
    canvas.hidden=mode!=='pose';
    if(label)label.textContent=mode==='depth'?'Depth video':mode==='pose'?'Camera trajectory':'RGB video';
    paint();loadSelection();
  }};
};

(() => {
  const stage = document.querySelector('.hero-orbit-stage');
  if (!stage) return;
  const rgb = document.getElementById('hero-rgb');
  const followers = [document.getElementById('hero-depth'), document.getElementById('hero-geometry')];
  const videos = [rgb, ...followers];
  const canvas = document.getElementById('hero-pose');
  const playButton = document.getElementById('hero-play');
  const seek = document.getElementById('hero-seek');
  const frameLabel = document.getElementById('hero-frame');
  const orbit = stage.querySelector('.orbit-progress');
  const data = window.NGD_DIRECT_POSES?.['assets/i2v/pose-data/re10k_038.json'];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let wanted = !reducedMotion.matches;
  let visible = false;
  let animation = 0;
  let lastFrame = -1;
  const count = data?.frameCount || 81;
  const progress = () => Number.isFinite(rgb.duration) && rgb.duration > 0 ? Math.min(1, rgb.currentTime / rgb.duration) : 0;

  // Both paths use the same projection and scale; the estimated poses are the
  // stored Sim(3)-aligned estimates, not a copy of the ground-truth trajectory.
  function createPoseRenderer() {
    if (!data?.inputC2w || !data?.predictedC2wAligned) return () => {};
    const ctx = canvas.getContext('2d');
    const gt = data.inputC2w;
    const estimated = data.predictedC2wAligned;
    const center = m => [m[0][3], m[1][3], m[2][3]];
    const points = [...gt, ...estimated].map(center);
    const bounds = [0, 1, 2].map(axis => [Math.min(...points.map(p => p[axis])), Math.max(...points.map(p => p[axis]))]);
    const origin = bounds.map(([min, max]) => (min + max) / 2);
    const extent = Math.max(...bounds.map(([min, max]) => max - min));
    const scale = 440 / extent;
    const project = p => {
      const [x, y, z] = p.map((v, i) => v - origin[i]);
      return [336 + (x * .8 - z * .6) * scale, 205 + (-x * .28 - z * .38 - y * .95) * scale];
    };
    const gtColor = '#76d6c5';
    const estimatedColor = '#b49afc';
    const path = (poses, end, color, alpha, dashed = false) => {
      ctx.save();ctx.globalAlpha = alpha;ctx.strokeStyle = color;ctx.lineWidth = 3;
      if (dashed) ctx.setLineDash([6, 7]);
      ctx.beginPath();poses.slice(0, end + 1).forEach((m, i) => {const [x,y] = project(center(m));i ? ctx.lineTo(x,y) : ctx.moveTo(x,y);});ctx.stroke();ctx.restore();
    };
    const camera = (m, color, alpha, size = .16) => {
      const p = center(m);
      const tip = [0,1,2].map(i => p[i] + m[i][2] * size);
      const left = [0,1,2].map(i => tip[i] - m[i][0] * size * .5);
      const right = [0,1,2].map(i => tip[i] + m[i][0] * size * .5);
      const a = project(p), b = project(left), c = project(right);
      ctx.save();ctx.globalAlpha = alpha;ctx.strokeStyle = color;ctx.lineWidth = 2;
      ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.lineTo(...c);ctx.closePath();ctx.stroke();ctx.restore();
    };
    return frame => {
      ctx.clearRect(0,0,672,378);
      const gradient = ctx.createLinearGradient(0,0,672,378);gradient.addColorStop(0,'#1e292a');gradient.addColorStop(1,'#10171b');ctx.fillStyle=gradient;ctx.fillRect(0,0,672,378);
      const floor = bounds[1][0] - extent * .07;
      ctx.strokeStyle='#a4b8b315';ctx.lineWidth=1;
      for(let i=0;i<=8;i++){
        const delta = (i / 8 - .5) * extent * 1.2;
        for(const axis of [0,2]){
          const p1=[origin[0],floor,origin[2]],p2=[origin[0],floor,origin[2]];
          p1[axis]+=delta;p2[axis]+=delta;
          p1[axis===0?2:0]-=extent*.6;p2[axis===0?2:0]+=extent*.6;
          ctx.beginPath();ctx.moveTo(...project(p1));ctx.lineTo(...project(p2));ctx.stroke();
        }
      }
      path(gt,count-1,gtColor,.3,true);path(estimated,count-1,estimatedColor,.3,true);
      path(gt,frame,gtColor,1);path(estimated,frame,estimatedColor,1);
      for(let i=0;i<=frame;i+=10){camera(gt[i],gtColor,.4);camera(estimated[i],estimatedColor,.4);}
      camera(gt[frame],gtColor,1,.3);camera(estimated[frame],estimatedColor,1,.3);
      for(const [poses,color] of [[gt,gtColor],[estimated,estimatedColor]]){
        const [x,y]=project(center(poses[frame]));ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill();
      }
      ctx.font='500 19px system-ui, sans-serif';ctx.fillStyle=gtColor;ctx.fillRect(24,26,18,3);ctx.fillText('GT',50,34);ctx.fillStyle=estimatedColor;ctx.fillRect(113,26,18,3);ctx.fillText('Estimated',139,34);
      ctx.font='16px system-ui, sans-serif';ctx.fillStyle='#b2c2c3';ctx.fillText('Sim(3) aligned',24,353);ctx.textAlign='right';ctx.fillText(`nATE ${(data.metrics.ateNormalized * 100).toFixed(2)}%`,648,353);ctx.textAlign='left';
      canvas.dataset.frame = String(frame + 1);
    };
  }
  const drawPose = createPoseRenderer();
  function sync(force = false) {
    const p = progress();
    followers.forEach(video => {
      if (!Number.isFinite(video.duration) || !Number.isFinite(rgb.duration) || !rgb.duration) return;
      const target = p * video.duration;
      video.playbackRate = video.duration / rgb.duration;
      if (force || Math.abs(video.currentTime - target) > .12) video.currentTime = Math.min(target, Math.max(0,video.duration - .01));
    });
    const frame = Math.min(count - 1, Math.floor(p * count));
    if (frame !== lastFrame || force) {drawPose(frame);lastFrame=frame;}
    seek.value = String(Math.round(p * 1000));
    seek.setAttribute('aria-valuetext',`Frame ${frame + 1} of ${count}`);
    frameLabel.textContent = `${String(frame + 1).padStart(2,'0')} / ${count}`;
    orbit.style.strokeDashoffset = String(-p);
  }
  function updateButton() {
    playButton.textContent = rgb.paused ? 'Play' : 'Pause';
    playButton.setAttribute('aria-label',`${rgb.paused ? 'Play' : 'Pause'} synchronized showcase`);
  }
  function tick() {
    sync();
    if (!rgb.paused && visible && !document.hidden) animation=requestAnimationFrame(tick);
  }
  function pauseAll() {cancelAnimationFrame(animation);videos.forEach(v=>v.pause());updateButton();}
  async function playAll() {
    if (!visible || document.hidden || !wanted) return;
    try {await rgb.play();} catch {updateButton();return;}
    if (!wanted || !visible || document.hidden) {pauseAll();return;}
    sync(true);
    followers.forEach(v=>v.play().catch(()=>{}));
    updateButton();
  }
  rgb.addEventListener('play',()=>{cancelAnimationFrame(animation);animation=requestAnimationFrame(tick);updateButton();});
  rgb.addEventListener('pause',()=>{cancelAnimationFrame(animation);followers.forEach(v=>v.pause());updateButton();});
  ['loadedmetadata','seeked','timeupdate'].forEach(event=>rgb.addEventListener(event,()=>sync(event!=='timeupdate')));
  followers.forEach(v=>v.addEventListener('loadedmetadata',()=>{sync(true);if(!rgb.paused)v.play().catch(()=>{});}));
  playButton.addEventListener('click',()=>{wanted=rgb.paused;if(wanted)playAll();else pauseAll();});
  seek.addEventListener('input',()=>{
    if(Number.isFinite(rgb.duration)){rgb.currentTime=Number(seek.value)/1000*Math.max(0,rgb.duration-.02);sync(true);}
  });
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&wanted)playAll();else pauseAll();},{threshold:.12}).observe(stage);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseAll();else if(wanted)playAll();});
  reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){wanted=false;pauseAll();}});
  sync(true);updateButton();
})();

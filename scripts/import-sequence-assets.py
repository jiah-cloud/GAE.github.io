"""Import matched depth/pose assets; keep source poses and generate portable browser data."""
import json,pathlib,re,shutil,subprocess
import numpy as np
ROOT=pathlib.Path(__file__).resolve().parents[1]
SOURCE=pathlib.Path('/Users/michael/Downloads/page0920-depth-pose-slim')
app=(ROOT/'app.bundle.js').read_text()
def array(name): return json.loads(re.search(r'const '+name+r' = (\[.*?\n\]);',app,re.S)[1])
samples=array('teaserSamples')+array('colleagueSamples')
for group in ['i2v','outdoor']:
 samples+=json.loads((ROOT/f'assets/direct-data/{group}-samples.js').read_text().split(' = ',1)[1].rstrip(';\n'))
folders={p.parent.name:p.parent for p in SOURCE.rglob('depth.mp4')}
manifest={}; missing=[]
for s in samples:
 key=s['key']; folder=key
 for prefix,source in [('indoor-','iv3_scannetpp_preprocessed'),('outdoor-','mvssynth_packed'),('world-','iv3_omniworld_game_packed'),('omniworld-','iv3_omniworld_game_packed')]:
  if key.startswith(prefix): folder=source+'__scannetpp__'+key.split('-')[-1]
 if folder not in folders:
  if not s.get('depth'):missing.append(key)
  continue
 src=folders[folder]; rel=pathlib.Path('assets/sequence-extras')/key; dst=ROOT/rel; dst.mkdir(parents=True,exist_ok=True)
 shutil.copy2(src/'depth.mp4',dst/'depth.mp4'); shutil.copytree(src/'pose',dst/'pose',dirs_exist_ok=True)
 subprocess.run(['ffmpeg','-v','error','-y','-i',str(dst/'depth.mp4'),'-frames:v','1',str(dst/'depth_poster.jpg')],check=True)
 poses=np.load(src/'pose/pred_c2w.npy').reshape(-1,4,4)
 # Oblique orthographic projection preserves elevation as well as horizontal motion.
 projection=np.array([[.84,0,-.54],[.22,-.91,.35]])
 xy=poses[:,:3,3]@projection.T; direction=poses[:,:3,2]@projection.T
 center=(xy.min(0)+xy.max(0))/2; span=max(np.ptp(xy,axis=0).max(),1e-6)
 xy=(xy-center)/span*.72+.5
 direction/=np.maximum(np.linalg.norm(direction,axis=1,keepdims=True),1e-9)
 data={'frameCount':len(poses),'predicted':{'xy':xy.round(6).tolist(),'direction':direction.round(6).tolist()},'source':str(src.relative_to(SOURCE))}
 (dst/'pose.json').write_text(json.dumps(data))
 points=' '.join(f'{x*640:.2f},{y*400:.2f}' for x,y in xy)
 (dst/'pose.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><rect width="640" height="400" fill="#090e16"/><text x="24" y="32" fill="white" font-family="sans-serif">GAE predicted camera trajectory · {len(poses)} views</text><polyline points="{points}" fill="none" stroke="#f0abfc" stroke-width="3"/></svg>')
 manifest[key]={'depth':str(rel/'depth.mp4'),'pose':str(rel/'pose.svg'),'poseData':str(rel/'pose.json'),'data':data}
(ROOT/'assets/direct-data/sequence-extras.js').write_text('window.NGD_SEQUENCE_EXTRAS = '+json.dumps(manifest,separators=(',',':'))+';\n')
print('Imported',len(manifest),'cases. Missing source:',sorted(set(missing)))

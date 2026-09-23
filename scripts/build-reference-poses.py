"""Build paired camera paths from preserved raw arrays using one global Sim(3)."""
import json,pathlib,shutil,subprocess
import numpy as np
ROOT=pathlib.Path(__file__).resolve().parents[1]
REF=ROOT/'assets/reference-poses'
def validate(p):
 a=np.load(p,allow_pickle=False).astype(float)
 assert a.shape==(81,4,4) and np.isfinite(a).all(),p
 assert np.max(np.abs(a[:,3]-[0,0,0,1]))<1e-5,p
 assert np.max(np.abs(a[:,:3,:3].transpose(0,2,1)@a[:,:3,:3]-np.eye(3)))<1e-3,p
 assert np.max(np.abs(np.linalg.det(a[:,:3,:3])-1))<1e-3,p
 return a

def paired(inp,pred):
 # Least-squares similarity, fitted once to all corresponding camera centers.
 x=pred[:,:3,3];y=inp[:,:3,3];mx=x.mean(0);my=y.mean(0)
 xc=x-mx;yc=y-my
 u,d,vt=np.linalg.svd(yc.T@xc/len(x));sign=np.ones(3);sign[-1]=np.linalg.det(u@vt)
 rot=u@np.diag(sign)@vt
 variance=np.mean(np.sum(xc*xc,axis=1));assert variance>1e-12,'Degenerate predicted trajectory'
 scale=float(np.sum(d*sign)/variance);assert scale>0
 trans=my-scale*(rot@mx)
 aligned=scale*x@rot.T+trans
 # One shared camera-relative oblique view and one common display scale.
 basis=inp[0,:3,:3].T
 projection=np.array([[.84,0,-.54],[.22,-.91,.35]])@basis
 paths={'input':(y@projection.T,inp[:,:3,2]@projection.T),
        'predicted':(aligned@projection.T,(pred[:,:3,2]@rot.T)@projection.T)}
 allxy=np.concatenate([p[0] for p in paths.values()]);center=(allxy.min(0)+allxy.max(0))/2
 span=max(np.ptp(allxy,axis=0).max(),1e-6)
 result={'frameCount':81,'alignment':{'method':'Sim(3)','scale':scale,'rotation':rot.tolist(),'translation':trans.tolist(),'description':'One global similarity fit over 81 corresponding camera centers; shared projection and display scale.'}}
 for name,(xy,direction) in paths.items():
  direction/=np.maximum(np.linalg.norm(direction,axis=1,keepdims=True),1e-9)
  result[name]={'xy':((xy-center)/span*.72+.5).round(6).tolist(),'direction':direction.round(6).tolist()}
 return result

def main():
 file=ROOT/'assets/direct-data/sequence-extras.js'
 manifest=json.loads(file.read_text().split(' = ',1)[1].rstrip(';\n'))
 for folder in sorted(REF.iterdir()):
  if not folder.is_dir():continue
  key=folder.name;dst=ROOT/'assets/sequence-extras'/key;dst.mkdir(parents=True,exist_ok=True)
  pose=dst/'pose';pose.mkdir(exist_ok=True)
  for name in ['input_c2w.npy','input_K.npy','pred_c2w.npy','pred_K.npy']:
   if (folder/name).exists():shutil.copy2(folder/name,pose/name)
  if (folder/'depth.mp4').exists():
   shutil.copy2(folder/'depth.mp4',dst/'depth.mp4')
   subprocess.run(['ffmpeg','-v','error','-y','-i',str(dst/'depth.mp4'),'-frames:v','1',str(dst/'depth_poster.jpg')],check=True)
  rel=dst.relative_to(ROOT)
  if key not in manifest:manifest[key]={'depth':str(rel/'depth.mp4'),'pose':str(rel/'pose.svg'),'poseData':str(rel/'pose.json')}
 for key,item in manifest.items():
  dst=ROOT/pathlib.Path(item['poseData']).parent;pose=dst/'pose'
  inp=validate(pose/'input_c2w.npy');pred=validate(pose/'pred_c2w.npy')
  data=paired(inp,pred)
  meta=REF/key/'metadata.json'
  data['referenceType']=json.loads(meta.read_text())['reference_trajectory_type'] if meta.exists() else 'Input/reference trajectory'
  item['data']=data;(dst/'pose.json').write_text(json.dumps(data,separators=(',',':')))
  polylines=''
  for name,color in [('input','#67e8f9'),('predicted','#f0abfc')]:
   points=' '.join(f'{x*640:.2f},{y*400:.2f}' for x,y in data[name]['xy'])
   polylines+=f'<polyline points="{points}" fill="none" stroke="{color}" stroke-width="3"/>'
  (dst/'pose.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><rect width="640" height="400" fill="#090e16"/><text x="24" y="32" fill="white" font-family="sans-serif">INPUT / GAE · 81 views</text>'+polylines+'</svg>')
 file.write_text('window.NGD_SEQUENCE_EXTRAS = '+json.dumps(manifest,separators=(',',':'))+';\n')
 print(f'Built {len(manifest)} paired trajectories, including the 9 existing input sequences.')
if __name__=='__main__':main()

import json,argparse,subprocess,hashlib
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import numpy as np,soundfile as sf,imageio_ffmpeg
p=argparse.ArgumentParser();p.add_argument('--manifest',required=True);p.add_argument('--input',required=True);p.add_argument('--out',required=True);p.add_argument('--config',default=str(Path(__file__).with_name('config.json')));args=p.parse_args()
config=json.load(open(args.config));enc=config['encoding']
items=json.load(open(args.manifest));dest=Path(args.out);dest.mkdir(parents=True,exist_ok=True);ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
def encode(item):
 src=Path(args.input)/(Path(item['file']).stem+'.wav');a,sr=sf.read(src)
 if a.ndim!=1 or not np.isfinite(a).all() or len(a)<sr*.2:raise ValueError(str(src))
 peak=float(np.max(np.abs(a)));rms=float(np.sqrt(np.mean(a*a)))
 if peak<.001 or rms<.0001:raise ValueError('silent '+str(src))
 # Keep quiet consonants and natural gaps; remove only the surrounding silence.
 # Frame energy is safer than testing individual zero crossings.
 win=max(1,int(sr*.01));n=(len(a)+win-1)//win
 energy=np.array([np.sqrt(np.mean(a[j*win:(j+1)*win]**2)) for j in range(n)])
 threshold=max(enc['trimFloorRms'],float(np.max(energy))*enc['trimRelativeRms'])
 active=np.flatnonzero(energy>threshold)
 if not len(active):raise ValueError('no speech '+str(src))
 start=max(0,int(active[0]*win-sr*enc['preserveStartMs']/1000));end=min(len(a),int((active[-1]+1)*win+sr*enc['preserveEndMs']/1000))
 b=a[start:end];brms=float(np.sqrt(np.mean(b*b)));bpeak=float(np.max(np.abs(b)))
 gain=min(enc['rmsTarget']/brms,enc['peakLimit']/bpeak)
 b=b*gain
 # A short silence at each end avoids a clipped start on repeated playback.
 b=np.pad(b,(int(sr*enc['paddingStartMs']/1000),int(sr*enc['paddingEndMs']/1000)))
 temp=dest/(item['file']+'.tmp.wav');target=dest/item['file'];sf.write(temp,b,sr,subtype='PCM_16')
 try:subprocess.run([ffmpeg,'-v','error','-y','-i',str(temp),'-ac','1','-c:a','aac','-b:a',str(enc['bitrate']),'-movflags','+faststart',str(target)],check=True,capture_output=True)
 finally:temp.unlink(missing_ok=True)
 return {**item,'model':config['model'],'revision':config['revision'],'sampleRate':sr,'duration':len(b)/sr,'rawDuration':len(a)/sr,'trimStart':start/sr,'trimEnd':(len(a)-end)/sr,'gainDb':float(20*np.log10(gain)),'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()}
with ThreadPoolExecutor(max_workers=8) as pool:
 results=list(pool.map(encode,items))
(dest/'generation-report.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps({'files':len(results),'seconds':sum(x['duration'] for x in results),'bytes':sum(x['bytes'] for x in results),'smallest':min(x['bytes'] for x in results),'longest':max(x['duration'] for x in results)}),flush=True)

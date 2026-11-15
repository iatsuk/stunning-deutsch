"""Generate new German speech with OmniVoice and permanent synthetic references."""
import argparse
import hashlib
import importlib.metadata
import json
import re
from pathlib import Path

p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--manifest', required=True)
p.add_argument('--out', required=True)
p.add_argument('--config', default=str(Path(__file__).with_name('config.json')))
p.add_argument('--voices', default=str(Path(__file__).with_name('voices')))
p.add_argument('--device', default='cuda:0', help='cuda:0, mps, or cpu')
p.add_argument('--shard', type=int, default=0)
p.add_argument('--shards', type=int, default=1)
args = p.parse_args()
if not 0 <= args.shard < args.shards:
    p.error('Require 0 <= shard < shards')
config = json.loads(Path(args.config).read_text())
if config['model'] != 'k2-fsa/OmniVoice':
    p.error('Only OmniVoice is authorized for new synthesis.')
items = json.loads(Path(args.manifest).read_text())[args.shard::args.shards]
for item in items:
    if item.get('model') != config['model'] or item.get('revision') != config['revision']:
        p.error('Manifest must target the current OmniVoice revision. Export it with --missing.')
    if Path(item['file']).name != item['file'] or not re.fullmatch(r'[a-f0-9]{12}\.m4a', item['file']):
        p.error('Invalid output filename in manifest.')
if not items:
    print('No new recordings.'); raise SystemExit(0)

import numpy as np
import soundfile as sf
import torch
from huggingface_hub import snapshot_download
from omnivoice import OmniVoice

torch.set_num_threads(4)
voices = Path(args.voices)
profiles = json.loads((voices / 'profiles.json').read_text())
for voice in sorted({x['voice'] for x in items}):
    spec = config['voices'][voice]
    if hashlib.sha256((voices / spec['reference']).read_bytes()).hexdigest() != spec['sha256']:
        raise ValueError(f'Reference checksum mismatch: {voice}')
model_path = snapshot_download(config['model'], revision=config['revision'])
model = OmniVoice.from_pretrained(model_path, device_map=args.device,
                                  dtype=torch.float32 if args.device == 'cpu' else torch.float16)
out = Path(args.out)
out.mkdir(parents=True, exist_ok=True)
metadata = {'model': config['model'], 'revision': config['revision'], 'shard': args.shard,
            'settings': config['generation'], 'packages': {name: importlib.metadata.version(name) for name in ('torch', 'omnivoice', 'transformers')}}
(out / f'worker-{args.shard}.json').write_text(json.dumps(metadata, indent=2))
for item in items:
    target = out / (Path(item['file']).stem + '.wav')
    if target.exists() and sf.info(target).frames > 0:
        continue
    # Per-file seeds do not depend on sharding or restart position.
    # A manifest may name another seed to re-voice a recording that came out wrong.
    seed = item.get('seed', config['generation']['seed'] + int(Path(item['file']).stem, 16) % 1000000)
    torch.manual_seed(seed)
    text = item['text'] if re.search(r'[.!?…]$', item['text']) else item['text'] + '.'
    waves = model.generate(text=text, language=config['generation']['language'],
                           ref_audio=str(voices / config['voices'][item['voice']]['reference']),
                           ref_text=profiles['text'], num_step=config['generation']['num_step'],
                           postprocess_output=config['generation']['postprocess_output'],
                           speed=item.get('speed'))
    wave = np.asarray(waves[0])
    if wave.ndim != 1 or not np.isfinite(wave).all() or len(wave) < 4800:
        raise ValueError(f'Invalid waveform: {target.name}')
    temp = target.with_suffix('.part.wav')
    sf.write(temp, wave, 24000, subtype='PCM_16')
    temp.replace(target)
    (out / (target.stem + '.json')).write_text(json.dumps(
        {**item, 'seed': seed, 'spokenText': text, 'rawSeconds': len(wave) / 24000}, ensure_ascii=False, indent=2))
    print(json.dumps({'file': target.name, 'seconds': len(wave) / 24000}), flush=True)

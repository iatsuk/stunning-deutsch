"""Generate German audio with pinned Qwen3-TTS and permanent synthetic voices."""
import argparse
import hashlib
import importlib.metadata
import json
import re
import time
from pathlib import Path

import numpy as np
import soundfile as sf
import torch
from huggingface_hub import snapshot_download
from qwen_tts import Qwen3TTSModel

p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--manifest', required=True)
p.add_argument('--out', required=True)
p.add_argument('--config', default=str(Path(__file__).with_name('config.json')))
p.add_argument('--voices', default=str(Path(__file__).with_name('voices')))
p.add_argument('--shard', type=int, default=0)
p.add_argument('--shards', type=int, default=1)
args = p.parse_args()
if not 0 <= args.shard < args.shards:
    p.error('Require 0 <= shard < shards')
torch.set_num_threads(4)
config = json.loads(Path(args.config).read_text())
voices = Path(args.voices)
profiles = json.loads((voices / 'profiles.json').read_text())
for voice, spec in config['voices'].items():
    if hashlib.sha256((voices / spec['reference']).read_bytes()).hexdigest() != spec['sha256']:
        raise ValueError(f'Reference checksum mismatch: {voice}')
model_path = snapshot_download(config['model'], revision=config['revision'])
model = Qwen3TTSModel.from_pretrained(model_path, device_map='cuda:0', dtype=torch.bfloat16, attn_implementation='sdpa')
items = json.loads(Path(args.manifest).read_text())[args.shard::args.shards]
# Similar lengths reduce padding in autoregressive batches.
items.sort(key=lambda x: (len(x['text']), x['file']))
prompts = {v: model.create_voice_clone_prompt(ref_audio=str(voices / config['voices'][v]['reference']),
            ref_text=profiles['text'], x_vector_only_mode=False)[0] for v in sorted({x['voice'] for x in items})}
out = Path(args.out)
out.mkdir(parents=True, exist_ok=True)
metadata = {'model': config['model'], 'revision': config['revision'], 'shard': args.shard, 'shards': args.shards,
            'torch': torch.__version__, 'qwen-tts': importlib.metadata.version('qwen-tts'),
            'transformers': importlib.metadata.version('transformers'),
            'configSha256': hashlib.sha256(Path(args.config).read_bytes()).hexdigest()}
(out / f'worker-{args.shard}.json').write_text(json.dumps(metadata, indent=2))
batch_size = config['generation']['batchSize']
for index in range(0, len(items), batch_size):
    batch = items[index:index + batch_size]
    targets = [out / (Path(x['file']).stem + '.wav') for x in batch]
    valid = [f.exists() and sf.info(f).frames > 0 for f in targets]
    if all(valid):
        continue
    # Regenerate a partially completed batch with the same seed and full inputs.
    seed = config['generation']['seed'] + args.shard * 100000 + index // batch_size
    torch.manual_seed(seed)
    texts = [x['text'] if re.search(r'[.!?…]$', x['text']) else x['text'] + '.' for x in batch]
    start = time.time()
    wavs, sr = model.generate_voice_clone(
        text=texts, language=['German'] * len(batch),
        voice_clone_prompt=[prompts[x['voice']] for x in batch],
        do_sample=True, temperature=config['generation']['temperature'],
        max_new_tokens=config['generation']['max_new_tokens'],
    )
    if len(wavs) != len(batch):
        raise ValueError('Unexpected number of output waveforms')
    records = []
    for x, wave, target, spoken in zip(batch, wavs, targets, texts):
        if not np.isfinite(wave).all() or len(wave) < sr * .2:
            raise ValueError(f'Invalid waveform: {target}')
        temp = target.with_suffix('.part.wav')
        sf.write(temp, wave, sr, subtype='PCM_16')
        temp.replace(target)
        records.append({'file': target.name, 'duration': len(wave) / sr, 'spokenText': spoken})
    (out / f'batch-{args.shard}-{index // batch_size}.json').write_text(json.dumps(
        {'seed': seed, 'records': records}, ensure_ascii=False, indent=2))
    print(json.dumps({'shard': args.shard, 'completed': min(index + batch_size, len(items)),
                      'total': len(items), 'elapsed': time.time() - start, 'files': records}), flush=True)

# Replay the reviewed variants recorded in the configuration after normal batches.
for item in items:
    variant = config['generation'].get('curatedVariants', {}).get(item['voice'] + '|' + item['text'])
    if not variant:
        continue
    torch.manual_seed(variant['seed'])
    texts = variant['texts']
    wavs, sr = model.generate_voice_clone(
        text=texts, language=['German'] * len(texts),
        voice_clone_prompt=[prompts[item['voice']]] * len(texts),
        do_sample=True, temperature=variant['temperature'], max_new_tokens=variant['max_new_tokens'],
    )
    wave = wavs[variant['select']]
    if not np.isfinite(wave).all():
        raise ValueError('Invalid curated waveform')
    target = out / (Path(item['file']).stem + '.wav')
    temporary = target.with_suffix('.part.wav')
    sf.write(temporary, wave, sr, subtype='PCM_16')
    temporary.replace(target)
    (out / ('curated-' + target.stem + '.json')).write_text(json.dumps(
        {'file': target.name, 'text': item['text'], 'voice': item['voice'], **variant},
        ensure_ascii=False, indent=2))

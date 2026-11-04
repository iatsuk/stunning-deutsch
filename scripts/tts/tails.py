"""Find recordings whose end is broken: a fragment after the phrase, or the phrase cut off.

OmniVoice sometimes keeps generating after the text: after a pause a short burst starts
and ends abruptly at the end of the output. It also sometimes stops in the middle of the last
vowel: the output ends while the voice is still loud, and the added silence follows at once.
Whisper reports neither.

    python3 tails.py --manifest manifest.json WAV...

Takes 16-bit WAV files (decode M4A first) named like the manifest entries and prints
suspicious ones as JSON lines. The manifest gives the text: a long pause is normal
between sentences, but not inside a phrase without punctuation.
"""
import argparse
import json
import re
import struct
from pathlib import Path

import numpy as np

# Thresholds checked on all A1–B1 recordings: legitimate endings like "…? Danke!"
# or "Ja, hier, bitte." pass, the three known broken recordings are found.
PAUSE_MS = 300
BLIP_MS = 60
FRAGMENT_MS = 250
# Level of the last 20 ms of the output before the added silence, relative to the peak. Over
# 591 OmniVoice recordings, the three with a clipped last vowel (Super! Bravo! among them) end
# louder than -30 dB; complete endings fade below -32 dB.
CUT_DB = -30


def pcm(path):
    data = Path(path).read_bytes()
    i, rate, channels = 12, 24000, 1
    while i < len(data):
        chunk, size = data[i:i + 4], struct.unpack('<I', data[i + 4:i + 8])[0]
        if chunk == b'fmt ':
            channels, rate = struct.unpack('<HI', data[i + 10:i + 16])
        if chunk == b'data':
            samples = np.frombuffer(data[i + 8:i + 8 + size], dtype='<i2')
            return rate, samples[::channels].astype(float)
        i += 8 + size + (size & 1)
    raise ValueError(f'No PCM data: {path}')


def end_level(rate, audio):
    """Level in dB of the last 20 ms before the trailing silence, relative to the peak."""
    peak = np.abs(audio).max()
    sound = np.flatnonzero(np.abs(audio) >= peak * 10 ** (-60 / 20))
    end = sound[-1] + 1
    seg = audio[max(0, end - rate // 50):end]
    return 20 * np.log10(np.sqrt((seg ** 2).mean()) / peak + 1e-9)


def tail(path, text):
    rate, audio = pcm(path)
    level = end_level(rate, audio)
    if level > CUT_DB:
        return {'file': Path(path).name, 'text': text, 'endDb': round(float(level), 1), 'reason': 'cut off at the end'}
    win = rate // 100
    frames = len(audio) // win
    energy = np.sqrt((audio[:frames * win].reshape(frames, win) ** 2).mean(1))
    loud = np.flatnonzero(energy > energy.max() * 0.06)
    breaks = np.flatnonzero(np.diff(loud) > PAUSE_MS // 10)
    if not len(breaks):
        return None
    start, end = loud[breaks[-1] + 1], loud[-1]
    pause = int((start - loud[breaks[-1]] - 1) * 10)
    length = int((end - start + 1) * 10)
    # Places where the text itself allows a pause: punctuation inside the phrase and the
    # gap after an article, which older recordings of single nouns often have.
    allowed = len(re.findall(r'[.,!?;:–—…](?=\s)|^(?:der|die|das)(?=\s)', text or ''))
    if length <= BLIP_MS:
        reason = 'blip after the end'
    elif text is not None and len(breaks) > allowed and length <= FRAGMENT_MS:
        reason = 'pause where the text has none'
    else:
        return None
    return {'file': Path(path).name, 'text': text, 'pauseMs': pause, 'lastMs': length, 'reason': reason}


p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
p.add_argument('--manifest', help='JSON list of {file, text}')
p.add_argument('wav', nargs='+')
args = p.parse_args()
texts = {}
if args.manifest:
    texts = {Path(x['file']).stem: x['text'] for x in json.loads(Path(args.manifest).read_text())}
for name in args.wav:
    found = tail(name, texts.get(Path(name).stem) if args.manifest else None)
    if found:
        print(json.dumps(found, ensure_ascii=False))

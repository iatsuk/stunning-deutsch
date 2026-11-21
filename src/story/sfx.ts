// Звуки игры: короткие щелчки и звоны, синтезированные в браузере, без файлов в репозитории. Они звучат,
// только пока включена озвучка сцен: кто выключил голос, тот хочет тишины.

/** Настройка озвучки сцен: реплики звучат сами, а с ними и звуки игры. */
export const VOICE_KEY = "sd-moin-voice";
export function voiceOn() {
  try {
    return localStorage.getItem(VOICE_KEY) !== "off";
  } catch {
    return true;
  }
}

/** Звуки тише записей: они сопровождают ход, а не перебивают реплику. */
const LOUDNESS = 0.12;
let context: AudioContext | null = null;

type Tone = { freq: number; to?: number; length: number; type?: OscillatorType; volume?: number };
type Noise = { freq: number; length: number; q?: number; volume?: number };

/** Тон с быстрой атакой и затуханием; частота может скользить к `to`. */
function tone(ctx: AudioContext, at: number, { freq, to, length, type = "sine", volume = 1 }: Tone) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, at + length);
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(LOUDNESS * volume, at + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length);
  osc.connect(gain).connect(ctx.destination);
  osc.start(at);
  osc.stop(at + length + 0.02);
}

/** Шум через полосовой фильтр: шелест бумаги, удар штампа. */
function noise(ctx: AudioContext, at: number, { freq, length, q = 1, volume = 1 }: Noise) {
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * length), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = q;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(LOUDNESS * volume, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length);
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start(at);
}

const SOUNDS = {
  /** Диск словесного замка встал на следующее слово. */
  click: (c: AudioContext, t: number) => tone(c, t, { freq: 1800, to: 900, length: 0.03, type: "square", volume: 0.35 }),
  /** Монета легла на сдачу. */
  coin: (c: AudioContext, t: number) => {
    tone(c, t, { freq: 2100, length: 0.12 });
    tone(c, t + 0.05, { freq: 2800, length: 0.16, volume: 0.7 });
  },
  /** Штамп «верно» или «неверно». */
  stamp: (c: AudioContext, t: number) => {
    tone(c, t, { freq: 140, to: 50, length: 0.15, volume: 1.4 });
    noise(c, t, { freq: 600, length: 0.08, volume: 0.8 });
  },
  /** Кнопка телефона или кодового замка. */
  key: (c: AudioContext, t: number) => tone(c, t, { freq: 940, length: 0.09, volume: 0.6 }),
  /** Лифт приехал на нужный этаж. */
  ding: (c: AudioContext, t: number) => {
    tone(c, t, { freq: 1320, length: 0.6, volume: 0.8 });
    tone(c, t + 0.18, { freq: 990, length: 0.9, volume: 0.8 });
  },
  /** Новая улика или предмет в блокноте. */
  rustle: (c: AudioContext, t: number) => noise(c, t, { freq: 3200, length: 0.25, q: 0.7, volume: 0.6 }),
  /** Чайка урвала слово. */
  gull: (c: AudioContext, t: number) => {
    tone(c, t, { freq: 1500, to: 900, length: 0.22, type: "triangle", volume: 0.7 });
    tone(c, t + 0.26, { freq: 1400, to: 850, length: 0.3, type: "triangle", volume: 0.6 });
  },
};

export type Sound = keyof typeof SOUNDS;

/** Сыграть звук игры. Контекст создаётся при первом звуке: браузер разрешает звук только после действия игрока. */
export function sound(name: Sound) {
  if (!voiceOn() || typeof AudioContext === "undefined") return;
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();
  SOUNDS[name](context, context.currentTime);
}

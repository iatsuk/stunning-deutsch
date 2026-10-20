// Числа и время по-немецки. Модуль без зависимостей: его импортирует и
// сборка контента (Node умеет запускать .ts без компиляции), и страница.

const ONES = [
  "null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun",
  "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn",
];
const TENS = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];

/** Число словами, 0 … 999 999. Единицы идут перед десятками: 21 — einundzwanzig. */
export function zahl(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 999_999) throw new RangeError(`zahl: ${n}`);
  if (n < 20) return ONES[n];
  if (n < 100) {
    const ten = Math.floor(n / 10);
    const one = n % 10;
    return one ? `${one === 1 ? "ein" : ONES[one]}und${TENS[ten]}` : TENS[ten];
  }
  if (n < 1000) {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    return `${hundred === 1 ? "ein" : ONES[hundred]}hundert${rest ? zahl(rest) : ""}`;
  }
  const thousand = Math.floor(n / 1000);
  const rest = n % 1000;
  return `${thousand === 1 ? "ein" : zahl(thousand)}tausend${rest ? zahl(rest) : ""}`;
}

export type Uhrzeit = {
  time: string;
  hours: number;
  minutes: number;
  /** Официально: по радио, на вокзале, в расписании — 24 часа. */
  formal: string;
  /** В разговоре: 12 часов, halb, Viertel. */
  informal: string;
};

/** "15:45" → { formal: "fünfzehn Uhr fünfundvierzig", informal: "Viertel vor vier" } */
export function uhrzeit(time: string): Uhrzeit {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) throw new Error(`uhrzeit: ожидается ЧЧ:ММ, получено «${time}»`);
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) throw new Error(`uhrzeit: нет такого времени «${time}»`);

  const hourWord = hours === 1 ? "ein" : zahl(hours);
  const formal = minutes ? `${hourWord} Uhr ${zahl(minutes)}` : `${hourWord} Uhr`;

  const twelve = (h: number) => {
    const v = h % 12;
    return v === 0 ? "zwölf" : zahl(v);
  };
  const now = twelve(hours);
  const next = twelve(hours + 1);
  const m = minutes;
  const informal =
    m === 0 ? now
    : m === 15 ? `Viertel nach ${now}`
    : m === 30 ? `halb ${next}`
    : m === 45 ? `Viertel vor ${next}`
    : m < 25 ? `${zahl(m)} nach ${now}`
    : m < 30 ? `${zahl(30 - m)} vor halb ${next}`
    : m <= 35 ? `${zahl(m - 30)} nach halb ${next}`
    : `${zahl(60 - m)} vor ${next}`;

  return { time: `${String(hours).padStart(2, "0")}:${match[2]}`, hours, minutes, formal, informal };
}

export type Gender = "m" | "f" | "n" | "pl";

export const ARTICLE: Record<Gender, string> = { m: "der", f: "die", n: "das", pl: "die" };

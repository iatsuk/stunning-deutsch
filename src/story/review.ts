import { pairs } from "./build.ts";
import { phrases } from "./data.ts";
import { reviewTwenty } from "./twenty.ts";
import { challengeWords, lockKey } from "./logic.ts";
import { dueWords, lockCard, type Cards, type Interval } from "./memory.ts";
import { flatNodes } from "./scene.ts";
import type { Beat, Challenge, LockRound, SceneNode } from "./types.ts";
import { PERSONS, VERBS } from "./verbs.ts";

// Повторение новой версии Moin (A1-PLAN.md, «Повторение»). Очередь — коробки Лейтнера из
// классической игры, но часы считают сцены, а не шаги: сцена в несколько раз длиннее шага.
// Раунд — три короткие игры разных механик; механику выбирают тип единицы и её прочность.

export const SCENE_INTERVALS: Interval[] = [
  { steps: 2, days: 1 },
  { steps: 6, days: 2 },
  { steps: 14, days: 4 },
  { steps: Infinity, days: 8 },
  { steps: Infinity, days: 16 },
  { steps: Infinity, days: 32 },
];
/** Меньше единиц к повторению — раунд перед сценой не открываем. */
export const MIN_DUE = 4;
/** Столько раундов в разминке за новый день. */
export const WELCOME_ROUNDS = 3;
const GAMES_PER_ROUND = 3;

export type Entry = { ru: string; audio?: string; pl?: string };
export type Lookup = (de: string) => Entry | undefined;
export type Line = { who: string; voice: string; de: string; ru: string; learn: string[] };
export type LockUnit = { round: LockRound; rules: string[] };
export type CompoundUnit = { parts: string[]; ru: string };
export type Sources = { lines: Record<string, Line>; locks: Record<string, LockUnit>; compounds: Record<string, CompoundUnit> };

const ARTICLE = /^(der|die|das) /;
const PLURAL_ONLY = new Set(["die Eltern", "die Geschwister", "die Großeltern", "die Möbel", "die Nebenkosten", "die Ferien", "die USA", "die Leute", "die Pommes frites"]);
const isNoun = (w: string) => ARTICLE.test(w) && !PLURAL_ONLY.has(w);

/** Реплика в памяти: голос и текст, как у записи. Приставка не даёт ей совпасть со словом. */
export const LINE = "line:";
export const lineCard = (voice: string, de: string) => `${LINE}${voice}|${de}`;

const nodesOf = (beat: Beat): SceneNode[] =>
  beat.challenge.kind === "play" ? flatNodes(beat.challenge.nodes) : [];

/** Реплики со словами, фразы замков и сложные слова всех сцен: повторение берёт из них текст, голос и правило. */
export function reviewSources(beats: Beat[]): Sources {
  const lines: Record<string, Line> = {};
  const locks: Record<string, LockUnit> = {};
  const compounds: Record<string, CompoundUnit> = {};
  for (const beat of beats)
    for (const n of nodesOf(beat)) {
      if (n.t === "say" && n.learn?.length)
        lines[lineCard(n.voice, n.de)] = { who: n.who, voice: n.voice, de: n.de, ru: n.ru, learn: n.learn };
      if (n.t === "game" && n.c.kind === "lock")
        for (const round of n.c.rounds) locks[lockCard(round)] = { round, rules: n.rule ?? [] };
      if (n.t === "game" && (n.c.kind === "compound" || n.c.kind === "tail"))
        for (const round of n.c.rounds) if (isNoun(round.word)) compounds[round.word] = { parts: round.parts, ru: round.ru };
    }
  return { lines, locks, compounds };
}

/**
 * Что пройденная сцена отдаёт в повторение: слова, которые она вводит репликами, называет в рассказе,
 * показывает при осмотре и тренирует в играх (только с переводом и записью), реплики, которые их
 * вводят, и фразы замков вместе с правилом.
 */
export function sceneUnits(beat: Beat, lookup: Lookup): string[] {
  const units: string[] = [];
  const word = (w: string) => lookup(w) && units.push(w);
  for (const n of nodesOf(beat)) {
    if (n.t === "narr") for (const [, id] of n.text.matchAll(/\{([\w-]+)\}/g)) if (phrases[id]) word(phrases[id].de);
    if (n.t === "say" && n.learn?.length) {
      n.learn.forEach(word);
      units.push(lineCard(n.voice, n.de));
    }
    if (n.t === "look") n.items.forEach((i) => word(i.de));
    if (n.t === "item") word(n.de);
    if (n.t === "game") {
      challengeWords(n.c).forEach(word);
      if (n.c.kind === "lock") units.push(...n.c.rounds.map(lockCard));
    }
  }
  return [...new Set(units)];
}

export const dueUnits = (cards: Cards, step: number, day: number) => dueWords(cards, step, day, SCENE_INTERVALS);

// ——— Механики ———

export type Mech = "bingo" | "gull" | "docks" | "letters" | "gullword" | "write" | "pairs" | "lock" | "plural" | "tail" | "cloze" | "who" | "mistake" | "verbs" | "perfekt" | "crossword" | "twenty";
export type PluralItem = { unit: string; de: string; options: string[]; answer: string };
export type ClozeItem = { unit: string; line: Line; before: string; after: string; answer: string; options: string[] };
export type WhoItem = { unit: string; line: Line; options: string[]; answer: string };
export type MistakeItem = { unit: string; ru: string; chunks: string[]; wrong: number; right: string; rules: string[] };
/** Форма глагола: лицо, варианты, верный; ru — перевод глагола. */
export type VerbItem = { unit: string; verb: string; ru: string; prompt: string; options: string[]; answer: string };
export type CrossWord = { unit: string; word: string; clue: string; x: number; y: number; down: boolean; n: number };
export type Crossword = { width: number; height: number; words: CrossWord[] };
export type Game =
  | { mech: "bingo" | "gull" | "docks" | "letters" | "gullword" | "write" | "pairs" | "lock" | "tail" | "twenty"; units: string[]; challenge: Challenge; rules?: Record<string, string[]> }
  | { mech: "plural"; units: string[]; items: PluralItem[] }
  | { mech: "cloze"; units: string[]; items: ClozeItem[] }
  | { mech: "who"; units: string[]; items: WhoItem[] }
  | { mech: "mistake"; units: string[]; items: MistakeItem[] }
  | { mech: "verbs" | "perfekt"; units: string[]; items: VerbItem[] }
  | { mech: "crossword"; units: string[]; grid: Crossword };
export type Review = { games: Game[] };

export const MECHS: Mech[] = ["bingo", "who", "pairs", "docks", "gull", "plural", "tail", "verbs", "cloze", "mistake", "perfekt", "lock", "crossword", "letters", "gullword", "write", "twenty"];
/**
 * Узнать и выбрать можно сразу после встречи; собрать по буквам — после первого верного повтора,
 * написать по памяти — после второго. Остальные механики подходят единице любой прочности.
 */
const MIN_BOX: Partial<Record<Mech, number>> = { letters: 1, gullword: 1, write: 2, crossword: 1 };
/** С какой главы механика уместна: Perfekt вводит урок 11; «Охота на хвост» — с главы 5; «20 вопросов» — с 8. */
const MIN_CHAPTER: Partial<Record<Mech, number>> = { tail: 5, perfekt: 11, twenty: 8 };

const bare = (w: string) => w.replace(ARTICLE, "");
const spellable = (w: string) => /^\p{L}+$/u.test(bare(w)) && bare(w).length <= 10;
const typable = (w: string) => /^[\p{L} '-]+[.!?]?$/u.test(w);
/** «Привет!» и «Привет! Здравствуйте!» — одно значение: в одной игре их не различить. */
const meaning = (ru: string) => ru.split(/[;,/!?(]/)[0].trim().toLowerCase();

/** Детерминированная перетасовка: тот же раунд при перезагрузке страницы. */
function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}
export function shuffle<T>(list: T[], seed: string): T[] {
  let state = hash(seed) || 1;
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    state = Math.imul(state ^ (state >>> 15), 2246822519) >>> 0;
    const j = state % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const UML: Record<string, string> = { a: "ä", o: "ö", u: "ü", au: "äu" };
/**
 * Неверные формы множественного — те, что правдоподобны для такого окончания слова: у слов на -e
 * ошибаются с -n и -s, у слов на -el, -er, -en, -chen — с умлаутом и -s, у остальных — с -e, -er,
 * -en, -s и умлаутом. Верная форма в ловушки не попадает.
 */
export function pluralTraps(singular: string, plural: string): string[] {
  const s = bare(singular);
  const m = s.match(/(au|[aou])(?=[^aou]*$)/);
  const umlaut = m ? s.slice(0, m.index) + UML[m[1]] + s.slice(m.index! + m[1].length) : s;
  const n = s.endsWith("n") ? [] : [`${s}n`, `${umlaut}n`];
  const plusS = /[sßxz]$/.test(s) ? [] : [`${s}s`];
  const options = /e$/.test(s)
    ? [s, ...plusS, ...n]
    : /(el|er|en|chen|lein)$/.test(s)
      ? [s, ...plusS, umlaut, ...n]
      : [`${s}e`, `${s}en`, `${s}er`, ...plusS, `${umlaut}e`, `${umlaut}er`, s];
  return [...new Set(options)].filter((x) => x.toLowerCase() !== plural.toLowerCase());
}

/** Слово реплики на месте пропуска: форма из реплики, если слово в ней стоит без изменений. */
function blank(line: Line): { answer: string; before: string; after: string; noun: boolean } | null {
  for (const learn of line.learn) {
    const target = bare(learn).replace(/[!?.,…]/g, "").trim();
    if (!target || target.includes(" ")) continue;
    const at = line.de.search(new RegExp(`(?<![\\p{L}])${target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}])`, "iu"));
    if (at < 0) continue;
    return { answer: line.de.slice(at, at + target.length), before: line.de.slice(0, at), after: line.de.slice(at + target.length), noun: ARTICLE.test(learn) };
  }
  return null;
}

export type Context = {
  lookup: Lookup;
  sources: Sources;
  /** Все слова с переводом: синонимы для записи и подставные слова для пропусков. */
  words: string[];
  seed: string;
  /** Механики прошлого раунда: подряд одна и та же не идёт. */
  recent?: Mech[];
  /** Единицы, которые раунд берёт после просроченных: перед главой — прошлая глава. */
  focus?: string[];
  /** Глава, перед которой или в которой идёт повторение: открывает механики по урокам. */
  chapter?: number;
};

type Built = { game: Game; used: string[] } | null;

function build(mech: Mech, pool: string[], cards: Cards, ctx: Context): Built {
  const { lookup, sources, seed } = ctx;
  if ((ctx.chapter ?? 12) < (MIN_CHAPTER[mech] ?? 0)) return null;
  const firm = MIN_BOX[mech] ?? 0;
  const words = pool.filter((u) => lookup(u) && (cards[u]?.box ?? 0) >= firm);
  const lines = pool.filter((u) => sources.lines[u]);
  const locks = pool.filter((u) => sources.locks[u]);
  const distinct = (list: string[]) => {
    const seen = new Set<string>();
    return list.filter((w) => {
      const key = meaning(lookup(w)!.ru);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };
  const simple = (kind: "bingo" | "gull" | "docks" | "letters", list: string[], min: number, max: number): Built => {
    const take = list.slice(0, max);
    return take.length >= min ? { game: { mech: kind, units: take, challenge: { kind, words: take } }, used: take } : null;
  };
  switch (mech) {
    case "bingo":
      return simple("bingo", words, 4, 9);
    case "gull":
      return simple("gull", distinct(words), 4, 8);
    case "docks":
      return simple("docks", words.filter(isNoun), 4, 8);
    case "letters":
      return simple("letters", words.filter(spellable), 3, 4);
    case "gullword": {
      const take = words.filter((w) => /^[A-Za-zÄÖÜäöüß]{4,7}$/.test(bare(w))).slice(0, 4);
      return take.length >= 3 ? { game: { mech, units: take, challenge: { kind: "gullword", words: take } }, used: take } : null;
    }
    case "tail": {
      const take = words.filter((w) => Boolean(sources.compounds[w])).slice(0, 3);
      if (take.length < 2) return null;
      return {
        game: { mech, units: take, challenge: { kind: "tail", rounds: take.map((w) => ({ word: w, ...sources.compounds[w] })) } },
        used: take,
      };
    }
    case "write": {
      const take = distinct(words.filter(typable)).slice(0, 5);
      if (take.length < 3) return null;
      const fields = take.map((w, i) => ({
        id: `f${i}`,
        label: lookup(w)!.ru,
        // Синоним тоже верный ответ: подпись его не исключает.
        answers: [w, ...ctx.words.filter((o) => o !== w && lookup(o) && meaning(lookup(o)!.ru) === meaning(lookup(w)!.ru))],
      }));
      return { game: { mech, units: take, challenge: { kind: "write", title: "Память", fields } }, used: take };
    }
    case "pairs": {
      const take = distinct(words).slice(0, 5);
      if (take.length < 4) return null;
      return { game: { mech, units: take, challenge: pairs(take.map((w) => [w, lookup(w)!.ru])) }, used: take };
    }
    case "lock": {
      const take = locks.slice(0, 3);
      if (take.length < 2) return null;
      return {
        game: { mech, units: take, challenge: { kind: "lock", rounds: take.map((u) => sources.locks[u].round) }, rules: Object.fromEntries(take.map((u) => [u, sources.locks[u].rules])) },
        used: take,
      };
    }
    case "plural": {
      const take = words.filter((w) => isNoun(w) && lookup(w)!.pl && pluralTraps(w, lookup(w)!.pl!).length >= 2).slice(0, 4);
      if (take.length < 3) return null;
      const items = take.map((w) => {
        const pl = lookup(w)!.pl!;
        const traps = shuffle(pluralTraps(w, pl), `${seed}-${w}`).slice(0, 2);
        return { unit: w, de: w, answer: `die ${pl}`, options: shuffle([pl, ...traps].map((x) => `die ${x}`), `${seed}-o-${w}`) };
      });
      return { game: { mech, units: take, items }, used: take };
    }
    case "cloze": {
      // Подставные слова того же рода речи: на место существительного — существительные.
      const others = Object.values(sources.lines).map(blank).filter((b) => b) as { answer: string; noun: boolean }[];
      const items: ClozeItem[] = [];
      for (const unit of lines) {
        const line = sources.lines[unit];
        const b = blank(line);
        if (!b) continue;
        const capital = /^\p{Lu}/u.test(b.answer);
        const fit = (o: string) => (capital ? o[0].toUpperCase() + o.slice(1) : o[0].toLowerCase() + o.slice(1));
        const traps = shuffle(
          [...new Set(others.filter((o) => o.noun === b.noun && o.answer.toLowerCase() !== b.answer.toLowerCase()).map((o) => (b.noun ? o.answer : fit(o.answer))))],
          `${seed}-${unit}`,
        ).slice(0, 2);
        if (traps.length < 2) continue;
        const { noun, ...rest } = b;
        items.push({ unit, line, ...rest, options: shuffle([b.answer, ...traps], `${seed}-o-${unit}`) });
        if (items.length === 3) break;
      }
      return items.length >= 2 ? { game: { mech, units: items.map((i) => i.unit), items }, used: items.map((i) => i.unit) } : null;
    }
    case "who": {
      const speakers = [...new Set(Object.values(sources.lines).map((l) => l.who))];
      const items: WhoItem[] = lines.slice(0, 3).map((unit) => {
        const line = sources.lines[unit];
        const traps = shuffle(speakers.filter((s) => s !== line.who), `${seed}-${unit}`).slice(0, 2);
        return { unit, line, answer: line.who, options: shuffle([line.who, ...traps], `${seed}-o-${unit}`) };
      });
      return items.length >= 2 && speakers.length >= 3 ? { game: { mech, units: items.map((i) => i.unit), items }, used: items.map((i) => i.unit) } : null;
    }
    case "verbs": {
      const take = words.filter((w) => VERBS[w]).slice(0, 4);
      if (take.length < 3) return null;
      const label = ["ich", "du", "er / sie", "wir", "ihr", "sie / Sie"];
      const items = take.map((w, i) => {
        const forms = VERBS[w].forms;
        const person = hash(`${seed}-${w}`) % PERSONS.length;
        const answer = forms[person];
        const traps = shuffle([...new Set(forms)].filter((f) => f !== answer), `${seed}-t-${w}`).slice(0, 2);
        return { unit: w, verb: w, ru: lookup(w)!.ru, prompt: `${label[person]} ___`, answer, options: shuffle([answer, ...traps], `${seed}-o-${i}-${w}`) };
      });
      return items.every((i) => i.options.length === 3) ? { game: { mech, units: take, items }, used: take } : null;
    }
    case "perfekt": {
      const take = words.filter((w) => VERBS[w]?.perfekt).slice(0, 4);
      if (take.length < 3) return null;
      const items = take.map((w, i) => {
        const answer = VERBS[w].perfekt!;
        const [aux, pp] = answer.split(" ");
        const otherAux = aux === "hat" ? "ist" : "hat";
        const badPp = pp.endsWith("en") ? `${pp.slice(0, -2)}t` : pp.replace(/e?t$/, "en");
        return { unit: w, verb: w, ru: lookup(w)!.ru, prompt: `Gestern … (${w}): er ___`, answer, options: shuffle([answer, `${otherAux} ${pp}`, `${aux} ${badPp}`], `${seed}-o-${i}-${w}`) };
      });
      return { game: { mech, units: take, items }, used: take };
    }
    case "crossword": {
      const grid = crossword(
        words.filter((w) => isNoun(w) && /^[A-ZÄÖÜ][a-zäöü]{2,7}$/.test(bare(w))).map((w) => ({ unit: w, word: bare(w).toUpperCase(), clue: lookup(w)!.ru })),
        seed,
      );
      return grid && grid.words.length >= 3 ? { game: { mech, units: grid.words.map((w) => w.unit), grid }, used: grid.words.map((w) => w.unit) } : null;
    }
    case "twenty": {
      // Элиф на скамейке загадывает слово из очереди: хобби или вещь, у которых описаны признаки.
      const challenge = reviewTwenty(pool, (u) => Boolean(cards[u]));
      if (!challenge) return null;
      const used = challenge.cards.flatMap((card) => (card.unit && pool.includes(card.unit) ? [card.unit] : []));
      return { game: { mech, units: used, challenge }, used };
    }
    case "mistake": {
      const items: MistakeItem[] = [];
      for (const unit of locks) {
        const { round, rules } = sources.locks[unit];
        const reels = round.reels.map((reel, i) => reel.filter((x) => x !== round.answer[i]));
        const choices = reels.map((r, i) => (r.length ? i : -1)).filter((i) => i >= 0);
        if (!choices.length) continue;
        const wrong = shuffle(choices, `${seed}-${unit}`)[0];
        const chunks = [...round.answer];
        chunks[wrong] = shuffle(reels[wrong], `${seed}-w-${unit}`)[0];
        items.push({ unit, ru: round.ru, chunks, wrong, right: round.answer[wrong], rules });
        if (items.length === 3) break;
      }
      return items.length >= 2 ? { game: { mech, units: items.map((i) => i.unit), items }, used: items.map((i) => i.unit) } : null;
    }
  }
}

/**
 * Мини-кроссворд: до четырёх слов, каждое следующее пересекает уже стоящее по общей букве. Слова не
 * касаются друг друга боками, поэтому клетки читаются однозначно.
 */
export function crossword(list: { unit: string; word: string; clue: string }[], seed: string): Crossword | null {
  const cells = new Map<string, string>();
  const placed: CrossWord[] = [];
  const at = (x: number, y: number) => cells.get(`${x},${y}`);
  const fits = (word: string, x: number, y: number, down: boolean) => {
    const dx = down ? 0 : 1, dy = down ? 1 : 0;
    if (at(x - dx, y - dy) || at(x + dx * word.length, y + dy * word.length)) return false;
    let crossings = 0;
    for (let i = 0; i < word.length; i++) {
      const cx = x + dx * i, cy = y + dy * i;
      const here = at(cx, cy);
      if (here) {
        if (here !== word[i]) return false;
        crossings++;
        continue;
      }
      // Пустая клетка не должна прилегать к чужому слову сбоку.
      if (at(cx + dy, cy + dx) || at(cx - dy, cy - dx)) return false;
    }
    return crossings === 1;
  };
  const put = (w: { unit: string; word: string; clue: string }, x: number, y: number, down: boolean) => {
    for (let i = 0; i < w.word.length; i++) cells.set(`${x + (down ? 0 : i)},${y + (down ? i : 0)}`, w.word[i]);
    placed.push({ ...w, x, y, down, n: 0 });
  };
  const pool = shuffle(list, seed).sort((a, b) => b.word.length - a.word.length);
  for (const w of pool) {
    if (placed.length === 4) break;
    if (!placed.length) {
      put(w, 0, 0, false);
      continue;
    }
    let done = false;
    for (const p of placed) {
      for (let i = 0; i < p.word.length && !done; i++)
        for (let j = 0; j < w.word.length && !done; j++) {
          if (p.word[i] !== w.word[j]) continue;
          const down = !p.down;
          const x = down ? p.x + i : p.x - j;
          const y = down ? p.y - j : p.y + i;
          if (fits(w.word, x, y, down)) {
            put(w, x, y, down);
            done = true;
          }
        }
      if (done) break;
    }
  }
  if (placed.length < 3) return null;
  const minX = Math.min(...placed.map((p) => p.x)), minY = Math.min(...placed.map((p) => p.y));
  const words = placed
    .map((p) => ({ ...p, x: p.x - minX, y: p.y - minY }))
    .sort((a, b) => a.y - b.y || a.x - b.x)
    .map((p, i) => ({ ...p, n: i + 1 }));
  return {
    width: Math.max(...words.map((p) => p.x + (p.down ? 1 : p.word.length))),
    height: Math.max(...words.map((p) => p.y + (p.down ? p.word.length : 1))),
    words,
  };
}

/** Игра раунда перед главой: механика и её слова (src/story/scenes/warmups.ts). */
export type Warmup = { mech: "bingo" | "gull" | "docks" | "letters" | "pairs"; words: string[] };

/**
 * Раунд перед главой одинаков для всех игроков: его слова выбраны заранее, чтобы вернуть слова прошлых
 * глав, и индекс полноты считает эти игры частью главы. Слово без перевода и записи пропускается.
 */
export function warmupReview(warmups: Warmup[], lookup: Lookup): Review | null {
  const games: Game[] = [];
  for (const { mech, words } of warmups) {
    const take = words.filter((w) => lookup(w));
    if (!take.length) continue;
    games.push(
      mech === "pairs"
        ? { mech, units: take, challenge: pairs(take.map((w) => [w, lookup(w)!.ru])) }
        : { mech, units: take, challenge: { kind: mech, words: take } },
    );
  }
  return games.length ? { games } : null;
}

/**
 * Раунд из трёх игр разных механик. Начало ряда механик сдвигается от раунда к раунду, механики
 * прошлого раунда идут последними, а трудные механики берут только окрепшие единицы. Каждая
 * единица попадает в раунд один раз.
 */
/** Механики по кругу с места, которое задаёт seed: у разных раундов разное начало. */
function rotated(seed: string): Mech[] {
  const start = hash(seed) % MECHS.length;
  return [...MECHS.slice(start), ...MECHS.slice(0, start)];
}

export function buildReview(cards: Cards, step: number, day: number, ctx: Context): Review | null {
  const due = dueUnits(cards, step, day);
  const focus = (ctx.focus ?? []).filter((u) => !due.includes(u) && cards[u]);
  let pool = [...due, ...focus].filter((u) => ctx.lookup(u) || ctx.sources.lines[u] || ctx.sources.locks[u]);
  if (!pool.length) return null;
  const order = rotated(ctx.seed);
  const recent = new Set(ctx.recent ?? []);
  const ranked = [...order.filter((m) => !recent.has(m)), ...order.filter((m) => recent.has(m))];
  const games: Game[] = [];
  for (const mech of ranked) {
    if (games.length === GAMES_PER_ROUND) break;
    const built = build(mech, pool, cards, ctx);
    if (!built) continue;
    games.push(built.game);
    pool = pool.filter((u) => !built.used.includes(u));
  }
  return games.length ? { games } : null;
}

/**
 * Раунд тренировки (A1-PLAN.md, «Тренировка»): до трёх игр одной механики на встреченных единицах.
 * Единицы уникальны, перемешаны по seed и между играми не повторяются: иначе grade() поднял бы одну
 * единицу на несколько коробок за раунд.
 */
export function practiceReview(mech: Mech, units: string[], cards: Cards, ctx: Context): Review | null {
  let pool = shuffle([...new Set(units)].filter((u) => cards[u] && (ctx.lookup(u) || ctx.sources.lines[u] || ctx.sources.locks[u])), ctx.seed);
  const games: Game[] = [];
  for (let i = 0; i < GAMES_PER_ROUND; i++) {
    const built = build(mech, pool, cards, ctx);
    if (!built) break;
    games.push(built.game);
    pool = pool.filter((u) => !built.used.includes(u));
  }
  return games.length ? { games } : null;
}

/** Текст единицы для списков: у реплики и фразы замка ключ служебный, текст и перевод берём из источника. */
export function unitText(unit: string, sources: Sources, lookup: Lookup) {
  const line = sources.lines[unit];
  if (line) return { de: line.de, ru: line.ru };
  const lock = sources.locks[unit];
  if (lock) return { de: lockKey(lock.round), ru: lock.round.ru };
  return { de: unit, ru: lookup(unit)?.ru ?? "" };
}

/** Сколько упрямых слов показывает курс. */
const STUBBORN = 5;

/**
 * Упрямые слова: не вспомнились хотя бы дважды и всё ещё лежат в нижних коробках. Окрепнув, слово уходит
 * из списка; новая ошибка вернёт его в начало и в список. Первыми — с большим числом ошибок.
 */
export function stubbornUnits(cards: Cards): string[] {
  return Object.keys(cards)
    .filter((u) => (cards[u].miss ?? 0) >= 2 && cards[u].box <= 1)
    .sort((a, b) => cards[b].miss! - cards[a].miss! || cards[a].box - cards[b].box)
    .slice(0, STUBBORN);
}

/**
 * Минута на упрямые слова: до трёх игр разных механик на одних и тех же единицах. Пять единиц в нижней
 * коробке без повторов дали бы одну игру. Повторы безопасны: раунд оценивается как тренировка, по ошибкам.
 */
export function stubbornReview(units: string[], cards: Cards, ctx: Context): Review | null {
  const pool = units.filter((u) => cards[u] && (ctx.lookup(u) || ctx.sources.lines[u] || ctx.sources.locks[u]));
  const games: Game[] = [];
  for (const mech of rotated(ctx.seed)) {
    if (games.length === GAMES_PER_ROUND) break;
    const built = build(mech, pool, cards, ctx);
    if (built) games.push(built.game);
  }
  return games.length ? { games } : null;
}

/** Механики, из которых тренировка с этим seed соберёт хотя бы одну игру. */
export function practiceMechs(units: string[], cards: Cards, ctx: Context): Mech[] {
  return MECHS.filter((m) => practiceReview(m, units, cards, ctx));
}

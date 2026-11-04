// Оракул автора сюжета: бросает кости по таблицам из A1-STORYCRAFT.md и предлагает поворот.
// Предмет берётся из словаря урока главы, поэтому поворот сам вводит в сюжет слова урока.
// Результат — заготовка для автора, а не готовый текст: его ещё нужно увязать с сюжетом.
//
//   node scripts/story-oracle.mjs --chapter 5 [--rolls 2] [--seed 1793800000]
//
// По умолчанию seed — Unix-время в секундах: так каждый бросок уникален (правило автора).
// Несколько бросков подряд делайте одним запуском с --rolls, иначе в одну секунду seed совпадёт.
// Seed записывается в журнал бросков, чтобы бросок можно было повторить.

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : fallback;
};
const chapter = Number(arg("chapter", "1"));
const rolls = Number(arg("rolls", "1"));
const seed = Number(arg("seed", String(Math.floor(Date.now() / 1000))));

// Детерминированный генератор (mulberry32): тот же seed — те же броски.
let state = seed >>> 0;
const random = () => {
  state = (state + 0x6d2b79f5) >>> 0;
  let t = state;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const die = (sides) => 1 + Math.floor(random() * sides);
const pick = (list) => list[die(list.length) - 1];

/** Фокус события: что именно случается (по мотивам Mythic GME). */
const FOCUS = [
  "Событие за кадром: что-то случилось, игрок узнаёт об этом позже",
  "Второстепенный герой действует по своей черте",
  "Появляется новый человек",
  "Шаг к разгадке: честная улика",
  "Шаг от разгадки: ложный след",
  "Неприятность для игрока: потеря, путаница, задержка",
  "Подарок игроку: помощь, предмет, подсказка",
  "Двусмысленность: фразу урока можно понять двумя способами",
  "Сквозная шутка обостряется",
  "Глобальное событие сдвигается: тикают часы",
  "Нить закрывается раньше срока",
  "Смена точки зрения: интерлюдия от лица другого героя",
];
/** Действие поворота. */
const VERB = [
  "потерять", "найти", "перепутать", "спрятать", "обменять", "сломать", "починить", "опоздать",
  "подслушать", "неверно перевести", "унести", "вернуть", "подарить", "забыть", "пообещать",
  "отказаться", "прийти не туда", "заблудиться", "промокнуть", "отпраздновать",
];
/** Кто запускает поворот: ансамбль второстепенных героев и маскот. */
const WHO = ["чайка", "Нильс", "Фрауке", "Хауке", "Матео", "Элиф", "Дана", "Йенсен", "Петерсен", "Грета"];
/** Сила поворота на d20, как в настольных играх: от обратного эффекта до гиперболы. */
const power = (n) =>
  n === 1
    ? "1 — обратный эффект: выходит наоборот"
    : n <= 5
      ? `${n} — почти ничего: поворот срывается или мелочь`
      : n <= 14
        ? `${n} — как задумано`
        : n <= 19
          ? `${n} — сильнее, чем ожидали`
          : "20 — гипербола: в деле весь клуб";

/** Существительные урока главы: предмет поворота. */
function lessonNouns(n) {
  const file = readdirSync(path.join(root, "content/a1")).find((f) => f.startsWith(String(n).padStart(2, "0")));
  const topic = parse(readFileSync(path.join(root, "content/a1", file), "utf8"));
  return Object.values(topic.words)
    .flatMap((group) => group.items.map((w) => w.de))
    .filter((de) => /^(der|die|das) /.test(de));
}

const nouns = lessonNouns(chapter);
console.log(`Глава ${chapter} · seed ${seed}`);
for (let i = 1; i <= rolls; i++) {
  console.log(
    [
      `\nБросок ${i}`,
      `  Фокус (d${FOCUS.length}): ${pick(FOCUS)}`,
      `  Кто (d${WHO.length}): ${pick(WHO)}`,
      `  Действие (d${VERB.length}): ${pick(VERB)}`,
      `  Предмет из урока (d${nouns.length}): ${pick(nouns)}`,
      `  Сила (d20): ${power(die(20))}`,
    ].join("\n"),
  );
}

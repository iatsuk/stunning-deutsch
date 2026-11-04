import type { Beat, Challenge, ChatTurn, OralRound, VoiceLine } from "./types.ts";

// Сборка шагов истории. Главы нового сюжета (A1-PLOT.md) лежат в chapters/ и пишутся целиком,
// по порядку шагов; эти помощники общие для них и для словесных шагов extra.ts.

export const choice = (answer: string, options: [string, string, string][]): Challenge => ({
  kind: "choice",
  answer,
  options: options.map(([id, text, why]) => ({ id, text, why })),
});
export const order = (answer: string[], tiles: string[], also?: string[][]): Challenge => ({
  kind: "order",
  answer,
  tiles,
  ...(also ? { also } : {}),
});
export const verdict = (labels: [string, string], items: [string, boolean, string][]): Challenge => ({
  kind: "verdict",
  labels,
  items: items.map(([text, answer, why], i) => ({ id: String(i), text, answer, why })),
});
export const turn = (say: string, ru: string, answer: string, options: [string, string, string][]): ChatTurn => ({
  say,
  ru,
  answer,
  options: options.map(([id, text, why]) => ({ id, text, why })),
});
export const chat = (who: string, voice: string, turns: ChatTurn[]): Challenge => ({ kind: "chat", who, voice, turns });
export const line = (who: string, voice: string, text: string, ru: string): VoiceLine => ({ who, voice, text, ru });

/** Пары: левая колонка и правая по порядку соответствуют друг другу, при показе перемешиваются. */
export const pairs = (rows: [string, string][]): Challenge => ({
  kind: "match",
  left: rows.map(([l], i) => ({ id: `l${i}`, text: l })),
  right: rows.map(([, r], i) => ({ id: `r${i}`, text: r })),
  answer: Object.fromEntries(rows.map((_, i) => [`l${i}`, `r${i}`])),
});
export const bingo = (words: string[]): Challenge => ({ kind: "bingo", words });
export const scene = (items: [string, string][]): Challenge => ({
  kind: "scene",
  items: items.map(([word, icon]) => ({ word, icon })),
});
export const odd = (rounds: [string[], string, string][]): Challenge => ({
  kind: "odd",
  rounds: rounds.map(([words, answer, why]) => ({ words, odd: answer, why })),
});
export const letters = (words: string[]): Challenge => ({ kind: "letters", words });
export const speak = (lines: string[]): Challenge => ({ kind: "speak", lines });
export const docks = (words: string[]): Challenge => ({ kind: "docks", words });
export const gull = (words: string[]): Challenge => ({ kind: "gull", words });
/** Первый вариант на каждом диске — верный; при показе диски перемешиваются. */
export const lock = (rounds: [string, string[][]][]): Challenge => ({
  kind: "lock",
  rounds: rounds.map(([ru, reels]) => ({ ru, reels, answer: reels.map((r) => r[0]) })),
});
export const letter = (to: string, model: string[], fields: string[][]): Challenge => ({
  kind: "letter",
  to,
  model,
  fields: fields.map(([label, ...answers], i) => ({ id: `f${i}`, label, answers })),
});
/** Обращение и подпись: образец показывает один вариант, но верны и другие обычные формы. */
export const an = (greeting: string, name: string) => [
  `Anrede: an ${name.replace(/^Herr /, "Herrn ")}`,
  `${greeting} ${name}`,
  `Hallo ${name}`,
  ...(/^(Frau|Herr) /.test(name) ? [`Sehr ${name.startsWith("Frau") ? "geehrte" : "geehrter"} ${name}`] : []),
];
export const gruss = (name: string) => [
  `Gruß und Name: ${name}`,
  ...["Viele Grüße", "Liebe Grüße", "Herzliche Grüße"].flatMap((g) => [`${g}, ${name}`, `${g} ${name}`]),
];
export const oral = (rounds: OralRound[]): Challenge => ({ kind: "oral", rounds });
export const say = (part: OralRound["part"], task: string, card: string, model: string, ru: string, hint?: string): OralRound => ({ part, task, card, model, ru, hint });
export const reply = (part: OralRound["part"], task: string, hear: string, model: string, ru: string): OralRound => ({ part, task, hear, model, ru });
/** Формуляр: поле — подпись и верные ответы. */
export const write = (title: string, fields: string[][]): Challenge => ({
  kind: "write",
  title,
  fields: fields.map(([label, ...answers], i) => ({ id: `f${i}`, label, answers })),
});

/** Шаг словесной игры с одной строкой рассказа. */
export const step = (
  id: string,
  title: string,
  story: string,
  prompt: string,
  hint: string,
  success: string,
  challenge: Challenge,
): Beat => ({ id, title, story: [story], prompt, hint, success, challenge });

export const DOCK = "Слово без артикля. К какому причалу оно подходит: der, die или das?";
export const RACE = "Прочитайте перевод и нажмите немецкое слово, пока чайка не долетела.";
export const LOCK = "Поверните диски, чтобы получилась фраза, и откройте замок.";
export const LETTER = "Напишите письмо по образцу. Пункты подсказывают, что сказать; меняются только данные.";
export const ORAL = "Сначала скажите вслух сами, потом сверьтесь с образцом.";
export const ASK = "Задайте партнёру вопрос по карточке.";
export const ANSWER = "Партнёр спрашивает вас. Ответьте вслух.";
export const REQUEST = "Попросите о том, что на картинке.";
export const REACT = "Партнёр обращается к вам. Отреагируйте вслух.";
export const HEAR = "Нажмите кнопку, послушайте слово и закройте его на карточке.";
export const PICTURE = "Послушайте слово и нажмите на подходящую картинку.";
export const ODD = "Одно слово в группе лишнее. Найдите его.";
export const SPELL = "Соберите слово по буквам.";
export const SAY = "Послушайте и повторите вслух. Можно записать себя и сравнить.";
export const WRITE = "Напишите по-немецки. У существительных нужен артикль.";
export const HINT_DOCK = "Артикль запоминают вместе со словом. После ошибки слово вернётся в конце очереди.";
export const HINT_RACE = "Унесённое слово вернётся, а времени станет больше. Проиграть здесь нельзя.";
export const HINT_LOCK = "Замок считает верные диски, но не называет их. Проверьте форму глагола и порядок слов.";
export const HINT_LETTER = "Берите предложения образца и меняйте данные. После второй неудачной проверки откроется правильный вариант.";
export const HINT_ORAL = "Здесь проверяете вы сами. Запись остаётся на этой странице и никуда не отправляется.";
export const HINT_HEAR = "Переслушивать можно сколько угодно. Ошибка ничего не стоит.";
export const HINT_PICTURE = "Неверное нажатие подскажет, как называется картинка.";
export const HINT_ODD = "Ищите общую тему трёх слов. Перевод открывается после нажатия.";
export const HINT_SPELL = "Лишние буквы тоже лежат в наборе. Кнопка рядом с переводом озвучивает слово.";
export const HINT_SAY = "Запись остаётся только на этой странице и никуда не отправляется.";
export const HINT_WRITE = "Существительные пишутся с большой буквы, глаголы — с маленькой.";

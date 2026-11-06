import type { Cond, Effects } from "./world.ts";

/** pl — множественное число существительного без артикля, как в словаре уроков: оно звучит в записи. */
export type Phrase = { ru: string; de: string; note: string; pl?: string };
export type Option = { id: string; text: string; why: string };
export type ChatTurn = {
  say: string;
  ru: string;
  options: Option[];
  answer: string;
};
export type Move = "links" | "geradeaus" | "rechts";
export type VoiceLine = {
  who: string;
  voice: string;
  text: string;
  ru: string;
};
/** Фраза на дисках кодового замка: один диск — одна часть предложения. */
export type LockRound = { ru: string; reels: string[][]; answer: string[] };
/** Шаг устной практики: сказать вслух по карточке или в ответ партнёру, затем сверить с образцом. */
export type OralRound = {
  part: 1 | 2 | 3;
  task: string;
  card?: string;
  hear?: string;
  hint?: string;
  model: string;
  ru: string;
};
/**
 * Вариант в сцене: верный продвигает разговор, неверный получает реакцию. Верных может быть
 * несколько, и у каждого свои последствия (set): так выбор меняет мир.
 */
export type Pick = { text: string; ok?: true; react?: string; set?: Effects };
/** Ветка развилки; optional — побочное задание, if — когда оно вообще появляется. */
export type Branch = { label: string; icon: string; nodes: SceneNode[]; optional?: true; if?: Cond[] };
/**
 * Узел сцены. Сцена — разговор и осмотр места, в который вплетены действия: так сюжет
 * идёт через действия игрока, а не между отдельными играми. У любого узла могут быть
 * последствия set: они срабатывают, когда узел пройден.
 */
export type SceneNode = SceneStep & {
  set?: Effects;
  /**
   * Правила к действию — фрагменты разбора уроков «тема/фрагмент», как у шагов основной игры
   * (`src/story/rules.ts`): карточка стоит рядом с заданием, новая открыта, знакомая — свёрнута.
   */
  rule?: string[];
};
type SceneStep =
  /** Рассказчик по-русски; немецкие единицы — {id}, как в рассказе шагов. */
  | { t: "narr"; text: string }
  /** Реплика героя голосом; learn — новые слова уроков, которые она вводит. */
  | { t: "say"; who: string; voice: string; de: string; ru: string; learn?: string[] }
  /** Ответ игрока герою по-немецки: верных может быть несколько. */
  | { t: "reply"; task?: string; options: Pick[] }
  /** Своя реплика с клавиатуры; * в ответе — любое имя с большой буквы. */
  /** sample — образец для подсказки; обязателен, если в ответе есть * (любое имя или место). */
  | { t: "type"; task: string; answers: string[]; ru?: string; sample?: string }
  /** Пропуск в немецкой фразе. */
  | { t: "gap"; task: string; text: string; options: string[]; answer: string; ru?: string }
  /** Послушать реплику ещё раз и выбрать, что прозвучало или что она значит. */
  | { t: "hear"; task: string; voice: string; de: string; options: string[]; answer: string }
  /** Решение детектива по-русски. */
  | { t: "pick"; task: string; options: Pick[] }
  /** Осмотр места: нажимать на предметы; все отмеченные key нужно найти. */
  | { t: "look"; task: string; items: { icon: string; de: string; ru: string; note: string; key?: true }[] }
  /**
   * Развилка: куда пойти или кого спросить; обязательные ветки игрок проходит в своём порядке,
   * побочные — по желанию, после чего «Дальше по делу» (next) уводит из развилки.
   */
  | { t: "go"; task: string; branches: Branch[]; next?: string }
  /** Вариант по состоянию мира: решение принимается, когда сцена до него дошла, и запоминается. */
  | { t: "when"; if: Cond[]; then: SceneNode[]; else?: SceneNode[] }
  /** Предмет в инвентарь. */
  | { t: "item"; icon: string; de: string; ru: string }
  /** Улика в блокнот. */
  | { t: "clue"; title: string; text: string }
  /** Иллюстрация к сцене (public/story-img). Проходить её не нужно: она стоит перед следующим узлом. */
  | { t: "pic"; src: string; alt: string }
  /** Встроенная игра: часы, касса, причалы и любые другие действия. */
  | { t: "game"; task: string; c: Challenge; hint?: string };
export type Challenge =
  | { kind: "play"; nodes: SceneNode[] }
  | { kind: "choice"; options: Option[]; answer: string }
  | { kind: "order"; tiles: string[]; answer: string[]; also?: string[][] }
  | {
      kind: "match";
      left: { id: string; text: string }[];
      right: { id: string; text: string }[];
      answer: Record<string, string>;
    }
  | {
      kind: "quantity";
      items: { id: string; text: string; max: number }[];
      answer: Record<string, number>;
    }
  /** label — подпись поля: «PIN», «Номер телефона»; по умолчанию по длине кода. */
  | { kind: "code"; length: number; answer: string; label?: string }
  | { kind: "chat"; who: string; voice: string; turns: ChatTurn[] }
  | {
      kind: "verdict";
      labels: [string, string];
      items: { id: string; text: string; answer: boolean; why: string }[];
    }
  | { kind: "gaps"; parts: (string | null)[]; bank: string[]; answer: string[] }
  | {
      kind: "sort";
      bins: { id: string; text: string }[];
      cards: { id: string; text: string; icon?: string }[];
      answer: Record<string, string>;
    }
  | { kind: "spot"; title: string; lines: string[][]; answer: string[] }
  | { kind: "memory"; pairs: { id: string; de: string; ru: string }[] }
  | {
      kind: "clock";
      start: string;
      step: number;
      answer: string;
      traps: Record<string, string>;
    }
  | {
      kind: "route";
      width: number;
      height: number;
      start: { x: number; y: number; heading: number };
      places: Record<string, string>;
      goal: string;
      moves: Move[];
    }
  | { kind: "coins"; coins: number[]; answer: number }
  | { kind: "bingo"; words: string[] }
  | { kind: "scene"; items: { word: string; icon: string }[] }
  | {
      kind: "odd";
      rounds: { words: string[]; odd: string; why: string }[];
    }
  | { kind: "letters"; words: string[] }
  | { kind: "speak"; lines: string[] }
  | { kind: "docks"; words: string[] }
  | { kind: "gull"; words: string[] }
  | { kind: "lock"; rounds: LockRound[] }
  | { kind: "oral"; rounds: OralRound[] }
  | {
      kind: "letter";
      to: string;
      model: string[];
      fields: { id: string; label: string; answers: string[] }[];
    }
  | {
      kind: "write";
      title: string;
      fields: { id: string; label: string; answers: string[] }[];
    }
  | {
      kind: "calendar";
      months: { name: string; days: number }[];
      answer: string;
    };
export type Beat = {
  id: string;
  title: string;
  story: string[];
  source?: { title: string; lines: string[] };
  audio?: { file: string; text: string; ru: string };
  /** Реплики голосом: текст открывается по кнопке. */
  voices?: VoiceLine[];
  /** Интерлюдия: сцена глазами другого героя («Тем временем · глазами чайки»). */
  pov?: string;
  /** Выражения, которые возвращаются в конце главы после ошибки на этом шаге. */
  practice?: string[];
  prompt: string;
  hint: string;
  challenge: Challenge;
  success: string;
  clue?: { title: string; text: string };
};
export type Episode = {
  id: string;
  title: string;
  /** День до Kieler Woche: глава нового сюжета — один день. */
  day?: { de: string; ru: string };
  place: string;
  topic: string;
  grammar: string;
  /** Выражения главы для записи на слух в конце главы. */
  review?: string[];
  beats: Beat[];
};
export type Answer = string | string[] | Record<string, string | number>;
/** Когда слово встречали в последний раз: шаг истории и календарный день. */
export type Mark = { step: number; day: number };
export type WordCard = Mark & { box: number };
export type StorySave = {
  version: 2;
  /** Открытый шаг. */
  cursor: string;
  /** Пройденные шаги. Отметка по id: новый шаг в пройденной главе остаётся пустой ячейкой. */
  done: string[];
  /** Отложенные шаги: следующий за ними открыт, сами они ждут, как пустые ячейки. */
  skipped: string[];
  drafts: Record<string, Answer>;
  support: boolean;
  /** Отвечать письменно на шагах, где нужно говорить вслух. */
  quiet: boolean;
  /** Сколько раз ошибались в выражении; запись на слух убирает его из списка. */
  weak: Record<string, number>;
  /** Память слов словаря: когда какое слово вернуть. */
  cards: Record<string, WordCard>;
  /** Когда закончился последний раунд повторения. */
  last: Mark;
};

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
  /** Реплика героя голосом; learn — новые слова, которые она вводит: слова уроков и выражения истории. */
  | { t: "say"; who: string; voice: string; de: string; ru: string; learn?: string[] }
  /** Ответ игрока герою по-немецки: верных может быть несколько. */
  | { t: "reply"; task?: string; options: Pick[] }
  /** Своя реплика с клавиатуры; * в ответе — любое имя с большой буквы. */
  /** sample — образец для подсказки; обязателен, если в ответе есть * (любое имя или место). */
  | { t: "type"; task: string; answers: string[]; ru?: string; sample?: string }
  /** Пропуск в немецкой фразе. */
  | { t: "gap"; task: string; text: string; options: string[]; answer: string; ru?: string }
  /** Послушать реплику ещё раз и выбрать, что прозвучало или что она значит. */
  /** an — своя инструкция экзамена вместо обычной: у объявлений — Hören Sie die Durchsage. */
  | { t: "hear"; task: string; voice: string; de: string; options: string[]; answer: string; an?: string }
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
  /**
   * Встроенная игра: часы, касса, причалы и любые другие действия. outcome — последствия по итогу:
   * clean — без единой ошибки, sloppy — от двух ошибок (в гонке с чайкой — от двух упущенных
   * слов); одна ошибка мир не меняет. Так мир двигает то, как игрок сыграл, а не сценарий.
   */
  | {
      t: "game";
      task: string;
      c: Challenge;
      hint?: string;
      outcome?: Outcome;
      /** Игра возвращения: её слова раздаёт планировщик (`src/story/scenes/back.ts`, A1-PLAN.md). */
      back?: boolean;
    };
/** Последствия игры по её итогу. */
export type Outcome = { clean?: Effects; sloppy?: Effects };
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
    }
  // Новые мини-игры новой версии (A1-PLOT.md, «Новые мини-игры»): только для сцен.
  /** «Похожие звуки»: прозвучало одно из похожих слов — выбрать, какое. say — слово урока или выражение истории с записью. */
  | { kind: "sounds"; rounds: { say: string; options: string[] }[] }
  /**
   * Логическая сетка «Wer war wo?» и её варианты «Кто откуда», «Чьё это?»: по уликам раздать
   * людям значения столбцов. Решение одно, лишних улик нет — это проверяет решатель.
   */
  | {
      kind: "grid";
      people: string[];
      cols: { id: string; label: string; values: string[] }[];
      clues: GridClue[];
      /** «человек|столбец» → значение. */
      answer: Record<string, string>;
    }
  /** «Склейка»: собрать сложное слово из частей и выбрать артикль — по последней части. */
  | { kind: "compound"; rounds: { word: string; parts: string[]; ru: string }[]; extra: string[] }
  /** «Найди противоречие»: в двух показаниях отметить слова, которые не сходятся. Id слова — «текст:строка:слово». */
  | { kind: "contra"; texts: { who: string; lines: string[][] }[]; answer: string[] }
  /**
   * «Ежедневник»: по сообщениям отметить занятое и поставить встречу туда, где свободны все.
   * busy — занятые клетки «день|час», only — свободен только там. Засчитывается любая свободная клетка.
   */
  | {
      kind: "planner";
      days: string[];
      hours: string[];
      notes: { who: string; de: string; ru: string; busy?: string[]; only?: string[] }[];
    }
  /** «Объявления»: подобрать людям объявления; кому не подходит ни одно — «0». */
  | {
      kind: "ads";
      people: { id: string; text: string }[];
      ads: { id: string; title: string; text: string }[];
      answer: Record<string, string>;
    }
  /** «Лифт»: по словам жильца нажать этаж. floor: −1 — Keller, 0 — Erdgeschoss. */
  | { kind: "lift"; top: number; rounds: { who: string; de: string; ru: string; floor: number }[] }
  /** «Шифр чайки»: номера букв (A = 1) или сдвиг по алфавиту; ответ — расшифровка. */
  | { kind: "cipher"; code: string; shift?: number; answer: string; ru: string }
  /**
   * «Семейное дерево»: по рассказу вписать имена в пустые клетки дерева. Клетки с given уже
   * подписаны; names — имена на выбор, среди них могут быть лишние. answer — клетка → имя.
   */
  | { kind: "tree"; text: { de: string; ru: string }[]; root: TreeNode; names: string[]; answer: Record<string, string> }
  /**
   * «Фоторобот»: по приметам выбрать каждую часть портрета, рисунок меняется сразу. Части и
   * их варианты — из словаря PORTRAIT в logic.ts: по нему рисуется портрет.
   */
  | {
      kind: "portrait";
      notes: { de: string; ru: string }[];
      parts: { id: PortraitPart; label: string; options: string[] }[];
      answer: Partial<Record<PortraitPart, string>>;
    }
  /**
   * «Я шпион» (Ich sehe was, was du nicht siehst): по загадке «Sie ist rot» нажать вещь. Подписи
   * без артикля: местоимение подсказывает род, цвет — вещь. Вещи и цвета — из словаря SPY в logic.ts.
   */
  /**
   * «Алгоритм»: собрать из карточек программу (*Gehen Sie geradeaus.*) и нажать «Пуск»: Хауке
   * проходит её по схеме, как в прогулке. Засчитывается результат — программа доводит до цели;
   * moves — один верный путь, max — сколько карточек помещается в программу.
   */
  | {
      kind: "algo";
      width: number;
      height: number;
      start: { x: number; y: number; heading: number };
      places: Record<string, string>;
      goal: string;
      moves: Move[];
      max?: number;
    }
  /**
   * «Карта погоды»: прогноз звучит голосом voice, игрок ставит значок погоды на каждый день. Значки —
   * только картинки: слово погоды игрок слышит, а не читает. Значок без фразы прогноза — приманка.
   */
  | {
      kind: "weather";
      voice: string;
      days: string[];
      skies: { id: string; de: string; ru: string; icon: string }[];
      forecast: { de: string; ru: string; day: string; sky: string }[];
    }
  /**
   * «20 вопросов»: who загадал карточку answer; вопросы «да/нет» с глаголом первым, у каждого —
   * карточки с ответом «да» и «нет», остальные неизвестны. Колоды признаков — src/story/twenty.ts.
   */
  | {
      kind: "twenty";
      who: string;
      voice: string;
      cards: { id: string; de: string; icon: string; unit?: string }[];
      questions: { de: string; ru: string; yes: string[]; no: string[] }[];
      answer: string;
    }
  | {
      kind: "spy";
      items: { de: string; colour: string }[];
      rounds: { de: string; ru: string; pronoun: "er" | "sie" | "es"; colour: string; answer: string }[];
    };
/** Клетка семейного дерева; partner — супруг рядом, icon — подсказка на пустой клетке. */
export type TreeSlot = { id: string; icon?: string; given?: string };
export type TreeNode = TreeSlot & { partner?: TreeSlot; children?: TreeNode[] };
export type PortraitPart = "size" | "age" | "top" | "colour" | "says";
/**
 * Улика сетки: a и b — в одной строке (или нет, если not). Термин — имя человека или
 * «столбец:значение»: { a: "Nils", b: "stadt:Kiel", not: true } — «Nils kommt nicht aus Kiel».
 */
export type GridClue = { de: string; ru: string; a: string; b: string; not?: true };
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

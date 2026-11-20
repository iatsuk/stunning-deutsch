import type { Cond, Effects } from "./world.ts";

/**
 * pl — множественное число существительного без артикля, как в словаре уроков: оно звучит в записи.
 * «-» — множественного нет, «pl» — слово только во множественном числе.
 */
export type Phrase = { ru: string; de: string; note: string; pl?: string };
export type Option = { id: string; text: string; why: string };
export type ChatTurn = {
  say: string;
  ru: string;
  options: Option[];
  answer: string;
};
export type Move = "links" | "geradeaus" | "rechts";
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
   * Правила к действию — фрагменты разбора уроков «тема/фрагмент» или правила сцен «moin/фрагмент».
   * Карточка стоит рядом с заданием, новая открыта, знакомая — свёрнута.
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
    }
  /** «Пружина порядка слов»: вставить триггер и переставить вытолкнутый глагол / приставку. */
  | { kind: "spring"; rounds: SpringRound[] }
  /** «Расставь вещи по плану»: по заметкам положить предметы в слоты на схеме комнаты. */
  | {
      kind: "room";
      title: string;
      furniture: { x: number; y: number; w: number; h: number; label: string }[];
      spots: RoomSpot[];
      items: RoomItem[];
      notes: { de: string; ru: string }[];
      answer: Record<string, string>;
    }
  /** «Порванная записка»: собрать документ из порванных полосок в верном порядке. */
  | {
      kind: "torn";
      title: string;
      strips: { id: string; de: string; ru: string }[];
      also?: string[][];
    }
  /** «Два причала»: рассортировать карточки по двум-трём контрастным категориям (как причалы). */
  | {
      kind: "contrast";
      bays: { id: string; label: string; sub?: string }[];
      items: { id: string; text: string; ru?: string; bay: string; why: string }[];
    }
  /** «Охота на хвост»: отсечь начало сложного слова до последнего корня и выбрать артикль. */
  | { kind: "tail"; rounds: TailRound[] }
  /** «Протокол расследования»: по вырезкам улик заполнить слоты итогового вывода. */
  | {
      kind: "protocol";
      title: string;
      clues: { who: string; de: string; ru: string }[];
      parts: (string | { slot: string; label: string })[];
      bank: string[];
      answer: Record<string, string>;
    }
  /** «Уложись в условия»: набрать любое количество позиций, которое выполняет все условия. */
  | { kind: "budget"; items: BudgetItem[]; rules: BudgetRule[] }
  /** «Групповой чат клуба»: выбрать сообщение нужного собеседника и ответить именно на него. */
  | { kind: "groupchat"; title: string; messages: GroupMsg[]; steps: GroupStep[] }
  /** «Комикс с пустыми облачками»: распределить реплики по кадрам сцены. */
  | { kind: "comic"; panels: ComicPanel[]; extra?: string[] }
  /** «Пересказ для блокнота»: переключить слова цитаты героя из 1-го лица в 3-е. */
  | { kind: "retell"; who: string; quote: string; ru: string; tokens: RetellToken[] }
  /** «Рация с помехами»: выбрать верный вопрос, чтобы прояснить смазанную часть реплики. */
  | { kind: "radio"; rounds: RadioRound[] }
  /** «Чайка крадётся к булочке»: угадать слово по буквам за 6 промахов, без наказания. */
  | { kind: "gullword"; words: string[] }
  /** «Редактор черновика»: найти и исправить ошибки в готовом письме героя по чеклисту. */
  | { kind: "proofread"; author: string; checklist: string[]; segments: ProofSegment[] };

export type SpringRound = {
  ru: string;
  base: string[];
  trigger: string;
  start: string[];
  answer: string[];
  also?: string[][];
  why: string;
};
export type RoomSpot = { id: string; x: number; y: number; label: string };
export type RoomItem = { id: string; icon: string; de: string; ru: string };
export type TailRound = { word: string; parts: string[]; ru: string };
export type BudgetItem = { id: string; de: string; ru: string; price: number; max: number; tags: string[] };
export type BudgetRule =
  | { kind: "maxPrice"; cents: number; label: string }
  | { kind: "minTotal"; count: number; label: string }
  | { kind: "exactTotal"; count: number; label: string }
  | { kind: "minTag"; tag: string; count: number; label: string }
  | { kind: "forbidTag"; tag: string; label: string };
export type GroupMsg = { id: string; who: string; de: string; ru: string };
export type GroupStep = { prompt: string; replyTo: string; options: Option[]; answer: string };
export type ComicPanel = { id: string; scene: string; who: string; art: string; answer: string; ru: string };
export type RetellSlot = { id: string; from: string; options: string[]; answer: string };
export type RetellToken = string | RetellSlot;
export type RadioRound = {
  who: string;
  before: string;
  after: string;
  hidden: string;
  ru: string;
  questions: { id: string; text: string; why?: string }[];
  answer: string;
  sound?: string;
};
export type ProofSlot = { id: string; draft: string; options: string[]; answer: string; why: string };
export type ProofSegment = string | ProofSlot;
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
  /** Интерлюдия: сцена глазами другого героя («Тем временем · глазами чайки»). */
  pov?: string;
  prompt: string;
  hint: string;
  challenge: Challenge;
  success: string;
};
export type Episode = {
  id: string;
  title: string;
  /** День до Kieler Woche: глава нового сюжета — один день. */
  day?: { de: string; ru: string };
  place: string;
  topic: string;
  grammar: string;
  beats: Beat[];
};
export type Answer = string | string[] | Record<string, string | number>;
/** Когда слово встречали в последний раз: шаг истории и календарный день. */
export type Mark = { step: number; day: number };
export type WordCard = Mark & { box: number };

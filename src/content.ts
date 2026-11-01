import catalogData from "./generated/catalog.json";
import type { Gender, Uhrzeit } from "./lib/german";

export type Chapter = { id: string; title: string };

export type ExamPart = { id: string; what: string; how: string };
export type ExamModule = { id: string; de: string; ru: string; minutes: string; parts: ExamPart[] };

export type TopicMeta = {
  id: string;
  order: number;
  title: string;
  ru: string;
  lede: string;
  goals: string[];
  grammar: string[];
  exam: string[];
  counts: { words: number; exercises: number; questions: number };
};

export type Level = {
  id: string;
  code: string;
  name: string;
  status: "open" | "soon";
  exam: string;
  summary: string;
  can?: string[];
  examInfo?: { note: string; modules: ExamModule[] };
  topics: TopicMeta[];
};

export const catalog = catalogData as unknown as { chapters: Chapter[]; levels: Level[] };

export type Line = { who: string; de: string; ru: string; audio?: string };
export type Dialogue = {
  title: string;
  ru?: string;
  place?: string;
  people: Record<string, { name: string; voice: string }>;
  lines: Line[];
};

export type Word = {
  de: string;
  ru: string;
  gender: Gender | null;
  plural: string | null;
  noPlural?: boolean;
  note?: string;
  audio?: string;
};
export type WordGroup = { title: string; ru?: string; items: Word[] };

export type Table = { title: string; ru?: string; head: string[]; rows: string[][]; ruCols: number[]; note?: string };

/** Плитка схемы предложения. Ключ общий для форм одного слова: wohn+e и wohn+st. */
export type Tile = { key: string; text: string };
export type Row = { slots: Tile[][]; punct: string; plain: string; ru: string; audio?: string };

export type TaskKind = "form" | "keywords" | "card" | "sign" | "message" | "listen" | "ads" | "worksheet";
export type Task = {
  kind: TaskKind;
  part: string;
  title?: string;
  situation?: string;
  text?: string;
  from?: string;
  to?: string;
  subject?: string;
  fields?: { label: string; value: string; given: boolean }[];
  words?: string[];
  theme?: string;
  word?: string;
  picture?: string;
  statement?: string;
  question?: string;
  options?: (string | { title: string; text: string })[];
  answer?: number | boolean;
  points?: string[];
  choose?: number;
  roles?: {title:string;text:string}[];
  recordings?: { text: string; audio?: string; voice?: string }[];
  format?: "notes" | "directory" | "article" | "matching" | "radio" | "pair" | "cloze";
  /** Общий банк заголовков: каждый вариант разрешён только в одном поле. */
  uniqueOptions?: boolean;
  reusableOptions?: string[];
  questions?: { prompt: string; answers: string[]; options?: string[] }[];
  sample: { de: string; audio?: string }[];
  audio?: string;
  /** Запись-разговор для Hören: реплики звучат подряд голосами героев. */
  script?: { who: string; de: string; audio?: string }[];
};

export type View = "dialogue" | "words" | "table" | "sentence" | "task" | "clock";

export type Scene = {
  view: View;
  dialogue?: string;
  words?: string;
  table?: string;
  task?: string;
  rows?: Row[];
  clock?: Uhrzeit & { audio: string[] };
  /** Сколько элементов открыто; нет поля — открыто всё. */
  reveal?: number;
  focus?: number[];
  /** Что открылось в этом фрагменте: новое никогда не затемняется. */
  fresh?: number[];
  solved?: boolean;
};

/**
 * Затемнён ли элемент: есть выделение, элемент не в нём и не появился только что.
 * Новая реплика не должна выглядеть так, будто до неё ещё дойдут.
 */
export const isDimmed = (i: number, focus?: number[], fresh?: number[]) =>
  Boolean(focus?.length && !focus.includes(i) && !fresh?.includes(i));

export type Beat = {
  id: string;
  step: string;
  stepTitle: string;
  chapterIndex: number;
  indexInStep: number;
  read: string;
  point: string;
  question?: string;
  /** Сцена вопроса до того, как читатель открыл ответ. */
  sceneBefore?: Scene;
  scene: Scene;
};

export type Exercise =
  | { id: string; type: "choice"; q: string; ru?: string; options: string[]; answer: number; why?: string; audio?: string }
  | { id: string; type: "gap"; q: string; ru?: string; answer: string[]; hint?: string; why?: string; audio?: string }
  | { id: string; type: "order"; ru: string; de: string; also?: string[]; why?: string; audio?: string };

export type CaseEvidence =
  | { kind: "quote"; who: string; de: string; ru: string; audio?: string }
  | { kind: "note"; de: string; ru: string };

export type CaseStep = {
  read: string;
  evidence: CaseEvidence[];
  question: string;
  options: string[];
  answer: number;
  /** Что открывается после верного вывода. */
  right: string;
  /** Ложный след для каждого варианта; у верного — null. */
  wrong: (string | null)[];
};

/** Дело темы: улики, где правильный вывод требует грамматики этой темы. */
export type Investigation = {
  title: string;
  ru?: string;
  intro: string;
  people: Record<string, { name: string; voice: string; role?: string }>;
  steps: CaseStep[];
  ending: string;
};

/** Фраза для игры «Поиск ошибки»: верный вариант, вариант с ошибкой и объяснение. */
export type SpyItem = { de: string; wrong: string; why: string; auto?: boolean };

export type AdventureQuote = { de: string; audio?: string; name: string };
export type AdventureChallenge = {
  id: string;
  title: string;
  intro: string;
  success: string;
  wrong: string;
  quotes?: AdventureQuote[];
  mode?: "reading" | "listening";
  variants?: AdventureChallenge[];
} & (
  | { kind: "note"; fields: { label: string; answers: string[] }[] }
  | { kind: "negotiation"; start: string; nodes: { id: string; text: string; terminal?: boolean; choices: { label: string; next: string; feedback: string }[] }[] }
  | { kind: "order"; tokens: string[]; label: string }
  | { kind: "select" | "pack"; options: { id: string; label: string; icon?: string }[]; answer: string[]; alternatives?: string[][] }
  | { kind: "match"; anchor?: string; slots: { id: string; label: string; icon?: string; answer: string }[]; options: { id: string; label: string; icon?: string }[] }
  | { kind: "quantity"; items: { id: string; label: string; unit: string; pluralUnit?: string; icon?: string; answer: number; step: number; max: number }[] }
  | { kind: "clock"; answer: string; initial: string; minuteStep: number }
);
export type CrewAdventure = {
  kind: "crew";
  title: string;
  intro: string;
  origins: string[];
  places: string[];
  members: { id: string; name: string; origin: string; home: string; quotes: AdventureQuote[] }[];
  contact: { question: string; answer: string; success: string; wrong: string };
  challenges: AdventureChallenge[];
};
export type HarborAdventure = {
  kind: "harbor";
  title: string;
  intro: string;
  berths: number[];
  berth: number;
  directions: AdventureQuote[];
  phone: string;
  phoneClue: AdventureQuote[];
  phoneHelp: AdventureQuote[];
  room: { text: string; audio?: string; options: string[]; answer: number };
  challenges: AdventureChallenge[];
};
export type SequenceAdventure = {
  kind: "sequence";
  title: string;
  intro: string;
  ending: string;
  challenges: AdventureChallenge[];
};
export type Adventure = CrewAdventure | HarborAdventure | SequenceAdventure;

export type Topic = TopicMeta & {
  level: string;
  chapters: Chapter[];
  dialogues: Record<string, Dialogue>;
  words: Record<string, WordGroup>;
  tables: Record<string, Table>;
  tasks: Record<string, Task>;
  beats: Beat[];
  exercises: Exercise[];
  case?: Investigation;
  adventure?: Adventure;
  spy: SpyItem[];
};

const loaders = import.meta.glob<{ default: Topic }>("./generated/topics/*.json");

export async function loadTopic(id: string): Promise<Topic | null> {
  const load = loaders[`./generated/topics/${id}.json`];
  return load ? (await load()).default : null;
}

export const levelById = (id: string) => catalog.levels.find((level) => level.id === id);

/** "sprechen-1" → { module: Sprechen, part: 1 } */
export function examPart(id: string) {
  for (const level of catalog.levels) {
    for (const module of level.examInfo?.modules ?? []) {
      const index = module.parts.findIndex((part) => part.id === id);
      if (index >= 0) return { module, part: module.parts[index], number: index + 1 };
    }
  }
  return null;
}

export const examLabel = (id: string) => {
  const found = examPart(id);
  return found ? `${found.module.de} · Teil ${found.number}` : id;
};

export type AssessmentMeta = { id:string;level:string;title:string;intro:string;mode:'review'|'mock' };
export type Assessment = AssessmentMeta & {
 sections:{id:string;title:string;minutes?:number;taskIds:string[]}[];
 tasks:Record<string,Task>;
 review:{level:string;topic:string;label:string;taskIds?:string[]}[];
};
export const assessmentCatalog=(catalogData as unknown as {assessments?:AssessmentMeta[]}).assessments??[];
const assessmentLoaders=import.meta.glob<{default:Assessment}>('./generated/assessments/*.json');
export async function loadAssessment(id:string):Promise<Assessment|null> {
 const load=assessmentLoaders[`./generated/assessments/${id}.json`];return load?(await load()).default:null;
}

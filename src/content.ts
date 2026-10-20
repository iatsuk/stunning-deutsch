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

export type TaskKind = "form" | "keywords" | "card" | "sign" | "message" | "listen" | "ads";
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
  solved?: boolean;
};

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

export type Topic = TopicMeta & {
  level: string;
  chapters: Chapter[];
  dialogues: Record<string, Dialogue>;
  words: Record<string, WordGroup>;
  tables: Record<string, Table>;
  tasks: Record<string, Task>;
  beats: Beat[];
  exercises: Exercise[];
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

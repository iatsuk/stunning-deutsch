// Тренировка (A1-PLAN.md, «Тренировка»): какие главы игрок уже прошёл, какие мини-игры сцен он сыграл
// и как тренировка оценивает ответы.
import { grade, type Cards } from "./memory.ts";
import { SCENE_INTERVALS } from "./review.ts";
import { keyOf, nodeAt } from "./scene.ts";
import type { Challenge, Episode, SceneNode } from "./types.ts";

/**
 * Оценка тренировки: верный ответ вне срока карточку не поднимает — память показывает только повтор в свой
 * срок, иначе слово за пару раундов ушло бы в верхнюю коробку. Ошибка возвращает единицу раньше.
 */
export const practiceGrade = (cards: Cards, missed: string[], step: number, day: number) =>
  grade(cards, missed, missed, step, day, SCENE_INTERVALS);
export const KIND_NAMES: Record<Challenge["kind"], string> = {
  play: "Сцена", order: "Порядок слов", match: "Пары", quantity: "Отмерить", code: "Набор номера",
  chat: "Чат", verdict: "Верно или нет", gaps: "Пропуски", sort: "По группам", spot: "Найди в тексте",
  memory: "Мемори", clock: "Часы", coins: "Касса", bingo: "Лото на слух", scene: "Послушай и найди",
  odd: "Лишнее слово", letters: "Буквы", speak: "Скажи вслух", docks: "Причалы der/die/das",
  gull: "Гонка с чайкой", lock: "Словесный замок", oral: "Речь как на экзамене", letter: "Письмо",
  write: "Запись по образцу", calendar: "Календарь", sounds: "Похожие звуки", grid: "Wer war wo?",
  compound: "Склейка", contra: "Найди противоречие", planner: "Ежедневник", ads: "Объявления",
  lift: "Лифт", cipher: "Шифр чайки", tree: "Семейное дерево", portrait: "Фоторобот", algo: "Алгоритм",
  weather: "Карта погоды", twenty: "20 вопросов", spy: "Я шпион", spring: "Пружина порядка слов",
  room: "Вещи по плану", torn: "Порванная записка", contrast: "Два причала", tail: "Охота на хвост",
  protocol: "Протокол", budget: "Уложись в условия", groupchat: "Групповой чат", comic: "Комикс",
  retell: "Пересказ", radio: "Рация с помехами", gullword: "Чайка у булочки",
  proofread: "Редактор черновика", craft: "Крафт",
};

export type PlayedGame = { chapter: number; scene: string; key: string; node: Extract<SceneNode, { t: "game" }> };

/** Мини-игры, которые игрок сыграл: узлы game среди ответов сцен, с ключами вложенных веток. */
export function playedGames(chapters: Episode[], drafts: Record<string, string[]>): PlayedGame[] {
  const games: PlayedGame[] = [];
  const seen = new Set<string>();
  chapters.forEach((chapter, ci) => {
    for (const beat of chapter.beats) {
      if (beat.challenge.kind !== "play") continue;
      for (const entry of drafts[beat.id] ?? []) {
        const key = keyOf(entry);
        const node = nodeAt(beat.challenge.nodes, key);
        const id = `${beat.id}|${key}`;
        if (node?.t !== "game" || seen.has(id)) continue;
        seen.add(id);
        games.push({ chapter: ci + 1, scene: beat.id, key, node });
      }
    }
  });
  return games;
}

/** Главы, в которых игрок уже что-то сыграл (номера с 1), — не глава, где он стоит сейчас. */
export function metChapters(chapters: Episode[], drafts: Record<string, string[]>): number[] {
  return chapters.flatMap((chapter, ci) => chapter.beats.some((b) => drafts[b.id]?.length) ? [ci + 1] : []);
}

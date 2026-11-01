import type { Answer, Beat, Challenge, Episode, StorySave } from "./types.ts";

export const STORY_KEY = "sd-moin-story-v1";
export const phraseIds = (text: string): string[] =>
  [...text.matchAll(/\{([\w-]+)\}/g)].map((m) => m[1]);
export const beatPhrases = (beat: Beat) => [
  ...new Set([...beat.story, ...(beat.source?.lines ?? [])].flatMap(phraseIds)),
];
export function knownBefore(beats: Beat[], cursor: number): Set<string> {
  return new Set(beats.slice(0, cursor).flatMap(beatPhrases));
}
export function isCorrect(
  challenge: Challenge,
  value: Answer | undefined,
): boolean {
  if (challenge.kind === "choice" || challenge.kind === "code")
    return typeof value === "string" && value === challenge.answer;
  if (challenge.kind === "order")
    return (
      Array.isArray(value) &&
      [challenge.answer, ...(challenge.also ?? [])].some(
        (a) => a.length === value.length && a.every((v, i) => v === value[i]),
      )
    );
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const expected = challenge.answer;
  return (
    Object.keys(value).length === Object.keys(expected).length &&
    Object.entries(expected).every(([id, v]) => value[id] === v)
  );
}
export function initialAnswer(challenge: Challenge): Answer {
  if (challenge.kind === "order") return [];
  if (challenge.kind === "quantity")
    return Object.fromEntries(challenge.items.map((i) => [i.id, 0]));
  if (challenge.kind === "match") return {};
  return "";
}
export function normalizeSave(raw: unknown, beats: Beat[]): StorySave {
  const data =
    raw && typeof raw === "object" ? (raw as Partial<StorySave>) : {};
  const completed = Number.isInteger(data.completed)
    ? Math.max(0, Math.min(beats.length, data.completed!))
    : 0;
  const cursor = Number.isInteger(data.cursor)
    ? Math.max(0, Math.min(beats.length - 1, completed, data.cursor!))
    : Math.min(completed, beats.length - 1);
  const drafts: Record<string, Answer> = {};
  if (data.drafts && typeof data.drafts === "object")
    for (const beat of beats) {
      const v = data.drafts[beat.id],
        c = beat.challenge;
      if ((c.kind === "choice" || c.kind === "code") && typeof v === "string")
        drafts[beat.id] = v;
      if (
        c.kind === "order" &&
        Array.isArray(v) &&
        v.every((t) => typeof t === "string")
      ) {
        const remaining = [...c.tiles];
        drafts[beat.id] = v.filter((t) => {
          const i = remaining.indexOf(t);
          if (i < 0) return false;
          remaining.splice(i, 1);
          return true;
        });
      }
      if (
        (c.kind === "match" || c.kind === "quantity") &&
        v &&
        typeof v === "object" &&
        !Array.isArray(v)
      ) {
        drafts[beat.id] = Object.fromEntries(
          Object.entries(v).filter(([id, x]) =>
            c.kind === "match"
              ? c.left.some((i) => i.id === id) &&
                c.right.some((i) => i.id === x)
              : c.items.some(
                  (i) =>
                    i.id === id &&
                    Number.isInteger(x) &&
                    Number(x) >= 0 &&
                    Number(x) <= i.max,
                ),
          ),
        );
      }
    }
  return {
    version: 1,
    cursor,
    completed,
    drafts,
    support: data.support === true,
  };
}
export function validateStory(
  episodes: Episode[],
  phrases: Record<string, unknown>,
): string[] {
  const errors: string[] = [],
    ids = new Set<string>();
  for (const episode of episodes)
    for (const beat of episode.beats) {
      if (ids.has(beat.id)) errors.push(`Duplicate beat: ${beat.id}`);
      ids.add(beat.id);
      for (const id of beatPhrases(beat))
        if (!phrases[id]) errors.push(`Unknown phrase: ${id}`);
      const c = beat.challenge;
      if (!isCorrect(c, c.answer))
        errors.push(`Unreachable solution: ${beat.id}`);
      if (c.kind === "choice" && !c.options.some((o) => o.id === c.answer))
        errors.push(`Missing choice: ${beat.id}`);
      if (
        c.kind === "order" &&
        ![c.answer, ...(c.also ?? [])].every(
          (a) =>
            a.length === c.tiles.length &&
            [...a].sort().join("|") === [...c.tiles].sort().join("|"),
        )
      )
        errors.push(`Wrong tiles: ${beat.id}`);
      if (
        c.kind === "match" &&
        (Object.keys(c.answer).length !== c.left.length ||
          !c.left.every((i) => c.right.some((r) => r.id === c.answer[i.id])))
      )
        errors.push(`Wrong pairs: ${beat.id}`);
      if (
        c.kind === "quantity" &&
        !c.items.every(
          (i) =>
            Number.isInteger(c.answer[i.id]) &&
            c.answer[i.id] >= 0 &&
            c.answer[i.id] <= i.max,
        )
      )
        errors.push(`Wrong quantity: ${beat.id}`);
      if (
        c.kind === "code" &&
        (!/^\d+$/.test(c.answer) || c.answer.length !== c.length)
      )
        errors.push(`Wrong code: ${beat.id}`);
    }
  return errors;
}

import type { Answer, Challenge, ProofSlot, RetellSlot } from "./types.ts";

// Чистая логика 13 механик из IDEAS.md: проверка ответа, готовое решение, стартовый черновик,
// объяснение ошибки и валидация данных. Вынесено отдельно от React для тестов node --test.

export type NewKind =
  | "spring"
  | "room"
  | "torn"
  | "contrast"
  | "tail"
  | "protocol"
  | "budget"
  | "groupchat"
  | "comic"
  | "retell"
  | "radio"
  | "gullword"
  | "proofread";

export type NewChallenge = Extract<Challenge, { kind: NewKind }>;

export const NEW_KINDS = new Set<string>([
  "spring",
  "room",
  "torn",
  "contrast",
  "tail",
  "protocol",
  "budget",
  "groupchat",
  "comic",
  "retell",
  "radio",
  "gullword",
  "proofread",
]);

export const isNewMechanic = (c: Challenge): c is NewChallenge => NEW_KINDS.has(c.kind);

const isRecord = (value: unknown): value is Record<string, string | number> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);
const sameList = (value: Answer | undefined, expected: string[]) =>
  Array.isArray(value) && value.length === expected.length && expected.every((v, i) => v === value[i]);
const sameSet = (value: Answer | undefined, expected: string[]) =>
  Array.isArray(value) && new Set(value).size === value.length && sameList([...value].sort(), [...expected].sort());
const sameBag = (a: string[], b: string[]) => [...a].sort().join("|") === [...b].sort().join("|");

export const protocolSlots = (c: Extract<Challenge, { kind: "protocol" }>) =>
  c.parts.filter((p): p is { slot: string; label: string } => typeof p !== "string");

export const retellSlots = (c: Extract<Challenge, { kind: "retell" }>) =>
  c.tokens.filter((t): t is RetellSlot => typeof t !== "string");

export const proofSegments = (c: Extract<Challenge, { kind: "proofread" }>) =>
  c.segments.filter((s): s is ProofSlot => typeof s !== "string");

export function springRight(round: Extract<Challenge, { kind: "spring" }>["rounds"][number], tiles: string[]): boolean {
  return [round.answer, ...(round.also ?? [])].some((expected) => sameList(tiles, expected));
}

/**
 * Три позиции разреза в сложном слове: один истинный (перед последним корнем) и два правдоподобных
 * ложных рядом, отсортированные по возрастанию.
 */
export function tailCuts(bare: string, tail: string): number[] {
  const cut = bare.length - tail.length;
  const min = bare.length >= 5 ? 2 : 1;
  const max = bare.length >= 5 ? bare.length - 2 : bare.length - 1;
  const picks = new Set<number>([cut]);
  const near = [cut - 2, cut + 2, cut - 1, cut + 1, cut - 3, cut + 3];
  for (const at of near) {
    if (picks.size >= 3) break;
    if (at >= min && at <= max) picks.add(at);
  }
  for (let at = min; at <= max && picks.size < 3; at++) picks.add(at);
  return [...picks].sort((a, b) => a - b);
}

type Budget = Extract<Challenge, { kind: "budget" }>;

/** Проверка корзины на все живые условия: сумма, общее количество и ограничения по тегам. */
export function budgetCheck(c: Pick<Budget, "items" | "rules">, record: Record<string, string | number>) {
  const countOf = (id: string) => Number(record[id] ?? 0);
  const cents = c.items.reduce((sum, item) => sum + item.price * countOf(item.id), 0);
  const total = c.items.reduce((sum, item) => sum + countOf(item.id), 0);
  const tagged = (tag: string) =>
    c.items.filter((i) => i.tags.includes(tag)).reduce((sum, item) => sum + countOf(item.id), 0);
  const results = c.rules.map((rule) => {
    const ok =
      rule.kind === "maxPrice"
        ? cents <= rule.cents
        : rule.kind === "minTotal"
          ? total >= rule.count
          : rule.kind === "exactTotal"
            ? total === rule.count
            : rule.kind === "minTag"
              ? tagged(rule.tag) >= rule.count
              : tagged(rule.tag) === 0;
    return { rule, ok };
  });
  return { ok: results.every((r) => r.ok), total, cents, results };
}

/** Перебор допустимых наборов для проверки, что решений не меньше двух, и для готового ответа. */
export function budgetSolutions(c: Pick<Budget, "items" | "rules">, limit = 2): Record<string, number>[] {
  const maxCents = c.rules.reduce((m, r) => (r.kind === "maxPrice" ? Math.min(m, r.cents) : m), Infinity);
  const exactTotal = c.rules.find((r) => r.kind === "exactTotal")?.count;
  const forbidden = new Set(c.rules.filter((r) => r.kind === "forbidTag").map((r) => r.tag));
  const counts = c.items.map(() => 0);
  const out: Record<string, number>[] = [];
  const walk = (i: number, cents: number, total: number) => {
    if (out.length >= limit) return;
    if (i === c.items.length) {
      const rec = Object.fromEntries(c.items.map((item, k) => [item.id, counts[k]]));
      if (budgetCheck(c, rec).ok) out.push(rec);
      return;
    }
    const item = c.items[i];
    const ban = item.tags.some((t) => forbidden.has(t));
    const maxCount = ban ? 0 : item.max;
    for (let k = 0; k <= maxCount; k++) {
      const nextCents = cents + k * item.price;
      const nextTotal = total + k;
      if (nextCents > maxCents) break;
      if (exactTotal !== undefined && nextTotal > exactTotal) break;
      counts[i] = k;
      walk(i + 1, nextCents, nextTotal);
      if (out.length >= limit) break;
    }
    counts[i] = 0;
  };
  walk(0, 0, 0);
  return out;
}

export function mechanicWords(c: NewChallenge): string[] {
  switch (c.kind) {
    case "tail":
      return c.rounds.map((r) => r.word);
    case "gullword":
      return c.words;
    case "radio":
      return c.rounds.flatMap((r) => (r.sound ? [r.sound] : []));
    default:
      return [];
  }
}

export function isCorrectMechanic(c: NewChallenge, value: Answer | undefined): boolean {
  switch (c.kind) {
    case "spring":
      return (
        Array.isArray(value) &&
        value.length === c.rounds.length &&
        c.rounds.every((r, i) => [r.answer, ...(r.also ?? [])].some((expected) => value[i] === expected.join(" ")))
      );
    case "room":
      return (
        isRecord(value) &&
        Object.keys(value).length === Object.keys(c.answer).length &&
        Object.entries(c.answer).every(([item, spot]) => value[item] === spot)
      );
    case "torn": {
      const base = c.strips.map((s) => s.id);
      return [base, ...(c.also ?? [])].some((expected) => sameList(value, expected));
    }
    case "contrast":
      return sameSet(value, c.items.map((i) => i.id));
    case "tail":
      return sameList(value, c.rounds.map((r) => r.word));
    case "protocol":
      return (
        isRecord(value) &&
        Object.keys(value).length === Object.keys(c.answer).length &&
        Object.entries(c.answer).every(([slot, word]) => value[slot] === word)
      );
    case "budget": {
      if (!isRecord(value)) return false;
      const validCounts = c.items.every((i) => {
        const n = Number(value[i.id] ?? 0);
        return Number.isInteger(n) && n >= 0 && n <= i.max;
      });
      return validCounts && budgetCheck(c, value).ok;
    }
    case "groupchat":
      return sameList(value, c.steps.map((s) => s.answer));
    case "comic":
      return isRecord(value) && Object.keys(value).length === c.panels.length && c.panels.every((p) => value[p.id] === p.answer);
    case "retell": {
      const slots = retellSlots(c);
      return isRecord(value) && Object.keys(value).length === slots.length && slots.every((s) => value[s.id] === s.answer);
    }
    case "radio":
      return sameList(value, c.rounds.map((r) => r.answer));
    case "gullword":
      return sameSet(value, c.words);
    case "proofread": {
      if (!isRecord(value)) return false;
      return proofSegments(c).every((s) => (value[s.id] ?? s.draft) === s.answer);
    }
  }
}

export function solutionMechanic(c: NewChallenge): Answer {
  switch (c.kind) {
    case "spring":
      return c.rounds.map((r) => r.answer.join(" "));
    case "room":
      return c.answer;
    case "torn":
      return c.strips.map((s) => s.id);
    case "contrast":
      return c.items.map((i) => i.id);
    case "tail":
      return c.rounds.map((r) => r.word);
    case "protocol":
      return c.answer;
    case "budget":
      return budgetSolutions(c, 1)[0] ?? {};
    case "groupchat":
      return c.steps.map((s) => s.answer);
    case "comic":
      return Object.fromEntries(c.panels.map((p) => [p.id, p.answer]));
    case "retell":
      return Object.fromEntries(retellSlots(c).map((s) => [s.id, s.answer]));
    case "radio":
      return c.rounds.map((r) => r.answer);
    case "gullword":
      return c.words;
    case "proofread":
      return Object.fromEntries(proofSegments(c).filter((s) => s.draft !== s.answer).map((s) => [s.id, s.answer]));
  }
}

export function initialAnswerMechanic(c: NewChallenge): Answer {
  switch (c.kind) {
    case "spring":
    case "torn":
    case "contrast":
    case "tail":
    case "groupchat":
    case "radio":
    case "gullword":
      return [];
    case "budget":
      return Object.fromEntries(c.items.map((i) => [i.id, 0]));
    case "room":
    case "protocol":
    case "comic":
    case "retell":
    case "proofread":
      return {};
  }
}

export function mistakeMechanic(c: NewChallenge, value: Answer, hint: string): string {
  const record = isRecord(value) ? value : {};
  const list = Array.isArray(value) ? value : [];
  switch (c.kind) {
    case "room": {
      if (c.items.some((i) => !record[i.id])) return "Расставьте все предметы на плане.";
      const wrong = c.items.find((i) => record[i.id] !== c.answer[i.id]);
      return wrong ? `Не на месте: ${wrong.de} (${wrong.ru}). Перечитайте заметки.` : hint;
    }
    case "torn": {
      if (list.length < c.strips.length) return `Сложите все полоски: ${list.length} из ${c.strips.length}.`;
      const valid = [c.strips.map((s) => s.id), ...(c.also ?? [])];
      if (!valid.some((a) => a[0] === list[0])) return "Проверьте начало: первая полоска не та.";
      if (!valid.some((a) => a.at(-1) === list.at(-1))) return "Проверьте концовку: последняя полоска не на месте.";
      return hint;
    }
    case "protocol": {
      const slots = protocolSlots(c);
      if (slots.some((s) => !record[s.slot])) return "Заполните все поля протокола.";
      const wrong = slots.find((s) => record[s.slot] !== c.answer[s.slot]);
      return wrong ? `Не сходится поле «${wrong.label}». Перечитайте вырезки из блокнота.` : hint;
    }
    case "budget": {
      const bad = budgetCheck(c, record).results.find((r) => !r.ok);
      return bad ? `Не выполнено условие: ${bad.rule.label}.` : hint;
    }
    case "comic": {
      if (c.panels.some((p) => !record[p.id])) return "Подберите реплику для каждого кадра.";
      const idx = c.panels.findIndex((p) => record[p.id] !== p.answer);
      return idx >= 0 ? `Проверьте кадр ${idx + 1} (${c.panels[idx].who}): реплика не подходит к ситуации.` : hint;
    }
    case "retell": {
      const slots = retellSlots(c);
      if (slots.some((s) => !record[s.id])) return "Переведите в 3-е лицо все выделенные слова.";
      const wrong = slots.find((s) => record[s.id] !== s.answer);
      return wrong ? `Проверьте слово «${wrong.from}»: для 3-го лица нужна другая форма.` : hint;
    }
    case "proofread": {
      const wrong = proofSegments(c).find((s) => (record[s.id] ?? s.draft) !== s.answer);
      return wrong ? wrong.why : hint;
    }
    default:
      return hint;
  }
}

export function validateMechanic(c: NewChallenge): boolean {
  switch (c.kind) {
    case "spring":
      return (
        c.rounds.length >= 2 &&
        c.rounds.every(
          (r) =>
            Boolean(r.ru && r.why && r.trigger) &&
            r.base.length >= 2 &&
            r.answer.length >= 3 &&
            sameBag(r.start, r.answer) &&
            r.start.join("|") !== r.answer.join("|") &&
            (r.also ?? []).every(
              (a) =>
                a.length === r.answer.length &&
                sameBag(a, r.start) &&
                a.join("|") !== r.start.join("|") &&
                a.join("|") !== r.answer.join("|"),
            ),
        )
      );
    case "room": {
      const items = c.items.map((i) => i.id);
      const spots = c.spots.map((s) => s.id);
      return (
        Boolean(c.title) &&
        c.notes.length >= 2 &&
        c.notes.every((n) => Boolean(n.de && n.ru)) &&
        c.items.length >= 3 &&
        c.spots.length >= c.items.length &&
        new Set(items).size === items.length &&
        new Set(spots).size === spots.length &&
        Object.keys(c.answer).length === c.items.length &&
        c.items.every((i) => Boolean(i.de && i.ru && i.icon) && spots.includes(c.answer[i.id])) &&
        new Set(Object.values(c.answer)).size === c.items.length
      );
    }
    case "torn": {
      const ids = c.strips.map((s) => s.id);
      return (
        Boolean(c.title) &&
        c.strips.length >= 4 &&
        new Set(ids).size === ids.length &&
        c.strips.every((s) => Boolean(s.id && s.de && s.ru)) &&
        (c.also ?? []).every((a) => a.length === ids.length && sameBag(a, ids))
      );
    }
    case "contrast": {
      const bayIds = c.bays.map((b) => b.id);
      const itemIds = c.items.map((i) => i.id);
      return (
        c.bays.length >= 2 &&
        c.bays.length <= 3 &&
        new Set(bayIds).size === bayIds.length &&
        c.bays.every((b) => Boolean(b.id && b.label)) &&
        c.items.length >= 4 &&
        new Set(itemIds).size === itemIds.length &&
        c.items.every((i) => Boolean(i.id && i.text && i.why) && bayIds.includes(i.bay)) &&
        bayIds.every((id) => c.items.some((i) => i.bay === id))
      );
    }
    case "tail":
      return (
        c.rounds.length >= 2 &&
        c.rounds.every((r) => {
          if (!r.ru || r.parts.length < 2 || !/^(der|die|das) /.test(r.word)) return false;
          const bare = r.word.slice(4);
          if (bare.toLowerCase() !== r.parts.join("").toLowerCase()) return false;
          const tail = r.parts.at(-1)!;
          const cuts = tailCuts(bare, tail);
          return cuts.length === 3 && new Set(cuts).size === 3 && cuts.includes(bare.length - tail.length);
        })
      );
    case "protocol": {
      const slots = protocolSlots(c);
      return (
        Boolean(c.title) &&
        c.clues.length >= 2 &&
        c.clues.every((cl) => Boolean(cl.who && cl.de && cl.ru)) &&
        slots.length >= 3 &&
        new Set(slots.map((s) => s.slot)).size === slots.length &&
        new Set(c.bank).size === c.bank.length &&
        c.bank.length > slots.length &&
        Object.keys(c.answer).length === slots.length &&
        slots.every((s) => Boolean(c.answer[s.slot]) && c.bank.includes(c.answer[s.slot]))
      );
    }
    case "budget": {
      const empty = Object.fromEntries(c.items.map((i) => [i.id, 0]));
      return (
        c.items.length >= 4 &&
        c.rules.length >= 3 &&
        new Set(c.items.map((i) => i.id)).size === c.items.length &&
        c.items.every((i) => Boolean(i.id && i.de && i.ru) && i.price > 0 && i.max >= 1) &&
        !budgetCheck(c, empty).ok &&
        budgetSolutions(c, 2).length >= 2
      );
    }
    case "groupchat": {
      const msgIds = c.messages.map((m) => m.id);
      return (
        Boolean(c.title) &&
        c.messages.length >= 3 &&
        new Set(msgIds).size === msgIds.length &&
        c.messages.every((m) => Boolean(m.id && m.who && m.de && m.ru)) &&
        c.steps.length >= 2 &&
        c.steps.every(
          (s) =>
            Boolean(s.prompt) &&
            msgIds.includes(s.replyTo) &&
            s.options.length >= 2 &&
            s.options.some((o) => o.id === s.answer),
        )
      );
    }
    case "comic": {
      const ids = c.panels.map((p) => p.id);
      const answers = c.panels.map((p) => p.answer);
      return (
        c.panels.length >= 3 &&
        new Set(ids).size === ids.length &&
        new Set(answers).size === answers.length &&
        c.panels.every((p) => Boolean(p.id && p.scene && p.who && p.art && p.answer && p.ru)) &&
        (c.extra ?? []).every((e) => !answers.includes(e))
      );
    }
    case "retell": {
      const slots = retellSlots(c);
      const ids = slots.map((s) => s.id);
      return (
        Boolean(c.who && c.quote && c.ru) &&
        slots.length >= 3 &&
        new Set(ids).size === ids.length &&
        slots.every(
          (s) =>
            Boolean(s.id && s.from && s.answer) &&
            s.from !== s.answer &&
            s.options.length >= 2 &&
            new Set(s.options).size === s.options.length &&
            s.options.includes(s.answer),
        )
      );
    }
    case "radio":
      return (
        c.rounds.length >= 2 &&
        c.rounds.every(
          (r) =>
            Boolean(r.who && r.hidden && r.ru) &&
            (Boolean(r.before) || Boolean(r.after)) &&
            r.questions.length >= 3 &&
            new Set(r.questions.map((q) => q.id)).size === r.questions.length &&
            r.questions.some((q) => q.id === r.answer) &&
            r.questions.every((q) => q.id === r.answer || Boolean(q.why)),
        )
      );
    case "gullword":
      return (
        c.words.length >= 3 &&
        new Set(c.words).size === c.words.length &&
        c.words.every((w) => /^\p{L}{3,9}$/u.test(w.replace(/^(der|die|das) /, "")))
      );
    case "proofread": {
      const slots = proofSegments(c);
      const ids = slots.map((s) => s.id);
      const wrong = slots.filter((s) => s.draft !== s.answer).length;
      const right = slots.filter((s) => s.draft === s.answer).length;
      return (
        Boolean(c.author) &&
        c.checklist.length >= 2 &&
        slots.length >= 4 &&
        new Set(ids).size === ids.length &&
        wrong >= 2 &&
        right >= 1 &&
        slots.every(
          (s) =>
            Boolean(s.id && s.draft && s.answer && s.why) &&
            s.options.length >= 2 &&
            new Set(s.options).size === s.options.length &&
            s.options.includes(s.draft) &&
            s.options.includes(s.answer),
        )
      );
    }
  }
}

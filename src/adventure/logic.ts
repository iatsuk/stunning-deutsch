import type { AdventureChallenge } from "../content";

export function challengeSolved(challenge: AdventureChallenge, selected: string[]): boolean {
  if (challenge.kind === "note") {
    return selected.length === challenge.fields.length
      && challenge.fields.every((field, index) => field.answers.some((answer) => normalizeAnswer(answer) === normalizeAnswer(selected[index] ?? "")));
  }
  if (challenge.kind === "negotiation") return selected.length === 1 && negotiationNode(challenge, selected[0]).terminal === true;
  if (challenge.kind === "clock") return selected.length === 1 && selected[0] === challenge.answer;
  if (challenge.kind === "quantity") {
    return selected.length === challenge.items.length && challenge.items.every((item, index) => selected[index] === String(item.answer));
  }
  if (challenge.kind === "match") {
    return selected.length === challenge.slots.length && challenge.slots.every((slot, index) => selected[index] === slot.answer);
  }
  if (challenge.kind === "order") {
    return selected.length === challenge.tokens.length && new Set(selected).size === selected.length
      && selected.every((id, index) => /^\d+$/.test(id) && challenge.tokens[Number(id)] === challenge.tokens[index]);
  }
  return [challenge.answer, ...(challenge.alternatives ?? [])].some((answer) => selected.length === answer.length
    && new Set(selected).size === selected.length && selected.every((id) => answer.includes(id)));
}

/** Порядок зависит только от seed: перезагрузка его сохраняет, а повтор эпизода меняет раскладку вариантов. */
export function shuffled<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let state = seed >>> 0;
  for (let i = result.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function formatPhone(digits: string): string {
  return [digits.slice(0, 4), digits.slice(4, 6), digits.slice(6, 8), digits.slice(8)].filter(Boolean).join(" ");
}

/** Введённый ответ сравнивается без регистра и лишних пробелов; NFC уравнивает умлаут из буквы с точками и готовую букву. */
export function normalizeAnswer(text: string): string {
  return text.normalize("NFC").trim().toLocaleLowerCase("de").replace(/\s+/g, " ");
}

/** Узел разговора после сохранённого пути выборов. Испорченный путь начинает разговор заново, чтобы старое сохранение открылось. */
export function negotiationNode(challenge: Extract<AdventureChallenge, { kind: "negotiation" }>, path: string) {
  const start = challenge.nodes.find((node) => node.id === challenge.start)!;
  let node = start;
  for (const id of path.split(",").filter(Boolean)) {
    const choice = node.choices[Number(id)];
    if (!/^\d+$/.test(id) || !choice || node.terminal) return start;
    node = challenge.nodes.find((next) => next.id === choice.next)!;
  }
  return node;
}

/** Повтор эпизода увеличивает seed, поэтому задание по кругу сменяет основной вариант и запасные. */
export function challengeVariant(challenge: AdventureChallenge, seed: number): AdventureChallenge {
  if (!challenge.variants?.length) return challenge;
  return [challenge, ...challenge.variants][(Math.max(1, seed) - 1) % (challenge.variants.length + 1)];
}

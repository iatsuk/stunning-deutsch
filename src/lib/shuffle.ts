// Детерминированное перемешивание: порядок зависит только от seed и не прыгает между рендерами.

export function shuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h ^= h >>> 13;
    const j = Math.abs(h) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Как shuffle, но результат всегда отличается от исходного порядка: плитки не лежат готовым ответом. */
export function scramble<T>(items: T[], seed: string): T[] {
  const out = shuffle(items, seed);
  const same = out.every((item, i) => item === items[i]);
  return same && out.length > 1 ? [...out.slice(1), out[0]] : out;
}

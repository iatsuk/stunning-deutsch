// Состояние мира истории: часы (событие приближается по сегментам) и отношения с героями.
// Методика — A1-STORYCRAFT.md, «Фронты и часы клуба» и «Побочные задания». Состояние не хранится
// отдельно: оно складывается из последствий пройденных узлов, поэтому перезагрузка и повтор
// сцены дают то же самое.

export type World = Record<string, number>;
/** Последствие: на сколько сдвинуть часы или отношение. */
export type Effects = Record<string, number>;
/** Условие: значение не меньше min и не больше max. */
export type Cond = { q: string; min?: number; max?: number };

type Track = { label: string; icon: string; size?: number };

/** Часы имеют размер (сегменты), отношения — нет. */
export const TRACKS: Record<string, Track> = {
  gull: { label: "Чайка наглеет", icon: "🐦", size: 6 },
  rumours: { label: "Слухи Фрауке", icon: "🗞️", size: 6 },
  weather: { label: "Шторм близко", icon: "🌧️", size: 8 },
  frauke: { label: "Доверие Фрауке", icon: "🐟" },
  nils: { label: "Доверие Нильса", icon: "👓" },
  petersen: { label: "Доверие Петерсен", icon: "🗂️" },
};

export function applyEffects(
  world: World,
  effects: Effects | undefined,
): World {
  if (!effects) return world;
  const next = { ...world };
  for (const [q, by] of Object.entries(effects)) {
    const size = TRACKS[q]?.size;
    const value = (next[q] ?? 0) + by;
    next[q] = Math.max(0, size ? Math.min(size, value) : value);
  }
  return next;
}

export const holds = (conds: Cond[], world: World) =>
  conds.every(({ q, min, max }) => {
    const value = world[q] ?? 0;
    return (
      (min === undefined || value >= min) && (max === undefined || value <= max)
    );
  });

/** Подпись последствия для переписки: «🐦 Чайка наглеет +1». */
export const effectText = (effects: Effects) =>
  Object.entries(effects)
    .map(
      ([q, by]) =>
        `${TRACKS[q]?.icon ?? ""} ${TRACKS[q]?.label ?? q} ${by > 0 ? "+" : "−"}${Math.abs(by)}`,
    )
    .join(" · ");

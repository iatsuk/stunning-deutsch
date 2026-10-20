import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import type { Row } from "../content";
import { useReducedMotion } from "../hooks";
import { De, PlayButton } from "../markup";

const SLOTS = [
  { ru: "Позиция 1", short: "Поз. 1", de: "Vorfeld" },
  { ru: "Глагол", short: "Глагол", de: "Verb" },
  { ru: "Середина", short: "Середина", de: "Mittelfeld" },
  { ru: "Конец", short: "Конец", de: "Satzende" },
];

type Point = { x: number; y: number };

/**
 * Схема предложения из четырёх полей. Плитки с одинаковым ключом при смене
 * состояния переезжают на новое место (FLIP): видно, как слова меняются
 * местами, а глагол остаётся в своей колонке.
 */
export function SentenceView({ rows, focus }: { rows: Row[]; focus?: number[] }) {
  const grid = useRef<HTMLDivElement>(null);
  const positions = useRef(new Map<string, Point>());
  const reduced = useReducedMotion();

  const measure = () => {
    const el = grid.current;
    const map = new Map<string, Point & { tile: HTMLElement }>();
    if (!el) return map;
    const origin = el.getBoundingClientRect();
    el.querySelectorAll<HTMLElement>("[data-tile]").forEach((tile) => {
      const rect = tile.getBoundingClientRect();
      map.set(tile.dataset.tile!, { x: rect.left - origin.left, y: rect.top - origin.top, tile });
    });
    return map;
  };

  useLayoutEffect(() => {
    const now = measure();
    const before = positions.current;
    if (!reduced && before.size) {
      for (const [key, { x, y, tile }] of now) {
        const prev = before.get(key);
        if (prev) {
          const dx = prev.x - x;
          const dy = prev.y - y;
          if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
            tile.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
              duration: 700,
              easing: "cubic-bezier(.2,.75,.2,1)",
            });
          }
        } else {
          tile.animate(
            [
              { opacity: 0, transform: "translateY(10px) scale(.92)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: 420, delay: 220, easing: "ease-out", fill: "backwards" },
          );
        }
      }
    }
    positions.current = new Map([...now].map(([key, { x, y }]) => [key, { x, y }]));
  }, [rows]);

  // При изменении размера просто запоминаем новые места, без анимации.
  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      positions.current = new Map([...measure()].map(([key, { x, y }]) => [key, { x, y }]));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sentence">
      <div className="sgrid" ref={grid}>
        {SLOTS.map((slot, i) => (
          <div key={i} className="slabel" data-slot={i}>
            <span className="slabel-long">{slot.ru}</span>
            <span className="slabel-short">{slot.short}</span>
            <small>{slot.de}</small>
          </div>
        ))}
        {rows.map((row, r) => {
          const lastSlot = row.slots.findLastIndex((tiles) => tiles.length);
          const dim = focus?.length ? !focus.includes(r) : false;
          return (
            <Fragment key={r}>
              {row.slots.map((tiles, s) => (
                <div
                  key={s}
                  className="slot"
                  data-slot={s}
                  data-empty={(!tiles.length && !(s === lastSlot && row.punct)) || undefined}
                  data-dim={dim || undefined}
                >
                  {tiles.map((tile) => (
                    <span key={tile.key} className="tile" data-tile={`${r}:${tile.key}`} data-verb={s === 1 || s === 3 || undefined}>
                      <De text={tile.text} />
                    </span>
                  ))}
                  {s === lastSlot && row.punct && (
                    <span className="tile punct" data-tile={`${r}:·punct`}>
                      {row.punct}
                    </span>
                  )}
                </div>
              ))}
              {row.slots[3].length > 0 && <div className="klammer" aria-hidden="true" />}
              <div className="srow-ru" data-dim={dim || undefined}>
                <PlayButton src={row.audio} />
                {row.ru}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

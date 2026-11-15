import type { ReactNode } from "react";
import {
  Bingo,
  Calendar,
  Chat,
  ClockGame,
  Coins,
  Docks,
  Gaps,
  Gull,
  Letter,
  Letters,
  Lock,
  Memory,
  Odd,
  Oral,
  Pairs,
  Scene,
  Sort,
  Speak,
  Spot,
  Verdict,
  Write,
  type GameProps,
} from "./games";
import { Ads, Algo, Cipher, Compound, Contra, Grid, Lift, Planner, Portrait, Sounds, Spy, Tree, Twenty, Weather } from "./minigames";
import { SceneView } from "./SceneView";
import type { Answer, Challenge } from "./types";
import type { World } from "./world";
/** Эти игры завершаются сами: кнопка проверки там не нужна. */
export const AUTOMATIC: Challenge["kind"][] = [
  "play",
  "chat",
  "memory",
  "bingo",
  "scene",
  "odd",
  "letters",
  "speak",
  "docks",
  "gull",
  "lock",
  "letter",
  "oral",
  "sounds",
  "compound",
  "lift",
  "spy",
  "twenty",
  "weather",
];

export function ChallengeView({
  c,
  game,
  rich,
  world,
  known,
  rules,
}: {
  c: Challenge;
  game: GameProps;
  rich: (s: string, known?: Set<string>) => ReactNode;
  /** Состояние мира до сцены: часы и отношения из прошлых сцен. */
  world?: World;
  /** Слова, которые прошлые сцены главы уже показали. */
  known?: string[];
  /** Правила, которые прошлые сцены главы уже показали. */
  rules?: string[];
}) {
  const shown: Answer = game.value;
  const list = Array.isArray(shown) ? shown : [];
  const record =
    typeof shown === "object" && !Array.isArray(shown) ? shown : {};
  const { disabled, change } = game;
  return (
    <>
      {c.kind === "play" && <SceneView c={c} {...game} rich={rich} world={world} known={known} rules={rules} />}
      {c.kind === "match" && <Pairs c={c} {...game} />}
      {c.kind === "write" && <Write c={c} {...game} />}
      {c.kind === "bingo" && <Bingo c={c} {...game} />}
      {c.kind === "scene" && <Scene c={c} {...game} />}
      {c.kind === "odd" && <Odd c={c} {...game} />}
      {c.kind === "letters" && <Letters c={c} {...game} />}
      {c.kind === "speak" && <Speak c={c} {...game} />}
      {c.kind === "docks" && <Docks c={c} {...game} />}
      {c.kind === "gull" && <Gull c={c} {...game} />}
      {c.kind === "lock" && <Lock c={c} {...game} />}
      {c.kind === "letter" && <Letter c={c} {...game} />}
      {c.kind === "oral" && <Oral c={c} {...game} />}
      {c.kind === "chat" && <Chat c={c} {...game} />}
      {c.kind === "verdict" && <Verdict c={c} {...game} />}
      {c.kind === "gaps" && <Gaps c={c} {...game} />}
      {c.kind === "sort" && <Sort c={c} {...game} />}
      {c.kind === "spot" && <Spot c={c} {...game} />}
      {c.kind === "memory" && <Memory c={c} {...game} />}
      {c.kind === "clock" && <ClockGame c={c} {...game} />}
      {c.kind === "coins" && <Coins c={c} {...game} />}
      {c.kind === "calendar" && <Calendar c={c} {...game} />}
      {c.kind === "sounds" && <Sounds c={c} {...game} />}
      {c.kind === "compound" && <Compound c={c} {...game} />}
      {c.kind === "lift" && <Lift c={c} {...game} />}
      {c.kind === "grid" && <Grid c={c} {...game} />}
      {c.kind === "contra" && <Contra c={c} {...game} />}
      {c.kind === "planner" && <Planner c={c} {...game} />}
      {c.kind === "ads" && <Ads c={c} {...game} />}
      {c.kind === "cipher" && <Cipher c={c} {...game} />}
      {c.kind === "tree" && <Tree c={c} {...game} />}
      {c.kind === "portrait" && <Portrait c={c} {...game} />}
      {c.kind === "spy" && <Spy c={c} {...game} />}
      {c.kind === "twenty" && <Twenty c={c} {...game} />}
      {c.kind === "weather" && <Weather c={c} {...game} />}
      {c.kind === "algo" && <Algo c={c} {...game} />}
      {c.kind === "order" && (
        <div className="moin-order">
          <div
            className="moin-sentence"
            aria-label="Собранная фраза"
            aria-live="polite"
          >
            {list.length ? (
              list.map((t, i) => (
                <button
                  type="button"
                  disabled={disabled}
                  key={i}
                  onClick={() => change(list.filter((_, j) => j !== i))}
                  aria-label={`Убрать ${t}`}
                >
                  {t} <span>×</span>
                </button>
              ))
            ) : (
              <span>Нажимайте на фрагменты ниже</span>
            )}
          </div>
          <div className="moin-tiles">
            {c.tiles.map((t, i) => {
              const used =
                list.filter((x) => x === t).length >=
                c.tiles.slice(0, i + 1).filter((x) => x === t).length;
              return (
                <button
                  type="button"
                  key={i}
                  disabled={disabled || used}
                  onClick={() => change([...list, t])}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="link-button"
            disabled={disabled || !list.length}
            onClick={() => change([])}
          >
            Очистить фразу
          </button>
        </div>
      )}
      {c.kind === "quantity" && (
        <div className="moin-quantities">
          {c.items.map((i) => (
            <div key={i.id}>
              <span lang="de">{i.text}</span>
              <div>
                <button
                  type="button"
                  aria-label={`Уменьшить ${i.text}`}
                  disabled={disabled || Number(record[i.id] ?? 0) <= 0}
                  onClick={() =>
                    change({ ...record, [i.id]: Number(record[i.id] ?? 0) - 1 })
                  }
                >
                  −
                </button>
                <output aria-label={`Количество ${i.text}`}>
                  {record[i.id] ?? 0}
                </output>
                <button
                  type="button"
                  aria-label={`Добавить ${i.text}`}
                  disabled={disabled || Number(record[i.id] ?? 0) >= i.max}
                  onClick={() =>
                    change({ ...record, [i.id]: Number(record[i.id] ?? 0) + 1 })
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {c.kind === "code" && (
        <div className="moin-dial">
          <label>
            {c.label ?? (c.length > 2 ? "Номер телефона" : "Номер ячейки")}
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              disabled={disabled}
              value={typeof shown === "string" ? shown : ""}
              onChange={(e) =>
                change(e.target.value.replace(/\D/g, "").slice(0, c.length))
              }
              maxLength={c.length}
            />
          </label>
          <div className="moin-keypad">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((n) => (
              <button
                type="button"
                key={n}
                disabled={disabled || String(shown).length >= c.length}
                onClick={() => change(String(shown) + n)}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              disabled={disabled}
              aria-label="Удалить последнюю цифру"
              onClick={() => change(String(shown).slice(0, -1))}
            >
              ⌫
            </button>
          </div>
        </div>
      )}
    </>
  );
}

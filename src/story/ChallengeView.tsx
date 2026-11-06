import type { ReactNode } from "react";
import { shuffle } from "../lib/shuffle";
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
  Walk,
  Write,
  type GameProps,
} from "./games";
import { SceneView } from "./SceneView";
import type { Answer, Challenge } from "./types";
import type { World } from "./world";

// Отрисовка любого действия по его виду. Нужна и шагу истории, и сцене, куда игра встроена.

export const GAME_NAMES: Record<Challenge["kind"], string> = {
  play: "Сцена",
  choice: "Вывод",
  order: "Сборка фразы",
  match: "Пары",
  quantity: "Заказ",
  code: "Набор номера",
  write: "Запись",
  bingo: "Лото",
  scene: "Найди на картинке",
  odd: "Лишнее слово",
  letters: "Буквы",
  speak: "Вслух",
  docks: "Три причала",
  gull: "Наперегонки с чайкой",
  lock: "Кодовый замок",
  letter: "Письмо по образцу",
  oral: "Вслух, как на экзамене",
  chat: "Разговор",
  verdict: "Штамп",
  gaps: "Записка с пропусками",
  sort: "Раскладка",
  spot: "Улика в тексте",
  memory: "Карточки",
  clock: "Часы",
  route: "Прогулка",
  coins: "Касса",
  calendar: "Календарь",
};
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
];

export function ChallengeView({
  c,
  game,
  beatId,
  rich,
  world,
  known,
  rules,
}: {
  c: Challenge;
  game: GameProps;
  beatId: string;
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
      {c.kind === "route" && <Walk c={c} {...game} />}
      {c.kind === "coins" && <Coins c={c} {...game} />}
      {c.kind === "calendar" && <Calendar c={c} {...game} />}
      {c.kind === "choice" && (
        <fieldset className="moin-choices" disabled={disabled}>
          <legend className="moin-sr">Варианты ответа</legend>
          {shuffle(c.options, beatId).map((o, i) => (
            <label key={o.id} className={shown === o.id ? "is-selected" : ""}>
              <input
                type="radio"
                name={beatId}
                value={o.id}
                checked={shown === o.id}
                onChange={() => change(o.id)}
              />
              <span className="moin-option-n">
                {String.fromCharCode(65 + i)}
              </span>
              <span>{o.text}</span>
            </label>
          ))}
        </fieldset>
      )}
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

import { Fragment, useMemo, useState } from "react";
import { preis, uhrzeit } from "../lib/german";
import { shuffle } from "../lib/shuffle";
import { ClockView } from "../stage/Clock";
import { canMove, coinTotal, MOVES, placeKey, walk } from "./logic";
import type { Answer, ChatTurn, Challenge, Move } from "./types";

// Игровые действия истории. Всё управляется нажатием и с клавиатуры:
// перетаскивания и таймеров нет, ошибка только даёт подсказку.

type Game<K extends Challenge["kind"]> = {
  c: Extract<Challenge, { kind: K }>;
  value: Answer;
  seed: string;
  disabled: boolean;
  checked: boolean;
  change: (value: Answer) => void;
  win: () => void;
};

const asList = (value: Answer) => (Array.isArray(value) ? value : []);
const asRecord = (value: Answer) =>
  typeof value === "object" && !Array.isArray(value) ? value : {};
const lang = (text: string) => (/[а-яё]/i.test(text) ? undefined : "de");

export function Pairs({
  c,
  value,
  seed,
  disabled,
  checked,
  change,
}: Game<"match">) {
  const record = asRecord(value);
  const [picked, setPicked] = useState<string | null>(null);
  const active = picked ?? c.left.find((i) => !record[i.id])?.id ?? null;
  const right = useMemo(() => shuffle(c.right, seed), [c, seed]);
  const number = (id: string) =>
    c.left.findIndex((i) => record[i.id] === id) + 1;
  function join(id: string) {
    if (!active) return;
    const rest = Object.entries(record).filter(
      ([left, r]) => left !== active && r !== id,
    );
    setPicked(null);
    change({ ...Object.fromEntries(rest), [active]: id });
  }
  return (
    <div className="moin-matches">
      <div>
        {c.left.map((i, n) => (
          <button
            type="button"
            key={i.id}
            disabled={disabled}
            aria-pressed={active === i.id}
            data-wrong={
              (checked && record[i.id] && record[i.id] !== c.answer[i.id]) ||
              undefined
            }
            onClick={() => setPicked(i.id)}
          >
            {record[i.id] && <b>{n + 1}</b>}
            <span lang={lang(i.text)}>{i.text}</span>
          </button>
        ))}
      </div>
      <div>
        {right.map((r) => (
          <button
            type="button"
            key={r.id}
            disabled={disabled}
            data-joined={number(r.id) > 0 || undefined}
            onClick={() => join(r.id)}
          >
            {number(r.id) > 0 && <b>{number(r.id)}</b>}
            <span lang={lang(r.text)}>{r.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Line({ who, turn }: { who: string; turn: ChatTurn }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="moin-bubble">
      <small>{who}</small>
      <p lang="de">{turn.say}</p>
      {open && <small>{turn.ru}</small>}
      <button
        type="button"
        className="link-button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "Скрыть перевод" : "Перевод"}
      </button>
    </div>
  );
}

export function Chat({ c, value, seed, disabled, change, win }: Game<"chat">) {
  const said = asList(value);
  const [missed, setMissed] = useState<string[]>([]);
  const [reaction, setReaction] = useState("");
  const current = c.turns[said.length];
  function reply(id: string, why: string) {
    if (id !== current.answer) {
      setMissed([...missed, id]);
      setReaction(why);
      return;
    }
    const next = [...said, id];
    setMissed([]);
    setReaction("");
    change(next);
    if (next.length === c.turns.length) win();
  }
  return (
    <div className="moin-chat" aria-live="polite">
      {c.turns.slice(0, said.length + 1).map((turn, i) => (
        <Fragment key={i}>
          <Line who={c.who} turn={turn} />
          {said[i] && (
            <p className="moin-bubble is-you" lang="de">
              {turn.options.find((o) => o.id === said[i])?.text}
            </p>
          )}
        </Fragment>
      ))}
      {reaction && <p className="moin-chat-reaction">{reaction}</p>}
      {current && !disabled && (
        <div className="moin-chat-replies">
          {shuffle(current.options, `${seed}-${said.length}`).map((o) => (
            <button
              type="button"
              key={o.id}
              lang="de"
              disabled={missed.includes(o.id)}
              onClick={() => reply(o.id, o.why)}
            >
              {o.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Verdict({
  c,
  value,
  disabled,
  checked,
  change,
}: Game<"verdict">) {
  const record = asRecord(value);
  return (
    <ul className="moin-verdict">
      {c.items.map((item) => {
        const wrong =
          checked &&
          record[item.id] &&
          (record[item.id] === "yes") !== item.answer;
        return (
          <li key={item.id} data-wrong={wrong || undefined}>
            <p lang={lang(item.text)}>{item.text}</p>
            <div role="group" aria-label={item.text}>
              {(["yes", "no"] as const).map((stamp, i) => (
                <button
                  type="button"
                  key={stamp}
                  className="moin-stamp"
                  data-stamp={stamp}
                  aria-pressed={record[item.id] === stamp}
                  disabled={disabled}
                  onClick={() => change({ ...record, [item.id]: stamp })}
                >
                  {c.labels[i]}
                </button>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function Gaps({
  c,
  value,
  seed,
  disabled,
  checked,
  change,
}: Game<"gaps">) {
  const filled = c.answer.map((_, i) => asList(value)[i] ?? "");
  const [picked, setPicked] = useState<number | null>(null);
  const empty = filled.indexOf("");
  const active = picked ?? (empty < 0 ? null : empty);
  const bank = useMemo(() => shuffle(c.bank, seed), [c, seed]);
  function put(word: string) {
    if (active === null) return;
    setPicked(null);
    change(filled.map((w, i) => (i === active ? word : w)));
  }
  function clear(index: number) {
    setPicked(index);
    change(filled.map((w, i) => (i === index ? "" : w)));
  }
  let gap = -1;
  return (
    <>
      <p className="moin-gaps" lang="de">
        {c.parts.map((part, i) => {
          if (part !== null) return <Fragment key={i}>{part}</Fragment>;
          const index = ++gap;
          return (
            <button
              type="button"
              key={i}
              className="moin-gap"
              disabled={disabled}
              data-active={(!disabled && active === index) || undefined}
              data-wrong={
                (checked &&
                  filled[index] &&
                  filled[index] !== c.answer[index]) ||
                undefined
              }
              aria-label={`Пропуск ${index + 1}${filled[index] ? `: ${filled[index]}` : ""}`}
              onClick={() => (filled[index] ? clear(index) : setPicked(index))}
            >
              {filled[index] || "…"}
            </button>
          );
        })}
      </p>
      <div className="moin-tiles" aria-label="Слова для пропусков">
        {bank.map((word) => (
          <button
            type="button"
            key={word}
            lang="de"
            disabled={disabled || filled.includes(word)}
            onClick={() => put(word)}
          >
            {word}
          </button>
        ))}
      </div>
    </>
  );
}

export function Sort({
  c,
  value,
  seed,
  disabled,
  checked,
  change,
}: Game<"sort">) {
  const record = asRecord(value);
  const [picked, setPicked] = useState<string | null>(null);
  const cards = useMemo(() => shuffle(c.cards, seed), [c, seed]);
  const pool = cards.filter((card) => !record[card.id]);
  const active = pool.find((card) => card.id === picked) ?? pool[0];
  function drop(bin: string) {
    if (!active) return;
    setPicked(null);
    change({ ...record, [active.id]: bin });
  }
  function back(id: string) {
    change(
      Object.fromEntries(Object.entries(record).filter(([k]) => k !== id)),
    );
  }
  return (
    <div className="moin-sort">
      <div className="moin-tiles" aria-label="Карточки">
        {pool.length ? (
          pool.map((card) => (
            <button
              type="button"
              key={card.id}
              lang={lang(card.text)}
              disabled={disabled}
              aria-pressed={active?.id === card.id}
              onClick={() => setPicked(card.id)}
            >
              {card.icon && <span aria-hidden="true">{card.icon} </span>}
              {card.text}
            </button>
          ))
        ) : (
          <span>Все карточки разложены. Проверьте результат.</span>
        )}
      </div>
      <div className="moin-bins">
        {c.bins.map((bin) => (
          <div className="moin-bin" key={bin.id}>
            <button
              type="button"
              lang={lang(bin.text)}
              disabled={disabled || !active}
              aria-label={
                active ? `Положить ${active.text} в ${bin.text}` : bin.text
              }
              onClick={() => drop(bin.id)}
            >
              {bin.text}
            </button>
            <div>
              {cards
                .filter((card) => record[card.id] === bin.id)
                .map((card) => (
                  <button
                    type="button"
                    key={card.id}
                    lang={lang(card.text)}
                    disabled={disabled}
                    data-wrong={
                      (checked && c.answer[card.id] !== bin.id) || undefined
                    }
                    aria-label={`Вернуть ${card.text}`}
                    onClick={() => back(card.id)}
                  >
                    {card.icon && <span aria-hidden="true">{card.icon} </span>}
                    {card.text}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Spot({ c, value, disabled, checked, change }: Game<"spot">) {
  const picked = asList(value);
  const single = c.answer.length === 1;
  function toggle(id: string) {
    if (picked.includes(id)) change(picked.filter((x) => x !== id));
    else change(single ? [id] : [...picked, id]);
  }
  return (
    <>
      <div className="moin-source">
        <div className="kicker">{c.title}</div>
        {c.lines.map((tokens, line) => (
          <p key={line} lang="de">
            {tokens.map((token, i) => {
              const id = `${line}:${i}`;
              return (
                <Fragment key={id}>
                  {i > 0 && " "}
                  <button
                    type="button"
                    className="moin-token"
                    disabled={disabled}
                    aria-pressed={picked.includes(id)}
                    data-wrong={
                      (checked &&
                        picked.includes(id) &&
                        !c.answer.includes(id)) ||
                      undefined
                    }
                    onClick={() => toggle(id)}
                  >
                    {token}
                  </button>
                </Fragment>
              );
            })}
          </p>
        ))}
      </div>
      {!single && (
        <p className="moin-count">
          Выбрано: {picked.length} из {c.answer.length}
        </p>
      )}
    </>
  );
}

export function Memory({
  c,
  value,
  seed,
  disabled,
  change,
  win,
}: Game<"memory">) {
  const found = asList(value);
  const [open, setOpen] = useState<string[]>([]);
  const cards = useMemo(
    () =>
      shuffle(
        c.pairs.flatMap((p) => [
          { id: `${p.id}:de`, pair: p.id, text: p.de, lang: "de" },
          { id: `${p.id}:ru`, pair: p.id, text: p.ru, lang: undefined },
        ]),
        seed,
      ),
    [c, seed],
  );
  // Неверная пара остаётся открытой до следующего нажатия: читать можно без спешки.
  function flip(id: string, pair: string) {
    const turned = open.length === 2 ? [id] : [...open, id];
    if (turned.length === 2 && turned[0].split(":")[0] === pair) {
      const next = [...found, pair];
      setOpen([]);
      change(next);
      if (next.length === c.pairs.length) win();
    } else setOpen(turned);
  }
  return (
    <>
      <div className="moin-memory">
        {cards.map((card, i) => {
          const done = found.includes(card.pair);
          const shown = done || open.includes(card.id);
          return (
            <button
              type="button"
              key={card.id}
              className="moin-card"
              lang={shown ? card.lang : undefined}
              data-state={done ? "found" : shown ? "open" : "closed"}
              disabled={disabled || shown}
              aria-label={shown ? undefined : `Карточка ${i + 1}, закрыта`}
              onClick={() => flip(card.id, card.pair)}
            >
              {shown ? card.text : "?"}
            </button>
          );
        })}
      </div>
      <p className="moin-count" aria-live="polite">
        Пар открыто: {found.length} из {c.pairs.length}
      </p>
    </>
  );
}

export function ClockGame({ c, value, disabled, change }: Game<"clock">) {
  const clock = uhrzeit(typeof value === "string" ? value : c.start);
  function shift(delta: number) {
    const total =
      (((clock.hours * 60 + clock.minutes + delta) % 1440) + 1440) % 1440;
    const pad = (n: number) => String(n).padStart(2, "0");
    change(`${pad(Math.floor(total / 60))}:${pad(total % 60)}`);
  }
  return (
    <div className="moin-clock">
      <ClockView clock={{ ...clock, audio: [] }} showReading={false} />
      <div className="moin-clock-controls" aria-label="Установить время">
        <div>
          <span>Часы</span>
          <button
            type="button"
            disabled={disabled}
            aria-label="На час назад"
            onClick={() => shift(-60)}
          >
            −1
          </button>
          <button
            type="button"
            disabled={disabled}
            aria-label="На час вперёд"
            onClick={() => shift(60)}
          >
            +1
          </button>
        </div>
        <div>
          <span>Минуты</span>
          <button
            type="button"
            disabled={disabled}
            aria-label={`Убавить ${c.step} минут`}
            onClick={() => shift(-c.step)}
          >
            −{c.step}
          </button>
          <button
            type="button"
            disabled={disabled}
            aria-label={`Добавить ${c.step} минут`}
            onClick={() => shift(c.step)}
          >
            +{c.step}
          </button>
        </div>
      </div>
    </div>
  );
}

const ARROWS: Record<Move, string> = {
  links: "↰",
  geradeaus: "↑",
  rechts: "↱",
};
const CELL = 110;
const EDGE = 56;
const point = (n: number) => EDGE + n * CELL;

export function Walk({ c, value, disabled, change }: Game<"route">) {
  const moves = asList(value);
  const path = walk(c, moves);
  const at = path[path.length - 1];
  const here = c.places[placeKey(at)];
  const visited = new Set(path.map(placeKey));
  // Угол копится, чтобы стрелка поворачивала коротким путём, а не через весь круг.
  const angle = moves.reduce(
    (sum, move) => sum + (move === "links" ? -90 : move === "rechts" ? 90 : 0),
    c.start.heading * 90,
  );
  const xs = Array.from({ length: c.width }, (_, x) => x);
  const ys = Array.from({ length: c.height }, (_, y) => y);
  const size = (count: number) => (count - 1) * CELL + EDGE * 2;
  return (
    <div className="moin-walk">
      <svg
        viewBox={`0 0 ${size(c.width)} ${size(c.height)}`}
        role="img"
        aria-label="Схема квартала с вашим положением"
      >
        {ys.map((y) => (
          <line
            key={`y${y}`}
            className="moin-street"
            x1={point(0)}
            x2={point(c.width - 1)}
            y1={point(y)}
            y2={point(y)}
          />
        ))}
        {xs.map((x) => (
          <line
            key={`x${x}`}
            className="moin-street"
            y1={point(0)}
            y2={point(c.height - 1)}
            x1={point(x)}
            x2={point(x)}
          />
        ))}
        <polyline
          className="moin-walked"
          points={path.map((p) => `${point(p.x)},${point(p.y)}`).join(" ")}
        />
        {Object.entries(c.places).map(([key, place]) => {
          const [x, y] = key.split(",").map(Number);
          return visited.has(key) ? (
            <text key={key} x={point(x)} y={point(y) + 34} lang="de">
              {place}
            </text>
          ) : (
            <g key={key} className="moin-unknown">
              <circle cx={point(x)} cy={point(y)} r="11" />
              <text x={point(x)} y={point(y) + 5}>
                ?
              </text>
            </g>
          );
        })}
        <path
          className="moin-walker"
          d="M0 -14 L11 11 L0 5 L-11 11 Z"
          style={{
            transform: `translate(${point(at.x)}px, ${point(at.y)}px) rotate(${angle}deg)`,
          }}
        />
      </svg>
      <p className="moin-count" role="status" lang="de">
        {here ? `Hier ist ${here}.` : "Eine Kreuzung."}
      </p>
      <div className="moin-walk-moves">
        {MOVES.map((move) => (
          <button
            type="button"
            key={move}
            lang="de"
            disabled={disabled || !canMove(c, moves, move)}
            onClick={() => change([...moves, move])}
          >
            <span aria-hidden="true">{ARROWS[move]}</span> {move}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="link-button"
        disabled={disabled || !moves.length}
        onClick={() => change([])}
      >
        Вернуться к остановке
      </button>
    </div>
  );
}

const coinLabel = (coin: number) =>
  coin >= 100 ? `${coin / 100} €` : `${coin} ct`;

export function Coins({ c, value, disabled, change }: Game<"coins">) {
  const record = asRecord(value);
  const total = coinTotal(record);
  const count = (coin: number) => Number(record[coin] ?? 0);
  return (
    <div className="moin-coins">
      <div aria-label="Монеты">
        {c.coins.map((coin) => (
          <button
            type="button"
            key={coin}
            className="moin-coin"
            disabled={disabled}
            aria-label={`Добавить ${coinLabel(coin)}`}
            onClick={() => change({ ...record, [coin]: count(coin) + 1 })}
          >
            {coinLabel(coin)}
          </button>
        ))}
      </div>
      <div className="moin-tray" aria-label="На сдачу">
        {c.coins.flatMap((coin) =>
          Array.from({ length: count(coin) }, (_, i) => (
            <button
              type="button"
              key={`${coin}-${i}`}
              className="moin-coin"
              disabled={disabled}
              aria-label={`Убрать ${coinLabel(coin)}`}
              onClick={() => change({ ...record, [coin]: count(coin) - 1 })}
            >
              {coinLabel(coin)}
            </button>
          )),
        )}
        {!total && <span>Нажимайте на монеты</span>}
      </div>
      <p className="moin-count" role="status">
        {(total / 100).toFixed(2).replace(".", ",")} €
        {total > 0 && <span lang="de"> · {preis(total)}</span>}
      </p>
    </div>
  );
}

export function Calendar({
  c,
  value,
  disabled,
  checked,
  change,
}: Game<"calendar">) {
  const [savedMonth, savedDay] = String(value).split(":");
  const [month, setMonth] = useState(savedMonth || c.months[0].name);
  const days = c.months.find((m) => m.name === month)!.days;
  return (
    <div className="moin-calendar">
      <div role="group" aria-label="Месяц">
        {c.months.map((m) => (
          <button
            type="button"
            key={m.name}
            lang="de"
            disabled={disabled}
            aria-pressed={m.name === month}
            onClick={() => setMonth(m.name)}
          >
            {m.name}
          </button>
        ))}
      </div>
      <div className="moin-days" role="group" aria-label="День">
        {Array.from({ length: days }, (_, i) => String(i + 1)).map((day) => {
          const chosen = savedMonth === month && savedDay === day;
          return (
            <button
              type="button"
              key={day}
              disabled={disabled}
              aria-pressed={chosen}
              data-wrong={
                (checked && chosen && value !== c.answer) || undefined
              }
              onClick={() => change(`${month}:${day}`)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

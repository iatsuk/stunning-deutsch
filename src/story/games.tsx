import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { play, stopAudio } from "../hooks";
import { preis, uhrzeit } from "../lib/german";
import { shuffle } from "../lib/shuffle";
import { PlayButton } from "../markup";
import { ClockView } from "../stage/Clock";
import { judge, UMLAUTS } from "../trainer/logic";
import { storyAudio, wordInfo } from "./audio";
import { phrases } from "./data";
import { wordCount } from "../assessment/logic";
import {
  canMove,
  coinTotal,
  lockKey,
  MOVES,
  PARTNER,
  placeKey,
  walk,
} from "./logic";
import { lockCard } from "./memory";
import type {
  Answer,
  ChatTurn,
  Challenge,
  LockRound,
  Move,
  OralRound,
  VoiceLine,
} from "./types";

// Игровые действия истории. Всё управляется нажатием и с клавиатуры:
// перетаскиваний нет, ошибка только даёт подсказку. Таймер есть в одной игре,
// с чайкой: упущенное слово возвращается, а времени становится больше.

type Game<K extends Challenge["kind"]> = {
  c: Extract<Challenge, { kind: K }>;
  value: Answer;
  seed: string;
  disabled: boolean;
  checked: boolean;
  change: (value: Answer) => void;
  win: () => void;
  /** Ошибка на шаге; слово передают игры, которые знают, в каком слове ошиблись. */
  miss: (word?: string) => void;
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

function Line({
  who,
  voice,
  turn,
}: {
  who: string;
  voice: string;
  turn: ChatTurn;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="moin-bubble">
      <small>{who}</small>
      <p lang="de">
        {turn.say} <PlayButton src={storyAudio(turn.say, voice)} />
      </p>
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

export function Chat({
  c,
  value,
  seed,
  disabled,
  change,
  win,
  miss,
}: Game<"chat">) {
  const said = asList(value);
  const [missed, setMissed] = useState<string[]>([]);
  const [reaction, setReaction] = useState("");
  const current = c.turns[said.length];
  function reply(id: string, why: string) {
    if (id !== current.answer) {
      setMissed([...missed, id]);
      setReaction(why);
      miss();
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
          <Line who={c.who} voice={c.voice} turn={turn} />
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
    if (id.endsWith(":de")) play(storyAudio(phrases[pair].de));
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

export function VoiceLines({ lines }: { lines: VoiceLine[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="moin-voices">
      <div className="kicker">Послушайте</div>
      {lines.map((line) => (
        <div key={line.text}>
          <PlayButton
            src={storyAudio(line.text, line.voice)}
            size="md"
            label={`Послушать: ${line.who}`}
          />
          <span>{line.who}</span>
          {open && (
            <p>
              <span lang="de">{line.text}</span> <small>{line.ru}</small>
            </p>
          )}
        </div>
      ))}
      <button
        type="button"
        className="link-button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "Скрыть текст" : "Показать текст"}
      </button>
    </div>
  );
}

/** Вставка букв с умлаутом в поле, где стоит курсор. */
function UmlautKeys({
  field,
  apply,
}: {
  field: RefObject<HTMLInputElement | null>;
  apply: (input: HTMLInputElement, text: string) => void;
}) {
  function insert(letter: string) {
    const input = field.current;
    if (!input) return;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    apply(input, input.value.slice(0, start) + letter + input.value.slice(end));
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + 1, start + 1);
    });
  }
  return (
    <div className="moin-umlauts" aria-label="Буквы с умлаутом">
      {UMLAUTS.map((letter) => (
        <button
          type="button"
          key={letter}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => insert(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

const textInput = {
  type: "text",
  lang: "de",
  autoComplete: "off",
  autoCapitalize: "off",
  autoCorrect: "off",
  spellCheck: false,
} as const;

export function Write({ c, value, disabled, checked, change }: Game<"write">) {
  const record = asRecord(value);
  const field = useRef<HTMLInputElement | null>(null);
  return (
    <div className="moin-write">
      <div className="kicker">{c.title}</div>
      {c.fields.map((f) => (
        <label key={f.id}>
          <span lang="de">{f.label}</span>
          <input
            {...textInput}
            data-field={f.id}
            disabled={disabled}
            value={String(record[f.id] ?? "")}
            data-wrong={
              (checked &&
                judge(String(record[f.id] ?? ""), f.answers) !== "right") ||
              undefined
            }
            onFocus={(event) => (field.current = event.currentTarget)}
            onChange={(event) =>
              change({ ...record, [f.id]: event.target.value })
            }
          />
        </label>
      ))}
      {!disabled && (
        <UmlautKeys
          field={field}
          apply={(input, text) =>
            change({ ...record, [input.dataset.field!]: text })
          }
        />
      )}
    </div>
  );
}

function ReviewItem({
  id,
  onRight,
}: {
  id: string;
  onRight: (id: string) => void;
}) {
  const phrase = phrases[id];
  const [text, setText] = useState("");
  const [verdict, setVerdict] = useState<ReturnType<typeof judge> | null>(null);
  const [typing, setTyping] = useState(false);
  const field = useRef<HTMLInputElement | null>(null);
  const done = verdict === "right";
  function check() {
    const result = judge(text, [phrase.de]);
    setVerdict(result);
    if (result === "right") onRight(id);
  }
  return (
    <form
      className="moin-review-item"
      onSubmit={(event) => {
        event.preventDefault();
        check();
      }}
    >
      <PlayButton src={storyAudio(phrase.de)} size="md" />
      <input
        {...textInput}
        ref={field}
        aria-label="Запишите услышанное"
        disabled={done}
        value={text}
        data-wrong={(verdict && !done) || undefined}
        onFocus={() => setTyping(true)}
        onChange={(event) => {
          setText(event.target.value);
          setVerdict(null);
        }}
      />
      {!done && typing && (
        <UmlautKeys field={field} apply={(_, value) => setText(value)} />
      )}
      {!done && (
        <button type="submit" disabled={!text.trim()}>
          Проверить
        </button>
      )}
      {verdict && (
        <p role="status">
          {done && `Верно: ${phrase.ru}`}
          {verdict === "case" && "Почти: проверьте заглавные буквы."}
          {verdict === "umlaut" && "Почти: нужна буква с умлаутом или ß."}
          {verdict === "wrong" && (
            <>
              Запишем ещё раз. Правильно: <span lang="de">{phrase.de}</span>
            </>
          )}
        </p>
      )}
    </form>
  );
}

/** Выражения главы и прошлые ошибки: запись на слух, можно пропустить и вернуться позже. */
export function ChapterReview({
  items,
  onRight,
}: {
  items: string[];
  onRight: (id: string) => void;
}) {
  const [shown] = useState(items);
  return (
    <section className="moin-review">
      <div className="kicker">Закрепление</div>
      <h3>Запишите на слух</h3>
      <p>
        Послушайте и напишите фразу по памяти. Это необязательно: то, в чём вы
        ошиблись, вернётся в конце следующей главы.
      </p>
      {shown.map((id) => (
        <ReviewItem key={id} id={id} onRight={onRight} />
      ))}
    </section>
  );
}

/** Немецкое слово с кнопкой озвучки из словаря уроков. */
function Word({ word }: { word: string }) {
  return (
    <span className="moin-word-line" lang="de">
      {word} <PlayButton src={wordInfo(word)?.audio} />
    </span>
  );
}

export function Bingo({
  c,
  value,
  seed,
  disabled,
  change,
  win,
  miss: slip,
}: Game<"bingo">) {
  const found = asList(value);
  const card = useMemo(() => shuffle(c.words, seed), [c, seed]);
  const calls = useMemo(() => shuffle(c.words, `${seed}-call`), [c, seed]);
  const [miss, setMiss] = useState("");
  const current = calls.find((word) => !found.includes(word));
  function tap(word: string) {
    if (word !== current) {
      if (current) slip(current);
      return setMiss(word);
    }
    const next = [...found, word];
    setMiss("");
    change(next);
    if (next.length === c.words.length) return win();
    play(wordInfo(calls[next.length])?.audio);
  }
  return (
    <>
      {current && !disabled && (
        <div className="moin-call">
          <PlayButton
            src={wordInfo(current)?.audio}
            size="md"
            label="Послушать слово"
          />
          <span>Нажмите, послушайте и закройте слово на карточке</span>
        </div>
      )}
      <div className="moin-bingo">
        {card.map((word) => {
          const done = found.includes(word);
          return (
            <button
              type="button"
              key={word}
              lang="de"
              disabled={disabled || done}
              data-done={done || undefined}
              data-wrong={miss === word || undefined}
              onClick={() => tap(word)}
            >
              {word}
              {done && <small>{wordInfo(word)?.ru}</small>}
            </button>
          );
        })}
      </div>
      <p className="moin-count" aria-live="polite">
        {miss
          ? `Это другое слово: ${wordInfo(miss)?.ru}`
          : `Закрыто: ${found.length} из ${c.words.length}`}
      </p>
    </>
  );
}

export function Scene({
  c,
  value,
  seed,
  disabled,
  change,
  win,
  miss: slip,
}: Game<"scene">) {
  const found = asList(value);
  const items = useMemo(() => shuffle(c.items, seed), [c, seed]);
  const tasks = useMemo(() => shuffle(c.items, `${seed}-task`), [c, seed]);
  const [miss, setMiss] = useState("");
  const current = tasks.find((item) => !found.includes(item.word));
  function tap(word: string) {
    if (word !== current?.word) {
      if (current) slip(current.word);
      return setMiss(word);
    }
    const next = [...found, word];
    setMiss("");
    change(next);
    if (next.length === c.items.length) win();
    else play(wordInfo(tasks[next.length].word)?.audio);
  }
  return (
    <>
      {current && !disabled && (
        <div className="moin-call">
          <span>Wo ist:</span> <Word word={current.word} />
        </div>
      )}
      <div className="moin-scene-grid">
        {items.map(({ word, icon }) => {
          const done = found.includes(word);
          return (
            <button
              type="button"
              key={word}
              disabled={disabled || done}
              data-done={done || undefined}
              data-wrong={miss === word || undefined}
              aria-label={done ? word : `Картинка ${icon}`}
              onClick={() => tap(word)}
            >
              <span aria-hidden="true">{icon}</span>
              {done && <small lang="de">{word}</small>}
            </button>
          );
        })}
      </div>
      <p className="moin-count" aria-live="polite">
        {miss ? (
          <>
            Это: <span lang="de">{miss}</span>
          </>
        ) : (
          `Найдено: ${found.length} из ${c.items.length}`
        )}
      </p>
    </>
  );
}

function OddRound({
  round,
  seed,
  onDone,
}: {
  round: Extract<Challenge, { kind: "odd" }>["rounds"][number];
  seed: string;
  onDone: () => void;
}) {
  const [missed, setMissed] = useState<string[]>([]);
  const [right, setRight] = useState(false);
  const words = useMemo(() => shuffle(round.words, seed), [round, seed]);
  return (
    <>
      <div className="moin-odd">
        {words.map((word) => (
          <button
            type="button"
            key={word}
            lang="de"
            disabled={right || missed.includes(word)}
            data-done={(right && word === round.odd) || undefined}
            onClick={() =>
              word === round.odd ? setRight(true) : setMissed([...missed, word])
            }
          >
            {word}
            {(right || missed.includes(word)) && (
              <small>{wordInfo(word)?.ru}</small>
            )}
          </button>
        ))}
      </div>
      {right && (
        <div className="moin-odd-result">
          <p>{round.why}</p>
          <button type="button" className="primary" onClick={onDone}>
            Дальше
          </button>
        </div>
      )}
    </>
  );
}

export function Odd({ c, value, seed, disabled, change, win }: Game<"odd">) {
  const solved = asList(value);
  const round = c.rounds[solved.length];
  if (!round || disabled)
    return <p className="moin-count">Все группы разобраны.</p>;
  return (
    <>
      <p className="moin-count">
        Группа {solved.length + 1} из {c.rounds.length}
      </p>
      <OddRound
        key={round.odd}
        round={round}
        seed={`${seed}-${solved.length}`}
        onDone={() => {
          const next = [...solved, round.odd];
          change(next);
          if (next.length === c.rounds.length) win();
        }}
      />
    </>
  );
}

const DECOYS = "aeinrstlo";

function LetterWord({
  word,
  seed,
  onDone,
  onMiss,
}: {
  word: string;
  seed: string;
  onDone: () => void;
  onMiss: () => void;
}) {
  const article = /^(der|die|das) /.exec(word)?.[1];
  const target = article ? word.slice(article.length + 1) : word;
  const [typed, setTyped] = useState(0);
  const [used, setUsed] = useState<number[]>([]);
  const [miss, setMiss] = useState<number | null>(null);
  const pool = useMemo(() => {
    const letters = [...target.toLowerCase()];
    const extra = [...DECOYS].filter((l) => !letters.includes(l)).slice(0, 3);
    return shuffle([...letters, ...extra], seed);
  }, [target, seed]);
  const finished = typed === target.length;
  function tap(letter: string, index: number) {
    if (letter !== target[typed].toLowerCase()) {
      onMiss();
      return setMiss(index);
    }
    setMiss(null);
    setTyped(typed + 1);
    setUsed([...used, index]);
  }
  return (
    <div className="moin-letters">
      <p>
        {wordInfo(word)?.ru}{" "}
        <PlayButton src={wordInfo(word)?.audio} label="Послушать слово" />
      </p>
      <div className="moin-slots" lang="de">
        {article && <span>{article}</span>}
        {[...target].map((letter, i) => (
          <b key={i}>{i < typed ? letter : "_"}</b>
        ))}
      </div>
      {finished ? (
        <button type="button" className="primary" onClick={onDone}>
          Дальше
        </button>
      ) : (
        <div className="moin-tiles">
          {pool.map((letter, i) => (
            <button
              type="button"
              key={i}
              disabled={used.includes(i)}
              data-wrong={miss === i || undefined}
              onClick={() => tap(letter, i)}
            >
              {letter}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Letters({
  c,
  value,
  seed,
  disabled,
  change,
  win,
  miss,
}: Game<"letters">) {
  const done = asList(value);
  const current = c.words.find((word) => !done.includes(word));
  if (!current || disabled)
    return (
      <p className="moin-count" lang="de">
        {c.words.join(" · ")}
      </p>
    );
  return (
    <>
      <p className="moin-count">
        Слово {done.length + 1} из {c.words.length}
      </p>
      <LetterWord
        key={current}
        word={current}
        seed={`${seed}-${done.length}`}
        onMiss={() => miss(current)}
        onDone={() => {
          const next = [...done, current];
          change(next);
          if (next.length === c.words.length) win();
        }}
      />
    </>
  );
}

/** Запись живёт только в памяти этой страницы: на сервер и в сохранение она не попадает. */
function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [url, setUrl] = useState<string>();
  const recorder = useRef<MediaRecorder | null>(null);
  useEffect(
    () => () => {
      recorder.current?.stream.getTracks().forEach((t) => t.stop());
    },
    [],
  );
  useEffect(() => () => void (url && URL.revokeObjectURL(url)), [url]);
  async function toggle() {
    if (recording) return recorder.current?.stop();
    stopAudio();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const media = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      media.ondataavailable = (event) => chunks.push(event.data);
      media.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        setUrl(URL.createObjectURL(new Blob(chunks, { type: media.mimeType })));
        setRecording(false);
      };
      recorder.current = media;
      media.start();
      setRecording(true);
      window.setTimeout(
        () => media.state === "recording" && media.stop(),
        8000,
      );
    } catch {
      setBlocked(true);
    }
  }
  return {
    available: typeof MediaRecorder !== "undefined" && !blocked,
    blocked,
    recording,
    url,
    toggle,
    clear: () => setUrl(undefined),
  };
}

function RecordButton({ rec }: { rec: ReturnType<typeof useRecorder> }) {
  if (!rec.available) return null;
  return (
    <button type="button" aria-pressed={rec.recording} onClick={rec.toggle}>
      {rec.recording ? "■ Стоп" : "● Записать себя"}
    </button>
  );
}

function SpeakLine({
  line,
  done,
  onDone,
}: {
  line: string;
  done: boolean;
  onDone: () => void;
}) {
  const rec = useRecorder();
  return (
    <li data-done={done || undefined}>
      <div>
        <Word word={line} />
        <small>{wordInfo(line)?.ru}</small>
      </div>
      {!done && (
        <div className="moin-speak-tools">
          <RecordButton rec={rec} />
          {rec.url && (
            <span>
              <PlayButton src={rec.url} label="Послушать себя" /> Моя запись
            </span>
          )}
          <button type="button" className="primary" onClick={onDone}>
            Повторил(а) вслух
          </button>
        </div>
      )}
      {rec.blocked && (
        <p>
          Запись недоступна: браузер не дал доступ к микрофону. Скажите вслух.
        </p>
      )}
    </li>
  );
}

export function Speak({ c, value, disabled, change, win }: Game<"speak">) {
  const done = asList(value);
  return (
    <ul className="moin-speak">
      {c.lines.map((line) => (
        <SpeakLine
          key={line}
          line={line}
          done={disabled || done.includes(line)}
          onDone={() => {
            const next = [...done, line];
            change(next);
            if (next.length === c.lines.length) win();
          }}
        />
      ))}
    </ul>
  );
}

/** Очередь слов: упущенное слово ждёт, пока пройдут остальные. */
function useQueue(words: string[], seed: string, done: string[]) {
  const queue = useMemo(() => shuffle(words, seed), [words, seed]);
  const [later, setLater] = useState<string[]>([]);
  const rest = queue.filter((word) => !done.includes(word));
  return {
    current:
      rest.find((word) => !later.includes(word)) ??
      later.find((word) => rest.includes(word)),
    postpone: (word: string) =>
      setLater((list) => [...list.filter((w) => w !== word), word]),
  };
}

const ARTICLES = ["der", "die", "das"];
const noun = (word: string) => word.replace(/^(der|die|das) /, "");

/** Запись слова звучит с артиклем, поэтому включается только после выбора причала. */
export function Docks({
  c,
  value,
  seed,
  disabled,
  change,
  win,
  miss,
}: Game<"docks">) {
  const done = asList(value);
  const { current, postpone } = useQueue(c.words, seed, done);
  const [note, setNote] = useState("");
  function tap(article: string) {
    if (!current) return;
    const info = wordInfo(current);
    play(info?.audio);
    if (!current.startsWith(`${article} `)) {
      setNote(`Нет, ${current} (${info?.ru}). Слово вернётся в конце.`);
      miss(current);
      return postpone(current);
    }
    const next = [...done, current];
    setNote(`${current} — ${info?.ru}`);
    change(next);
    if (next.length === c.words.length) win();
  }
  return (
    <>
      {current && !disabled && (
        <div className="moin-boat">
          <span aria-hidden="true">⛵</span> <b lang="de">{noun(current)}</b>
        </div>
      )}
      <div className="moin-docks">
        {ARTICLES.map((article) => (
          <div key={article}>
            <button
              type="button"
              lang="de"
              disabled={disabled}
              onClick={() => tap(article)}
            >
              {article}
            </button>
            <ul lang="de">
              {done
                .filter((word) => word.startsWith(`${article} `))
                .map((word) => (
                  <li key={word}>{noun(word)}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="moin-count" aria-live="polite">
        {note || `У причала: ${done.length} из ${c.words.length}`}
      </p>
    </>
  );
}

const GULL_SECONDS = 10;
const GULL_BONUS = 3;

/** Компонент пересоздаётся на каждую попытку, поэтому таймер всегда начинается заново. */
function GullRound({
  word,
  words,
  seed,
  seconds,
  onPick,
  onLost,
}: {
  word: string;
  words: string[];
  seed: string;
  seconds: number;
  onPick: (word: string) => void;
  onLost: () => void;
}) {
  const options = useMemo(() => {
    const others = shuffle(
      words.filter((w) => w !== word),
      seed,
    ).slice(0, 3);
    return shuffle([word, ...others], `${seed}-options`);
  }, [word, words, seed]);
  useEffect(() => {
    const timer = window.setTimeout(onLost, seconds * 1000);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="moin-gull-track" aria-hidden="true">
        <span style={{ "--gull-time": `${seconds}s` } as CSSProperties}>
          🐦
        </span>
      </div>
      <p className="moin-gull-task">{wordInfo(word)?.ru}</p>
      <div className="moin-odd">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            lang="de"
            onClick={() => onPick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}

export function Gull({
  c,
  value,
  seed,
  disabled,
  change,
  win,
  miss,
}: Game<"gull">) {
  const done = asList(value);
  const { current, postpone } = useQueue(c.words, seed, done);
  const [lost, setLost] = useState(0);
  const [note, setNote] = useState("");
  if (!current || disabled)
    return (
      <p className="moin-count" lang="de">
        {c.words.join(" · ")}
      </p>
    );
  const lose = (message: string) => {
    setNote(message);
    setLost((n) => n + 1);
    miss(current);
    postpone(current);
  };
  return (
    <>
      <p className="moin-count">
        Спасено: {done.length} из {c.words.length}
      </p>
      <GullRound
        key={`${current}-${lost}`}
        word={current}
        words={c.words}
        seed={`${seed}-${done.length}-${lost}`}
        seconds={GULL_SECONDS + lost * GULL_BONUS}
        onLost={() =>
          lose(
            `Чайка унесла ${current} (${wordInfo(current)?.ru}). Слово вернётся, времени станет больше.`,
          )
        }
        onPick={(word) => {
          if (word !== current)
            return lose(
              `Это ${word} (${wordInfo(word)?.ru}). Нужно было ${current}. Слово вернётся.`,
            );
          const next = [...done, word];
          play(wordInfo(word)?.audio);
          setNote(`${word} — ${wordInfo(word)?.ru}`);
          change(next);
          if (next.length === c.words.length) win();
        }}
      />
      <p className="moin-count" aria-live="polite">
        {note}
      </p>
    </>
  );
}

/** Замок считает верные диски, но не называет их: подобрать фразу помогает грамматика. */
function LockBox({
  round,
  seed,
  onDone,
  onMiss,
}: {
  round: LockRound;
  seed: string;
  onDone: () => void;
  onMiss: () => void;
}) {
  const reels = useMemo(
    () => round.reels.map((options, i) => shuffle(options, `${seed}-${i}`)),
    [round, seed],
  );
  const [at, setAt] = useState<number[]>(() => {
    const ready = reels.every((options, i) => options[0] === round.answer[i]);
    return reels.map((_, i) => (ready && i === 0 ? 1 : 0));
  });
  const [right, setRight] = useState<number | null>(null);
  const opened = right === reels.length;
  function spin(reel: number, by: number) {
    const size = reels[reel].length;
    setAt(at.map((n, i) => (i === reel ? (n + by + size) % size : n)));
    setRight(null);
  }
  function tryOpen() {
    const clicked = reels.filter(
      (options, i) => options[at[i]] === round.answer[i],
    ).length;
    setRight(clicked);
    if (clicked < reels.length) onMiss();
  }
  return (
    <>
      <p className="moin-gull-task">{round.ru}</p>
      <div className="moin-reels" data-open={opened || undefined}>
        {reels.map((options, i) => (
          <div key={i}>
            <button
              type="button"
              aria-label={`Диск ${i + 1}: предыдущий вариант`}
              disabled={opened}
              onClick={() => spin(i, -1)}
            >
              ▲
            </button>
            <output lang="de" aria-label={`Диск ${i + 1}`}>
              {options[at[i]]}
            </output>
            <button
              type="button"
              aria-label={`Диск ${i + 1}: следующий вариант`}
              disabled={opened}
              onClick={() => spin(i, 1)}
            >
              ▼
            </button>
          </div>
        ))}
      </div>
      <p className="moin-count" aria-live="polite">
        {opened
          ? "Замок открыт."
          : right === null
            ? ""
            : `Щёлкнуло дисков: ${right} из ${reels.length}`}
      </p>
      <button
        type="button"
        className="primary"
        onClick={opened ? onDone : tryOpen}
      >
        {opened ? "Дальше" : "Открыть замок"}
      </button>
    </>
  );
}

export function Lock({
  c,
  value,
  seed,
  disabled,
  change,
  win,
  miss,
}: Game<"lock">) {
  const solved = asList(value);
  const round = c.rounds[solved.length];
  if (!round || disabled)
    return (
      <ul className="moin-lock-done" lang="de">
        {c.rounds.map((r) => (
          <li key={lockKey(r)}>{lockKey(r)}</li>
        ))}
      </ul>
    );
  return (
    <>
      <p className="moin-count">
        Замок {solved.length + 1} из {c.rounds.length}
      </p>
      <LockBox
        key={lockKey(round)}
        round={round}
        seed={`${seed}-${solved.length}`}
        onMiss={() => miss(lockCard(round))}
        onDone={() => {
          const next = [...solved, lockKey(round)];
          change(next);
          if (next.length === c.rounds.length) win();
        }}
      />
    </>
  );
}

/** Письмо по образцу: меняются только данные, поэтому каждое предложение можно проверить точно. */
export function Letter({
  c,
  value,
  disabled,
  change,
  win,
  miss,
}: Game<"letter">) {
  const record = asRecord(value);
  const field = useRef<HTMLInputElement | null>(null);
  const [tries, setTries] = useState(0);
  const [checked, setChecked] = useState(false);
  const text = (id: string) => String(record[id] ?? "");
  const verdict = (f: (typeof c.fields)[number]) =>
    judge(text(f.id), f.answers);
  function check() {
    setChecked(true);
    setTries(tries + 1);
    if (c.fields.every((f) => verdict(f) === "right")) return win();
    miss();
  }
  return (
    <div className="moin-letter">
      <div className="moin-source">
        <div className="kicker">Образец</div>
        {c.model.map((line, i) => (
          <p key={i} lang="de">
            {line}
          </p>
        ))}
      </div>
      <div className="moin-write">
        <div className="kicker">Письмо · {c.to}</div>
        {c.fields.map((f) => {
          const wrong = checked && !disabled && verdict(f) !== "right";
          return (
            <label key={f.id}>
              <span lang="de">{f.label}</span>
              <input
                {...textInput}
                data-field={f.id}
                disabled={disabled}
                value={text(f.id)}
                data-wrong={wrong || undefined}
                onFocus={(event) => (field.current = event.currentTarget)}
                onChange={(event) => {
                  setChecked(false);
                  change({ ...record, [f.id]: event.target.value });
                }}
              />
              {wrong && (
                <small role="status">
                  {verdict(f) === "case"
                    ? "Почти: проверьте заглавные буквы."
                    : verdict(f) === "umlaut"
                      ? "Почти: нужна буква с умлаутом или ß."
                      : tries > 1
                        ? `Правильно: ${f.answers[0]}`
                        : "Сравните с образцом: меняются только данные."}
                </small>
              )}
            </label>
          );
        })}
        {!disabled && (
          <UmlautKeys
            field={field}
            apply={(input, value) => {
              setChecked(false);
              change({ ...record, [input.dataset.field!]: value });
            }}
          />
        )}
      </div>
      <p className="moin-count">
        Слов: {wordCount(c.fields.map((f) => text(f.id)).join(" "))}
      </p>
      {!disabled && (
        <button type="button" className="primary" onClick={check}>
          Проверить письмо
        </button>
      )}
    </div>
  );
}

/** Сначала сказать самому, потом сверить: образец до ответа превратил бы речь в чтение вслух. */
function OralTurn({ round, onDone }: { round: OralRound; onDone: () => void }) {
  const [compare, setCompare] = useState(false);
  const [hint, setHint] = useState(false);
  const rec = useRecorder();
  const model = storyAudio(round.model);
  return (
    <div className="moin-oral">
      <div className="kicker">Sprechen · Teil {round.part}</div>
      <p>{round.task}</p>
      {round.card && (
        <div
          className="moin-oral-card"
          lang="de"
          data-picture={!/\p{L}/u.test(round.card) || undefined}
        >
          {round.card}
        </div>
      )}
      {round.hear && (
        <div className="moin-call">
          <PlayButton
            src={storyAudio(round.hear, PARTNER)}
            size="md"
            label="Послушать партнёра"
          />
          <span>Послушайте партнёра</span>
        </div>
      )}
      {hint && <p lang="de">{round.hint}</p>}
      {compare ? (
        <>
          <div className="moin-oral-result">
            {round.hear && <small lang="de">{round.hear}</small>}
            <span className="moin-word-line" lang="de">
              {round.model} <PlayButton src={model} label="Послушать образец" />
            </span>
            <small>{round.ru}</small>
            {rec.url && (
              <span>
                <PlayButton src={rec.url} label="Послушать себя" /> Моя запись
              </span>
            )}
          </div>
          <div className="moin-speak-tools">
            <button type="button" className="primary" onClick={onDone}>
              Получилось
            </button>
            <button
              type="button"
              onClick={() => {
                stopAudio();
                rec.clear();
                setCompare(false);
              }}
            >
              Ещё раз
            </button>
          </div>
        </>
      ) : (
        <div className="moin-speak-tools">
          <RecordButton rec={rec} />
          {rec.url && (
            <span>
              <PlayButton src={rec.url} label="Послушать себя" /> Моя запись
            </span>
          )}
          {round.hint && !hint && (
            <button type="button" onClick={() => setHint(true)}>
              Начало фразы
            </button>
          )}
          <button
            type="button"
            className="primary"
            onClick={() => {
              setCompare(true);
              play(model);
            }}
          >
            Сверить с образцом
          </button>
        </div>
      )}
      {rec.blocked && (
        <p>
          Запись недоступна: браузер не дал доступ к микрофону. Скажите вслух.
        </p>
      )}
    </div>
  );
}

export function Oral({ c, value, disabled, change, win }: Game<"oral">) {
  const done = asList(value);
  const round = c.rounds.find((r) => !done.includes(r.model));
  if (!round || disabled)
    return (
      <ul className="moin-lock-done" lang="de">
        {c.rounds.map((r) => (
          <li key={r.model}>{r.model}</li>
        ))}
      </ul>
    );
  return (
    <>
      <p className="moin-count">
        Задание {done.length + 1} из {c.rounds.length}
      </p>
      <OralTurn
        key={round.model}
        round={round}
        onDone={() => {
          const next = [...done, round.model];
          change(next);
          if (next.length === c.rounds.length) win();
        }}
      />
    </>
  );
}

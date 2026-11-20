import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { say, stopAudio } from "../hooks";
import { preis, uhrzeit } from "../lib/german";
import { shuffle } from "../lib/shuffle";
import { PlayButton } from "../markup";
import { ClockView } from "../stage/Clock";
import { judge, nearMisses, UMLAUTS } from "../trainer/logic";
import { phraseAudio, storyAudio, wordInfo } from "./audio";
import { phrases } from "./data";
import { wordCount } from "../assessment/logic";
import {
  coinTotal,
  lockKey,
  lockStart,
  PARTNER,
  placeKey,
} from "./logic";
import { lockCard, PLURALS } from "./memory";
import type {
  Answer,
  ChatTurn,
  Challenge,
  LockRound,
  OralRound,
} from "./types";

// Игровые действия истории. Всё управляется нажатием и с клавиатуры:
// перетаскиваний нет, ошибка только даёт подсказку. Таймер есть в одной игре,
// с чайкой: он запускается кнопкой, упущенное слово возвращается, а времени становится больше.

export type Game<K extends Challenge["kind"]> = {
  c: Extract<Challenge, { kind: K }>;
  value: Answer;
  seed: string;
  disabled: boolean;
  checked: boolean;
  change: (value: Answer) => void;
  /**
   * Игра пройдена. advance — победу принесло нажатие кнопки внутри игры (последний раунд,
   * «Проверить письмо»), поэтому сцена идёт дальше сама, без второй кнопки «Дальше».
   */
  win: (advance?: boolean) => void;
  /** Сколько раз нажата общая кнопка проверки шага. */
  attempts?: number;
  /** Отвечать письменно там, где нужно говорить вслух. */
  quiet?: boolean;
  /** Ошибка на шаге; слово передают игры, которые знают, в каком слове ошиблись. */
  miss: (word?: string) => void;
};

/** Общие свойства игры без самого задания для встраивания в сцену. */
export type GameProps = Omit<Game<Challenge["kind"]>, "c">;

const asList = (value: Answer) => (Array.isArray(value) ? value : []);
const asRecord = (value: Answer) =>
  typeof value === "object" && !Array.isArray(value) ? value : {};
const lang = (text: string) => (/[а-яё]/i.test(text) ? undefined : "de");

type Tone = "good" | "bad" | undefined;
/** Итог действия: зелёный с галочкой — верно, красный с крестиком — ошибка, серый — справка. */
export function Note({ tone, children }: { tone?: Tone; children: ReactNode }) {
  return (
    <p className="moin-count" data-tone={tone} aria-live="polite">
      {tone === "good" ? "✓ " : tone === "bad" ? "✗ " : ""}
      {children}
    </p>
  );
}

const ARTICLE = /^(der|die|das) /;
/** Род существительного цветом, как в уроках: der синий, die красный, das зелёный. */
/** Страны без артикля — среднего рода: (das) Deutschland. */
const NEUTER = [
  "Deutschland",
  "Dänemark",
  "Kasachstan",
  "Russland",
  "Argentinien",
];
const genderOf = (word: string) =>
  PLURALS.includes(word)
    ? "plural"
    : NEUTER.includes(word)
      ? "das"
      : ARTICLE.exec(word)?.[1];
export function Gendered({ text }: { text: string }) {
  const gender = genderOf(text);
  return gender ? (
    <span className="moin-gender" data-gender={gender}>
      {text}
    </span>
  ) : (
    <>{text}</>
  );
}

/** Образец и своя запись одновременно: так слышно, где расходятся темп и ударение. */
function Together({ model, own }: { model?: string; own?: string }) {
  const players = useRef<HTMLAudioElement[]>([]);
  const [on, setOn] = useState(false);
  useEffect(() => () => players.current.forEach((p) => p.pause()), []);
  if (!model || !own) return null;
  function toggle() {
    players.current.forEach((p) => p.pause());
    if (on) return setOn(false);
    stopAudio();
    const list = [new Audio(model), new Audio(own)];
    players.current = list;
    let left = list.length;
    for (const p of list) {
      p.onended = () => {
        left -= 1;
        if (!left) setOn(false);
      };
      p.play().catch(() => setOn(false));
    }
    setOn(true);
  }
  return (
    <button type="button" aria-pressed={on} onClick={toggle}>
      {on ? "■ Стоп" : "▶ Вместе с образцом"}
    </button>
  );
}

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
    if (id.endsWith(":de")) say(phraseAudio(phrases[pair]));
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
const CELL = 110;
const EDGE = 56;
const point = (n: number) => EDGE + n * CELL;

type Plan = Extract<Challenge, { kind: "algo" }>;
/** Схема квартала: улицы, пройденный путь, места и идущий. reveal — места подписаны сразу. */
export function RouteMap({ c, path, angle, reveal }: { c: Plan; path: { x: number; y: number }[]; angle: number; reveal?: boolean }) {
  const at = path[path.length - 1];
  const visited = new Set(path.map(placeKey));
  const xs = Array.from({ length: c.width }, (_, x) => x);
  const ys = Array.from({ length: c.height }, (_, y) => y);
  const size = (count: number) => (count - 1) * CELL + EDGE * 2;
  return (
    <svg viewBox={`0 0 ${size(c.width)} ${size(c.height)}`} role="img" aria-label="Схема квартала с вашим положением">
      {ys.map((y) => (
        <line key={`y${y}`} className="moin-street" x1={point(0)} x2={point(c.width - 1)} y1={point(y)} y2={point(y)} />
      ))}
      {xs.map((x) => (
        <line key={`x${x}`} className="moin-street" y1={point(0)} y2={point(c.height - 1)} x1={point(x)} x2={point(x)} />
      ))}
      <polyline className="moin-walked" points={path.map((p) => `${point(p.x)},${point(p.y)}`).join(" ")} />
      {Object.entries(c.places).map(([key, place]) => {
        const [x, y] = key.split(",").map(Number);
        return reveal || visited.has(key) ? (
          <text key={key} x={point(x)} y={point(y) + 34} lang="de" data-goal={(reveal && key === c.goal) || undefined}>
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
        style={{ transform: `translate(${point(at.x)}px, ${point(at.y)}px) rotate(${angle}deg)` }}
      />
    </svg>
  );
}
/** Угол копится, чтобы стрелка поворачивала коротким путём, а не через весь круг. */
export const walkAngle = (heading: number, moves: string[]) =>
  moves.reduce((sum, move) => sum + (move === "links" ? -90 : move === "rechts" ? 90 : 0), heading * 90);

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

/** Вставка букв с умлаутом в поле, где стоит курсор. */
export function UmlautKeys({
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

export const textInput = {
  type: "text",
  lang: "de",
  autoComplete: "off",
  autoCapitalize: "off",
  autoCorrect: "off",
  spellCheck: false,
} as const;

export function Write({
  c,
  value,
  disabled,
  checked,
  change,
  attempts = 0,
  reveal = true,
}: Game<"write"> & { reveal?: boolean }) {
  const record = asRecord(value);
  const field = useRef<HTMLInputElement | null>(null);
  return (
    <div className="moin-write">
      <div className="kicker">{c.title}</div>
      {c.fields.map((f) => {
        const wrong =
          checked && judge(String(record[f.id] ?? ""), f.answers) !== "right";
        return (
          <label key={f.id}>
            <span lang="de">{f.label}</span>
            <input
              {...textInput}
              data-field={f.id}
              disabled={disabled}
              value={String(record[f.id] ?? "")}
              data-wrong={wrong || undefined}
              onFocus={(event) => (field.current = event.currentTarget)}
              onChange={(event) =>
                change({ ...record, [f.id]: event.target.value })
              }
            />
            {wrong && reveal && attempts > 1 && (
              <small data-tone="bad">
                Правильно: <span lang="de">{f.answers[0]}</span>
              </small>
            )}
          </label>
        );
      })}
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

/** Запись на слух с точной проверкой; перевод открывается после верного ответа или заранее. */
function Dictation({
  de,
  ru,
  audio,
  showRu = false,
  onRight,
}: {
  de: string;
  ru?: string;
  audio?: string;
  showRu?: boolean;
  onRight: () => void;
}) {
  const [text, setText] = useState("");
  const [verdict, setVerdict] = useState<ReturnType<typeof judge> | null>(null);
  const [typing, setTyping] = useState(false);
  const [tries, setTries] = useState(0);
  const field = useRef<HTMLInputElement | null>(null);
  const done = verdict === "right";
  const near = nearMisses(text, [de]).join(", ");
  function check() {
    const result = judge(text, [de]);
    setVerdict(result);
    setTries((n) => n + 1);
    if (result === "right") onRight();
  }
  return (
    <form
      className="moin-review-item"
      onSubmit={(event) => {
        event.preventDefault();
        check();
      }}
    >
      <PlayButton src={audio} size="md" />
      {showRu && ru && !done && <small>{ru}</small>}
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
        <p role="status" data-tone={done ? "good" : "bad"}>
          {done && `✓ Верно${ru ? `: ${ru}` : ""}`}
          {verdict === "case" && `Почти: проверьте заглавные буквы — ${near}.`}
          {verdict === "umlaut" &&
            `Почти: нужна буква с умлаутом или ß — ${near}.`}
          {verdict === "wrong" && "Запишем ещё раз."}
          {!done && (verdict === "wrong" || tries > 1) && (
            <>
              {" "}
              Правильно: <span lang="de">{de}</span>
            </>
          )}
        </p>
      )}
    </form>
  );
}

/** Немецкое слово с кнопкой озвучки из словаря уроков. */
function Word({ word }: { word: string }) {
  return (
    <span className="moin-word-line" lang="de">
      <Gendered text={word} /> <PlayButton src={wordInfo(word)?.audio} />
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
    say(wordInfo(calls[next.length])?.audio);
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
              <Gendered text={word} />
              {done && <small>{wordInfo(word)?.ru}</small>}
            </button>
          );
        })}
      </div>
      <Note tone={miss ? "bad" : undefined}>
        {miss
          ? `Это другое слово: ${wordInfo(miss)?.ru}`
          : `Закрыто: ${found.length} из ${c.words.length}`}
      </Note>
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
    else say(wordInfo(tasks[next.length].word)?.audio);
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
              {done && (
                <small lang="de">
                  <Gendered text={word} />
                </small>
              )}
            </button>
          );
        })}
      </div>
      <Note tone={miss ? "bad" : undefined}>
        {miss ? (
          <>
            Это <Gendered text={miss} />, а нужно другое.
          </>
        ) : (
          `Найдено: ${found.length} из ${c.items.length}`
        )}
      </Note>
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
            <Gendered text={word} />
            {(right || missed.includes(word)) && (
              <small>{wordInfo(word)?.ru}</small>
            )}
          </button>
        ))}
      </div>
      {!right && missed.length > 0 && (
        <Note tone="bad">Это слово из группы. Ищите лишнее.</Note>
      )}
      {right && (
        <div className="moin-odd-result">
          <p data-tone="good">✓ {round.why}</p>
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
          if (next.length === c.rounds.length) win(true);
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
      <div className="moin-slots" lang="de" data-gender={genderOf(word)}>
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
      {miss !== null && !finished && (
        <Note tone="bad">Не эта буква. Нужна следующая по порядку.</Note>
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
          if (next.length === c.words.length) win(true);
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
  quiet,
  onDone,
}: {
  line: string;
  done: boolean;
  quiet?: boolean;
  onDone: () => void;
}) {
  const rec = useRecorder();
  // Без голоса фраза записывается на слух: текст скрыт, иначе это было бы переписывание.
  if (quiet && !done)
    return (
      <li>
        <Dictation
          de={line}
          ru={wordInfo(line)?.ru}
          audio={wordInfo(line)?.audio}
          showRu
          onRight={onDone}
        />
      </li>
    );
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
          <Together model={wordInfo(line)?.audio} own={rec.url} />
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

export function Speak({
  c,
  value,
  disabled,
  quiet,
  change,
  win,
}: Game<"speak">) {
  const done = asList(value);
  return (
    <ul className="moin-speak">
      {c.lines.map((line) => (
        <SpeakLine
          key={line}
          line={line}
          quiet={quiet}
          done={disabled || done.includes(line)}
          onDone={() => {
            const next = [...done, line];
            change(next);
            if (next.length === c.lines.length) win(true);
          }}
        />
      ))}
    </ul>
  );
}

/** Очередь слов: упущенное слово ждёт, пока пройдут остальные. */
export function useQueue(words: string[], seed: string, done: string[]) {
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
  const [tone, setTone] = useState<Tone>();
  function tap(article: string) {
    if (!current) return;
    const info = wordInfo(current);
    say(info?.audio);
    if (!current.startsWith(`${article} `)) {
      setNote(`Нет, ${current} (${info?.ru}). Слово вернётся в конце.`);
      setTone("bad");
      miss(current);
      return postpone(current);
    }
    const next = [...done, current];
    setNote(`${current} — ${info?.ru}`);
    setTone("good");
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
          <div key={article} data-gender={article}>
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
                  <li key={word} className="moin-gender" data-gender={article}>
                    {noun(word)}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <Note tone={note ? tone : undefined}>
        {note || `У причала: ${done.length} из ${c.words.length}`}
      </Note>
    </>
  );
}

/** Темп чайки живой: верный ответ её раззадоривает, и на следующее слово времени меньше
 * (но не меньше `GULL_MIN`); урвав слово, она довольна и летит медленнее. Тот, кто справляется,
 * получает азарт, а тот, кто ошибается, — время. */
const GULL_SECONDS = 10;
const GULL_RUSH = 1;
const GULL_MIN = 6;
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
            <Gendered text={option} />
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
  const [seconds, setSeconds] = useState(GULL_SECONDS);
  const [note, setNote] = useState("");
  const [tone, setTone] = useState<Tone>();
  // Чайка взлетает по кнопке: сначала спокойно прочитать задание.
  const [running, setRunning] = useState(false);
  if (!current || disabled)
    return (
      <p className="moin-count" lang="de">
        {c.words.join(" · ")}
      </p>
    );
  if (!running)
    return (
      <div className="moin-gull-start">
        <p className="moin-count">
          {done.length
            ? `Спасено: ${done.length} из ${c.words.length}. Продолжим?`
            : `Слов: ${c.words.length}, на первое — ${GULL_SECONDS} секунд. За верный ответ чайка ускоряется, за ошибку — замедляется.`}
        </p>
        <button
          type="button"
          className="primary"
          onClick={() => setRunning(true)}
        >
          Старт
        </button>
      </div>
    );
  const lose = (message: string) => {
    setNote(message);
    setTone("bad");
    setLost((n) => n + 1);
    setSeconds((s) => s + GULL_BONUS);
    miss(current);
    postpone(current);
  };
  return (
    <>
      <p className="moin-count">
        Спасено: {done.length} из {c.words.length} · {seconds} с на слово
      </p>
      <GullRound
        key={`${current}-${lost}`}
        word={current}
        words={c.words}
        seed={`${seed}-${done.length}-${lost}`}
        seconds={seconds}
        onLost={() =>
          lose(
            `Чайка унесла ${current} (${wordInfo(current)?.ru}) и довольна добычей: дальше полетит медленнее. Слово вернётся.`,
          )
        }
        onPick={(word) => {
          if (word !== current)
            return lose(
              `Это ${word} (${wordInfo(word)?.ru}). Нужно было ${current} — чайка урвала слово и полетит медленнее. Слово вернётся.`,
            );
          const next = [...done, word];
          say(wordInfo(word)?.audio);
          const faster = Math.max(GULL_MIN, seconds - GULL_RUSH);
          const ru = wordInfo(word)?.ru ?? "";
          setSeconds(faster);
          setNote(
            faster < seconds
              ? `${word} — ${/[.!?…]$/.test(ru) ? ru : `${ru}.`} Чайка раззадорилась: следующее слово быстрее.`
              : `${word} — ${ru}`,
          );
          setTone("good");
          change(next);
          if (next.length === c.words.length) win();
        }}
      />
      <Note tone={tone}>{note}</Note>
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
  const [at, setAt] = useState(() => lockStart(reels, round.answer, seed));
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
    else say(storyAudio(lockKey(round)));
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
            {/* Невидимый столбик всех вариантов держит ширину диска: при повороте она не меняется. */}
            <span className="moin-reel-width" lang="de" aria-hidden="true">
              {options.map((o, k) => (
                <span key={k}>{o}</span>
              ))}
            </span>
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
      <Note tone={opened ? "good" : right === null ? undefined : "bad"}>
        {opened
          ? "Замок открыт."
          : right === null
            ? ""
            : `Щёлкнуло дисков: ${right} из ${reels.length}`}
      </Note>
      {opened && (
        <p className="moin-word-line" lang="de">
          {lockKey(round)}{" "}
          <PlayButton
            src={storyAudio(lockKey(round))}
            label="Послушать фразу"
          />
        </p>
      )}
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
          <li key={lockKey(r)}>
            {lockKey(r)} <PlayButton src={storyAudio(lockKey(r))} />
          </li>
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
          if (next.length === c.rounds.length) win(true);
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
    if (c.fields.every((f) => verdict(f) === "right")) return win(true);
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
                <small role="status" data-tone="bad">
                  {tries > 1
                    ? `Правильно: ${f.answers[0]}`
                    : verdict(f) === "case"
                      ? `Почти: проверьте заглавные буквы — ${nearMisses(text(f.id), f.answers).join(", ")}.`
                      : verdict(f) === "umlaut"
                        ? `Почти: нужна буква с умлаутом или ß — ${nearMisses(text(f.id), f.answers).join(", ")}.`
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
function OralTurn({
  round,
  quiet,
  onDone,
}: {
  round: OralRound;
  quiet?: boolean;
  onDone: () => void;
}) {
  const [compare, setCompare] = useState(false);
  const [hint, setHint] = useState(false);
  // Письменный ответ, если говорить вслух нельзя. Сверяет его сам игрок, как и речь.
  const [typed, setTyped] = useState("");
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
            {typed.trim() && (
              <span>
                Мой ответ: <span lang="de">{typed}</span>
              </span>
            )}
            {rec.url && (
              <span>
                <PlayButton src={rec.url} label="Послушать себя" /> Моя запись
              </span>
            )}
          </div>
          <div className="moin-speak-tools">
            <Together model={model} own={rec.url} />
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
          {quiet ? (
            <label className="moin-oral-typed">
              <span>Ваш ответ</span>
              <input
                {...textInput}
                value={typed}
                onChange={(event) => setTyped(event.target.value)}
              />
            </label>
          ) : (
            <RecordButton rec={rec} />
          )}
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
              say(model);
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

export function Oral({
  c,
  value,
  disabled,
  quiet,
  change,
  win,
}: Game<"oral">) {
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
        quiet={quiet}
        onDone={() => {
          const next = [...done, round.model];
          change(next);
          if (next.length === c.rounds.length) win(true);
        }}
      />
    </>
  );
}

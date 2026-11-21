import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { playAll, say } from "../hooks";
import { preis } from "../lib/german";
import { shuffle } from "../lib/shuffle";
import { PlayButton } from "../markup";
import { nounAudio, storyAudio, wordInfo } from "./audio";
import { Gendered, Note, RouteMap, useQueue, walkAngle, type Game } from "./games";
import { budgetCheck, compoundOf, craftKey, craftMiss, decipher, floorLabel, gridKey, MOVES, NARRATOR, placeKey, plannerWho, proofSegments, pronounOf, protocolSlots, radioLine, retellSlots, springRight, tailCuts, treeSlots, twentyState, walk } from "./logic";
import { answerOf, excludes } from "./twenty";
import { sound } from "./sfx";
import type { Answer, ComicPanel, Move, PortraitPart, SpringRound, TreeNode, TreeSlot } from "./types";

// Мини-игры управляются нажатием и с клавиатуры, а ошибка только даёт подсказку.

type Tone = "good" | "bad" | undefined;
const asList = (value: Answer) => (Array.isArray(value) ? value : []);
const asRecord = (value: Answer) => (typeof value === "object" && !Array.isArray(value) ? value : {});

/** Перевод немецкой строки открывается по нажатию: сначала игрок читает сам. */
function Gloss({ de, ru }: { de: string; ru: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <span lang="de">{de}</span>{" "}
      {open ? (
        <small>{ru}</small>
      ) : (
        <button type="button" className="link-button" onClick={() => setOpen(true)}>
          Перевод
        </button>
      )}
    </li>
  );
}

/** «Похожие звуки»: прозвучало одно из похожих слов — какое? Раунды идут по очереди. */
export function Sounds({ c, value, seed, disabled, change, win, miss }: Game<"sounds">) {
  const done = asList(value);
  const round = c.rounds[done.length];
  const [note, setNote] = useState("");
  const [tone, setTone] = useState<Tone>();
  const options = useMemo(() => (round ? shuffle(round.options, `${seed}-${done.length}`) : []), [round, seed, done.length]);
  useEffect(() => {
    if (round && !disabled) say(nounAudio(round.say));
  }, [round, disabled]);
  if (!round || disabled) return <Note>Все пары разобраны.</Note>;
  function pick(word: string) {
    if (word !== round.say) {
      miss(round.say);
      setTone("bad");
      setNote(`Нет, это было не ${word}. Послушайте ещё раз.`);
      return say(nounAudio(round.say));
    }
    const next = [...done, round.say];
    setTone("good");
    setNote(`${round.say} — ${wordInfo(round.say)?.ru ?? ""}`);
    change(next);
    if (next.length === c.rounds.length) win();
  }
  return (
    <>
      <p className="moin-count">
        Пара {done.length + 1} из {c.rounds.length}
      </p>
      <div className="moin-call">
        <PlayButton src={nounAudio(round.say)} label="Послушать ещё раз" /> <span>Какое слово прозвучало?</span>
      </div>
      <div className="moin-odd">
        {options.map((word) => (
          <button type="button" key={word} lang="de" onClick={() => pick(word)}>
            <Gendered text={word} />
          </button>
        ))}
      </div>
      {note && <Note tone={tone}>{note}</Note>}
    </>
  );
}

/** «Склейка»: собрать сложное слово из частей и выбрать артикль — он по последней части. */
export function Compound({ c, value, seed, disabled, change, win, miss }: Game<"compound">) {
  const done = asList(value);
  const round = c.rounds[done.length];
  // Нажатые части по номеру плитки: одна плитка — одна часть, повторно её не нажать.
  const [used, setUsed] = useState<number[]>([]);
  const [note, setNote] = useState("");
  const [tone, setTone] = useState<Tone>();
  const tiles = useMemo(
    () => (round ? shuffle([...round.parts, ...c.extra.slice(0, 3)], `${seed}-${done.length}`) : []),
    [round, c.extra, seed, done.length],
  );
  if (!round || disabled) return <Note>Все слова собраны.</Note>;
  const built = used.map((i) => tiles[i]);
  const ready = built.length === round.parts.length;
  function choose(article: string) {
    const word = `${article} ${compoundOf(built)}`;
    if (word !== round.word) {
      miss(round.word);
      setTone("bad");
      const last = round.parts.at(-1)!;
      setNote(
        compoundOf(built) === round.word.slice(4)
          ? `Слово верное, а род — по последней части: ${round.word.slice(0, 3)} ${last}. Значит, ${round.word}.`
          : "Части не те. Попробуйте ещё раз.",
      );
      return setUsed([]);
    }
    const next = [...done, round.word];
    say(nounAudio(round.word));
    setTone("good");
    setNote(`${round.word} — ${round.ru}`);
    setUsed([]);
    change(next);
    if (next.length === c.rounds.length) win();
  }
  return (
    <>
      <p className="moin-count">
        Слово {done.length + 1} из {c.rounds.length}: {round.ru}
      </p>
      <div className="moin-compound" lang="de" aria-live="polite">
        {built.length ? compoundOf(built) : "…"}
      </div>
      <div className="moin-tiles">
        {tiles.map((part, i) => (
          <button
            type="button"
            key={`${part}-${i}`}
            lang="de"
            disabled={ready || used.includes(i)}
            onClick={() => setUsed([...used, i])}
          >
            {part}
          </button>
        ))}
        {built.length > 0 && (
          <button type="button" className="link-button" onClick={() => setUsed([])}>
            Сначала
          </button>
        )}
      </div>
      {ready && (
        <div className="moin-docks moin-compound-articles">
          {["der", "die", "das"].map((article) => (
            <div key={article} data-gender={article}>
              <button type="button" lang="de" onClick={() => choose(article)}>
                {article}
              </button>
            </div>
          ))}
        </div>
      )}
      {note && <Note tone={tone}>{note}</Note>}
    </>
  );
}

/** «Лифт»: жилец говорит, куда ему, — нажать этаж. Немецкий счёт: Erdgeschoss, erster Stock… */
export function Lift({ c, value, disabled, change, win, miss }: Game<"lift">) {
  const done = asList(value);
  const round = c.rounds[done.length];
  const [note, setNote] = useState("");
  const [tone, setTone] = useState<Tone>();
  const floors = Array.from({ length: c.top + 2 }, (_, i) => c.top - i);
  if (!round || disabled) return <Note>Все жильцы доехали.</Note>;
  const russian = (floor: number) =>
    floor < 0 ? "подвал" : floor === 0 ? "Erdgeschoss — наш первый этаж" : `${floor}-й Stock — наш ${floor + 1}-й этаж`;
  function press(floor: number) {
    if (floor !== round.floor) {
      miss();
      setTone("bad");
      return setNote(`Это ${floorLabel(floor)}: ${russian(floor)}. Послушайте жильца ещё раз.`);
    }
    sound("ding");
    const next = [...done, String(floor)];
    setTone("good");
    setNote(`${floorLabel(floor)}: ${russian(floor)}.`);
    change(next);
    if (next.length === c.rounds.length) win();
  }
  return (
    <>
      <p className="moin-count">
        Жилец {done.length + 1} из {c.rounds.length}
      </p>
      <ul className="moin-notes">
        <Gloss key={round.de} de={`${round.who}: «${round.de}»`} ru={round.ru} />
      </ul>
      <div className="moin-lift" role="group" aria-label="Кнопки лифта">
        {floors.map((floor) => (
          <button type="button" key={floor} onClick={() => press(floor)}>
            {floorLabel(floor)}
          </button>
        ))}
      </div>
      {note && <Note tone={tone}>{note}</Note>}
    </>
  );
}

/** «Wer war wo?» и варианты: по уликам раздать людям значения столбцов. */
export function Grid({ c, value, disabled, change }: Game<"grid">) {
  const record = asRecord(value);
  function set(person: string, col: string, v: string) {
    change({ ...record, [gridKey(person, col)]: v });
  }
  return (
    <>
      <ul className="moin-notes">
        {c.clues.map((clue) => (
          <Gloss key={clue.de} de={clue.de} ru={clue.ru} />
        ))}
      </ul>
      <div className="moin-grid">
        {c.people.map((person) => (
          <div key={person} className="moin-grid-row">
            <b lang="de">{person}</b>
            {c.cols.map((col) => (
              <div key={col.id} role="group" aria-label={`${person}: ${col.label}`}>
                <small>{col.label}</small>
                {col.values.map((v) => (
                  <button
                    type="button"
                    key={v}
                    lang="de"
                    disabled={disabled}
                    aria-pressed={record[gridKey(person, col.id)] === v}
                    onClick={() => set(person, col.id, v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

/** «Найди противоречие»: в двух показаниях отметить слова, которые не сходятся. */
export function Contra({ c, value, disabled, checked, change }: Game<"contra">) {
  const picked = asList(value);
  const toggle = (id: string) => change(picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id]);
  return (
    <>
      <div className="moin-contra">
        {c.texts.map((text, ti) => (
          <div key={ti} className="moin-source">
            <div className="kicker">{text.who}</div>
            {text.lines.map((tokens, li) => (
              <p key={li} lang="de">
                {tokens.map((token, wi) => {
                  const id = `${ti}:${li}:${wi}`;
                  return (
                    <Fragment key={id}>
                      {wi > 0 && " "}
                      <button
                        type="button"
                        className="moin-token"
                        disabled={disabled}
                        aria-pressed={picked.includes(id)}
                        data-wrong={(checked && picked.includes(id) && !c.answer.includes(id)) || undefined}
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
        ))}
      </div>
      <p className="moin-count">
        Выбрано: {picked.length} из {c.answer.length}
      </p>
    </>
  );
}

/** «Ежедневник»: отметить занятое и поставить встречу ★ туда, где свободны все. */
export function Planner({ c, value, disabled, checked, change }: Game<"planner">) {
  const record = asRecord(value);
  // Нажатие по клетке: пусто → занято → встреча → пусто. Встреча одна: новая убирает прежнюю.
  function tap(cell: string) {
    const now = record[cell];
    const next: Record<string, string> = Object.fromEntries(Object.entries(record).map(([k, v]) => [k, String(v)]));
    if (!now) next[cell] = "busy";
    else if (now === "busy") {
      for (const k of Object.keys(next)) if (next[k] === "star") delete next[k];
      next[cell] = "star";
    } else delete next[cell];
    change(next);
  }
  const star = Object.keys(record).find((k) => record[k] === "star");
  return (
    <>
      <ul className="moin-notes">
        {c.notes.map((n) => (
          <Gloss key={n.who} de={`${n.who}: «${n.de}»`} ru={n.ru} />
        ))}
      </ul>
      <table className="moin-planner">
        <thead>
          <tr>
            <th />
            {c.hours.map((h) => (
              <th key={h} lang="de">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {c.days.map((d) => (
            <tr key={d}>
              <th lang="de">{d}</th>
              {c.hours.map((h) => {
                const cell = `${d}|${h}`;
                const mark = record[cell];
                return (
                  <td key={cell}>
                    <button
                      type="button"
                      disabled={disabled}
                      data-mark={mark || undefined}
                      data-wrong={(checked && mark === "star" && plannerWho(c, cell).length > 0) || undefined}
                      aria-label={`${d}, ${h}: ${mark === "star" ? "встреча" : mark === "busy" ? "занято" : "свободно"}`}
                      onClick={() => tap(cell)}
                    >
                      {mark === "star" ? "★" : mark === "busy" ? "✗" : ""}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="moin-count">
        Нажмите клетку: ✗ — занято, ещё раз — ★ встреча.{star ? ` Встреча: ${star.replace("|", ", ")}.` : ""}
      </p>
    </>
  );
}

/** «Объявления»: подобрать людям объявления; кому ни одно не подходит — так и отметить. */
export function Ads({ c, value, disabled, change }: Game<"ads">) {
  const record = asRecord(value);
  return (
    <>
      <div className="moin-ads">
        {c.ads.map((ad) => (
          <div key={ad.id} className="moin-source">
            <div className="kicker" lang="de">
              {ad.id}. {ad.title}
            </div>
            <p lang="de">{ad.text}</p>
          </div>
        ))}
      </div>
      {c.people.map((p) => (
        <div key={p.id} className="moin-ads-person">
          <p lang="de">{p.text}</p>
          <div role="group" aria-label={`Объявление для: ${p.text}`}>
            {[...c.ads.map((a) => a.id), "0"].map((id) => (
              <button
                type="button"
                key={id}
                disabled={disabled}
                aria-pressed={record[p.id] === id}
                onClick={() => change({ ...record, [p.id]: id })}
              >
                {id === "0" ? "ничего" : id}
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/** «Шифр чайки»: номера букв (A = 1) или сдвиг по алфавиту; подсказка-азбука под рукой. */
export function Cipher({ c, value, disabled, change }: Game<"cipher">) {
  const text = typeof value === "string" ? value : "";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <>
      <p className="moin-cipher-code" lang="de">
        {c.code}
      </p>
      <div className="moin-cipher-key" aria-label="Азбука">
        {letters.map((ch, i) => (
          <span key={ch}>
            <b>{c.shift === undefined ? i + 1 : letters[(i + c.shift) % 26]}</b>
            {ch}
          </span>
        ))}
      </div>
      <label className="moin-cipher-input">
        Расшифровка
        <input
          type="text"
          lang="de"
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
          value={text}
          onChange={(e) => change(e.target.value.toUpperCase())}
        />
      </label>
      {disabled && <Note tone="good">{decipher(c)}</Note>}
    </>
  );
}

/** «Семейное дерево»: нажать имя, потом клетку. Нажатие по заполненной клетке её очищает. */
export function Tree({ c, value, seed, disabled, checked, change }: Game<"tree">) {
  const record = asRecord(value);
  const [held, setHeld] = useState<string>();
  const names = useMemo(() => shuffle(c.names, seed), [c.names, seed]);
  const placed = new Set(Object.values(record).map(String));
  const open = treeSlots(c.root).filter((s) => !s.given).length;
  function tap(id: string) {
    const next: Record<string, string> = Object.fromEntries(Object.entries(record).map(([k, v]) => [k, String(v)]));
    if (held) {
      for (const k of Object.keys(next)) if (next[k] === held) delete next[k];
      next[id] = held;
      setHeld(undefined);
    } else if (next[id]) delete next[id];
    else return;
    change(next);
  }
  const slot = (s: TreeSlot) => {
    if (s.given)
      return (
        <span className="moin-tree-slot" data-given="">
          {s.icon && <span aria-hidden="true">{s.icon}</span>}
          <b lang="de">{s.given}</b>
        </span>
      );
    const name = record[s.id] === undefined ? undefined : String(record[s.id]);
    return (
      <button
        type="button"
        className="moin-tree-slot"
        disabled={disabled}
        data-wrong={(checked && name !== undefined && name !== c.answer[s.id]) || undefined}
        aria-label={name ? `Клетка: ${name}` : "Пустая клетка"}
        onClick={() => tap(s.id)}
      >
        <span aria-hidden="true">{s.icon ?? "?"}</span>
        <b lang="de">{name ?? "…"}</b>
      </button>
    );
  };
  const branch = (n: TreeNode) => (
    <li key={n.id}>
      <div className="moin-tree-couple">
        {slot(n)}
        {n.partner && slot(n.partner)}
      </div>
      {n.children && <ul>{n.children.map(branch)}</ul>}
    </li>
  );
  return (
    <>
      <ul className="moin-notes">
        {c.text.map((t) => (
          <Gloss key={t.de} de={t.de} ru={t.ru} />
        ))}
      </ul>
      <div className="moin-tree">
        <ul>{branch(c.root)}</ul>
      </div>
      <div className="moin-tiles" role="group" aria-label="Имена">
        {names.map((name) => (
          <button
            type="button"
            key={name}
            lang="de"
            disabled={disabled}
            aria-pressed={held === name}
            data-used={placed.has(name) || undefined}
            onClick={() => setHeld(held === name ? undefined : name)}
          >
            {name}
          </button>
        ))}
      </div>
      <p className="moin-count">
        {held ? `Куда вписать ${held}? Нажмите клетку.` : `Нажмите имя, потом клетку. Вписано: ${Object.keys(record).length} из ${open}.`}
      </p>
    </>
  );
}

/** Краски для цветов из словаря COLOURS: ими рисуют фоторобот и «Я шпион». */
const PAINT: Record<string, string> = {
  rot: "#c63b2f",
  gelb: "#e8b630",
  blau: "#2f6fc0",
  dunkelblau: "#22406b",
  "grün": "#3d8c4b",
  schwarz: "#22252a",
  "weiß": "#f3efe4",
  grau: "#8d939b",
  braun: "#87583a",
};

/** Портрет фоторобота: несобранная часть видна пунктиром, ростомер слева. */
function Face({ look }: { look: Partial<Record<PortraitPart, string>> }) {
  const scale = look.size === "klein" ? 0.8 : 1;
  const hair = look.age === "alt" ? "#e6e2d8" : look.age === "nicht alt" ? "#5b3b24" : undefined;
  const cloth = look.colour ? PAINT[look.colour] : undefined;
  const top = look.top;
  const dash = { fill: "none", stroke: "currentColor", strokeDasharray: "4 3", opacity: 0.5 };
  const body = top ? { fill: cloth ?? "#9aa3ad", stroke: "#2b2f36", strokeWidth: 1.5 } : dash;
  // Корпус: у пальто длиннее, у пиджака и пальто — застёжка, у рубашки — воротник.
  const hem = top === "der Mantel" ? 150 : 118;
  return (
    <svg className="moin-face" viewBox="0 0 150 210" role="img" aria-label="Фоторобот">
      {[40, 80, 120].map((y, i) => (
        <g key={y} opacity={0.45}>
          <line x1="0" x2="150" y1={y} y2={y} stroke="currentColor" strokeWidth="0.6" />
          <text x="2" y={y - 3} fontSize="9" fill="currentColor">
            {["1,90", "1,70", "1,50"][i]}
          </text>
        </g>
      ))}
      <g transform={`translate(75 205) scale(${scale}) translate(-75 -205)`}>
        <rect x="58" y={hem} width="14" height={205 - hem} rx="3" fill="#3a3f47" />
        <rect x="78" y={hem} width="14" height={205 - hem} rx="3" fill="#3a3f47" />
        <path d={`M48 66 Q75 58 102 66 L110 ${hem} L40 ${hem} Z`} {...body} />
        <path d="M48 66 L32 114 L41 117 L53 82" {...body} />
        <path d="M102 66 L118 114 L109 117 L97 82" {...body} />
        {(top === "die Jacke" || top === "der Mantel") && <line x1="75" y1="64" x2="75" y2={hem} stroke="#2b2f36" strokeWidth="1.5" />}
        {top === "der Mantel" && [84, 104, 124].map((y) => <circle key={y} cx="80" cy={y} r="2" fill="#2b2f36" />)}
        {top === "das Hemd" && <path d="M66 62 L75 74 L84 62" fill="none" stroke="#2b2f36" strokeWidth="1.5" />}
        {top === "der Pullover" && <path d="M64 62 Q75 70 86 62" fill="none" stroke="#2b2f36" strokeWidth="1.5" />}
        <circle cx="75" cy="42" r="17" fill="#e9c8a6" stroke="#2b2f36" strokeWidth="1.2" />
        {hair ? (
          <path d="M57 48 Q54 25 75 24 Q96 25 93 48 Q91 37 75 35 Q59 37 57 48 Z" fill={hair} stroke="#2b2f36" strokeWidth="1.2" />
        ) : (
          <path d="M58 42 A17 17 0 0 1 92 42" {...dash} />
        )}
        <circle cx="69" cy="44" r="1.6" fill="#2b2f36" />
        <circle cx="81" cy="44" r="1.6" fill="#2b2f36" />
        <path d="M69 51 Q75 54 81 51" fill="none" stroke="#2b2f36" strokeWidth="1.2" />
      </g>
      {look.says && (
        <g>
          <rect x="96" y="4" width="52" height="24" rx="8" fill="var(--panel)" stroke="currentColor" strokeWidth="1" />
          <text x="122" y="20" fontSize="11" textAnchor="middle" fill="currentColor" lang="de">
            {look.says}
          </text>
        </g>
      )}
    </svg>
  );
}

/** «Фоторобот»: по приметам выбрать каждую часть портрета. */
export function Portrait({ c, value, disabled, checked, change }: Game<"portrait">) {
  const record = asRecord(value);
  const look = Object.fromEntries(Object.entries(record).map(([k, v]) => [k, String(v)])) as Partial<Record<PortraitPart, string>>;
  return (
    <>
      <ul className="moin-notes">
        {c.notes.map((n) => (
          <Gloss key={n.de} de={n.de} ru={n.ru} />
        ))}
      </ul>
      <div className="moin-portrait">
        <Face look={look} />
        <div className="moin-grid">
          {c.parts.map((part) => (
            <div
              key={part.id}
              className="moin-grid-row"
              role="group"
              aria-label={part.label}
              data-wrong={(checked && look[part.id] !== undefined && look[part.id] !== c.answer[part.id]) || undefined}
            >
              <div>
                <small>{part.label}</small>
                {part.options.map((o) => (
                  <button
                    type="button"
                    key={o}
                    lang="de"
                    disabled={disabled}
                    aria-pressed={look[part.id] === o}
                    onClick={() => change({ ...look, [part.id]: o })}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/** Силуэты вещей «Я шпиона» в квадрате 60×60. */
const SHAPE: Record<string, { body: string; marks?: string }> = {
  "die Hose": { body: "M17 7 L43 7 L46 54 L33 54 L30 22 L27 54 L14 54 Z" },
  "das T-Shirt": { body: "M18 9 L26 7 Q30 12 34 7 L42 9 L53 19 L46 26 L42 23 L42 53 L18 53 L18 23 L14 26 L7 19 Z" },
  "das Hemd": {
    body: "M18 9 L26 7 L34 7 L42 9 L50 17 L54 46 L47 47 L42 25 L42 53 L18 53 L18 25 L13 47 L6 46 L10 17 Z",
    marks: "M26 7 L30 15 L34 7 M30 15 L30 53",
  },
  "die Jacke": {
    body: "M18 9 L26 7 Q30 11 34 7 L42 9 L50 17 L54 46 L47 47 L42 25 L42 53 L18 53 L18 25 L13 47 L6 46 L10 17 Z",
    marks: "M30 10 L30 53 M23 8 L27 15 M37 8 L33 15",
  },
  "der Pullover": {
    body: "M18 9 L26 7 Q30 11 34 7 L42 9 L50 17 L54 46 L47 47 L42 25 L42 53 L18 53 L18 25 L13 47 L6 46 L10 17 Z",
    marks: "M18 49 L42 49 M26 7 Q30 12 34 7",
  },
  "der Mantel": {
    body: "M19 5 L26 3 Q30 7 34 3 L41 5 L49 13 L53 42 L46 43 L42 22 L45 57 L15 57 L18 22 L14 43 L7 42 L11 13 Z",
    marks: "M30 6 L30 57",
  },
  "das Kleid": { body: "M24 7 L36 7 L35 21 L47 54 L13 54 L25 21 Z", marks: "M25 21 L35 21 M24 7 L22 2 M36 7 L38 2" },
  "der Schuh": { body: "M8 37 Q9 26 18 26 L26 28 Q30 34 40 36 L52 40 Q55 46 50 48 L10 48 Q7 46 8 37 Z", marks: "M8 43 L53 43" },
};

function Garment({ de, colour }: { de: string; colour: string }) {
  const shape = SHAPE[de];
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true">
      <path d={shape.body} fill={PAINT[colour]} stroke="#2b2f36" strokeWidth="1.5" strokeLinejoin="round" />
      {shape.marks && <path d={shape.marks} fill="none" stroke={colour === "schwarz" ? "#8d939b" : "#2b2f36"} strokeWidth="1.2" />}
    </svg>
  );
}

/** «Я шпион»: Хауке загадывает вещь по местоимению и цвету, игрок нажимает её. */
export function Spy({ c, value, seed, disabled, change, win, miss }: Game<"spy">) {
  const done = asList(value);
  const round = c.rounds[done.length];
  const [note, setNote] = useState("");
  const [tone, setTone] = useState<Tone>();
  const items = useMemo(() => shuffle(c.items, seed), [c.items, seed]);
  if (!round || disabled) return <Note>Все загадки отгаданы.</Note>;
  function pick(de: string, colour: string) {
    if (de !== round.answer) {
      miss(round.answer);
      setTone("bad");
      return setNote(`Это ${de}: ${pronounOf(de)} ist ${colour}. А загадано: ${round.pronoun} ist ${round.colour}.`);
    }
    const next = [...done, de];
    setTone("good");
    setNote(`${de} — ${round.pronoun} ist ${round.colour}.`);
    change(next);
    if (next.length === c.rounds.length) win();
  }
  return (
    <>
      <p className="moin-count">
        Загадка {done.length + 1} из {c.rounds.length}
      </p>
      <ul className="moin-notes">
        <Gloss key={round.de} de={round.de} ru={round.ru} />
      </ul>
      <div className="moin-spy">
        {items.map((item) => (
          <button type="button" key={item.de} lang="de" onClick={() => pick(item.de, item.colour)}>
            <Garment de={item.de} colour={item.colour} />
            <span>{item.de.slice(item.de.indexOf(" ") + 1)}</span>
          </button>
        ))}
      </div>
      {note && <Note tone={tone}>{note}</Note>}
    </>
  );
}

/**
 * «20 вопросов»: загадывающий задумал одну карточку. Игрок задаёт вопросы «да/нет», слышит ответ и
 * сам вычёркивает тех, кого ответ исключил. Вычеркнуть того, кого ни один ответ не исключает, нельзя:
 * так угадать перебором не выйдет, а ошибка только подсказывает.
 */
export function Twenty({ c, value, seed, disabled, change, win, miss }: Game<"twenty">) {
  const entries = asList(value);
  const { asked, crossed } = twentyState(c, entries);
  const [note, setNote] = useState("");
  const [tone, setTone] = useState<Tone>();
  // Перевод вопроса открывается по нажатию, как у реплик: сначала игрок читает немецкий сам.
  const [glossed, setGlossed] = useState<number[]>([]);
  const cards = useMemo(() => shuffle(c.cards, seed), [c.cards, seed]);
  const questions = useMemo(() => shuffle(c.questions.map((q, i) => ({ q, i })), `${seed}-q`), [c.questions, seed]);
  const target = c.cards.find((card) => card.id === c.answer)!;
  if (disabled) return <Note>Загадка отгадана: {target.de}.</Note>;
  const reply = (i: number) => (answerOf(c.questions[i], c.answer) ? "Ja." : "Nein.");
  function ask(i: number) {
    if (asked.includes(i)) return say(storyAudio(reply(i), c.voice));
    playAll([storyAudio(c.questions[i].de, NARRATOR), storyAudio(reply(i), c.voice)]);
    setNote("");
    change([...entries, `?${i}`]);
  }
  function cross(id: string) {
    const card = c.cards.find((x) => x.id === id)!;
    if (crossed.includes(id)) return;
    if (!asked.some((q) => excludes(c, q, id))) {
      miss(card.unit);
      setTone("bad");
      return setNote(`Пока ни один ответ не исключает: ${card.de}. Спросите ещё.`);
    }
    const next = [...entries, `x:${id}`];
    change(next);
    if (crossed.length + 1 === c.cards.length - 1) {
      setTone("good");
      setNote(`Остался один ответ: ${target.de}!`);
      win();
    } else {
      setTone(undefined);
      setNote("");
    }
  }
  return (
    <>
      <p className="moin-count">
        Отвечает {c.who} · вопросов: {asked.length}
      </p>
      <div className="moin-twenty-cards">
        {cards.map((card) => (
          <button
            type="button"
            key={card.id}
            lang="de"
            aria-pressed={crossed.includes(card.id)}
            disabled={crossed.includes(card.id)}
            onClick={() => cross(card.id)}
          >
            <span aria-hidden="true">{card.icon}</span>
            <span>{card.de}</span>
          </button>
        ))}
      </div>
      <ul className="moin-twenty-questions">
        {questions.map(({ q, i }) => (
          <li key={q.de}>
            <button type="button" lang="de" onClick={() => ask(i)}>
              {q.de}
            </button>
            {asked.includes(i) ? (
              <small>
                <b lang="de">{reply(i)}</b> {q.ru}
              </small>
            ) : glossed.includes(i) ? (
              <small>{q.ru}</small>
            ) : (
              <button type="button" className="link-button" onClick={() => setGlossed([...glossed, i])}>
                Перевод
              </button>
            )}
          </li>
        ))}
      </ul>
      {note && <Note tone={tone}>{note}</Note>}
    </>
  );
}

/**
 * «Карта погоды»: прогноз звучит по радио, игрок ставит значок погоды на каждый день и сам проверяет.
 * На значках только картинки: слово погоды нужно услышать. Ошибка называет, сколько дней не сходится,
 * но не какие; после второй неудачной проверки открывается текст прогноза, как у письма по образцу.
 */
export function Weather({ c, value, disabled, change, win, miss }: Game<"weather">) {
  const record = asRecord(value);
  const [note, setNote] = useState("");
  const [tone, setTone] = useState<Tone>();
  const [failed, setFailed] = useState(0);
  const lines = c.forecast.map((f) => storyAudio(f.de, c.voice));
  if (disabled) return <Note>Прогноз разобран.</Note>;
  function check() {
    if (c.days.some((day) => !record[day])) {
      setTone("bad");
      return setNote("Выберите значок для каждого дня.");
    }
    const wrong = c.forecast.filter((f) => record[f.day] !== f.sky);
    if (wrong.length) {
      wrong.forEach((f) => miss(c.skies.find((s) => s.id === f.sky)!.de));
      setFailed(failed + 1);
      setTone("bad");
      return setNote(`Не сходится дней: ${wrong.length}. Послушайте прогноз ещё раз.`);
    }
    setTone("good");
    setNote("Всё сходится с прогнозом.");
    win();
  }
  return (
    <>
      <div className="moin-program-run moin-weather-play">
        <button type="button" onClick={() => playAll(lines)}>
          ▶ Слушать прогноз
        </button>
        {lines.map((src, i) => (
          <PlayButton key={c.forecast[i].de} src={src} label={`Фраза ${i + 1}`} />
        ))}
      </div>
      {c.days.map((day) => (
        <div key={day} className="moin-ads-person moin-weather-day">
          <p lang="de">{day}</p>
          <div role="group" aria-label={day}>
            {c.skies.map((sky) => (
              <button
                type="button"
                key={sky.id}
                aria-pressed={record[day] === sky.id}
                aria-label={sky.ru}
                title={sky.ru}
                onClick={() => {
                  setNote("");
                  change({ ...record, [day]: sky.id });
                }}
              >
                <span aria-hidden="true">{sky.icon}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="moin-program-run">
        <button type="button" onClick={check}>
          Проверить
        </button>
      </div>
      {note && <Note tone={tone}>{note}</Note>}
      {failed >= 2 && (
        <ul className="moin-notes" aria-label="Текст прогноза">
          {c.forecast.map((f) => (
            <Gloss key={f.de} de={f.de} ru={f.ru} />
          ))}
        </ul>
      )}
    </>
  );
}

/** Карточки «Алгоритма»: повелительное наклонение на Sie, как в объяснении дороги. */
export const COMMAND: Record<Move, string> = {
  geradeaus: "Gehen Sie geradeaus.",
  links: "Gehen Sie links.",
  rechts: "Gehen Sie rechts.",
};

/** «Алгоритм»: программа из карточек, «Пуск» — Хауке проходит её шаг за шагом. */
export function Algo({ c, value, disabled, change }: Game<"algo">) {
  const program = asList(value) as Move[];
  const path = walk(c, program);
  // Сколько шагов уже показано; null — программа ещё не запускалась после правки.
  const [shown, setShown] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearInterval(timer.current), []);
  const full = c.max !== undefined && program.length >= c.max;
  function edit(next: Move[]) {
    window.clearInterval(timer.current);
    setShown(null);
    change(next);
  }
  function run() {
    window.clearInterval(timer.current);
    setShown(0);
    let k = 0;
    timer.current = window.setInterval(() => {
      k += 1;
      setShown(k);
      if (k >= path.length - 1) window.clearInterval(timer.current);
    }, 450);
  }
  const steps = shown === null ? 0 : Math.min(shown, path.length - 1);
  const at = path[steps];
  const done = shown !== null && steps >= path.length - 1;
  const place = c.places[placeKey(at)];
  const status = !done
    ? shown === null
      ? `Цель — ${c.places[c.goal]}. Соберите программу и нажмите «Пуск».`
      : "Хауке идёт…"
    : path.length < program.length + 1
      ? `Шаг ${path.length} уводит за край схемы: Хауке остановился.`
      : placeKey(at) === c.goal
        ? `Hier ist ${place}. Хауке дошёл!`
        : `Хауке стоит: ${place ?? "eine Kreuzung"}. Это не цель.`;
  return (
    <div className="moin-walk">
      <RouteMap c={c} path={path.slice(0, steps + 1)} angle={walkAngle(c.start.heading, program.slice(0, steps))} reveal />
      <p className="moin-count" role="status">
        {status}
      </p>
      <ol className="moin-program" aria-label="Программа">
        {program.map((move, i) => (
          <li key={i} lang="de" data-now={(shown !== null && !done && i === steps) || undefined}>
            {COMMAND[move]}
            <button type="button" className="link-button" disabled={disabled} aria-label={`Убрать шаг ${i + 1}`} onClick={() => edit(program.filter((_, j) => j !== i))}>
              ×
            </button>
          </li>
        ))}
      </ol>
      <div className="moin-walk-moves" role="group" aria-label="Карточки">
        {MOVES.map((move) => (
          <button type="button" key={move} lang="de" disabled={disabled || full} onClick={() => edit([...program, move])}>
            {COMMAND[move]}
          </button>
        ))}
      </div>
      <div className="moin-program-run">
        <button type="button" disabled={disabled || !program.length} onClick={run}>
          ▶ Пуск
        </button>
        <button type="button" className="link-button" disabled={disabled || !program.length} onClick={() => edit([])}>
          Очистить программу
        </button>
        {c.max !== undefined && (
          <span>
            Карточек: {program.length} из {c.max}
          </span>
        )}
      </div>
    </div>
  );
}

const nounBare = (word: string) => word.replace(/^(der|die|das) /, "");

/** «Пружина порядка слов». */

function SpringRoundView({
  round,
  onWin,
  onMiss,
}: {
  round: SpringRound;
  onWin: () => void;
  onMiss: () => void;
}) {
  const [tiles, setTiles] = useState<string[]>(round.start);
  const [picked, setPicked] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [tone, setTone] = useState<Tone>();

  function tap(i: number) {
    setNote("");
    if (picked === null) return setPicked(i);
    if (picked === i) return setPicked(null);
    const next = [...tiles];
    const [moved] = next.splice(picked, 1);
    next.splice(i, 0, moved);
    setTiles(next);
    setPicked(null);
  }
  function shift(by: -1 | 1) {
    if (picked === null) return;
    const to = picked + by;
    if (to < 0 || to >= tiles.length) return;
    const next = [...tiles];
    const [moved] = next.splice(picked, 1);
    next.splice(to, 0, moved);
    setTiles(next);
    setPicked(to);
  }
  function check() {
    if (!springRight(round, tiles)) {
      onMiss();
      setTone("bad");
      return setNote(round.why);
    }
    onWin();
  }
  return (
    <>
      <div className="moin-spring-base">
        <small>Было:</small> <span lang="de">{round.base.join(" ")}</span>{" "}
        <b lang="de" className="moin-spring-trigger">
          + {round.trigger}
        </b>
      </div>
      <div className="moin-tiles" role="group" aria-label="Слова фразы">
        {tiles.map((t, i) => (
          <button
            type="button"
            key={`${t}-${i}`}
            lang="de"
            aria-pressed={picked === i}
            onClick={() => tap(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="moin-spring-tools">
        {picked !== null && (
          <>
            <button type="button" disabled={picked === 0} onClick={() => shift(-1)} aria-label="Сдвинуть влево">
              ←
            </button>
            <button type="button" disabled={picked === tiles.length - 1} onClick={() => shift(1)} aria-label="Сдвинуть вправо">
              →
            </button>
          </>
        )}
        <button type="button" className="link-button" onClick={() => { setTiles(round.start); setPicked(null); setNote(""); }}>
          Сначала
        </button>
        <button type="button" className="primary" onClick={check}>
          Проверить
        </button>
      </div>
      {note && <Note tone={tone}>{note}</Note>}
    </>
  );
}

export function Spring({ c, value, disabled, change, win, miss }: Game<"spring">) {
  const done = asList(value);
  const round = c.rounds[done.length];
  if (!round || disabled) return <Note tone="good">Все фразы перестроены.</Note>;
  return (
    <>
      <p className="moin-count">
        Фраза {done.length + 1} из {c.rounds.length}: {round.ru}
      </p>
      <SpringRoundView
        key={done.length}
        round={round}
        onMiss={() => miss()}
        onWin={() => {
          const next = [...done, round.answer.join(" ")];
          change(next);
          if (next.length === c.rounds.length) win();
        }}
      />
    </>
  );
}

/** «Расставь вещи по плану». */

export function Room({ c, value, disabled, checked, change }: Game<"room">) {
  const record = asRecord(value);
  const [held, setHeld] = useState<string | null>(null);
  const active = held ?? c.items.find((i) => !record[i.id])?.id ?? null;

  function tapSpot(spotId: string) {
    if (disabled) return;
    const occupant = c.items.find((i) => record[i.id] === spotId);
    if (occupant && (!held || occupant.id === held)) {
      const next = { ...record };
      delete next[occupant.id];
      setHeld(null);
      return change(next);
    }
    if (!active) return;
    const next = Object.fromEntries(Object.entries(record).filter(([, s]) => s !== spotId));
    next[active] = spotId;
    setHeld(null);
    change(next);
  }

  return (
    <>
      <ul className="moin-notes">
        {c.notes.map((n, i) => (
          <Gloss key={i} de={n.de} ru={n.ru} />
        ))}
      </ul>
      <div className="moin-room">
        <svg viewBox="0 0 320 200" aria-label={c.title}>
          <rect x="4" y="4" width="312" height="192" rx="6" className="moin-room-wall" />
          {c.furniture.map((f, i) => (
            <g key={i}>
              <rect x={f.x} y={f.y} width={f.w} height={f.h} rx="4" className="moin-room-box" />
              <text x={f.x + f.w / 2} y={f.y + f.h / 2 + 4} textAnchor="middle" className="moin-room-label">
                {f.label}
              </text>
            </g>
          ))}
        </svg>
        {c.spots.map((s) => {
          const item = c.items.find((i) => record[i.id] === s.id);
          return (
            <button
              type="button"
              key={s.id}
              disabled={disabled}
              className="moin-room-spot"
              style={{ left: `${(s.x / 320) * 100}%`, top: `${(s.y / 200) * 100}%` }}
              data-filled={Boolean(item) || undefined}
              data-wrong={(checked && item && c.answer[item.id] !== s.id) || undefined}
              aria-label={item ? `${s.label}: ${item.de}` : s.label}
              onClick={() => tapSpot(s.id)}
            >
              {item ? (
                <>
                  <span>{item.icon}</span>
                  <small lang="de">{nounBare(item.de)}</small>
                </>
              ) : (
                <small>{s.label}</small>
              )}
            </button>
          );
        })}
      </div>
      <div className="moin-tiles">
        {c.items.map((item) => {
          const placed = Boolean(record[item.id]);
          return (
            <button
              type="button"
              key={item.id}
              disabled={disabled}
              aria-pressed={active === item.id}
              data-placed={placed || undefined}
              onClick={() => {
                if (placed) {
                  const next = { ...record };
                  delete next[item.id];
                  change(next);
                  setHeld(item.id);
                } else {
                  setHeld(item.id);
                }
              }}
            >
              {item.icon} <span lang="de">{item.de}</span>
            </button>
          );
        })}
      </div>
      <p className="moin-count">Выберите предмет и нажмите место на плане.</p>
    </>
  );
}

/** «Порванная записка». */

export function Torn({ c, value, seed, disabled, change }: Game<"torn">) {
  const order = asList(value);
  const pool = useMemo(() => shuffle(c.strips, seed), [c.strips, seed]);
  const [glossed, setGlossed] = useState<string[]>([]);

  function move(i: number, by: -1 | 1) {
    const to = i + by;
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    const [x] = next.splice(i, 1);
    next.splice(to, 0, x);
    change(next);
  }

  return (
    <>
      <div className="moin-torn-sheet">
        <div className="kicker">{c.title}</div>
        {order.length ? (
          <ol className="moin-torn-list">
            {order.map((id, i) => {
              const strip = c.strips.find((s) => s.id === id);
              if (!strip) return null;
              return (
                <li key={id} className="moin-torn-row">
                  <button type="button" lang="de" disabled={disabled} onClick={() => change(order.filter((x) => x !== id))}>
                    {strip.de}
                  </button>
                  <div className="moin-torn-arrows">
                    <button type="button" disabled={disabled || i === 0} aria-label="Выше" onClick={() => move(i, -1)}>
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={disabled || i === order.length - 1}
                      aria-label="Ниже"
                      onClick={() => move(i, 1)}
                    >
                      ↓
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="moin-count">Нажимайте на обрывки ниже по порядку.</p>
        )}
      </div>
      <div className="moin-torn-pool">
        {pool.map((strip) => {
          const used = order.includes(strip.id);
          const open = glossed.includes(strip.id);
          return (
            <div key={strip.id} className="moin-torn-pick">
              <button
                type="button"
                lang="de"
                disabled={disabled || used}
                onClick={() => change([...order, strip.id])}
              >
                {strip.de}
              </button>
              {open ? (
                <small>{strip.ru}</small>
              ) : (
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setGlossed([...glossed, strip.id])}
                >
                  Перевод
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

/** «Два причала». */

export function Contrast({ c, value, seed, disabled, change, win, miss }: Game<"contrast">) {
  const done = asList(value);
  const { current, postpone } = useQueue(
    c.items.map((i) => i.id),
    seed,
    done,
  );
  const item = c.items.find((i) => i.id === current);
  const [note, setNote] = useState("");
  const [tone, setTone] = useState<Tone>();

  function tap(bayId: string) {
    if (!item || disabled) return;
    if (item.bay !== bayId) {
      miss();
      setTone("bad");
      setNote(`${item.why} Карточка вернётся в конце.`);
      return postpone(item.id);
    }
    const next = [...done, item.id];
    setTone("good");
    setNote(item.why);
    change(next);
    if (next.length === c.items.length) win();
  }

  return (
    <>
      {item && !disabled && (
        <div className="moin-contrast-card">
          <b lang="de">{item.text}</b>
          {item.ru && <small>{item.ru}</small>}
        </div>
      )}
      <div
        className="moin-docks"
        style={{ gridTemplateColumns: `repeat(${c.bays.length}, minmax(0, 1fr))` }}
      >
        {c.bays.map((bay) => (
          <div key={bay.id} className="moin-contrast-bay">
            <button type="button" lang="de" disabled={disabled} onClick={() => tap(bay.id)}>
              {bay.label}
              {bay.sub && <small>{bay.sub}</small>}
            </button>
            <ul lang="de">
              {done
                .map((id) => c.items.find((i) => i.id === id))
                .filter((i) => i && i.bay === bay.id)
                .map((i) => (
                  <li key={i!.id}>{i!.text}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <Note tone={note ? tone : undefined}>{note || `Разобрано: ${done.length} из ${c.items.length}`}</Note>
    </>
  );
}

/** «Охота на хвост». */

function TailRoundView({
  round,
  onWin,
  onMiss,
}: {
  round: Game<"tail">["c"]["rounds"][number];
  onWin: () => void;
  onMiss: () => void;
}) {
  const bare = nounBare(round.word);
  const tail = round.parts.at(-1)!;
  const trueCut = bare.length - tail.length;
  const cuts = useMemo(() => tailCuts(bare, tail), [bare, tail]);
  const [cutDone, setCutDone] = useState(false);
  const [note, setNote] = useState("");
  const [tone, setTone] = useState<Tone>();

  function cutAt(pos: number) {
    if (pos !== trueCut) {
      onMiss();
      setTone("bad");
      return setNote("Ищите самое последнее самостоятельное слово: именно оно задаёт артикль.");
    }
    setCutDone(true);
    setTone("good");
    setNote(`Хвост: ${bare.slice(trueCut)}. Теперь выберите артикль.`);
  }

  function pickArticle(article: string) {
    const word = `${article} ${bare}`;
    if (word !== round.word) {
      onMiss();
      setTone("bad");
      return setNote(`Нет, «${bare.slice(trueCut)}» другого рода.`);
    }
    say(nounAudio(round.word));
    onWin();
  }

  return (
    <>
      <p className="moin-tail-word" lang="de">
        {cutDone ? (
          <>
            <span className="moin-tail-prefix">{bare.slice(0, trueCut)}</span>
            <b>{bare.slice(trueCut)}</b>
          </>
        ) : (
          bare
        )}
      </p>
      {!cutDone ? (
        <div className="moin-tiles">
          {cuts.map((pos) => (
            <button type="button" key={pos} lang="de" onClick={() => cutAt(pos)}>
              ✂ {bare.slice(0, pos)} | {bare.slice(pos)}
            </button>
          ))}
        </div>
      ) : (
        <div className="moin-docks moin-compound-articles">
          {["der", "die", "das"].map((article) => (
            <div key={article} data-gender={article}>
              <button type="button" lang="de" onClick={() => pickArticle(article)}>
                {article}
              </button>
            </div>
          ))}
        </div>
      )}
      {note && <Note tone={tone}>{note}</Note>}
    </>
  );
}

export function Tail({ c, value, disabled, change, win, miss }: Game<"tail">) {
  const done = asList(value);
  const round = c.rounds[done.length];
  if (!round || disabled) return <Note tone="good">Все слова разобраны: {c.rounds.map((r) => r.word).join(" · ")}.</Note>;
  return (
    <>
      <p className="moin-count">
        Слово {done.length + 1} из {c.rounds.length}: {round.ru}
      </p>
      <TailRoundView
        key={done.length}
        round={round}
        onMiss={() => miss(round.word)}
        onWin={() => {
          const next = [...done, round.word];
          change(next);
          if (next.length === c.rounds.length) win();
        }}
      />
    </>
  );
}

/** «Протокол расследования». */

export function Protocol({ c, value, seed, disabled, checked, change }: Game<"protocol">) {
  const record = asRecord(value);
  const slots = useMemo(() => protocolSlots(c), [c]);
  const [picked, setPicked] = useState<string | null>(null);
  const active = picked ?? slots.find((s) => !record[s.slot])?.slot ?? null;
  const bank = useMemo(() => shuffle(c.bank, seed), [c.bank, seed]);
  const used = new Set(Object.values(record).map(String));

  function put(word: string) {
    if (!active || disabled) return;
    setPicked(null);
    change({ ...record, [active]: word });
  }

  return (
    <>
      <div className="moin-protocol-clues">
        {c.clues.map((cl, i) => (
          <div key={i} className="moin-source">
            <div className="kicker">{cl.who}</div>
            <ul className="moin-notes">
              <Gloss de={cl.de} ru={cl.ru} />
            </ul>
          </div>
        ))}
      </div>
      <div className="moin-protocol-doc">
        <div className="kicker">{c.title}</div>
        <p lang="de" className="moin-gaps">
          {c.parts.map((part, i) => {
            if (typeof part === "string") return <Fragment key={i}>{part}</Fragment>;
            const fill = record[part.slot] ? String(record[part.slot]) : "";
            return (
              <button
                type="button"
                key={part.slot}
                disabled={disabled}
                className="moin-gap"
                data-active={active === part.slot || undefined}
                data-wrong={(checked && fill && fill !== c.answer[part.slot]) || undefined}
                onClick={() => {
                  if (fill) {
                    const next = { ...record };
                    delete next[part.slot];
                    change(next);
                  }
                  setPicked(part.slot);
                }}
              >
                {fill || `[${part.label}]`}
              </button>
            );
          })}
        </p>
      </div>
      <div className="moin-tiles">
        {bank.map((word) => (
          <button
            type="button"
            key={word}
            lang="de"
            disabled={disabled || !active || used.has(word)}
            onClick={() => put(word)}
          >
            {word}
          </button>
        ))}
      </div>
    </>
  );
}

/** «Уложись в условия». */

export function Budget({ c, value, disabled, checked, change }: Game<"budget">) {
  const record = asRecord(value);
  const check = budgetCheck(c, record);

  return (
    <>
      <div className="moin-budget-rules">
        <div className="kicker">Итого: {preis(check.cents)}</div>
        <ul>
          {check.results.map(({ rule, ok }, i) => (
            <li
              key={i}
              data-ok={ok || undefined}
              data-wrong={(checked && !ok) || undefined}
            >
              {ok ? "✓" : "○"} {rule.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="moin-quantities">
        {c.items.map((item) => {
          const count = Number(record[item.id] ?? 0);
          return (
            <div key={item.id}>
              <span>
                <b lang="de">{item.de}</b>{" "}
                <small>
                  ({item.ru} · {preis(item.price)})
                </small>
              </span>
              <div>
                <button
                  type="button"
                  aria-label={`Уменьшить ${item.de}`}
                  disabled={disabled || count <= 0}
                  onClick={() => change({ ...record, [item.id]: count - 1 })}
                >
                  −
                </button>
                <output aria-label={`Количество ${item.de}`}>{count}</output>
                <button
                  type="button"
                  aria-label={`Добавить ${item.de}`}
                  disabled={disabled || count >= item.max}
                  onClick={() => change({ ...record, [item.id]: count + 1 })}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/** «Групповой чат клуба». */

export function GroupChat({ c, value, seed, disabled, change, win, miss }: Game<"groupchat">) {
  const done = asList(value);
  const step = c.steps[done.length];
  const [selectedMsg, setSelectedMsg] = useState<string | null>(null);
  const [missedOpts, setMissedOpts] = useState<string[]>([]);
  const [openTrans, setOpenTrans] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [tone, setTone] = useState<Tone>();

  const targetMsg = step ? c.messages.find((m) => m.id === step.replyTo) : undefined;
  const readyToPick = Boolean(step && selectedMsg === step.replyTo);

  function chooseMsg(id: string) {
    if (!step || disabled) return;
    if (id !== step.replyTo) {
      miss();
      setTone("bad");
      return setNote(`Не то сообщение: нужно ответить на реплику от ${targetMsg?.who ?? "другого героя"}.`);
    }
    setSelectedMsg(id);
    setTone("good");
    setNote(`Отвечаем ${targetMsg?.who}. Выберите реплику:`);
  }

  function pickReply(optId: string, why: string) {
    if (!step || disabled) return;
    if (optId !== step.answer) {
      miss();
      setMissedOpts([...missedOpts, optId]);
      setTone("bad");
      return setNote(why);
    }
    const next = [...done, optId];
    setSelectedMsg(null);
    setMissedOpts([]);
    setNote("");
    change(next);
    if (next.length === c.steps.length) win();
  }

  return (
    <div className="moin-chat" aria-live="polite">
      <div className="kicker">{c.title}</div>
      {c.messages.map((m) => {
        const open = openTrans.includes(m.id);
        const picked = selectedMsg === m.id;
        return (
          <div key={m.id} className="moin-bubble" data-selected={picked || undefined}>
            <small>{m.who}</small>
            <p lang="de">
              {m.de} <PlayButton src={storyAudio(m.de, m.voice)} />
            </p>
            {open && <small>{m.ru}</small>}
            <div className="moin-groupchat-actions">
              <button
                type="button"
                className="link-button"
                onClick={() =>
                  setOpenTrans(open ? openTrans.filter((x) => x !== m.id) : [...openTrans, m.id])
                }
              >
                {open ? "Скрыть перевод" : "Перевод"}
              </button>
              {step && !disabled && !readyToPick && (
                <button type="button" onClick={() => chooseMsg(m.id)}>
                  Ответить
                </button>
              )}
              {picked && <small className="moin-groupchat-tag">Выбрано ✓</small>}
            </div>
          </div>
        );
      })}
      {done.map((ansId, i) => {
        const s = c.steps[i];
        const msg = c.messages.find((m) => m.id === s.replyTo);
        const opt = s.options.find((o) => o.id === ansId);
        return (
          <div key={i} className="moin-bubble is-you">
            <small>Вы → {msg?.who}</small>
            <p lang="de">{opt?.text}</p>
          </div>
        );
      })}
      {step && !disabled && (
        <p className="moin-count">
          Шаг {done.length + 1} из {c.steps.length}: {step.prompt}
        </p>
      )}
      {note && <Note tone={tone}>{note}</Note>}
      {readyToPick && step && !disabled && (
        <div className="moin-chat-replies">
          {shuffle(step.options, `${seed}-${done.length}`).map((o) => (
            <button
              type="button"
              key={o.id}
              lang="de"
              disabled={missedOpts.includes(o.id)}
              onClick={() => pickReply(o.id, o.why)}
            >
              {o.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** «Комикс с пустыми облачками». */

export function Comic({ c, value, seed, disabled, checked, change }: Game<"comic">) {
  const record = asRecord(value);
  const [picked, setPicked] = useState<string | null>(null);
  const active = picked ?? c.panels.find((p) => !record[p.id])?.id ?? null;
  const bubbles = useMemo(
    () => shuffle([...c.panels.map((p) => p.answer), ...(c.extra ?? [])], seed),
    [c.panels, c.extra, seed],
  );
  const used = new Set(Object.values(record).map(String));
  const [glossed, setGlossed] = useState<string[]>([]);

  function tapPanel(panel: ComicPanel) {
    if (disabled) return;
    if (record[panel.id]) {
      const next = { ...record };
      delete next[panel.id];
      change(next);
    }
    setPicked(panel.id);
  }

  function assign(text: string) {
    if (!active || disabled) return;
    setPicked(null);
    change({ ...record, [active]: text });
  }

  return (
    <>
      <div className="moin-comic">
        {c.panels.map((p, i) => {
          const fill = record[p.id] ? String(record[p.id]) : "";
          // Перевод — той реплики, что стоит в облачке; у лишних реплик перевода нет.
          const gloss = c.panels.find((q) => q.answer === fill)?.ru;
          const showGloss = glossed.includes(p.id);
          return (
            <div
              key={p.id}
              className="moin-comic-panel"
              data-active={active === p.id || undefined}
              data-wrong={(checked && fill && fill !== p.answer) || undefined}
            >
              <small>
                {i + 1}. {p.who}
              </small>
              {/* Что на кадре, сказано текстом под ним. */}
              <img
                className="moin-comic-pic"
                src={`${import.meta.env.BASE_URL}story-img/${p.pic}`}
                alt=""
                loading="lazy"
                width={720}
                height={480}
              />
              <p className="moin-comic-scene">{p.scene}</p>
              <button
                type="button"
                lang={fill ? "de" : undefined}
                className="moin-comic-bubble"
                disabled={disabled}
                onClick={() => tapPanel(p)}
              >
                {fill || "… выбрать реплику"}
              </button>
              {fill && <PlayButton src={storyAudio(fill, NARRATOR)} />}
              {gloss &&
                (showGloss ? (
                  <small className="moin-comic-ru">{gloss}</small>
                ) : (
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => setGlossed([...glossed, p.id])}
                  >
                    Перевод
                  </button>
                ))}
            </div>
          );
        })}
      </div>
      <div className="moin-tiles">
        {bubbles.map((text) => (
          <button
            type="button"
            key={text}
            lang="de"
            disabled={disabled || !active || used.has(text)}
            onClick={() => assign(text)}
          >
            {text}
          </button>
        ))}
      </div>
    </>
  );
}

/** «Пересказ для блокнота». */

export function Retell({ c, value, disabled, checked, change }: Game<"retell">) {
  const record = asRecord(value);
  const slots = useMemo(() => retellSlots(c), [c]);
  const [picked, setPicked] = useState<string | null>(null);
  const [openQuote, setOpenQuote] = useState(false);
  const active = picked ?? slots.find((s) => !record[s.id])?.id ?? null;
  const activeSlot = slots.find((s) => s.id === active);

  function choose(opt: string) {
    if (!activeSlot || disabled) return;
    const next = { ...record, [activeSlot.id]: opt };
    change(next);
    const remaining = slots.find((s) => s.id !== activeSlot.id && !next[s.id]);
    setPicked(remaining?.id ?? null);
  }

  return (
    <>
      <div className="moin-source">
        <div className="kicker">{c.who}</div>
        <p lang="de">
          {c.quote} <PlayButton src={storyAudio(c.quote, c.voice)} />
        </p>
        {openQuote && <small>{c.ru}</small>}
        <div>
          <button type="button" className="link-button" onClick={() => setOpenQuote(!openQuote)}>
            {openQuote ? "Скрыть перевод" : "Перевод"}
          </button>
        </div>
      </div>
      <div className="moin-retell-box">
        <div className="kicker">В блокнот (3-е лицо)</div>
        <p lang="de" className="moin-gaps">
          {c.tokens.map((tok, i) => {
            if (typeof tok === "string") return <Fragment key={i}>{tok}</Fragment>;
            const fill = record[tok.id] ? String(record[tok.id]) : "";
            return (
              <button
                type="button"
                key={tok.id}
                disabled={disabled}
                className="moin-gap moin-retell-slot"
                data-active={active === tok.id || undefined}
                data-filled={Boolean(fill) || undefined}
                data-wrong={(checked && fill && fill !== tok.answer) || undefined}
                onClick={() => setPicked(tok.id)}
              >
                {fill || tok.from}
              </button>
            );
          })}
        </p>
      </div>
      {activeSlot && !disabled && (
        <div className="moin-tiles" role="group" aria-label={`Замена для ${activeSlot.from}`}>
          {activeSlot.options.map((opt) => (
            <button
              type="button"
              key={opt}
              lang="de"
              aria-pressed={record[activeSlot.id] === opt}
              onClick={() => choose(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

/** «Рация с помехами». */

function RadioRoundView({
  round,
  seed,
  isLast,
  onWin,
  onMiss,
}: {
  round: Game<"radio">["c"]["rounds"][number];
  seed: string;
  isLast: boolean;
  onWin: () => void;
  onMiss: () => void;
}) {
  const [cleared, setCleared] = useState(false);
  const [missed, setMissed] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [tone, setTone] = useState<Tone>();
  const questions = useMemo(() => shuffle(round.questions, seed), [round.questions, seed]);

  function ask(q: Game<"radio">["c"]["rounds"][number]["questions"][number]) {
    if (cleared) return;
    if (q.id !== round.answer) {
      onMiss();
      setMissed([...missed, q.id]);
      setTone("bad");
      return setNote(q.why ?? "Этот вопрос не прояснит помеху.");
    }
    setCleared(true);
    setTone("good");
    setNote(round.ru);
    playAll([storyAudio(radioLine(round), round.voice), round.sound ? nounAudio(round.sound) : undefined]);
  }

  return (
    <>
      <div className="moin-radio-screen">
        <div className="kicker">📻 {round.who}</div>
        <p lang="de">
          {round.before && <>{round.before} </>}
          {cleared ? (
            <mark className="moin-radio-clear">{round.hidden}</mark>
          ) : (
            <span className="moin-radio-noise">[~~~ помехи ~~~]</span>
          )}
          {round.after && <> {round.after}</>}
          {cleared && (
            <>
              {" "}
              <PlayButton src={storyAudio(radioLine(round), round.voice)} label="Послушать сообщение" />
            </>
          )}
          {cleared && round.sound && (
            <>
              {" "}
              <PlayButton src={nounAudio(round.sound)} label="Послушать слово" />
            </>
          )}
        </p>
      </div>
      {!cleared ? (
        <div className="moin-chat-replies">
          {questions.map((q) => (
            <button
              type="button"
              key={q.id}
              lang="de"
              disabled={missed.includes(q.id)}
              onClick={() => ask(q)}
            >
              {q.text}
            </button>
          ))}
        </div>
      ) : (
        <button type="button" className="primary" onClick={onWin}>
          {isLast ? "Готово" : "Дальше →"}
        </button>
      )}
      {note && <Note tone={tone}>{note}</Note>}
    </>
  );
}

export function Radio({ c, value, seed, disabled, change, win, miss }: Game<"radio">) {
  const done = asList(value);
  const round = c.rounds[done.length];
  if (!round || disabled) return <Note tone="good">Связь по рации восстановлена.</Note>;
  return (
    <>
      <p className="moin-count">
        Сообщение {done.length + 1} из {c.rounds.length}
      </p>
      <RadioRoundView
        key={done.length}
        round={round}
        seed={`${seed}-${done.length}`}
        isLast={done.length === c.rounds.length - 1}
        onMiss={() => miss(round.sound)}
        onWin={() => {
          const next = [...done, round.answer];
          change(next);
          if (next.length === c.rounds.length) win(true);
        }}
      />
    </>
  );
}

/** «Крафт». */

export function Craft({ c, value, disabled, change, win, miss }: Game<"craft">) {
  const done = asList(value);
  const step = c.steps[done.length];
  const [tray, setTray] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  if (!step || disabled) return <Note tone="good">Всё на месте.</Note>;
  const item = (id: string) => c.shelf.find((i) => i.id === id)!;
  // Собранное за прошлые шаги видно над столом: вещь растёт шаг за шагом.
  const made = c.steps.slice(0, done.length).flatMap((s) => Object.entries(s.take));

  function put(id: string) {
    setNote("");
    say(nounAudio(item(id).de));
    setTray((t) => ({ ...t, [id]: (t[id] ?? 0) + 1 }));
  }

  function takeBack(id: string) {
    setNote("");
    setTray((t) => {
      const next = { ...t, [id]: t[id] - 1 };
      if (!next[id]) delete next[id];
      return next;
    });
  }

  function check() {
    if (craftKey(tray) !== craftKey(step.take)) {
      miss();
      return setNote(craftMiss(c, done.length, tray));
    }
    const next = [...done, craftKey(step.take)];
    setTray({});
    setOpen(false);
    setNote("");
    change(next);
    if (next.length === c.steps.length) win(true);
  }

  return (
    <>
      <p className="moin-count">
        Шаг {done.length + 1} из {c.steps.length}
      </p>
      <div className="moin-source">
        <div className="kicker">{c.who}</div>
        <p lang="de">
          {step.de} <PlayButton src={storyAudio(step.de, c.voice)} />
        </p>
        {open && <small>{step.ru}</small>}
        <div>
          <button type="button" className="link-button" onClick={() => setOpen(!open)}>
            {open ? "Скрыть перевод" : "Перевод"}
          </button>
        </div>
      </div>
      {made.length > 0 && (
        <p className="moin-craft-made" aria-label="Уже собрано">
          {made.map(([id, n]) => (
            <span key={id} title={item(id).de}>
              {item(id).icon.repeat(n)}
            </span>
          ))}
        </p>
      )}
      <div className="moin-tiles" role="group" aria-label="Полка">
        {c.shelf.map((i) => (
          <button type="button" key={i.id} lang="de" onClick={() => put(i.id)}>
            <span aria-hidden="true">{i.icon}</span> {i.de}
          </button>
        ))}
      </div>
      <div className="moin-sentence" aria-live="polite" aria-label="Стол">
        {Object.keys(tray).length ? (
          Object.entries(tray).map(([id, n]) => (
            <button type="button" key={id} lang="de" aria-label={`Убрать: ${item(id).de}`} onClick={() => takeBack(id)}>
              <span aria-hidden="true">{item(id).icon}</span> {item(id).de} × {n}
            </button>
          ))
        ) : (
          <span>Стол пуст. Нажмите на вещь на полке.</span>
        )}
      </div>
      <button type="button" className="primary" disabled={!Object.keys(tray).length} onClick={check}>
        Готово
      </button>
      {note && <Note tone="bad">{note}</Note>}
    </>
  );
}

/** «Чайка крадётся к булочке». */

const GULL_ROWS = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"],
  ["Y", "X", "C", "V", "B", "N", "M", "ß"],
];
const MAX_WRONG = 6;

function GullWordRound({
  word,
  isLast,
  onWin,
  onPostpone,
  onMiss,
}: {
  word: string;
  isLast: boolean;
  onWin: () => void;
  onPostpone: () => void;
  onMiss: () => void;
}) {
  const info = wordInfo(word);
  const article = /^(der|die|das) /.exec(word)?.[1];
  const target = article ? word.slice(article.length + 1) : word;
  const chars = [...target];
  const needed = new Set(chars.map((ch) => ch.toLowerCase()));
  const [guessed, setGuessed] = useState<string[]>([]);

  const wrong = guessed.filter((ch) => !needed.has(ch)).length;
  const won = chars.every((ch) => guessed.includes(ch.toLowerCase()));
  const lost = wrong >= MAX_WRONG;
  const finished = won || lost;

  useEffect(() => {
    if (finished) say(info?.audio);
  }, [finished, info?.audio]);

  function guess(letter: string) {
    const lower = letter.toLowerCase();
    if (finished || guessed.includes(lower)) return;
    setGuessed([...guessed, lower]);
    if (!needed.has(lower)) onMiss();
  }

  return (
    <div className="moin-letters">
      <div className="moin-gullword-track" aria-label={`Ошибок: ${wrong} из ${MAX_WRONG}`}>
        <span
          className="moin-gullword-bird"
          style={{ left: `${(Math.min(wrong, MAX_WRONG) / MAX_WRONG) * 82}%` }}
          aria-hidden="true"
        >
          🐦
        </span>
        <span className="moin-gullword-bun" aria-hidden="true">
          🐟
        </span>
      </div>
      <p>
        {info?.ru} <PlayButton src={info?.audio} label="Послушать слово" />
      </p>
      <div className="moin-slots" lang="de" data-gender={article}>
        {article && <span>{article}</span>}
        {chars.map((ch, i) => (
          <b key={i}>{guessed.includes(ch.toLowerCase()) || lost ? ch : "_"}</b>
        ))}
      </div>
      {finished ? (
        <>
          <Note tone={won ? "good" : "bad"}>
            {won ? (
              <Gendered text={word} />
            ) : (
              <>
                Чайка унесла крошку: <Gendered text={word} />. Слово вернётся в конце очереди.
              </>
            )}
          </Note>
          <button type="button" className="primary" onClick={won ? onWin : onPostpone}>
            {won ? (isLast ? "Готово" : "Дальше →") : "Вернуть в очередь"}
          </button>
        </>
      ) : (
        <>
          <div className="moin-gullword-keys">
            {GULL_ROWS.map((row, r) => (
              <div key={r}>
                {row.map((ch) => {
                  const lower = ch.toLowerCase();
                  const used = guessed.includes(lower);
                  return (
                    <button
                      type="button"
                      key={ch}
                      disabled={used}
                      data-hit={(used && needed.has(lower)) || undefined}
                      data-wrong={(used && !needed.has(lower)) || undefined}
                      onClick={() => guess(ch)}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="moin-count">
            Промахи: {wrong} из {MAX_WRONG}
          </p>
        </>
      )}
    </div>
  );
}

export function GullWord({ c, value, seed, disabled, change, win, miss }: Game<"gullword">) {
  const done = asList(value);
  const { current, postpone } = useQueue(c.words, seed, done);
  const [attempt, setAttempt] = useState(0);
  if (!current || disabled) {
    return (
      <p className="moin-count" lang="de">
        {c.words.join(" · ")}
      </p>
    );
  }
  return (
    <>
      <p className="moin-count">
        Слово {done.length + 1} из {c.words.length}
      </p>
      <GullWordRound
        key={`${current}-${attempt}`}
        word={current}
        isLast={done.length === c.words.length - 1}
        onMiss={() => miss(current)}
        onPostpone={() => {
          postpone(current);
          setAttempt((n) => n + 1);
        }}
        onWin={() => {
          const next = [...done, current];
          change(next);
          if (next.length === c.words.length) win(true);
        }}
      />
    </>
  );
}

/** «Редактор черновика». */

export function Proofread({ c, value, disabled, checked, change }: Game<"proofread">) {
  const record = asRecord(value);
  const slots = useMemo(() => proofSegments(c), [c]);
  const [active, setActive] = useState<string | null>(null);
  const activeSeg = slots.find((s) => s.id === active);

  function pick(opt: string) {
    if (!activeSeg || disabled) return;
    change({ ...record, [activeSeg.id]: opt });
    setActive(null);
  }

  return (
    <>
      <div className="moin-proof-check">
        <div className="kicker">Чеклист</div>
        <ul>
          {c.checklist.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
      <div className="moin-proof-doc">
        <div className="kicker">Черновик · {c.author}</div>
        <p lang="de" className="moin-gaps">
          {c.segments.map((seg, i) => {
            if (typeof seg === "string") return <Fragment key={i}>{seg}</Fragment>;
            const shown = String(record[seg.id] ?? seg.draft);
            const edited = shown !== seg.draft;
            return (
              <button
                type="button"
                key={seg.id}
                disabled={disabled}
                className="moin-gap moin-proof-seg"
                data-active={active === seg.id || undefined}
                data-edited={edited || undefined}
                data-wrong={(checked && shown !== seg.answer) || undefined}
                onClick={() => setActive(active === seg.id ? null : seg.id)}
              >
                {shown}
              </button>
            );
          })}
        </p>
      </div>
      {activeSeg && !disabled ? (
        <div className="moin-tiles">
          {activeSeg.options.map((opt) => (
            <button
              type="button"
              key={opt}
              lang="de"
              aria-pressed={(record[activeSeg.id] ?? activeSeg.draft) === opt}
              onClick={() => pick(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <p className="moin-count">Нажмите на подчёркнутую часть письма, чтобы проверить или исправить её.</p>
      )}
    </>
  );
}

import { Fragment, useEffect, useMemo, useState } from "react";
import { say } from "../hooks";
import { shuffle } from "../lib/shuffle";
import { PlayButton } from "../markup";
import { nounAudio, wordInfo } from "./audio";
import { Gendered, Note, type Game } from "./games";
import { compoundOf, decipher, floorLabel, gridKey, plannerWho, treeSlots } from "./logic";
import type { Answer, PortraitPart, TreeNode, TreeSlot } from "./types";

// Новые мини-игры новой версии (A1-PLOT.md, «Новые мини-игры»). Как и прежние игры, всё
// управляется нажатием и с клавиатуры, а ошибка только даёт подсказку.

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

/** Цвета одежды фоторобота: тёмно-синий и белый — цвета таблички MOIN. */
const CLOTH: Record<string, string> = { dunkelblau: "#22406b", "weiß": "#f3efe4" };

/** Портрет фоторобота: несобранная часть видна пунктиром, ростомер слева. */
function Face({ look }: { look: Partial<Record<PortraitPart, string>> }) {
  const scale = look.size === "klein" ? 0.8 : 1;
  const hair = look.age === "alt" ? "#e6e2d8" : look.age === "nicht alt" ? "#5b3b24" : undefined;
  const cloth = look.colour ? CLOTH[look.colour] : undefined;
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

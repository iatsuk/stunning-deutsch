import { Fragment, useEffect, useMemo, useState } from "react";
import { say } from "../hooks";
import { preis } from "../lib/german";
import { shuffle } from "../lib/shuffle";
import { PlayButton } from "../markup";
import { nounAudio, wordInfo } from "./audio";
import { Gendered, Note, type Game } from "./games";
import { budgetCheck, proofSegments, protocolSlots, retellSlots, springRight, tailCuts } from "./logic";
import { Gloss } from "./minigames";
import type { Answer, ComicPanel, SpringRound } from "./types";

// 13 новых мини-игр из IDEAS.md: всё управляется тапами и с клавиатуры.

type Tone = "good" | "bad" | undefined;
const asList = (value: Answer) => (Array.isArray(value) ? value : []);
const asRecord = (value: Answer) => (typeof value === "object" && !Array.isArray(value) ? value : {});
const nounBare = (word: string) => word.replace(/^(der|die|das) /, "");

/** Очередь слов/карточек с возвратом ошибки в конец (как в Docks). */
function useQueue(ids: string[], seed: string, done: string[]) {
  const queue = useMemo(() => shuffle(ids, seed), [ids, seed]);
  const [later, setLater] = useState<string[]>([]);
  const rest = queue.filter((id) => !done.includes(id));
  return {
    current: rest.find((id) => !later.includes(id)) ?? later.find((id) => rest.includes(id)),
    postpone: (id: string) => setLater((list) => [...list.filter((x) => x !== id), id]),
  };
}

// ——— 1. Пружина порядка слов ———

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

// ——— 2. Расставь вещи по плану ———

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

// ——— 3. Порванная записка ———

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

// ——— 4. Два причала ———

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

// ——— 5. Охота на хвост ———

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

// ——— 6. Протокол расследования ———

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

// ——— 7. Уложись в условия ———

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

// ——— 8. Групповой чат клуба ———

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
            <p lang="de">{m.de}</p>
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

// ——— 9. Комикс с пустыми облачками ———

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
              <div className="moin-comic-head">
                <small>
                  {i + 1}. {p.who}
                </small>
                <span aria-hidden="true">{p.art}</span>
              </div>
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

// ——— 10. Пересказ для блокнота ———

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
        <p lang="de">{c.quote}</p>
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

// ——— 11. Рация с помехами ———

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
    if (round.sound) say(nounAudio(round.sound));
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

// ——— 12. Чайка крадётся к булочке ———

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

// ——— 13. Редактор черновика ———

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

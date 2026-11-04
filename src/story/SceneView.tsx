import { useEffect, useRef, useState, type ReactNode } from "react";
import { say } from "../hooks";
import { shuffle } from "../lib/shuffle";
import { PlayButton } from "../markup";
import { nearMisses } from "../trainer/logic";
import { storyAudio, wordInfo } from "./audio";
import { AUTOMATIC, ChallengeView } from "./ChallengeView";
import { Gendered, Note, textInput, UmlautKeys, type GameProps } from "./games";
import { initialAnswer, isCorrect, mistake, solution } from "./logic";
import {
  keyOf,
  nodeAt,
  picsBefore,
  requiredKeys,
  spot,
  typedOf,
  typedRight,
  worldAfter,
} from "./scene";
import type { Answer, Challenge, Pick, SceneNode } from "./types";
import { mnemonic } from "./mnemonics";
import { applyEffects, effectText, holds, TRACKS, type World } from "./world";

// Сцена: разговор и осмотр места, в который вплетены действия. Сцена помещается на экран:
// видны картинка момента, последние реплики и текущее действие, а весь разговор раскрывается
// кнопкой. Реплики героев звучат сами, если озвучка включена.

/** Сколько последних реплик видно, пока разговор свёрнут. */
const RECENT = 3;

type Play = Extract<Challenge, { kind: "play" }>;
type Rich = (s: string) => ReactNode;

const VOICE_KEY = "sd-moin-voice";
function readVoice() {
  try {
    return localStorage.getItem(VOICE_KEY) !== "off";
  } catch {
    return true;
  }
}

export function SceneView({
  c,
  value,
  seed,
  disabled,
  change,
  win,
  miss,
  rich,
  quiet,
  world = {},
}: GameProps & { c: Play; rich: Rich; world?: World }) {
  const entries = Array.isArray(value) ? value : [];
  const done = new Set(entries.map(keyOf));
  // Мир к этому моменту: что было до сцены и последствия уже пройденных узлов.
  const state = worldAfter(c.nodes, entries, world);
  const [open, setOpen] = useState<string>();
  const [voice, setVoice] = useState(readVoice);
  const [full, setFull] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const here = spot(c.nodes, entries, open, state);
  const current = useRef<HTMLDivElement>(null);
  const position = here.at === "end" ? "end" : here.key;

  function advance(entry: string) {
    const next = [...entries, entry];
    change(next);
    setOpen(undefined);
    setFull(false);
    if (isCorrect(c, next)) win();
  }
  // Условие решается, как только сцена до него дошла, и решение запоминается: последствия,
  // которые случатся позже, уже не перевернут то, что игрок видел.
  useEffect(() => {
    if (disabled || here.at !== "auto") return;
    advance(`${here.key}|${holds(here.node.if, state) ? 0 : 1}`);
  }, [position]);
  // Новая реплика звучит сама; переход к следующему узлу держит его в поле зрения.
  useEffect(() => {
    if (disabled || here.at !== "node") return;
    if (voice && (here.node.t === "say" || here.node.t === "hear"))
      say(storyAudio(here.node.de, here.node.voice));
    current.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [position]);

  // Перевод реплики сразу виден, пока она звучит впервые в сцене.
  const heard = new Set<string>();
  const items = (disabled ? (solution(c) as string[]) : entries).flatMap(
    (entry) => {
      const key = keyOf(entry);
      const node = nodeAt(c.nodes, key);
      if (!node || node.t === "when") return [];
      const fresh = node.t === "say" && !heard.has(node.de);
      const chosen =
        node.t === "reply" || node.t === "pick"
          ? node.options.find((o) => o.text === typedOf(entry))?.set
          : undefined;
      const effects = applyEffects(applyEffects({}, node.set), chosen);
      if (node.t === "say") heard.add(node.de);
      const pics = picsBefore(c.nodes, key);
      return [
        {
          node,
          pics,
          branch: branchOf(c.nodes, key),
          element: (
            <div key={key}>
              {pics.map((p) => (
                <Pic key={p.src} node={p} />
              ))}
              <DoneNode
                node={node}
                typed={typedOf(entry)}
                fresh={fresh}
                rich={rich}
              />
              {Object.keys(effects).length > 0 && (
                <p className="moin-play-effect">{effectText(effects)}</p>
              )}
            </div>
          ),
        },
      ];
    },
  );
  const from = full ? 0 : Math.max(0, items.length - RECENT);
  // Картинка момента — последняя пройденная. Она остаётся на экране, даже когда реплика, к которой
  // она относится, свёрнута; более ранние картинки видны только в развёрнутом разговоре.
  const currentPics = here.at === "node" ? picsBefore(c.nodes, here.key) : [];
  const moment = currentPics.length
    ? undefined
    : items.flatMap((i) => i.pics).at(-1);
  const keys = requiredKeys(c.nodes, entries);
  const passed = keys.filter((k) => done.has(k)).length;
  // Часы и отношения, которые уже сдвинулись: их показывает блокнот сцены.
  const tracks = Object.entries(state).filter(([q, v]) => v > 0 && TRACKS[q]);
  // Блокнот сцены: улики и предметы под рукой, чтобы не искать их в разговоре.
  const notes = items.flatMap((i) =>
    i.node.t === "clue" || i.node.t === "item" ? [i.node] : [],
  );
  const shown = items.slice(from);
  const currentBranch =
    here.at === "node" && here.branch ? branchOf(c.nodes, here.key) : undefined;

  return (
    <div className="moin-play">
      <div className="moin-play-bar">
        <span
          className="moin-play-progress"
          aria-label={`Пройдено узлов сцены: ${passed} из ${keys.length}`}
        >
          <span
            style={{
              width: `${(100 * (disabled ? keys.length : passed)) / keys.length}%`,
            }}
          />
        </span>
        <label className="moin-play-voice">
          <input
            type="checkbox"
            checked={voice}
            onChange={(e) => {
              setVoice(e.target.checked);
              try {
                localStorage.setItem(
                  VOICE_KEY,
                  e.target.checked ? "on" : "off",
                );
              } catch {
                // Без хранилища настройка живёт до перезагрузки.
              }
            }}
          />{" "}
          Озвучивать реплики
        </label>
        {notes.length + tracks.length > 0 && (
          <button
            type="button"
            className="moin-play-notes-button"
            aria-expanded={notesOpen}
            onClick={() => setNotesOpen(!notesOpen)}
          >
            📓 {notes.length + tracks.length}
          </button>
        )}
      </div>
      {notesOpen && (
        <aside className="moin-play-notes" aria-label="Блокнот сцены">
          <div className="kicker">Блокнот сцены</div>
          {tracks.length > 0 && (
            <ul className="moin-play-tracks">
              {tracks.map(([q, v]) => (
                <li key={q}>
                  {TRACKS[q].icon} {TRACKS[q].label}{" "}
                  <span aria-label={`${v} из ${TRACKS[q].size ?? v}`}>
                    {TRACKS[q].size
                      ? "●".repeat(v) + "○".repeat(TRACKS[q].size! - v)
                      : "●".repeat(v)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <ul>
            {notes.map((n, i) => (
              <li key={i}>
                {n.t === "clue" ? (
                  <>
                    <b>{n.title}.</b> {n.text}
                  </>
                ) : (
                  <>
                    {n.icon} <span lang="de">{n.de}</span> — {n.ru}
                  </>
                )}
              </li>
            ))}
          </ul>
        </aside>
      )}
      {from > 0 && (
        <button
          type="button"
          className="link-button moin-play-more"
          onClick={() => setFull(true)}
        >
          ▲ Весь разговор · выше ещё {from}
        </button>
      )}
      {full && items.length > RECENT && (
        <button
          type="button"
          className="link-button moin-play-more"
          onClick={() => setFull(false)}
        >
          ▼ Свернуть разговор
        </button>
      )}
      {moment && !items.slice(from).some((i) => i.pics.includes(moment)) && (
        <Pic node={moment} />
      )}
      <div className="moin-play-log" aria-live="polite">
        {groups(shown).map((g, n) =>
          !g.branch ? (
            g.items.map((i) => i.element)
          ) : full ? (
            // В развёрнутом разговоре каждая ветка — отдельный блок, открывается по нажатию.
            <details
              key={n}
              className="moin-play-group"
              open={g.branch.key === currentBranch?.key}
            >
              <summary>
                <span aria-hidden="true">{g.branch.icon}</span> {g.branch.label}
                <small>{g.items.length} реплик и действий</small>
              </summary>
              {g.items.map((i) => i.element)}
            </details>
          ) : (
            <div key={n} className="moin-play-group is-open">
              <p className="moin-play-group-title">
                <span aria-hidden="true">{g.branch.icon}</span> {g.branch.label}
              </p>
              {g.items.map((i) => i.element)}
            </div>
          ),
        )}
      </div>
      {!disabled && here.at === "menu" && (
        <div className="moin-play-current" ref={current}>
          <Menu
            node={here.node}
            goKey={here.key}
            entries={entries}
            ready={here.ready}
            world={state}
            choose={(branch) => setOpen(branch)}
            leave={() => advance(here.key)}
          />
        </div>
      )}
      {!disabled && here.at === "node" && (
        <div className="moin-play-current" ref={current}>
          {currentBranch &&
            !shown.some((i) => i.branch?.key === currentBranch.key) && (
              <p className="moin-play-group-title">
                <span aria-hidden="true">{currentBranch.icon}</span>{" "}
                {currentBranch.label}
              </p>
            )}
          {picsBefore(c.nodes, here.key).map((p) => (
            <Pic key={p.src} node={p} />
          ))}
          {here.node.t === "say" ||
          here.node.t === "narr" ||
          here.node.t === "item" ||
          here.node.t === "clue" ? (
            <>
              <DoneNode
                node={here.node}
                fresh={!heard.has(here.node.t === "say" ? here.node.de : "")}
                rich={rich}
              />
              <NextButton onClick={() => advance(here.key)} />
            </>
          ) : (
            <Task
              key={here.key}
              node={here.node}
              nodeKey={here.key}
              seed={`${seed}-${here.key}`}
              miss={miss}
              rich={rich}
              quiet={quiet}
              done={(entry) => advance(entry)}
            />
          )}
        </div>
      )}
    </div>
  );
}

type Branch = { key: string; label: string; icon: string };

/** Ветка развилки, к которой относится узел: в развёрнутом разговоре она — отдельный блок. */
function branchOf(nodes: SceneNode[], key: string): Branch | undefined {
  const [i, j] = key.split(".");
  const go = nodes[Number(i)];
  if (j === undefined || go?.t !== "go") return undefined;
  const b = go.branches[Number(j)];
  return { key: `${i}.${j}`, label: b.label, icon: b.icon };
}

/** Подряд идущие узлы одной ветки собираются в группу. */
function groups<T extends { branch?: Branch }>(items: T[]) {
  const out: { branch?: Branch; items: T[] }[] = [];
  for (const item of items) {
    const last = out.at(-1);
    if (last && last.branch?.key === item.branch?.key) last.items.push(item);
    else out.push({ branch: item.branch, items: [item] });
  }
  return out;
}

function NextButton({
  onClick,
  label = "Дальше",
}: {
  onClick: () => void;
  label?: string;
}) {
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => button.current?.focus({ preventScroll: true }), []);
  return (
    <button
      type="button"
      className="primary moin-play-next"
      ref={button}
      onClick={onClick}
    >
      {label} ▸
    </button>
  );
}

/** Узел, как он выглядит в переписке. */
function DoneNode({
  node,
  typed = "",
  fresh,
  rich,
}: {
  node: SceneNode;
  typed?: string;
  fresh?: boolean;
  rich: Rich;
}) {
  switch (node.t) {
    case "narr":
      return <p className="moin-play-narr">{rich(node.text)}</p>;
    case "say":
      return <SayLine node={node} fresh={fresh} />;
    case "reply":
    case "type":
      return (
        <p className="moin-bubble is-you" lang="de">
          {typed ||
            (node.t === "type"
              ? node.answers[0].replace("*", "…")
              : node.options.find((o) => o.ok)?.text)}
        </p>
      );
    case "gap":
      return (
        <p className="moin-play-note" lang="de">
          ✓ {node.text.replace("___", node.answer)}
        </p>
      );
    case "hear":
      return (
        <p className="moin-play-note">
          ✓ <span lang="de">{node.de}</span>
        </p>
      );
    case "pick":
      return (
        <p className="moin-play-note">
          ✓ {typed || node.options.find((o) => o.ok)?.text}
        </p>
      );
    case "look":
      return (
        <p className="moin-play-note">
          Осмотрено:{" "}
          {node.items.map((i) => `${i.icon} ${i.de ?? i.ru}`).join(", ")}
        </p>
      );
    case "item":
      return (
        <p className="moin-play-gain">
          + В инвентарь: {node.icon} <span lang="de">{node.de}</span> —{" "}
          {node.ru}
        </p>
      );
    case "clue":
      return (
        <p className="moin-play-gain">
          + В блокнот: <b>{node.title}</b>. {node.text}
        </p>
      );
    case "game":
      return <p className="moin-play-note">✓ {node.task}</p>;
    case "go":
    case "when":
    case "pic":
      return null;
  }
}

/** Иллюстрация сцены; файлы — public/story-img. */
function Pic({ node }: { node: Extract<SceneNode, { t: "pic" }> }) {
  return (
    <figure className="moin-play-pic">
      <img
        src={`${import.meta.env.BASE_URL}story-img/${node.src}`}
        alt={node.alt}
        loading="lazy"
        width={1280}
        height={720}
      />
    </figure>
  );
}

function SayLine({
  node,
  fresh,
}: {
  node: Extract<SceneNode, { t: "say" }>;
  fresh?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState<string>();
  const shown = fresh || open;
  return (
    <div className="moin-bubble moin-play-say">
      <small>{node.who}</small>
      <p lang="de">
        {node.de} <PlayButton src={storyAudio(node.de, node.voice)} />
      </p>
      {shown ? (
        <small>{node.ru}</small>
      ) : (
        <button
          type="button"
          className="link-button"
          onClick={() => setOpen(true)}
        >
          Перевод
        </button>
      )}
      {node.learn && (
        <div className="moin-chips" aria-label="Новые слова">
          {node.learn.map((w) => (
            <button
              type="button"
              key={w}
              lang="de"
              aria-expanded={word === w}
              onClick={() => setWord(word === w ? undefined : w)}
            >
              <Gendered text={w} />
            </button>
          ))}
        </div>
      )}
      {word && (
        <small className="moin-chip-info">
          <span lang="de">{word}</span> — {wordInfo(word)?.ru ?? "—"}{" "}
          <PlayButton src={wordInfo(word)?.audio} />
          {mnemonic(word) && (
            <span className="moin-hook">💡 {mnemonic(word)}</span>
          )}
        </small>
      )}
    </div>
  );
}

/** Меню развилки: обязательные ветки, побочные задания «по желанию» и выход дальше по делу. */
function Menu({
  node,
  goKey,
  entries,
  ready,
  world,
  choose,
  leave,
}: {
  node: Extract<SceneNode, { t: "go" }>;
  goKey: string;
  entries: string[];
  ready: boolean;
  world: World;
  choose: (branch: string) => void;
  leave: () => void;
}) {
  const done = new Set(entries.map(keyOf));
  return (
    <div className="moin-play-task">
      <p className="moin-play-ask">{node.task}</p>
      <div className="moin-play-menu">
        {node.branches.map((b, j) => {
          if (b.if && !holds(b.if, world)) return null;
          const finished = requiredKeys(
            b.nodes,
            entries,
            `${goKey}.${j}.`,
          ).every((k) => done.has(k));
          return (
            <button
              type="button"
              key={j}
              disabled={finished}
              data-optional={b.optional || undefined}
              onClick={() => choose(`${goKey}.${j}`)}
            >
              <span aria-hidden="true">{finished ? "✓" : b.icon}</span>{" "}
              {b.label}
              {b.optional && <small> · по желанию</small>}
            </button>
          );
        })}
      </div>
      {ready && (
        <NextButton onClick={leave} label={node.next ?? "Дальше по делу"} />
      )}
    </div>
  );
}

/** Действие, которое ждёт игрока. Ошибка ничего не стоит: даёт реакцию и новую попытку. */
function Task({
  node,
  nodeKey,
  seed,
  miss,
  rich,
  quiet,
  done,
}: {
  node: SceneNode;
  nodeKey: string;
  seed: string;
  miss: (word?: string) => void;
  rich: Rich;
  /** Отвечать письменно там, где нужно говорить: например, в офисе. */
  quiet?: boolean;
  done: (entry: string) => void;
}) {
  switch (node.t) {
    case "reply":
    case "pick":
      return (
        <Options
          task={node.task ?? "Ответьте:"}
          options={node.options}
          german={node.t === "reply"}
          seed={seed}
          miss={miss}
          done={(text) => done(`${nodeKey}|${text}`)}
        />
      );
    case "gap":
      return (
        <Options
          task={node.task}
          before={node.text}
          options={node.options.map((o) =>
            o === node.answer ? { text: o, ok: true } : { text: o, react: "" },
          )}
          german
          seed={seed}
          miss={() => miss(node.answer)}
          ru={node.ru}
          done={() => done(nodeKey)}
        />
      );
    case "hear":
      return (
        <Options
          task={node.task}
          audio={storyAudio(node.de, node.voice)}
          options={node.options.map((o) =>
            o === node.answer ? { text: o, ok: true } : { text: o, react: "" },
          )}
          german={!/[а-яё]/i.test(node.answer)}
          seed={seed}
          miss={miss}
          done={() => done(nodeKey)}
        />
      );
    case "type":
      return (
        <Typed
          node={node}
          miss={miss}
          done={(text) => done(`${nodeKey}|${text}`)}
        />
      );
    case "look":
      return <Look node={node} done={() => done(nodeKey)} />;
    case "game":
      return (
        <Embedded
          node={node}
          seed={seed}
          miss={miss}
          rich={rich}
          quiet={quiet}
          done={() => done(nodeKey)}
        />
      );
    default:
      return null;
  }
}

function Options({
  task,
  before,
  audio,
  ru,
  options,
  german,
  seed,
  miss,
  done,
}: {
  task: string;
  before?: string;
  audio?: string;
  ru?: string;
  options: Pick[];
  german: boolean;
  seed: string;
  miss: () => void;
  done: (text: string) => void;
}) {
  const [missed, setMissed] = useState<string[]>([]);
  const [reaction, setReaction] = useState<string>();
  const order = shuffle(options, seed);
  return (
    <div className="moin-play-task">
      <p className="moin-play-ask">{task}</p>
      {audio && (
        <div className="moin-call">
          <PlayButton src={audio} size="md" label="Послушать ещё раз" />{" "}
          <span>Послушать ещё раз</span>
        </div>
      )}
      {before && (
        <p className="moin-play-gap" lang="de">
          {before.split("___")[0]}
          <span className="moin-play-blank">___</span>
          {before.split("___")[1]}
        </p>
      )}
      {ru && <small className="moin-play-ru">{ru}</small>}
      <div className="moin-chat-replies">
        {order.map((o) => (
          <button
            type="button"
            key={o.text}
            lang={german ? "de" : undefined}
            disabled={missed.includes(o.text)}
            onClick={() => {
              if (o.ok) return done(o.text);
              setMissed([...missed, o.text]);
              setReaction(o.react || "Не подходит. Попробуйте другой вариант.");
              miss();
            }}
          >
            {o.text}
          </button>
        ))}
      </div>
      {reaction && <p className="moin-chat-reaction">{reaction}</p>}
    </div>
  );
}

function Typed({
  node,
  miss,
  done,
}: {
  node: Extract<SceneNode, { t: "type" }>;
  miss: () => void;
  done: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const [tries, setTries] = useState(0);
  const [verdict, setVerdict] = useState<string>();
  const field = useRef<HTMLInputElement | null>(null);
  const model = node.answers[0].replace("*", "Anna");
  function check() {
    const result = typedRight(text, node.answers);
    if (result === "right") return done(text.trim());
    setTries(tries + 1);
    miss();
    const near = nearMisses(
      text,
      node.answers.filter((a) => !a.includes("*")),
    ).join(", ");
    setVerdict(
      result === "case"
        ? `Почти: проверьте заглавные буквы — ${near}.`
        : result === "umlaut"
          ? `Почти: нужна буква с умлаутом или ß — ${near}.`
          : tries >= 1
            ? `Например: ${model}`
            : "Пока не то. Посмотрите на реплики выше и попробуйте ещё раз.",
    );
  }
  return (
    <form
      className="moin-play-task"
      onSubmit={(event) => {
        event.preventDefault();
        check();
      }}
    >
      <p className="moin-play-ask">{node.task}</p>
      {node.ru && <small className="moin-play-ru">{node.ru}</small>}
      <div className="moin-play-type">
        <input
          {...textInput}
          ref={field}
          aria-label={node.task}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setVerdict(undefined);
          }}
        />
        <button type="submit" disabled={!text.trim()}>
          Сказать
        </button>
      </div>
      <UmlautKeys field={field} apply={(_, v) => setText(v)} />
      {verdict && <Note tone="bad">{verdict}</Note>}
    </form>
  );
}

function Look({
  node,
  done,
}: {
  node: Extract<SceneNode, { t: "look" }>;
  done: () => void;
}) {
  const [seen, setSeen] = useState<number[]>([]);
  const [focus, setFocus] = useState<number>();
  const keys = node.items.flatMap((item, i) => (item.key ? [i] : []));
  const ready = keys.every((i) => seen.includes(i));
  const item = focus === undefined ? undefined : node.items[focus];
  return (
    <div className="moin-play-task">
      <p className="moin-play-ask">{node.task}</p>
      <div className="moin-look">
        {node.items.map((it, i) => (
          <button
            type="button"
            key={i}
            aria-pressed={focus === i}
            data-seen={seen.includes(i) || undefined}
            aria-label={seen.includes(i) ? (it.de ?? it.ru) : "Осмотреть"}
            onClick={() => {
              setFocus(i);
              if (!seen.includes(i)) setSeen([...seen, i]);
              if (it.de) say(wordInfo(it.de)?.audio ?? storyAudio(it.de));
            }}
          >
            <span aria-hidden="true">{it.icon}</span>
            <small lang={it.de ? "de" : undefined}>
              {seen.includes(i) ? (it.de ?? it.ru) : "?"}
            </small>
          </button>
        ))}
      </div>
      {item && (
        <p className="moin-play-note">
          {item.de && (
            <>
              <b lang="de">
                <Gendered text={item.de} />
              </b>{" "}
              — {item.ru}.{" "}
            </>
          )}
          {item.note}
          {item.de && mnemonic(item.de) && (
            <span className="moin-hook">💡 {mnemonic(item.de)}</span>
          )}
        </p>
      )}
      <Note>
        Важное найдено: {keys.filter((i) => seen.includes(i)).length} из{" "}
        {keys.length}
      </Note>
      {ready && <NextButton onClick={done} />}
    </div>
  );
}

/** Прежняя игра внутри сцены: своё состояние, проверка и «Дальше» после успеха. */
function Embedded({
  node,
  seed,
  miss,
  rich,
  quiet,
  done,
}: {
  node: Extract<SceneNode, { t: "game" }>;
  seed: string;
  miss: (word?: string) => void;
  rich: Rich;
  quiet?: boolean;
  done: () => void;
}) {
  const c = node.c;
  const [value, setValue] = useState<Answer>(() => initialAnswer(c));
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [won, setWon] = useState(false);
  const game: GameProps = {
    value,
    seed,
    disabled: won,
    checked,
    attempts,
    change(v) {
      setChecked(false);
      setValue(v);
    },
    win: () => setWon(true),
    miss,
    quiet,
  };
  return (
    <div className="moin-play-task moin-play-game">
      <p className="moin-play-ask">{node.task}</p>
      <ChallengeView c={c} game={game} beatId={seed} rich={rich} />
      {!won && !AUTOMATIC.includes(c.kind) && (
        <button
          type="button"
          className="primary"
          onClick={() => {
            setChecked(true);
            setAttempts(attempts + 1);
            if (isCorrect(c, value)) setWon(true);
            else miss();
          }}
        >
          Проверить
        </button>
      )}
      {checked && !won && (
        <Note tone="bad">
          {mistake(
            c,
            value,
            node.hint ?? "Посмотрите внимательнее и попробуйте ещё раз.",
          )}
        </Note>
      )}
      {won && <NextButton onClick={done} />}
    </div>
  );
}

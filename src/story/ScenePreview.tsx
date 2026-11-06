import { useEffect, useState } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { say, stopAudio } from "../hooks";
import { PlayButton } from "../markup";
import { phraseAudio } from "./audio";
import { ChallengeView } from "./ChallengeView";
import { phrases } from "./data";
import { mnemonic } from "./mnemonics";
import { beatPhrases, initialAnswer, isCorrect } from "./logic";
import { flatNodes, keyOf, nodeAt, sceneRules, shownWords, worldAfter } from "./scene";
import { RuleCard } from "./RuleCard";
import { sceneChapters } from "./scenes";
import type { Answer, SceneNode } from "./types";
import { TRACKS, type World } from "./world";
import "./story.css";

// Прототип глав в формате сцен — отдельно от игры, чтобы автор мог сравнить форматы,
// не трогая прогресс основной истории. Своё сохранение: sd-moin-neu-v1. Сцены всех глав идут
// одним списком: новая глава добавляется в конец, и номера сохранённых сцен не сдвигаются.

const KEY = "sd-moin-neu-v1";
const QUIET = "sd-moin-quiet";
const readQuiet = () => {
  try {
    return localStorage.getItem(QUIET) === "on";
  } catch {
    return false;
  }
};
const chapters = sceneChapters;
const scenes = chapters.flatMap((c) => c.beats);
/** Первая сцена главы в общем списке. */
const firstOf = (chapter: number) =>
  chapters.slice(0, chapter).reduce((n, c) => n + c.beats.length, 0);
const chapterOf = (at: number) =>
  chapters.findIndex((_, i) => at < firstOf(i + 1));
type Save = { at: number; drafts: Record<string, string[]> };

function load(): Save {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (
      raw &&
      Number.isInteger(raw.at) &&
      raw.drafts &&
      typeof raw.drafts === "object"
    )
      return {
        at: Math.min(Math.max(0, raw.at), scenes.length - 1),
        drafts: raw.drafts,
      };
  } catch {
    // Повреждённое или недоступное сохранение: начинаем сначала.
  }
  return { at: 0, drafts: {} };
}

export function ScenePreview() {
  useTitle("Главы в сценах · прототип · Stunning Deutsch");
  const [save, setSave] = useState(load);
  const ci = chapterOf(save.at);
  const chapter = chapters[ci];
  const first = firstOf(ci);
  const last = first + chapter.beats.length - 1;
  // Где нужно говорить вслух, можно отвечать письменно: например, в офисе.
  const [quiet, setQuiet] = useState(readQuiet);
  const beat = scenes[save.at];
  const value: Answer =
    save.drafts[beat.id] ?? (initialAnswer(beat.challenge) as string[]);
  const solved = (i: number) =>
    isCorrect(scenes[i].challenge, save.drafts[scenes[i].id]);
  // Немецкая единица в рассказе знакома, если звучала в прошлых сценах; слово — если сцены
  // его уже показали: среди новых слов реплик, при осмотре или в инвентаре.
  const known = new Set(scenes.slice(0, save.at).flatMap(beatPhrases));
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(save));
    } catch {
      // Без хранилища прототип работает до перезагрузки.
    }
  }, [save]);
  useEffect(() => () => stopAudio(), []);

  // Мир складывается из последствий пройденных сцен по порядку: до текущей и вместе с ней.
  const nodesOf = (i: number) =>
    scenes[i].challenge.kind === "play"
      ? scenes[i].challenge.nodes
      : ([] as SceneNode[]);
  const worldBefore = (n: number): World =>
    scenes
      .slice(0, n)
      .reduce(
        (w, s, i) => worldAfter(nodesOf(i), save.drafts[s.id] ?? [], w),
        {} as World,
      );
  const before = worldBefore(save.at);
  const words = scenes
    .slice(0, save.at)
    .flatMap((_, i) => shownWords(flatNodes(nodesOf(i))));
  // Правила прошлых сцен главы уже встречались: у задания они свёрнуты, новое — открыто.
  const rulesSeen = [
    ...new Set(
      scenes
        .slice(first, save.at)
        .flatMap((s) => (s.challenge.kind === "play" ? sceneRules(s.challenge.nodes) : [])),
    ),
  ];
  // В блокноте — правила пройденных действий главы, по порядку.
  const rulesMet = [
    ...new Set(
      chapter.beats.flatMap((s) =>
        (save.drafts[s.id] ?? []).flatMap((entry) =>
          s.challenge.kind === "play"
            ? (nodeAt(s.challenge.nodes, keyOf(entry))?.rule ?? [])
            : [],
        ),
      ),
    ),
  ];
  const now = worldBefore(scenes.length);
  // Блокнот и инвентарь собираются из пройденных узлов всех сцен.
  const gains = chapter.beats.flatMap((s) =>
    (save.drafts[s.id] ?? []).flatMap((entry) => {
      const node =
        s.challenge.kind === "play"
          ? nodeAt(s.challenge.nodes, keyOf(entry))
          : undefined;
      return node && (node.t === "clue" || node.t === "item") ? [node] : [];
    }),
  );

  function go(at: number) {
    stopAudio();
    setSave((s) => ({ ...s, at }));
    window.scrollTo({ top: 0 });
  }
  function rich(text: string, seen?: Set<string>) {
    return text.split(/(\{[\w-]+\})/g).map((part, i) => {
      if (!part.startsWith("{")) return part;
      const id = part.slice(1, -1);
      const p = phrases[id];
      if (!p) return part;
      const fresh =
        !known.has(id) && !words.includes(p.de) && !seen?.has(id) && !seen?.has(p.de);
      return <Word key={i} id={id} fresh={fresh} />;
    });
  }

  return (
    <>
      <Topbar
        crumbs={[
          { label: "A1", href: "#/a1" },
          { label: "Moin", href: "#/a1/moin" },
          { label: "Сцены" },
        ]}
      />
      <main className="moin-page">
        <header className="moin-game-heading">
          <div>
            <div className="kicker">
              Прототип нового формата · главы 1–{chapters.length} в сценах
            </div>
            <h1>Дело о пропавшем Moin</h1>
          </div>
        </header>
        <nav className="moin-chapters" aria-label="Главы">
          {chapters.map((c, i) => (
            <button
              type="button"
              key={c.id}
              aria-current={i === ci ? "page" : undefined}
              onClick={() => {
                // Глава открывается на первой непройденной сцене: так легко продолжить.
                const from = firstOf(i);
                const open = c.beats.findIndex((_, k) => !solved(from + k));
                go(from + (open < 0 ? 0 : open));
              }}
            >
              Глава {i + 1} · {c.title}
            </button>
          ))}
        </nav>
        <div className="moin-layout moin-preview">
          <section className="moin-scene" aria-label={beat.title}>
            {/* Сверху вниз — от крупного к мелкому: глава и её день, сцена, затем шаги сцены. */}
            <div className="moin-scene-top">
              <span>
                Глава {ci + 1} · {chapter.title}
              </span>
              <span>{chapter.place}</span>
            </div>
            {chapter.day && (
              <div className="moin-day">
                <b lang="de">{chapter.day.de}</b> · {chapter.day.ru}
              </div>
            )}
            <div className="moin-chapter-title">
              Сцена {save.at - first + 1} / {chapter.beats.length}
            </div>
            <ol className="moin-steps" aria-label="Сцены главы">
              {chapter.beats.map((s, k) => {
                const i = first + k;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      aria-label={`Сцена ${k + 1}: ${s.title}`}
                      aria-current={i === save.at ? "step" : undefined}
                      data-done={solved(i) || undefined}
                      disabled={k > 0 && !solved(i - 1) && i !== save.at}
                      onClick={() => go(i)}
                    />
                  </li>
                );
              })}
            </ol>
            <h2>{beat.title}</h2>
            {beat.pov && <p className="moin-pov">Тем временем · {beat.pov}</p>}
            <p className="moin-preview-lede">{beat.prompt}</p>
            <label className="moin-play-voice moin-preview-quiet">
              <input
                type="checkbox"
                checked={quiet}
                onChange={(e) => {
                  setQuiet(e.target.checked);
                  try {
                    localStorage.setItem(
                      QUIET,
                      e.target.checked ? "on" : "off",
                    );
                  } catch {
                    // Без хранилища настройка живёт до перезагрузки.
                  }
                }}
              />{" "}
              Не могу говорить вслух — отвечаю письменно
            </label>
            <div className="moin-turn">
              <ChallengeView
                key={beat.id}
                c={beat.challenge}
                beatId={beat.id}
                rich={rich}
                world={before}
                known={words}
                rules={rulesSeen}
                game={{
                  value,
                  seed: beat.id,
                  disabled: false,
                  checked: false,
                  change: (v) =>
                    setSave((s) => ({
                      ...s,
                      drafts: { ...s.drafts, [beat.id]: v as string[] },
                    })),
                  win: () => undefined,
                  miss: () => undefined,
                  quiet,
                }}
              />
              {solved(save.at) && (
                <div className="moin-feedback is-correct" role="status">
                  <strong>Сцена пройдена.</strong>
                  <p>{beat.success}</p>
                  {save.at < scenes.length - 1 ? (
                    <button
                      type="button"
                      className="primary"
                      onClick={() => go(save.at + 1)}
                    >
                      {save.at === last ? `Глава ${ci + 2} →` : "Следующая сцена →"}
                    </button>
                  ) : (
                    <p>Это все сцены прототипа.</p>
                  )}
                </div>
              )}
            </div>
            <div className="moin-preview-tools">
              <button
                type="button"
                className="link-button"
                onClick={() => {
                  // Сбрасывается только эта глава: пройденные сцены других глав остаются.
                  stopAudio();
                  setSave((s) => ({
                    at: first,
                    drafts: Object.fromEntries(
                      Object.entries(s.drafts).filter(
                        ([id]) => !chapter.beats.some((b) => b.id === id),
                      ),
                    ),
                  }));
                }}
              >
                Начать главу заново
              </button>
            </div>
          </section>
          <aside className="moin-preview-notebook">
            <div className="kicker">Блокнот и инвентарь</div>
            {Object.entries(now).some(([q, v]) => v > 0 && TRACKS[q]) && (
              <ul className="moin-play-tracks">
                {Object.entries(now)
                  .filter(([q, v]) => v > 0 && TRACKS[q])
                  .map(([q, v]) => (
                    <li key={q}>
                      {TRACKS[q].icon} {TRACKS[q].label}{" "}
                      <span>
                        {TRACKS[q].size
                          ? "●".repeat(v) + "○".repeat(TRACKS[q].size! - v)
                          : "●".repeat(v)}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
            {gains.length ? (
              <ul>
                {gains.map((n, i) => (
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
            ) : (
              <p>Пока пусто. Улики и предметы появятся по ходу сцен.</p>
            )}
            {rulesMet.length > 0 && (
              <>
                <div className="kicker">Правила главы</div>
                {rulesMet.map((id) => (
                  <RuleCard key={id} id={id} open={false} />
                ))}
              </>
            )}
            <p className="moin-route-note">
              Действий в сценах:{" "}
              {chapter.beats.reduce(
                (n, s) =>
                  n +
                  (s.challenge.kind === "play"
                    ? flatNodes(s.challenge.nodes).filter((x) =>
                        [
                          "reply",
                          "type",
                          "gap",
                          "hear",
                          "pick",
                          "look",
                          "game",
                        ].includes(x.t),
                      ).length
                    : 0),
                0,
              )}
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

/**
 * Немецкая единица в рассказе. Перевод раскрывается прямо за словом, а не в блоке наверху
 * страницы: так его видно там, где читаешь. Нажатие сразу озвучивает выражение.
 */
function Word({ id, fresh }: { id: string; fresh: boolean }) {
  const [open, setOpen] = useState(false);
  const p = phrases[id];
  return (
    <>
      {fresh && <span>{p.ru} </span>}
      <button
        type="button"
        className={`moin-word${fresh ? " is-new" : ""}`}
        lang="de"
        aria-expanded={open}
        onClick={() => {
          if (!open) say(phraseAudio(p));
          setOpen(!open);
        }}
      >
        {fresh ? `(${p.de})` : p.de}
      </button>
      {open && (
        <span className="moin-word-info" role="status">
          {p.ru}
          {p.pl && (
            <>
              {" "}· мн. ч. <span lang="de">die {p.pl}</span>
            </>
          )}{" "}
          <PlayButton src={phraseAudio(p)} /> <small>{p.note}</small>
          {mnemonic(p.de) && <span className="moin-hook">💡 {mnemonic(p.de)}</span>}
        </span>
      )}
    </>
  );
}

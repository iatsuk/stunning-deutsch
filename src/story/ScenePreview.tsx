import { Fragment, useEffect, useState } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { stopAudio } from "../hooks";
import { PlayButton } from "../markup";
import { storyAudio } from "./audio";
import { ChallengeView } from "./ChallengeView";
import { phrases } from "./data";
import { mnemonic } from "./mnemonics";
import { beatPhrases, initialAnswer, isCorrect } from "./logic";
import { flatNodes, keyOf, nodeAt, shownWords, worldAfter } from "./scene";
import { sceneChapter1 } from "./scenes/01";
import type { Answer, SceneNode } from "./types";
import { TRACKS, type World } from "./world";
import "./story.css";

// Прототип главы 1 в формате сцен — отдельно от игры, чтобы автор мог сравнить форматы,
// не трогая прогресс основной истории. Своё сохранение: sd-moin-neu-v1.

const KEY = "sd-moin-neu-v1";
const QUIET = "sd-moin-quiet";
const readQuiet = () => {
  try {
    return localStorage.getItem(QUIET) === "on";
  } catch {
    return false;
  }
};
const scenes = sceneChapter1.beats;
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
  useTitle("Глава 1 в сценах · прототип · Stunning Deutsch");
  const [save, setSave] = useState(load);
  const [phrase, setPhrase] = useState<string | null>(null);
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
  const now = worldBefore(scenes.length);
  // Блокнот и инвентарь собираются из пройденных узлов всех сцен.
  const gains = scenes.flatMap((s) =>
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
    setPhrase(null);
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
      return (
        <Fragment key={i}>
          {fresh && <span>{p.ru} </span>}
          <button
            type="button"
            className={`moin-word${fresh ? " is-new" : ""}`}
            lang="de"
            onClick={() => setPhrase(phrase === id ? null : id)}
          >
            {fresh ? `(${p.de})` : p.de}
          </button>
        </Fragment>
      );
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
              Прототип нового формата · глава 1 целиком: шесть сцен и интерлюдия
            </div>
            <h1>Дело о пропавшем Moin</h1>
          </div>
        </header>
        <div className="moin-layout moin-preview">
          <section className="moin-scene" aria-label={beat.title}>
            <div className="moin-scene-top">
              <span>{sceneChapter1.place}</span>
              <span>
                Сцена {save.at + 1} / {scenes.length}
              </span>
            </div>
            <ol className="moin-steps" aria-label="Сцены главы">
              {scenes.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    aria-label={`Сцена ${i + 1}: ${s.title}`}
                    aria-current={i === save.at ? "step" : undefined}
                    data-done={solved(i) || undefined}
                    disabled={i > 0 && !solved(i - 1) && i !== save.at}
                    onClick={() => go(i)}
                  />
                </li>
              ))}
            </ol>
            <div className="moin-chapter-title">
              Глава 1 · {sceneChapter1.title}
            </div>
            {sceneChapter1.day && (
              <div className="moin-day">
                <b lang="de">{sceneChapter1.day.de}</b> · {sceneChapter1.day.ru}
              </div>
            )}
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
            {phrase && (
              <aside className="moin-translation" role="status">
                <button
                  type="button"
                  className="moin-close"
                  aria-label="Закрыть перевод"
                  onClick={() => setPhrase(null)}
                >
                  ×
                </button>
                <strong lang="de">
                  {phrases[phrase].de}{" "}
                  <PlayButton src={storyAudio(phrases[phrase].de)} />
                </strong>
                <div>{phrases[phrase].ru}</div>
                <small>{phrases[phrase].note}</small>
                {mnemonic(phrases[phrase].de) && (
                  <span className="moin-hook">
                    💡 {mnemonic(phrases[phrase].de)}
                  </span>
                )}
              </aside>
            )}
            <div className="moin-turn">
              <ChallengeView
                key={beat.id}
                c={beat.challenge}
                beatId={beat.id}
                rich={rich}
                world={before}
                known={words}
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
                      Следующая сцена →
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
                  stopAudio();
                  setSave({ at: 0, drafts: {} });
                }}
              >
                Начать прототип заново
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
            <p className="moin-route-note">
              Действий в сценах:{" "}
              {scenes.reduce(
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

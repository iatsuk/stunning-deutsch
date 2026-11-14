import { useEffect, useState } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { say, stopAudio } from "../hooks";
import { PlayButton } from "../markup";
import { allWords, phraseAudio, wordInfo } from "./audio";
import { ChallengeView } from "./ChallengeView";
import { phrases } from "./data";
import { mnemonic } from "./mnemonics";
import { beatPhrases, initialAnswer, isCorrect } from "./logic";
import { migrate, toIds, toKeys, type Layout } from "./progress";
import pastLayouts from "./scene-layouts.json";
import { dayNumber, grade, remember, type Cards } from "./memory";
import { buildReview, dueUnits, MIN_DUE, reviewSources, SCENE_INTERVALS, sceneUnits, WELCOME_ROUNDS, type Mech } from "./review";
import { SceneReview, type ReviewReason } from "./ReviewView";
import { flatNodes, keyOf, nodeAt, sceneRules, shownWords, worldAfter } from "./scene";
import { RuleCard } from "./RuleCard";
import { sceneChapters } from "./scenes";
import type { Answer, Mark, SceneNode } from "./types";
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
/**
 * drafts — ответы сцен по номерам узлов текущей раскладки; в хранилище они лежат по отпечаткам узлов
 * (src/story/progress.ts), чтобы новый узел не сдвигал пройденное. passed — пройденные сцены: новое
 * действие в такой сцене приходит пустой ячейкой и не снимает с неё отметку. cards — очередь
 * повторения (A1-PLAN.md, «Повторение»), last — когда был последний раунд, chapters — главы, перед
 * которыми повторение уже прошло, recent — механики прошлого раунда. Старое сохранение без этих полей
 * получает их пустыми.
 */
type Save = {
  at: number;
  drafts: Record<string, string[]>;
  passed: string[];
  cards: Cards;
  last: Mark;
  chapters: string[];
  recent: Mech[];
};

// Повторение: реплики и замки всех сцен, слова с переводом для игр.
const sources = reviewSources(scenes);
const gameWords = allWords();
const beatNodes = (beat: (typeof scenes)[number]): SceneNode[] =>
  beat.challenge.kind === "play" ? beat.challenge.nodes : [];
const complete = (save: Pick<Save, "drafts">, i: number) =>
  isCorrect(scenes[i].challenge, save.drafts[scenes[i].id]);
const solvedIn = (save: Pick<Save, "drafts" | "passed">, i: number) =>
  save.passed.includes(scenes[i].id) || complete(save, i);
const solvedCount = (save: Pick<Save, "drafts" | "passed">) =>
  scenes.filter((_, i) => solvedIn(save, i)).length;
const LEGACY = pastLayouts as unknown as Record<string, Layout[]>;

/** Ответы из хранилища в номера текущей раскладки. Сохранение до отпечатков переносится по версиям сцен. */
function readDrafts(raw: { v?: number; drafts: Record<string, string[]> }) {
  const drafts: Record<string, string[]> = {};
  const passed: string[] = [];
  for (const beat of scenes) {
    const entries = raw.drafts[beat.id];
    if (!Array.isArray(entries)) continue;
    if (raw.v === 2) {
      drafts[beat.id] = toKeys(beatNodes(beat), entries);
      continue;
    }
    const moved = migrate(beatNodes(beat), entries, LEGACY[beat.id] ?? []);
    drafts[beat.id] = moved.entries;
    if (moved.passed) passed.push(beat.id);
  }
  return { drafts, passed };
}

/** Пройденные сцены кладут свои слова, реплики и замки в очередь; уже лежащие не трогаем. */
function remembered(save: Save, day: number): Save {
  let cards = save.cards;
  let step = 0;
  scenes.forEach((beat, i) => {
    if (!solvedIn(save, i)) return;
    step++;
    cards = remember(cards, sceneUnits(beat, wordInfo), step, day);
  });
  return cards === save.cards ? save : { ...save, cards };
}

function load(): Save {
  const empty: Save = { at: 0, drafts: {}, passed: [], cards: {}, last: { step: 0, day: 0 }, chapters: [], recent: [] };
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (
      raw &&
      Number.isInteger(raw.at) &&
      raw.drafts &&
      typeof raw.drafts === "object"
    ) {
      const { drafts, passed } = readDrafts(raw);
      return remembered(
        {
          at: Math.min(Math.max(0, raw.at), scenes.length - 1),
          drafts,
          passed: [...new Set([...(Array.isArray(raw.passed) ? raw.passed : []), ...passed])],
          cards: raw.cards && typeof raw.cards === "object" ? raw.cards : {},
          last: Number.isInteger(raw.last?.step) && Number.isInteger(raw.last?.day) ? raw.last : empty.last,
          chapters: Array.isArray(raw.chapters) ? raw.chapters : [],
          recent: Array.isArray(raw.recent) ? raw.recent : [],
        },
        dayNumber(),
      );
    }
  } catch {
    // Повреждённое или недоступное сохранение: начинаем сначала.
  }
  return empty;
}

export function ScenePreview() {
  useTitle("Главы в сценах · прототип · Stunning Deutsch");
  const [save, setSave] = useState(load);
  // Открытое повторение держится до закрытия: после оценки очередь короче, но итог раунда виден.
  const [reviewing, setReviewing] = useState<ReviewReason | null>(null);
  const ci = chapterOf(save.at);
  const chapter = chapters[ci];
  const first = firstOf(ci);
  const last = first + chapter.beats.length - 1;
  // Где нужно говорить вслух, можно отвечать письменно: например, в офисе.
  const [quiet, setQuiet] = useState(readQuiet);
  const beat = scenes[save.at];
  const value: Answer =
    save.drafts[beat.id] ?? (initialAnswer(beat.challenge) as string[]);
  const solved = (i: number) => solvedIn(save, i);
  // Немецкая единица в рассказе знакома, если звучала в прошлых сценах; слово — если сцены
  // его уже показали: среди новых слов реплик, при осмотре или в инвентаре.
  const known = new Set(scenes.slice(0, save.at).flatMap(beatPhrases));
  useEffect(() => {
    try {
      const drafts = Object.fromEntries(
        Object.entries(save.drafts).map(([id, entries]) => {
          const beat = scenes.find((b) => b.id === id);
          return [id, beat ? toIds(beatNodes(beat), entries) : entries];
        }),
      );
      localStorage.setItem(KEY, JSON.stringify({ ...save, v: 2, drafts }));
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

  // Повторение: перед главой — прошлая глава; за новый день — разминка; перед новой сценой —
  // если накопилось. Только перед нетронутой сценой: начатую сцену раунд не прерывает.
  const today = dayNumber();
  const count = solvedCount(save);
  const fresh = !solved(save.at) && !(save.drafts[beat.id]?.length);
  const frontier = scenes.findIndex((_, i) => !solved(i));
  const due = dueUnits(save.cards, count, today).length;
  const auto: ReviewReason | null = !fresh
    ? null
    : save.at === first && ci > 0 && !save.chapters.includes(chapter.id)
      ? "chapter"
      : save.at !== frontier
        ? null
        : save.last.day > 0 && today > save.last.day && due >= MIN_DUE
          ? "welcome"
          : count > save.last.step && due >= MIN_DUE
            ? "scene"
            : null;
  const reason = reviewing ?? auto;
  const review = reason
    ? buildReview(save.cards, count, today, {
        lookup: wordInfo,
        sources,
        words: gameWords,
        seed: `${count}-${today}-${Object.keys(save.cards).length}-${save.recent.join(",")}`,
        recent: save.recent,
        focus:
          reason === "chapter" && ci > 0
            ? chapters[ci - 1].beats.flatMap((b) => sceneUnits(b, wordInfo))
            : undefined,
      })
    : null;
  const reviewOpen = !!reason && (!!review || !!reviewing);
  function closeReview() {
    stopAudio();
    const was = reason;
    setReviewing(null);
    setSave((s) => ({
      ...s,
      last: { step: solvedCount(s), day: dayNumber() },
      chapters: was === "chapter" && !s.chapters.includes(chapter.id) ? [...s.chapters, chapter.id] : s.chapters,
    }));
  }
  function gradeReview(units: string[], missed: string[], mechs: Mech[]) {
    setReviewing(reason);
    setSave((s) => ({
      ...s,
      cards: grade(s.cards, units, missed, solvedCount(s), dayNumber(), SCENE_INTERVALS),
      recent: mechs,
    }));
  }

  function go(at: number) {
    stopAudio();
    setReviewing(null);
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
        {/* У главы номер, тема урока и название — видно, какой урок нужен для главы. Пройденная
            глава получает ✓ рядом с номером, а не вместо него: номера нужны и после прохождения. */}
        <nav className="moin-chapters" aria-label="Главы">
          {chapters.map((c, i) => {
            const from = firstOf(i);
            const complete = c.beats.every((_, k) => solved(from + k));
            return (
              <button
                type="button"
                key={c.id}
                aria-current={i === ci ? "page" : undefined}
                aria-label={`Глава ${i + 1}: ${c.topic} · ${c.title}${complete ? ", пройдена" : ""}`}
                onClick={() => {
                  // Глава открывается на первой непройденной сцене: так легко продолжить.
                  const open = c.beats.findIndex((_, k) => !solved(from + k));
                  go(from + (open < 0 ? 0 : open));
                }}
              >
                <span className="moin-chapters-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                  {complete && <span className="moin-chapters-done">✓</span>}
                </span>
                <span aria-hidden="true">
                  {c.topic}
                  <small>{c.title}</small>
                </span>
              </button>
            );
          })}
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
                      data-new={(save.passed.includes(s.id) && !complete(save, i)) || undefined}
                      title={save.passed.includes(s.id) && !complete(save, i) ? "В пройденной сцене появилось новое" : undefined}
                      disabled={k > 0 && !solved(i - 1) && i !== save.at}
                      onClick={() => go(i)}
                    />
                  </li>
                );
              })}
            </ol>
            <h2>{beat.title}</h2>
            {beat.pov && <p className="moin-pov">Тем временем · {beat.pov}</p>}
            {save.passed.includes(beat.id) && !complete(save, save.at) && (
              <p className="moin-new-note" role="status">
                В пройденную сцену добавлено новое. Пройденное сохранено, новое ждёт ниже.
              </p>
            )}
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
              {reviewOpen ? (
                <SceneReview
                  key={`${reason}-${save.at}`}
                  next={review}
                  reason={reason!}
                  rounds={reason === "welcome" ? WELCOME_ROUNDS : 1}
                  sources={sources}
                  onGrade={gradeReview}
                  onClose={closeReview}
                />
              ) : (
              <>
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
                    setSave((s) =>
                    {
                      const drafts = { ...s.drafts, [beat.id]: v as string[] };
                      const done = isCorrect(beat.challenge, v) && !s.passed.includes(beat.id);
                      return remembered({ ...s, drafts, passed: done ? [...s.passed, beat.id] : s.passed }, dayNumber());
                    },
                    ),
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
              </>
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
                    ...s,
                    at: first,
                    drafts: Object.fromEntries(
                      Object.entries(s.drafts).filter(
                        ([id]) => !chapter.beats.some((b) => b.id === id),
                      ),
                    ),
                    passed: s.passed.filter((id) => !chapter.beats.some((b) => b.id === id)),
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
            <div className="kicker">Повторение</div>
            <p className="moin-route-note">
              В очереди: {Object.keys(save.cards).length}, пора повторить: {due}.
            </p>
            {!reviewOpen && Object.keys(save.cards).length > 0 && (
              <button type="button" className="link-button" onClick={() => setReviewing("manual")}>
                Повторить
              </button>
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
          {p.pl && p.pl !== "-" && (
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

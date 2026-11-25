import { useEffect, useState } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { say, setPlaybackRate, stopAudio } from "../hooks";
import { PlayButton, plural } from "../markup";
import { allWords, phraseAudio, wordInfo } from "./audio";
import { ChallengeView } from "./ChallengeView";
import { phrases } from "./data";
import { mnemonic } from "./mnemonics";
import { beatPhrases, initialAnswer, isCorrect } from "./logic";
import { migrate, sceneAt, toIds, toKeys, type Layout } from "./progress";
import pastLayouts from "./scene-layouts.json";
import { dayNumber, grade, longTerm, remember, type Cards } from "./memory";
import { buildReview, dueUnits, MIN_DUE, reviewSources, SCENE_INTERVALS, sceneUnits, stubbornReview, stubbornUnits, unitText, warmupReview, WELCOME_ROUNDS, type Context, type Mech } from "./review";
import { SceneReview, type ReviewReason } from "./ReviewView";
import { playedGames, practiceGrade, returnMiss } from "./practice";
import { PracticeView } from "./PracticeView";
import { flatNodes, germanBefore, keyOf, nodeAt, sceneRules, shownWords, worldAfter } from "./scene";
import { RuleCard } from "./RuleCard";
import { caseNotes, dossier } from "./casebook";
import { CaseNotes, Dossier, Newspaper, NoteList, Postcards } from "./CaseView";
import { newspaper } from "./newspaper";
import { openPostcards } from "./postcards";
import { sceneChapters } from "./scenes";
import { WARMUPS } from "./scenes/warmups";
import type { Answer, Mark, SceneNode } from "./types";
import { TRACKS, type World } from "./world";
import "./story.css";

// Курс A1: главы истории в формате сцен. Сохранение: sd-moin-neu-v1. Сцены всех глав идут
// одним списком; место игрока хранится по id сцены, поэтому новая сцена в любой главе его не сдвигает.

const KEY = "sd-moin-neu-v1";
const QUIET = "sd-moin-quiet";
const SLOW = "sd-moin-slow";
/** Записи в «Langsam, bitte» звучат так: медленнее, но ещё без искажений. */
const SLOW_RATE = 0.8;
const readOn = (key: string) => {
  try {
    return localStorage.getItem(key) === "on";
  } catch {
    return false;
  }
};
const saveOn = (key: string, on: boolean) => {
  try {
    localStorage.setItem(key, on ? "on" : "off");
  } catch {
    // Без хранилища настройка живёт до перезагрузки.
  }
};
const chapters = sceneChapters;
/** Вкладки блокнота: текущая глава, всё дело по главам, досье героев, открытки о Германии. */
const NOTEBOOK_TABS = [["chapter", "Глава"], ["case", "Всё дело"], ["dossier", "Досье"], ["postcards", "Открытки"]] as const;
/** Газета выходит, когда пройдена глава 12. */
const PAPER_TAB = ["paper", "Газета"] as const;
const PAPER_CHAPTER = 12;
type NotebookTab = (typeof NOTEBOOK_TABS)[number][0] | (typeof PAPER_TAB)[0];
const scenes = chapters.flatMap((c) => c.beats);
const sceneIds = scenes.map((b) => b.id);
/** Первая сцена главы в общем списке. */
const firstOf = (chapter: number) =>
  chapters.slice(0, chapter).reduce((n, c) => n + c.beats.length, 0);
const chapterOf = (at: number) =>
  chapters.findIndex((_, i) => at < firstOf(i + 1));
/**
 * at — номер текущей сцены в общем списке; в хранилище рядом лежит её id (scene).
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
          at: sceneAt(sceneIds, raw),
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

/** Страница курса A1; training — пришли со стола клуба на карте главной: открыть тренировку, если есть из чего её собрать. */
export function ScenePreview({ training = false }: { training?: boolean }) {
  useTitle("Дело о пропавшем Moin · Курс A1 · Stunning Deutsch");
  const [save, setSave] = useState(load);
  const canPractice = Object.keys(save.cards).length > 0 || playedGames(chapters, save.drafts).length > 0;
  const [practicing, setPracticing] = useState(training && canPractice);
  // Адрес тренировки нужен только для входа: дальше страница живёт по адресу курса, и перезагрузка не возвращает
  // в тренировку. replaceState не шлёт hashchange, поэтому страница не пересоздаётся.
  useEffect(() => {
    if (training) history.replaceState(null, "", "#/a1/moin");
  }, [training]);
  // Открытое повторение держится до закрытия: после оценки очередь короче, но итог раунда виден.
  const [reviewing, setReviewing] = useState<ReviewReason | null>(null);
  const ci = chapterOf(save.at);
  const chapter = chapters[ci];
  const first = firstOf(ci);
  const last = first + chapter.beats.length - 1;
  // Где нужно говорить вслух, можно отвечать письменно: например, в офисе.
  const [quiet, setQuiet] = useState(() => readOn(QUIET));
  const [slow, setSlow] = useState(() => readOn(SLOW));
  const [tab, setTab] = useState<NotebookTab>("chapter");
  useEffect(() => {
    setPlaybackRate(slow ? SLOW_RATE : 1);
    return () => setPlaybackRate(1);
  }, [slow]);
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
      localStorage.setItem(KEY, JSON.stringify({ ...save, v: 2, drafts, scene: scenes[save.at].id }));
    } catch {
      // Без хранилища игра работает до перезагрузки.
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
  const notes = caseNotes(chapters, save.drafts);
  const paperOut = chapters[PAPER_CHAPTER - 1].beats.every((_, k) => solved(firstOf(PAPER_CHAPTER - 1) + k));
  const activeTab: NotebookTab = tab === "paper" && !paperOut ? "chapter" : tab;
  const gains = notes.find((g) => g.chapter === ci + 1)?.notes ?? [];

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
  const stubborn = stubbornUnits(save.cards);
  const ctx: Context = {
    lookup: wordInfo,
    sources,
    words: gameWords,
    seed: `${count}-${today}-${Object.keys(save.cards).length}-${save.recent.join(",")}`,
    recent: save.recent,
    chapter: ci + 1,
    focus:
      reason === "chapter" && ci > 0
        ? chapters[ci - 1].beats.flatMap((b) => sceneUnits(b, wordInfo))
        : undefined,
  };
  // Перед главой — постоянный раунд, одинаковый для всех; если его нет, раунд из прошлой главы.
  const warmup = reason === "chapter" && WARMUPS[ci + 1] ? warmupReview(WARMUPS[ci + 1], wordInfo) : null;
  const review = warmup
    ? warmup
    : reason === "stubborn"
    ? stubbornReview(stubborn, save.cards, ctx)
    : reason
    ? buildReview(save.cards, count, today, ctx)
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
  // Минута на упрямые слова — тренировка: отметку повторения она не двигает, иначе пропал бы раунд перед сценой.
  function closeStubborn() {
    stopAudio();
    setReviewing(null);
  }
  function gradeReview(units: string[], missed: string[], mechs: Mech[]) {
    setReviewing(reason);
    setSave((s) => ({
      ...s,
      cards: grade(s.cards, units, missed, solvedCount(s), dayNumber(), SCENE_INTERVALS),
      recent: mechs,
    }));
  }

  function gradePractice(missed: string[]) {
    setSave((s) => ({ ...s, cards: practiceGrade(s.cards, missed, solvedCount(s), dayNumber()) }));
  }

  function go(at: number) {
    stopAudio();
    setPracticing(false);
    setReviewing(null);
    setSave((s) => ({ ...s, at }));
    window.scrollTo({ top: 0 });
  }
  function rich(text: string, seen?: Set<string>) {
    const parts = text.split(/(\{[\w-]+\})/g);
    return parts.map((part, i) => {
      if (!part.startsWith("{")) return part;
      const id = part.slice(1, -1);
      const p = phrases[id];
      if (!p) return part;
      const fresh =
        !known.has(id) && !words.includes(p.de) && !seen?.has(id) && !seen?.has(p.de);
      return <Word key={i} id={id} fresh={fresh} german={germanBefore(parts[i - 1] ?? "")} />;
    });
  }

  return (
    <>
      <Topbar
        crumbs={[
          { label: "A1", href: "#/a1" },
          { label: "Moin" },
        ]}
      />
      <main className="moin-page">
        <header className="moin-game-heading">
          <div>
            <div className="kicker">
              Курс A1 · {plural(chapters.length, ["глава", "главы", "глав"])}
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
                  saveOn(QUIET, e.target.checked);
                }}
              />{" "}
              Не могу говорить вслух — отвечаю письменно
            </label>
            <label className="moin-play-voice moin-preview-quiet">
              <input
                type="checkbox"
                checked={slow}
                onChange={(e) => {
                  setSlow(e.target.checked);
                  saveOn(SLOW, e.target.checked);
                }}
              />{" "}
              <span lang="de">Langsam, bitte</span> — записи звучат медленнее
            </label>
            <div className="moin-turn">
              {practicing ? (
                <PracticeView
                  drafts={save.drafts}
                  cards={save.cards}
                  chapters={chapters}
                  lookup={wordInfo}
                  sources={sources}
                  words={gameWords}
                  rich={rich}
                  quiet={quiet}
                  onGrade={(_, missed) => gradePractice(missed)}
                  onClose={() => {
                    stopAudio();
                    setPracticing(false);
                    window.scrollTo({ top: 0 });
                  }}
                />
              ) : reviewOpen ? (
                <SceneReview
                  key={`${reason}-${save.at}`}
                  next={review}
                  reason={reason!}
                  rounds={reason === "welcome" ? WELCOME_ROUNDS : 1}
                  sources={sources}
                  onGrade={reason === "stubborn" ? (_, missed) => gradePractice(missed) : gradeReview}
                  onClose={reason === "stubborn" ? closeStubborn : closeReview}
                />
              ) : (
              <>
              <ChallengeView
                key={beat.id}
                c={beat.challenge}
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
                  miss: (word) => {
                    if (word) setSave((s) => {
                      const cards = returnMiss(s.cards, word, solvedCount(s), dayNumber());
                      return cards === s.cards ? s : { ...s, cards };
                    });
                  },
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
                    <p>Это все сцены истории.</p>
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
                  setPracticing(false);
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
            <div className="moin-notebook-tabs" role="group" aria-label="Что показать в блокноте">
              {(paperOut ? [...NOTEBOOK_TABS, PAPER_TAB] : NOTEBOOK_TABS).map(([id, label]) => (
                <button type="button" key={id} aria-pressed={activeTab === id} onClick={() => setTab(id)}>
                  {label}
                </button>
              ))}
            </div>
            {activeTab === "case" && <CaseNotes groups={notes} chapters={chapters} />}
            {activeTab === "dossier" && <Dossier heroes={dossier(chapters, save.drafts)} />}
            {activeTab === "postcards" && <Postcards cards={openPostcards(scenes.filter((_, i) => solved(i)).map((b) => b.id))} />}
            {activeTab === "paper" && <Newspaper headlines={newspaper(now)} learned={longTerm(save.cards, SCENE_INTERVALS)} />}
            {activeTab === "chapter" && (
            <>
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
              <NoteList notes={gains} />
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
            </>
            )}
            <div className="kicker">Повторение</div>
            <p className="moin-route-note">
              В очереди: {Object.keys(save.cards).length}, пора повторить: {due}.
            </p>
            <div className="moin-notebook-actions">
              {!reviewOpen && Object.keys(save.cards).length > 0 && (
                <button type="button" className="link-button" onClick={() => {
                  // Повторение и тренировка делят одно место на странице: повторение закрывает тренировку.
                  stopAudio();
                  setPracticing(false);
                  setReviewing("manual");
                }}>
                  Повторить
                </button>
              )}
              {!practicing && canPractice && (
                <button type="button" className="link-button" onClick={() => {
                  stopAudio();
                  setReviewing(null);
                  setPracticing(true);
                  window.scrollTo({ top: 0 });
                }}>
                  Тренировка
                </button>
              )}
            </div>
            {stubborn.length > 0 && (
              <>
                <div className="kicker">Упрямые слова</div>
                <ul>
                  {stubborn.map((unit) => {
                    const { de, ru } = unitText(unit, sources, wordInfo);
                    return (
                      <li key={unit}>
                        <span lang="de">{de}</span> — {ru}
                      </li>
                    );
                  })}
                </ul>
                {!reviewOpen && (
                  <button type="button" className="link-button" onClick={() => {
                    stopAudio();
                    setPracticing(false);
                    setReviewing("stubborn");
                    window.scrollTo({ top: 0 });
                  }}>
                    Минута на них
                  </button>
                )}
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
function Word({ id, fresh, german = false }: { id: string; fresh: boolean; german?: boolean }) {
  const [open, setOpen] = useState(false);
  const p = phrases[id];
  const de = german ? p.de.replace(/^(der|die|das) /, "") : p.de;
  return (
    <>
      {fresh && !german && <span>{p.ru} </span>}
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
        {fresh && !german ? `(${de})` : de}
      </button>
      {fresh && german && <span> ({p.ru})</span>}
      {open && (
        <span className="moin-word-info" role="status">
          {p.ru}
          {p.pl && p.pl !== "-" && p.pl !== "pl" && (
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

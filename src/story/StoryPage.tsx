import { Fragment, useEffect, useRef, useState } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { stopAudio, useMobile } from "../hooks";
import { PlayButton, plural } from "../markup";
import { a1Words, phraseAudio, wordInfo } from "./audio";
import { beats, episodes, phrases } from "./data";
import { mnemonic } from "./mnemonics";
import { WordDrill } from "./drill";
import { RuleCard } from "./RuleCard";
import { rulesBefore, stepRules } from "./rules";
import { ChapterReview, VoiceLines } from "./games";
import { AUTOMATIC, ChallengeView, GAME_NAMES } from "./ChallengeView";
import {
  beatPhrases,
  initialAnswer,
  isCorrect,
  knownBefore,
  mistake,
  normalizeSave,
  reachOf,
  reviewItems,
  solution,
  STORY_KEY,
  wrongAnswers,
} from "./logic";
import {
  buildRound,
  dayNumber,
  dueWords,
  grade,
  lockCards,
  memoryStats,
  remember,
  slip,
  stepWords,
  timeForRound,
} from "./memory";
import type { Answer, Beat, StorySave } from "./types";
import "./story.css";

const LOCKS = lockCards(beats);

function load(): { save: StorySave; started: boolean } {
  try {
    const raw = localStorage.getItem(STORY_KEY);
    return {
      save: normalizeSave(raw ? JSON.parse(raw) : null, beats),
      started: !!raw,
    };
  } catch {
    return { save: normalizeSave(null, beats), started: false };
  }
}
function HarborArt() {
  return (
    <svg
      className="moin-art"
      viewBox="0 0 480 320"
      role="img"
      aria-label="Красная сумка у гавани Киля, маяк и чайка"
    >
      <defs>
        <pattern
          id="moin-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M24 0H0V24"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".07"
          />
        </pattern>
      </defs>
      <rect width="480" height="320" fill="url(#moin-grid)" />
      <circle cx="332" cy="114" r="72" fill="#f2c14e" fillOpacity=".09" />
      <g fill="none" stroke="#718c94" strokeWidth="2">
        <path d="M24 233 Q55 221 86 233T148 233T210 233T272 233T334 233T396 233T458 233M12 255 Q43 243 74 255T136 255T198 255T260 255T322 255T384 255T446 255M36 277 Q67 265 98 277T160 277T222 277T284 277T346 277T408 277" />
      </g>
      <g stroke="#a39d93" strokeWidth="2" fill="#1c262b">
        <path d="M344 204l7-113h27l7 113z" />
        <path d="M347 91h35v-15h-35zM344 76l21-19 21 19z" />
        <path d="M346 204h41M364 56V42" />
        <path d="M354 125h22M352 156h27" stroke="#e79877" strokeWidth="9" />
        <path d="M354 83h22" stroke="#f2c14e" />
      </g>
      <g stroke="#d5c8a3" fill="none" strokeWidth="2">
        <path d="M88 215V98l55 100H88M84 131l-40 66h40M38 208h118l-22 15H53z" />
        <path d="M92 96l19 7-19 7" stroke="#f2c14e" />
      </g>
      <path
        d="M56 286l310-27 52 34"
        fill="none"
        stroke="#6d685f"
        strokeWidth="5"
      />
      <g transform="rotate(-9 244 208)">
        <path
          d="M185 163h117l8 98H177z"
          fill="#773e3b"
          stroke="#d78b7b"
          strokeWidth="2"
        />
        <path
          d="M210 163v-16a26 26 0 0152 0v16"
          fill="none"
          stroke="#d78b7b"
          strokeWidth="6"
        />
        <path d="M187 184h114" stroke="#d78b7b" strokeWidth="2" />
        <rect x="202" y="201" width="78" height="36" rx="2" fill="#e9d9ac" />
        <text
          x="241"
          y="226"
          textAnchor="middle"
          fontFamily="monospace"
          fontWeight="bold"
          fontSize="23"
          fill="#342e29"
        >
          MOIN?
        </text>
      </g>
      <g fill="none" stroke="#ece8e0" strokeWidth="2">
        <path d="M188 65q13-16 25 0q12-16 25 0M276 39q8-10 16 0q8-10 16 0" />
        <path d="M406 200q-15-16-27-1l-13 8 36 1z" fill="#c8c7bd" />
        <path d="M402 200l14 5-14 3" stroke="#f2c14e" />
        <circle cx="396" cy="199" r="1" fill="#0e0f12" />
        <path d="M386 208v9M394 208v9" stroke="#f2c14e" />
      </g>
      <text
        x="25"
        y="33"
        fontFamily="monospace"
        fontSize="10"
        letterSpacing="3"
        fill="#718c94"
      >
        KIEL · FALL 001
      </text>
    </svg>
  );
}

export function StoryPage() {
  useTitle("Дело о пропавшем Moin · Игра A1 · Stunning Deutsch");
  const mobile = useMobile();
  const [loaded] = useState(load);
  const [save, setSave] = useState(loaded.save);
  const [started, setStarted] = useState(loaded.started);
  const [saved, setSaved] = useState(true);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [resetPrompt, setResetPrompt] = useState(false);
  const [notebook, setNotebook] = useState(false);
  const [drilling, setDrilling] = useState(false);
  const scene = useRef<HTMLElement>(null);
  const at = Math.max(
    0,
    beats.findIndex((b) => b.id === save.cursor),
  );
  const beat = beats[at];
  const done = new Set(save.done);
  const solved = done.has(beat.id);
  const reach = reachOf(save, beats);
  // Счётчик пройденных шагов — часы памяти слов; он только растёт.
  const count = save.done.length;
  const episode = episodes.find((e) => e.beats.some((b) => b.id === beat.id))!;
  const chapter = episodes.indexOf(episode);
  const chapterStart = beats.indexOf(episode.beats[0]);
  const chapterStep = at - chapterStart;
  const known = knownBefore(beats, at);
  const newPhrases = beatPhrases(beat).filter((id) => !known.has(id));
  const finished = count === beats.length;
  const today = dayNumber();
  const round = buildRound(save.cards, count, today, a1Words, LOCKS);
  // Посреди истории раунд встаёт перед новым шагом, а после финала ждёт следующего захода:
  // закончившему дело сначала показываем развязку.
  const drillDue = finished
    ? loaded.save.done.length === beats.length && today > save.last.day
    : at === reach && !solved && timeForRound(save.last, count, today);
  const drillOpen = drilling || (!!round && drillDue);
  const stats = memoryStats(save.cards);
  useEffect(() => {
    if (!started) return;
    try {
      localStorage.setItem(STORY_KEY, JSON.stringify(save));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }, [save, started]);
  useEffect(() => () => stopAudio(), []);
  function focusScene() {
    requestAnimationFrame(() => {
      scene.current?.focus();
      scene.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }
  function go(index: number) {
    stopAudio();
    setPhrase(null);
    setDrilling(false);
    setSave((s) => ({ ...s, cursor: beats[index].id }));
    focusScene();
  }
  /** Отложить шаг: он остаётся пустой ячейкой, а история идёт дальше. */
  function skip() {
    stopAudio();
    setPhrase(null);
    setSave((s) => ({
      ...s,
      skipped: s.skipped.includes(beat.id) ? s.skipped : [...s.skipped, beat.id],
      cursor: beats[Math.min(at + 1, beats.length - 1)].id,
    }));
    focusScene();
  }
  function closeDrill() {
    stopAudio();
    setDrilling(false);
    setSave((s) => ({
      ...s,
      last: { step: s.done.length, day: dayNumber() },
    }));
    focusScene();
  }
  function gradeRound(words: string[], missed: string[]) {
    // Панель остаётся открытой: показать итог, даже если новых слов к повторению нет.
    setDrilling(true);
    setSave((s) => ({
      ...s,
      cards: grade(s.cards, words, missed, s.done.length, dayNumber()),
    }));
  }
  function rich(text: string) {
    return text.split(/(\{[\w-]+\})/g).map((part, i) => {
      if (!part.startsWith("{")) return part;
      const id = part.slice(1, -1),
        p = phrases[id];
      if (!p) return part;
      const bilingual = save.support || !known.has(id);
      return (
        <Fragment key={i}>
          {bilingual && <span>{p.ru} </span>}
          <button
            type="button"
            className={`moin-word${!known.has(id) ? " is-new" : ""}`}
            lang="de"
            aria-label={`${p.de} — открыть перевод и пояснение`}
            aria-expanded={phrase === id}
            onClick={() => setPhrase(phrase === id ? null : id)}
          >
            {bilingual ? `(${p.de})` : p.de}
          </button>
        </Fragment>
      );
    });
  }
  const clues = beats.filter((b) => b.clue && done.has(b.id));
  return (
    <>
      <Topbar crumbs={[{ label: "A1", href: "#/a1" }, { label: "Moin" }]} />
      <main className="moin-page">
        {!started ? (
          <section className="moin-cover">
            <div className="moin-cover-copy">
              <div className="kicker">Сюжетная игра · весь маршрут A1</div>
              <h1>
                Дело о<br />
                пропавшем <em>Moin</em>
              </h1>
              <p className="moin-cover-lede">
                В Киле исчезло даже «привет».
                <br />
                Найдите его, пока чайка не назначила себя главным детективом.
              </p>
              <p>
                Начните с русского рассказа. Новые немецкие слова и фразы
                постепенно займут в нём своё место — вместе с артиклями,
                падежами и порядком слов.
              </p>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  setStarted(true);
                  requestAnimationFrame(() => scene.current?.focus());
                }}
              >
                Открыть дело →
              </button>
              <div className="moin-cover-meta">
                <span>12 глав</span>
                <span>
                  {plural(beats.length, ["действие", "действия", "действий"])}
                </span>
                <span>Проиграть нельзя</span>
              </div>
            </div>
            <div>
              <HarborArt />
              <div className="moin-stamp">
                Папка № 001
                <br />
                <strong>Пропало: одно приветствие</strong>
                <br />
                Последний раз видели в Киле
              </div>
            </div>
            <div className="moin-method">
              <div>
                <b>Читайте и действуйте</b>
                <p>
                  Разговаривайте, ставьте часы, ищите дорогу по схеме,
                  раскладывайте карточки и проверяйте улики. Ошибка даёт
                  подсказку и новую попытку.
                </p>
              </div>
              <div>
                <b>Немецкий приходит постепенно</b>
                <p>
                  Сначала «в сумке (in der Tasche)», позже — «in der Tasche».
                  Нажмите на немецкую фразу, чтобы вернуть перевод.
                </p>
              </div>
              <div>
                <b>Продолжайте с того же места</b>
                <p>
                  Блокнот, ответы и память слов сохраняются в этом браузере.
                  Старые слова возвращаются в новых главах и после перерыва;
                  письмо и разговор практикуйте также в уроках.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <>
            <header className="moin-game-heading">
              <div>
                <div className="kicker">Детективная история · A1</div>
                <h1>Дело о пропавшем Moin</h1>
              </div>
              <div className="moin-heading-tools">
                <button
                  type="button"
                  className="moin-notebook-button"
                  aria-expanded={notebook}
                  onClick={() => setNotebook(!notebook)}
                >
                  Блокнот · {plural(clues.length, ["улика", "улики", "улик"])}
                </button>
                {round && !drillOpen && (
                  <button
                    type="button"
                    className="moin-reset-button"
                    onClick={() => {
                      stopAudio();
                      setDrilling(true);
                      focusScene();
                    }}
                  >
                    Повторить ·{" "}
                    {plural(
                      dueWords(save.cards, count, today).length,
                      ["карточка", "карточки", "карточек"],
                    )}
                  </button>
                )}
                <button
                  type="button"
                  className="moin-reset-button"
                  aria-expanded={resetPrompt}
                  onClick={() => setResetPrompt(!resetPrompt)}
                >
                  Сброс
                </button>
              </div>
            </header>
            {resetPrompt && (
              <div className="moin-reset" role="group" aria-label="Сброс игры">
                <p>
                  Начать дело с первого шага? Прогресс игры, ошибки, черновики и
                  память слов удалятся, прогресс уроков сохранится.
                </p>
                <button
                  type="button"
                  className="primary"
                  onClick={() => {
                    stopAudio();
                    setSave(normalizeSave(null, beats));
                    setPhrase(null);
                    setResetPrompt(false);
                    setNotebook(false);
                    setDrilling(false);
                  }}
                >
                  Да, сбросить
                </button>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setResetPrompt(false)}
                >
                  Отмена
                </button>
              </div>
            )}
            <div className="moin-progress">
              <span>
                {count} / {beats.length} действий
              </span>
              <progress
                value={count}
                max={beats.length}
                aria-label="Пройдено игровых действий"
              />
              <span>
                {finished ? "Дело раскрыто" : `Глава ${chapter + 1} из 12`}
              </span>
            </div>
            {!saved && (
              <p role="status" className="moin-storage-warning">
                Браузер не разрешил сохранить прогресс. До закрытия страницы
                можно продолжать играть.
              </p>
            )}
            <div className="moin-layout">
              <aside className="moin-route">
                <details open={!mobile}>
                  <summary>Маршрут дела</summary>
                  <ol>
                    {episodes.map((e, i) => {
                      const start = beats.indexOf(e.beats[0]),
                        complete = e.beats.every((b) => done.has(b.id)),
                        // Глава позади, но в ней есть пустые ячейки: пропуск или новый шаг.
                        waiting =
                          !complete &&
                          e.beats.some(
                            (b) => beats.indexOf(b) < reach && !done.has(b.id),
                          );
                      return (
                        <li key={e.id}>
                          <button
                            type="button"
                            disabled={start > reach}
                            aria-current={i === chapter ? "step" : undefined}
                            onClick={() => {
                              const open = e.beats.find(
                                (b) =>
                                  !done.has(b.id) && beats.indexOf(b) <= reach,
                              );
                              go(open ? beats.indexOf(open) : start);
                            }}
                          >
                            <span
                              data-waiting={waiting || undefined}
                              aria-label={waiting ? "Есть непройденные шаги" : undefined}
                            >
                              {complete
                                ? "✓"
                                : waiting
                                  ? "●"
                                  : String(i + 1).padStart(2, "0")}
                            </span>
                            <span>
                              {e.topic}
                              <small>
                                {start > reach
                                  ? "След пока не открыт"
                                  : waiting
                                    ? `Ждут шаги: ${e.beats.filter((b) => beats.indexOf(b) < reach && !done.has(b.id)).length}`
                                    : e.title}
                              </small>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </details>
                <p className="moin-route-note">
                  Язык помогает расследовать. Улики открываются по ходу истории.
                </p>
              </aside>
              {drillOpen ? (
                <section
                  className="moin-scene"
                  ref={scene}
                  tabIndex={-1}
                  aria-label="Повторение слов"
                >
                  <WordDrill
                    next={round}
                    welcome={save.last.day > 0 && today > save.last.day}
                    onGrade={gradeRound}
                    onClose={closeDrill}
                  />
                </section>
              ) : (
                <section
                  className="moin-scene"
                  ref={scene}
                  tabIndex={-1}
                  aria-label={`Глава ${chapter + 1}. ${beat.title}`}
                >
                  <div className="moin-scene-top">
                    <span>{episode.place}</span>
                    <span className="moin-step-nav">
                      <button
                        type="button"
                        aria-label="Предыдущий шаг"
                        disabled={at === 0}
                        onClick={() => go(at - 1)}
                      >
                        ‹
                      </button>
                      {chapterStep + 1} / {episode.beats.length}
                      <button
                        type="button"
                        aria-label="Следующий шаг"
                        disabled={at >= reach}
                        onClick={() => go(at + 1)}
                      >
                        ›
                      </button>
                    </span>
                  </div>
                  {/* Пройденные шаги закрашены, пустые ячейки до границы тоже открываются;
                      будущие закрыты. */}
                  <ol className="moin-steps" aria-label="Шаги главы">
                    {episode.beats.map((b, i) => {
                      const index = chapterStart + i;
                      return (
                        <li key={b.id}>
                          <button
                            type="button"
                            aria-label={`Шаг ${i + 1}: ${b.title}${done.has(b.id) ? "" : index < reach ? " — ещё не пройден" : ""}`}
                            aria-current={index === at ? "step" : undefined}
                            data-done={done.has(b.id) || undefined}
                            disabled={index > reach}
                            onClick={() => go(index)}
                          />
                        </li>
                      );
                    })}
                  </ol>
                  <div className="moin-chapter-title">
                    Глава {chapter + 1} · {episode.title}
                  </div>
                  {/* Глава нового сюжета — один день до Kieler Woche. */}
                  {episode.day && (
                    <div className="moin-day">
                      <b lang="de">{episode.day.de}</b> · {episode.day.ru}
                    </div>
                  )}
                  <h2>{beat.title}</h2>
                  <div className="moin-language-tools">
                    <label>
                      <input
                        type="checkbox"
                        checked={save.support}
                        onChange={(e) =>
                          setSave((s) => ({ ...s, support: e.target.checked }))
                        }
                      />{" "}
                      Переводы рядом
                    </label>
                    <span>
                      {newPhrases.length
                        ? `Новых выражений: ${newPhrases.length}`
                        : "Знакомый язык в новой ситуации"}
                    </span>
                  </div>
                  <div className="moin-narrative">
                    {beat.story.map((p, i) => (
                      <p key={i}>{rich(p)}</p>
                    ))}
                  </div>
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
                        <PlayButton src={phraseAudio(phrases[phrase])} />
                      </strong>
                      <div>
                        {phrases[phrase].ru}
                        {phrases[phrase].pl && (
                          <>
                            {" "}· мн. ч. <span lang="de">die {phrases[phrase].pl}</span>
                          </>
                        )}
                      </div>
                      <small>{phrases[phrase].note}</small>
                      {mnemonic(phrases[phrase].de) && (
                        <span className="moin-hook">💡 {mnemonic(phrases[phrase].de)}</span>
                      )}
                    </aside>
                  )}
                  {beat.source && (
                    <div className="moin-source">
                      <div className="kicker">{beat.source.title}</div>
                      {beat.source.lines.map((l, i) => (
                        <p key={i}>{rich(l)}</p>
                      ))}
                    </div>
                  )}
                  <StoryTurn
                    key={beat.id}
                    beat={beat}
                    value={
                      save.drafts[beat.id] ?? initialAnswer(beat.challenge)
                    }
                    solved={solved}
                    seenRules={rulesBefore(beats, at)}
                    quiet={save.quiet}
                    onQuiet={(quiet) => setSave((s) => ({ ...s, quiet }))}
                    onSkip={skip}
                    rich={rich}
                    onChange={(v) =>
                      setSave((s) => ({
                        ...s,
                        drafts: { ...s.drafts, [beat.id]: v },
                      }))
                    }
                    onWin={() =>
                      setSave((s) => {
                        if (s.done.includes(beat.id)) return s;
                        const done = [...s.done, beat.id];
                        return {
                          ...s,
                          done,
                          skipped: s.skipped.filter((id) => id !== beat.id),
                          cards: remember(
                            s.cards,
                            stepWords(beat, a1Words, phrases),
                            done.length,
                            dayNumber(),
                          ),
                        };
                      })
                    }
                    onSlip={(word) =>
                      (wordInfo(word) || LOCKS[word]) &&
                      setSave((s) => ({
                        ...s,
                        cards: slip(s.cards, word, s.done.length, dayNumber()),
                      }))
                    }
                    onMiss={() =>
                      setSave((s) => ({
                        ...s,
                        weak: {
                          ...s.weak,
                          ...Object.fromEntries(
                            (beat.practice ?? []).map((id) => [
                              id,
                              (s.weak[id] ?? 0) + 1,
                            ]),
                          ),
                        },
                      }))
                    }
                  />
                  {solved &&
                    chapterStep === episode.beats.length - 1 &&
                    reviewItems(episode, save.weak).length > 0 && (
                      <ChapterReview
                        key={episode.id}
                        items={reviewItems(episode, save.weak)}
                        onRight={(id) =>
                          setSave((s) => {
                            const { [id]: _, ...weak } = s.weak;
                            return { ...s, weak };
                          })
                        }
                      />
                    )}
                  {solved && (
                    <div className="moin-next">
                      {at < beats.length - 1 ? (
                        <button
                          type="button"
                          className="primary"
                          onClick={() => go(at + 1)}
                        >
                          {chapterStep === episode.beats.length - 1
                            ? "Следующая глава →"
                            : "Продолжить историю →"}
                        </button>
                      ) : (
                        <div className="moin-ending">
                          <div className="kicker">Moin снова на месте</div>
                          <h3>Дело раскрыто. Немецкий остался с вами.</h3>
                          <p>
                            Вы прошли 12 тем A1 в одной истории. Это игровой
                            прогресс; для подготовки к экзамену продолжайте
                            практиковать аудирование, письмо и разговор в курсе.
                          </p>
                          <a href="#/a1">Вернуться к курсу A1 →</a>
                        </div>
                      )}
                    </div>
                  )}
                  <details className="moin-rule">
                    <summary>Языковой фокус главы</summary>
                    <p>{episode.grammar}</p>
                    <p>
                      Новые выражения показаны с переводом при первом появлении.
                      Знакомые возвращаются по-немецки; нажмите на них или
                      включите «Переводы рядом».
                    </p>
                  </details>
                </section>
              )}
              {notebook && (
                <aside className="moin-notebook">
                  <div className="kicker">Блокнот детектива</div>
                  <h2>Только проверенные факты</h2>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => setNotebook(false)}
                  >
                    Закрыть блокнот
                  </button>
                  {clues.length ? (
                    <ol>
                      {clues.map((b) => (
                        <li key={b.id}>
                          <h3>{b.clue!.title}</h3>
                          <p>{b.clue!.text}</p>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p>
                      Первые улики появятся к концу главы. Имя рядом с пропажей
                      — ещё не доказательство.
                    </p>
                  )}
                  {rulesBefore(beats, at + 1).length > 0 && (
                    <section className="moin-notebook-rules">
                      <h3>Правила</h3>
                      {rulesBefore(beats, at + 1).map((id) => (
                        <RuleCard key={id} id={id} open={false} />
                      ))}
                    </section>
                  )}
                  <p className="moin-route-note">
                    Знакомых выражений в рассказе: {known.size}. Это число
                    встреченных фраз, не оценка знания A1.
                  </p>
                  <p className="moin-route-note">
                    Слов встречено: {stats.met}, повторено: {stats.returned},
                    закреплено: {stats.firm}. Фраз замков повторено:{" "}
                    {stats.phrases} из {Object.keys(LOCKS).length}. Это счётчик
                    повторений, а не проверка владения.
                  </p>
                </aside>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

function StoryTurn({
  beat,
  value,
  solved,
  seenRules,
  onChange,
  onWin,
  onMiss,
  onSlip,
  quiet,
  onQuiet,
  onSkip,
  rich,
}: {
  beat: Beat;
  value: Answer;
  solved: boolean;
  seenRules: string[];
  onChange: (v: Answer) => void;
  onWin: () => void;
  onMiss: () => void;
  onSlip: (word: string) => void;
  quiet: boolean;
  onQuiet: (quiet: boolean) => void;
  onSkip: () => void;
  rich: (s: string) => React.ReactNode;
}) {
  const [checked, setChecked] = useState(false),
    [hint, setHint] = useState(false),
    [script, setScript] = useState(false),
    [audioError, setAudioError] = useState(false),
    [ruleOpen, setRuleOpen] = useState(false),
    [attempts, setAttempts] = useState(0);
  const c = beat.challenge;
  // Новое правило открыто перед игрой. Остальные ждут под ней: после ошибки они
  // раскрываются там, где смотрит игрок, и не сдвигают само задание.
  const rules = stepRules[beat.id] ?? [];
  const firstRule = solved
    ? undefined
    : rules.find((id) => !seenRules.includes(id));
  const correct = isCorrect(c, value);
  // В старом сохранении шаг мог быть другой игрой: показываем готовый ответ.
  const shown = solved && !correct ? solution(c) : value;
  const disabled = solved;
  function change(v: Answer) {
    setChecked(false);
    onChange(v);
  }
  function check() {
    setChecked(true);
    setAttempts((n) => n + 1);
    if (correct) return onWin();
    onMiss();
    setRuleOpen(true);
    if (c.kind === "write") wrongAnswers(c, value).forEach(onSlip);
  }
  // Где нужно говорить, можно ответить письменно или отложить шаг: например, в офисе.
  const voiced = c.kind === "speak" || c.kind === "oral";
  const game = {
    value: shown,
    seed: beat.id,
    disabled,
    checked,
    attempts,
    quiet,
    change,
    win: onWin,
    miss(word?: string) {
      setRuleOpen(true);
      if (word) onSlip(word);
      else onMiss();
    },
  };
  return (
    <div className="moin-turn">
      {beat.audio && (
        <div className="moin-recording">
          <div className="kicker">Голосовое сообщение · OmniVoice</div>
          <audio
            controls
            preload="none"
            src={`${import.meta.env.BASE_URL}story-audio/${beat.audio.file}.m4a`}
            onPlay={stopAudio}
            onError={() => setAudioError(true)}
            aria-label="Прослушать сообщение"
          />
          {audioError && (
            <p role="status">
              Запись не загрузилась. Откройте текст сообщения, чтобы продолжить.
            </p>
          )}
          <button
            type="button"
            className="link-button"
            aria-expanded={script}
            onClick={() => setScript(!script)}
          >
            {script ? "Скрыть текст сообщения" : "Открыть текст сообщения"}
          </button>
          {script && (
            <div>
              <p lang="de">{beat.audio.text}</p>
              <p>{beat.audio.ru}</p>
            </div>
          )}
        </div>
      )}
      {beat.voices && <VoiceLines lines={beat.voices} />}
      <div className="kicker moin-game-name">{GAME_NAMES[c.kind]}</div>
      <h3>{beat.prompt}</h3>
      {firstRule && <RuleCard id={firstRule} open />}
      {voiced && !solved && (
        <div className="moin-quiet">
          <label>
            <input
              type="checkbox"
              checked={quiet}
              onChange={(e) => onQuiet(e.target.checked)}
            />{" "}
            Не могу говорить вслух — отвечу письменно
          </label>
          <button type="button" className="link-button" onClick={onSkip}>
            Пропустить шаг
          </button>
          <small>
            Пропущенный шаг останется пустой ячейкой, к нему можно вернуться.
          </small>
        </div>
      )}
      <ChallengeView c={c} game={game} beatId={beat.id} rich={rich} />
      {!solved && (
        <div className="moin-turn-actions">
          {!AUTOMATIC.includes(c.kind) && (
            <button type="button" className="primary" onClick={check}>
              Проверить действие
            </button>
          )}
          <button
            type="button"
            className="link-button"
            aria-expanded={hint}
            onClick={() => setHint(!hint)}
          >
            {hint ? "Скрыть подсказку" : "Нужна подсказка"}
          </button>
        </div>
      )}
      {hint && <p className="moin-hint">{beat.hint}</p>}
      {(checked || solved) && (
        <div
          className={`moin-feedback ${solved ? "is-correct" : ""}`}
          role="status"
        >
          {solved ? (
            <>
              <strong>Получилось.</strong>
              <p>{rich(beat.success)}</p>
              {beat.clue && (
                <p className="moin-clue-earned">
                  + В блокнот: {beat.clue.title}
                </p>
              )}
            </>
          ) : (
            <>
              <strong>Попробуйте ещё раз.</strong>
              <p>{mistake(c, shown, beat.hint)}</p>
            </>
          )}
        </div>
      )}
      {rules
        .filter((id) => id !== firstRule)
        .map((id) => (
          <RuleCard key={id} id={id} open={ruleOpen} />
        ))}
    </div>
  );
}

import { Fragment, useEffect, useRef, useState } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { stopAudio, useMobile } from "../hooks";
import { shuffle } from "../lib/shuffle";
import { PlayButton, plural } from "../markup";
import { storyAudio } from "./audio";
import { beats, episodes, phrases } from "./data";
import {
  Calendar,
  ChapterReview,
  Chat,
  ClockGame,
  Coins,
  Gaps,
  Memory,
  Pairs,
  Sort,
  Spot,
  Verdict,
  VoiceLines,
  Walk,
  Write,
} from "./games";
import {
  beatPhrases,
  initialAnswer,
  isCorrect,
  knownBefore,
  mistake,
  normalizeSave,
  reviewItems,
  solution,
  STORY_KEY,
} from "./logic";
import type { Answer, Beat, Challenge, StorySave } from "./types";
import "./story.css";

const GAME_NAMES: Record<Challenge["kind"], string> = {
  choice: "Вывод",
  order: "Сборка фразы",
  match: "Пары",
  quantity: "Заказ",
  code: "Набор номера",
  write: "Запись",
  chat: "Разговор",
  verdict: "Штамп",
  gaps: "Записка с пропусками",
  sort: "Раскладка",
  spot: "Улика в тексте",
  memory: "Карточки",
  clock: "Часы",
  route: "Прогулка",
  coins: "Касса",
  calendar: "Календарь",
};
/** Разговор и карточки завершаются сами: кнопка проверки там не нужна. */
const AUTOMATIC: Challenge["kind"][] = ["chat", "memory"];

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
  const scene = useRef<HTMLElement>(null);
  const beat = beats[save.cursor];
  const episode = episodes.find((e) => e.beats.some((b) => b.id === beat.id))!;
  const chapter = episodes.indexOf(episode);
  const chapterStart = beats.indexOf(episode.beats[0]);
  const chapterStep = save.cursor - chapterStart;
  const known = knownBefore(beats, save.cursor);
  const newPhrases = beatPhrases(beat).filter((id) => !known.has(id));
  const finished = save.completed === beats.length;
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
  function go(cursor: number) {
    stopAudio();
    setPhrase(null);
    setSave((s) => ({ ...s, cursor }));
    requestAnimationFrame(() => {
      scene.current?.focus();
      scene.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
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
  const clues = beats.slice(0, save.completed).filter((b) => b.clue);
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
                <span>60 действий</span>
                <span>Без таймера</span>
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
                  Блокнот и ответы сохраняются в этом браузере. Игра повторяет
                  темы A1; письмо и разговор практикуйте также в уроках.
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
              <button
                type="button"
                className="moin-notebook-button"
                aria-expanded={notebook}
                onClick={() => setNotebook(!notebook)}
              >
                Блокнот · {plural(clues.length, ["улика", "улики", "улик"])}
              </button>
            </header>
            <div className="moin-progress">
              <span>
                {save.completed} / {beats.length} действий
              </span>
              <progress
                value={save.completed}
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
                        done = save.completed >= start + e.beats.length;
                      return (
                        <li key={e.id}>
                          <button
                            type="button"
                            disabled={start > save.completed}
                            aria-current={i === chapter ? "step" : undefined}
                            onClick={() => go(start)}
                          >
                            <span>
                              {done ? "✓" : String(i + 1).padStart(2, "0")}
                            </span>
                            <span>
                              {e.topic}
                              <small>
                                {start > save.completed
                                  ? "След пока не открыт"
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
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setResetPrompt(!resetPrompt)}
                >
                  Начать дело заново
                </button>
                {resetPrompt && (
                  <div className="moin-reset">
                    <p>
                      Сбросить только эту историю? Прогресс уроков сохранится.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        stopAudio();
                        setSave(normalizeSave(null, beats));
                        setPhrase(null);
                        setResetPrompt(false);
                        setNotebook(false);
                      }}
                    >
                      Да, начать заново
                    </button>
                    <button type="button" onClick={() => setResetPrompt(false)}>
                      Отмена
                    </button>
                  </div>
                )}
              </aside>
              <section
                className="moin-scene"
                ref={scene}
                tabIndex={-1}
                aria-label={`Глава ${chapter + 1}. ${beat.title}`}
              >
                <div className="moin-scene-top">
                  <span>{episode.place}</span>
                  <span>
                    {chapterStep + 1} / {episode.beats.length}
                  </span>
                </div>
                <div className="moin-chapter-title">
                  Глава {chapter + 1} · {episode.title}
                </div>
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
                      <PlayButton src={storyAudio(phrases[phrase].de)} />
                    </strong>
                    <div>{phrases[phrase].ru}</div>
                    <small>{phrases[phrase].note}</small>
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
                  value={save.drafts[beat.id] ?? initialAnswer(beat.challenge)}
                  solved={save.completed > save.cursor}
                  rich={rich}
                  onChange={(v) =>
                    setSave((s) => ({
                      ...s,
                      drafts: { ...s.drafts, [beat.id]: v },
                    }))
                  }
                  onWin={() =>
                    setSave((s) => ({
                      ...s,
                      completed: Math.max(s.completed, s.cursor + 1),
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
                {save.completed > save.cursor &&
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
                {save.completed > save.cursor && (
                  <div className="moin-next">
                    {save.cursor < beats.length - 1 ? (
                      <button
                        type="button"
                        className="primary"
                        onClick={() => go(save.cursor + 1)}
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
                  <p className="moin-route-note">
                    Знакомых выражений в рассказе: {known.size}. Это число
                    встреченных фраз, не оценка знания A1.
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
  onChange,
  onWin,
  onMiss,
  rich,
}: {
  beat: Beat;
  value: Answer;
  solved: boolean;
  onChange: (v: Answer) => void;
  onWin: () => void;
  onMiss: () => void;
  rich: (s: string) => React.ReactNode;
}) {
  const [checked, setChecked] = useState(false),
    [hint, setHint] = useState(false),
    [script, setScript] = useState(false),
    [audioError, setAudioError] = useState(false);
  const c = beat.challenge;
  const correct = isCorrect(c, value);
  // В старом сохранении шаг мог быть другой игрой: показываем готовый ответ.
  const shown = solved && !correct ? solution(c) : value;
  const list = Array.isArray(shown) ? shown : [];
  const record =
    typeof shown === "object" && !Array.isArray(shown) ? shown : {};
  const disabled = solved;
  function change(v: Answer) {
    setChecked(false);
    onChange(v);
  }
  function check() {
    setChecked(true);
    if (correct) onWin();
    else onMiss();
  }
  const game = {
    value: shown,
    seed: beat.id,
    disabled,
    checked,
    change,
    win: onWin,
    miss: onMiss,
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
      {c.kind === "match" && <Pairs c={c} {...game} />}
      {c.kind === "write" && <Write c={c} {...game} />}
      {c.kind === "chat" && <Chat c={c} {...game} />}
      {c.kind === "verdict" && <Verdict c={c} {...game} />}
      {c.kind === "gaps" && <Gaps c={c} {...game} />}
      {c.kind === "sort" && <Sort c={c} {...game} />}
      {c.kind === "spot" && <Spot c={c} {...game} />}
      {c.kind === "memory" && <Memory c={c} {...game} />}
      {c.kind === "clock" && <ClockGame c={c} {...game} />}
      {c.kind === "route" && <Walk c={c} {...game} />}
      {c.kind === "coins" && <Coins c={c} {...game} />}
      {c.kind === "calendar" && <Calendar c={c} {...game} />}
      {c.kind === "choice" && (
        <fieldset className="moin-choices" disabled={disabled}>
          <legend className="moin-sr">Варианты ответа</legend>
          {shuffle(c.options, beat.id).map((o, i) => (
            <label key={o.id} className={shown === o.id ? "is-selected" : ""}>
              <input
                type="radio"
                name={beat.id}
                value={o.id}
                checked={shown === o.id}
                onChange={() => change(o.id)}
              />
              <span className="moin-option-n">
                {String.fromCharCode(65 + i)}
              </span>
              <span>{o.text}</span>
            </label>
          ))}
        </fieldset>
      )}
      {c.kind === "order" && (
        <div className="moin-order">
          <div
            className="moin-sentence"
            aria-label="Собранная фраза"
            aria-live="polite"
          >
            {list.length ? (
              list.map((t, i) => (
                <button
                  type="button"
                  disabled={disabled}
                  key={i}
                  onClick={() => change(list.filter((_, j) => j !== i))}
                  aria-label={`Убрать ${t}`}
                >
                  {t} <span>×</span>
                </button>
              ))
            ) : (
              <span>Нажимайте на фрагменты ниже</span>
            )}
          </div>
          <div className="moin-tiles">
            {c.tiles.map((t, i) => {
              const used =
                list.filter((x) => x === t).length >=
                c.tiles.slice(0, i + 1).filter((x) => x === t).length;
              return (
                <button
                  type="button"
                  key={i}
                  disabled={disabled || used}
                  onClick={() => change([...list, t])}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="link-button"
            disabled={disabled || !list.length}
            onClick={() => change([])}
          >
            Очистить фразу
          </button>
        </div>
      )}
      {c.kind === "quantity" && (
        <div className="moin-quantities">
          {c.items.map((i) => (
            <div key={i.id}>
              <span lang="de">{i.text}</span>
              <div>
                <button
                  type="button"
                  aria-label={`Уменьшить ${i.text}`}
                  disabled={disabled || Number(record[i.id] ?? 0) <= 0}
                  onClick={() =>
                    change({ ...record, [i.id]: Number(record[i.id] ?? 0) - 1 })
                  }
                >
                  −
                </button>
                <output aria-label={`Количество ${i.text}`}>
                  {record[i.id] ?? 0}
                </output>
                <button
                  type="button"
                  aria-label={`Добавить ${i.text}`}
                  disabled={disabled || Number(record[i.id] ?? 0) >= i.max}
                  onClick={() =>
                    change({ ...record, [i.id]: Number(record[i.id] ?? 0) + 1 })
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {c.kind === "code" && (
        <div className="moin-dial">
          <label>
            {c.length > 2 ? "Номер телефона" : "Номер ячейки"}
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              disabled={disabled}
              value={typeof shown === "string" ? shown : ""}
              onChange={(e) =>
                change(e.target.value.replace(/\D/g, "").slice(0, c.length))
              }
              maxLength={c.length}
            />
          </label>
          <div className="moin-keypad">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((n) => (
              <button
                type="button"
                key={n}
                disabled={disabled || String(shown).length >= c.length}
                onClick={() => change(String(shown) + n)}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              disabled={disabled}
              aria-label="Удалить последнюю цифру"
              onClick={() => change(String(shown).slice(0, -1))}
            >
              ⌫
            </button>
          </div>
        </div>
      )}
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
    </div>
  );
}

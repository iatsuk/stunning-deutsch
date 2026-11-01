import { useMemo, useRef, useState } from "react";
import type { Exercise, SpyItem, Topic, Word } from "../content";
import { play, useProgress } from "../hooks";
import { plain } from "../lib/german";
import { scramble, shuffle } from "../lib/shuffle";
import { De, GENDER_LABEL, PlayButton, Text, withoutArticle } from "../markup";
import { judge, normalize, orderAccepted, UMLAUTS } from "./logic";

type Tab = "exercises" | "spy" | "articles" | "cards";

export function Trainer({ topic }: { topic: Topic }) {
  const [tab, setTab] = useState<Tab>("exercises");
  const words = useMemo(() => Object.values(topic.words).flatMap((group) => group.items), [topic]);
  const nouns = words.filter((word) => word.gender && word.gender !== "pl");
  const progress = useProgress();
  const solved = progress.solved(topic.id);
  const tabs: { id: Tab; label: string; count: string }[] = [
    { id: "exercises", label: "Упражнения", count: `${solved}/${topic.exercises.length}` },
    ...(topic.spy.length >= 4 ? [{ id: "spy" as const, label: "Поиск ошибки", count: String(topic.spy.length) }] : []),
    { id: "articles", label: "Артикли", count: String(nouns.length) },
    { id: "cards", label: "Карточки", count: String(words.length) },
  ];
  return (
    <div className="trainer">
      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            <span>{t.count}</span>
          </button>
        ))}
      </div>
      {tab === "exercises" && <Exercises topic={topic} />}
      {tab === "spy" && <SpyGame items={topic.spy} />}
      {tab === "articles" && <ArticleQuiz nouns={nouns} />}
      {tab === "cards" && <Flashcards words={words} />}
    </div>
  );
}

// ───────────────────────────── упражнения ─────────────────────────────

function Exercises({ topic }: { topic: Topic }) {
  const progress = useProgress();
  const solved = progress.solved(topic.id);
  return (
    <div className="exercises">
      <div className="exercises-head">
        <div className="meter" aria-label={`Решено ${solved} из ${topic.exercises.length}`}>
          <i style={{ width: `${(solved / Math.max(1, topic.exercises.length)) * 100}%` }} />
        </div>
        <span>
          Решено {solved} из {topic.exercises.length}
        </span>
        {solved > 0 && (
          <button type="button" className="link-button" onClick={() => progress.reset(topic.id)}>
            Начать заново
          </button>
        )}
      </div>
      <ol className="exercise-list">
        {topic.exercises.map((exercise, i) => (
          <li key={exercise.id}>
            <ExerciseCard
              exercise={exercise}
              number={i + 1}
              solved={progress.isSolved(topic.id, exercise.id)}
              onSolve={() => progress.mark(topic.id, exercise.id)}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

const TYPE_LABEL = { choice: "Выберите", gap: "Вставьте", order: "Соберите фразу" };

function ExerciseCard({
  exercise,
  number,
  solved,
  onSolve,
}: {
  exercise: Exercise;
  number: number;
  solved: boolean;
  onSolve: () => void;
}) {
  return (
    <article className="exercise" data-solved={solved || undefined}>
      <header>
        <span className="exercise-number">{String(number).padStart(2, "0")}</span>
        <span className="exercise-type">{TYPE_LABEL[exercise.type]}</span>
        {solved && <span className="exercise-done">✓ решено</span>}
      </header>
      {exercise.type === "choice" && <Choice exercise={exercise} solved={solved} onSolve={onSolve} />}
      {exercise.type === "gap" && <Gap exercise={exercise} solved={solved} onSolve={onSolve} />}
      {exercise.type === "order" && <Order exercise={exercise} solved={solved} onSolve={onSolve} />}
      {solved && (exercise.why || exercise.audio) && (
        <footer className="exercise-why">
          <PlayButton src={exercise.audio} />
          {exercise.why && <Text text={exercise.why} />}
        </footer>
      )}
    </article>
  );
}

/** Немецкая строка с ___ или русский вопрос. */
function Prompt({ q, fill }: { q: string; fill?: string }) {
  if (!q.includes("___")) return <p className="exercise-q exercise-q-ru"><Text text={q} /></p>;
  const [before, after] = q.split("___");
  return (
    <p className="exercise-q">
      <De text={before} />
      <span className="blank" data-filled={fill ? true : undefined}>
        {fill ? <De text={fill} /> : " "}
      </span>
      <De text={after} />
    </p>
  );
}

function Choice({ exercise, solved, onSolve }: { exercise: Extract<Exercise, { type: "choice" }>; solved: boolean; onSolve: () => void }) {
  const [wrong, setWrong] = useState<number[]>([]);
  // В YAML верный вариант часто стоит на одном месте; ответ не должен угадываться по позиции.
  const order = useMemo(() => shuffle(exercise.options.map((_, i) => i), exercise.id), [exercise]);
  return (
    <>
      <Prompt q={exercise.q} fill={solved ? exercise.options[exercise.answer] : undefined} />
      {exercise.ru && <p className="exercise-ru">{exercise.ru}</p>}
      <div className="option-row">
        {order.map((i) => (
          <button
            key={i}
            type="button"
            className="option"
            data-state={solved && i === exercise.answer ? "right" : wrong.includes(i) ? "wrong" : undefined}
            disabled={solved}
            onClick={() => {
              if (i === exercise.answer) {
                onSolve();
                play(exercise.audio);
              } else setWrong((w) => [...w, i]);
            }}
          >
            <De text={exercise.options[i]} />
          </button>
        ))}
      </div>
    </>
  );
}

const VERDICT = {
  case: "Почти — проверьте заглавные и строчные буквы.",
  umlaut: "Почти — нужна буква с умлаутом или ß.",
  wrong: "Пока не то. Попробуйте ещё раз.",
};

function Gap({ exercise, solved, onSolve }: { exercise: Extract<Exercise, { type: "gap" }>; solved: boolean; onSolve: () => void }) {
  const parts = exercise.q.split("___");
  const [values, setValues] = useState<string[]>(() => exercise.answer.map(() => ""));
  const [verdict, setVerdict] = useState<keyof typeof VERDICT | null>(null);
  const [revealed, setRevealed] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const active = useRef(0);

  const check = () => {
    const results = values.map((value, i) => judge(value, exercise.answer[i].split("|")));
    if (results.every((r) => r === "right")) {
      setVerdict(null);
      onSolve();
      play(exercise.audio);
    } else setVerdict(results.find((r) => r !== "right") as keyof typeof VERDICT);
  };

  const insert = (char: string) => {
    const i = active.current;
    const input = inputs.current[i];
    if (!input) return;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    const next = input.value.slice(0, start) + char + input.value.slice(end);
    setValues((v) => v.map((x, j) => (j === i ? next : x)));
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + 1, start + 1);
    });
  };

  if (solved || revealed) {
    return (
      <>
        <p className="exercise-q">
          {parts.map((part, i) => (
            <span key={i}>
              <De text={part} />
              {i < exercise.answer.length && (
                <span className="blank" data-filled>
                  <De text={exercise.answer[i].split("|")[0]} />
                </span>
              )}
            </span>
          ))}
        </p>
        {exercise.ru && <p className="exercise-ru">{exercise.ru}</p>}
        {revealed && !solved && (
          <p className="exercise-verdict">
            Правильный ответ показан. Наберите его сами, чтобы засчитать.{" "}
            <button type="button" className="link-button" onClick={() => setRevealed(false)}>
              Попробовать
            </button>
          </p>
        )}
      </>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        check();
      }}
    >
      <p className="exercise-q">
        {parts.map((part, i) => (
          <span key={i}>
            <De text={part} />
            {i < exercise.answer.length && (
              <input
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                className="gap-input"
                lang="de"
                value={values[i]}
                size={Math.max(4, exercise.answer[i].split("|")[0].length + 1)}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label={`Пропуск ${i + 1}`}
                onFocus={() => (active.current = i)}
                onChange={(e) => {
                  setVerdict(null);
                  setValues((v) => v.map((x, j) => (j === i ? e.target.value : x)));
                }}
              />
            )}
          </span>
        ))}
        {exercise.hint && <span className="gap-hint">({exercise.hint})</span>}
      </p>
      {exercise.ru && <p className="exercise-ru">{exercise.ru}</p>}
      <div className="gap-tools">
        <div className="umlauts" aria-label="Буквы с умлаутом">
          {UMLAUTS.map((char) => (
            <button key={char} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => insert(char)}>
              {char}
            </button>
          ))}
        </div>
        <button type="submit" className="primary" disabled={values.every((v) => !v.trim())}>
          Проверить
        </button>
        <button type="button" className="link-button" onClick={() => setRevealed(true)}>
          Показать ответ
        </button>
      </div>
      {verdict && <p className="exercise-verdict" data-verdict={verdict}>{VERDICT[verdict]}</p>}
    </form>
  );
}

/** Служебные слова, которые в начале предложения пишутся с большой буквы только из-за позиции. */
const LOWER_FIRST = new Set(
  (
    "ich du er es wir ihr der die das den dem des ein eine einen einem einer kein keine keinen mein meine dein deine " +
    "sein seine unser unsere euer eure wer wie wo woher wohin wann was warum welche welcher welches wie viel " +
    "am im um in an auf aus bei mit nach von zu zum zur heute morgen gestern jetzt dann hier dort da ja nein und aber " +
    "bitte danke gern leider hallo man es gibt nicht auch schon noch oft immer"
  ).split(" "),
);

/**
 * Плитки для сборки фразы. Первое слово пишется со строчной, если это служебное
 * слово или если оно стоит со строчной в другом верном варианте, — иначе
 * заглавная буква подсказала бы, с чего начинать.
 */
function orderTiles(exercise: Extract<Exercise, { type: "order" }>) {
  const words = normalize(exercise.de).split(" ");
  const first = words[0];
  const lower = first.charAt(0).toLowerCase() + first.slice(1);
  const elsewhere = (exercise.also ?? []).some((s) => normalize(s).split(" ").slice(1).includes(lower));
  if (first !== lower && (LOWER_FIRST.has(lower) || elsewhere)) words[0] = lower;
  return words;
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

function Order({ exercise, solved, onSolve }: { exercise: Extract<Exercise, { type: "order" }>; solved: boolean; onSolve: () => void }) {
  const punct = /[.!?]+$/.exec(plain(exercise.de))?.[0] ?? "";
  const tiles = useMemo(
    () => scramble(orderTiles(exercise).map((text, i) => ({ id: i, text })), exercise.id),
    [exercise],
  );
  const [picked, setPicked] = useState<number[]>([]);
  const [wrong, setWrong] = useState(false);

  if (solved) {
    return (
      <>
        <p className="exercise-q exercise-q-ru">{exercise.ru}</p>
        <p className="order-line" data-state="right">
          <De text={exercise.de} />
        </p>
      </>
    );
  }

  const pick = (id: number) => {
    const next = [...picked, id];
    setPicked(next);
    setWrong(false);
    if (next.length === tiles.length) {
      const words = next.map((i) => tiles.find((t) => t.id === i)!.text);
      if (orderAccepted(words, [exercise.de, ...(exercise.also ?? [])])) {
        onSolve();
        play(exercise.audio);
      } else setWrong(true);
    }
  };

  return (
    <>
      <p className="exercise-q exercise-q-ru">{exercise.ru}</p>
      <div className="order-line" data-state={wrong ? "wrong" : undefined} aria-live="polite">
        {picked.length === 0 && <span className="order-placeholder">Нажимайте на слова по порядку</span>}
        {picked.map((id, i) => (
          <button key={id} type="button" className="order-tile" onClick={() => {
            setPicked(picked.filter((p) => p !== id));
            setWrong(false);
          }}>
            <De text={i === 0 ? capitalize(tiles.find((t) => t.id === id)!.text) : tiles.find((t) => t.id === id)!.text} />
            {i === picked.length - 1 && picked.length === tiles.length ? punct : ""}
          </button>
        ))}
      </div>
      <div className="order-pool">
        {tiles.map((tile) => (
          <button key={tile.id} type="button" className="order-tile" disabled={picked.includes(tile.id)} onClick={() => pick(tile.id)}>
            <De text={tile.text} />
          </button>
        ))}
      </div>
      {wrong && (
        <p className="exercise-verdict" data-verdict="wrong">
          Порядок не тот. Нажмите на слово в строке, чтобы вернуть его.
        </p>
      )}
    </>
  );
}

// ───────────────────────────── артикли ─────────────────────────────

function ArticleQuiz({ nouns }: { nouns: Word[] }) {
  const [round, setRound] = useState(0);
  const order = useMemo(() => shuffle(nouns, `articles-${round}`), [nouns, round]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  if (!nouns.length) return <p className="trainer-empty">В этой теме нет существительных.</p>;
  if (index >= order.length) {
    return (
      <div className="quiz-done">
        <p>
          Верно {score.right} из {score.total}.
          {score.right === score.total ? " Все артикли на месте!" : " Ошибки — повод пройти ещё круг."}
        </p>
        <button
          type="button"
          className="primary"
          onClick={() => {
            setRound(round + 1);
            setIndex(0);
            setAnswer(null);
            setScore({ right: 0, total: 0 });
          }}
        >
          Ещё круг
        </button>
      </div>
    );
  }

  const word = order[index];
  const correct = GENDER_LABEL[word.gender!];
  const next = () => {
    setAnswer(null);
    setIndex(index + 1);
  };
  return (
    <div className="quiz">
      <div className="quiz-count">
        {index + 1} / {order.length} · верно {score.right}
      </div>
      <div className="quiz-word" data-gender={answer ? word.gender : undefined}>
        <span className="quiz-article">{answer ? correct : "___"}</span>
        <De text={withoutArticle(word.de)} />
      </div>
      <div className="quiz-ru">{word.ru}</div>
      <div className="option-row quiz-options">
        {(["der", "die", "das"] as const).map((article) => (
          <button
            key={article}
            type="button"
            className="option"
            data-article={article}
            data-state={answer ? (article === correct ? "right" : article === answer ? "wrong" : undefined) : undefined}
            disabled={Boolean(answer)}
            onClick={() => {
              setAnswer(article);
              setScore((s) => ({ right: s.right + (article === correct ? 1 : 0), total: s.total + 1 }));
              play(word.audio);
              if (article === correct) window.setTimeout(next, 900);
            }}
          >
            {article}
          </button>
        ))}
      </div>
      {answer && answer !== correct && (
        <div className="quiz-feedback">
          <span>
            Правильно: <De text={word.de} />
            {word.plural && (
              <>
                {" "}— <De text={`die ${word.plural}`} />
              </>
            )}
          </span>
          <button type="button" className="primary" onClick={next}>
            Дальше
          </button>
        </div>
      )}
    </div>
  );
}

// ───────────────────────────── карточки ─────────────────────────────

function Flashcards({ words }: { words: Word[] }) {
  const [direction, setDirection] = useState<"de" | "ru">("de");
  const [deck, setDeck] = useState(() => shuffle(words.map((_, i) => i), "cards"));
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (!deck.length) {
    return (
      <div className="quiz-done">
        <p>Все {words.length} карточек отмечены как знакомые.</p>
        <button
          type="button"
          className="primary"
          onClick={() => {
            setDeck(shuffle(words.map((_, i) => i), `cards-${Date.now()}`));
            setKnown(0);
          }}
        >
          Начать заново
        </button>
      </div>
    );
  }

  const word = words[deck[0]];
  const front = direction === "de";
  const advance = (keep: boolean) => {
    setFlipped(false);
    if (keep) setKnown(known + 1);
    setDeck(keep ? deck.slice(1) : [...deck.slice(1), deck[0]]);
  };

  return (
    <div className="cards">
      <div className="cards-tools">
        <span>
          Осталось {deck.length} · знаю {known}
        </span>
        <button type="button" className="chip-button" onClick={() => setDirection(front ? "ru" : "de")}>
          {front ? "Немецкий → русский" : "Русский → немецкий"}
        </button>
      </div>
      <button
        type="button"
        className="flashcard"
        data-flipped={flipped || undefined}
        data-gender={(flipped || front) && word.gender ? word.gender : undefined}
        onClick={() => {
          setFlipped(!flipped);
          // Звучит, когда открывается немецкая сторона.
          if (front ? flipped : !flipped) play(word.audio);
        }}
      >
        {(front ? !flipped : flipped) ? (
          <span className="flashcard-de">
            <De text={word.de} />
            {word.plural && <small><De text={`die ${word.plural}`} /></small>}
          </span>
        ) : (
          <span className="flashcard-ru">{word.ru}</span>
        )}
        <span className="flashcard-hint">{flipped ? "нажмите, чтобы перевернуть обратно" : "нажмите, чтобы перевернуть"}</span>
      </button>
      <div className="cards-actions">
        <PlayButton src={word.audio} size="md" />
        <button type="button" className="option" onClick={() => advance(false)}>
          Повторить позже
        </button>
        <button type="button" className="primary" onClick={() => advance(true)}>
          Знаю
        </button>
      </div>
    </div>
  );
}

// ───────────────────────────── поиск ошибки ─────────────────────────────

/** Авторы записок на доске клуба. Имена — типичные для северной Германии. */
const LOCALS = ["Hauke", "Frauke", "Ole", "Telse", "Sönke", "Wiebke", "Jens", "Imke", "Kai", "Merle"];

/**
 * Четыре записки, в одной ошибка из грамматики темы: глагол не на своём месте, чужое
 * окончание, пропущенная связка. Ошибка ничего не говорит о человеке: ищем её, а не виновного.
 */
function SpyGame({ items }: { items: SpyItem[] }) {
  const [round, setRound] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const order = useMemo(() => shuffle(items.map((_, i) => i), "spy"), [items]);

  const spy = items[order[round % order.length]];
  const others: string[] = [];
  for (const i of shuffle(items.map((_, k) => k), `others-${round}`)) {
    const de = items[i].de;
    if (de !== spy.de && !others.includes(de)) others.push(de);
    if (others.length === 3) break;
  }
  const names = shuffle(LOCALS, `names-${round}`).slice(0, others.length + 1);
  const lines = shuffle(
    [{ text: spy.wrong, spy: true }, ...others.map((text) => ({ text, spy: false }))],
    `seats-${round}`,
  );
  const caught = pick !== null && lines[pick].spy;

  return (
    <div className="spy">
      <div className="spy-head">
        <p>
          На доске клуба четыре записки. В одной есть ошибка: найдите её.
        </p>
        <span className="quiz-count">
          Раунд {round + 1} · найдено {score.right} из {score.total}
        </span>
      </div>
      <ol className="spy-lines">
        {lines.map((line, i) => (
          <li key={i}>
            <button
              type="button"
              className="spy-line"
              disabled={pick !== null}
              data-state={pick === null ? undefined : line.spy ? "spy" : i === pick ? "innocent" : undefined}
              onClick={() => {
                setPick(i);
                setScore((s) => ({ right: s.right + (line.spy ? 1 : 0), total: s.total + 1 }));
              }}
            >
              <span className="avatar" aria-hidden="true">
                {names[i].charAt(0)}
              </span>
              <span className="spy-name">{names[i]}</span>
              <De text={line.text} className="spy-text" />
            </button>
          </li>
        ))}
      </ol>
      {pick !== null && (
        <div className="spy-verdict" data-caught={caught || undefined}>
          <p>
            <b>{caught ? "Нашли!" : `Здесь всё правильно, у ${names[pick]} ошибки нет.`}</b>
          </p>
          <dl className="spy-compare">
            <dt>С ошибкой</dt>
            <dd>
              <De text={spy.wrong} />
            </dd>
            <dt>Правильно</dt>
            <dd>
              <De text={spy.de} />
            </dd>
          </dl>
          <p>
            <Text text={spy.why} />
          </p>
          <button
            type="button"
            className="primary"
            onClick={() => {
              setPick(null);
              setRound(round + 1);
            }}
          >
            Следующий раунд
          </button>
        </div>
      )}
    </div>
  );
}

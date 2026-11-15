import { useEffect, useRef, useState, type ReactNode } from "react";
import { say } from "../hooks";
import { PlayButton } from "../markup";
import { storyAudio, wordInfo } from "./audio";
import { Bingo, Docks, Gendered, Gull, Letters, Lock, Pairs, Write } from "./games";
import { initialAnswer, isCorrect, lockKey, wrongAnswers } from "./logic";
import type { ClozeItem, Crossword, Game, Mech, MistakeItem, PluralItem, Review, Sources, VerbItem, WhoItem } from "./review";
import { RuleCard } from "./RuleCard";
import type { Answer } from "./types";

// Повторение новой версии (A1-PLAN.md, «Повторение»): раунд из трёх игр разных механик. Сюжет не
// двигается, раунд всегда можно пропустить; ошибка возвращает единицу раньше и ничего не отнимает.

/** У каждой механики свой повод в мире истории и своя короткая задача. */
const FRAMES: Record<Mech, { title: string; task: string }> = {
  bingo: { title: "Рация хрипит", task: "Послушайте слово и закройте его на карточке." },
  gull: { title: "Чайка утащила карточки", task: "Прочитайте перевод и нажмите немецкое слово, пока чайка не долетела." },
  docks: { title: "Ящики Йенсена", task: "К какому причалу подходит слово: der, die или das?" },
  letters: { title: "Буквы рассыпались", task: "Соберите слово по буквам." },
  write: { title: "Блокнот без подсказок", task: "Напишите по-немецки. У существительных нужен артикль." },
  pairs: { title: "Карточки Элиф", task: "Соедините немецкое слово и перевод, потом проверьте." },
  lock: { title: "Замок блокнота", task: "Поверните диски, чтобы получилась фраза, и откройте замок." },
  plural: { title: "Склад Матео", task: "Выберите множественное число." },
  cloze: { title: "Стёртая реплика", task: "Вставьте слово, которое прозвучало в истории." },
  who: { title: "Кто это сказал?", task: "Послушайте реплику и выберите, кто её сказал." },
  mistake: { title: "Записка с ошибкой", task: "Нажмите на часть фразы, где ошибка." },
  verbs: { title: "Перекличка", task: "Выберите форму глагола для этого лица." },
  perfekt: { title: "Что было вчера", task: "Выберите Perfekt: haben или sein и причастие." },
  crossword: { title: "Кроссворд Нильса", task: "Впишите немецкие слова по подсказкам, потом проверьте." },
};

type Finish = (missed: string[]) => void;

/** Выбор из вариантов по очереди: ошибка отмечает единицу, верный ответ показывает разбор. */
function Steps<T extends { unit: string }>({
  items,
  seed,
  onFinish,
  render,
}: {
  items: T[];
  seed: string;
  onFinish: Finish;
  render: (item: T, step: { wrong: string[]; solved: boolean; pick: (option: string, right: boolean) => void }) => ReactNode;
}) {
  const [at, setAt] = useState(0);
  const [wrong, setWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const missed = useRef(new Set<string>());
  const item = items[at];
  function pick(option: string, right: boolean) {
    if (solved) return;
    if (right) return setSolved(true);
    missed.current.add(item.unit);
    setWrong([...wrong, option]);
  }
  function next() {
    if (at + 1 === items.length) return onFinish([...missed.current]);
    setAt(at + 1);
    setWrong([]);
    setSolved(false);
  }
  return (
    <div className="moin-play-task" key={`${seed}-${at}`}>
      <p className="moin-count">
        {at + 1} из {items.length}
      </p>
      {render(item, { wrong, solved, pick })}
      {solved && (
        <div className="moin-drill-actions">
          <button type="button" className="primary" onClick={next}>
            {at + 1 === items.length ? "Готово" : "Дальше"}
          </button>
        </div>
      )}
    </div>
  );
}

function Choices({ options, answer, wrong, solved, pick, german = true }: { options: string[]; answer: string; wrong: string[]; solved: boolean; pick: (o: string, right: boolean) => void; german?: boolean }) {
  return (
    <div className="moin-chat-replies">
      {options.map((o) => (
        <button
          type="button"
          key={o}
          lang={german ? "de" : undefined}
          disabled={wrong.includes(o) || (solved && o !== answer)}
          data-wrong={wrong.includes(o) || undefined}
          aria-pressed={solved && o === answer ? true : undefined}
          onClick={() => pick(o, o === answer)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function PluralGame({ items, seed, onFinish }: { items: PluralItem[]; seed: string; onFinish: Finish }) {
  return (
    <Steps
      items={items}
      seed={seed}
      onFinish={onFinish}
      render={(item, s) => (
        <>
          <p className="moin-play-gap" lang="de">
            <Gendered text={item.de} /> → die …?
          </p>
          <Choices options={item.options} answer={item.answer} {...s} pick={(o, right) => (s.pick(o, right), right && say(wordInfo(item.de)?.audio))} />
          {s.solved && (
            <p className="moin-play-ru" data-tone="good">
              <span lang="de">{item.de}, {item.answer}</span> — {wordInfo(item.de)?.ru}
            </p>
          )}
        </>
      )}
    />
  );
}

function ClozeGame({ items, seed, onFinish }: { items: ClozeItem[]; seed: string; onFinish: Finish }) {
  return (
    <Steps
      items={items}
      seed={seed}
      onFinish={onFinish}
      render={(item, s) => (
        <>
          <p className="moin-play-ask">{item.line.who}:</p>
          <p className="moin-play-gap" lang="de">
            {item.before}
            <span className="moin-play-blank">{s.solved ? item.answer : "___"}</span>
            {item.after}
          </p>
          <Choices options={item.options} answer={item.answer} {...s} pick={(o, right) => (s.pick(o, right), right && say(storyAudio(item.line.de, item.line.voice)))} />
          {s.solved && <p className="moin-play-ru">{item.line.ru}</p>}
        </>
      )}
    />
  );
}

function WhoGame({ items, seed, onFinish }: { items: WhoItem[]; seed: string; onFinish: Finish }) {
  return (
    <Steps
      items={items}
      seed={seed}
      onFinish={onFinish}
      render={(item, s) => <WhoStep item={item} {...s} />}
    />
  );
}

function WhoStep({ item, wrong, solved, pick }: { item: WhoItem; wrong: string[]; solved: boolean; pick: (o: string, right: boolean) => void }) {
  const audio = storyAudio(item.line.de, item.line.voice);
  useEffect(() => {
    say(audio);
  }, [audio]);
  return (
    <>
      <div className="moin-call">
        <PlayButton src={audio} size="md" label="Послушать ещё раз" /> <span>Послушать ещё раз</span>
      </div>
      <Choices options={item.options} answer={item.answer} wrong={wrong} solved={solved} pick={pick} german={false} />
      {solved && (
        <p className="moin-play-ru">
          <span lang="de">{item.line.de}</span> — {item.line.ru}
        </p>
      )}
    </>
  );
}

function MistakeGame({ items, seed, onFinish }: { items: MistakeItem[]; seed: string; onFinish: Finish }) {
  return (
    <Steps
      items={items}
      seed={seed}
      onFinish={onFinish}
      render={(item, s) => (
        <>
          <p className="moin-play-ask">{item.ru}</p>
          <div className="moin-chat-replies">
            {item.chunks.map((chunk, i) => (
              <button
                type="button"
                key={i}
                lang="de"
                disabled={s.solved || s.wrong.includes(String(i))}
                data-wrong={s.wrong.includes(String(i)) || undefined}
                onClick={() => {
                  s.pick(String(i), i === item.wrong);
                  if (i === item.wrong) say(storyAudio(item.chunks.map((c, k) => (k === item.wrong ? item.right : c)).join(" ")));
                }}
              >
                {s.solved && i === item.wrong ? item.right : chunk}
              </button>
            ))}
          </div>
          {s.wrong.length > 0 && !s.solved && <p className="moin-chat-reaction">Эта часть верна. Ищите дальше.</p>}
          {s.solved && (
            <p className="moin-play-ru" data-tone="good">
              Ошибка: <span lang="de">{item.chunks[item.wrong]}</span> → <b lang="de">{item.right}</b>
            </p>
          )}
          {s.wrong.length > 0 && item.rules.map((id) => <RuleCard key={id} id={id} open={false} />)}
        </>
      )}
    />
  );
}

function VerbGame({ items, seed, onFinish }: { items: VerbItem[]; seed: string; onFinish: Finish }) {
  return (
    <Steps
      items={items}
      seed={seed}
      onFinish={onFinish}
      render={(item, s) => (
        <>
          <p className="moin-play-ask">
            <span lang="de">{item.verb}</span> — {item.ru}
          </p>
          <p className="moin-play-gap" lang="de">
            {item.prompt.split("___")[0]}
            <span className="moin-play-blank">{s.solved ? item.answer : "___"}</span>
            {item.prompt.split("___")[1]}
          </p>
          <Choices options={item.options} answer={item.answer} {...s} />
        </>
      )}
    />
  );
}

/** Кроссворд: буква в клетке, переход к следующей клетке слова; проверка подсвечивает неверные слова. */
function CrosswordGame({ grid, onFinish }: { grid: Crossword; onFinish: Finish }) {
  const [letters, setLetters] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string[]>([]);
  const [down, setDown] = useState(false);
  const missed = useRef(new Set<string>());
  const inputs = useRef(new Map<string, HTMLInputElement | null>());
  const cellsOf = (w: Crossword["words"][number]) => [...w.word].map((ch, i) => ({ key: `${w.down ? w.x : w.x + i},${w.down ? w.y + i : w.y}`, ch }));
  const solution = new Map(grid.words.flatMap((w) => cellsOf(w).map((c) => [c.key, c.ch] as const)));
  const numbers = new Map(grid.words.map((w) => [`${w.x},${w.y}`, w.n]));
  const wrongCells = new Set(grid.words.filter((w) => wrong.includes(w.unit)).flatMap((w) => cellsOf(w).map((c) => c.key)));
  function move(key: string) {
    const [x, y] = key.split(",").map(Number);
    const word = grid.words.find((w) => w.down === down && cellsOf(w).some((c) => c.key === key)) ?? grid.words.find((w) => cellsOf(w).some((c) => c.key === key));
    if (!word) return;
    const next = word.down ? `${x},${y + 1}` : `${x + 1},${y}`;
    inputs.current.get(next)?.focus();
  }
  function check() {
    const bad = grid.words.filter((w) => cellsOf(w).some((c) => (letters[c.key] ?? "") !== c.ch)).map((w) => w.unit);
    bad.forEach((u) => missed.current.add(u));
    setWrong(bad);
    if (!bad.length) onFinish([...missed.current]);
  }
  return (
    <>
      <div className="moin-cross" style={{ gridTemplateColumns: `repeat(${grid.width}, minmax(0, 2.4rem))` }} lang="de">
        {Array.from({ length: grid.height }, (_, y) =>
          Array.from({ length: grid.width }, (_, x) => {
            const key = `${x},${y}`;
            if (!solution.has(key)) return <span key={key} className="moin-cross-void" />;
            return (
              <label key={key} className="moin-cross-cell" data-wrong={wrongCells.has(key) || undefined}>
                {numbers.has(key) && <small>{numbers.get(key)}</small>}
                <input
                  ref={(el) => {
                    inputs.current.set(key, el);
                  }}
                  value={letters[key] ?? ""}
                  maxLength={1}
                  autoCapitalize="characters"
                  autoComplete="off"
                  aria-label={`Клетка ${x + 1}, ${y + 1}`}
                  onFocus={() => {
                    const across = grid.words.some((w) => !w.down && cellsOf(w).some((c) => c.key === key));
                    const vertical = grid.words.some((w) => w.down && cellsOf(w).some((c) => c.key === key));
                    if (across !== vertical) setDown(vertical);
                  }}
                  onChange={(e) => {
                    const ch = e.target.value.slice(-1).toUpperCase();
                    setLetters({ ...letters, [key]: ch });
                    setWrong([]);
                    if (ch) move(key);
                  }}
                />
              </label>
            );
          }),
        )}
      </div>
      <ol className="moin-cross-clues">
        {grid.words.map((w) => (
          <li key={w.unit} data-tone={wrong.includes(w.unit) ? "bad" : undefined}>
            {w.n} {w.down ? "↓" : "→"} {w.clue} <small>({w.word.length})</small>
          </li>
        ))}
      </ol>
      {wrong.length > 0 && <p className="moin-chat-reaction">Неверные слова подсвечены. Исправьте и проверьте снова.</p>}
      <div className="moin-drill-actions">
        <button type="button" className="primary" onClick={check}>
          Проверить
        </button>
      </div>
    </>
  );
}

/** Игры сцен: те же, что в главах, но слова подбирает память. */
function ChallengeGame({ game, seed, onFinish }: { game: Extract<Game, { challenge: unknown }>; seed: string; onFinish: Finish }) {
  const c = game.challenge;
  const [value, setValue] = useState<Answer>(() => initialAnswer(c));
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [rules, setRules] = useState<string[]>([]);
  const missed = useRef(new Set<string>());
  const win = () => onFinish([...missed.current]);
  const props = {
    value,
    seed,
    disabled: false,
    checked,
    change(next: Answer) {
      setChecked(false);
      setValue(next);
    },
    win,
    miss(word?: string) {
      if (!word) return;
      missed.current.add(word);
      setRules(game.rules?.[word] ?? []);
    },
  };
  function check() {
    if (c.kind === "write") {
      const wrong = wrongAnswers(c, value);
      setChecked(true);
      setRevealed(wrong);
      wrong.forEach((w) => missed.current.add(w));
      if (!wrong.length) win();
      return;
    }
    if (c.kind === "match") {
      setChecked(true);
      const record = (value ?? {}) as Record<string, string>;
      c.left.forEach((l, i) => record[l.id] !== c.answer[l.id] && missed.current.add(game.units[i]));
      if (isCorrect(c, value)) win();
    }
  }
  return (
    <>
      {c.kind === "bingo" && <Bingo c={c} {...props} />}
      {c.kind === "gull" && <Gull c={c} {...props} />}
      {c.kind === "docks" && <Docks c={c} {...props} />}
      {c.kind === "letters" && <Letters c={c} {...props} />}
      {c.kind === "lock" && <Lock c={c} {...props} />}
      {c.kind === "match" && <Pairs c={c} {...props} />}
      {c.kind === "write" && <Write c={c} {...props} reveal={false} />}
      {/* Вспомнить нечем, поэтому ответ открывается: его нужно переписать. */}
      {revealed.length > 0 && (
        <ul className="moin-drill-answers" role="status" data-tone="bad">
          {revealed.map((w) => (
            <li key={w}>
              {wordInfo(w)?.ru} — <b lang="de">{w}</b>
            </li>
          ))}
        </ul>
      )}
      {(c.kind === "write" || c.kind === "match") && (
        <div className="moin-drill-actions">
          <button type="button" className="primary" onClick={check}>
            Проверить
          </button>
        </div>
      )}
      {rules.map((id) => (
        <RuleCard key={id} id={id} open />
      ))}
    </>
  );
}

function GameView({ game, seed, onFinish }: { game: Game; seed: string; onFinish: Finish }) {
  const frame = FRAMES[game.mech];
  return (
    <>
      <h3>
        {frame.title} · <span>{frame.task}</span>
      </h3>
      {"challenge" in game ? (
        <ChallengeGame game={game} seed={seed} onFinish={onFinish} />
      ) : game.mech === "plural" ? (
        <PluralGame items={game.items} seed={seed} onFinish={onFinish} />
      ) : game.mech === "cloze" ? (
        <ClozeGame items={game.items} seed={seed} onFinish={onFinish} />
      ) : game.mech === "who" ? (
        <WhoGame items={game.items} seed={seed} onFinish={onFinish} />
      ) : game.mech === "verbs" || game.mech === "perfekt" ? (
        <VerbGame items={game.items} seed={seed} onFinish={onFinish} />
      ) : game.mech === "crossword" ? (
        <CrosswordGame grid={game.grid} onFinish={onFinish} />
      ) : game.mech === "mistake" ? (
        <MistakeGame items={game.items} seed={seed} onFinish={onFinish} />
      ) : null}
    </>
  );
}

/** Строка итога: у реплики и фразы замка ключ служебный, текст и перевод берём из источника. */
function missedLine(unit: string, sources: Sources) {
  const line = sources.lines[unit];
  if (line) return { de: line.de, ru: line.ru };
  const lock = sources.locks[unit];
  if (lock) return { de: lockKey(lock.round), ru: lock.round.ru };
  return { de: unit, ru: wordInfo(unit)?.ru ?? "" };
}

export type ReviewReason = "chapter" | "welcome" | "scene" | "manual";
const HEADINGS: Record<ReviewReason, { kicker: string; title: string }> = {
  chapter: { kicker: "Повторение перед главой", title: "Сначала вспомним пройденное" },
  welcome: { kicker: "Разминка дня", title: "С возвращением в Киль" },
  scene: { kicker: "Повторение перед сценой", title: "Чайка проверяет память" },
  manual: { kicker: "Повторение", title: "Чайка проверяет память" },
};

export function SceneReview({
  next,
  reason,
  rounds,
  sources,
  onGrade,
  onClose,
}: {
  /** Следующий раунд; родитель пересобирает его после каждой оценки. */
  next: Review | null;
  reason: ReviewReason;
  /** Сколько раундов предложить подряд: разминка — несколько, остальные — один. */
  rounds: number;
  sources: Sources;
  onGrade: (units: string[], missed: string[], mechs: Mech[]) => void;
  onClose: () => void;
}) {
  const [review, setReview] = useState(next);
  const [game, setGame] = useState(0);
  const [played, setPlayed] = useState(0);
  const [missed, setMissed] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [heading] = useState(HEADINGS[reason]);
  const more = !!next && played < rounds;
  function finishGame(list: string[]) {
    const all = [...missed, ...list];
    if (review && game + 1 < review.games.length) {
      setMissed(all);
      setGame(game + 1);
      return;
    }
    setMissed(all);
    setDone(true);
    setPlayed(played + 1);
    if (review) onGrade(review.games.flatMap((g) => g.units), all, review.games.map((g) => g.mech));
  }
  function another() {
    setReview(next);
    setGame(0);
    setMissed([]);
    setDone(false);
  }
  const units = review?.games.flatMap((g) => g.units) ?? [];
  return (
    <div className="moin-drill">
      <div className="kicker">{heading.kicker}</div>
      <h2>{heading.title}</h2>
      <p>Три короткие игры. Ошибка вернёт слово или фразу раньше и ничего не отнимет.</p>
      {review && !done && (
        <>
          <p className="moin-count">
            Игра {game + 1} из {review.games.length}
          </p>
          <GameView key={`${played}-${game}`} game={review.games[game]} seed={`review-${played}-${game}-${review.games[game].units[0]}`} onFinish={finishGame} />
          <div className="moin-drill-actions">
            <button type="button" className="link-button" onClick={onClose}>
              Пропустить повторение
            </button>
          </div>
        </>
      )}
      {review && done && (
        <>
          <div className="moin-drill-result" role="status" data-tone={missed.length ? "bad" : "good"}>
            <strong>
              С первого раза: {units.length - new Set(missed).size} из {units.length}
            </strong>
            {missed.length > 0 && (
              <>
                Это вернётся раньше:
                <ul>
                  {[...new Set(missed)].map((unit) => {
                    const { de, ru } = missedLine(unit, sources);
                    return (
                      <li key={unit}>
                        <span lang="de">{de}</span> — {ru}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
          <div className="moin-drill-actions">
            <button type="button" className="primary" onClick={more ? another : onClose}>
              {more ? "Ещё раунд" : "Вернуться к делу →"}
            </button>
            {more && (
              <button type="button" className="link-button" onClick={onClose}>
                Вернуться к делу
              </button>
            )}
          </div>
        </>
      )}
      {!review && (
        <div className="moin-drill-actions">
          <p>Сейчас повторять нечего: всё, что вы встретили, ещё свежо.</p>
          <button type="button" className="primary" onClick={onClose}>
            Вернуться к делу →
          </button>
        </div>
      )}
    </div>
  );
}

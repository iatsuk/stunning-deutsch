import { useRef, useState } from "react";
import { wordInfo } from "./audio";
import { Bingo, Docks, Gull, Letters, Lock, Write } from "./games";
import { initialAnswer, lockKey, wrongAnswers } from "./logic";
import { lockCard, WELCOME_ROUNDS, type Round } from "./memory";
import { RuleCard } from "./RuleCard";
import type { Answer, Challenge } from "./types";

// Повторение поверх истории: те же игры, но слова подбирает память, а не автор главы.
// Сюжет не двигается и нумерация шагов не меняется; раунд всегда можно пропустить.

const PROMPTS: Partial<Record<Challenge["kind"], string>> = {
  bingo: "Послушайте слово и закройте его на карточке.",
  gull: "Прочитайте перевод и нажмите немецкое слово, пока чайка не долетела.",
  docks: "К какому причалу подходит слово: der, die или das?",
  letters: "Соберите слово по буквам.",
  lock: "Поверните диски, чтобы получилась фраза, и откройте замок.",
  write: "Напишите по-немецки. У существительных нужен артикль.",
};

function DrillRound({
  round,
  seed,
  onFinish,
}: {
  round: Round;
  seed: string;
  onFinish: (missed: string[]) => void;
}) {
  const c = round.challenge;
  const [value, setValue] = useState<Answer>(() => initialAnswer(c));
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [rules, setRules] = useState<string[]>([]);
  const missed = useRef(new Set<string>());
  const win = () => onFinish([...missed.current]);
  const game = {
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
      setRules(round.rules?.[word] ?? []);
    },
  };
  function check() {
    if (c.kind !== "write") return;
    const wrong = wrongAnswers(c, value);
    setChecked(true);
    setRevealed(wrong);
    wrong.forEach((word) => missed.current.add(word));
    if (!wrong.length) win();
  }
  return (
    <>
      <h3>{PROMPTS[c.kind]}</h3>
      {c.kind === "bingo" && <Bingo c={c} {...game} />}
      {c.kind === "gull" && <Gull c={c} {...game} />}
      {c.kind === "docks" && <Docks c={c} {...game} />}
      {c.kind === "letters" && <Letters c={c} {...game} />}
      {c.kind === "lock" && <Lock c={c} {...game} />}
      {c.kind === "write" && (
        <>
          <Write c={c} {...game} />
          {/* Вспомнить нечем, поэтому ответ открывается: его нужно переписать. */}
          {revealed.length > 0 && (
            <ul className="moin-drill-answers" role="status">
              {revealed.map((word) => (
                <li key={word}>
                  {wordInfo(word)?.ru} — <b lang="de">{word}</b>
                </li>
              ))}
            </ul>
          )}
          <div className="moin-drill-actions">
            <button type="button" className="primary" onClick={check}>
              Проверить
            </button>
          </div>
        </>
      )}
      {rules.map((id) => (
        <RuleCard key={id} id={id} open />
      ))}
    </>
  );
}

/** Что показать в итоге раунда: у фразы замка ключ служебный, а перевод лежит в ней самой. */
function missedLine(word: string, round: Round) {
  const phrase =
    round.challenge.kind === "lock"
      ? round.challenge.rounds.find((r) => lockCard(r) === word)
      : undefined;
  return phrase
    ? { de: lockKey(phrase), ru: phrase.ru }
    : { de: word, ru: wordInfo(word)?.ru };
}

export function WordDrill({
  next,
  welcome,
  onGrade,
  onClose,
}: {
  next: Round | null;
  welcome: boolean;
  onGrade: (words: string[], missed: string[]) => void;
  onClose: () => void;
}) {
  const [round, setRound] = useState(next);
  const [played, setPlayed] = useState(0);
  const [missed, setMissed] = useState<string[] | null>(null);
  // Запоминаем при открытии: итог раунда не должен менять заголовок и цель разминки.
  const [greeting] = useState(welcome);
  const more = next && played < (greeting ? WELCOME_ROUNDS : 1);
  function finish(list: string[]) {
    setMissed(list);
    setPlayed(played + 1);
    if (round) onGrade(round.words, list);
  }
  function another() {
    setRound(next);
    setMissed(null);
  }
  return (
    <div className="moin-drill">
      <div className="kicker">Повторение · слова из прошлых глав</div>
      <h2>{greeting ? "С возвращением в Киль" : "Чайка проверяет память"}</h2>
      <p>
        Слова возвращаются, пока не закрепятся. Ошибка вернёт слово раньше и
        ничего не отнимет.
      </p>
      {round && !missed && (
        <>
          <DrillRound
            key={played}
            round={round}
            seed={`drill-${played}-${round.words[0]}`}
            onFinish={finish}
          />
          <div className="moin-drill-actions">
            <button type="button" className="link-button" onClick={onClose}>
              Пропустить
            </button>
          </div>
        </>
      )}
      {round && missed && (
        <>
          <div className="moin-drill-result" role="status">
            <strong>
              С первого раза: {round.words.length - missed.length} из{" "}
              {round.words.length}
            </strong>
            {missed.length > 0 && (
              <>
                Это вернётся раньше:
                <ul>
                  {missed
                    .map((word) => missedLine(word, round))
                    .map(({ de, ru }) => (
                      <li key={de}>
                        <span lang="de">{de}</span> — {ru}
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
          <div className="moin-drill-actions">
            <button
              type="button"
              className="primary"
              onClick={more ? another : onClose}
            >
              {more ? "Ещё раунд" : "Вернуться к делу →"}
            </button>
            {next && (
              <button
                type="button"
                className="link-button"
                onClick={more ? onClose : another}
              >
                {more ? "Вернуться к делу" : "Ещё раунд"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

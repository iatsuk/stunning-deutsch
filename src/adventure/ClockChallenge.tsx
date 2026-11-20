import { useState } from "react";
import type { AdventureChallenge } from "../content";
import { uhrzeit } from "../lib/german";
import { Text } from "../markup";
import { ClockView } from "../stage/Clock";
import type { ChallengeProps } from "./Challenge";
import { Clue } from "./Clue";
import { challengeSolved } from "./logic";

export function ClockChallenge({ challenge, state, save, onNext, last }: Omit<ChallengeProps, "challenge"> & {
  challenge: Extract<AdventureChallenge, { kind: "clock" }>;
}) {
  const key = `challenge:${challenge.id}`;
  const [wrong, setWrong] = useState(false);
  let clock = uhrzeit(challenge.initial);
  try { clock = uhrzeit(state.answers[`${key}:time`] ?? challenge.initial); } catch { /* Испорченное старое сохранение: остаётся начальное время. */ }
  const done = state.answers[`${key}:done`] === "yes" && challengeSolved(challenge, [clock.time]);
  const shift = (delta: number) => {
    const total = ((clock.hours * 60 + clock.minutes + delta) % 1440 + 1440) % 1440;
    const time = `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
    setWrong(false);
    save({ answers: { ...state.answers, [`${key}:time`]: time } });
  };
  return <div className="adventure-challenge">
    <h3 tabIndex={-1}>{challenge.title}</h3><p><Text text={challenge.intro} /></p>
    {challenge.quotes && <Clue quotes={challenge.quotes} reading={challenge.mode === "reading"} onHelp={() => save({ assisted: true })} />}
    <div className="game-clock">
      <ClockView clock={{ ...clock, audio: [] }} showReading={false} />
      <div className="game-clock-controls" aria-label="Установить время">
        <div><span>Часы</span><button type="button" disabled={done} aria-label="На час назад" onClick={() => shift(-60)}>−1</button><button type="button" disabled={done} aria-label="На час вперёд" onClick={() => shift(60)}>+1</button></div>
        <div><span>Минуты</span><button type="button" disabled={done} aria-label={`Убавить ${challenge.minuteStep} минут`} onClick={() => shift(-challenge.minuteStep)}>−{challenge.minuteStep}</button><button type="button" disabled={done} aria-label={`Добавить ${challenge.minuteStep} минут`} onClick={() => shift(challenge.minuteStep)}>+{challenge.minuteStep}</button></div>
      </div>
      <p>Цифровое время — в формате 24 часов. Учитывайте, утром или после полудня назначена встреча.</p>
    </div>
    <div className="adventure-feedback" role="status" data-ok={done}>{done ? <Text text={challenge.success} /> : wrong ? <Text text={challenge.wrong} /> : null}</div>
    <div className="adventure-actions">{done ? <button type="button" className="adventure-primary" onClick={onNext}>{last ? "Завершить эпизод →" : "Продолжить →"}</button>
      : <button type="button" className="adventure-primary" onClick={() => {
        if (challengeSolved(challenge, [clock.time])) save({ answers: { ...state.answers, [`${key}:done`]: "yes" } });
        else setWrong(true);
      }}>Подтвердить время</button>}</div>
  </div>;
}

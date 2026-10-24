import { useState } from "react";
import type { AdventureChallenge } from "../content";
import { De, Text } from "../markup";
import { Clue } from "./Clue";
import type { ChallengeProps } from "./Challenge";
import { challengeSolved, shuffled } from "./logic";

export function MatchingChallenge({ challenge, state, save, onNext, last }: Omit<ChallengeProps, "challenge"> & {
  challenge: Extract<AdventureChallenge, { kind: "match" }>;
}) {
  const key = `challenge:${challenge.id}`;
  const answerKey = (id: string) => `${key}:slot:${id}`;
  const values = challenge.slots.map((slot) => state.answers[answerKey(slot.id)] ?? "");
  const [active, setActive] = useState(() => challenge.slots.find((slot, index) => values[index] !== slot.answer)?.id ?? challenge.slots[0].id);
  const [wrong, setWrong] = useState(false);
  const complete = values.every((value) => challenge.options.some((option) => option.id === value));
  const done = state.answers[`${key}:done`] === "yes" && challengeSolved(challenge, values);
  const current = challenge.slots.find((slot) => slot.id === active) ?? challenge.slots[0];
  const assign = (id: string) => {
    const answers = { ...state.answers, [answerKey(current.id)]: id };
    save({ answers });
    setWrong(false);
    const next = challenge.slots.find((slot) => !answers[answerKey(slot.id)]);
    if (next) setActive(next.id);
  };
  return <div className="adventure-challenge">
    <h3 tabIndex={-1}>{challenge.title}</h3>
    <p><Text text={challenge.intro} /></p>
    {challenge.quotes && <Clue quotes={challenge.quotes} reading={challenge.mode === "reading"} onHelp={() => save({ assisted: true })} />}
    <p className="matching-count">Заполнено {values.filter((value) => challenge.options.some((option) => option.id === value)).length} из {challenge.slots.length} полей</p>
    <div className="matching-workbench" data-done={done || undefined}>
      <div className="matching-map" aria-label={challenge.anchor ? `Семейная карточка: ${challenge.anchor}` : "Вещи и владельцы"}>
        {challenge.anchor && <div className="matching-anchor"><span className="crew-avatar" aria-hidden="true">{challenge.anchor[0]}</span><De text={challenge.anchor} /></div>}
        <div className="matching-slots">{challenge.slots.map((slot, index) => {
          const value = challenge.options.find((option) => option.id === values[index]);
          return <button type="button" key={slot.id} disabled={done} aria-pressed={current.id === slot.id && !done}
            aria-label={`${slot.label}: ${value?.label ?? "не заполнено"}`} data-invalid={wrong && values[index] !== slot.answer || undefined}
            onClick={() => { setActive(slot.id); setWrong(false); }}>
            <span className="matching-label">{slot.icon && <span aria-hidden="true">{slot.icon} </span>}<De text={slot.label} /></span>
            <strong>{value ? <De text={value.label} /> : "Выберите подпись →"}</strong>
          </button>;
        })}</div>
      </div>
      {!done && <div className="matching-choices">
        <span className="kicker">Подпись для поля</span><h4><De text={current.label} /></h4>
        <div>{shuffled(challenge.options, state.seed + 83).map((option) => <button type="button" key={option.id} onClick={() => assign(option.id)}>
          <De text={option.label} /> <span aria-hidden="true">↗</span>
        </button>)}</div>
        <p>Нажмите поле, затем подпись. Уже заполненное поле можно изменить.</p>
      </div>}
    </div>
    <div className="adventure-feedback" role="status" data-ok={done}>{done ? <Text text={challenge.success} /> : wrong ? <Text text={challenge.wrong} /> : null}</div>
    <div className="adventure-actions">{done ? <button type="button" className="adventure-primary" onClick={onNext}>{last ? "Завершить эпизод →" : "Продолжить →"}</button>
      : <button type="button" className="adventure-primary" disabled={!complete} onClick={() => {
        if (challengeSolved(challenge, values)) save({ answers: { ...state.answers, [`${key}:done`]: "yes" } });
        else {
          setWrong(true);
          setActive(challenge.slots.find((slot, index) => values[index] !== slot.answer)!.id);
        }
      }}>Проверить связи</button>}
    </div>
  </div>;
}

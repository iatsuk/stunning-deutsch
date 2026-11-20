import { useState } from "react";
import type { AdventureChallenge } from "../content";
import { De, Text } from "../markup";
import type { ChallengeProps } from "./Challenge";
import { Clue } from "./Clue";
import { challengeSolved } from "./logic";

export function NoteChallenge({ challenge, state, save, onNext, last }: Omit<ChallengeProps, "challenge"> & {
  challenge: Extract<AdventureChallenge, { kind: "note" }>;
}) {
  const key = `challenge:${challenge.id}`;
  const [wrong, setWrong] = useState(false);
  const values = challenge.fields.map((_, index) => state.answers[`${key}:${index}`] ?? "");
  const done = state.answers[`${key}:done`] === "yes" && challengeSolved(challenge, values);
  return <div className="adventure-challenge">
    <h3 tabIndex={-1}>{challenge.title}</h3><p><Text text={challenge.intro} /></p>
    {challenge.quotes && <Clue quotes={challenge.quotes} reading={challenge.mode === "reading"} onHelp={() => save({ assisted: true })} />}
    <div className="note-fields">{challenge.fields.map((field, index) => <label key={index}>
      <De text={field.label} />
      <input value={values[index]} disabled={done} autoComplete="off" onChange={(event) => {
        setWrong(false);
        save({ answers: { ...state.answers, [`${key}:${index}`]: event.target.value } });
      }} />
    </label>)}</div>
    <div className="adventure-feedback" role="status" data-ok={done}>{done ? <Text text={challenge.success} /> : wrong ? <Text text={challenge.wrong} /> : null}</div>
    <div className="adventure-actions">{done ? <button type="button" className="adventure-primary" onClick={onNext}>{last ? "Завершить эпизод →" : "Продолжить →"}</button>
      : <button type="button" className="adventure-primary" onClick={() => {
        if (challengeSolved(challenge, values)) save({ answers: { ...state.answers, [`${key}:done`]: "yes" } });
        else setWrong(true);
      }}>Проверить заметку</button>}</div>
  </div>;
}

import { useState } from "react";
import type { AdventureChallenge } from "../content";
import type { AdventureSave } from "../hooks";
import { De, Text } from "../markup";
import { Clue } from "./Clue";
import { challengeSolved, shuffled } from "./logic";
import { MatchingChallenge } from "./MatchingChallenge";
import { QuantityChallenge } from "./QuantityChallenge";
import { ClockChallenge } from "./ClockChallenge";
import { NoteChallenge } from "./NoteChallenge";
import { NegotiationChallenge } from "./NegotiationChallenge";

export type ChallengeProps = {
  challenge: AdventureChallenge;
  state: AdventureSave;
  save: (patch: Partial<AdventureSave>) => void;
  onNext: () => void;
  last: boolean;
};

export function Challenge(props: ChallengeProps) {
  return props.challenge.kind === "match" ? <MatchingChallenge {...props} challenge={props.challenge} />
    : props.challenge.kind === "quantity" ? <QuantityChallenge {...props} challenge={props.challenge} />
    : props.challenge.kind === "clock" ? <ClockChallenge {...props} challenge={props.challenge} />
    : props.challenge.kind === "note" ? <NoteChallenge {...props} challenge={props.challenge} />
    : props.challenge.kind === "negotiation" ? <NegotiationChallenge {...props} challenge={props.challenge} />
    : <PickChallenge {...props} challenge={props.challenge} />;
}

function PickChallenge({ challenge, state, save, onNext, last }: Omit<ChallengeProps, "challenge"> & { challenge: Exclude<AdventureChallenge, { kind: "match" | "quantity" | "clock" | "note" | "negotiation" }> }) {
  const [wrong, setWrong] = useState(false);
  const key = `challenge:${challenge.id}`;
  const raw = state.answers[key] ?? "";
  const availableIds = challenge.kind === "order" ? challenge.tokens.map((_, index) => String(index)) : challenge.options.map((option) => option.id);
  const selected = [...new Set(raw.split(",").filter((id) => availableIds.includes(id)))];
  const done = state.answers[`${key}:done`] === "yes" && challengeSolved(challenge, selected);
  const tokens = challenge.kind === "order" ? shuffled(challenge.tokens.map((text, index) => ({ text, id: String(index) })), state.seed + 43) : [];
  if (challenge.kind === "order" && tokens.every((token, index) => token.text === challenge.tokens[index])) tokens.push(tokens.shift()!);
  const update = (values: string[]) => {
    setWrong(false);
    save({ answers: { ...state.answers, [key]: values.join(",") } });
  };
  return <div className="adventure-challenge">
    <h3 tabIndex={-1}>{challenge.title}</h3>
    <p><Text text={challenge.intro} /></p>
    {challenge.quotes && <Clue quotes={challenge.quotes} reading={challenge.mode === "reading"} onHelp={() => save({ assisted: true })} />}
    {challenge.kind === "order" ? <>
      <div className="challenge-answer" aria-label={challenge.label}>
        <span className="kicker">{challenge.label}</span>
        <div>{selected.length ? selected.map((id, position) => <button type="button" key={id} disabled={done}
          aria-label={`Убрать ${challenge.tokens[Number(id)]}, позиция ${position + 1}`}
          onClick={() => update(selected.filter((_, index) => index !== position))}>
          <De text={challenge.tokens[Number(id)]} /> <span aria-hidden="true">×</span>
        </button>) : <p>Нажимайте на фрагменты ниже, чтобы собрать ответ.</p>}</div>
      </div>
      <div className="challenge-tokens" aria-label="Доступные фрагменты">{tokens.map(({ text, id }) =>
        <button type="button" key={id} disabled={done || selected.includes(id)} onClick={() => update([...selected, id])}><De text={text} /></button>)}</div>
      {!done && selected.length > 0 && <button type="button" className="challenge-clear" onClick={() => update([])}>Собрать заново</button>}
    </> : <div className={`challenge-options challenge-options-${challenge.kind}`} aria-label={challenge.title}>
      {shuffled(challenge.options, state.seed + 61).map((option) => <button type="button" key={option.id} disabled={done}
        aria-pressed={selected.includes(option.id)} onClick={() => update(challenge.kind === "select" ? [option.id]
          : selected.includes(option.id) ? selected.filter((id) => id !== option.id) : [...selected, option.id])}>
        {option.icon && <span className="challenge-icon" aria-hidden="true">{option.icon}</span>}
        <De text={option.label} /><span className="challenge-tick" aria-hidden="true">{selected.includes(option.id) ? "✓" : "+"}</span>
      </button>)}
    </div>}
    <div className="adventure-feedback" role="status" data-ok={done}>{done ? <Text text={challenge.success} /> : wrong ? <Text text={challenge.wrong} /> : null}</div>
    <div className="adventure-actions">{done ? <button type="button" className="adventure-primary" onClick={onNext}>{last ? "Завершить эпизод →" : "Продолжить →"}</button>
      : <button type="button" className="adventure-primary" disabled={!selected.length} onClick={() => {
        if (challengeSolved(challenge, selected)) save({ answers: { ...state.answers, [`${key}:done`]: "yes" } });
        else setWrong(true);
      }}>{challenge.kind === "pack" ? "Проверить набор" : challenge.kind === "select" ? "Подтвердить выбор" : "Проверить"}</button>}
    </div>
  </div>;
}

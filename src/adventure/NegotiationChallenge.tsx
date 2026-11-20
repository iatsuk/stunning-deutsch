import { useState } from "react";
import type { AdventureChallenge } from "../content";
import { De, Text } from "../markup";
import type { ChallengeProps } from "./Challenge";
import { Clue } from "./Clue";
import { challengeSolved, negotiationNode } from "./logic";

export function NegotiationChallenge({ challenge, state, save, onNext, last }: Omit<ChallengeProps, "challenge"> & {
  challenge: Extract<AdventureChallenge, { kind: "negotiation" }>;
}) {
  const key = `challenge:${challenge.id}`;
  const [feedback, setFeedback] = useState("");
  const path = state.answers[key] ?? "";
  const node = negotiationNode(challenge, path);
  const done = challengeSolved(challenge, [path]);
  return <div className="adventure-challenge">
    <h3 tabIndex={-1}>{challenge.title}</h3><p><Text text={challenge.intro} /></p>
    {challenge.quotes && <Clue quotes={challenge.quotes} reading={challenge.mode === "reading"} onHelp={() => save({ assisted: true })} />}
    <div className="conversation">
      <p className="conversation-reply" aria-live="polite"><De text={node.text} /></p>
      <div className="challenge-options">{node.choices.map((choice, index) => <button key={index} type="button" onClick={() => {
        setFeedback(choice.feedback);
        save({ answers: { ...state.answers, [key]: [path, String(index)].filter(Boolean).join(",") } });
      }}><De text={choice.label} /></button>)}</div>
      {feedback && <p role="status"><Text text={feedback} /></p>}
      {path && !done && <button type="button" onClick={() => {
        setFeedback("");
        save({ answers: { ...state.answers, [key]: "" } });
      }}>Начать разговор заново</button>}
    </div>
    <div className="adventure-feedback" role="status" data-ok={done}>{done ? <Text text={challenge.success} /> : null}</div>
    <div className="adventure-actions">{done && <button type="button" className="adventure-primary" onClick={onNext}>{last ? "Завершить эпизод →" : "Продолжить →"}</button>}</div>
  </div>;
}

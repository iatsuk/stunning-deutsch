import { useState } from "react";
import type { AdventureChallenge } from "../content";
import { De, Text } from "../markup";
import type { ChallengeProps } from "./Challenge";
import { Clue } from "./Clue";
import { challengeSolved } from "./logic";

export function QuantityChallenge({ challenge, state, save, onNext, last }: Omit<ChallengeProps, "challenge"> & {
  challenge: Extract<AdventureChallenge, { kind: "quantity" }>;
}) {
  const key = `challenge:${challenge.id}`;
  const [wrong, setWrong] = useState(false);
  const values = challenge.items.map((item) => {
    const value = Number(state.answers[`${key}:item:${item.id}`] ?? 0);
    return Number.isInteger(value) && value >= 0 && value <= item.max && value % item.step === 0 ? value : 0;
  });
  const done = state.answers[`${key}:done`] === "yes" && challengeSolved(challenge, values.map(String));
  const change = (index: number, amount: number) => {
    const item = challenge.items[index];
    setWrong(false);
    save({ answers: { ...state.answers, [`${key}:item:${item.id}`]: String(Math.max(0, Math.min(item.max, values[index] + amount))) } });
  };
  return <div className="adventure-challenge">
    <h3 tabIndex={-1}>{challenge.title}</h3><p><Text text={challenge.intro} /></p>
    {challenge.quotes && <Clue quotes={challenge.quotes} reading={challenge.mode === "reading"} onHelp={() => save({ assisted: true })} />}
    <div className="quantity-cart" aria-label="Корзина покупок">{challenge.items.map((item, index) => <article key={item.id} data-invalid={wrong && values[index] !== item.answer || undefined}>
      <div className="quantity-product">{item.icon && <span aria-hidden="true">{item.icon}</span>}<h4><De text={item.label} /></h4></div>
      <div className="quantity-controls">
        <button type="button" disabled={done || values[index] === 0} aria-label={`Уменьшить: ${item.label}`} onClick={() => change(index, -item.step)}>−</button>
        <output aria-label={`Количество: ${item.label}`}>{values[index]} <De text={values[index] === 1 ? item.unit : item.pluralUnit ?? item.unit} /></output>
        <button type="button" disabled={done || values[index] >= item.max} aria-label={`Добавить: ${item.label}`} onClick={() => change(index, item.step)}>+</button>
      </div>
    </article>)}</div>
    <div className="adventure-feedback" role="status" data-ok={done}>{done ? <Text text={challenge.success} /> : wrong ? <Text text={challenge.wrong} /> : null}</div>
    <div className="adventure-actions">{done ? <button type="button" className="adventure-primary" onClick={onNext}>{last ? "Завершить эпизод →" : "Продолжить →"}</button>
      : <button type="button" className="adventure-primary" onClick={() => {
        if (challengeSolved(challenge, values.map(String))) save({ answers: { ...state.answers, [`${key}:done`]: "yes" } });
        else setWrong(true);
      }}>Проверить корзину</button>}</div>
  </div>;
}

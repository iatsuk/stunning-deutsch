import { useEffect, useRef, useState } from "react";
import type { CaseEvidence, Investigation, Topic } from "../content";
import { useCaseProgress } from "../hooks";
import { shuffle } from "../lib/shuffle";
import { De, PlayButton, Text } from "../markup";

/**
 * Дело темы. Шаги открываются по одному: улики, вопрос и варианты. Неверный
 * вывод — ложный след с объяснением, верный открывает перевод улик и следующий шаг.
 */
export function CaseFile({ topic, investigation }: { topic: Topic; investigation: Investigation }) {
  const progress = useCaseProgress(topic.id);
  const steps = investigation.steps;
  const solved = Math.min(progress.solved, steps.length);
  const closed = solved >= steps.length;
  const [misses, setMisses] = useState<Record<number, number[]>>({});
  const list = useRef<HTMLOListElement>(null);
  const opened = useRef(solved);

  // Новый шаг плавно выезжает в поле зрения, но не при загрузке страницы.
  useEffect(() => {
    if (solved > opened.current) {
      const target = closed ? list.current?.nextElementSibling : list.current?.children[solved];
      target?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    opened.current = solved;
  }, [solved, closed]);

  return (
    <div className="case">
      <div className="case-intro">
        <p>
          <Text text={investigation.intro} />
        </p>
        <div className="case-progress">
          <span className="meter">
            <i style={{ width: `${(solved / steps.length) * 100}%` }} />
          </span>
          Улик раскрыто: {solved} из {steps.length}
        </div>
      </div>
      <ol className="case-steps" ref={list}>
        {steps.slice(0, Math.min(solved + 1, steps.length)).map((step, i) => {
          const done = i < solved;
          const missed = misses[i] ?? [];
          const lastMiss = missed[missed.length - 1];
          return (
            <li key={i} className="case-step" data-done={done || undefined}>
              <div className="case-step-head">
                Шаг {i + 1} из {steps.length}
              </div>
              <p className="case-read">
                <Text text={step.read} />
              </p>
              <div className="evidence">
                {step.evidence.map((item, k) => (
                  <Evidence key={k} item={item} investigation={investigation} translated={done} />
                ))}
              </div>
              <div className="case-question">
                <h4>
                  <Text text={step.question} />
                </h4>
                <div className="option-row">
                  {shuffle(step.options.map((_, k) => k), `${topic.id}-case-${i}`).map((k) => (
                    <button
                      key={k}
                      type="button"
                      className="option"
                      disabled={done}
                      data-state={done && k === step.answer ? "right" : missed.includes(k) ? "wrong" : undefined}
                      onClick={() => {
                        if (k === step.answer) progress.advance(i + 1);
                        else setMisses((m) => ({ ...m, [i]: [...(m[i] ?? []), k] }));
                      }}
                    >
                      <Text text={step.options[k]} />
                    </button>
                  ))}
                </div>
                {!done && lastMiss !== undefined && step.wrong[lastMiss] && (
                  <div className="case-lead" data-kind="false">
                    <span>Ложный след</span>
                    <p>
                      <Text text={step.wrong[lastMiss]!} />
                    </p>
                  </div>
                )}
                {done && (
                  <div className="case-lead" data-kind="right">
                    <span>Верно</span>
                    <p>
                      <Text text={step.right} />
                    </p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {closed && (
        <div className="case-ending">
          <div className="case-stamp">Дело закрыто</div>
          <p>
            <Text text={investigation.ending} />
          </p>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              setMisses({});
              progress.reset();
            }}
          >
            Пройти дело заново
          </button>
        </div>
      )}
    </div>
  );
}

function Evidence({ item, investigation, translated }: { item: CaseEvidence; investigation: Investigation; translated: boolean }) {
  if (item.kind === "note") {
    return (
      <figure className="evidence-note">
        <figcaption>Записка</figcaption>
        {item.de.split("\n").map((line, i) => (
          <p key={i}>
            <De text={line} />
          </p>
        ))}
        {translated && <div className="evidence-ru">{item.ru}</div>}
      </figure>
    );
  }
  const person = investigation.people[item.who];
  return (
    <figure className="evidence-quote">
      <figcaption>
        <span className="avatar" aria-hidden="true">
          {person.name.replace(/^(Frau|Herr) /, "").charAt(0)}
        </span>
        <span className="who">{person.name}</span>
        {person.role && <span className="evidence-role">{person.role}</span>}
        <PlayButton src={item.audio} />
      </figcaption>
      <De text={item.de} className="evidence-de" />
      {translated && <div className="evidence-ru">{item.ru}</div>}
    </figure>
  );
}

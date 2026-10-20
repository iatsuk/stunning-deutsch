import type { Task } from "../content";
import { examLabel } from "../content";
import { playAll, stopAudio, usePlaying } from "../hooks";
import { De, PlayButton } from "../markup";

/** Задание в формате экзамена. reveal — сколько полей или строк образца открыто, solved — показан ответ. */
export function TaskView({ task, reveal, solved }: { task: Task; reveal?: number; solved?: boolean }) {
  return (
    <div className="task" data-kind={task.kind}>
      <header className="task-head">
        <span className="task-part">{examLabel(task.part)}</span>
        {task.title && <De className="task-title" text={task.title} />}
      </header>
      {task.situation && (
        <p className="task-situation">
          <De text={task.situation} />
        </p>
      )}
      <TaskBody task={task} reveal={reveal} solved={solved} />
    </div>
  );
}

function TaskBody({ task, reveal, solved }: { task: Task; reveal?: number; solved?: boolean }) {
  switch (task.kind) {
    case "keywords":
      return (
        <>
          <ul className="keywords">
            {task.words?.map((word) => (
              <li key={word}>
                <De text={word} />
              </li>
            ))}
          </ul>
          <Sample task={task} reveal={reveal} />
        </>
      );
    case "form":
      return <Form task={task} reveal={reveal} />;
    case "card":
      return (
        <>
          <div className="handcard">
            {task.theme && (
              <div className="handcard-theme">
                Thema: <De text={task.theme} />
              </div>
            )}
            {task.picture ? (
              <div className="handcard-picture" aria-label={task.word}>
                {task.picture}
              </div>
            ) : (
              <De className="handcard-word" text={task.word ?? ""} />
            )}
          </div>
          <Sample task={task} reveal={reveal ?? (solved ? undefined : 0)} />
        </>
      );
    case "sign":
      return (
        <>
          <div className="sign">
            {task.text?.split("\n").map((line, i) => (
              <div key={i}>
                <De text={line} />
              </div>
            ))}
          </div>
          <Statement task={task} solved={solved} />
        </>
      );
    case "message":
      return (
        <>
          <div className="message">
            {(task.from || task.to || task.subject) && (
              <div className="message-meta">
                {task.from && (
                  <div>
                    <span>Von</span> {task.from}
                  </div>
                )}
                {task.to && (
                  <div>
                    <span>An</span> {task.to}
                  </div>
                )}
                {task.subject && (
                  <div>
                    <span>Betreff</span> <De text={task.subject} />
                  </div>
                )}
              </div>
            )}
            <div className="message-text">
              {task.text?.split("\n").map((line, i) => (
                <p key={i}>
                  <De text={line} />
                </p>
              ))}
            </div>
          </div>
          {task.points && (
            <ul className="leitpunkte">
              {task.points.map((point) => (
                <li key={point}>
                  <De text={point} />
                </li>
              ))}
            </ul>
          )}
          {task.statement !== undefined && <Statement task={task} solved={solved} />}
          <Sample task={task} reveal={reveal ?? (solved ? undefined : 0)} />
        </>
      );
    case "listen":
      return (
        <>
          <div className="listen">
            {task.script ? <PlayScript script={task.script} /> : <PlayButton src={task.audio} size="md" label="Прослушать запись" />}
            <div className="listen-wave" aria-hidden="true">
              {Array.from({ length: 28 }, (_, i) => (
                <i key={i} style={{ height: `${30 + 60 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6))}%` }} />
              ))}
            </div>
          </div>
          {solved && task.text && (
            <div className="listen-text">
              {task.text.split("\n").map((line, i) => (
                <div key={i}>
                  <De text={line} />
                </div>
              ))}
            </div>
          )}
          {solved && task.script && (
            <div className="listen-text">
              {task.script.map((line, i) => (
                <div key={i}>
                  <span className="listen-who">{line.who}:</span> <De text={line.de} />
                </div>
              ))}
            </div>
          )}
          {task.statement !== undefined ? <Statement task={task} solved={solved} /> : <Options task={task} solved={solved} />}
        </>
      );
    case "ads":
      return <Ads task={task} solved={solved} />;
  }
}

/** Кнопка для записи-разговора: проигрывает реплики подряд. */
function PlayScript({ script }: { script: NonNullable<Task["script"]> }) {
  const playing = usePlaying();
  const sources = script.map((line) => line.audio);
  const active = sources.includes(playing);
  return (
    <button
      type="button"
      className="play"
      data-size="md"
      data-active={active || undefined}
      aria-label={active ? "Остановить" : "Прослушать запись"}
      title={active ? "Остановить" : "Прослушать запись"}
      onClick={() => (active ? stopAudio() : playAll(sources))}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        {active ? <rect x="4" y="4" width="8" height="8" rx="1.5" /> : <path d="M5.5 3.8v8.4a.6.6 0 0 0 .9.5l6.6-4.2a.6.6 0 0 0 0-1L6.4 3.3a.6.6 0 0 0-.9.5Z" />}
      </svg>
    </button>
  );
}

function Sample({ task, reveal }: { task: Task; reveal?: number }) {
  const shown = task.sample.slice(0, reveal ?? task.sample.length);
  if (!shown.length) return null;
  return (
    <div className="sample">
      <div className="sample-label">Образец ответа</div>
      <ol>
        {shown.map((line, i) => (
          <li key={i}>
            <De text={line.de} />
            <PlayButton src={line.audio} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Form({ task, reveal }: { task: Task; reveal?: number }) {
  let filled = 0;
  return (
    <dl className="form">
      {task.fields?.map((field, i) => {
        const open = field.given || filled++ < (reveal ?? Infinity);
        return (
          <div key={i} className="form-row" data-given={field.given || undefined} data-open={open || undefined}>
            <dt>
              <De text={field.label} />
            </dt>
            <dd>{open ? <De text={field.value} /> : <span className="form-blank" />}</dd>
          </div>
        );
      })}
    </dl>
  );
}

function Statement({ task, solved }: { task: Task; solved?: boolean }) {
  return (
    <div className="statement">
      {task.statement && (
        <p>
          <De text={task.statement} />
        </p>
      )}
      <div className="choices">
        {[true, false].map((value) => (
          <span key={String(value)} className="choice-chip" data-correct={(solved && task.answer === value) || undefined}>
            {value ? "Richtig" : "Falsch"}
          </span>
        ))}
      </div>
    </div>
  );
}

function Options({ task, solved }: { task: Task; solved?: boolean }) {
  return (
    <div className="statement">
      {task.question && (
        <p>
          <De text={task.question} />
        </p>
      )}
      <ol className="options" type="a">
        {task.options?.map((option, i) => (
          <li key={i} data-correct={(solved && task.answer === i) || undefined}>
            <span className="option-letter">{"abc"[i]}</span>
            <De text={typeof option === "string" ? option : option.title} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Ads({ task, solved }: { task: Task; solved?: boolean }) {
  return (
    <div className="ads">
      {task.options?.map((option, i) =>
        typeof option === "string" ? null : (
          <div key={i} className="ad" data-correct={(solved && task.answer === i) || undefined}>
            <span className="option-letter">{"ab"[i]}</span>
            <De className="ad-title" text={option.title} />
            {option.text.split("\n").map((line, j) => (
              <div key={j} className="ad-line">
                <De text={line} />
              </div>
            ))}
          </div>
        ),
      )}
    </div>
  );
}

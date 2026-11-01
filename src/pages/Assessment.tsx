import { ClozeText } from "../stage/Cloze";
import { useEffect, useRef, useState } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { loadAssessment, examLabel, type Assessment, type Level, type Task } from "../content";
import { De } from "../markup";
import { advanceExpired, objectiveResult, playbackLimit, wordCount, b1WeightedResult } from "../assessment/logic";
import { normalizeAnswer } from "../adventure/logic";
import "../styles/assessment.css";

type Attempt = {
  index: number;
  startedAt: number | null;
  values: Record<string, string>;
  drafts: Record<string, string>;
  chosen: Record<string, string[]>;
  plays: Record<string, number>;
};
const fresh = (): Attempt => ({ index: 0, startedAt: null, values: {}, drafts: {}, chosen: {}, plays: {} });
function restore(key: string, sections: number): Attempt {
  try {
    const s = JSON.parse(localStorage.getItem(key) ?? "null");
    if (
      !s ||
      !Number.isInteger(s.index) ||
      s.index < 0 ||
      s.index > sections ||
      (s.startedAt !== null && (!Number.isFinite(s.startedAt) || s.startedAt < 0))
    )
      return fresh();
    for (const k of ["values", "drafts", "chosen", "plays"])
      if (!s[k] || typeof s[k] !== "object" || Array.isArray(s[k])) return fresh();
    if (
      Object.values(s.values).some((v) => typeof v !== "string") ||
      Object.values(s.drafts).some((v) => typeof v !== "string") ||
      Object.values(s.chosen).some((v) => !Array.isArray(v) || v.some((x) => typeof x !== "string")) ||
      Object.values(s.plays).some((v) => !Number.isInteger(v) || Number(v) < 0)
    )
      return fresh();
    return s;
  } catch {
    return fresh();
  }
}
export function AssessmentPage({ level, id }: { level: Level; id: string }) {
  const [data, setData] = useState<Assessment | null | undefined>();
  const [error, setError] = useState<unknown>(null);
  useEffect(() => {
    let alive = true;
    loadAssessment(id)
      .then((d) => {
        if (alive) setData(d?.level === level.id ? d : null);
      })
      .catch((reason) => {
        if (alive) setError(reason);
      });
    return () => {
      alive = false;
    };
  }, [id, level.id]);
  if (error) throw error;
  return data ? (
    <AttemptPage key={data.id} data={data} level={level} />
  ) : (
    <>
      <Topbar crumbs={[{ label: level.code, href: `#/${level.id}` }]} />
      <main className="assessment-page">
        <h1>{data === null ? "Проверка не найдена" : "Загружаем проверку…"}</h1>
      </main>
    </>
  );
}
function AttemptPage({ data, level }: { data: Assessment; level: Level }) {
  useTitle(`${data.title} · Stunning Deutsch`);
  const key = `sd-assessment-v1:${data.id}`;
  const [state, setState] = useState(() =>
    advanceExpired(restore(key, data.sections.length), data.sections, Date.now()),
  );
  const [now, setNow] = useState(Date.now());
  const [saveError, setSaveError] = useState(false);
  const [audioError, setAudioError] = useState("");
  const [busy, setBusy] = useState("");
  const player = useRef<HTMLAudioElement | null>(null);
  const run = useRef(0);
  const playingKey = useRef("");
  const stop = () => {
    run.current++;
    player.current?.pause();
    player.current = null;
    playingKey.current = "";
    setBusy("");
  };
  useEffect(
    () => () => {
      run.current++;
      player.current?.pause();
    },
    [],
  );
  useEffect(() => {
    stop();
    window.scrollTo(0, 0);
  }, [state.index]);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }, [key, state]);
  useEffect(() => {
    if (state.startedAt === null || state.index >= data.sections.length) return;
    const tick = () => {
      const n = Date.now();
      setNow(n);
      setState((s) => advanceExpired(s, data.sections, n));
    };
    const timer = window.setInterval(tick, 500);
    return () => clearInterval(timer);
  }, [state.startedAt, state.index, data]);
  const done = state.index >= data.sections.length;
  const section = data.sections[state.index];
  const started = state.startedAt !== null;
  const result = objectiveResult(data.tasks, state.values);
  const weighted = data.level === "b1" && data.mode === "mock" ? b1WeightedResult(data.tasks, state.values) : null;
  const next = () => {
    stop();
    const n = Date.now();
    setNow(n);
    setState((s) => ({ ...s, index: s.index + 1, startedAt: n }));
    window.scrollTo(0, 0);
  };
  const start = () => {
    const n = Date.now();
    setNow(n);
    setState((s) => ({ ...s, startedAt: n }));
  };
  async function listen(playKey: string, sources: (string | undefined)[], limit: number) {
    if (playingKey.current || !sources.length || sources.some((s) => !s) || (state.plays[playKey] ?? 0) >= limit)
      return;
    playingKey.current = playKey;
    setBusy(playKey);
    setAudioError("");
    const token = ++run.current;
    setState((s) => ({ ...s, plays: { ...s.plays, [playKey]: (s.plays[playKey] ?? 0) + 1 } }));
    const playNext = async (i: number): Promise<void> => {
      if (token !== run.current) return;
      if (i >= sources.length) {
        playingKey.current = "";
        setBusy("");
        return;
      }
      const a = new Audio(sources[i]);
      player.current = a;
      a.onended = () => {
        void playNext(i + 1);
      };
      a.onerror = () => {
        if (token !== run.current) return;
        setAudioError("Не удалось воспроизвести запись. Попытка возвращена; проверьте звук и повторите.");
        setState((s) => ({ ...s, plays: { ...s.plays, [playKey]: Math.max(0, (s.plays[playKey] ?? 1) - 1) } }));
        stop();
      };
      try {
        await a.play();
      } catch {
        if (token !== run.current) return;
        setAudioError("Браузер не запустил звук. Попытка возвращена; повторите прослушивание.");
        setState((s) => ({ ...s, plays: { ...s.plays, [playKey]: Math.max(0, (s.plays[playKey] ?? 1) - 1) } }));
        stop();
      }
    };
    await playNext(0);
  }
  const audioButton = (id: string, sources: (string | undefined)[], task: Task, label: string) => {
    const limit = data.mode === "mock" && !done ? playbackLimit(task.part) : Infinity;
    const count = state.plays[id] ?? 0;
    const missing = !sources.length || sources.some((s) => !s);
    return (
      <div className="assessment-audio">
        <button
          type="button"
          disabled={Boolean(busy) || count >= limit || missing}
          onClick={() => void listen(id, sources, limit)}
        >
          {label}
        </button>
        <span>
          {missing
            ? "Запись недоступна"
            : Number.isFinite(limit)
              ? `Прослушиваний: ${count}/${limit}`
              : `Прослушиваний: ${count}`}
        </span>
      </div>
    );
  };
  function renderTask(id: string, task: Task, review = false) {
    const audio = task.part.includes("hoeren");
    const choices = Array.isArray(state.chosen[id]) ? state.chosen[id] : [];
    return (
      <article className="assessment-task" key={id}>
        <p className="kicker">{examLabel(task.part)}</p>
        <h3>
          <De text={task.title ?? id} />
        </h3>
        {task.situation && (
          <p>
            <De text={task.situation} />
          </p>
        )}
        {task.format !== "cloze" && (!audio || review) && task.text && (
          <div className="assessment-source">
            <De text={task.text} />
          </div>
        )}
        {audio &&
          !task.recordings &&
          audioButton(
            review ? `review:${id}` : id,
            task.script ? task.script.map((l) => l.audio) : [task.audio],
            task,
            "Прослушать разговор",
          )}
        {review && task.script && (
          <div className="assessment-source">
            {task.script.map((l, i) => (
              <p key={i}>
                <b>{l.who}: </b>
                <De text={l.de} />
              </p>
            ))}
          </div>
        )}
        {task.format === "cloze" && (
          <ClozeText
            task={task}
            disabled={review}
            values={Object.fromEntries((task.questions ?? []).map((_, i) => [i, state.values[`${id}:${i}`] ?? ""]))}
            onChange={(i, value) => setState((s) => ({ ...s, values: { ...s.values, [`${id}:${i}`]: value } }))}
          />
        )}
        {task.questions?.map((q, i) => {
          if (task.format === "cloze" && !review) return null;
          const value = state.values[`${id}:${i}`] ?? "";
          const correct = q.answers.some((a) => normalizeAnswer(a) === normalizeAnswer(value));
          return (
            <div className="worksheet-question" key={i}>
              {task.recordings?.[i] && (
                <>
                  {audioButton(
                    `${review ? "review:" : ""}${id}:${i}`,
                    [task.recordings[i].audio],
                    task,
                    `Прослушать запись ${i + 1}`,
                  )}
                  {review && (
                    <p className="assessment-source">
                      <De text={task.recordings[i].text} />
                    </p>
                  )}
                </>
              )}
              <label>
                <De text={`${i + 1}. ${q.prompt}`} />
                {q.options ? (
                  <select
                    disabled={review}
                    value={value}
                    onChange={(e) =>
                      setState((s) => ({ ...s, values: { ...s.values, [`${id}:${i}`]: e.target.value } }))
                    }
                  >
                    <option value="">Выберите…</option>
                    {q.options.map((o) => (
                      <option
                        key={o}
                        disabled={
                          task.uniqueOptions &&
                          !task.reusableOptions?.includes(o) &&
                          Object.entries(state.values).some(
                            ([key, value]) => key.startsWith(`${id}:`) && key !== `${id}:${i}` && value === o,
                          )
                        }
                      >
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    disabled={review}
                    value={value}
                    autoComplete="off"
                    onChange={(e) =>
                      setState((s) => ({ ...s, values: { ...s.values, [`${id}:${i}`]: e.target.value } }))
                    }
                  />
                )}
              </label>
              {review && (
                <p className="assessment-answer">
                  {correct ? "Верно." : "Нужно повторить."} Ответ: {q.answers.join(" / ")}
                </p>
              )}
            </div>
          );
        })}
        {task.kind === "message" && (task.choose || task.part === "b1-schreiben-1") && (
          <>
            {task.choose ? (
              <fieldset disabled={review}>
                <legend>
                  Выберите {task.choose} из {task.points?.length} пунктов
                </legend>
                {task.points?.map((p) => (
                  <label key={p}>
                    <input
                      type="checkbox"
                      checked={choices.includes(p)}
                      disabled={!choices.includes(p) && choices.length >= task.choose!}
                      onChange={() =>
                        setState((s) => ({
                          ...s,
                          chosen: {
                            ...s.chosen,
                            [id]: choices.includes(p) ? choices.filter((x) => x !== p) : [...choices, p],
                          },
                        }))
                      }
                    />
                    <De text={p} />
                  </label>
                ))}
              </fieldset>
            ) : (
              <div>
                <p>Ответьте на все четыре пункта.</p>
                <ul>
                  {task.points?.map((p) => (
                    <li key={p}>
                      <De text={p} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <label>
              Ваше сообщение
              <textarea
                disabled={review}
                rows={7}
                value={state.drafts[id] ?? ""}
                onChange={(e) => setState((s) => ({ ...s, drafts: { ...s.drafts, [id]: e.target.value } }))}
              />
            </label>
            <p>
              Слов: {wordCount(state.drafts[id] ?? "")}.
              {task.choose ? ` Выбрано пунктов: ${choices.length}/${task.choose}.` : ""}
            </p>
            {review && (
              <p>
                Проверьте с человеком или самостоятельно:{" "}
                {task.choose
                  ? "раскрыты ли три выбранных пункта и подходит ли объём примерно 40 слов"
                  : "раскрыты ли все четыре пункта и отвечает ли текст на исходное письмо"}
                , есть ли обращение и завершение, связны ли абзацы и понятен ли смысл? Проверьте грамматику и написание.
                Письмо автоматически не оценивается.
              </p>
            )}
          </>
        )}
        {review && Boolean(task.sample?.length) && (
          <div className="assessment-source">
            <p>Один из возможных вариантов:</p>
            {task.sample?.map((text, i) => (
              <div key={i}>
                <p>
                  <De text={text.de} />
                </p>
                {audioButton(`review:sample:${id}:${i}`, [text.audio], task, "Прослушать образец")}
              </div>
            ))}
          </div>
        )}
        {task.kind === "card" && (
          <>
            {task.theme && (
              <p>
                Thema: <De text={task.theme} />
              </p>
            )}
            <p>
              <De text={task.word ?? ""} />
            </p>
            {!review && section?.id === "preparation" ? (
              <p>
                Подготовьте ключевые слова для своей карточки. В паре каждый читает свою роль; полный текст ответа
                писать не нужно. Устная практика начнётся в следующем разделе.
              </p>
            ) : (
              <p>
                Произнесите свой ответ вслух. В парном задании по очереди задавайте вопросы, отвечайте и подтвердите
                решение.
              </p>
            )}
            {task.roles?.map((r) => (
              <details key={r.title}>
                <summary>{r.title}</summary>
                <p>
                  <De text={r.text} />
                </p>
              </details>
            ))}
            {review && (
              <p>
                {task.part === "b1-sprechen-1"
                  ? "Проверьте: вы представились, задали встречный вопрос и отреагировали на ответ?"
                  : task.part === "b1-sprechen-2"
                    ? "Проверьте: вы передали позицию своей карточки, добавили собственный опыт, спросили партнёра и отреагировали?"
                    : "Проверьте: собеседник понял ответ? Вы задали вопрос и отреагировали на его ответ? В совместном плане согласованы время, место и задачи?"}{" "}
                Оцените также понятность произношения, разнообразие выражений и правильность форм. Автоматической оценки
                речи нет.
              </p>
            )}
          </>
        )}
      </article>
    );
  }
  const remaining =
    section?.minutes && started
      ? Math.max(0, Math.ceil((state.startedAt! + section.minutes * 60000 - now) / 1000))
      : null;
  const wrongIds = new Set(result.details.filter((q) => !q.correct).map((q) => q.id));
  const links = data.review.filter((link) => !link.taskIds?.length || link.taskIds.some((id) => wrongIds.has(id)));
  return (
    <>
      <Topbar
        crumbs={[
          { label: level.code, href: `#/${level.id}` },
          { label: data.mode === "mock" ? "Пробник" : "Проверка" },
        ]}
      />
      <main className="assessment-page">
        <div className="kicker">{data.level === "b1" ? "FördeTreff" : "Küstenlogbuch"} · самостоятельная работа</div>
        <h1>{data.title}</h1>
        <p className="lede">{data.intro}</p>
        {saveError && <p role="alert">Браузер не разрешил сохранить попытку. Не закрывайте страницу до завершения.</p>}
        {!started && !done ? (
          <div className="assessment-start">
            <h2>Перед началом</h2>
            <ul>
              {data.sections.map((s) => (
                <li key={s.id}>
                  {s.title}
                  {s.minutes ? ` · ${s.minutes} мин` : ""}
                </li>
              ))}
            </ul>
            <p>
              {data.mode === "mock"
                ? data.level === "b1"
                  ? "Таймер каждого раздела продолжается после перезагрузки. Hören 1: каждую запись можно слушать один раз, Hören 2 и 3 — дважды. После завершения будут доступны транскрипты, ответы и свободное переслушивание."
                  : "Письменная часть: 20 + 50 минут. Записи доступны один или два раза по формату задания. Тексты аудио, ответы и разбор появятся после завершения. Устная часть — дополнительно, около 15 минут."
                : "Без таймера и ограничения прослушиваний. Сначала выполните все задания, затем откройте разбор."}
            </p>
            <p>
              Ответы сохраняются в этом браузере. Работа самостоятельная: проверка закрытых ответов не заменяет оценку
              письма и речи и не является результатом telc.
            </p>
            <button type="button" onClick={start}>
              Начать попытку
            </button>
          </div>
        ) : done ? (
          <section className="assessment-results">
            <h2>Разбор попытки</h2>
            <p>
              Закрытые задания: {result.correct} из {result.total}. Это число верных ответов, а не официальные баллы или
              прогноз сдачи экзамена.
            </p>
            {weighted && (
              <p>
                Взвешенный результат закрытых частей: {weighted.earned} из {weighted.possible}. Письмо (до 45) и речь
                (до 75) оцениваются отдельно человеком. Для письменной части требуется 135 из 225, для устной — 45 из
                75. Без этих двух оценок итог сдачи не определяется.
              </p>
            )}
            {links.length > 0 && (
              <div>
                <h3>Что повторить</h3>
                <ul>
                  {links.map((l) => (
                    <li key={l.label}>
                      <a href={`#/${l.level}/${l.topic}`}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.sections
              .filter((s) => s.id !== "preparation")
              .flatMap((s) => s.taskIds)
              .map((id) => renderTask(id, data.tasks[id], true))}
            <button
              type="button"
              onClick={() => {
                stop();
                setState(fresh());
                window.scrollTo(0, 0);
              }}
            >
              Новая попытка
            </button>
          </section>
        ) : (
          <section>
            <div className="assessment-status">
              <h2>{section.title}</h2>
              <p>
                Раздел {state.index + 1} из {data.sections.length}
                {remaining !== null
                  ? ` · Осталось ${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`
                  : ""}
              </p>
            </div>
            {audioError && <p role="alert">{audioError}</p>}
            {busy && (
              <button type="button" onClick={stop}>
                Остановить запись (прослушивание использовано)
              </button>
            )}
            {section.taskIds.map((id) => renderTask(id, data.tasks[id]))}
            <p>После завершения раздела ответы в нём изменить нельзя. Разбор откроется в конце.</p>
            <button type="button" onClick={next}>
              {state.index === data.sections.length - 1
                ? "Завершить и посмотреть разбор"
                : "Завершить раздел и продолжить"}
            </button>
            {section.id === "speaking" && (
              <button type="button" onClick={next}>
                Пропустить устную часть
              </button>
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

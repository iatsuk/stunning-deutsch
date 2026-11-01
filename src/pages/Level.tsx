import { Footer, Topbar, useTitle } from "../App";
import { assessmentCatalog, type Level } from "../content";
import { useProgress } from "../hooks";
import { De, Text, plural } from "../markup";

export function LevelPage({ level }: { level: Level }) {
  useTitle(`${level.code} — ${level.name} · Stunning Deutsch`);
  const progress = useProgress();
  const topicsFor = (part: string) => level.topics.filter((topic) => topic.exam.includes(part));
  const assessments = assessmentCatalog.filter(a => a.level === level.id);
  return (
    <>
      <Topbar crumbs={[{ label: level.code }]} nav={[["route", "Темы"], ...(assessments.length ? [["checks", "Проверки"] as [string,string]] : []), ["exam", "Экзамен"]]} />
      <main>
        <section className="hero level-hero">
          <div className="kicker">Уровень {level.code} · {level.exam}</div>
          <h1>
            {level.code} — {level.name}
          </h1>
          <p className="lede">{level.summary}</p>
          {level.can && (
            <div className="can">
              <h2>После этого уровня вы сможете</h2>
              <ul>
                {level.can.map((item) => (
                  <li key={item}>
                    <Text text={item} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="route" id="route">
          <div className="section-head">
            <div className="kicker">Маршрут</div>
            <h2>{plural(level.topics.length, ["тема", "темы", "тем"])} по порядку</h2>
            <p>
              Каждая тема опирается на предыдущие: знакомое правило возвращается в новой бытовой задаче.
              Идите сверху вниз; словарь остаётся справочником в конце каждого урока.
            </p>
          </div>
          {level.id === "a1" && <div className="moin-entry"><div className="kicker">Отдельная история по всем темам A1</div><h3>Дело о пропавшем Moin</h3><p>12 глав, 60 действий и одна детективная история. Русский рассказ постепенно уступает место немецкому. Можно проходить вместе с уроками или для повторения.</p><a href="#/a1/moin">Открыть сюжетную игру →</a></div>}
          <ol className="route-list">
            {level.topics.map((topic) => {
              const solved = progress.solved(topic.id);
              const total = topic.counts.exercises;
              return (
                <li key={topic.id} data-done={(total > 0 && solved >= total) || undefined}>
                  <a className="stop" href={`#/${level.id}/${topic.id}`}>
                    <span className="stop-dot" aria-hidden="true" />
                    <span className="stop-n">{String(topic.order).padStart(2, "0")}</span>
                    <span className="stop-body">
                      <span className="stop-title">
                        <De text={topic.title} />
                        <span className="stop-ru">{topic.ru}</span>
                      </span>
                      <span className="stop-lede">
                        <Text text={topic.lede} />
                      </span>
                      <span className="stop-tags">
                        {topic.grammar.map((g) => (
                          <span key={g} className="tag">
                            {g}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span className="stop-progress" title={`Решено упражнений: ${solved} из ${total}`}>
                      <span className="meter">
                        <i style={{ width: `${(solved / Math.max(1, total)) * 100}%` }} />
                      </span>
                      {solved}/{total}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </section>

        {assessments.length > 0 && <section className="exam" id="checks"><div className="section-head"><div className="kicker">Самостоятельно</div><h2>Проверки и пробник</h2><p>Входная проверка и новые ситуации после блоков уроков. Доступ к темам открыт независимо от результата. Ответы разбираются после попытки; письмо и речь требуют отдельной проверки.</p></div><ol className="assessment-links">{assessments.map(a=><li key={a.id}><a href={`#/${level.id}/${a.id}`}>{a.title}</a><p>{a.intro}</p></li>)}</ol></section>}
        {level.examInfo && (
          <section className="exam" id="exam">
            <div className="section-head">
              <div className="kicker">Экзамен</div>
              <h2>{level.exam}</h2>
              <p>{level.examInfo.note}</p>
            </div>
            <div className="exam-grid">
              {level.examInfo.modules.map((module) => (
                <article key={module.id} className="exam-module">
                  <header>
                    <De text={module.de} className="exam-de" />
                    <span>{module.ru}</span>
                    <span className="exam-minutes">{module.minutes} мин</span>
                  </header>
                  <ol>
                    {module.parts.map((part, i) => {
                      const topics = topicsFor(part.id);
                      return (
                        <li key={part.id}>
                          <div className="exam-teil">Teil {i + 1}</div>
                          <p>{part.what}</p>
                          <div className="exam-how">{part.how}</div>
                          {topics.length > 0 && (
                            <div className="exam-topics">
                              Тренируется в темах{" "}
                              {topics.map((topic) => (
                                <a key={topic.id} href={`#/${level.id}/${topic.id}`} title={topic.ru}>
                                  {topic.order}
                                </a>
                              ))}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

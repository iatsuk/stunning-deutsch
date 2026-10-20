import { useEffect, useMemo, useRef, useState } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { examLabel, loadTopic, type Beat, type Level, type Topic } from "../content";
import { scrollToSection, useMobile, useScrollIndex } from "../hooks";
import { De, Text, plural } from "../markup";
import { Stage } from "../stage/Stage";
import { WordCard } from "../stage/Words";
import { Trainer } from "../trainer/Trainer";
import { CaseFile } from "../case/Case";

export function TopicPage({ level, topicId }: { level: Level; topicId: string }) {
  const [topic, setTopic] = useState<Topic | null | undefined>(undefined);
  useEffect(() => {
    let alive = true;
    loadTopic(topicId).then((loaded) => alive && setTopic(loaded));
    return () => {
      alive = false;
    };
  }, [topicId]);
  const meta = level.topics.find((t) => t.id === topicId);
  useTitle(meta ? `${meta.ru} · ${level.code} · Stunning Deutsch` : "Stunning Deutsch");

  if (topic === null || !meta) {
    return (
      <>
        <Topbar crumbs={[{ label: level.code, href: `#/${level.id}` }]} />
        <main className="missing">
          <h1>Такой темы нет</h1>
          <a href={`#/${level.id}`}>Все темы уровня {level.code}</a>
        </main>
      </>
    );
  }

  const index = level.topics.indexOf(meta);
  const prev = level.topics[index - 1];
  const next = level.topics[index + 1];

  return (
    <>
      <Topbar
        crumbs={[{ label: level.code, href: `#/${level.id}` }, { label: meta.ru }]}
        nav={[
          ["story", "Разбор"],
          ["summary", "Шпаргалка"],
          ...(topic?.case ? [["case", "Дело"] as [string, string]] : []),
          ["trainer", "Тренажёр"],
          ["vocabulary", "Словарь"],
        ]}
      />
      <main>
        <section className="hero topic-hero">
          <div className="kicker">
            {level.code} · тема {meta.order} из {level.topics.length}
          </div>
          <h1>
            <De text={meta.title} />
          </h1>
          <p className="hero-ru">{meta.ru}</p>
          <p className="lede">
            <Text text={meta.lede} />
          </p>
          <div className="topic-facts">
            <div className="goals">
              <h2>Вы научитесь</h2>
              <ul>
                {meta.goals.map((goal) => (
                  <li key={goal}>
                    <Text text={goal} />
                  </li>
                ))}
              </ul>
            </div>
            <dl className="facts">
              <div>
                <dt>Грамматика</dt>
                <dd>
                  {meta.grammar.map((g) => (
                    <span key={g} className="tag">
                      {g}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Готовит к экзамену</dt>
                <dd>
                  {meta.exam.map((part) => (
                    <span key={part} className="tag tag-exam">
                      {examLabel(part)}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>В теме</dt>
                <dd className="facts-counts">
                  {plural(meta.counts.words, ["слово", "слова", "слов"])} ·{" "}
                  {plural(meta.counts.questions, ["вопрос", "вопроса", "вопросов"])} ·{" "}
                  {plural(meta.counts.exercises, ["упражнение", "упражнения", "упражнений"])}
                </dd>
              </div>
            </dl>
          </div>
          {topic && (
            <ol className="hero-chapters">
              {topic.chapters.map((chapter, i) => (
                <li key={chapter.id}>
                  <button type="button" onClick={() => scrollToSection(`chapter-${chapter.id}`)}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {chapter.title}
                  </button>
                </li>
              ))}
            </ol>
          )}
          <div className="hero-meta">Листайте — сцена следует за текстом</div>
        </section>

        {topic ? (
          <>
            <Story topic={topic} />
            <Summary topic={topic} />
            {topic.case && (
              <section className="case-section" id="case">
                <div className="section-head">
                  <div className="kicker">Дело темы</div>
                  <h2>
                    <De text={topic.case.title} />
                  </h2>
                  {topic.case.ru && <p>{topic.case.ru}</p>}
                </div>
                <CaseFile topic={topic} investigation={topic.case} />
              </section>
            )}
            <section className="trainer-section" id="trainer">
              <div className="section-head">
                <div className="kicker">Тренажёр</div>
                <h2>Закрепите тему</h2>
                <p>
                  Упражнения проверяются сразу, решённые сохраняются в этом браузере. «Шпион» собран из фраз темы,
                  артикли и карточки — из её слов.
                </p>
              </div>
              <Trainer topic={topic} />
            </section>
            <Vocabulary topic={topic} />
          </>
        ) : (
          <div className="loading">Загружаем тему…</div>
        )}

        <nav className="topic-nav" aria-label="Соседние темы">
          {prev ? (
            <a href={`#/${level.id}/${prev.id}`}>
              <span>← Тема {prev.order}</span>
              <De text={prev.title} />
            </a>
          ) : (
            <a href={`#/${level.id}`}>
              <span>←</span>
              Все темы {level.code}
            </a>
          )}
          {next ? (
            <a href={`#/${level.id}/${next.id}`} data-next>
              <span>Тема {next.order} →</span>
              <De text={next.title} />
            </a>
          ) : (
            <a href={`#/${level.id}`} data-next>
              <span>→</span>
              Все темы {level.code}
            </a>
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}

function Story({ topic }: { topic: Topic }) {
  const items = useRef<(HTMLElement | null)[]>([]);
  const mobile = useMobile();
  // На телефоне текст виден только под закреплённой сценой, поэтому линия ниже.
  const index = useScrollIndex(items, mobile ? 0.74 : 0.55);
  const [answered, setAnswered] = useState<Set<string>>(() => new Set());
  const beat = topic.beats[Math.min(index, topic.beats.length - 1)];
  const numbers = useMemo(() => {
    let n = 0;
    return new Map(topic.beats.filter((b) => b.question).map((b) => [b.id, ++n]));
  }, [topic]);
  const scene = beat.question && !answered.has(beat.id) ? (beat.sceneBefore ?? beat.scene) : beat.scene;
  const chapter = topic.chapters[beat.chapterIndex];

  return (
    <section className="story" id="story">
      <div className="stage">
        <div className="stage-head">
          <span className="stage-step" data-question={beat.question ? true : undefined}>
            {beat.question
              ? `Вопрос ${numbers.get(beat.id)} / ${numbers.size}`
              : `${String(beat.chapterIndex + 1).padStart(2, "0")} · ${chapter.title}`}
          </span>
          <span className="stage-title">{beat.question ? <Text text={beat.question} /> : <Text text={beat.stepTitle} />}</span>
        </div>
        <Stage topic={topic} scene={scene} />
        <ol className="stage-steps" aria-label="Главы">
          {topic.chapters.map((c, i) => (
            <li key={c.id} data-state={i < beat.chapterIndex ? "done" : i === beat.chapterIndex ? "now" : undefined}>
              <span>{c.title}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="beats">
        {topic.beats.map((b, i) => (
          <article
            key={b.id}
            className="beat"
            ref={(el) => {
              items.current[i] = el;
            }}
            data-active={i === index || undefined}
            id={topic.beats.findIndex((x) => x.chapterIndex === b.chapterIndex) === i ? `chapter-${topic.chapters[b.chapterIndex].id}` : undefined}
          >
            {b.indexInStep === 0 && (
              <h2>
                <span>
                  {String(b.chapterIndex + 1).padStart(2, "0")} · {topic.chapters[b.chapterIndex].title}
                </span>
                <Text text={b.stepTitle} />
              </h2>
            )}
            {b.question ? (
              <Question
                beat={b}
                number={numbers.get(b.id)!}
                total={numbers.size}
                open={answered.has(b.id)}
                onOpen={() => setAnswered((prev) => new Set(prev).add(b.id))}
              />
            ) : (
              <p>
                <Text text={b.read} />
              </p>
            )}
          </article>
        ))}
        <div className="beats-end" />
      </div>
    </section>
  );
}

function Question({ beat, number, total, open, onOpen }: { beat: Beat; number: number; total: number; open: boolean; onOpen: () => void }) {
  return (
    <div className="question">
      <div className="question-kicker">
        Вопрос {number} / {total}
      </div>
      <h3>
        <Text text={beat.question!} />
      </h3>
      {open ? (
        <p>
          <Text text={beat.read} />
        </p>
      ) : (
        <div className="question-hidden">
          <p>Попробуйте ответить сами — вслух или на бумаге, — а потом сверьтесь.</p>
          <button type="button" onClick={onOpen}>
            Показать ответ
          </button>
        </div>
      )}
    </div>
  );
}

/** Шпаргалка: по тезису на фрагмент, сгруппировано по главам. */
function Summary({ topic }: { topic: Topic }) {
  return (
    <section className="summary" id="summary">
      <div className="section-head">
        <div className="kicker">Шпаргалка</div>
        <h2>Вся тема в тезисах</h2>
        <p>По одной мысли на фрагмент разбора. Удобно повторить перед следующей темой или перед экзаменом.</p>
      </div>
      <div className="summary-grid">
        {topic.chapters.map((chapter, i) => {
          const beats = topic.beats.filter((b) => b.chapterIndex === i);
          if (!beats.length) return null;
          return (
            <section key={chapter.id} className="summary-chapter">
              <h3>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {chapter.title}
              </h3>
              <ul>
                {beats.map((b) => (
                  <li key={b.id}>
                    <Text text={b.point} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}

function Vocabulary({ topic }: { topic: Topic }) {
  return (
    <section className="vocabulary" id="vocabulary">
      <div className="section-head">
        <div className="kicker">Словарь темы</div>
        <h2>Все слова</h2>
        <p>Нажмите на карточку, чтобы послушать. Существительные звучат вместе с формой множественного числа.</p>
      </div>
      {Object.entries(topic.words).map(([id, group]) => (
        <div key={id} className="vocab-group">
          <h3>
            <De text={group.title} />
            <span>{group.ru}</span>
          </h3>
          <ul className="word-grid vocab-grid">
            {group.items.map((word, i) => (
              <li key={i}>
                <WordCard word={word} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

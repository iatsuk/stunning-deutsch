import { useState } from "react";
import { Footer, Topbar, useTitle } from "../App";
import data from "../generated/a1-reference.json";
import { chapterRange, grammarGroups, wordGroups, type Reference } from "../reference/logic";
import { WordCard } from "../stage/Words";
import { RuleCard } from "../story/RuleCard";

const reference = data as unknown as Reference;

/** Справочник A1: вся грамматика и все слова экзамена, которые даёт история, с поиском. */
export function ReferencePage() {
  useTitle("Справочник A1 · Stunning Deutsch");
  const [query, setQuery] = useState("");
  const grammar = grammarGroups(reference.grammar, query);
  const words = wordGroups(reference, query);
  const wordCount = words.reduce((n, g) => n + g.words.length, 0);
  const pointCount = grammar.reduce((n, g) => n + g.points.length, 0);
  return (
    <>
      <Topbar crumbs={[{ label: "A1", href: "#/a1" }, { label: "Справочник" }]} nav={[["grammar", "Правила"], ["words", "Слова"]]} />
      <main>
        <section className="hero">
          <div className="kicker">Справочник A1 · Start Deutsch 1</div>
          <h1>Грамматика и слова A1</h1>
          <p className="lede">
            Все правила и слова экзамена, которые даёт история «Дело о пропавшем Moin». У каждого видно,
            в какой главе оно встречается. Справочник собирается из тех же данных, что и курс.
          </p>
          <input
            className="reference-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск: Bahnhof, вокзал, Dativ…"
            aria-label="Поиск по справочнику"
          />
        </section>

        <section className="route" id="grammar">
          <div className="section-head">
            <div className="kicker">Грамматика</div>
            <h2>{pointCount === reference.grammar.length ? `${pointCount} правил экзамена` : `Найдено правил: ${pointCount}`}</h2>
            <p>Нажмите на правило: откроется объяснение с таблицей или схемой предложения — то же, что в игре.</p>
          </div>
          {grammar.map(({ group, points }) => (
            <div key={group} className="vocab-group">
              <h3>{group}</h3>
              {points.map((point) => (
                <details key={point.id} className="reference-point">
                  <summary>
                    <span>{point.title}</span>
                    <span className="reference-chapters">главы {chapterRange(point.chapters)}</span>
                  </summary>
                  {point.rules.map((id) => (
                    <RuleCard key={id} id={id} open />
                  ))}
                </details>
              ))}
            </div>
          ))}
        </section>

        <section className="vocabulary" id="words">
          <div className="section-head">
            <div className="kicker">Слова</div>
            <h2>{wordCount === reference.words.length ? `${wordCount} слов A1` : `Найдено слов: ${wordCount}`}</h2>
            <p>
              Словарь экзамена, слова уроков и пробника. Слова сгруппированы по главе, где они впервые встречаются. Нажмите на карточку, чтобы послушать;
              существительные звучат вместе с формой множественного числа.
            </p>
          </div>
          {words.map(({ chapter, words: list }) => (
            <div key={chapter.n} className="vocab-group">
              <h3>
                Глава {chapter.n} · {chapter.topic}
                <span>{chapter.title}</span>
              </h3>
              <ul className="word-grid vocab-grid">
                {list.map((word) => (
                  <li key={word.de}>
                    <WordCard word={word} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {!wordCount && !pointCount && <p className="reference-empty">Ничего не найдено. Попробуйте другое слово.</p>}
        </section>
      </main>
      <Footer />
    </>
  );
}

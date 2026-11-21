import { PlayButton } from "../markup";
import { storyAudio, wordInfo } from "./audio";
import type { Fact, Note } from "./casebook";
import { REPORTER, type Headline } from "./newspaper";
import { POSTCARDS, type Postcard } from "./postcards";
import type { Episode } from "./types";

/** Улики и предметы: улика — заголовок и текст, предмет — значок и немецкое название с переводом. */
export function NoteList({ notes }: { notes: Note[] }) {
  return (
    <ul>
      {notes.map((n, i) => (
        <li key={i}>
          {n.t === "clue" ? (
            <>
              <b>{n.title}.</b> {n.text}
            </>
          ) : (
            <>
              {n.icon} <span lang="de">{n.de}</span> — {n.ru}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Всё дело: найденное по главам, от первой к текущей. */
export function CaseNotes({ groups, chapters }: { groups: { chapter: number; notes: Note[] }[]; chapters: Episode[] }) {
  if (!groups.length) return <p>Пока пусто. Улики и предметы появятся по ходу сцен.</p>;
  return (
    <>
      {groups.map(({ chapter, notes }) => (
        <section key={chapter} className="moin-notebook-group">
          <h3>
            Глава {chapter} · {chapters[chapter - 1].title}
          </h3>
          <NoteList notes={notes} />
        </section>
      ))}
    </>
  );
}

/** Досье героев: что о каждом уже известно — реплики с записью и переводом. */
export function Dossier({ heroes }: { heroes: { name: string; facts: Fact[] }[] }) {
  if (!heroes.length) return <p>Пока пусто. Факты о героях появятся, когда вы с ними познакомитесь.</p>;
  return (
    <>
      {heroes.map((hero) => (
        <section key={hero.name} className="moin-notebook-group">
          <h3>{hero.name}</h3>
          <ul>
            {hero.facts.map((fact) => (
              <li key={fact.de}>
                <span lang="de">{fact.de}</span> <PlayButton src={storyAudio(fact.de, fact.voice)} />
                <br />
                <small>{fact.ru}</small>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

/** Открытки о Германии: полученные — целиком, сколько ещё впереди — числом. */
export function Postcards({ cards }: { cards: Postcard[] }) {
  return (
    <>
      <p>
        Открыток: {cards.length} из {POSTCARDS.length}.{" "}
        {cards.length < POSTCARDS.length && "Новые придут с главами."}
      </p>
      {cards.map((card) => (
        <section key={card.id} className="moin-notebook-group">
          <h3>{card.title}</h3>
          <p>
            <span lang="de">{card.de}</span> <PlayButton src={wordInfo(card.de)?.audio} /> — {wordInfo(card.de)?.ru}
          </p>
          <p>{card.text}</p>
        </section>
      ))}
    </>
  );
}

/** Газета Kieler Woche: первая новость крупно, остальные — по тому, как прошло дело игрока. */
export function Newspaper({ headlines, learned }: { headlines: Headline[]; learned: number }) {
  const [front, ...rest] = headlines;
  return (
    <section className="moin-newspaper">
      <div className="moin-newspaper-name" lang="de">Kieler Woche Zeitung</div>
      <h3 lang="de">
        {front.de} <PlayButton src={storyAudio(front.de, REPORTER)} />
      </h3>
      <small>{front.ru}</small>
      <ul>
        {rest.map((h) => (
          <li key={h.de}>
            <span lang="de">{h.de}</span> <PlayButton src={storyAudio(h.de, REPORTER)} />
            <br />
            <small>{h.ru}</small>
          </li>
        ))}
      </ul>
      <p>Слов и фраз в долгой памяти: {learned}.</p>
    </section>
  );
}

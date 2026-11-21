import { PlayButton } from "../markup";
import { storyAudio } from "./audio";
import type { Fact, Note } from "./casebook";
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

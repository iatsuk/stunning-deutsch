import { useEffect, useRef, useState } from "react";
import { PlayButton } from "../markup";
import { storyAudio, wordInfo } from "./audio";
import type { Fact, Note } from "./casebook";
import { REPORTER, type Headline } from "./newspaper";
import { postcardFile, savePostcard } from "./postcardImage";
import { POSTCARDS, postcardPictures, type Postcard } from "./postcards";
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

/** Открытки о Германии: стопка полученных и рубашки тех, что придут с главами; открытая карточка — поверх страницы. */
export function Postcards({ cards }: { cards: Postcard[] }) {
  const [open, setOpen] = useState<Postcard | null>(null);
  return (
    <>
      <p>
        Открыток: {cards.length} из {POSTCARDS.length}.{" "}
        {cards.length < POSTCARDS.length && "Новые придут с главами."}
      </p>
      <ul className="moin-postcards">
        {POSTCARDS.map((card) =>
          cards.includes(card) ? (
            <li key={card.id}>
              <button type="button" onClick={() => setOpen(card)}>
                <img src={`${import.meta.env.BASE_URL}${postcardPictures(card.id).thumb}`} alt="" width={300} height={200} loading="lazy" />
                <span>{card.title}</span>
              </button>
            </li>
          ) : (
            <li key={card.id} className="is-locked">
              <span aria-hidden="true">?</span>
              <span className="moin-hidden-label">Закрытая открытка</span>
            </li>
          ),
        )}
      </ul>
      {open && <PostcardDialog card={open} onClose={() => setOpen(null)} />}
    </>
  );
}

/** Открытая карточка: иллюстрация, слово с записью, заметка и кнопка «Сохранить открытку». */
function PostcardDialog({ card, onClose }: { card: Postcard; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [failed, setFailed] = useState(false);
  // Номер попытки: «Попробовать ещё раз» готовит открытку заново, например после обрыва сети.
  const [attempt, setAttempt] = useState(0);
  const word = wordInfo(card.de);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  // Файл готовится заранее: «Поделиться» на iPhone работает только сразу после нажатия.
  useEffect(() => {
    let live = true;
    setFile(null);
    setFailed(false);
    postcardFile(card, word?.ru ?? "", import.meta.env.BASE_URL).then(
      (f) => live && setFile(f),
      () => live && setFailed(true),
    );
    return () => {
      live = false;
    };
  }, [card, word?.ru, attempt]);
  return (
    <dialog ref={dialog} className="moin-postcard" aria-label={card.title} onClose={onClose}>
      <img src={`${import.meta.env.BASE_URL}${postcardPictures(card.id).full}`} alt={card.alt} width={1080} height={720} />
      <h3>{card.title}</h3>
      <p>
        <span lang="de">{card.de}</span> <PlayButton src={word?.audio} /> — {word?.ru}
      </p>
      <p>{card.text}</p>
      <div className="moin-postcard-actions">
        {failed ? (
          <button type="button" className="primary" onClick={() => setAttempt(attempt + 1)}>
            Не получилось. Попробовать ещё раз
          </button>
        ) : (
          <button type="button" className="primary" disabled={!file} onClick={() => file && savePostcard(file)}>
            {file ? "Сохранить открытку" : "Готовим открытку…"}
          </button>
        )}
        <button type="button" className="link-button" onClick={() => dialog.current?.close()}>
          Закрыть
        </button>
      </div>
    </dialog>
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

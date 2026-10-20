import type { Word, WordGroup } from "../content";
import { play, usePlaying } from "../hooks";
import { De, GENDER_LABEL, withoutArticle } from "../markup";

export function WordsView({ group, reveal, focus }: { group: WordGroup; reveal?: number; focus?: number[] }) {
  const shown = reveal ?? group.items.length;
  const hasNouns = group.items.some((item) => item.gender);
  return (
    <div className="words">
      <header className="view-head">
        <div>
          <De className="view-title" text={group.title} />
          <div className="view-sub">{group.ru}</div>
        </div>
        {hasNouns && <GenderLegend />}
      </header>
      <ul className="word-grid" data-count={group.items.length > 9 ? "many" : undefined}>
        {group.items.map((word, i) => (
          <li
            key={i}
            data-hidden={i >= shown || undefined}
            data-focus={focus?.includes(i) || undefined}
            data-dim={(focus?.length && !focus.includes(i)) || undefined}
          >
            <WordCard word={word} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WordCard({ word }: { word: Word }) {
  const playing = usePlaying();
  return (
    <button
      type="button"
      className="word"
      data-gender={word.gender ?? undefined}
      data-playing={playing === word.audio || undefined}
      onClick={() => play(word.audio)}
      title="Нажмите, чтобы послушать"
    >
      <span className="word-main">
        {word.gender && <span className="article">{GENDER_LABEL[word.gender]}</span>}
        <De text={word.gender ? withoutArticle(word.de) : word.de} className="word-de" />
      </span>
      {word.gender && (
        <span className="word-plural">
          {word.gender === "pl" ? "только мн. ч." : word.plural ? <De text={`die ${word.plural}`} /> : "без мн. ч."}
        </span>
      )}
      <span className="word-ru">{word.ru}</span>
      {word.note && <span className="word-note">{word.note}</span>}
    </button>
  );
}

export function GenderLegend() {
  return (
    <div className="legend" aria-label="Цвет рода">
      <span data-gender="m">der</span>
      <span data-gender="f">die</span>
      <span data-gender="n">das</span>
      <span data-gender="pl">мн. ч.</span>
    </div>
  );
}

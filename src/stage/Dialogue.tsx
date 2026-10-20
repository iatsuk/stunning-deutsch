import { useEffect, useRef } from "react";
import { isDimmed, type Dialogue } from "../content";
import { playAll, stopAudio, usePlaying, useTranslation } from "../hooks";
import { De, PlayButton } from "../markup";

export function DialogueView({
  dialogue,
  reveal,
  focus,
  fresh,
}: {
  dialogue: Dialogue;
  reveal?: number;
  focus?: number[];
  fresh?: number[];
}) {
  const [showRu, setShowRu] = useTranslation();
  const playing = usePlaying();
  const list = useRef<HTMLOListElement>(null);
  const shown = dialogue.lines.slice(0, reveal ?? dialogue.lines.length);
  const speakers = Object.keys(dialogue.people);
  const sources = shown.map((line) => line.audio);
  const playingAll = sources.length > 1 && sources.includes(playing);

  // Лента докручивается к тому, о чём сейчас текст: к новым репликам, а если
  // новых нет — к выделенным. Если они не помещаются, первая встаёт наверх,
  // чтобы ни одна новая реплика не проскочила мимо.
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const items = [...el.children] as HTMLElement[];
    const wanted = fresh?.length ? fresh : focus?.length ? focus : [items.length - 1];
    const targets = wanted.map((i) => items[i]).filter(Boolean);
    if (!targets.length) return;
    const first = targets[0].offsetTop - 8;
    const last = targets[targets.length - 1].offsetTop + targets[targets.length - 1].offsetHeight + 8;
    const top = last - first <= el.clientHeight ? Math.max(0, Math.min(first, last - el.clientHeight)) : first;
    el.scrollTo({ top, behavior: "smooth" });
  }, [shown.length, focus, fresh]);

  return (
    <div className="dialogue">
      <header className="view-head">
        <div>
          <De className="view-title" text={dialogue.title} />
          <div className="view-sub">
            {dialogue.ru}
            {dialogue.place && <span className="place">{dialogue.place}</span>}
          </div>
        </div>
        <div className="view-tools">
          <button
            type="button"
            className="chip-button"
            data-active={playingAll || undefined}
            onClick={() => (playingAll ? stopAudio() : playAll(sources))}
          >
            {playingAll ? "■ Стоп" : "▶ Весь диалог"}
          </button>
          <button
            type="button"
            className="chip-button"
            aria-pressed={showRu}
            onClick={() => setShowRu(!showRu)}
            title="Показать или скрыть перевод реплик"
          >
            {showRu ? "Перевод: вкл" : "Перевод: выкл"}
          </button>
        </div>
      </header>
      <ol className="lines" ref={list}>
        {shown.map((line, i) => {
          const person = dialogue.people[line.who];
          const side = speakers.indexOf(line.who) === 0 ? "left" : "right";
          return (
            <li
              key={i}
              className="line"
              data-side={side}
              data-focus={focus?.includes(i) || undefined}
              data-dim={isDimmed(i, focus, fresh) || undefined}
              data-playing={playing === line.audio || undefined}
            >
              <span className="avatar" data-speaker={speakers.indexOf(line.who) % 4} aria-hidden="true">
                {person.name.replace(/^(Frau|Herr) /, "").charAt(0)}
              </span>
              <div className="bubble">
                <div className="bubble-head">
                  <span className="who">{person.name}</span>
                  <PlayButton src={line.audio} />
                </div>
                <De text={line.de} className="bubble-de" />
                {showRu && <div className="bubble-ru">{line.ru}</div>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

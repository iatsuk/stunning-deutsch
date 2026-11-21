import { useEffect, useRef, useState, type ReactNode } from "react";
import { stopAudio } from "../hooks";
import type { Cards } from "./memory";
import { KIND_NAMES, metChapters, playedGames, type PlayedGame } from "./practice";
import { practiceMechs, practiceReview, sceneUnits, type Lookup, type Mech, type Sources } from "./review";
import { FRAMES, SceneReview } from "./ReviewView";
import { RuleCard } from "./RuleCard";
import { anweisung } from "./scene";
import { Embedded } from "./SceneView";
import type { Challenge, Episode } from "./types";

export function PracticeView({
  drafts, cards, chapters, lookup, sources, words, rich, quiet, onGrade, onClose,
}: {
  drafts: Record<string, string[]>;
  cards: Cards;
  chapters: Episode[];
  lookup: Lookup;
  sources: Sources;
  words: string[];
  rich: (text: string, seen?: Set<string>) => ReactNode;
  quiet: boolean;
  onGrade: (units: string[], missed: string[]) => void;
  onClose: () => void;
}) {
  const [filter, setFilter] = useState(0);
  const [round, setRound] = useState(0);
  const [mech, setMech] = useState<Mech | null>(null);
  const [kind, setKind] = useState<Challenge["kind"] | null>(null);
  const [selected, setSelected] = useState<PlayedGame | null>(null);
  const [replay, setReplay] = useState(0);
  const [finished, setFinished] = useState(false);
  const view = useRef<HTMLDivElement>(null);
  const met = metChapters(chapters, drafts);
  const units = filter
    ? chapters[filter - 1].beats.flatMap((b) => sceneUnits(b, lookup))
    : Object.keys(cards);
  const ctx = { lookup, sources, words, seed: `practice-${round}-${filter}`, chapter: Math.max(0, ...met) };
  const mechs = practiceMechs(units, cards, ctx);
  const games = playedGames(chapters, drafts).filter((g) =>
    (!filter || g.chapter === filter) && !["play", "oral", "letter", "lock"].includes(g.node.c.kind),
  );
  const kinds = [...new Set(games.map((g) => g.node.c.kind))].sort((a, b) => KIND_NAMES[a].localeCompare(KIND_NAMES[b], "ru"));

  useEffect(() => {
    const heading = view.current?.querySelector("h2");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus();
    }
  }, [mech, kind, selected, replay]);
  useEffect(() => () => stopAudio(), []);

  function menu() {
    stopAudio();
    setMech(null);
    setKind(null);
    setSelected(null);
  }

  const instruction = selected && anweisung(selected.node, selected.chapter);
  return (
    <div className="moin-practice" ref={view}>
      {mech ? (
        <SceneReview
          key={`practice-${mech}-${filter}`}
          reason="practice"
          rounds={Infinity}
          next={practiceReview(mech, units, cards, ctx)}
          sources={sources}
          onGrade={(units, missed) => {
            onGrade(units, missed);
            setRound((r) => r + 1);
          }}
          onClose={menu}
        />
      ) : selected ? (
        <div className="moin-drill">
          <div className="kicker">Тренировка · Глава {selected.chapter}</div>
          <h2>{KIND_NAMES[selected.node.c.kind]}</h2>
          {instruction && <p className="moin-anweisung" lang="de">{instruction}</p>}
          <Embedded
            key={`${selected.scene}-${selected.key}-${replay}`}
            node={{ ...selected.node, outcome: undefined }}
            seed={`practice-${selected.scene}-${selected.key}-${replay}`}
            miss={() => {}}
            rich={rich}
            quiet={quiet}
            done={() => setFinished(true)}
          />
          {selected.node.rule?.map((id) => <RuleCard key={id} id={id} open={false} />)}
          {finished && <p role="status">Готово</p>}
          <div className="moin-drill-actions">
            {finished && (
              <button type="button" className="primary" onClick={() => {
                stopAudio();
                setFinished(false);
                setReplay((r) => r + 1);
              }}>
                Сыграть ещё раз
              </button>
            )}
            <button type="button" className="link-button" onClick={() => {
              stopAudio();
              setSelected(null);
            }}>
              К списку
            </button>
          </div>
        </div>
      ) : (
        <div className="moin-drill">
          <div className="kicker">Тренировка</div>
          <h2>{kind ? KIND_NAMES[kind] : "Игры без сюжета"}</h2>
          <label className="moin-practice-filter">
            Главы
            <select value={filter} onChange={(e) => {
              stopAudio();
              setFilter(Number(e.target.value));
              setKind(null);
            }}>
              <option value={0}>Все главы</option>
              {met.map((n) => <option key={n} value={n}>Глава {n}</option>)}
            </select>
          </label>
          {kind ? (
            <>
              <div className="moin-tiles moin-practice-games">
                {games.filter((g) => g.node.c.kind === kind).map((g) => (
                  <button type="button" key={`${g.scene}-${g.key}`} onClick={() => {
                    stopAudio();
                    setSelected(g);
                    setFinished(false);
                    setReplay(0);
                  }}>
                    {g.node.task}<small>Глава {g.chapter}</small>
                  </button>
                ))}
              </div>
              <button type="button" className="link-button" onClick={menu}>К тренировке</button>
            </>
          ) : (
            <>
              <h3>Слова и фразы</h3>
              <div className="moin-tiles moin-practice-games">
                {mechs.map((m) => (
                  <button type="button" key={m} onClick={() => {
                    stopAudio();
                    setMech(m);
                  }}>{FRAMES[m].title}</button>
                ))}
              </div>
              {!mechs.length && <p>Здесь пока не из чего собрать игру.</p>}
              <h3>Игры сцен</h3>
              <div className="moin-tiles moin-practice-games">
                {kinds.map((k) => (
                  <button type="button" key={k} onClick={() => {
                    stopAudio();
                    setKind(k);
                  }}>
                    {KIND_NAMES[k]}<small>{games.filter((g) => g.node.c.kind === k).length}</small>
                  </button>
                ))}
              </div>
              {!kinds.length && <p>Здесь появятся мини-игры, которые вы сыграли в сценах.</p>}
            </>
          )}
          <div className="moin-drill-actions">
            <button type="button" className="link-button" onClick={onClose}>Вернуться к делу →</button>
          </div>
        </div>
      )}
    </div>
  );
}

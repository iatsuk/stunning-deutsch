import { useState } from "react";
import type { AdventureQuote } from "../content";
import { playAll, usePlaying } from "../hooks";
import { De } from "../markup";

export function Clue({ quotes, reading = false, onHelp }: { quotes: AdventureQuote[]; reading?: boolean; onHelp: () => void }) {
  const available = quotes.some((q) => q.audio);
  const [text, setText] = useState(reading || !available);
  const playing = usePlaying();
  return <div className="adventure-clue">
    <div className="clue-controls">
      <span className="clue-sender">{[...new Set(quotes.map((q) => q.name))].join(" · ")}</span>
      {available && <button type="button" onClick={() => playAll(quotes.map((q) => q.audio))}>
        {quotes.some((q) => q.audio === playing) ? "↻ Слушать сначала" : "▶ Послушать"}
      </button>}
      <button type="button" aria-expanded={text} onClick={() => { if (!text && !reading) onHelp(); setText(!text); }}>
        {text ? "Скрыть текст" : "Показать текст"}
      </button>
    </div>
    {text ? <blockquote>{quotes.map((q, i) => <p key={i}><De text={q.de} /></p>)}</blockquote>
      : <p className="clue-hidden">Сначала послушайте сообщение. Если удобнее читать, откройте текст.</p>}
    {!reading && text && <small>Текстовая подсказка открыта — сейчас вы тренируете чтение.</small>}
  </div>;
}

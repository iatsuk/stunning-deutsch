import type { ReactNode } from "react";
import { play, usePlaying } from "./hooks";

// Разметка контента:
//   *…*  в русском тексте — немецкий фрагмент, в немецком — выделение;
//   +    в немецком слове — начало окончания: wohn+st.

const ENDING = /([\p{L}\p{M}'’-]*)\+([\p{L}\p{M}]+)/gu;

function endings(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(ENDING)) {
    const index = match.index ?? 0;
    if (index > last) out.push(text.slice(last, index));
    out.push(
      <span className="stem" key={`${keyPrefix}-${index}`}>
        {match[1]}
        <span className="ending" key={match[2]}>
          {match[2]}
        </span>
      </span>,
    );
    last = index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Немецкий текст: окончания подсвечены, *выделение* — акцентом. */
export function De({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\*([^*]+)\*/);
  return (
    <span className={className ? `de ${className}` : "de"} lang="de">
      {parts.map((part, i) =>
        i % 2 ? (
          <b key={i} className="de-em">
            {endings(part, `e${i}`)}
          </b>
        ) : (
          endings(part, `p${i}`)
        ),
      )}
    </span>
  );
}

/** Русский текст с немецкими вкраплениями *…*. */
export function Text({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/);
  return <>{parts.map((part, i) => (i % 2 ? <De key={i} text={part} /> : part))}</>;
}

/** Русское склонение после числа: plural(4, ["слово", "слова", "слов"]) → «4 слова». */
export function plural(n: number, [one, few, many]: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  const word = mod10 === 1 && mod100 !== 11 ? one : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? few : many;
  return `${n} ${word}`;
}

/** Текст без разметки — для сравнения ответов и подписей. */
export const plain = (text: string) => text.replace(/[*+]/g, "").replace(/\s+/g, " ").trim();

export function PlayButton({ src, label = "Послушать", size = "sm" }: { src?: string; label?: string; size?: "sm" | "md" }) {
  const playing = usePlaying();
  if (!src) return null;
  const active = playing === src;
  return (
    <button
      type="button"
      className="play"
      data-size={size}
      data-active={active || undefined}
      aria-label={active ? "Остановить" : label}
      title={active ? "Остановить" : label}
      onClick={(event) => {
        event.stopPropagation();
        play(src);
      }}
    >
      {active ? (
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <rect x="4" y="4" width="8" height="8" rx="1.5" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M5.5 3.8v8.4a.6.6 0 0 0 .9.5l6.6-4.2a.6.6 0 0 0 0-1L6.4 3.3a.6.6 0 0 0-.9.5Z" />
        </svg>
      )}
    </button>
  );
}

/** Артикль и цвет рода. */
export const GENDER_LABEL = { m: "der", f: "die", n: "das", pl: "die" } as const;
export const GENDER_NAME = { m: "мужской", f: "женский", n: "средний", pl: "мн. ч." } as const;

/** «der Name» → «Name»: артикль рисуется отдельной плашкой. */
export const withoutArticle = (de: string) => de.replace(/^(der|die|das) /, "");

import { useRef } from "react";
import type { Scene } from "../content";
import { De, PlayButton } from "../markup";

/** Стрелка поворачивается по кратчайшему пути, не откатываясь через весь циферблат. */
function useTurn(target: number) {
  const last = useRef<number | null>(null);
  let angle = target;
  if (last.current !== null) {
    let delta = (((target - last.current) % 360) + 360) % 360;
    if (delta > 180) delta -= 360;
    angle = last.current + delta;
  }
  last.current = angle;
  return angle;
}

export function ClockView({ clock, showReading = true }: { clock: NonNullable<Scene["clock"]>; showReading?: boolean }) {
  const minute = useTurn(clock.minutes * 6);
  const hour = useTurn(((clock.hours % 12) + clock.minutes / 60) * 30);
  const evening = clock.hours >= 12;
  return (
    <div className="clock">
      <svg className="clock-face" viewBox="0 0 200 200" role="img" aria-label={clock.time}>
        <circle cx="100" cy="100" r="94" className="clock-rim" />
        {Array.from({ length: 60 }, (_, i) => (
          <line
            key={i}
            x1="100"
            y1={i % 5 ? 12 : 10}
            x2="100"
            y2={i % 5 ? 16 : 24}
            className={i % 5 ? "tick" : "tick-hour"}
            transform={`rotate(${i * 6} 100 100)`}
          />
        ))}
        {Array.from({ length: 12 }, (_, i) => {
          const n = i + 1;
          const a = (n * 30 * Math.PI) / 180;
          return (
            <text key={n} x={100 + 62 * Math.sin(a)} y={100 - 62 * Math.cos(a)} className="clock-num">
              {n}
            </text>
          );
        })}
        <g className="hand" style={{ transform: `rotate(${hour}deg)` }}>
          <line x1="100" y1="112" x2="100" y2="54" className="hand-hour" />
        </g>
        <g className="hand" style={{ transform: `rotate(${minute}deg)` }}>
          <line x1="100" y1="116" x2="100" y2="26" className="hand-minute" />
        </g>
        <circle cx="100" cy="100" r="5" className="clock-pin" />
      </svg>
      <div className="clock-text">
        <div className="clock-digital">
          {clock.time}
          <small>{evening ? "после полудня" : "до полудня"}</small>
        </div>
        {showReading && <div className="clock-say">
          <span className="clock-label">официально</span>
          <span>
            <De text={`Es ist ${clock.formal}.`} />
            <PlayButton src={clock.audio[0]} />
          </span>
        </div>}
        {showReading && <div className="clock-say">
          <span className="clock-label">в разговоре</span>
          <span>
            <De text={`Es ist ${clock.informal}.`} />
            <PlayButton src={clock.audio[1]} />
          </span>
        </div>}
      </div>
    </div>
  );
}

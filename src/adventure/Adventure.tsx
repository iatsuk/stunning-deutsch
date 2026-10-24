import { useEffect, useRef, useState } from "react";
import type { Adventure as AdventureData, CrewAdventure, HarborAdventure } from "../content";
import { stopAudio, useAdventureProgress, type AdventureSave } from "../hooks";
import { De, Text } from "../markup";
import { challengeVariant, formatPhone, shuffled } from "./logic";
import { Clue } from "./Clue";
import { Challenge } from "./Challenge";
import "./adventure.css";

type PlayProps<T> = { game: T; state: AdventureSave; save: (patch: Partial<AdventureSave>) => void; replay: () => void };

export function Adventure({ game, topicId }: { game: AdventureData; topicId: string }) {
  const progress = useAdventureProgress();
  const state = progress.episode(topicId);
  const gameArea = useRef<HTMLDivElement>(null);
  const lastStep = useRef(state.step);
  const baseSteps = game.kind === "crew" ? 2 : game.kind === "harbor" ? 3 : 0;
  const total = baseSteps + game.challenges.length;
  const rawChallenge = game.challenges[state.step - baseSteps];
  const challenge = rawChallenge ? challengeVariant(rawChallenge,state.seed) : undefined;
  const [saveFailed, setSaveFailed] = useState(false);
  const save = (patch: Partial<AdventureSave>) => setSaveFailed(!progress.update(topicId, patch));
  const replay = () => {
    stopAudio();
    save({ step: 0, answers: {}, assisted: false, seed: state.seed + 1 });
  };
  useEffect(() => {
    if (lastStep.current !== state.step) {
      lastStep.current = state.step;
      const heading = gameArea.current?.querySelector<HTMLElement>("h3");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
        gameArea.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [state.step]);
  return <section className="adventure-section" id="adventure" aria-labelledby="adventure-title">
    <div className="section-head"><div className="kicker">Игра темы</div>
      <h2 id="adventure-title">{game.title}</h2><p><Text text={game.intro} /></p></div>
    <div className="adventure-game" ref={gameArea}>
      {state.step < total && <div className="adventure-progress">
        <span>Шаг {state.step + 1} из {total}</span>
        <progress value={state.step} max={total} aria-label="Выполнено шагов игры" />
      </div>}
      {challenge ? <Challenge key={`${state.seed}:${challenge.id}`} challenge={challenge} state={state} save={save}
        last={state.step === total - 1} onNext={() => { stopAudio(); save({ step: state.step + 1, ...(state.step + 1 === total ? { won: true } : {}) }); }} />
        : game.kind === "sequence" ? <div className="adventure-win">
          <span className="win-stamp" aria-hidden="true">✓</span><div className="kicker">Эпизод пройден</div>
          <h3>{game.title} · всё готово</h3><p><Text text={game.ending} /></p>
          <ul className="adventure-results">{game.challenges.map((step) => <li key={step.id}>✓ {step.title}</li>)}</ul>
          {state.assisted && <p className="adventure-mode">В заданиях на слух вы открывали текст. Можно переиграть и попробовать без этой подсказки.</p>}
          <div className="adventure-actions"><button type="button" onClick={replay}>Сыграть ещё раз</button></div>
        </div>
        : game.kind === "crew" ? <CrewGame key={`${state.seed}:${state.step}`} game={game} state={state} save={save} replay={replay} />
        : <HarborGame key={`${state.seed}:${state.step}`} game={game} state={state} save={save} replay={replay} />}
    </div>
    <p className="adventure-storage" role="status">{saveFailed
      ? "Браузер не разрешил сохранить прогресс. Можно играть дальше, но после закрытия страницы он потеряется."
      : "Продвижение сохраняется в этом браузере. Можно уйти и продолжить позже."}</p>
  </section>;
}

function CrewGame({ game, state, save, replay }: PlayProps<CrewAdventure>) {
  const fields = game.members.flatMap((m) => (["origin", "home"] as const).map((field) => ({ member: m.id, field })));
  const [slot, setSlot] = useState(() => fields.find((f) => state.answers[f.member + ":" + f.field] !== game.members.find((m) => m.id === f.member)![f.field]) ?? fields[0]);
  const [feedback, setFeedback] = useState({ text: "", ok: false });
  const member = game.members.find((m) => m.id === slot.member) ?? game.members[0];
  const filled = fields.filter((f) => state.answers[f.member + ":" + f.field] === game.members.find((m) => m.id === f.member)![f.field]).length;
  const choose = (value: string) => {
    if (value !== member[slot.field]) {
      setFeedback({ ok: false, text: slot.field === "origin" ? "Ищите место после komme aus — откуда человек родом. Это может быть и страна, и город." : "Здесь нужно место после wohne / wohnen. Откуда человек родом, мы записываем в другое поле." });
      return;
    }
    const answers = { ...state.answers, [member.id + ":" + slot.field]: value };
    stopAudio();
    const next = fields.find((f) => answers[f.member + ":" + f.field] !== game.members.find((m) => m.id === f.member)![f.field]);
    save({ answers, step: next ? 0 : 1 });
    setFeedback({ ok: true, text: `Записано: ${member.name} — ${value}. ${next ? "Заполним следующее поле." : "Команда собрана. Осталось найти помощника."}` });
    if (next) setSlot(next);
  };
  const cards = <div className="crew-cards">{game.members.map((m) => <article className="crew-card" key={m.id} data-person={m.id}>
    <header><span className="crew-avatar" aria-hidden="true">{m.name[0]}</span><h4>{m.name}</h4></header>
    {(["origin", "home"] as const).map((field) => {
      const value = state.answers[m.id + ":" + field];
      return state.step === 0 ? <button type="button" key={field} className="crew-slot" aria-pressed={slot.member === m.id && slot.field === field}
        onClick={() => { stopAudio(); setSlot({ member: m.id, field }); setFeedback({ text: "", ok: false }); }}
        aria-label={`${m.name}: ${field === "origin" ? "откуда" : "где живёт"}${value ? ", " + value : ""}`}>
        <small>{field === "origin" ? "Woher? · Откуда" : "Wo? · Где живёт"}</small><strong>{value ?? "Выберите поле"}</strong>
      </button> : <div className="crew-slot" key={field}><small>{field === "origin" ? "Woher?" : "Wo?"}</small><strong>{value ?? m[field]}</strong></div>;
    })}
    {state.step === 1 && <button type="button" className="adventure-primary" onClick={() => {
      if (m.id === game.contact.answer) { stopAudio(); save({ step: 2, ...(game.challenges.length ? {} : { won: true }) }); setFeedback({ text: "", ok: true }); }
      else setFeedback({ text: game.contact.wrong, ok: false });
    }}>Позвать {m.name}</button>}
  </article>)}</div>;

  if (state.step >= 2) return <div className="adventure-win">
    <span className="win-stamp" aria-hidden="true">✓</span><div className="kicker">Команда собрана</div>
    <h3>Команда готова к встрече</h3><p><Text text={game.contact.success} /></p>{cards}
    <div className="adventure-actions"><button type="button" onClick={replay}>Сыграть ещё раз</button></div>
  </div>;
  return <>
    <div className="adventure-step"><span>{state.step === 0 ? `Карточки команды · ${filled}/${fields.length} полей` : "Найдите помощника"}</span></div>
    <h3>{state.step === 0 ? "Кто откуда и где живёт?" : "Кто поможет с лодкой?"}</h3>
    <p>{state.step === 0 ? "Хауке нужны карточки друзей. Нажмите на пустое поле, прочитайте или послушайте реплику и перенесите подходящую подпись." : <Text text={game.contact.question} />}</p>
    {cards}
    {state.step === 0 && <div className="crew-workbench">
      <div><h4>Говорит {member.name}</h4><Clue key={member.id} quotes={member.quotes} reading onHelp={() => {}} /></div>
      <div className="crew-labels"><span className="kicker">{member.name} · {slot.field === "origin" ? "Woher?" : "Wo?"}</span>
        <p>{slot.field === "origin" ? "Откуда родом? Выберите страну или город." : "Где живёт? Выберите город, район или улицу."}</p>
        <div>{shuffled(slot.field === "origin" ? game.origins : game.places, state.seed + (slot.field === "home" ? 17 : 0)).map((value) =>
          <button type="button" key={value} onClick={() => choose(value)}><De text={value} /><span aria-hidden="true"> ↗</span></button>)}</div>
      </div>
    </div>}
    <Feedback {...feedback} />
  </>;
}

function Feedback({ text, ok }: { text: string; ok: boolean }) {
  return <div className="adventure-feedback" role="status" data-ok={ok}>{text && <Text text={text} />}</div>;
}

function HarborGame({ game, state, save, replay }: PlayProps<HarborAdventure>) {
  const [feedback, setFeedback] = useState({ text: "", ok: false });
  const [visited, setVisited] = useState<number | null>(null);
  const help = () => save({ assisted: true });
  const phone = (state.answers.phone ?? "").replace(/\D/g, "").slice(0, game.phone.length);
  const found = state.answers.berth === String(game.berth);
  const advance = (step: number) => { stopAudio(); setFeedback({ text: "", ok: false }); save({ step }); };
  if (state.step >= 3) return <div className="adventure-win">
    <span className="win-stamp" aria-hidden="true">⚑</span><div className="kicker">Лодка и связь найдены</div>
    <h3>Встречаемся у «Шпротты»</h3>
    <p>Лодка у места {game.berth}, Дана получила ваш учебный звонок, а Матео ждём у аудитории {game.room.options[game.room.answer].replace(/^Raum\s*/, "")}. {game.challenges.length ? "Бирка для ключа подписана, вода и хлеб проверены. " : ""}Теперь команда сможет собраться вместе.</p>
    <div className="adventure-receipt"><span>Лодка<strong>«Sprotte» · {game.berth}</strong></span><span>Контакт Даны<strong>{formatPhone(game.phone)}</strong></span><span>Где искать Матео<strong>{game.room.options[game.room.answer]}</strong></span></div>
    <p className="adventure-mode">{state.assisted ? "Вы использовали текстовую подсказку. Можно переиграть и попробовать только на слух." : "Эпизод пройден без открытия текста сообщений."}</p>
    <div className="adventure-actions"><button type="button" onClick={replay}>Сыграть ещё раз</button></div>
  </div>;
  return <>
    <div className="adventure-step"><span>{["Найдите лодку", "Позвоните Дане", "Где искать Матео?"][state.step] ?? "Найдите лодку"}</span></div>
    {state.step === 0 && <>
      <h3>Йенсен оставил номер места</h3><p>Матео ждёт у входа. Послушайте указание и выберите причал на схеме. Название лодки станет видно, когда вы её найдёте.</p>
      <Clue quotes={game.directions} onHelp={help} />
      <div className="harbor-map" aria-label="Схема причалов">
        <div className="harbor-shore"><span>Kiellinie</span><span className="harbor-walker">{found ? "Вы у лодки ✓" : "Вы и Матео ↓"}</span></div>
        <div className="harbor-water">{shuffled(game.berths, state.seed).map((berth) => <button key={berth} type="button" className="harbor-berth" aria-label={`Причал ${berth}`} aria-pressed={found && berth === game.berth} data-visited={visited === berth} disabled={found}
          onClick={() => {
            setVisited(berth);
            if (berth === game.berth) { stopAudio(); save({ answers: { ...state.answers, berth: String(berth) } }); setFeedback({ ok: true, text: "Вот она, «Шпротта»! Вы нашли нужное место. Теперь позовём Дану." }); }
            else setFeedback({ ok: false, text: "Здесь другая лодка. Послушайте номер ещё раз: сначала звучат единицы, затем десятки." });
          }}>
          <span className="pier-number">{berth}</span><span className="pier-planks" aria-hidden="true" /><span className="boat-shape" aria-hidden="true">⛵</span>
          <span className="boat-name">{found && berth === game.berth ? "Sprotte ✓" : "Liegeplatz"}</span>
        </button>)}</div>
      </div>
      <Feedback {...feedback} />
      {found && <button type="button" className="adventure-primary" onClick={() => advance(1)}>Позвонить Дане →</button>}
    </>}
    {state.step === 1 && <>
      <h3>Дана продиктовала номер</h3><p>Прослушайте запись и наберите её учебный номер на телефоне. Код идёт по цифрам, остальное — парами. Можно переслушивать сколько нужно.</p>
      <div className="phone-scene"><div><Clue quotes={game.phoneClue} onHelp={help} />
        <details className="phone-hint" onToggle={(event) => { if (event.currentTarget.open) help(); }}><summary>Подсказка: как не перепутать 23 и 32?</summary>
          <p>В каждой паре сначала единицы, потом десятки. <De text="dreiundzwanzig" /> — 23. Дана уточнила первую пару:</p><Clue quotes={game.phoneHelp} reading onHelp={help} /></details></div>
        <div className="game-phone"><span className="kicker">Учебный звонок · Dana</span><output aria-label="Набранный номер">{phone ? formatPhone(phone) : "··· ·· ·· ··"}</output>
          <small>{phone.length} из {game.phone.length} цифр</small><div className="phone-keys">{["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "C"].map((digit) =>
            <button type="button" key={digit} aria-label={digit === "⌫" ? "Удалить цифру" : digit === "C" ? "Очистить номер" : `Цифра ${digit}`} onClick={() => {
              const value = digit === "⌫" ? phone.slice(0, -1) : digit === "C" ? "" : (phone + digit).slice(0, game.phone.length);
              save({ answers: { ...state.answers, phone: value } }); setFeedback({ text: "", ok: false });
            }}>{digit}</button>)}</div>
          <button type="button" className="phone-call" disabled={!phone} onClick={() => {
            if (phone === game.phone) advance(2);
            else setFeedback({ ok: false, text: "Дана не отвечает по этому номеру. Проверьте код и три пары цифр; запись можно прослушать снова. Это учебный звонок — никто посторонний его не получит." });
          }}>☎ Позвонить</button>
        </div></div><Feedback {...feedback} />
    </>}
    {state.step === 2 && <>
      <h3>Дана на связи. Осталось найти Матео.</h3><p>Завтра перед встречей у лодки нужно зайти за Матео в школу. Ему пришло сообщение: аудитория изменилась. Послушайте его и выберите нужную дверь. Телефон в конце сообщения — не номер аудитории.</p>
      <Clue quotes={[{ de: game.room.text, audio: game.room.audio, name: "Frau Petersen · автоответчик" }]} onHelp={help} />
      <div className="school-doors" aria-label="Аудитории школы">{shuffled(game.room.options.map((label, index) => ({ label, index })), state.seed + 29).map(({ label, index }) =>
        <button type="button" key={label} onClick={() => {
          if (index === game.room.answer) { stopAudio(); save({ step: 3, ...(game.challenges.length ? {} : { won: true }) }); }
          else setFeedback({ ok: false, text: "Здесь другой курс. Петерсен назвала номер и повторила его по цифрам. Послушайте ещё раз и найдите нужную дверь." });
        }}><span>{label}</span><i aria-hidden="true" /></button>)}</div><Feedback {...feedback} />
    </>}
  </>;
}

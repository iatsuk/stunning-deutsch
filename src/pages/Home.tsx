import type { CSSProperties } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { catalog } from "../content";
import { plural } from "../markup";
import { scrollToSection } from "../hooks";

const HOW = [
  { title: "Разбор", text: "История с озвученными диалогами, словами, грамматикой и заданиями в формате telc. Сцена рядом показывает, как устроены фразы." },
  { title: "Шпаргалка", text: "Ключевые правила и примеры из урока в одном месте. Сюда удобно вернуться, если что-то забылось." },
  { title: "Тренажёр", text: "Проверяйте формы слов, собирайте предложения и выбирайте подходящие реплики. Ответ можно исправить и повторить упражнение." },
  { title: "Игра темы", text: "Используйте немецкий для действия: соберите покупки, поймите сообщение, выберите маршрут или договоритесь о плане." },
  { title: "Дело", text: "Небольшая детективная задача. Сопоставьте свидетельства, найдите противоречие и подтвердите решение словами из источника." },
  { title: "Словарь", text: "Слова урока с переводом и озвучкой. Это справочник: нужные выражения возвращаются в истории, упражнениях и играх." },
];

export function Home() {
  useTitle("Stunning Deutsch — курс немецкого A1–B1");
  const levels = catalog.levels;
  const a1 = levels.find((level) => level.id === "a1" && level.status === "open");
  const topicCount = levels.filter((level) => level.status === "open").reduce((count, level) => count + level.topics.length, 0);
  return (
    <>
      <Topbar nav={[["levels", "Уровни"], ["how", "Как учиться"]]} />
      <main>
        <section className="hero home-hero">
          <div className="kicker">Немецкий по ступеням telc · A1 → B1</div>
          <h1>Немецкий от первых фраз до самостоятельного общения</h1>
          <p className="lede">
            {plural(topicCount, ["урок", "урока", "уроков"])} от A1 до B1: понятные разборы, озвученные диалоги,
            игры и практика в формате telc. Вместе с героями в Киле вы знакомитесь, планируете поездки
            и организуете общую встречу. Слова и правила нужны, чтобы понять друг друга и действовать.
          </p>
          <div className="home-actions">
            {a1 && (
              <a className="cta" href={`#/${a1.id}`}>
                Начать с {a1.code} · {plural(a1.topics.length, ["урок", "урока", "уроков"])}
              </a>
            )}
            <button type="button" onClick={() => scrollToSection("levels")}>Выбрать уровень</button>
          </div>
        </section>

        <section className="levels" id="levels">
          <div className="section-head">
            <div className="kicker">Уровни</div>
            <h2>Весь маршрут A1–B1 открыт</h2>
            <p>
              Начните с A1, если учите язык с нуля. Если уже занимались, входные работы на страницах A2 и B1
              помогут понять, что стоит повторить. Уроки внутри уровня проходите по порядку:
              знакомый язык возвращается в новых ситуациях.
            </p>
          </div>
          <ol className="ladder" style={{ "--steps": levels.length } as CSSProperties}>
            {levels.map((level, i) => {
              const open = level.status === "open";
              const body = (
                <>
                  <div className="ladder-code">{level.code}</div>
                  <div className="ladder-name">{level.name}</div>
                  <div className="ladder-exam">{level.exam}</div>
                  <p>{level.summary}</p>
                  <div className="ladder-status">{open ? `${plural(level.topics.length, ["урок", "урока", "уроков"])} · доступны все` : "в работе"}</div>
                </>
              );
              return (
                <li key={level.id} style={{ "--step": i } as CSSProperties} data-open={open || undefined}>
                  {open ? <a href={`#/${level.id}`}>{body}</a> : <div>{body}</div>}
                </li>
              );
            })}
          </ol>
        </section>

        <section className="how" id="how">
          <div className="section-head">
            <div className="kicker">Как учиться</div>
            <h2>От понимания к действию</h2>
            <p>
              У каждого урока один порядок: сначала разберитесь в ситуации, затем потренируйтесь
              и примените язык в игре и деле. Ошибка даёт объяснение и возможность попробовать ещё раз.
              Прогресс сохраняется в вашем браузере.
            </p>
          </div>
          <ol className="how-grid">
            {HOW.map((item, i) => (
              <li key={item.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
          <div className="home-practice">
            <h3>Проверьте себя в новой ситуации</h3>
            <p>
              В A2 и B1 есть входные работы, проверки после блоков и итоговые авторские пробники.
              В пробнике действуют таймеры и ограничения прослушивания; ответы и тексты аудио
              открываются после завершения. Письмо напишите самостоятельно, разговор разыграйте с партнёром:
              эти ответы требуют отдельной оценки человеком.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

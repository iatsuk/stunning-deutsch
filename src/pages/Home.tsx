import type { CSSProperties } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { catalog } from "../content";
import { plural } from "../markup";

const HOW = [
  { title: "Ситуация", text: "Короткий диалог из жизни: курсы, кафе, вокзал, врач. Каждую реплику можно послушать." },
  { title: "Слова", text: "Карточки слов. Цвет показывает род: der, die, das и множественное число." },
  { title: "Грамматика", text: "Таблицы с подсвеченными окончаниями и схема предложения, где видно, куда уходит глагол." },
  { title: "Проверка", text: "Вопросы «а как сказать…». Ответ скрыт, пока вы не попробуете ответить сами." },
  { title: "На экзамене", text: "Задание в формате telc: анкета, табличка, объявление, карточка для устной части." },
];

export function Home() {
  useTitle("Stunning Deutsch — немецкий по ступеням telc");
  const levels = catalog.levels;
  const a1 = levels.find((level) => level.status === "open");
  return (
    <>
      <Topbar nav={[["levels", "Уровни"], ["how", "Как устроена тема"]]} />
      <main>
        <section className="hero home-hero">
          <div className="kicker">Немецкий по ступеням telc · A1 → B1</div>
          <h1>Немецкий, в котором видно, как всё устроено</h1>
          <p className="lede">
            Каждая тема — короткая история с диалогом, словами, грамматикой и заданиями в формате экзамена. Вы
            листаете текст, а сцена рядом показывает, как меняется фраза, откуда берётся окончание и почему глагол
            всегда на втором месте.
          </p>
          {a1 && (
            <a className="cta" href={`#/${a1.id}`}>
              Начать с уровня {a1.code} · {plural(a1.topics.length, ["тема", "темы", "тем"])}
            </a>
          )}
        </section>

        <section className="levels" id="levels">
          <div className="section-head">
            <div className="kicker">Уровни</div>
            <h2>Три ступени — три экзамена</h2>
            <p>
              Уровни идут по общеевропейской шкале, а темы и задания — по требованиям экзаменов telc. Сейчас открыт
              A1, следующие ступени в работе.
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
                  <div className="ladder-status">{open ? `${plural(level.topics.length, ["тема", "темы", "тем"])} · открыто` : "в работе"}</div>
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
            <div className="kicker">Как устроена тема</div>
            <h2>Пять глав и тренажёр</h2>
            <p>
              Порядок глав одинаковый во всех темах. После разбора — шпаргалка в тезисах, упражнения с проверкой,
              тренажёр артиклей и карточки слов.
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
        </section>
      </main>
      <Footer />
    </>
  );
}

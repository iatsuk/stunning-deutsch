import type { CSSProperties } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { catalog } from "../content";

const HOW = [
  { title: "Сцены", text: "Глава — один день расследования. Разговоры, осмотр места и задания идут одним рассказом: чтобы дело двигалось, нужно понять и ответить по-немецки." },
  { title: "Немецкий в рассказе", text: "История начинается по-русски. Новое выражение приходит с переводом, знакомое возвращается уже по-немецки; перевод открывается по нажатию." },
  { title: "На слух", text: "Реплики героев озвучены. Объявления на вокзале, сообщения и разговоры вы сначала слышите, а потом отвечаете по услышанному." },
  { title: "Мини-игры", text: "Часы, касса, причалы der, die и das, гонка с чайкой, кодовый замок, логические сетки. Одно слово и одно правило встречаются в разных действиях." },
  { title: "Правила", text: "Перед грамматическим заданием открывается карточка правила. Правила пройденных сцен собраны в блокноте вместе с уликами." },
  { title: "Повторение", text: "Перед каждой главой идёт раунд из трёх игр со словами прошлых глав. Разминка дня возвращает то, что пора вспомнить." },
];

export function Home() {
  useTitle("Stunning Deutsch — немецкий A1 в детективной истории");
  const levels = catalog.levels;
  return (
    <>
      <Topbar nav={[["levels", "Уровни"], ["how", "Как учиться"]]} />
      <main>
        <section className="hero home-hero">
          <div>
            <div className="kicker">Немецкий по ступеням telc · курс A1</div>
            <h1>Немецкий с нуля в одной детективной истории</h1>
            <p className="lede">
              «Дело о пропавшем Moin» — 13 глав в Киле. Из парусного клуба пропала старая табличка MOIN,
              а по-немецки вы знаете одно слово. Чтобы её найти, вы знакомитесь, расспрашиваете свидетелей,
              читаете записки и объявления. Рассказ глава за главой переходит с русского на немецкий.
            </p>
            <div className="home-actions">
              <a className="cta" href="#/a1/moin">Открыть дело</a>
              <a href="#/a1">Что входит в A1</a>
            </div>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}story-img/01-promenade.jpg`}
            alt="Набережная Kiellinie утром: Хауке с чемоданом, бегун, велосипедистка, рыбак и продавщица в киоске машут руками"
            width={1280}
            height={720}
          />
        </section>

        <section className="levels" id="levels">
          <div className="section-head">
            <div className="kicker">Уровни</div>
            <h2>Открыт A1</h2>
            <p>
              A1 — полный курс до экзамена Start Deutsch 1. A2 и B1 переводятся в тот же формат истории
              и откроются после переработки.
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
                  <div className="ladder-status">{open ? "открыт" : "в переработке"}</div>
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
            <h2>Язык нужен, чтобы дело двигалось</h2>
            <p>
              Проходите главы по порядку: каждая опирается на слова и правила прошлых. Ошибка даёт
              объяснение и возможность попробовать ещё раз. Прогресс сохраняется в вашем браузере.
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
            <h3>Экзамен</h3>
            <p>
              Последняя глава проводит через четыре части Start Deutsch 1 внутри сюжета: Hören, Lesen,
              Schreiben и Sprechen. Отдельно есть <a href="#/a1/a1-mock">авторский пробник</a> с таймерами
              и ограничением прослушиваний. Письмо и речь в нём оценивает человек.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

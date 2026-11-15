import type { CSSProperties } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { catalog } from "../content";

/** Чем курс помогает запомнить язык: снимок из игры (public/home) и что он показывает. */
const METHODS = [
  {
    img: "story", height: 1122,
    alt: "Сцена на вокзале: Хауке с картонкой MOIN, его реплика с кнопкой прослушивания и варианты ответа",
    title: "История вместо учебника",
    text: "Вы не учите список слов. Вы приезжаете в Киль, знакомитесь с Хауке и ищете пропавшую табличку. Каждое слово связано с человеком, местом и шуткой, поэтому вспомнить его проще.",
    note: "Чтобы дело двигалось, нужно понять реплику и ответить.",
  },
  {
    img: "notebook", height: 1150,
    alt: "Блокнот детектива в четвёртой главе: улики записаны по-немецки",
    title: "Немецкий приходит постепенно",
    text: "Первая глава почти вся по-русски. Знакомые слова возвращаются в рассказ уже по-немецки, и к последним главам вы читаете улики и записки без перевода.",
    note: "Перевод любого слова открывается по нажатию.",
  },
  {
    img: "docks", height: 1082, width: 728,
    alt: "Игра «Причалы»: слово Stadt и три причала — der, die и das",
    title: "Артикль запоминается вместе со словом",
    text: "У der, die и das во всей игре свои цвета. В «Причалах» вы разводите слова по трём причалам, пока артикль не начнёт вспоминаться сам.",
    note: "Слово с ошибкой вернётся в конце очереди.",
  },
  {
    img: "lock", height: 796,
    alt: "Кодовый замок: фразу «Я живу в Киле» собирают тремя дисками, на них Ich, wohnt, nach Kiel",
    title: "Фразу вы строите сами",
    text: "Узнать готовый ответ легко, вспомнить самому полезнее. Поэтому вы поворачиваете диски замка, собираете предложения из плиток и пишете слова с клавиатуры.",
    note: "Проверка точная: игра покажет слово, в котором ошибка.",
  },
  {
    img: "rule", height: 1310,
    alt: "Карточка правила: окончания глагола в настоящем времени с таблицей wohnen, kommen, heißen",
    title: "Правило приходит, когда оно нужно",
    text: "Грамматика не идёт отдельным уроком. Короткая карточка с примером и таблицей открывается прямо перед заданием, где правило понадобится.",
    note: "Карточки главы собраны в блокноте.",
  },
  {
    img: "review", height: 1270,
    alt: "Раунд повторения «Чайка проверяет память»: лото на слух из девяти слов",
    title: "Слова возвращаются, пока не останутся",
    text: "Перед каждой главой и в начале нового дня идёт короткий раунд из трёх игр. Слово, которое вы помните, приходит всё реже: через день, два, четыре, восемь и дальше.",
    note: "Ошиблись — слово вернётся раньше. Раунд можно пропустить.",
  },
  {
    img: "algo", height: 1340,
    alt: "Мини-игра с картой города: маршрут до мастерской собирают из команд Gehen Sie geradeaus, links, rechts",
    title: "Больше тридцати видов заданий",
    text: "Часы, касса, маршрут по карте, фоторобот, логические сетки, гонка с чайкой. Одно слово встречается в разных играх, и вы узнаёте его в любой ситуации, а не только на карточке.",
    note: "Два одинаковых задания подряд не идут.",
  },
];

const MORE = [
  { title: "На слух с первого дня", text: "Реплики героев озвучены. Объявления, сообщения и разговоры вы сначала слышите, а потом отвечаете по услышанному. Трудные звуки тренирует отдельная игра." },
  { title: "Письмо и речь", text: "Вы пишете короткие сообщения по образцу и говорите вслух: сначала сами, потом сверяетесь с образцом." },
  { title: "Запоминалки", text: "К трудным словам есть ассоциации. Schild звучит как «щит»: табличка висит у входа, как щит клуба от неудач." },
  { title: "Ошибка не наказывает", text: "Неверный ответ даёт объяснение и ещё одну попытку. Прогресс при этом не теряется." },
  { title: "Формат экзамена", text: "Со второй главы задания подписаны так же, как на экзамене. Последняя глава проводит через все четыре части Start Deutsch 1." },
  { title: "Без регистрации", text: "Курс открывается сразу. Прогресс сохраняется в вашем браузере." },
];

export function Home() {
  useTitle("Stunning Deutsch — немецкий A1 в детективной истории");
  const levels = catalog.levels;
  return (
    <>
      <Topbar nav={[["method", "Метод"], ["levels", "Уровни"], ["author", "Автор"]]} />
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

        <section className="how" id="method">
          <div className="section-head">
            <div className="kicker">Как это работает</div>
            <h2>Почему здесь слова запоминаются</h2>
            <p>
              Слово остаётся в памяти, когда оно было нужно для дела, прозвучало вслух и вернулось несколько
              раз в разных ситуациях. На этом построена каждая глава.
            </p>
          </div>
          <ol className="method-list">
            {METHODS.map((item, i) => (
              <li key={item.img}>
                <img
                  src={`${import.meta.env.BASE_URL}home/${item.img}.jpg`}
                  alt={item.alt}
                  width={item.width ?? 704}
                  height={item.height}
                  loading="lazy"
                />
                <div>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <p className="method-note">{item.note}</p>
                </div>
              </li>
            ))}
          </ol>
          <ol className="how-grid">
            {MORE.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
          <div className="home-actions">
            <a className="cta" href="#/a1/moin">Начать с первой главы</a>
            <a href="#/a1/a1-mock">Пробник Start Deutsch 1</a>
          </div>
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

        <section className="how" id="author">
          <div className="section-head">
            <div className="kicker">Автор</div>
            <h2>Обратная связь</h2>
            <p>
              Это мой проект, который я пишу и развиваю, чтобы самому освоить немецкий.
              Я был бы рад любым замечаниям и идеям.
            </p>
          </div>
          <div className="home-actions">
            <a className="cta" href="https://t.me/aiatsuk" target="_blank" rel="noreferrer">Написать в Telegram</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

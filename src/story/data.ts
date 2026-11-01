import type { Episode, Phrase, Challenge } from "./types.ts";
const choice = (
  answer: string,
  options: [string, string, string][],
): Challenge => ({
  kind: "choice",
  answer,
  options: options.map(([id, text, why]) => ({ id, text, why })),
});
const order = (
  answer: string[],
  tiles: string[],
  also?: string[][],
): Challenge => ({ kind: "order", answer, tiles, ...(also ? { also } : {}) });
const pairs = (
  left: [string, string][],
  right: [string, string][],
  answer: Record<string, string>,
): Challenge => ({
  kind: "match",
  left: left.map(([id, text]) => ({ id, text })),
  right: right.map(([id, text]) => ({ id, text })),
  answer,
});

// Each replacement is an authored grammatical unit, never a dictionary substitution.
export const phrases: Record<string, Phrase> = {
  moin: {
    ru: "привет",
    de: "Moin",
    note: "Северогерманское приветствие; подходит не только утром.",
  },
  name: {
    ru: "Как вас зовут?",
    de: "Wie heißen Sie?",
    note: "Вежливое Sie; heißen стоит после вопросительного слова.",
  },
  kiel: {
    ru: "Я живу в Киле.",
    de: "Ich wohne in Kiel.",
    note: "wohne согласуется с ich; глагол на втором месте.",
  },
  where: {
    ru: "Где табличка?",
    de: "Wo ist das Schild?",
    note: "das Schild — табличка. В W-вопросе глагол после Wo.",
  },
  argentina: {
    ru: "Я из Аргентины.",
    de: "Ich komme aus Argentinien.",
    note: "kommen aus — происхождение; wohnen in — место жительства.",
  },
  bitte: {
    ru: "пожалуйста",
    de: "bitte",
    note: "В просьбе или в ответ на благодарность.",
  },
  danke: { ru: "спасибо", de: "danke", note: "Короткая благодарность." },
  phone: {
    ru: "номер телефона",
    de: "die Telefonnummer",
    note: "Существительное женского рода: die.",
  },
  have: {
    ru: "У меня есть время.",
    de: "Ich habe Zeit.",
    note: "haben: ich habe, du hast, er hat.",
  },
  sister: {
    ru: "моя сестра",
    de: "meine Schwester",
    note: "Schwester женского рода: meine в именительном падеже.",
  },
  brother: {
    ru: "мой брат",
    de: "mein Bruder",
    note: "Bruder мужского рода: mein в именительном падеже.",
  },
  bag: {
    ru: "сумка",
    de: "die Tasche",
    note: "Форма для знакомства со словом. В других контекстах артикль может меняться.",
  },
  hisbag: {
    ru: "его сумка",
    de: "seine Tasche",
    note: "sein- указывает на владельца; -e согласуется с Tasche.",
  },
  nobag: {
    ru: "Это не моя сумка.",
    de: "Das ist nicht meine Tasche.",
    note: "Отрицаем принадлежность конкретной сумки: nicht meine.",
  },
  water: {
    ru: "воду",
    de: "Wasser",
    note: "Без артикля при заказе: Ich möchte Wasser.",
  },
  coffee: {
    ru: "кофе",
    de: "Kaffee",
    note: "der Kaffee. В заказе без артикля: Ich möchte Kaffee.",
  },
  nocoffee: {
    ru: "Я не хочу кофе.",
    de: "Ich möchte keinen Kaffee.",
    note: "Мужской род в Akkusativ: keinen Kaffee.",
  },
  tea: {
    ru: "Я хочу чай.",
    de: "Ich möchte einen Tee.",
    note: "Мужской род в Akkusativ: einen Tee.",
  },
  bread: {
    ru: "хлеб",
    de: "Brot",
    note: "das Brot; zwei Brote — два хлеба / две буханки.",
  },
  bill: {
    ru: "Счёт, пожалуйста.",
    de: "Die Rechnung, bitte.",
    note: "Короткая вежливая просьба в кафе.",
  },
  price: {
    ru: "Сколько это стоит?",
    de: "Was kostet das?",
    note: "kosten в единственном числе: kostet.",
  },
  him: {
    ru: "Я беру его.",
    de: "Ich nehme ihn.",
    note: "ihn заменяет предмет мужского рода в Akkusativ, например der Pullover.",
  },
  expensive: {
    ru: "Это слишком дорого.",
    de: "Das ist zu teuer.",
    note: "После sein прилагательное без окончания; zu — слишком.",
  },
  half: {
    ru: "в половине шестого",
    de: "um halb sechs",
    note: "halb sechs = 17:30 или 05:30; часть суток даёт контекст.",
  },
  sunday: {
    ru: "в воскресенье",
    de: "am Sonntag",
    note: "Дни недели: am + день.",
  },
  starts: {
    ru: "Встреча начинается.",
    de: "Das Treffen fängt an.",
    note: "Отделяемая приставка an стоит в конце.",
  },
  call: {
    ru: "Я позвоню тебе.",
    de: "Ich rufe dich an.",
    note: "Präsens может обозначать план; an отделяется, dich — Akkusativ.",
  },
  can: {
    ru: "Я могу прийти.",
    de: "Ich kann kommen.",
    note: "kann на втором месте, инфинитив kommen в конце.",
  },
  cannot: {
    ru: "Я не могу прийти.",
    de: "Ich kann nicht kommen.",
    note: "nicht перед конечным инфинитивом.",
  },
  rather: {
    ru: "Я лучше пойду в музей.",
    de: "Ich gehe lieber ins Museum.",
    note: "lieber — предпочтительнее; ins = in das, направление.",
  },
  together: {
    ru: "Мы хотим искать вместе.",
    de: "Wir wollen zusammen suchen.",
    note: "wollen спрягается, suchen остаётся инфинитивом в конце.",
  },
  inbag: {
    ru: "в сумке",
    de: "in der Tasche",
    note: "Где? in + Dativ. die Tasche → in der Tasche.",
  },
  table: {
    ru: "на столе",
    de: "auf dem Tisch",
    note: "Где? auf + Dativ. der Tisch → auf dem Tisch.",
  },
  kitchen: {
    ru: "на кухне",
    de: "in der Küche",
    note: "Где? in + Dativ, женский род: der Küche.",
  },
  key: {
    ru: "ключ",
    de: "der Schlüssel",
    note: "Мужской род; множественное число die Schlüssel.",
  },
  bus: {
    ru: "на автобусе",
    de: "mit dem Bus",
    note: "mit всегда требует Dativ: der Bus → dem Bus.",
  },
  cafe: {
    ru: "к кафе",
    de: "zum Café",
    note: "zu + dem = zum; das Café в Dativ: dem Café.",
  },
  station: {
    ru: "к остановке",
    de: "zur Haltestelle",
    note: "zu + der = zur; die Haltestelle в Dativ: der Haltestelle.",
  },
  straight: {
    ru: "Идите прямо.",
    de: "Gehen Sie geradeaus.",
    note: "Вежливое повелительное наклонение: глагол + Sie.",
  },
  home: {
    ru: "дома",
    de: "zu Hause",
    note: "Место: zu Hause; направление домой: nach Hause.",
  },
  must: {
    ru: "Вам нужно подождать.",
    de: "Sie müssen warten.",
    note: "модальный müssen + инфинитив в конце.",
  },
  headache: {
    ru: "У меня болит голова.",
    de: "Ich habe Kopfschmerzen.",
    note: "habe + Kopfschmerzen, обычно во множественном числе.",
  },
  sit: {
    ru: "Садись, пожалуйста.",
    de: "Setz dich bitte.",
    note: "Просьба на du; dich — возвратное местоимение.",
  },
  noentry: {
    ru: "Вам нельзя сюда входить.",
    de: "Sie dürfen hier nicht hinein.",
    note: "dürfen + nicht выражает запрет.",
  },
  worked: {
    ru: "Я вчера работал.",
    de: "Ich habe gestern gearbeitet.",
    note: "Perfekt: habe на втором месте, gearbeitet в конце.",
  },
  cook: {
    ru: "Я повар.",
    de: "Ich bin Koch.",
    note: "Профессия после sein обычно без неопределённого артикля.",
  },
  was: {
    ru: "Я был в офисе.",
    de: "Ich war im Büro.",
    note: "Präteritum от sein: war; im = in dem.",
  },
  had: {
    ru: "У меня не было ключа.",
    de: "Ich hatte keinen Schlüssel.",
    note: "hatte — Präteritum от haben; keinen + Akkusativ.",
  },
  arrived: {
    ru: "Сумка прибыла.",
    de: "Die Tasche ist angekommen.",
    note: "Perfekt с sein: ist angekommen, речь о прибытии.",
  },
  rain: {
    ru: "Идёт дождь.",
    de: "Es regnet.",
    note: "Безличное es. Для погоды: Es ist windig.",
  },
  date: {
    ru: "первого июня",
    de: "am ersten Juni",
    note: "Дата: am + порядковое числительное с -en.",
  },
  traveled: {
    ru: "Мы поехали на автобусе.",
    de: "Wir sind mit dem Bus gefahren.",
    note: "Перемещение: Perfekt с sein; mit + Dativ.",
  },
  found: {
    ru: "Мы нашли табличку.",
    de: "Wir haben das Schild gefunden.",
    note: "finden образует Perfekt с haben; найден предмет в Akkusativ.",
  },
};

export const episodes: Episode[] = [
  {
    id: "moin",
    title: "Исчезло даже «привет»",
    place: "Kiellinie · клуб",
    topic: "Знакомство",
    grammar: "sein · Präsens · вопросы · глагол на втором месте",
    beats: [
      {
        id: "01-welcome",
        title: "Детектив поневоле",
        story: [
          "У клуба на Kiellinie стоит пустая подставка. Вчера здесь была табличка MOIN — приветствие для гостей Kieler Woche. Сегодня даже поздороваться нечем.",
          "Йенсен вздыхает: «{moin}! У нас пропало слово. Начнём с вашего имени». Чайка на крыше уже выглядит виноватой, но это её обычное выражение лица.",
        ],
        prompt: "Поздоровайтесь и вежливо узнайте имя начальника гавани.",
        challenge: choice("name", [
          [
            "name",
            "Moin! Wie heißen Sie?",
            "Верно: вежливое Sie и вопрос об имени.",
          ],
          [
            "home",
            "Wo wohnen Sie?",
            "Это вопрос о месте жительства. Йенсен пока просит познакомиться.",
          ],
          [
            "origin",
            "Woher kommen Sie?",
            "Это вопрос о происхождении, а не об имени.",
          ],
        ]),
        hint: "Wie — как; heißen — зваться; Sie — вежливое «вы».",
        success:
          "«Jensen. Herr Jensen». Он выдаёт вам блокнот и звание «помощник по всему». Зарплата — спасибо.",
      },
      {
        id: "01-mateo",
        title: "Первый свидетель",
        story: [
          "Матео машет у причала: «{moin}!» Он познакомится с вами и поможет искать табличку. Сначала нужно правильно записать его слова.",
        ],
        audio: {
          file: "mateo",
          text: "Ich komme aus Argentinien, aus Buenos Aires. Und du?",
          ru: "Я из Аргентины, из Буэнос-Айреса. А ты?",
        },
        prompt: "Что Матео сообщил о себе?",
        challenge: choice("origin", [
          [
            "live",
            "Он живёт в Буэнос-Айресе.",
            "kommen aus сообщает происхождение. Это не адрес проживания.",
          ],
          [
            "origin",
            "Он родом из Аргентины.",
            "Да: Ich komme aus Argentinien.",
          ],
          ["work", "Он работает в Аргентине.", "О работе здесь ничего нет."],
        ]),
        hint: "kommen aus — быть родом из; wohnen in — жить в.",
        success:
          "Страна записана. Альби пока нет, зато у блокнота международный состав.",
      },
      {
        id: "01-question",
        title: "Вопрос, с которого всё начинается",
        story: [
          "На подставке записан вопрос: «{where}» — кто-то уже начал расследование и убежал за кофе. Вы уже спрашивали имя: «{name}»; теперь нужен вопрос о табличке.",
        ],
        prompt: "Соберите вопрос «Где табличка?»",
        challenge: order(
          ["Wo", "ist", "das Schild?"],
          ["das Schild?", "Wo", "ist"],
        ),
        hint: "Вопросительное слово → спрягаемый глагол → подлежащее.",
        success:
          "Wo ist das Schild? Теперь вопрос есть. Таблички по-прежнему нет.",
      },
      {
        id: "01-card",
        title: "Не путайте адрес с биографией",
        story: [
          "Элиф готовит карточки свидетелей. Ваш образец: «{kiel}»; у Матео — «{argentina}». Немецкий понемногу занимает место в блокноте.",
        ],
        source: {
          title: "Карточки",
          lines: [
            "Dana: Ich wohne in Gaarden.",
            "Mateo: Ich komme aus Argentinien.",
            "Jensen: Ich heiße Jensen.",
          ],
        },
        prompt: "Сопоставьте сообщение с тем, что оно сообщает.",
        challenge: pairs(
          [
            ["d", "Dana"],
            ["m", "Mateo"],
            ["j", "Jensen"],
          ],
          [
            ["name", "имя"],
            ["origin", "происхождение"],
            ["home", "место жительства"],
          ],
          { d: "home", m: "origin", j: "name" },
        ),
        hint: "wohnen — жить; kommen aus — происхождение; heißen — зваться.",
        success:
          "Карточки на месте. Чайка отказалась сообщать адрес: постоянная регистрация на крыше её устраивает.",
      },
      {
        id: "01-lead",
        title: "Первая зацепка",
        story: [
          "Йенсен повторяет: «{where}» Матео отвечает: «Nicht hier». Под подставкой обнаруживается бумага.",
        ],
        source: {
          title: "Записка",
          lines: [
            "Hallo! Ich bin Nils. Ich wohne in Kiel. Meine Telefonnummer: siehe Büro.",
          ],
        },
        prompt: "Что известно наверняка?",
        challenge: choice("contact", [
          [
            "thief",
            "Нильс украл табличку.",
            "В записке нет признания. Имя рядом с пропажей ещё ничего не доказывает.",
          ],
          [
            "contact",
            "Нужно найти номер Нильса в офисе.",
            "siehe Büro — смотрите в офисе; там можно связаться с Нильсом.",
          ],
          [
            "arg",
            "Нильс из Аргентины.",
            "В записке только место жительства: Kiel.",
          ],
        ]),
        hint: "siehe Büro — смотрите в офисе. Ищите следующий проверяемый шаг.",
        success:
          "Вы идёте в офис. Матео обещает не допрашивать чайку без переводчика.",
        clue: {
          title: "Контакт, а не обвинение",
          text: "Записка Нильса ведёт в офис. Она не объясняет исчезновение таблички.",
        },
      },
    ],
  },
  {
    id: "zahlen",
    title: "Телефон без паники",
    place: "Holtenauer Straße · офис",
    topic: "Числа и алфавит",
    grammar: "0–1000 · haben · да/нет · спеллинг",
    beats: [
      {
        id: "02-number",
        title: "Одна цифра — другой детектив",
        story: [
          "Петерсен протягивает {phone}. «Запишите аккуратно, {bitte}». На соседней бумажке номер пиццерии. У неё, вероятно, более приятные дела.",
        ],
        source: {
          title: "Контакт Нильса · учебный номер",
          lines: ["null eins sieben sechs · zwei drei · vier fünf · acht eins"],
        },
        prompt: "Наберите номер Нильса. Начальный ноль тоже нужен.",
        challenge: { kind: "code", length: 10, answer: "0176234581" },
        hint: "null=0, eins=1, zwei=2, drei=3, vier=4, fünf=5, sechs=6, sieben=7, acht=8.",
        success:
          "Нильс отвечает. Это уже лучше, чем заказать четыре семейные пиццы.",
      },
      {
        id: "02-have",
        title: "Свидетель на связи",
        story: [
          "Вы говорите «{danke}». Нильс: «{have}» — и готов помочь. Он не просит ждать до пенсии.",
        ],
        prompt: "Ответьте «У тебя есть время?»",
        challenge: order(["Hast", "du", "Zeit?"], ["Zeit?", "Hast", "du"]),
        hint: "В вопросе да/нет глагол стоит первым. haben: du hast.",
        success: "«Ja, ich habe Zeit». Разговор можно продолжать.",
      },
      {
        id: "02-room",
        title: "Номер комнаты",
        story: [
          "Нильс оставил записку в офисе. Петерсен просит принести папку: {bitte}, без всех архивов за тридцать лет.",
        ],
        source: {
          title: "Сообщение Петерсен",
          lines: [
            "Die Mappe ist in Zimmer zweihundertvierzehn. Nicht zweihundertvierzig.",
          ],
        },
        prompt: "Выберите комнату.",
        challenge: choice("214", [
          [
            "240",
            "240",
            "zweihundertvierzig — 240, этот номер прямо исключён.",
          ],
          ["214", "214", "zweihundertvierzehn — 214."],
          ["204", "204", "Здесь не vier, а vierzehn: четырнадцать."],
        ]),
        hint: "vierzehn=14, vierzig=40.",
        success:
          "В комнате 214 лежит папка. В комнате 240 — совещание. Вы избежали более серьёзной опасности.",
      },
      {
        id: "02-spell",
        title: "M, а не N",
        story: [
          "В папке бирка на сумку. Петерсен диктует название: «M — O — I — N». Это то самое пропавшее приветствие {moin}.",
        ],
        prompt: "Соберите надпись на бирке.",
        challenge: order(["M", "O", "I", "N"], ["N", "I", "M", "O"]),
        hint: "Порядок задан спеллингом; не переставляйте буквы по звучанию русского слова.",
        success: "MOIN. Теперь известно, что сумка связана с табличкой.",
      },
      {
        id: "02-pin",
        title: "Где искать фотографию",
        story: [
          "Нильс объясняет: «Ich habe ein Foto». {phone} больше не нужен: следующий след на бумаге.",
        ],
        source: {
          title: "Сообщение Нильса",
          lines: ["Das Foto ist in Fach zweiunddreißig. Ja, zweiunddreißig."],
        },
        prompt: "Введите номер ячейки с фотографией.",
        challenge: { kind: "code", length: 2, answer: "32" },
        hint: "В 32 сначала произносят единицы: zwei-und-dreißig.",
        success:
          "Из ячейки 32 выглядывает фотография красной сумки. Наконец-то улика, которую можно держать в руках.",
        clue: {
          title: "Бирка MOIN",
          text: "Фотография из ячейки 32 показывает красную сумку с биркой MOIN.",
        },
      },
    ],
  },
  {
    id: "familie",
    title: "Чья вообще сумка?",
    place: "Kiellinie · гости",
    topic: "Семья и вещи",
    grammar: "mein/dein/sein/ihr · ein/kein · множественное число",
    beats: [
      {
        id: "03-family",
        title: "Родственники в кадре",
        story: [
          "Нильс показывает фото: «Das ist Greta. Sie ist {sister}. Ich bin ihr Bruder». Рядом {bag}. Чайка тоже в кадре, но родственницей себя не объявляла.",
        ],
        source: {
          title: "Подписи к фото",
          lines: [
            "Greta: Nils ist mein Bruder.",
            "Nils: Greta ist meine Schwester.",
            "Greta und Nils sind Geschwister.",
          ],
        },
        prompt: "Кто кому приходится?",
        challenge: pairs(
          [
            ["g", "Greta для Нильса"],
            ["n", "Nils для Греты"],
            ["both", "Greta и Nils вместе"],
          ],
          [
            ["siblings", "брат и сестра"],
            ["sister", "сестра"],
            ["brother", "брат"],
          ],
          { g: "sister", n: "brother", both: "siblings" },
        ),
        hint: "Bruder — брат; Schwester — сестра; Geschwister — братья и сёстры.",
        success:
          "Семья установлена без генеалогического дерева на сорок листов.",
      },
      {
        id: "03-owner",
        title: "Владелец и окончание",
        story: [
          "Грета подписывает фото: «Nils und {hisbag}». Матео притворяется, что уже всё понял, но держит ручку вверх ногами.",
        ],
        source: {
          title: "Greta",
          lines: ["Das ist Nils. Das ist seine Tasche. Meine Tasche ist blau."],
        },
        prompt: "Кому принадлежит красная сумка на фото?",
        challenge: choice("nils", [
          [
            "greta",
            "Грете",
            "Грета говорит Meine Tasche ist blau: её сумка синяя.",
          ],
          [
            "nils",
            "Нильсу",
            "seine Tasche указывает на Нильса; -e согласуется с Tasche.",
          ],
          ["mateo", "Матео", "Матео здесь только помогает читать."],
        ]),
        hint: "sein- — его; ihr- — её. Окончание зависит от предмета, а не пола владельца.",
        success: "Красная сумка — Нильса. Это ещё не делает его похитителем.",
      },
      {
        id: "03-no",
        title: "Уверенное отрицание",
        story: [
          "Вы показываете Матео фотографию. Он отвечает: «{nobag}». Его собственный рюкзак пахнет хлебом, но запах не числится удостоверением личности.",
        ],
        prompt: "Как понять ответ Матео?",
        challenge: choice("notmine", [
          [
            "none",
            "У него вообще нет сумки.",
            "nicht meine отрицает именно принадлежность. Свою сумку иметь можно.",
          ],
          ["notmine", "Эта сумка не его.", "Да: Das ist nicht meine Tasche."],
          ["empty", "Его сумка пустая.", "О содержимом ответа нет."],
        ]),
        hint: "nicht meine Tasche — не моя сумка; keine Tasche — никакой сумки / нет сумки.",
        success:
          "Список владельцев стал короче. Никого не обвиняем по запаху хлеба.",
      },
      {
        id: "03-children",
        title: "Кого ждут у клуба",
        story: [
          "Грета передаёт список гостей. «{brother} тоже придёт». Теперь нужно подготовить карточки, не приписав каждому человека по младенцу.",
        ],
        source: {
          title: "Список гостей",
          lines: [
            "Greta und Nils haben keine Kinder.",
            "Lucía und Diego haben eine Tochter. Sie heißt Sofia.",
          ],
        },
        prompt: "Какая карточка соответствует списку?",
        challenge: choice("sofia", [
          ["two", "У Греты и Нильса двое детей.", "keine Kinder — детей нет."],
          [
            "sofia",
            "София — дочь Лусии и Диего.",
            "eine Tochter — одна дочь; её зовут Sofia.",
          ],
          [
            "son",
            "София — сын Матео.",
            "Tochter — дочь, родители названы в списке.",
          ],
        ]),
        hint: "Kinder — множественное число от das Kind; Tochter — дочь.",
        success:
          "Карточки готовы. София пока единственная участница, которой можно простить молчание весь вечер.",
      },
      {
        id: "03-next",
        title: "Сумка покидает кадр",
        story: [
          "Грета дописывает под фото: «Nils und {hisbag}». На обороте — сообщение о кафе.",
        ],
        source: {
          title: "Оборот фотографии",
          lines: [
            "Die Tasche ist rot. Sie ist nicht hier. Nils und Greta sind im Café Fördeblick.",
          ],
        },
        prompt: "Какая зацепка ведёт дальше?",
        challenge: choice("cafe", [
          ["home", "Искать дома у Даны.", "Дом Даны в сообщении не упомянут."],
          [
            "cafe",
            "Проверить кафе Fördeblick.",
            "В сообщении названы Nils und Greta и кафе.",
          ],
          [
            "bird",
            "Допросить чайку о цветах.",
            "Чайка в тексте не указана как источник.",
          ],
        ]),
        hint: "nicht hier — не здесь; im Café — в кафе.",
        success:
          "Вы идёте в вымышленное Fördeblick. Матео уверяет: хороший детектив обязан вовремя обедать.",
        clue: {
          title: "Красная сумка Нильса",
          text: "Грета подтверждает владельца и цвет. Последняя совместная остановка брата и сестры — кафе Fördeblick.",
        },
      },
    ],
  },
  {
    id: "essen",
    title: "Допрос с булочкой",
    place: "Holtenau · Fördeblick",
    topic: "Еда и напитки",
    grammar: "Akkusativ · möchten · nicht/kein · gern",
    beats: [
      {
        id: "04-order",
        title: "Не тот кофе",
        story: [
          "В кафе Матео приветствует вас: «{moin}!» Грета вспоминает заказ: «{nocoffee} {tea}». Запах {coffee} делает показания особенно убедительными.",
        ],
        prompt: "Что принести Грете?",
        challenge: choice("tea", [
          ["coffee", "Einen Kaffee", "keinen Kaffee — кофе она не хочет."],
          ["tea", "Einen Tee", "einen Tee — мужской род в Akkusativ."],
          ["beer", "Ein Bier", "Пиво в заказе не упомянуто."],
        ]),
        hint: "möchte — хотел(а) бы; keinen — отрицание существительного мужского рода.",
        success: "Чай доставлен. Свидетель сотрудничает добровольно.",
      },
      {
        id: "04-basket",
        title: "Заказ для команды",
        story: [
          "Дана выбирает {water} и {bread}. «{danke}», — говорит она. В блокноте немецкие слова уже не выглядят посторонними.",
        ],
        source: {
          title: "Заказ",
          lines: ["Zwei Flaschen Wasser, drei Brote und keinen Kaffee, bitte."],
        },
        prompt: "Соберите заказ по количествам.",
        challenge: {
          kind: "quantity",
          items: [
            { id: "w", text: "Flaschen Wasser", max: 5 },
            { id: "b", text: "Brote", max: 5 },
            { id: "c", text: "Kaffee", max: 5 },
          ],
          answer: { w: 2, b: 3, c: 0 },
        },
        hint: "zwei=2; drei=3; keinen=0. Не добавляйте кофе «на всякий случай».",
        success:
          "Вода и хлеб готовы. Кофемашина переживёт отсутствие внимания.",
      },
      {
        id: "04-request",
        title: "Слова для официанта",
        story: [
          "Грета снова говорит: «{tea}» Матео просит вас передать просьбу целиком.",
        ],
        prompt: "Соберите «Я хочу чай».",
        challenge: order(
          ["Ich", "möchte", "einen Tee."],
          ["einen Tee.", "Ich", "möchte"],
        ),
        hint: "Подлежащее → möchte → дополнение. der Tee становится einen Tee.",
        success: "Ich möchte einen Tee. Вежливо, понятно, без допросной лампы.",
      },
      {
        id: "04-receipt",
        title: "Немного счёта",
        story: [
          "Нильс произносит: «{bill}» Счёт оказывается полезнее салфетки с портретом подозрительной чайки.",
        ],
        source: {
          title: "Учебный чек · стол 4",
          lines: [
            "2 Tee — 5,00 €",
            "1 Brot — 3,50 €",
            "Gesamt: 8,50 €",
            "Keine Tasche im Café.",
          ],
        },
        prompt: "Что подтверждает чек вместе с записью сотрудника?",
        challenge: choice("paid", [
          [
            "paid",
            "Заказ на 8,50 €; сумки в кафе нет.",
            "Gesamt — итог; Keine Tasche im Café — сумки в кафе нет.",
          ],
          [
            "stolen",
            "Официант украл сумку.",
            "Запись об отсутствии сумки не доказывает кражу.",
          ],
          ["coffee", "Заказали два кофе.", "В чеке Tee, а не Kaffee."],
        ]),
        hint: "Gesamt — всего; keine Tasche — нет сумки.",
        success:
          "Вы сохраняете чек. Он подтверждает остановку, но не виновника.",
      },
      {
        id: "04-lead",
        title: "Новая остановка",
        story: [
          "«{nocoffee}», — шутит Грета, когда Матео приносит третий чай. Нильс вспоминает магазин после кафе.",
        ],
        source: {
          title: "Записка Нильса",
          lines: [
            "Nach dem Café: einkaufen. Ein Pullover für Greta. Die Tasche ist rot.",
          ],
        },
        prompt: "Что искать в магазине?",
        challenge: choice("sweater", [
          [
            "sweater",
            "Покупку свитера для Греты.",
            "Ein Pullover für Greta — свитер для Греты.",
          ],
          [
            "bread",
            "Три хлеба для чайки.",
            "Это был заказ команды; в новой записке назван Pullover.",
          ],
          ["keys", "Новый ключ от лодки.", "Ключей здесь нет."],
        ]),
        hint: "einkaufen — делать покупки; Pullover — свитер.",
        success:
          "Впереди магазин. Матео просит не покупать чайку в качестве свидетеля.",
        clue: {
          title: "След после кафе",
          text: "Заказ оплачен: 8,50 €. Красной сумки в кафе нет. Следующая известная остановка гостей — покупка свитера для Греты.",
        },
      },
    ],
  },
  {
    id: "einkaufen",
    title: "Сдача для следствия",
    place: "Holtenauer Straße · магазин",
    topic: "Покупки",
    grammar: "цены · количества · welcher · ihn/sie/es · zu groß",
    beats: [
      {
        id: "05-price",
        title: "Вопрос без пантомимы",
        story: [
          "На вешалке свитер. Вы спрашиваете: «{price}» Продавец показывает ценник; чайка снаружи показывает характер.",
        ],
        source: {
          title: "Учебные ценники",
          lines: [
            "Der Pullover: 18,50 €",
            "Die Jacke: 38,50 €",
            "Das T-Shirt: 8,50 €",
          ],
        },
        prompt: "Какой товар стоит 18,50 €?",
        challenge: choice("p", [
          ["j", "Die Jacke", "Куртка стоит 38,50 €."],
          ["t", "Das T-Shirt", "Футболка стоит 8,50 €."],
          ["p", "Der Pullover", "Да: свитер стоит 18,50 €."],
        ]),
        hint: "Сравните товар и его собственный ценник.",
        success:
          "18,50 €. Это цена свитера, а не взнос в фонд поиска табличек.",
      },
      {
        id: "05-change",
        title: "Касса без фокусов",
        story: [
          "Грета спрашивает «{price}», платит двадцать евро и ждёт сдачу. Матео считает быстрее, когда речь не о рецептах.",
        ],
        source: {
          title: "Покупка",
          lines: [
            "Ein Pullover: achtzehn Euro fünfzig.",
            "Greta bezahlt zwanzig Euro.",
          ],
        },
        prompt: "Сколько сдачи должна получить Грета?",
        challenge: choice("150", [
          ["250", "2,50 €", "20 − 18,50 = 1,50, а не 2,50."],
          ["150", "1,50 €", "Верно: ein Euro fünfzig."],
          ["1850", "18,50 €", "Это цена покупки, не сдача."],
        ]),
        hint: "achtzehn Euro fünfzig = 18,50; zwanzig = 20.",
        success:
          "Сдача правильная. Продавец благодарен, что вы расследуете не всю бухгалтерию.",
      },
      {
        id: "05-size",
        title: "Размер имеет значение",
        story: [
          "Свитер найден, но размер не тот. Продавец говорит «zu groß». Это не комплимент вашему детективному таланту.",
        ],
        source: {
          title: "Greta",
          lines: [
            "Ich brauche Größe M. Größe L ist zu groß. Der Pullover in M ist blau.",
          ],
        },
        prompt: "Какой свитер нужен Грете?",
        challenge: choice("m", [
          ["l", "Красный, L", "L ist zu groß — L слишком большой."],
          ["m", "Синий, M", "Нужен M; свитер этого размера синий."],
          ["s", "Синий, S", "Размер S никто не просил."],
        ]),
        hint: "brauchen — нуждаться; zu groß — слишком большой.",
        success:
          "Синий M подходит. Красная сумка не обязана совпадать с одеждой.",
      },
      {
        id: "05-pronoun",
        title: "Не повторять «свитер»",
        story: [
          "Нильс кивает на der Pullover. Грета: «{him}» Местоимение короткое, а покупка уже решена.",
        ],
        prompt: "Соберите ответ «Я беру его» о свитере.",
        challenge: order(["Ich", "nehme", "ihn."], ["ihn.", "nehme", "Ich"]),
        hint: "der Pullover → Akkusativ ihn. Не sie и не es.",
        success: "Ich nehme ihn. Продавец упаковывает покупку.",
      },
      {
        id: "05-bag",
        title: "Две одинаковые ручки",
        story: [
          "«{expensive}», — комментирует Матео цену декоративного якоря. Вы тем временем находите важную запись о сумках.",
        ],
        source: {
          title: "Запись продавца",
          lines: [
            "Nils: eine rote Tasche mit MOIN.",
            "Jensen: eine rote Tasche mit Brot.",
            "Beide Taschen sind groß. Treffen am Sonntag.",
          ],
        },
        prompt: "Какой вывод оправдан?",
        challenge: choice("two", [
          [
            "one",
            "Красная сумка была только одна.",
            "Beide Taschen — обе сумки; их две.",
          ],
          [
            "two",
            "У Нильса и Йенсена две похожие красные сумки.",
            "Имена, цвет и обе сумки указаны прямо.",
          ],
          [
            "guilty",
            "Йенсен признался в краже.",
            "Запись говорит о вещах, а не о намерениях.",
          ],
        ]),
        hint: "beide — оба/обе; mit — с. Следующая задача — восстановить встречу.",
        success:
          "Две красные сумки. Один детектив. Матео предлагает выдать сумкам фамилии.",
        clue: {
          title: "Две похожие сумки",
          text: "У Нильса красная сумка MOIN, у Йенсена — красная сумка с хлебом. Оба планировали встречу в воскресенье.",
        },
      },
    ],
  },
  {
    id: "zeit",
    title: "Полшестого — не половина дела",
    place: "Клуб · расписание",
    topic: "Время и распорядок",
    grammar: "часы · отделяемые глаголы · um/am/von…bis",
    beats: [
      {
        id: "06-time",
        title: "Услышать встречу",
        story: [
          "Йенсен уточняет время: {sunday}, {half}. Для верности он оставил голосовое сообщение.",
        ],
        audio: {
          file: "sunday",
          text: "Am Sonntag um halb sechs am Nachmittag. Nicht um halb sieben.",
          ru: "В воскресенье в половине шестого дня. Не в половине седьмого.",
        },
        prompt: "На какое время поставить напоминание?",
        challenge: choice("1730", [
          [
            "1830",
            "Воскресенье 18:30",
            "halb sieben — 18:30, это время прямо отрицается.",
          ],
          [
            "0530",
            "Воскресенье 05:30",
            "am Nachmittag — после полудня; не раннее утро.",
          ],
          [
            "1730",
            "Воскресенье 17:30",
            "halb sechs — половина шестого; после полудня это 17:30.",
          ],
        ]),
        hint: "halb называет следующий час: halb sechs = 5:30; Nachmittag уточняет 17:30.",
        success:
          "17:30. Чайку можно было бы пригласить к 05:30, но она и так приходит без приглашения.",
      },
      {
        id: "06-frame",
        title: "Приставка ушла в конец",
        story: [
          "На доске написано: «{starts}» Нужно добавить время так, чтобы an не осталось посреди комнаты.",
        ],
        prompt: "Соберите «Встреча начинается в 17:30».",
        challenge: order(
          ["Das Treffen", "fängt", "um 17:30 Uhr", "an."],
          ["an.", "um 17:30 Uhr", "Das Treffen", "fängt"],
        ),
        hint: "fängt — спрягаемая часть; отделяемая an уходит в конец.",
        success: "Рамка предложения замкнулась. Дверь клуба пока открыта.",
      },
      {
        id: "06-schedule",
        title: "Кто когда свободен",
        story: [
          "{sunday} подходит не всем автоматически. Матео прислал рабочий график.",
        ],
        source: {
          title: "Три записи",
          lines: [
            "Mateo arbeitet von Dienstag bis Samstag, von 17 bis 23 Uhr.",
            "Greta arbeitet am Sonntag von 9 bis 16 Uhr.",
            "Jensen ist am Sonntag ab 17 Uhr im Club.",
          ],
        },
        prompt: "Сопоставьте человека и воскресный план.",
        challenge: pairs(
          [
            ["m", "Mateo"],
            ["g", "Greta"],
            ["j", "Jensen"],
          ],
          [
            ["club", "В клубе с 17:00"],
            ["free", "Воскресенье свободно"],
            ["work", "Работа до 16:00"],
          ],
          { m: "free", g: "work", j: "club" },
        ),
        hint: "von…bis — с…до; ab — начиная с. Матео работает со вторника по субботу.",
        success:
          "В 17:30 все могут оказаться у клуба. График Матео не меняем ради удобной улики.",
      },
      {
        id: "06-call",
        title: "Подтвердить звонок",
        story: [
          "«{call}», — обещает Нильс Йенсену. В записке край потерялся вместе с последним словом.",
        ],
        prompt: "Верните обещанию правильный порядок.",
        challenge: order(
          ["Ich", "rufe", "dich", "an."],
          ["dich", "an.", "Ich", "rufe"],
        ),
        hint: "anrufen — отделяемый глагол: ich rufe … an.",
        success: "Звонок восстановлен. Теперь можно восстанавливать события.",
      },
      {
        id: "06-log",
        title: "Пятнадцать минут для путаницы",
        story: [
          "{starts} Гости приходят {half}; Нильс оставляет сумку у двери и отходит за чаем.",
        ],
        source: {
          title: "Журнал клуба · воскресенье",
          lines: [
            "17:30 Nils kommt mit einer roten Tasche.",
            "17:35 Jensen kommt mit einer roten Tasche.",
            "17:45 Jensen geht. Nils trinkt Tee.",
          ],
        },
        prompt: "Какой промежуток нужно проверить?",
        challenge: choice("gap", [
          [
            "morning",
            "С 05:30 до 06:00",
            "Журнал относится к вечерней встрече.",
          ],
          [
            "gap",
            "С 17:35 до 17:45: обе сумки были в клубе.",
            "В это время оба владельца и похожие сумки были в одном месте.",
          ],
          [
            "night",
            "После 23:00 на работе Матео",
            "В воскресенье Матео свободен; журнал о другом времени.",
          ],
        ]),
        hint: "Найдите пересечение времени присутствия Нильса и Йенсена.",
        success:
          "Пятнадцать минут сузились до десяти. Дело движется быстрее очереди за чаем.",
        clue: {
          title: "Окно путаницы",
          text: "В воскресенье с 17:35 до 17:45 обе красные сумки были у клуба. Затем Йенсен ушёл.",
        },
      },
    ],
  },
  {
    id: "freizeit",
    title: "Детектив тоже хочет выходной",
    place: "Kiellinie · планы команды",
    topic: "Досуг и встречи",
    grammar: "können/wollen · инфинитив · gern/lieber/am liebsten",
    beats: [
      {
        id: "07-can",
        title: "Возможность — ещё не обещание",
        story: [
          "Элиф пишет: «{can}» Матео радуется так, будто команда уже в сборе. Вы пока сохраняете спокойствие.",
        ],
        source: {
          title: "Чат",
          lines: [
            "Elif: Ich kann am Sonntag kommen. Ich möchte zuerst ins Museum.",
            "Hauke: Ich komme um 17:30 zum Club.",
          ],
        },
        prompt: "Кто уже прямо подтвердил приход к 17:30?",
        challenge: choice("h", [
          [
            "both",
            "Оба",
            "kann выражает возможность; Элиф пока не подтвердила время.",
          ],
          ["h", "Хауке", "Ich komme um 17:30 — прямое сообщение о плане."],
          ["e", "Только Элиф", "Элиф сказала kann и сначала хочет в музей."],
        ]),
        hint: "kann kommen — могу прийти; komme um… — приду в указанное время.",
        success: "В план записан Хауке. За Элиф решение не принимаем.",
      },
      {
        id: "07-want",
        title: "План для расследования",
        story: [
          "Дана говорит: «{together}» Матео не возражает, если поиск заканчивается ужином.",
        ],
        prompt: "Соберите фразу «Мы хотим искать вместе».",
        challenge: order(
          ["Wir", "wollen", "zusammen", "suchen."],
          ["suchen.", "zusammen", "Wir", "wollen"],
        ),
        hint: "wollen на втором месте; suchen — инфинитив в конце.",
        success:
          "Команда договорилась. На этот раз предмет обсуждения не меню.",
      },
      {
        id: "07-prefer",
        title: "Музей или вода",
        story: [
          "Элиф уточняет: «{rather}» Дана хочет гулять у воды. Выбирайте по сообщениям, а не по прогнозу чайки.",
        ],
        source: {
          title: "Предпочтения",
          lines: [
            "Elif geht lieber ins Museum als an den Strand.",
            "Dana geht am liebsten an der Kiellinie spazieren.",
            "Mateo fotografiert gern.",
          ],
        },
        prompt: "Соедините человека с предпочтением.",
        challenge: pairs(
          [
            ["e", "Elif"],
            ["d", "Dana"],
            ["m", "Mateo"],
          ],
          [
            ["photo", "Фотографировать"],
            ["walk", "Гулять на Kiellinie"],
            ["museum", "Музей"],
          ],
          { e: "museum", d: "walk", m: "photo" },
        ),
        hint: "lieber — охотнее, am liebsten — больше всего любит.",
        success:
          "Никого не отправили на пляж против воли. Чайка отправилась сама.",
      },
      {
        id: "07-reply",
        title: "Вежливый отказ двигает сюжет",
        story: [
          "Нильс пишет: «{cannot}» Приглашение на прогулку не пропало — нужно предложить другое время.",
        ],
        source: {
          title: "Nils",
          lines: [
            "Am Samstag kann ich nicht. Am Sonntag habe ich ab 16 Uhr Zeit.",
          ],
        },
        prompt: "Какое приглашение подходит?",
        challenge: choice("sun", [
          [
            "sat",
            "Kommst du am Samstag um 15 Uhr?",
            "Нильс не может в субботу.",
          ],
          [
            "early",
            "Kommst du am Sonntag um 14 Uhr?",
            "В воскресенье он свободен только с 16:00.",
          ],
          [
            "sun",
            "Kommst du am Sonntag um 17 Uhr?",
            "Воскресенье после 16:00 соответствует сообщению.",
          ],
        ]),
        hint: "ab 16 Uhr — начиная с 16:00.",
        success:
          "Время согласовано. Отказ не завершил игру: он помог найти рабочий план.",
      },
      {
        id: "07-photo",
        title: "Фотография без злодея",
        story: [
          "Матео: «{together}» Затем он показывает фото со встречи, сделанное {sunday}.",
        ],
        source: {
          title: "Подпись Матео",
          lines: [
            "17:40. Jensen fotografiert gern. Jetzt hat er zwei rote Taschen. Nils ist nicht auf dem Foto.",
          ],
        },
        prompt: "Что доказывает фото?",
        challenge: choice("two", [
          [
            "theft",
            "Йенсен намеренно украл табличку.",
            "Фото не показывает намерения или содержимое.",
          ],
          [
            "two",
            "В 17:40 у Йенсена две красные сумки.",
            "Это видимый факт и следующий след для проверки.",
          ],
          [
            "nils",
            "Нильс вообще не приходил.",
            "Отсутствие на одном фото не доказывает отсутствие на встрече.",
          ],
        ]),
        hint: "Отделяйте наблюдение от обвинения.",
        success:
          "У вас факт: две сумки. Матео требует увеличить фото, но увеличение только увеличивает сумки.",
        clue: {
          title: "Кадр в 17:40",
          text: "Фото показывает Йенсена с двумя красными сумками. Содержимое и намерения на фото не видны.",
        },
      },
    ],
  },
  {
    id: "wohnen",
    title: "Ключ от неправильной двери",
    place: "Клуб · гостевая комната",
    topic: "Жильё и вещи",
    grammar: "Dativ: im/in der/auf dem · сложные слова · объявления",
    beats: [
      {
        id: "08-where",
        title: "Сначала место",
        story: [
          "Йенсен оставил {key} для гостевой комнаты. Записка лежит {table}, сумка — {kitchen}. Элиф смеётся: скоро блокнот будет немецким, а вы — его русской сноской.",
        ],
        source: {
          title: "План комнаты",
          lines: [
            "Der Schlüssel liegt auf dem Tisch.",
            "Die Tasche steht in der Küche.",
            "Das Brot ist in der Tasche.",
          ],
        },
        prompt: "Разложите предметы по местам.",
        challenge: pairs(
          [
            ["k", "Schlüssel"],
            ["t", "Tasche"],
            ["b", "Brot"],
          ],
          [
            ["table", "auf dem Tisch"],
            ["kitchen", "in der Küche"],
            ["bag", "in der Tasche"],
          ],
          { k: "table", t: "kitchen", b: "bag" },
        ),
        hint: "Вопрос «где?» → Dativ: auf dem Tisch, in der Küche, in der Tasche.",
        success:
          "Ключ найден, хлеб локализован. Есть надежда, что он ещё не превратился в сухари.",
      },
      {
        id: "08-case",
        title: "Падеж важнее буквальной замены",
        story: [
          "Вы видите: «Das Brot ist {inbag}». Слово {bag} уже знакомо, но артикль меняется вместе с ролью в предложении.",
        ],
        prompt: "Выберите грамматически верное «Хлеб в сумке».",
        challenge: choice("dat", [
          [
            "nom",
            "Das Brot ist in die Tasche.",
            "Для места «где?» нужен Dativ: in der Tasche.",
          ],
          [
            "dat",
            "Das Brot ist in der Tasche.",
            "Да: die Tasche → in der Tasche.",
          ],
          [
            "masc",
            "Das Brot ist in dem Tasche.",
            "Tasche женского рода; в Dativ der, не dem.",
          ],
        ]),
        hint: "Заменяем целое «в сумке» на in der Tasche, а не отдельное «сумке» на Tasche.",
        success:
          "Падеж сохранился. Смешанный рассказ не должен учить сломанному немецкому.",
      },
      {
        id: "08-ad",
        title: "Комната для свидетеля",
        story: [
          "Грета ищет жильё на одну ночь. {key} у хозяина; объявление нужно понять до бронирования.",
        ],
        source: {
          title: "Вымышленные объявления",
          lines: [
            "A: Ein Zimmer, 45 € pro Nacht, Küche, ruhig.",
            "B: Zwei Zimmer, 90 € pro Nacht, keine Küche.",
            "Greta: maximal 50 €, ein Zimmer, mit Küche.",
          ],
        },
        prompt: "Какое объявление подходит Грете?",
        challenge: choice("a", [
          ["b", "B", "90 € выше бюджета, и кухни нет."],
          ["a", "A", "45 €, одна комната и кухня — все условия соблюдены."],
          ["none", "Ни одно", "A выполняет каждое условие."],
        ]),
        hint: "Сверяйте цену, число комнат и наличие кухни одновременно.",
        success:
          "Ночь устроена. В счёт не включили аренду подозрительной чайки.",
      },
      {
        id: "08-compound",
        title: "Последнее слово решает",
        story: [
          "На шкафу надпись Küchenschrank. На столе {key}. Йенсен говорит, что один из ключей от шкафа.",
        ],
        source: {
          title: "Словообразование",
          lines: [
            "die Küche + der Schrank = der Küchenschrank",
            "das Haus + die Tür = die Haustür",
          ],
        },
        prompt: "Какой артикль нужен у Küchenschrank?",
        challenge: choice("der", [
          [
            "die",
            "die",
            "Первое слово Küche не определяет род сложного слова.",
          ],
          ["das", "das", "Schrank мужского рода, не среднего."],
          ["der", "der", "Род определяется последней частью: der Schrank."],
        ]),
        hint: "В сложном существительном смотрите на последнее существительное.",
        success: "Шкаф оказался мужского рода. Это не улика против Йенсена.",
      },
      {
        id: "08-note",
        title: "В сумке вместо таблички",
        story: [
          "Вы открываете красную сумку в гостевой комнате: {inbag} только {bread}. {table} лежит ещё записка.",
        ],
        source: {
          title: "Jensen",
          lines: [
            "Die Tasche mit Brot bleibt hier. Die andere Tasche ist im Bus. Ich bin zu Hause.",
          ],
        },
        prompt: "Где искать вторую сумку?",
        challenge: choice("bus", [
          [
            "kitchen",
            "На кухне",
            "Hier остаётся сумка с хлебом; другая — im Bus.",
          ],
          [
            "bus",
            "В автобусе",
            "Die andere Tasche ist im Bus — вторая сумка в автобусе.",
          ],
          [
            "home",
            "У Йенсена дома",
            "Zu Hause относится к Йенсену, не к сумке.",
          ],
        ]),
        hint: "Отслеживайте подлежащее: Tasche и Ich — разные объекты.",
        success:
          "Хлеб остаётся в комнате. Команда отправляется по автобусному следу.",
        clue: {
          title: "Хлеб остался, MOIN поехал",
          text: "В клубной комнате сумка с хлебом. По записке Йенсена другая сумка осталась в автобусе.",
        },
      },
    ],
  },
  {
    id: "stadt",
    title: "Не тот автобус",
    place: "Киль · учебная схема маршрута",
    topic: "Город и транспорт",
    grammar: "mit/zu/bei/von/aus · Dativ · повелительное Sie",
    beats: [
      {
        id: "09-route",
        title: "Путь без знания города",
        story: [
          "Дана предлагает ехать {bus}. От клуба идите {station}; водитель подскажет, как попасть {cafe}. Все маршруты в игре учебные.",
        ],
        source: {
          title: "Учебная схема",
          lines: [
            "Club → Haltestelle → Bus 8 → Café Nordlicht",
            "Bus 6 → Bahnhof",
            "Bus 9 → Museum",
          ],
        },
        prompt: "На каком автобусе по учебной схеме ехать к Café Nordlicht?",
        challenge: choice("8", [
          ["9", "Bus 9", "Он идёт к музею."],
          ["8", "Bus 8", "По схеме Bus 8 связан с Café Nordlicht."],
          ["6", "Bus 6", "Он идёт к вокзалу."],
        ]),
        hint: "Вся нужная география дана в схеме; знать реальные линии Киля не требуется.",
        success:
          "Автобус выбран. Чайка пользуется собственным маршрутом без расписания.",
      },
      {
        id: "09-dativ",
        title: "Чем ехать",
        story: [
          "Вы снова едете {bus}. Водитель не требует рассказать всю историю, только куда вам нужно.",
        ],
        prompt: "Соберите «Мы едем на автобусе к кафе».",
        challenge: order(
          ["Wir", "fahren", "mit dem Bus", "zum Café."],
          ["zum Café.", "Wir", "mit dem Bus", "fahren"],
        ),
        hint: "mit требует Dativ: dem Bus; zu dem Café сокращается в zum Café.",
        success: "Предложение доехало до конца без потери падежей.",
      },
      {
        id: "09-directions",
        title: "Инструкция от водителя",
        story: [
          "У остановки водитель говорит: «{straight}» Затем добавляет ещё два коротких указания.",
        ],
        source: {
          title: "Маршрут пешком",
          lines: [
            "Gehen Sie geradeaus. Dann gehen Sie links. Das Café ist rechts.",
          ],
        },
        prompt: "Что делать сразу после движения прямо?",
        challenge: choice("left", [
          [
            "right",
            "Повернуть направо",
            "Справа находится кафе; сначала указано links.",
          ],
          [
            "left",
            "Пойти налево",
            "Dann gehen Sie links — затем идите налево.",
          ],
          ["back", "Вернуться к клубу", "Такой инструкции нет."],
        ]),
        hint: "geradeaus — прямо; links — налево/слева; rechts — направо/справа.",
        success:
          "Вы находите кафе. Даже у детектива есть право не кружить по кварталу.",
      },
      {
        id: "09-home",
        title: "Дома или домой",
        story: [
          "Йенсен написал: «Ich bin {home}». Вы уточняете, движется ли он куда-нибудь.",
        ],
        prompt: "Что означает сообщение Йенсена?",
        challenge: choice("at", [
          [
            "to",
            "Он сейчас едет домой.",
            "Направление было бы nach Hause; bin zu Hause описывает место.",
          ],
          ["at", "Он находится дома.", "zu Hause — дома."],
          ["cafe", "Он у кафе.", "Кафе в этой фразе не упомянуто."],
        ]),
        hint: "zu Hause — где; nach Hause — куда.",
        success:
          "Йенсен остаётся дома. Для поиска сумки его телепортация не требуется.",
      },
      {
        id: "09-lost",
        title: "В бюро находок",
        story: [
          "Вы пришли {cafe}. Сотрудница вымышленного Nordlicht показывает объявление о найденной сумке.",
        ],
        source: {
          title: "Fundsachen",
          lines: [
            "Eine rote Tasche aus dem Bus 8.",
            "Abholung bei Frau Klein in der Praxis neben dem Café.",
            "Heute bis 12 Uhr. Morgen geschlossen.",
          ],
        },
        prompt: "Куда и когда нужно обратиться?",
        challenge: choice("practice", [
          [
            "tomorrow",
            "Завтра в кафе",
            "Morgen geschlossen — завтра закрыто; выдача не в кафе.",
          ],
          [
            "practice",
            "Сегодня до 12:00 к фрау Кляйн в соседнюю практику.",
            "bei Frau Klein, Praxis neben dem Café, heute bis 12 Uhr.",
          ],
          [
            "station",
            "На вокзал после 17:00",
            "В объявлении другие место и время.",
          ],
        ]),
        hint: "Abholung — получение; bei — у; neben — рядом. Читайте все ограничения.",
        success:
          "Остаётся успеть к Кляйн. Поиск таблички неожиданно привёл к медицинскому словарю.",
        clue: {
          title: "Найденная сумка",
          text: "Красную сумку из учебного автобуса 8 можно забрать у фрау Кляйн в практике рядом с Café Nordlicht, сегодня до 12:00.",
        },
      },
    ],
  },
  {
    id: "gesundheit",
    title: "Приём без диагноза",
    place: "Вымышленная Praxis · Nordlicht",
    topic: "Здоровье и врач",
    grammar: "Kopfschmerzen · müssen/dürfen · просьбы du/ihr",
    beats: [
      {
        id: "10-reception",
        title: "Сначала понять вопрос",
        story: [
          "За стойкой Кляйн. Она видит ваш блокнот и спрашивает, нужна ли запись. Матео шутит: «{headache}» — от количества красных сумок.",
        ],
        audio: {
          file: "appointment",
          text: "Können Sie heute um Viertel nach elf kommen?",
          ru: "Вы можете сегодня прийти в четверть двенадцатого?",
        },
        prompt: "Какое время предлагает Кляйн?",
        challenge: choice("1115", [
          [
            "1145",
            "11:45",
            "Viertel vor zwölf — 11:45. Здесь Viertel nach elf.",
          ],
          ["1015", "10:15", "elf — одиннадцать, не десять."],
          ["1115", "11:15", "Четверть после одиннадцати = 11:15."],
        ]),
        hint: "Viertel nach elf = 11:15.",
        success:
          "Это предложение времени, ещё не диагноз. Вы уточняете, что пришли за сумкой.",
      },
      {
        id: "10-symptom",
        title: "Не перепутать части тела",
        story: [
          "Пока ждёте, Кляйн просит помочь с карточками. Никаких медицинских советов: только понять слова пациентов.",
        ],
        source: {
          title: "Карточки ожидания",
          lines: [
            "A: Ich habe Kopfschmerzen.",
            "B: Mein Bauch tut weh.",
            "C: Mein Rücken tut weh.",
          ],
        },
        prompt: "Сопоставьте карточку и место боли.",
        challenge: pairs(
          [
            ["a", "A"],
            ["b", "B"],
            ["c", "C"],
          ],
          [
            ["back", "спина"],
            ["head", "голова"],
            ["belly", "живот"],
          ],
          { a: "head", b: "belly", c: "back" },
        ),
        hint: "Kopf — голова; Bauch — живот; Rücken — спина.",
        success: "Карточки разложены. Назначения остаются делом врача.",
      },
      {
        id: "10-modal",
        title: "Что нужно сделать",
        story: [
          "Кляйн говорит: «{must}» Дверь в кабинет закрыта. Рядом табличка: «{noentry}»",
        ],
        prompt: "Что сделать сейчас?",
        challenge: choice("wait", [
          [
            "enter",
            "Войти без спроса",
            "dürfen nicht — нельзя; дверь кабинета закрыта.",
          ],
          [
            "leave",
            "Обязательно уйти домой",
            "müssen warten — нужно подождать, не уйти.",
          ],
          [
            "wait",
            "Подождать у стойки",
            "Sie müssen warten и запрет входа согласуются.",
          ],
        ]),
        hint: "müssen — необходимость; nicht dürfen — запрет.",
        success: "Вы ждёте. Терпение не считается новой уликой, но пригодится.",
      },
      {
        id: "10-sit",
        title: "Дружеская просьба",
        story: [
          "Дана видит усталого Матео: «{sit}» Он садится, не превращая ожидание в медицинскую драму.",
        ],
        prompt: "Соберите просьбу «Садись, пожалуйста».",
        challenge: order(
          ["Setz", "dich", "bitte."],
          ["bitte.", "dich", "Setz"],
        ),
        hint: "Setz — повелительное du; setz dich — садись.",
        success: "Матео сидит. Даже расследованию полезна короткая пауза.",
      },
      {
        id: "10-tag",
        title: "Улика под клапаном",
        story: [
          "Кляйн приносит сумку. {inbag} деревянный край, но замок закрыт. На клапане карточка.",
        ],
        source: {
          title: "Бирка выдачи",
          lines: [
            "Nils. Inhalt: Schild MOIN.",
            "Bitte im Büro abholen. Jensen hat den Schlüssel.",
            "Frau Klein: Die Tasche ist hier. Der Schlüssel ist nicht hier.",
          ],
        },
        prompt: "Что ещё нужно, чтобы открыть сумку?",
        challenge: choice("key", [
          [
            "doctor",
            "Разрешение врача на прогулку",
            "Сумка не медицинская задача; разрешение здесь не требуется.",
          ],
          [
            "key",
            "Ключ Йенсена из офиса.",
            "Jensen hat den Schlüssel; ключа у Кляйн нет.",
          ],
          [
            "bread",
            "Купить хлеб вместо ключа",
            "Хлеб уже найден и не открывает замок.",
          ],
        ]),
        hint: "Сумка и ключ находятся в разных местах. По бирке ключ у Йенсена, выдача через офис.",
        success:
          "Сумка найдена, но дело ещё не закрыто: нужно проверить её содержимое и восстановить путь.",
        clue: {
          title: "Бирка Нильса",
          text: "На найденной сумке: «Nils. Inhalt: Schild MOIN». Ключ у Йенсена; он просит обратиться в офис.",
        },
      },
    ],
  },
  {
    id: "arbeit",
    title: "Алиби с глаголом в конце",
    place: "Офис клуба · записи",
    topic: "Работа и прошлый день",
    grammar: "профессии · Perfekt с haben · war/hatte",
    beats: [
      {
        id: "11-job",
        title: "Работа — часть биографии",
        story: [
          "Матео объясняет: «{cook}» Дана — врач по образованию и занимается признанием диплома. Детективами они работают только в этой истории.",
        ],
        source: {
          title: "Карточки героев",
          lines: [
            "Mateo ist Koch.",
            "Dana ist Ärztin.",
            "Frau Petersen arbeitet im Büro der Sprachschule.",
          ],
        },
        prompt: "Соедините человека и занятие.",
        challenge: pairs(
          [
            ["m", "Mateo"],
            ["d", "Dana"],
            ["p", "Petersen"],
          ],
          [
            ["office", "Офис языковой школы"],
            ["cook", "Koch"],
            ["doctor", "Ärztin"],
          ],
          { m: "cook", d: "doctor", p: "office" },
        ),
        hint: "Koch — повар; Ärztin — врач (женщина); Büro — офис.",
        success:
          "Биографии согласованы. Ни одному герою не пришлось увольняться ради сюжета.",
      },
      {
        id: "11-perfect",
        title: "Что было вчера",
        story: [
          "Йенсен оставил записку: «{worked}» Слова habe и gearbeitet держат прошедшее событие с двух сторон.",
        ],
        prompt: "Соберите «Я вчера работал».",
        challenge: order(
          ["Ich", "habe", "gestern", "gearbeitet."],
          ["gearbeitet.", "gestern", "habe", "Ich"],
        ),
        hint: "Perfekt: habe на втором месте, Partizip II gearbeitet в конце.",
        success:
          "Прошлое восстановлено грамматически. Теперь восстановим его по фактам.",
      },
      {
        id: "11-was",
        title: "Небольшая биография ключа",
        story: [
          "Йенсен вспоминает: «В воскресенье в 16:00 {was} {had}» В офисном журнале уточняется, когда ключ оказался у него.",
        ],
        source: {
          title: "Журнал ключей · воскресенье",
          lines: [
            "17:00 Petersen hatte den Schlüssel.",
            "17:20 Jensen war im Büro. Er hat den Schlüssel bekommen.",
            "17:25 Petersen hat das Büro geschlossen.",
          ],
        },
        prompt: "Кто получил ключ в 17:20?",
        challenge: choice("j", [
          [
            "p",
            "Петерсен",
            "В 17:00 ключ был у неё; в 17:20 его получил Йенсен.",
          ],
          ["j", "Йенсен", "Er hat den Schlüssel bekommen относится к Йенсену."],
          ["n", "Нильс", "Нильс в журнале не указан."],
        ]),
        hint: "hatte — имел(а); hat bekommen — получил. Следите за временем и er.",
        success:
          "Ключ должен быть у Йенсена. Его записка «не было ключа» относится к более раннему моменту.",
      },
      {
        id: "11-account",
        title: "Не кража, а действие",
        story: [
          "Второе сообщение наконец объясняет, зачем Йенсен взял обе сумки.",
        ],
        source: {
          title: "Jensen · отчёт",
          lines: [
            "Ich habe beide Taschen getragen. Nils hat Tee geholt.",
            "Ich habe das Brot im Club gelassen.",
            "Die andere Tasche habe ich im Bus vergessen.",
            "Ich hatte Stress. Es tut mir leid.",
          ],
        },
        prompt: "Какая цепочка соответствует отчёту?",
        challenge: order(
          [
            "Взял обе сумки",
            "Оставил хлеб в клубе",
            "Забыл вторую сумку в автобусе",
          ],
          [
            "Забыл вторую сумку в автобусе",
            "Взял обе сумки",
            "Оставил хлеб в клубе",
          ],
        ),
        hint: "getragen — нёс; gelassen — оставил; vergessen — забыл.",
        success:
          "Отчёт объясняет и фото, и хлеб в клубе, и автобус. Языковая ошибка не понадобилась как «доказательство».",
      },
      {
        id: "11-key",
        title: "Получить ключ по инструкции",
        story: [
          "Петерсен пишет: «{key} liegt {table}». Матео торжественно объявляет: у ключа было самое простое алиби.",
        ],
        source: {
          title: "Сообщение из офиса",
          lines: [
            "Jensen hat den Schlüssel heute zurückgebracht.",
            "Er liegt auf dem Tisch im Büro. Bitte nehmt nur den kleinen Schlüssel.",
          ],
        },
        prompt: "Какой ключ взять?",
        challenge: choice("small", [
          [
            "large",
            "Большой ключ с кухни",
            "Нужен только маленький: nur den kleinen Schlüssel.",
          ],
          ["all", "Все ключи со стола", "nur запрещает брать остальные."],
          [
            "small",
            "Маленький ключ со стола в офисе.",
            "На столе в офисе; взять только маленький.",
          ],
        ]),
        hint: "zurückgebracht — принёс обратно; nur — только; kleinen — маленький.",
        success: "Маленький ключ у вас. Можно возвращаться к сумке.",
        clue: {
          title: "Признание в забывчивости",
          text: "Йенсен нёс обе сумки, оставил хлеб в клубе и забыл вторую в автобусе. Ключ возвращён в офис.",
        },
      },
    ],
  },
  {
    id: "reisen",
    title: "Moin возвращается",
    place: "Киль · клуб",
    topic: "Поездки, погода и даты",
    grammar: "Perfekt с sein · погода · am ersten… · повторение A1",
    beats: [
      {
        id: "12-weather",
        title: "Погода не читает сценарий",
        story: [
          "{rain} Команда едет {bus}, а не идёт пешком. {arrived} — теперь рядом с ней и вы.",
        ],
        source: {
          title: "План возвращения",
          lines: [
            "Heute: Regen und Wind.",
            "Wir fahren mit dem Bus. Die Tasche bleibt trocken.",
            "Morgen: Sonne. Treffen im Club.",
          ],
        },
        prompt: "Как вернуть табличку по текущему плану?",
        challenge: choice("bus", [
          [
            "walk",
            "Сегодня пешком под дождём",
            "План явно говорит mit dem Bus и сохранить сумку сухой.",
          ],
          [
            "bus",
            "Сегодня на автобусе, сохранив сумку сухой.",
            "Это соответствует и погоде, и плану.",
          ],
          [
            "wait",
            "Ждать лето на пляже",
            "План не откладывает возврат на сезон.",
          ],
        ]),
        hint: "Regen — дождь; Wind — ветер; trocken — сухой.",
        success: "Сумка сухая. Чайка мокрая, но сохраняет достоинство.",
      },
      {
        id: "12-perfect",
        title: "Как мы добрались",
        story: [
          "Вы пишете в блокнот: «{traveled}» У движения другой вспомогательный глагол, чем у gearbeitet.",
        ],
        prompt: "Соберите «Сумка прибыла».",
        challenge: order(
          ["Die Tasche", "ist", "angekommen."],
          ["angekommen.", "Die Tasche", "ist"],
        ),
        hint: "ankommen образует Perfekt с sein: ist angekommen.",
        success:
          "Die Tasche ist angekommen. Прибытие заслуживает точки, а не ещё одного пересадочного билета.",
      },
      {
        id: "12-date",
        title: "Дата для приглашения",
        story: [
          "Йенсен назначает маленькую встречу {date}. Это вымышленная дата встречи команды, а не календарь Kieler Woche.",
        ],
        source: {
          title: "Приглашение",
          lines: [
            "Treffen am ersten Juni um 17:30 Uhr im Club.",
            "Bitte Wasser und Brot mitbringen.",
          ],
        },
        prompt: "Какую дату поставить в приглашении?",
        challenge: choice("june", [
          ["july", "1 июля, 17:30", "Juni — июнь; Juli — июль."],
          ["june", "1 июня, 17:30", "am ersten Juni — первого июня."],
          [
            "jan",
            "6 января, 05:30",
            "ersten — первого; Juni — июнь; 17:30 указано прямо.",
          ],
        ]),
        hint: "Дата после am: am ersten Juni. Не путайте Juni и Juli.",
        success:
          "Приглашение готово. Для {water} и {bread} теперь есть и повод, и время.",
      },
      {
        id: "12-deduction",
        title: "Закрыть дело фактами",
        story: [
          "Все улики в вашем блокноте. Табличка видна {inbag}; {key} уже подходит к замку. Элиф просит выбрать объяснение всей цепочки.",
        ],
        source: {
          title: "Сводка",
          lines: [
            "Фото 17:40: у Йенсена две красные сумки.",
            "Хлеб остался в клубе. Сумка MOIN найдена в автобусе.",
            "Йенсен сообщил: «Die andere Tasche habe ich im Bus vergessen».",
          ],
        },
        prompt: "Что произошло с табличкой?",
        challenge: choice("forgot", [
          [
            "gull",
            "Чайка украла табличку и водила автобус.",
            "Фото, сумка из автобуса и отчёт этого не подтверждают.",
          ],
          [
            "forgot",
            "Йенсен помог нести сумки и забыл MOIN в автобусе.",
            "Объяснение согласуется со всеми независимыми уликами.",
          ],
          [
            "nils",
            "Нильс выдумал пропажу ради бесплатного чая.",
            "Чай не объясняет путь найденной сумки и отчёт Йенсена.",
          ],
        ]),
        hint: "Нужно объяснить одновременно две сумки, хлеб в клубе и находку в автобусе.",
        success:
          "Дело закрыто без злодея. Йенсен виноват в забывчивости; чайка — только в краже одной крошки.",
        clue: {
          title: "Реконструкция",
          text: "Йенсен помог Нильсу, нёс две сумки и забыл сумку MOIN в автобусе. Находка возвращена по бирке и ключу.",
        },
      },
      {
        id: "12-finale",
        title: "Последняя надпись",
        story: [
          "{found} На подставке снова MOIN. Йенсен говорит «{danke}», Матео приносит {bread}, Дана — {water}. Даже чайка на секунду молчит.",
          "Вы начинали с русского рассказа. Теперь {moin}, {inbag}, {table}, {bus} и целые немецкие фразы стали частью одной истории. Блокнот всё ещё нужен — но уже по другой причине.",
        ],
        prompt: "Соберите финальную запись «Мы нашли табличку».",
        challenge: order(
          ["Wir", "haben", "das Schild", "gefunden."],
          ["gefunden.", "das Schild", "Wir", "haben"],
        ),
        hint: "finden → gefunden; Perfekt с haben. das Schild — Akkusativ среднего рода.",
        success:
          "«Wir haben das Schild gefunden». Йенсен выдаёт вам новую должность: человек, который знает, где лежит ключ. Оплата прежняя — danke.",
      },
    ],
  },
];
export const beats = episodes.flatMap((e) => e.beats);

// Later scenes bring back the same grammatical units in a new situation.
// These are authored story callbacks, not a separate vocabulary drill.
const callbacks: Record<string, string> = {
  "02-have":
    "Вы снова представляетесь: «{kiel}» На вопрос «{name}» Нильс отвечает своим именем — контакт теперь не просто набор цифр.",
  "03-no":
    "Матео ещё раз поясняет: «{argentina} Но сумка не моя». Вы благодарите его: «{danke}»",
  "03-next":
    "Нильс обещает помочь: «{have}» Грета улыбается: «{sister} — так он представляет меня всем, даже чайке».",
  "04-receipt":
    "Грета представляется: «Nils — {brother}». Сотрудник ещё раз сверяет фото: «Nils und {hisbag}».",
  "05-price":
    "Матео смотрит на соседнюю кофейню: «{coffee}?» Вы качаете головой: «{nocoffee}» Следствие сначала, кофе потом.",
  "05-bag":
    "Грета уже сказала о свитере: «{him}» Нильс проверил фото: «{nobag}» — это слова Матео, значит, искать его сумку незачем. За чек в кафе отвечала фраза «{bill}»; за ценник здесь — «{price}».",
  "06-log":
    "«{expensive}», — вздыхает Матео над ценником декоративного якоря в вашем блокноте. Йенсен по телефону обещает: «{call}»",
  "07-photo":
    "Дана пишет «{can}», Элиф отвечает «{cannot} — я пока в музее». Фраза «{rather}» теперь объясняет, почему её нет на снимке.",
  "08-note":
    "Грета снова {kitchen}, а Нильс проверяет {inbag}. «{together}», — напоминает Дана: одной фотографии для вывода недостаточно.",
  "09-lost":
    "Вы повторяете маршрут {station}. Водитель говорит «{straight}», и вскоре команда уже идёт {cafe}. Йенсен остаётся {home}.",
  "10-tag":
    "Пока оформляют выдачу, снова звучит «{must}». Дана просит Матео «{sit}». Он признаётся: «{headache}». В кабинет команда не заходит: «{noentry}».",
  "11-account":
    "«{worked}», — повторяет Йенсен. Матео кивает: «{cook}» Оба понимают усталость, но всё равно проверяют записи.",
  "11-key":
    "В 16:00 Йенсен писал «{was} {had}»; в 17:20 ключ уже был у него. Теперь вы видите {key} собственными глазами.",
  "12-finale":
    "Вы вспоминаете обратный путь: «{rain} {traveled} {arrived}» В приглашении стоит {date}. А сейчас главное: {found}",
};
for (const beat of beats)
  if (callbacks[beat.id]) beat.story.push(callbacks[beat.id]);

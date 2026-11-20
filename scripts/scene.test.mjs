import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { phrases } from "../src/story/data.ts";
import { compoundOf, decipher, gridSolutions, initialAnswer, isCorrect, mistake, plannerFree, solution, storyLines, validateChallenge, validateStory } from "../src/story/logic.ts";
import { anweisung, answerSlots, arrange, flatNodes, flow, keyOf, lookOrder, nodeAt, outcomeOf, requiredKeys, sceneKeys, shownWords, spot, typedRight, worldAfter } from "../src/story/scene.ts";
import { RACE_STAKES } from "../src/story/build.ts";
import { MNEMONICS } from "../src/story/mnemonics.ts";
import { applyEffects, holds, TRACKS } from "../src/story/world.ts";
import { sceneChapter1 } from "../src/story/scenes/01.ts";
import { GERMAN_TARGET, sceneChapters } from "../src/story/scenes/index.ts";
import { SCENE_RULES } from "../src/story/scenes/rules.ts";
import { RETURNS, WARMUPS } from "../src/story/scenes/warmups.ts";
import { reviewTwenty, twenty } from "../src/story/twenty.ts";
import { found } from "./a1-index.mjs";


const words = JSON.parse(readFileSync(new URL("../src/generated/a1-words.json", import.meta.url)));
// Общие правила проверяются во всех главах сцен; частные случаи движка — на главе 1.
const scenes = sceneChapter1.beats;
const allScenes = sceneChapters.flatMap((c) => c.beats);
const nodes = (beat) => beat.challenge.nodes;
/** Что игрок делает сам: всё, кроме реплик, рассказа, предметов и улик. */
const ACTIONS = ["reply", "type", "gap", "hear", "pick", "look", "game"];

test("the scene prototype is valid, voiced and needs every node", () => {
  assert.deepEqual(validateStory(sceneChapters, phrases), []);
  for (const beat of allScenes) {
    const c = beat.challenge;
    assert.equal(c.kind, "play");
    assert.ok(isCorrect(c, solution(c)), beat.id);
    assert.ok(!isCorrect(c, initialAnswer(c)), beat.id);
    assert.ok(!isCorrect(c, solution(c).slice(1)), beat.id);
  }
  const voiced = new Set(storyLines(sceneChapters, {}).map((l) => `${l.voice}|${l.text}`));
  const audio = JSON.parse(readFileSync(new URL("../src/generated/story-audio.json", import.meta.url)));
  for (const key of voiced) assert.ok(audio[key], `нет записи: ${key}`);
});

test("a scene is mostly the player's actions, not reading", () => {
  for (const chapter of sceneChapters) {
  let actions = 0;
  for (const beat of chapter.beats) {
    const all = flatNodes(nodes(beat));
    const own = all.filter((n) => ACTIONS.includes(n.t)).length;
    actions += own;
    // Интерлюдия глазами другого героя короче, но и она — не только чтение.
    if (beat.pov) {
      assert.ok(own >= 3, `${beat.id}: действий ${own}`);
      continue;
    }
    assert.ok(own >= 10, `${beat.id}: действий ${own}`);
    assert.ok(all.filter((n) => n.t === "say").length >= 6, `${beat.id}: мало реплик`);
    assert.ok(new Set(all.filter((n) => ACTIONS.includes(n.t)).map((n) => n.t)).size >= 5, `${beat.id}: однообразно`);
  }
  assert.ok(actions >= 35, `${chapter.id}: ${actions}`);
  }
});

test("the scene keeps a rhythm: short reading between actions and no long run of the same choice", () => {
  // Рассказ и реплики идут потоком до действия, поэтому чтение между действиями короткое,
  // а выбор из кнопок (reply, pick, gap, hear) разбавлен играми и вводом.
  const CHOICE = ["reply", "pick", "gap", "hear"];
  for (const beat of allScenes) {
    const all = flatNodes(nodes(beat)).filter((n) => n.t !== "go" && n.t !== "when" && n.t !== "pic");
    let reading = 0;
    let choices = 0;
    for (const n of all) {
      if (n.t === "narr") assert.ok(n.text.length <= 170, `${beat.id}: длинный рассказ: ${n.text.slice(0, 40)}`);
      if (ACTIONS.includes(n.t)) reading = 0;
      else assert.ok(++reading <= 4, `${beat.id}: пять узлов чтения подряд перед «${n.text ?? n.de}»`);
      choices = CHOICE.includes(n.t) ? choices + 1 : ACTIONS.includes(n.t) ? 0 : choices;
      assert.ok(choices <= 3, `${beat.id}: четыре выбора подряд: ${n.task}`);
    }
    if (!beat.pov) assert.ok(all.filter((n) => n.t === "game").length >= 2, `${beat.id}: меньше двух игр`);
    // Правило истории: два одинаковых действия подряд не ставим; игры сравниваются по виду.
    const kinds = all.filter((n) => ACTIONS.includes(n.t)).map((n) => (n.t === "game" ? `game:${n.c.kind}` : n.t));
    kinds.forEach((k, i) => assert.ok(i === 0 || k !== kinds[i - 1], `${beat.id}: два ${k} подряд`));
  }
});

test("the right answer is not given away by its place", () => {
  // Сид — id сцены, как в прототипе. Верный вариант стоит на каждом месте примерно поровну и не
  // стоит на одном месте три выбора подряд; важные предметы осмотра не идут подряд в начале.
  for (const chapter of sceneChapters) {
  const shown = [];
  for (const beat of chapter.beats) {
    const slots = answerSlots(nodes(beat), beat.id);
    const run = [];
    for (const key of sceneKeys(nodes(beat))) {
      const n = nodeAt(nodes(beat), key);
      if (n.t === "look") {
        const order = lookOrder(n.items, `${beat.id}-${key}`);
        const keys = n.items.filter((i) => i.key).length;
        if (keys > 1 && keys < n.items.length)
          assert.ok(order.slice(0, keys).some((i) => !n.items[i].key), `${beat.id}: важное — первым рядом`);
        continue;
      }
      if (!["reply", "pick", "gap", "hear"].includes(n.t)) continue;
      if (n.options.filter((o) => o.ok).length > 1) continue;
      const options = n.t === "gap" || n.t === "hear" ? n.options.map((text) => ({ text, ok: text === n.answer })) : n.options;
      const place = arrange(options, `${beat.id}-${key}`, slots.get(key)).findIndex((o) => o.ok);
      run.push(place);
      assert.ok(run.length < 3 || new Set(run.slice(-3)).size > 1, `${beat.id} ${key}: третий раз подряд на месте ${place}`);
      shown.push(place);
    }
  }
  for (const place of [0, 1, 2]) {
    const count = shown.filter((p) => p === place).length;
    assert.ok(Math.abs(count - shown.length / 3) <= 3, `${chapter.id}: верный на месте ${place + 1}: ${count} из ${shown.length}`);
  }
  }
});

test("story nouns are spoken with their plural, like lesson words", () => {
  // CONTENT.md: у существительного pl обязателен, запись произносит «der Name, die Namen».
  for (const [id, p] of Object.entries(phrases))
    if (/^(der|die|das) \p{L}+$/u.test(p.de)) assert.ok(p.pl, `нет множественного: ${id} ${p.de}`);
});

test("a story note adds something new, not the gender and plural shown next to it", () => {
  // Род виден по артиклю, множественное — в подписи «мн. ч. die …» рядом с переводом;
  // иначе подсказка повторяется: «дверь · мн. ч. die Türen. … во множественном числе die Türen».
  for (const [id, p] of Object.entries(phrases)) {
    if (!p.pl) continue;
    assert.ok(!p.note.includes(`die ${p.pl}`), `${id}: заметка повторяет множественное`);
    assert.doesNotMatch(p.note, /(мужск|женск|средн)[а-я]* род|множественн/i, `${id}: заметка повторяет род или число`);
  }
});

test("everything the player examines is named in German, once per chapter", () => {
  const units = new Set([...Object.keys(words), ...Object.values(phrases).map((p) => p.de)]);
  for (const chapter of sceneChapters) {
  const seen = new Set();
  for (const beat of chapter.beats)
    for (const n of flatNodes(nodes(beat))) {
      if (n.t !== "look") continue;
      for (const item of n.items) {
        assert.ok(item.de, `${beat.id}: без немецкого: ${item.ru}`);
        assert.ok(units.has(item.de), `${beat.id}: нет записи слова: ${item.de}`);
        assert.ok(!seen.has(item.de), `${beat.id}: уже осматривали: ${item.de}`);
        seen.add(item.de);
      }
    }
  }
});

test("tasks explain their grammar with lesson fragments up to their chapter", () => {
  // Как в основной игре (A1-STORY.md, «Правила в игре»): правило — фрагмент разбора урока с
  // таблицей или схемой. Глава сцен N берёт уроки 1–N: окончания глаголов из урока 1 нужны и
  // во второй главе: «Nils kommt aus Hamburg».
  const rules = JSON.parse(readFileSync(new URL("../src/generated/story-rules.json", import.meta.url)));
  const lessons = ["kennenlernen", "zahlen", "familie", "essen", "einkaufen", "tagesablauf", "freizeit", "wohnen", "stadt", "gesundheit", "arbeit", "reisen"];
  sceneChapters.forEach((chapter, i) => {
    const all = chapter.beats.flatMap((beat) => flatNodes(nodes(beat)));
    for (const n of all.filter((n) => n.rule))
      for (const ref of n.rule) {
        assert.ok(rules[ref]?.point && (rules[ref].table || rules[ref].rows?.length), ref);
        // Правило новой версии (sollen, mögen — их нет в уроках A1) открывается со своей главы.
        const own = ref.startsWith("moin/") ? SCENE_RULES[ref] : null;
        if (own) assert.ok(own.chapter <= i + 1, `${chapter.id}: ${ref} — правило с главы ${own.chapter}`);
        else assert.ok(lessons.indexOf(ref.split("/")[0]) >= 0 && lessons.indexOf(ref.split("/")[0]) <= i, `${chapter.id}: ${ref} — урок ещё впереди`);
      }
    // Замок и записка проверяют грамматику целой фразой: без правила их проходят перебором.
    for (const n of all.filter((n) => n.t === "game" && (n.c.kind === "lock" || n.c.kind === "letter")))
      assert.ok(n.rule?.length, `${chapter.id}: ${n.task}`);
    assert.ok(all.filter((n) => n.rule).length >= 10, chapter.id);
  });
  const nils = sceneChapters[1].beats.flatMap((b) => flatNodes(nodes(b))).find((n) => n.t === "type" && n.answers.includes("Nils kommt aus Hamburg."));
  assert.ok(nils.rule.includes("kennenlernen/endungen-1"));
});

test("a typed answer with a free part shows a sample that fits, not a name in the wrong place", () => {
  for (const beat of allScenes)
    for (const n of flatNodes(nodes(beat)))
      if (n.t === "type" && n.answers.some((a) => a.includes("*"))) {
        assert.ok(n.sample, `${beat.id}: ${n.task}`);
        assert.equal(typedRight(n.sample, n.answers), "right", n.sample);
      }
  // Без образца сцена не проходит проверку.
  const bare = { kind: "play", nodes: [{ t: "type", task: "x", answers: ["Ich komme aus *."] }] };
  assert.ok(validateStory([{ ...sceneChapter1, beats: [{ ...scenes[0], challenge: bare }] }], phrases).length > 0);
});

test("reading flows by itself up to the next action and settles conditions on the way", () => {
  const nodes = [
    { t: "narr", text: "a" },
    { t: "say", who: "A", voice: "Anna", de: "Moin!", ru: "Привет!" },
    { t: "when", if: [{ q: "gull", min: 1 }], then: [{ t: "narr", text: "b" }], else: [{ t: "clue", title: "c", text: "c" }] },
    { t: "gap", task: "x", text: "___", options: ["a", "b"], answer: "a" },
    { t: "narr", text: "d" },
  ];
  assert.deepEqual(flow(nodes, [], undefined, { gull: 1 }), ["0", "1", "2|0", "2.0.0"]);
  assert.deepEqual(flow(nodes, [], undefined, {}), ["0", "1", "2|1", "2.1.0"]);
  // Действие останавливает поток, после него поток идёт до конца сцены.
  assert.deepEqual(flow(nodes, ["0", "1", "2|1", "2.1.0"], undefined, {}), []);
  assert.deepEqual(flow(nodes, ["0", "1", "2|1", "2.1.0", "3"], undefined, {}), ["4"]);
});

test("the narration names known things in German: at least the share of the plot plan", () => {
  // Новое выражение читается с переводом, знакомое (выражение или слово, которое сцены уже
  // показали) — только по-немецки. Цель главы 1 в A1-PLOT.md — 10% немецких слов в рассказе.
  // Цель по главам — A1-PLOT.md: 10% в главе 1, 15% в главе 2. Знакомое переходит из главы в главу.
  const known = new Set();
  for (const chapter of sceneChapters) {
  let de = 0;
  let ru = 0;
  for (const beat of chapter.beats)
    for (const n of flatNodes(nodes(beat))) {
      if (n.t === "narr") {
        const text = n.text.replace(/\{([\w-]+)\}/g, (_, id) => {
          const p = phrases[id];
          const shown = known.has(id) || known.has(p.de) ? p.de : `${p.ru} ${p.de}`;
          known.add(id);
          return ` ${shown} `;
        });
        for (const w of text.split(/[\s«»„“"(),.!?:;—–…-]+/).filter(Boolean))
          if (/[а-яё]/i.test(w)) ru++;
          else if (/^\p{L}+$/u.test(w)) de++;
      }
      for (const w of shownWords([n])) known.add(w);
    }
  assert.ok((100 * de) / (de + ru) >= GERMAN_TARGET[chapter.id], `${chapter.id}: ${((100 * de) / (de + ru)).toFixed(1)}%`);
  }
});

test("a number to dial or a PIN is on screen when it is asked for", () => {
  // Номер или PIN берутся из того, что видно в этот момент: из задания или из реплики и улики после
  // прошлого действия. Текст пройденной игры (записки) на экране уже не стоит, а подсказка
  // появляется только после ошибки.
  const number = /\b(null|eins|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf)\b|zehn\b|zig\b/i;
  for (const beat of allScenes) {
    const all = flatNodes(nodes(beat)).filter((n) => n.t !== "go" && n.t !== "when" && n.t !== "pic");
    all.forEach((n, i) => {
      if (n.t !== "game" || n.c.kind !== "code") return;
      const since = [];
      for (let j = i - 1; j >= 0 && !ACTIONS.includes(all[j].t); j--) since.push(all[j]);
      const shown = [n.task, ...since.map((x) => (x.t === "say" ? x.de : x.t === "clue" ? x.text : x.t === "narr" ? x.text : ""))].join(" ");
      assert.match(shown, number, `${beat.id}: ${n.task}`);
    });
  }
});

test("a typing task asks for the answer, it does not show it", () => {
  // Подсказка под полем — смысл реплики, а не сама реплика; в тексте задания ответа тоже нет.
  // Номер кольца диктуется словами («Ha – E – El. Sieben, drei, null, fünf»), а пишется буквами и цифрами.
  const norm = (s) => s.toLowerCase().replace(/[^a-zа-яё0-9äöüß]/gi, "");
  for (const beat of allScenes)
    for (const n of flatNodes(nodes(beat))) {
      if (n.t !== "type") continue;
      for (const answer of n.answers.filter((a) => !a.includes("*"))) {
        assert.notEqual(norm(n.ru ?? ""), norm(answer), `${beat.id}: ${n.task}`);
        assert.ok(norm(answer).length < 4 || !norm(n.task).includes(norm(answer)), `${beat.id}: ${n.task}`);
      }
    }
});

test("a new phrase in narration stands where Russian needs the nominative", () => {
  // В первый раз выражение читается как «перевод + немецкое»: «печать, штамп der Stempel». Перевод
  // стоит в именительном падеже, поэтому после «без», «по», «три» и других слов, которые требуют
  // другого падежа, фраза ломается: «три печать». Согласование с прилагательным проверяется глазами.
  const oblique = new Set(["без", "по", "у", "к", "ко", "от", "до", "для", "из", "при", "о", "об", "около", "после", "кроме", "среди", "два", "две", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять"]);
  const known = new Set();
  for (const chapter of sceneChapters)
    for (const beat of chapter.beats)
      for (const n of flatNodes(nodes(beat))) {
        if (n.t === "narr") {
          const parts = n.text.split(/(\{[\w-]+\})/);
          parts.forEach((part, i) => {
            if (!part.startsWith("{")) return;
            const id = part.slice(1, -1);
            const fresh = !known.has(id) && !known.has(phrases[id].de);
            known.add(id);
            const word = parts[i - 1]?.trim().split(/\s+/).at(-1)?.toLowerCase();
            assert.ok(!fresh || !oblique.has(word), `${beat.id}: «${word} ${phrases[id].ru}»`);
          });
        }
        for (const w of shownWords([n])) known.add(w);
      }
});

test("every new word has a translation and comes back in an action after it is heard", () => {
  // Основа слова без артикля и знаков: Hafen → hafe, kommen aus → komm.
  const stem = (word) => word.replace(/^(der|die|das) /, "").replace(/[?!.,]/g, "").toLowerCase().slice(0, 4);
  const text = (n) =>
    n.t === "reply" || n.t === "pick"
      ? n.options.map((o) => o.text).join(" ")
      : n.t === "type"
        ? n.answers.join(" ")
        : n.t === "gap"
          ? `${n.text} ${n.options.join(" ")}`
          : n.t === "hear"
            ? `${n.de} ${n.options.join(" ")}`
            : n.t === "look"
              ? n.items.map((i) => i.de ?? "").join(" ")
              : n.t === "game"
                ? JSON.stringify(n.c)
                : "";
  // Слово урока или выражение истории; вернуть его может и планировщик — играми следующих глав.
  const storyWords = new Set(Object.values(phrases).map((p) => p.de));
  const planned = (n) => [
    ...(WARMUPS[n] ?? []).flatMap((g) => g.words),
    ...(RETURNS[n] ?? []).flatMap((b) => [...(b.docks ?? []), ...(b.bingo ?? [])]),
  ];
  // Действие вместе с инструкцией экзамена над ним: «Füllen Sie das Formular aus» возвращает ausfüllen.
  const actionsOf = (c, n) => c.beats.flatMap((beat) => flatNodes(nodes(beat))).filter((x) => ACTIONS.includes(x.t)).map((x) => [x, n]);
  const returns = (word, [n, ch]) => text(n).toLowerCase().includes(stem(word)) || found(word, `${text(n)}\n${anweisung(n, ch) ?? ""}`);
  sceneChapters.forEach((chapter, ci) => {
    const all = chapter.beats.flatMap((beat) => flatNodes(nodes(beat)));
    const ahead = new Set(sceneChapters.slice(ci + 1).flatMap((_, k) => planned(ci + 2 + k)));
    const after = sceneChapters.slice(ci + 1).flatMap((c, k) => actionsOf(c, ci + 2 + k));
    for (const [i, node] of all.entries()) {
      if (node.t !== "say") continue;
      for (const word of node.learn ?? []) {
        assert.ok(words[word] || storyWords.has(word), `нет ни в словаре уроков, ни в выражениях истории: ${word}`);
        const later = [...all.slice(i + 1).filter((n) => ACTIONS.includes(n.t)).map((n) => [n, ci + 1]), ...after];
        assert.ok(ahead.has(word) || later.some((x) => returns(word, x)), `${chapter.id}: не возвращается: ${word}`);
      }
    }
  });
});

test("from chapter 2 tasks carry the German exam instruction", () => {
  const hear = { t: "hear", task: "x", voice: "Eddy", de: "Hallo!", options: ["a"], answer: "a" };
  assert.equal(anweisung(hear, 1), undefined, "в главе 1 инструкций нет");
  assert.equal(anweisung(hear, 2), "Hören Sie und wählen Sie die richtige Antwort.");
  sceneChapters.forEach((chapter, ci) => {
    if (ci === 0) return;
    const acts = chapter.beats.flatMap((b) => flatNodes(nodes(b))).filter((n) => ACTIONS.includes(n.t));
    const with_ = acts.filter((n) => anweisung(n, ci + 1));
    assert.ok(with_.length * 2 >= acts.length, `${chapter.id}: инструкция только у ${with_.length} из ${acts.length} действий`);
  });
  // Объявление на вокзале слушают как Durchsage, как в экзамене.
  const announced = sceneChapters.flatMap((c) => c.beats.flatMap((b) => flatNodes(nodes(b)))).filter((n) => n.t === "hear" && n.an);
  assert.ok(announced.length >= 3 && announced.every((n) => n.an.includes("Durchsage")));
});

test("twenty questions is won only by crossing out what an answer excluded", () => {
  const c = twenty("club", ["elif", "dana", "mateo", "nils", "jensen", "frauke"], "mateo", "Hauke", "Rocko");
  assert.ok(validateChallenge(c, new Set(), phrases));
  assert.ok(isCorrect(c, solution(c)));
  // Вычеркнуть всех без вопросов — не победа, даже если загадка верна.
  assert.equal(isCorrect(c, ["x:elif", "x:dana", "x:nils", "x:jensen", "x:frauke"]), false);
  // Карточку, которую ни один вопрос не отличает от загаданной, проверка вида не пропускает.
  assert.equal(validateChallenge({ ...c, questions: c.questions.filter((q) => !q.yes.includes("frauke") && !q.no.includes("frauke")) }, new Set(), phrases), false);
  // В раунде повторения Элиф загадывает слово из очереди среди уже встреченных.
  const hobbies = ["Tennis spielen", "schwimmen", "segeln", "kochen", "lesen", "tanzen"];
  const round = reviewTwenty(["kochen"], (u) => hobbies.includes(u));
  assert.ok(round && round.cards.find((card) => card.id === round.answer).unit === "kochen");
  assert.ok(validateChallenge(round, new Set(), phrases) && isCorrect(round, solution(round)));
});

test("the weather map is solved by the forecast, day by day", () => {
  const map = sceneChapters.flatMap((c) => c.beats.flatMap((b) => flatNodes(nodes(b)))).find((n) => n.t === "game" && n.c.kind === "weather").c;
  assert.ok(validateChallenge(map, new Set(), phrases));
  const right = solution(map);
  assert.ok(isCorrect(map, right));
  // Неверный значок или пустой день — не решение; приманка в прогнозе не звучит.
  assert.equal(isCorrect(map, { ...right, [map.days[0]]: "e" }), false);
  assert.equal(isCorrect(map, Object.fromEntries(Object.entries(right).slice(1))), false);
  // Фраза без слова своего значка не проходит проверку вида.
  const silent = { ...map, forecast: map.forecast.map((f, i) => (i ? f : { ...f, de: `Am ${f.day} ist es schön.` })) };
  assert.equal(validateChallenge(silent, new Set(), phrases), false);
  // Отрицание путает слух: «regnet es nicht» звучит как дождь.
  const negated = { ...map, forecast: map.forecast.map((f, i) => (i ? f : { ...f, de: `${f.de} Aber nicht lange.` })) };
  assert.equal(validateChallenge(negated, new Set(), phrases), false);
});

test("branches are played in the player's order and the scene resumes where it stopped", () => {
  const hub = nodes(scenes[2]);
  const go = hub.findIndex((n) => n.t === "go");
  const done = sceneKeys(hub).filter((k) => !k.includes(".")).filter((k) => Number(k) < go);
  assert.equal(spot(hub, done).at, "menu");
  // Выбранная ветка открывается, начатая продолжается и после перезагрузки.
  assert.equal(spot(hub, done, `${go}.2`).key, `${go}.2.0`);
  done.push(`${go}.2.0`);
  assert.equal(spot(hub, done).key, `${go}.2.1`);
  done.push(...requiredKeys(hub, done).filter((k) => k.startsWith(`${go}.2.`) && !done.includes(k)));
  assert.equal(spot(hub, done).at, "menu");
  const all = solution(scenes[2].challenge);
  assert.equal(spot(hub, all).at, "end");
});

test("a typed introduction accepts any name but keeps the German frame", () => {
  const answers = ["Ich heiße *.", "Ich bin *."];
  for (const ok of ["Ich heiße Andrei.", "Ich heiße Andrei", "Ich bin Anna Maria.", "Ich heiße Jean-Luc."])
    assert.equal(typedRight(ok, answers), "right", ok);
  for (const bad of ["Ich heiße andrei.", "Ich heisse.", "Ich komme aus Russland.", "Heiße Andrei.", "Ich heiße 123."])
    assert.notEqual(typedRight(bad, answers), "right", bad);
  assert.equal(typedRight("ja, ich wohne in Kiel", ["Ja, ich wohne in Kiel."]), "case");
  assert.equal(typedRight("Ja, ich wohne in Kiel", ["Ja, ich wohne in Kiel."]), "right");
});

test("every scene picture exists, is a compressed JPEG and stands before a node", async () => {
  const { existsSync, statSync } = await import("node:fs");
  const pics = allScenes.flatMap((beat) => flatNodes(nodes(beat))).filter((n) => n.t === "pic");
  assert.ok(pics.length >= 4, `${pics.length}`);
  for (const p of pics) {
    const file = new URL(`../public/story-img/${p.src}`, import.meta.url);
    assert.ok(existsSync(file), p.src);
    assert.match(p.src, /\.jpg$/);
    assert.ok(statSync(file).size < 260_000, `${p.src}: ${statSync(file).size}`);
    assert.match(p.alt, /[а-яё]/i, p.src);
  }
  assert.equal(new Set(pics.map((p) => p.src)).size, pics.length);
  // Каждая сцена открывается картинкой: она задаёт место и героев до первой реплики.
  for (const beat of allScenes) assert.equal(nodes(beat)[0].t, "pic", beat.id);
});

test("clocks stay within their segments and conditions read the world", () => {
  let world = {};
  for (let i = 0; i < 9; i++) world = applyEffects(world, { gull: 1 });
  assert.equal(world.gull, TRACKS.gull.size);
  assert.equal(applyEffects({ gull: 1 }, { gull: -3 }).gull, 0);
  assert.ok(holds([{ q: "gull", min: 2 }], { gull: 2 }));
  assert.ok(!holds([{ q: "gull", min: 2 }, { q: "frauke", min: 1 }], { gull: 2 }));
  assert.ok(holds([{ q: "frauke", max: 0 }], {}));
});

test("a game moves the world by how it was played", () => {
  // Без ошибок — clean, одна ошибка — ничего, от двух — sloppy; старая запись без числа — ничего.
  const stakes = { clean: { nils: 1 }, sloppy: { gull: 1 } };
  assert.deepEqual(outcomeOf(stakes, "0"), { nils: 1 });
  assert.equal(outcomeOf(stakes, "1"), undefined);
  assert.deepEqual(outcomeOf(stakes, "3"), { gull: 1 });
  assert.equal(outcomeOf(stakes, ""), undefined);
  const first = nodes(scenes[0]);
  const race = String(first.findIndex((n) => n.t === "game" && n.c.kind === "gull"));
  assert.equal(worldAfter(first, [`${race}|2`]).gull, 1);
  assert.equal(worldAfter(first, [`${race}|1`]).gull, undefined);
  assert.equal(worldAfter(first, [`${race}|0`]).gull, undefined);
  assert.equal(worldAfter(first, [race]).gull, undefined);
});

test("the gull grows bolder only through the player", () => {
  // Каждая гонка с чайкой ставит на кон её наглость.
  for (const beat of allScenes)
    for (const n of flatNodes(nodes(beat)))
      if (n.t === "game" && n.c.kind === "gull") assert.deepEqual(n.outcome, RACE_STAKES, beat.id);
  // Сюжет сам часы не двигает: рост наглости — только выбор игрока, итог игры или кража по
  // условию, которое уже зависит от прохождения.
  const walk = (list, inWhen, where) => {
    for (const n of list) {
      if (!inWhen) assert.ok(!((n.set?.gull ?? 0) > 0), `${where}: ${n.text ?? n.t}`);
      if (n.t === "when") {
        walk(n.then, true, where);
        walk(n.else ?? [], true, where);
      }
      if (n.t === "go") for (const b of n.branches) walk(b.nodes, inWhen, where);
    }
  };
  for (const beat of allScenes) walk(nodes(beat), false, beat.id);
});

test("a side task is optional, but leaving the hub is a step of its own", () => {
  const first = nodes(scenes[0]);
  const hub = first.findIndex((n) => n.t === "go");
  const before = requiredKeys(first, []).filter((k) => Number(k.split(".")[0]) < hub);
  // Побочная ветка видна, но не обязательна: меню сразу готово отпустить дальше.
  const here = spot(first, before);
  assert.equal(here.at, "menu");
  assert.equal(here.ready, true);
  assert.ok(!requiredKeys(first, before).some((k) => k.startsWith(`${hub}.0.`)));
  assert.ok(requiredKeys(first, before).includes(`${hub}`));
  // Пройденное задание оставляет последствие: доверие Фрауке.
  const side = requiredKeys(first[hub].branches[0].nodes, [], `${hub}.0.`);
  const world = worldAfter(first, [...before, ...side, `${hub}`]);
  assert.equal(world.frauke, 1);
  assert.equal(worldAfter(first, [...before, `${hub}`]).frauke, undefined);
});

test("a choice moves a clock and a condition keeps the side it took", () => {
  const third = nodes(scenes[2]);
  // Выбор «подозреваемая» сдвигает часы чайки, «свидетель» — нет.
  const pickKey = sceneKeys(third).find((k) => {
    const [i, j, n] = k.split(".").map(Number);
    const node = third[i].t === "go" ? third[i].branches[j]?.nodes[n] : undefined;
    return node?.t === "pick" && node.options.some((o) => o.set);
  });
  assert.ok(pickKey);
  assert.equal(worldAfter(third, [`${pickKey}|Чайка — подозреваемая`], { gull: 1 }).gull, 2);
  assert.equal(worldAfter(third, [`${pickKey}|Чайка — свидетель`], { gull: 1 }).gull, 1);
  // Условие, до которого дошла сцена, решается один раз: его сторона хранится в ответе.
  const finale = third.findIndex((n) => n.t === "when");
  const early = requiredKeys(third, []).filter((k) => Number(k.split(".")[0]) < finale);
  assert.equal(spot(third, early).at, "auto");
  assert.ok(requiredKeys(third, [...early, `${finale}|0`]).includes(`${finale}.0.0`));
  assert.ok(!requiredKeys(third, [...early, `${finale}|1`]).includes(`${finale}.0.0`));
});

test("validation knows only real clocks and keeps conditions off required branches", () => {
  const scene = (nodes) => ({ ...sceneChapter1, beats: [{ ...scenes[0], id: "x", challenge: { kind: "play", nodes } }] });
  const narr = { t: "narr", text: "Текст." };
  assert.deepEqual(validateStory([scene([narr])], phrases), []);
  // Правило — только у действия и только ссылкой «тема/фрагмент».
  const gap = { t: "gap", task: "x", text: "Ich ___.", options: ["bin", "ist"], answer: "bin" };
  assert.deepEqual(validateStory([scene([{ ...gap, rule: ["kennenlernen/endungen-3"] }])], phrases), []);
  assert.notDeepEqual(validateStory([scene([{ ...narr, rule: ["kennenlernen/endungen-3"] }])], phrases), []);
  assert.notDeepEqual(validateStory([scene([{ ...gap, rule: ["endungen"] }])], phrases), []);
  assert.notDeepEqual(validateStory([scene([{ ...narr, set: { bogus: 1 } }])], phrases), []);
  assert.notDeepEqual(validateStory([scene([{ t: "when", if: [{ q: "bogus", min: 1 }], then: [narr] }])], phrases), []);
  const branch = (extra) => ({ label: "Ветка", icon: "•", nodes: [narr], ...extra });
  assert.notDeepEqual(validateStory([scene([{ t: "go", task: "?", branches: [branch({ if: [{ q: "gull", min: 1 }] }), branch()] }])], phrases), []);
  assert.deepEqual(validateStory([scene([{ t: "go", task: "?", branches: [branch({ optional: true, if: [{ q: "gull", min: 1 }] })] }])], phrases), []);
});

test("mnemonics belong to lesson words or story phrases", () => {
  const units = new Set([...Object.keys(words), ...Object.values(phrases).map((p) => p.de)]);
  for (const [de, hook] of Object.entries(MNEMONICS)) {
    assert.ok(units.has(de), `не слово урока и не выражение: ${de}`);
    assert.match(hook, /[а-яё]/i, de);
  }
  assert.match(MNEMONICS["die Möwe"], /мов/);
});

test("new mini-games check the answer, and their puzzles have exactly one way out", () => {
  const valid = (c) => validateChallenge(c, new Set(), phrases);
  // «Wer war wo?»: решатель находит единственную раскладку, а лишняя улика делает сетку негодной.
  const grid = {
    kind: "grid",
    people: ["Greta", "Herr Wulff", "Herr Jensen"],
    cols: [{ id: "wo", label: "Wo?", values: ["am Kiosk", "im Erdgeschoss", "im ersten Stock"] }],
    clues: [
      { de: "Greta ist nicht im Haus am Hafen.", ru: "", a: "Greta", b: "wo:im Erdgeschoss", not: true },
      { de: "", ru: "", a: "Greta", b: "wo:im ersten Stock", not: true },
      { de: "", ru: "", a: "Herr Wulff", b: "wo:im ersten Stock", not: true },
    ].map((c) => ({ ...c, de: c.de || "x", ru: "x" })),
    answer: { "Greta|wo": "am Kiosk", "Herr Wulff|wo": "im Erdgeschoss", "Herr Jensen|wo": "im ersten Stock" },
  };
  assert.equal(gridSolutions(grid, grid.clues).length, 1);
  assert.ok(valid(grid));
  assert.ok(isCorrect(grid, solution(grid)));
  assert.ok(!isCorrect(grid, { ...grid.answer, "Greta|wo": "im Erdgeschoss", "Herr Wulff|wo": "am Kiosk" }));
  assert.match(mistake(grid, { "Greta|wo": "im Erdgeschoss", "Herr Wulff|wo": "am Kiosk", "Herr Jensen|wo": "im ersten Stock" }, ""), /Greta ist nicht/);
  assert.ok(!valid({ ...grid, clues: grid.clues.slice(1) }), "без улики решений больше одного");
  assert.ok(!valid({ ...grid, clues: [...grid.clues, { de: "x", ru: "x", a: "Herr Jensen", b: "wo:am Kiosk", not: true }] }), "лишняя улика");
  // «Шифр чайки»: номера букв и сдвиг.
  assert.equal(decipher({ code: "8-5-12 7-15-12-1-14-4" }), "HEL GOLAND");
  assert.equal(decipher({ code: "NPJO", shift: 1 }), "MOIN");
  assert.ok(isCorrect({ kind: "cipher", code: "13-15-9-14", answer: "MOIN", ru: "x" }, " moin "));
  // «Ежедневник»: засчитывается свободная клетка, занятая — нет.
  const planner = {
    kind: "planner",
    days: ["Montag", "Dienstag"],
    hours: ["am Vormittag", "am Abend"],
    notes: [
      { who: "Elif", de: "x", ru: "x", busy: ["Montag|am Vormittag", "Dienstag|am Vormittag"] },
      { who: "Hauke", de: "x", ru: "x", only: ["Dienstag|am Abend", "Montag|am Vormittag"] },
    ],
  };
  assert.deepEqual(plannerFree(planner), ["Dienstag|am Abend"]);
  assert.ok(valid(planner));
  assert.ok(isCorrect(planner, { "Dienstag|am Abend": "star", "Montag|am Abend": "busy" }));
  assert.ok(!isCorrect(planner, { "Montag|am Abend": "star" }));
  assert.match(mistake(planner, { "Montag|am Abend": "star" }, ""), /Hauke/);
  // «Склейка»: слово — части подряд, артикль — по последней части.
  assert.equal(compoundOf(["Fisch", "Brötchen"]), "Fischbrötchen");
  const glue = { kind: "compound", rounds: [{ word: "das Fischbrötchen", parts: ["Fisch", "Brötchen"], ru: "x" }, { word: "das Mittagessen", parts: ["Mittag", "Essen"], ru: "x" }], extra: ["Tee"] };
  assert.ok(valid(glue));
  assert.ok(!valid({ ...glue, rounds: [{ word: "der Fischbrötchen", parts: ["Fisch", "Brot"], ru: "x" }, glue.rounds[1]] }));
  assert.ok(isCorrect(glue, ["das Fischbrötchen", "das Mittagessen"]));
  // «Лифт», «Похожие звуки», «Найди противоречие», «Объявления».
  const lift = { kind: "lift", top: 2, rounds: [{ who: "x", de: "x", ru: "x", floor: 1 }, { who: "x", de: "x", ru: "x", floor: -1 }] };
  assert.ok(valid(lift) && isCorrect(lift, ["1", "-1"]) && !isCorrect(lift, ["1", "0"]));
  const sounds = { kind: "sounds", rounds: ["a", "b", "c"].map((w) => ({ say: w, options: [w, `${w}x`] })) };
  assert.ok(valid(sounds) && isCorrect(sounds, ["a", "b", "c"]));
  const contra = { kind: "contra", texts: [{ who: "A", lines: [["um", "fünf"]] }, { who: "B", lines: [["um", "sechs"]] }], answer: ["0:0:1", "1:0:1"] };
  assert.ok(valid(contra) && isCorrect(contra, ["1:0:1", "0:0:1"]) && !isCorrect(contra, ["0:0:1"]));
  assert.ok(!valid({ ...contra, answer: ["0:0:0", "0:0:1"] }), "противоречие — между двумя показаниями");
  const ads = { kind: "ads", people: [{ id: "a", text: "x" }, { id: "b", text: "x" }], ads: [{ id: "A", title: "x", text: "x" }, { id: "B", title: "x", text: "x" }], answer: { a: "B", b: "0" } };
  assert.ok(valid(ads) && isCorrect(ads, { a: "B", b: "0" }) && !isCorrect(ads, { a: "A", b: "0" }));
  // «Семейное дерево»: пустые клетки получают имена из рассказа, ошибка называет строку с верным именем.
  const tree = {
    kind: "tree",
    text: [{ de: "Meine Mutter heißt Kerstin.", ru: "x" }, { de: "Ihr Bruder Jan ist mein Onkel.", ru: "x" }],
    root: { id: "oma", icon: "👵", children: [{ id: "mutter", children: [{ id: "lotte", given: "Lotte" }] }, { id: "onkel" }] },
    names: ["Kerstin", "Jan", "Inge", "Krümel"],
    answer: { oma: "Inge", mutter: "Kerstin", onkel: "Jan" },
  };
  assert.ok(!valid(tree), "имя Inge в рассказе не названо");
  tree.text.push({ de: "Meine Oma heißt Inge.", ru: "x" });
  assert.ok(valid(tree));
  assert.ok(isCorrect(tree, solution(tree)));
  assert.ok(!isCorrect(tree, { oma: "Inge", mutter: "Jan", onkel: "Kerstin" }));
  assert.match(mistake(tree, { oma: "Inge", mutter: "Jan", onkel: "Kerstin" }, ""), /Jan — не на своём месте.*Kerstin/);
  assert.ok(!valid({ ...tree, answer: { ...tree.answer, onkel: "Kerstin" } }), "одно имя на две клетки");
  // «Фоторобот»: варианты только из словаря портрета, ошибка называет часть.
  const portrait = {
    kind: "portrait",
    notes: [{ de: "Er ist groß.", ru: "x" }, { de: "Seine Jacke ist dunkelblau.", ru: "x" }],
    parts: [
      { id: "size", label: "Рост", options: ["groß", "klein"] },
      { id: "top", label: "Одежда", options: ["die Jacke", "der Mantel"] },
      { id: "says", label: "Говорит", options: ["Moin.", "Hallo!"] },
    ],
    answer: { size: "groß", top: "die Jacke", says: "Moin." },
  };
  assert.ok(valid(portrait) && isCorrect(portrait, solution(portrait)));
  assert.match(mistake(portrait, { size: "groß", top: "der Mantel", says: "Moin." }, ""), /одежда/);
  assert.ok(!valid({ ...portrait, parts: [{ id: "size", label: "Рост", options: ["groß", "riesig"] }], answer: { size: "groß" } }), "riesig не нарисовать");
  // «Я шпион»: загадку решают и местоимение, и цвет; если хватает одного, загадка негодна.
  const spy = {
    kind: "spy",
    items: [
      { de: "die Hose", colour: "rot" },
      { de: "das T-Shirt", colour: "rot" },
      { de: "die Jacke", colour: "gelb" },
      { de: "der Schuh", colour: "schwarz" },
      { de: "das Kleid", colour: "schwarz" },
    ],
    rounds: [{ de: "Sie ist rot!", ru: "x", pronoun: "sie", colour: "rot", answer: "die Hose" }, { de: "Es ist rot!", ru: "x", pronoun: "es", colour: "rot", answer: "das T-Shirt" }],
  };
  assert.ok(valid(spy) && isCorrect(spy, ["die Hose", "das T-Shirt"]) && !isCorrect(spy, ["das T-Shirt", "die Hose"]));
  assert.ok(!valid({ ...spy, rounds: [{ de: "Sie ist gelb!", ru: "x", pronoun: "sie", colour: "gelb", answer: "die Jacke" }, spy.rounds[0]] }), "gelb один — местоимение не нужно");
  assert.ok(!valid({ ...spy, items: [...spy.items, { de: "das Hemd", colour: "rot" }] }), "две вещи под одну загадку");
  // «Алгоритм»: засчитывается любая программа, которая доводит до цели в пределах карточек.
  const algo = { kind: "algo", width: 3, height: 2, start: { x: 0, y: 1, heading: 1 }, places: { "0,1": "Café", "2,0": "die Post" }, goal: "2,0", moves: ["geradeaus", "links", "rechts"], max: 4 };
  assert.ok(valid(algo));
  assert.ok(isCorrect(algo, ["geradeaus", "geradeaus", "links"]), "другой путь к той же цели");
  assert.ok(!isCorrect(algo, ["geradeaus", "links"]));
  assert.match(mistake(algo, ["geradeaus", "links"], ""), /перекрёсток.*die Post/);
  assert.match(mistake(algo, ["rechts"], ""), /за край/);
  assert.ok(!valid({ ...algo, max: 2 }), "решение длиннее, чем помещается карточек");
  for (const c of [grid, planner, glue, lift, sounds, contra, ads, tree, portrait, spy, algo]) assert.ok(!isCorrect(c, initialAnswer(c)), c.kind);
});

test("a phrase after a German article or preposition reads without its own article", async () => {
  const { germanBefore } = await import("../src/story/scene.ts");
  for (const before of ["Das Schild MOIN ist wieder am ", "Nils kommt aus dem ", "Lotte ist in Klasse drei: zwanzig ", "Mit einem "])
    assert.ok(germanBefore(before), before);
  for (const before of ["К пустому ", "Über dem Wasser: ", "Das ist ", ""]) assert.ok(!germanBefore(before), before);
});

test("all 13 new mechanics validate, check answers, explain mistakes and appear in chapters", async () => {
  const { NEW_KINDS } = await import("../src/story/mechanics-logic.ts");
  const valid = validateChallenge;
  const spring = {
    kind: "spring",
    rounds: [
      {
        ru: "Утром я иду на причал.",
        base: ["Ich", "gehe", "am Morgen", "zum Kai", "."],
        trigger: "Am Morgen",
        start: ["Am Morgen", "ich", "gehe", "zum Kai", "."],
        answer: ["Am Morgen", "gehe", "ich", "zum Kai", "."],
        also: [["Zum Kai", "gehe", "ich", "am Morgen", "."]],
        why: "На втором месте остаётся глагол.",
      },
      {
        ru: "Мы хотим завтра поехать в город.",
        base: ["Wir", "fahren", "morgen", "in die Stadt", "."],
        trigger: "möchten",
        start: ["Wir", "möchten", "fahren", "morgen", "in die Stadt", "."],
        answer: ["Wir", "möchten", "morgen", "in die Stadt", "fahren", "."],
        why: "Инфинитив уходит в конец.",
      },
    ],
  };
  spring.rounds[0].also = [["Am Morgen", "gehe", "zum Kai", "ich", "."]];
  const room = {
    kind: "room",
    title: "Стол клуба",
    furniture: [{ x: 20, y: 20, w: 120, h: 60, label: "Tisch" }],
    spots: [
      { id: "a", x: 60, y: 50, label: "на столе" },
      { id: "b", x: 140, y: 120, label: "у двери" },
      { id: "c", x: 240, y: 120, label: "у окна" },
    ],
    items: [
      { id: "cup", icon: "☕", de: "die Tasse", ru: "чашка" },
      { id: "bag", icon: "👜", de: "die Tasche", ru: "сумка" },
      { id: "key", icon: "🔑", de: "der Schlüssel", ru: "ключ" },
    ],
    notes: [
      { de: "Die Tasse steht auf dem Tisch.", ru: "Чашка стоит на столе." },
      { de: "Die Tasche liegt an der Tür.", ru: "Сумка лежит у двери." },
    ],
    answer: { cup: "a", bag: "b", key: "c" },
  };
  const torn = {
    kind: "torn",
    title: "Обрывки записки",
    strips: [
      { id: "1", de: "Liebe Greta,", ru: "Дорогая Грета," },
      { id: "2", de: "am Samstag", ru: "в субботу" },
      { id: "3", de: "feiern wir.", ru: "мы празднуем." },
      { id: "4", de: "Dein Opa", ru: "Твой дедушка" },
    ],
    also: [["1", "3", "2", "4"]],
  };
  const contrast = {
    kind: "contrast",
    bays: [
      { id: "haben", label: "haben" },
      { id: "sein", label: "sein" },
    ],
    items: [
      { id: "a", text: "Er ___ Tee getrunken.", bay: "haben", why: "trinken -> haben" },
      { id: "b", text: "Sie ___ Kuchen gegessen.", bay: "haben", why: "essen -> haben" },
      { id: "c", text: "Er ___ nach Kiel gefahren.", bay: "sein", why: "fahren -> sein" },
      { id: "d", text: "Wir ___ spät gekommen.", bay: "sein", why: "kommen -> sein" },
    ],
  };
  const tail = {
    kind: "tail",
    rounds: [
      { word: "das Krankenhaus", parts: ["Kranken", "Haus"], ru: "больница" },
      { word: "der Einkaufszettel", parts: ["Einkaufs", "Zettel"], ru: "список покупок" },
    ],
  };
  const protocol = {
    kind: "protocol",
    title: "Протокол",
    clues: [
      { who: "Dana", de: "Die Farbe ist blau.", ru: "Краска синяя." },
      { who: "Nils", de: "Das Schild liegt in der Werkstatt.", ru: "Табличка в мастерской." },
    ],
    parts: ["Die Farbe ist ", { slot: "f", label: "цвет" }, ", das Schild ist ", { slot: "w", label: "где" }, " und gehört ", { slot: "o", label: "кому" }, "."],
    bank: ["blau", "in der Werkstatt", "dem Club", "rot"],
    answer: { f: "blau", w: "in der Werkstatt", o: "dem Club" },
  };
  const budget = {
    kind: "budget",
    items: [
      { id: "tea", de: "der Tee", ru: "чай", price: 200, max: 2, tags: ["drink"] },
      { id: "bun", de: "das Brötchen", ru: "булочка", price: 150, max: 2, tags: ["food"] },
      { id: "cake", de: "der Kuchen", ru: "торт", price: 300, max: 1, tags: ["food"] },
      { id: "cola", de: "die Cola", ru: "кола", price: 400, max: 1, tags: ["sweet"] },
    ],
    rules: [
      { kind: "maxPrice", cents: 600, label: "До 6,00 €" },
      { kind: "minTotal", count: 2, label: "Минимум 2 вещи" },
      { kind: "minTag", tag: "drink", count: 1, label: "1 напиток" },
      { kind: "forbidTag", tag: "sweet", label: "Без сладкого" },
    ],
  };
  const groupchat = {
    kind: "groupchat",
    title: "Чат клуба",
    messages: [
      { id: "m1", who: "Nils", de: "Wann treffen wir uns?", ru: "Когда встречаемся?" },
      { id: "m2", who: "Dana", de: "Wo ist der Schlüssel?", ru: "Где ключ?" },
      { id: "m3", who: "Mateo", de: "Ich bringe Brot mit.", ru: "Я принесу хлеб." },
    ],
    steps: [
      { prompt: "Ответь Нильсу", replyTo: "m1", options: [{ id: "o1", text: "Um acht!", why: "" }, { id: "o2", text: "Auf dem Tisch.", why: "Это про ключ" }], answer: "o1" },
      { prompt: "Ответь Дане", replyTo: "m2", options: [{ id: "k1", text: "In der Küche.", why: "" }, { id: "k2", text: "Danke!", why: "Это не место" }], answer: "k1" },
    ],
  };
  const comic = {
    kind: "comic",
    panels: [
      { id: "p1", scene: "У двери", who: "Hauke", art: "🚪", answer: "Hallo!", ru: "Привет!" },
      { id: "p2", scene: "За столом", who: "Dana", art: "☕", answer: "Hier ist Kaffee.", ru: "Вот кофе." },
      { id: "p3", scene: "У окна", who: "Nils", art: "🌊", answer: "Schau mal!", ru: "Посмотри!" },
    ],
    extra: ["Tschüs!"],
  };
  const retell = {
    kind: "retell",
    who: "Nils",
    quote: "Ich komme aus Kiel. Mein Boot ist klein, und ich segle gern.",
    ru: "Я из Киля. Моя лодка маленькая, и я люблю ходить под парусом.",
    tokens: [
      { id: "a", from: "Ich", options: ["Er", "Sie", "Ich"], answer: "Er" },
      " ",
      { id: "b", from: "komme", options: ["kommt", "komme", "kommen"], answer: "kommt" },
      " aus Kiel. ",
      { id: "c", from: "Mein", options: ["Sein", "Ihr", "Mein"], answer: "Sein" },
      " Boot ist klein.",
    ],
  };
  const radio = {
    kind: "radio",
    rounds: [
      {
        who: "Hafenmeister",
        before: "Das Schiff kommt",
        after: "an.",
        hidden: "um sechs Uhr",
        ru: "Корабль прибывает в шесть часов.",
        questions: [
          { id: "q1", text: "Wann kommt das Schiff an?" },
          { id: "q2", text: "Wer kommt an?", why: "Спрашиваем про время." },
          { id: "q3", text: "Wo ist das Schiff?", why: "Пропало время." },
        ],
        answer: "q1",
      },
      {
        who: "Bus",
        before: "Wir fahren",
        after: "ab.",
        hidden: "zum Hafen",
        ru: "Мы едем в гавань.",
        questions: [
          { id: "q1", text: "Wohin fahren wir?" },
          { id: "q2", text: "Wie viel kostet es?", why: "Не про цену." },
          { id: "q3", text: "Wann fahren wir?", why: "Не про время." },
        ],
        answer: "q1",
      },
    ],
  };
  const gullword = { kind: "gullword", words: ["der Hafen", "das Boot", "das Handy"] };
  const proofread = {
    kind: "proofread",
    author: "Хауке",
    checklist: ["Вежливая форма", "Верный глагол"],
    segments: [
      "Hallo Dana, ",
      { id: "s1", draft: "ich komme nicht, weil krank.", options: ["ich komme nicht, weil krank.", "ich komme nicht, denn ich bin krank.", "ich komme nicht, oder krank."], answer: "ich komme nicht, denn ich bin krank.", why: "В A1 — denn." },
      " ",
      { id: "s2", draft: "Ich bin zu Hause geblieben", options: ["Ich bin zu Hause geblieben", "Ich habe zu Hause geblieben"], answer: "Ich bin zu Hause geblieben", why: "bleiben с sein." },
      " und ",
      { id: "s3", draft: "haben viel Tee getrunken", options: ["haben viel Tee getrunken", "habe viel Tee getrunken"], answer: "habe viel Tee getrunken", why: "С ich — habe." },
      ". ",
      { id: "s4", draft: "Bis morgen!", options: ["Bis morgen!", "Bis Morgen!"], answer: "Bis morgen!", why: "morgen со строчной." },
    ],
  };

  const samples = [spring, room, torn, contrast, tail, protocol, budget, groupchat, comic, retell, radio, gullword, proofread];
  for (const c of samples) {
    assert.ok(valid(c), `${c.kind}: должно проходить проверку`);
    assert.ok(!isCorrect(c, initialAnswer(c)), `${c.kind}: стартовый ответ не должен засчитываться`);
    assert.ok(isCorrect(c, solution(c)), `${c.kind}: решение должно приниматься`);
    assert.ok(mistake(c, initialAnswer(c), "подсказка"), `${c.kind}: должно возвращать текст ошибки`);
  }
  assert.match(mistake(room, { cup: "b", bag: "a", key: "c" }, ""), /Не на месте/);
  assert.match(mistake(torn, ["4", "2", "3", "1"], ""), /первая полоска/);
  assert.match(mistake(protocol, { f: "rot", w: "in der Werkstatt", o: "dem Club" }, ""), /цвет/);
  assert.match(mistake(budget, { tea: 1, cola: 1 }, ""), /Без сладкого/);
  assert.match(mistake(comic, { p1: "Hier ist Kaffee.", p2: "Hallo!", p3: "Schau mal!" }, ""), /кадр 1/);
  assert.match(mistake(retell, { a: "Ich", b: "kommt", c: "Sein" }, ""), /слово «Ich»/);
  assert.match(mistake(proofread, {}, ""), /denn/);

  // Альтернативные верные решения
  assert.ok(isCorrect(spring, ["Am Morgen gehe zum Kai ich .", "Wir möchten morgen in die Stadt fahren ."]));
  assert.ok(isCorrect(torn, ["1", "3", "2", "4"]));
  assert.ok(isCorrect(budget, { tea: 1, bun: 1 }));
  assert.ok(isCorrect(budget, { tea: 1, cake: 1 }));

  // Невалидные варианты отсекаются validateChallenge
  assert.ok(!valid({ ...spring, rounds: [{ ...spring.rounds[0], start: ["wrong"] }, spring.rounds[1]] }));
  assert.ok(!valid({ ...tail, rounds: [{ word: "Krankenhaus", parts: ["Kranken", "Haus"], ru: "больница" }, tail.rounds[1]] }));
  assert.ok(!valid({ ...budget, rules: [{ kind: "maxPrice", cents: 200, label: "Слишком мало" }, { kind: "minTag", tag: "drink", count: 2, label: "Два" }, { kind: "forbidTag", tag: "sweet", label: "Без" }] }));
  assert.ok(!valid({ ...gullword, words: ["der Hafen", "das Boot", "zu"] }));
  // Буквы вне клавиатуры чайки не набрать, а полоска банка в протоколе встаёт только в один пропуск.
  assert.ok(!valid({ ...gullword, words: ["der Hafen", "das Boot", "das Café"] }));
  assert.ok(!valid({ ...protocol, answer: { f: "blau", w: "blau", o: "dem Club" } }));
  assert.ok(!valid({ ...proofread, segments: proofread.segments.map((s) => (typeof s === "string" || s.id === "s4" ? s : { ...s, draft: s.answer })) }));

  // Все 13 механик реально встроены в главы A1
  const embeddedKinds = new Set(
    allScenes.flatMap((b) => flatNodes(nodes(b)).filter((n) => n.t === "game").map((n) => n.c.kind)),
  );
  for (const k of NEW_KINDS) assert.ok(embeddedKinds.has(k), `механика ${k} не встроена ни в одну сцену`);
});

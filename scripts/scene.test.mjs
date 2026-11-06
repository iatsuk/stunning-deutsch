import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { phrases } from "../src/story/data.ts";
import { initialAnswer, isCorrect, normalizeSave, solution, storyLines, validateStory } from "../src/story/logic.ts";
import { answerSlots, arrange, flatNodes, flow, keyOf, lookOrder, nodeAt, requiredKeys, sceneKeys, shownWords, spot, typedRight, worldAfter } from "../src/story/scene.ts";
import { MNEMONICS } from "../src/story/mnemonics.ts";
import { applyEffects, holds, TRACKS } from "../src/story/world.ts";
import { sceneChapter1 } from "../src/story/scenes/01.ts";
import { GERMAN_TARGET, sceneChapters } from "../src/story/scenes/index.ts";

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
        assert.ok(lessons.indexOf(ref.split("/")[0]) <= i, `${chapter.id}: ${ref} — урок ещё впереди`);
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

test("every new word is a lesson word and comes back in an action after it is heard", () => {
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
  for (const chapter of sceneChapters) {
  const all = chapter.beats.flatMap((beat) => flatNodes(nodes(beat)));
  for (const [i, node] of all.entries()) {
    if (node.t !== "say") continue;
    for (const word of node.learn ?? []) {
      assert.ok(words[word], `не слово урока: ${word}`);
      const later = all.slice(i + 1).filter((n) => ACTIONS.includes(n.t));
      assert.ok(later.some((n) => text(n).toLowerCase().includes(stem(word))), `${chapter.id}: не возвращается: ${word}`);
    }
  }
  }
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
  // Черновик хранит порядок и набранные реплики, мусор выпадает.
  const first = sceneKeys(hub)[0];
  const draft = [first, `${go}.2.1|Ich bin Anna.`, "bogus", first];
  const saved = normalizeSave({ version: 2, drafts: { "01-s3": draft } }, scenes).drafts["01-s3"];
  assert.deepEqual(saved, [first, `${go}.2.1|Ich bin Anna.`]);
  assert.deepEqual(saved.map(keyOf), [first, `${go}.2.1`]);
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

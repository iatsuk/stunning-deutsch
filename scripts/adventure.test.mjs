import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";
import { challengeSolved, challengeVariant, shuffled } from "../src/adventure/logic.ts";

const topic = (name) => parse(readFileSync(new URL(`../content/a1/${name}.yaml`, import.meta.url), "utf8"));

// У уроков A1 игр больше нет (курс A1 — история), а логика игр служит A2 и B1. Её проверяют
// небольшие задания того же вида, что были в уроках A1.
const order = (tokens) => ({ kind: "order", tokens });
const pack = (answer) => ({ kind: "pack", answer });

test("вежливый вопрос требует правильного порядка всех фрагментов", () => {
  const challenge = order(["Woher", "kommen", "Sie?"]);
  assert.equal(challengeSolved(challenge, ["0", "1", "2"]), true);
  assert.equal(challengeSolved(challenge, ["1", "0", "2"]), false);
  assert.equal(challengeSolved(challenge, ["0", "1"]), false);
  assert.equal(challengeSolved(challenge, ["0", "0", "2"]), false);
});

test("две T в названии SPROTTE взаимозаменяемы", () => {
  const challenge = order(["S", "P", "R", "O", "T", "T", "E"]);
  assert.equal(challengeSolved(challenge, ["0", "1", "2", "3", "5", "4", "6"]), true);
  assert.equal(challengeSolved(challenge, ["0", "1", "2", "3", "4", "4", "6"]), false);
  assert.equal(challengeSolved(challenge, ["0", "1", "2", "3", "4", "5", "99"]), false);
});

test("провизия: порядок выбора не важен, лишние и недостающие предметы не проходят", () => {
  const challenge = pack(["wasser", "brot"]);
  assert.equal(challengeSolved(challenge, ["brot", "wasser"]), true);
  assert.equal(challengeSolved(challenge, ["wasser"]), false);
  assert.equal(challengeSolved(challenge, ["brot", "wasser", "kuchen"]), false);
  assert.equal(challengeSolved(challenge, ["wasser", "wasser"]), false);
});

test("порядок вариантов воспроизводится после перезагрузки и не теряет одинаковые буквы", () => {
  const tokens = ["S", "P", "R", "O", "T", "T", "E"];
  assert.deepEqual(shuffled(tokens, 44), shuffled(tokens, 44));
  assert.deepEqual(shuffled(tokens, 44).toSorted(), tokens.toSorted());
});

test("карточка требует свою подпись в каждом поле, одна подпись подходит нескольким полям", () => {
  const challenge = {
    kind: "match",
    slots: [{ answer: "aigul" }, { answer: "marat" }, { answer: "brothers" }, { answer: "none" }],
  };
  assert.equal(challengeSolved(challenge, ["aigul", "marat", "brothers", "none"]), true);
  assert.equal(challengeSolved(challenge, ["aigul", "marat", "brothers", "elif"]), false);
  assert.equal(challengeSolved(challenge, ["marat", "aigul", "brothers", "none"]), false);
  const shared = { kind: "match", slots: [{ answer: "dana" }, { answer: "dana" }, { answer: "lucia" }] };
  assert.equal(challengeSolved(shared, ["dana", "dana", "lucia"]), true);
  assert.equal(challengeSolved(shared, ["dana", "lucia", "lucia"]), false);
  assert.equal(challengeSolved(shared, ["dana", "dana"]), false);
});

test("корзина различает полкило, килограммы и число бутылок", () => {
  const challenge = { kind: "quantity", items: [{ answer: 2 }, { answer: 500 }, { answer: 3 }, { answer: 200 }] };
  assert.equal(challengeSolved(challenge, ["2", "500", "3", "200"]), true);
  assert.equal(challengeSolved(challenge, ["2", "1000", "3", "200"]), false);
  assert.equal(challengeSolved(challenge, ["2", "500", "1", "200"]), false);
  assert.equal(challengeSolved(challenge, ["2", "500", "3"]), false);
});

test("часы принимают только точное время", () => {
  const challenge = { kind: "clock", answer: "10:30" };
  assert.equal(challengeSolved(challenge, ["10:30"]), true);
  assert.equal(challengeSolved(challenge, ["09:00"]), false);
  assert.equal(challengeSolved(challenge, ["13:00"]), false);
  assert.equal(challengeSolved(challenge, ["22:30"]), false);
});

test("в уроках A1 нет игр темы и дел: курс A1 — история", () => {
  for (const name of ["01-kennenlernen", "04-essen", "12-reisen"]) {
    const t = topic(name);
    assert.equal(t.adventure, undefined, name);
    assert.equal(t.case, undefined, name);
  }
});

const restart=topic('../a2/01-neustart').adventure;
test('A2 телефонная заметка принимает оговорённые варианты, но не неправильное время',()=>{
 const c=restart.challenges.find(c=>c.kind==='note');
 assert.equal(challengeSolved(c,[' Sonntag ','10 Uhr','IM CLUB']),true);
 assert.equal(challengeSolved(c,['Samstag','10:00','Club']),false);
 assert.equal(challengeSolved(c,['Sonntag','11:00','Club']),false);
});
test('A2 разговор требует пройти реплики и подтверждение, не просто указать конечный узел',()=>{
 const c=restart.challenges.find(c=>c.kind==='negotiation');
 assert.equal(challengeSolved(c,['1,0']),true);
 assert.equal(challengeSolved(c,['0,0,0']),true);
 assert.equal(challengeSolved(c,['1']),false);
 assert.equal(challengeSolved(c,['end']),false);
});

test('несколько допустимых планов: принимается каждый полный вариант, но не их смесь',()=>{
 const c={kind:'pack',answer:['cafe','walk'],alternatives:[['museum','cafe']]};
 assert.equal(challengeSolved(c,['walk','cafe']),true);
 assert.equal(challengeSolved(c,['museum','cafe']),true);
 assert.equal(challengeSolved(c,['museum','walk']),false);
 assert.equal(challengeSolved(c,['museum','cafe','walk']),false);
});

test('варианты условий стабильны внутри попытки, меняются при повторе и принимают старый seed 0',()=>{
 const c={kind:'select',id:'budget',answer:['a'],variants:[{kind:'select',id:'new-budget',answer:['b']}]};
 assert.equal(challengeVariant(c,1).id,'budget');
 assert.equal(challengeVariant(c,2).id,'new-budget');
 assert.equal(challengeVariant(c,3).id,'budget');
 assert.equal(challengeVariant(c,0).id,'budget');
});

test('B1 Фленсбург: принимаются все планы с одним занятием, паузой и бюджетом до 10 евро',()=>{
 const c=topic('../b1/11-meinungen').adventure.challenges.find(c=>c.id==='budget');
 const offers=[['harbor',20,0,'activity'],['museum',30,6,'activity'],['a',20,8,'pause'],['b',20,4,'pause']];
 let valid=0;for(let mask=0;mask<16;mask++){
  const picked=offers.filter((_,i)=>mask&(1<<i));
  const expected=picked.filter(x=>x[3]==='activity').length===1&&picked.filter(x=>x[3]==='pause').length===1&&picked.reduce((n,x)=>n+x[1],0)<=60&&picked.reduce((n,x)=>n+x[2],0)<=10;
  assert.equal(challengeSolved(c,picked.map(x=>x[0])),expected,JSON.stringify(picked));if(expected)valid++;
 }
 assert.equal(valid,3);
});

test('B1 доставка: альтернативен только транспорт, папка и стаканы нужны в каждом допустимом наборе',()=>{
 const c=topic('../b1/17-umwelt').adventure.challenges.find(c=>c.id==='kit');
 const items=['bus','bike','mappe','becher'];let valid=0;
 for(let mask=0;mask<16;mask++){
  const picked=items.filter((_,i)=>mask&(1<<i));const expected=picked.includes('bus')!==picked.includes('bike')&&picked.includes('mappe')&&picked.includes('becher');
  assert.equal(challengeSolved(c,picked),expected,JSON.stringify(picked));if(expected)valid++;
 }
 assert.equal(valid,2);
});

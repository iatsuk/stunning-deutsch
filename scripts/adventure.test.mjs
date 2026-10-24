import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";
import { challengeSolved, challengeVariant, shuffled } from "../src/adventure/logic.ts";

const topic = (name) => parse(readFileSync(new URL(`../content/a1/${name}.yaml`, import.meta.url), "utf8"));
const crew = topic("01-kennenlernen").adventure;
const harbor = topic("02-zahlen").adventure;
const family = topic("03-familie").adventure;
const shopping = topic("05-einkaufen").adventure;
const daily = topic("06-tagesablauf").adventure;

test("вежливый вопрос требует правильного порядка всех фрагментов", () => {
  const challenge = crew.challenges.find((step) => step.kind === "order");
  assert.equal(challengeSolved(challenge, ["0", "1", "2"]), true);
  assert.equal(challengeSolved(challenge, ["1", "0", "2"]), false);
  assert.equal(challengeSolved(challenge, ["0", "1"]), false);
  assert.equal(challengeSolved(challenge, ["0", "0", "2"]), false);
});

test("две T в названии SPROTTE взаимозаменяемы", () => {
  const challenge = harbor.challenges.find((step) => step.kind === "order");
  assert.equal(challengeSolved(challenge, ["0", "1", "2", "3", "5", "4", "6"]), true);
  assert.equal(challengeSolved(challenge, ["0", "1", "2", "3", "4", "4", "6"]), false);
  assert.equal(challengeSolved(challenge, ["0", "1", "2", "3", "4", "5", "99"]), false);
});

test("провизия: порядок выбора не важен, лишние и недостающие предметы не проходят", () => {
  const challenge = harbor.challenges.find((step) => step.kind === "pack");
  assert.equal(challengeSolved(challenge, ["brot", "wasser"]), true);
  assert.equal(challengeSolved(challenge, ["wasser"]), false);
  assert.equal(challengeSolved(challenge, ["brot", "wasser", "kuchen"]), false);
  assert.equal(challengeSolved(challenge, ["wasser", "wasser"]), false);
});

test("бейджи включают немецкий, которым Дана владеет немного", () => {
  const challenge = crew.challenges.find((step) => step.kind === "pack");
  assert.equal(challengeSolved(challenge, ["russisch", "deutsch", "kasachisch", "englisch"]), true);
  assert.equal(challengeSolved(challenge, ["russisch", "kasachisch", "englisch"]), false);
});

test("порядок вариантов воспроизводится после перезагрузки и не теряет одинаковые буквы", () => {
  const tokens = harbor.challenges.find((step) => step.kind === "order").tokens;
  assert.deepEqual(shuffled(tokens, 44), shuffled(tokens, 44));
  assert.deepEqual(shuffled(tokens, 44).toSorted(), tokens.toSorted());
});

test("семейная карточка отличает отсутствие сестры от подруги", () => {
  const challenge = family.challenges.find((step) => step.id === "dana-family");
  assert.equal(challengeSolved(challenge, ["aigul", "marat", "brothers", "none"]), true);
  assert.equal(challengeSolved(challenge, ["aigul", "marat", "brothers", "elif"]), false);
  assert.equal(challengeSolved(challenge, ["marat", "aigul", "brothers", "none"]), false);
});

test("Матео — дядя Софии, а не её отец", () => {
  const challenge = family.challenges.find((step) => step.id === "sofia-family");
  assert.equal(challengeSolved(challenge, ["lucia", "diego", "mateo"]), true);
  assert.equal(challengeSolved(challenge, ["lucia", "mateo", "diego"]), false);
});

test("два предмета могут принадлежать Дане, общие фото — двум людям", () => {
  const challenge = family.challenges.find((step) => step.id === "return-belongings");
  assert.equal(challengeSolved(challenge, ["dana", "dana", "lucia", "diego", "both"]), true);
  assert.equal(challengeSolved(challenge, ["dana", "diego", "lucia", "diego", "both"]), false);
  assert.equal(challengeSolved(challenge, ["dana", "dana", "lucia", "diego", "dana"]), false);
  assert.equal(challengeSolved(challenge, ["dana", "dana", "lucia", "diego"]), false);
});

test("список гостей включает ребёнка и исключает организаторов", () => {
  const challenge = family.challenges.find((step) => step.id === "guest-list");
  assert.equal(challengeSolved(challenge, ["sofia", "diego", "lucia"]), true);
  assert.equal(challengeSolved(challenge, ["lucia", "diego"]), false);
  assert.equal(challengeSolved(challenge, ["lucia", "diego", "sofia", "mateo"]), false);
});

test("корзина различает полкило, килограммы и число бутылок", () => {
  const challenge = shopping.challenges.find((step) => step.kind === "quantity");
  assert.equal(challengeSolved(challenge, ["2", "500", "3", "200"]), true);
  assert.equal(challengeSolved(challenge, ["2", "1000", "3", "200"]), false);
  assert.equal(challengeSolved(challenge, ["2", "500", "1", "200"]), false);
  assert.equal(challengeSolved(challenge, ["2", "500", "3"]), false);
});

test("новое начало курса не путается со старым временем и окончанием", () => {
  const challenge = daily.challenges.find((step) => step.id === "friday-course");
  assert.equal(challengeSolved(challenge, ["10:30"]), true);
  assert.equal(challengeSolved(challenge, ["09:00"]), false);
  assert.equal(challengeSolved(challenge, ["13:00"]), false);
  assert.equal(challengeSolved(challenge, ["22:30"]), false);
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

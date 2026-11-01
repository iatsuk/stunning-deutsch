import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { a1ModuleResult, advanceExpired, objectiveResult, playbackLimit, b1WeightedResult } from '../src/assessment/logic.ts';
test('пробник после перезагрузки сохраняет исходные сроки и пропускает просроченные разделы',()=>{
 const sections=[{minutes:20},{minutes:50},{minutes:15}];const s={index:0,startedAt:1000,values:{one:'answer'}};
 assert.equal(advanceExpired(s,sections,1000+19*60000),s);
 const n=advanceExpired(s,sections,1000+25*60000);assert.equal(n.index,1);assert.equal(n.startedAt,1000+20*60000);assert.deepEqual(n.values,s.values);
 const end=advanceExpired(s,sections,1000+90*60000);assert.equal(end.index,3);
 assert.equal(advanceExpired({...s,startedAt:null},sections,1e10).index,0);
});
test('радио доступно один раз, телефон и разговор — два',()=>{
 assert.equal(playbackLimit('a2-hoeren-1'),2);assert.equal(playbackLimit('a2-hoeren-2'),1);assert.equal(playbackLimit('a2-hoeren-3'),2);
});
test('пробник содержит 35 закрытых ответов и отдельные письмо и устную пару',()=>{
 const mock=parse(readFileSync(new URL('../content/assessments/04-a2-mock.yaml',import.meta.url),'utf8'));
 assert.deepEqual(mock.sections.map(s=>s.minutes),[20,50,15]);
 const values={};for(const[id,t]of Object.entries(mock.tasks))for(const[qIndex,q]of(t.questions??[]).entries())values[`${id}:${qIndex}`]=q.answers[0];
 const r=objectiveResult(mock.tasks,values);assert.equal(r.total,35);assert.equal(r.correct,35);
 values['phone:0']='  HALB VIER  ';values['ads:4']='a';assert.equal(objectiveResult(mock.tasks,values).correct,34);
 assert.equal(mock.tasks.letter.choose,3);assert.equal(mock.tasks.letter.points.length,4);assert.equal(mock.tasks.plan.roles.length,2);
 for(const task of [mock.tasks.phone,mock.tasks.radio])assert.equal(task.recordings.length,5);
 assert.equal(mock.tasks.conversation.questions.length,5);
});

test('B1: первая часть аудирования звучит один раз, следующие — два; A2 сохраняет свои лимиты',()=>{
 assert.deepEqual([1,2,3].map(n=>playbackLimit(`b1-hoeren-${n}`)),[1,2,2]);
 assert.deepEqual([1,2,3].map(n=>playbackLimit(`a2-hoeren-${n}`)),[2,1,2]);
});


test('B1: один неверный ответ в разных частях имеет разный вес; письмо и речь не получают автоматических баллов',()=>{
 const counts={'lesen-1':5,'lesen-2':5,'lesen-3':10,'sprachbausteine-1':10,'sprachbausteine-2':10,'hoeren-1':5,'hoeren-2':10,'hoeren-3':5};
 const tasks=Object.fromEntries(Object.entries(counts).map(([id,n])=>[id,{kind:'worksheet',part:'b1-'+id,questions:Array.from({length:n},()=>({prompt:'item',answers:['a']}))}]));
 tasks.write={kind:'message',part:'b1-schreiben-1'};tasks.talk={kind:'card',part:'b1-sprechen-3'};
 const values={};for(const[id,t]of Object.entries(tasks))for(const[i]of(t.questions??[]).entries())values[`${id}:${i}`]='a';
 assert.deepEqual(b1WeightedResult(tasks,values),{earned:180,possible:180});
 values['lesen-1:0']='b';assert.equal(b1WeightedResult(tasks,values).earned,175);
 values['sprachbausteine-1:0']='b';assert.equal(b1WeightedResult(tasks,values).earned,173.5);
 assert.equal(objectiveResult(tasks,values).total,60);
});

test('полный B1: 60 закрытых заданий, реальные веса и отдельная подготовка к парной речи',()=>{
 const mock=parse(readFileSync(new URL('../content/assessments/11-b1-mock.yaml',import.meta.url),'utf8'));
 assert.deepEqual(mock.sections.map(s=>s.minutes),[90,30,30,20,15]);
 const counts={};const values={};for(const[id,t]of Object.entries(mock.tasks)){
  if(t.questions){counts[t.part]=(counts[t.part]??0)+t.questions.length;for(const[i,q]of t.questions.entries())values[`${id}:${i}`]=q.answers[0];}
 }
 assert.deepEqual(counts,{'b1-lesen-1':5,'b1-lesen-2':5,'b1-lesen-3':10,'b1-sprachbausteine-1':10,'b1-sprachbausteine-2':10,'b1-hoeren-1':5,'b1-hoeren-2':10,'b1-hoeren-3':5});
 assert.equal(objectiveResult(mock.tasks,values).total,60);assert.deepEqual(b1WeightedResult(mock.tasks,values),{earned:180,possible:180});
 assert.equal(mock.tasks.write.choose,undefined);assert.equal(mock.tasks.write.points.length,4);
 assert.equal(mock.tasks.gaps1.format,'cloze');assert.ok(mock.tasks.gaps1.questions.every(q=>q.options.length===3));
 assert.equal(mock.tasks.gaps2.format,'cloze');assert.equal(mock.tasks.gaps2.uniqueOptions,true);assert.ok(mock.tasks.gaps2.questions.every(q=>q.options.length===15));
 assert.equal(new Set(mock.tasks.gaps2.questions.map(q=>q.answers[0])).size,10);
 assert.equal(mock.tasks.ads.uniqueOptions,true);assert.deepEqual(mock.tasks.ads.reusableOptions,['x']);assert.equal(mock.tasks.ads.questions.filter(q=>q.answers[0]==='x').length,2);
 assert.equal(mock.tasks.voices.recordings.length,5);assert.equal(mock.tasks.notices.recordings.length,5);assert.ok(mock.dialogues[mock.tasks.conversation.dialogue].lines.length>=12);
 assert.equal(mock.tasks.topic.roles.length,2);assert.notEqual(mock.tasks.topic.roles[0].text,mock.tasks.topic.roles[1].text);
 assert.deepEqual(mock.tasks.prepareTopic.roles,mock.tasks.topic.roles);assert.deepEqual(mock.tasks.preparePlan.roles,mock.tasks.plan.roles);
 const state={index:0,startedAt:1000,values:{saved:'yes'}};
 for(const[minutes,index]of [[90,1],[150,3],[170,4],[185,5]]){const n=advanceExpired(state,mock.sections,1000+minutes*60000);assert.equal(n.index,index);assert.deepEqual(n.values,state.values);}
});

test('пробник A1 повторяет формат Start Deutsch 1',()=>{
 const mock=parse(readFileSync(new URL('../content/assessments/15-a1-mock.yaml',import.meta.url),'utf8'));
 assert.deepEqual(mock.sections.map(s=>s.minutes),[20,25,20,15]);
 const count=part=>Object.values(mock.tasks).filter(t=>t.part===part).reduce((n,t)=>n+t.questions.length,0);
 assert.deepEqual(['hoeren-1','hoeren-2','hoeren-3','lesen-1','lesen-2','lesen-3','schreiben-1'].map(count),[6,4,5,5,5,5,5]);
 assert.deepEqual(['hoeren-1','hoeren-2','hoeren-3'].map(playbackLimit),[2,1,2]);
 for(const t of Object.values(mock.tasks).filter(t=>t.part==='hoeren-1'))assert.ok(mock.dialogues[t.dialogue].lines.length>=3);
 for(const t of [mock.tasks.notices,mock.tasks.phone])assert.equal(t.recordings.length,t.questions.length);
 assert.equal(mock.tasks.letter.choose,undefined);assert.equal(mock.tasks.letter.points.length,3);
 assert.deepEqual(['self','ask','please'].map(id=>mock.tasks[id].part),['sprechen-1','sprechen-2','sprechen-3']);
 assert.equal(mock.tasks.ask.roles.length,2);assert.notEqual(mock.tasks.please.roles[0].text,mock.tasks.please.roles[1].text);
});
test('в пробнике A1 верный ответ не угадывается по позиции',()=>{
 const mock=parse(readFileSync(new URL('../content/assessments/15-a1-mock.yaml',import.meta.url),'utf8'));
 const questions=Object.values(mock.tasks).flatMap(t=>t.questions??[]).filter(q=>q.options);
 assert.ok(questions.every(q=>q.answers.length===1&&q.options.includes(q.answers[0])));
 const three=questions.filter(q=>q.options.length===3).map(q=>q.options.indexOf(q.answers[0]));
 assert.equal(three.length,11);
 for(const place of [0,1,2])assert.ok(three.filter(i=>i===place).length>=3,`позиция ${place}`);
 const two=questions.filter(q=>q.options.length===2);
 for(const answer of [two.filter(q=>q.options.includes('richtig')),two.filter(q=>q.options.includes('a'))]){
  const first=answer.filter(q=>q.answers[0]===q.options[0]).length;
  assert.ok(first>=2&&first<=answer.length-2,`${first} из ${answer.length}`);
 }
});
test('результат A1 считается по модулям и не объявляет сдачу',()=>{
 const mock=parse(readFileSync(new URL('../content/assessments/15-a1-mock.yaml',import.meta.url),'utf8'));
 const values={};for(const[id,t]of Object.entries(mock.tasks))for(const[i,q]of(t.questions??[]).entries())values[`${id}:${i}`]=q.answers[0];
 assert.deepEqual(a1ModuleResult(mock.tasks,values),{hoeren:{correct:15,total:15},lesen:{correct:15,total:15},form:{correct:5,total:5}});
 assert.equal(objectiveResult(mock.tasks,values).total,35);
 values['talk1:0']='10:00 Uhr';values['sign1:0']='falsch';values['form:1']='28';
 assert.deepEqual(a1ModuleResult(mock.tasks,values),{hoeren:{correct:14,total:15},lesen:{correct:14,total:15},form:{correct:4,total:5}});
 values['form:1']=' 27 Jahre ';assert.equal(a1ModuleResult(mock.tasks,values).form.correct,5);
});

test('проверки A1 идут после тем 4, 8 и 12 и не ограничивают попытку',()=>{
 const load=file=>parse(readFileSync(new URL(`../content/assessments/${file}`,import.meta.url),'utf8'));
 const checks=['12-a1-check-04.yaml','13-a1-check-08.yaml','14-a1-check-12.yaml'].map(load);
 assert.deepEqual(checks.map(c=>c.id),['a1-check-04','a1-check-08','a1-check-12']);
 for(const c of checks){
  assert.equal(c.mode,'review');assert.equal(c.level,'a1');
  assert.ok(c.sections.every(s=>s.minutes===undefined));
  const tasks=Object.values(c.tasks);
  assert.ok(tasks.some(t=>t.part.startsWith('hoeren')&&t.recordings?.length===t.questions.length));
  assert.ok(tasks.some(t=>t.part.startsWith('lesen')));
  assert.ok(tasks.some(t=>t.part==='schreiben-2'&&t.points.length===3&&t.sample.length===1));
  assert.ok(tasks.some(t=>t.part.startsWith('sprechen')));
  const three=tasks.flatMap(t=>t.questions??[]).filter(q=>q.options?.length===3).map(q=>q.options.indexOf(q.answers[0]));
  assert.equal(new Set(three).size,3,c.id);
  assert.ok(c.review.length>=4);
 }
});
test('проверка после темы 4 не требует грамматики следующих тем',()=>{
 const c=parse(readFileSync(new URL('../content/assessments/12-a1-check-04.yaml',import.meta.url),'utf8'));
 const text=JSON.stringify(c.tasks);
 for(const later of ['kann','muss','will','hat gesagt','gegangen','gearbeitet'])assert.ok(!new RegExp(`\\b${later}\\b`).test(text),later);
});

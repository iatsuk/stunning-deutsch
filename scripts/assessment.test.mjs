import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { advanceExpired, objectiveResult, playbackLimit, b1WeightedResult } from '../src/assessment/logic.ts';
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

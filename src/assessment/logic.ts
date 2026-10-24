import type { Task } from '../content';
import { normalizeAnswer } from '../adventure/logic.ts';
export type TimedSection = { minutes?: number };
/** Use the original deadline after reload; elapsed sections cannot regain time. */
export function advanceExpired<T extends { index:number; startedAt:number|null }>(state:T, sections:TimedSection[], now:number):T {
 let {index,startedAt}=state;
 while(startedAt!==null && index<sections.length && sections[index].minutes!==undefined && now>=startedAt+sections[index].minutes!*60000) {
  startedAt+=sections[index].minutes!*60000;index++;
 }
 return index===state.index?state:{...state,index,startedAt};
}
export function objectiveResult(tasks:Record<string,Task>, values:Record<string,string>) {
 const details=Object.entries(tasks).flatMap(([id,t])=>(t.questions??[]).map((q,i)=>({id,index:i,prompt:q.prompt,answers:q.answers,value:values[`${id}:${i}`]??'',correct:q.answers.some(a=>normalizeAnswer(a)===normalizeAnswer(values[`${id}:${i}`]??''))})));
 return {details,total:details.length,correct:details.filter(q=>q.correct).length};
}
export const playbackLimit=(part:string)=>part.startsWith('b1-')?(part==='b1-hoeren-1'?1:2):(part.includes('hoeren-2')?1:2);
export const wordCount=(value:string)=>value.trim()?value.trim().split(/\s+/).length:0;

/** Zertifikat Deutsch: closed written tasks total 180; productive parts stay ungraded. */
export function b1WeightedResult(tasks:Record<string,Task>, values:Record<string,string>) {
 const weights:Record<string,number>={'b1-lesen-1':5,'b1-lesen-2':5,'b1-lesen-3':2.5,'b1-sprachbausteine-1':1.5,'b1-sprachbausteine-2':1.5,'b1-hoeren-1':5,'b1-hoeren-2':2.5,'b1-hoeren-3':5};
 const result=objectiveResult(tasks,values);
 return result.details.reduce((sum,q)=>({earned:sum.earned+(q.correct?(weights[tasks[q.id].part]??0):0),possible:sum.possible+(weights[tasks[q.id].part]??0)}),{earned:0,possible:0});
}

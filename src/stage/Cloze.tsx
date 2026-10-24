import type { Task } from '../content';
import { De } from '../markup';

/** Inline choices keep each gap inside the surrounding sentence. */
export function ClozeText({ task, values, onChange, disabled=false }: {
 task:Task; values:Record<number,string>; onChange:(index:number,value:string)=>void; disabled?:boolean;
}) {
 return <div className="cloze-text">{task.text?.split(/(\[\[\d+\]\])/g).map((part,key)=>{
  const match=/^\[\[(\d+)\]\]$/.exec(part);
  if(!match)return <De key={key} text={part}/>;
  const index=Number(match[1])-1,question=task.questions![index];
  return <label key={key} className="cloze-gap"><span>{index+1}</span><select aria-label={`Пропуск ${index+1}`} value={values[index]??''} disabled={disabled} onChange={event=>onChange(index,event.target.value)}><option value="">…</option>{question.options?.map(option=><option key={option} disabled={task.uniqueOptions&&!task.reusableOptions?.includes(option)&&Object.entries(values).some(([i,value])=>Number(i)!==index&&value===option)}>{option}</option>)}</select></label>;
 })}</div>;
}

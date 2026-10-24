import { useState } from "react";
import type { Task } from "../content";
export function WritingDraft({task}:{task:Task}) {
 const key=`sd-writing-v1:${task.part}:${task.title}`;
 const [text,setText]=useState(()=>{try{return localStorage.getItem(key)??"";}catch{return "";}});
 const [chosen,setChosen]=useState<string[]>(()=>{try{const saved=JSON.parse(localStorage.getItem(key+":points")??"[]");return Array.isArray(saved)?saved.filter(p=>task.points?.includes(p)).slice(0,task.choose):[];}catch{return [];}});const [saved,setSaved]=useState(true);
 const words=text.trim()?text.trim().split(/\s+/).length:0;
 return <div className="writing-draft">
 {task.choose && <fieldset><legend>Выберите {task.choose} из {task.points?.length} пунктов</legend>{task.points?.map(p=><label key={p}><input type="checkbox" checked={chosen.includes(p)} disabled={!chosen.includes(p)&&chosen.length>=task.choose!} onChange={()=>{const next=chosen.includes(p)?chosen.filter(x=>x!==p):[...chosen,p];setChosen(next);try{localStorage.setItem(key+":points",JSON.stringify(next));}catch{setSaved(false);}}}/>{p}</label>)}</fieldset>}
 <label>Ваш вариант сообщения<textarea rows={5} value={text} onChange={e=>{setText(e.target.value);try{localStorage.setItem(key,e.target.value);setSaved(true);}catch{setSaved(false);}}}/></label>
 <p aria-live="polite">Слов: {words}. {saved?'Черновик сохраняется в этом браузере.':'Браузер не разрешил сохранить черновик.'} Это самостоятельная практика: автоматической оценки письма нет.</p>
 </div>;
}

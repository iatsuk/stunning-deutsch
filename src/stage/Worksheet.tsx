import { ClozeText } from "./Cloze";
import { playAll } from "../hooks";
import { useState } from "react";
import type { Task } from "../content";
import { De, PlayButton } from "../markup";
import { normalizeAnswer } from "../adventure/logic";
export function Worksheet({task,solved}:{task:Task;solved?:boolean}) {
 const [values,setValues]=useState<Record<number,string>>({});const [checked,setChecked]=useState(false);const [transcript,setTranscript]=useState(false);
 const [openRecords,setOpenRecords]=useState<number[]>([]);
 const audio=task.part.includes("hoeren");
 if(task.format==="cloze")return <div className="worksheet cloze"><ClozeText task={task} values={values} disabled={solved} onChange={(i,value)=>{setChecked(false);setValues({...values,[i]:value});}}/>{task.uniqueOptions&&<p>Каждое слово банка используйте не больше одного раза.</p>}{(checked||solved)&&<ol aria-live="polite">{task.questions?.map((q,i)=><li key={i}>{solved?`Ответ: ${q.answers.join(' / ')}`:q.answers.some(a=>normalizeAnswer(a)===normalizeAnswer(values[i]??''))?'Верно':'Проверьте связь с соседними словами.'}</li>)}</ol>}{!solved&&<button type="button" onClick={()=>setChecked(true)}>Проверить текст</button>}</div>;
 return <div className="worksheet">
 {audio && !task.recordings && <>{task.script?<button type="button" onClick={()=>playAll(task.script!.map(l=>l.audio))}>Прослушать разговор</button>:<PlayButton src={task.audio} size="md" label="Прослушать запись"/>}<button type="button" onClick={()=>setTranscript(!transcript)}>{transcript?"Скрыть текст":"Показать текст для тренировки"}</button></>}
 {(!audio || transcript || solved) && <div className="message-text"><De text={task.text??task.script?.map(l=>`${l.who}: ${l.de}`).join("\n")??""}/></div>}
 {task.questions?.map((q,i)=>{const correct=q.answers.some(a=>normalizeAnswer(a)===normalizeAnswer(values[i]??""));return <div className="worksheet-question" key={i}>
 {task.recordings?.[i] && <><PlayButton src={task.recordings[i].audio} label={`Прослушать запись ${i+1}`}/><button type="button" onClick={()=>setOpenRecords(openRecords.includes(i)?openRecords.filter(x=>x!==i):[...openRecords,i])}>{openRecords.includes(i)?"Скрыть текст":"Показать текст для тренировки"}</button>{(openRecords.includes(i)||solved)&&<p><De text={task.recordings[i].text}/></p>}</>}
 <label><De text={`${i+1}. ${q.prompt}`}/>{q.options?<select value={values[i]??""} onChange={e=>{setChecked(false);setValues({...values,[i]:e.target.value});}}><option value="">Выберите…</option>{q.options.map(o=><option key={o} disabled={task.uniqueOptions && !task.reusableOptions?.includes(o) && Object.entries(values).some(([key,value])=>Number(key)!==i && value===o)}>{o}</option>)}</select>:<input value={values[i]??""} autoComplete="off" onChange={e=>{setChecked(false);setValues({...values,[i]:e.target.value});}}/>}</label>
 {(checked||solved) && <p role="status">{solved?`Ответ: ${q.answers.join(" / ")}`:correct?"Верно":"Проверьте сообщение и попробуйте ещё раз."}</p>}</div>})}
 {!solved && <button type="button" onClick={()=>setChecked(true)}>Проверить ответы</button>}
 </div>;
}

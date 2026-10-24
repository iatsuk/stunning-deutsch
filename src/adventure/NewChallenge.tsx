import { useState } from "react";
import type { AdventureChallenge } from "../content";
import { Text, De } from "../markup";
import { challengeSolved, negotiationNode } from "./logic";
import { Clue } from "./Clue";
import type { ChallengeProps } from "./Challenge";
export function NewChallenge({challenge:c,state,save,onNext,last}: Omit<ChallengeProps,"challenge"> & {challenge:Extract<AdventureChallenge,{kind:"note"|"negotiation"}>}) {
 const key=`challenge:${c.id}`;const [wrong,setWrong]=useState(false);const [feedback,setFeedback]=useState("");
 const path=state.answers[key] ?? "";
 const values=c.kind==="note" ? c.fields.map((_,i)=>state.answers[`${key}:${i}`]??"") : [path];
 const solved=challengeSolved(c,values); const done=c.kind==="negotiation" ? solved : solved && state.answers[key+":done"]==="yes";
 const node=c.kind==="negotiation" ? negotiationNode(c,path) : null;
 return <div className="adventure-challenge"><h3 tabIndex={-1}>{c.title}</h3><p><Text text={c.intro}/></p>
 {c.quotes && <Clue quotes={c.quotes} reading={c.mode==="reading"} onHelp={()=>save({assisted:true})}/>}
 {c.kind==="note" ? <div className="note-fields">{c.fields.map((f,i)=><label key={i}><De text={f.label}/><input value={values[i]} disabled={done} autoComplete="off" onChange={e=>{setWrong(false);save({answers:{...state.answers,[`${key}:${i}`]:e.target.value}});}}/></label>)}</div> : node && <div className="conversation"><p className="conversation-reply" aria-live="polite"><De text={node.text}/></p><div className="challenge-options">{node.choices.map((o,i)=><button key={i} type="button" onClick={()=>{setFeedback(o.feedback);save({answers:{...state.answers,[key]:[path,String(i)].filter(Boolean).join(",")}});}}><De text={o.label}/></button>)}</div>{feedback && <p role="status"><Text text={feedback}/></p>}{path && !done && <button type="button" onClick={()=>{setFeedback("");save({answers:{...state.answers,[key]:""}});}}>Начать разговор заново</button>}</div>}
 <div className="adventure-feedback" role="status" data-ok={done}>{done?<Text text={c.success}/>:wrong?<Text text={c.wrong}/>:null}</div>
 <div className="adventure-actions">{done?<button type="button" className="adventure-primary" onClick={onNext}>{last?"Завершить эпизод →":"Продолжить →"}</button>:c.kind==="note" && <button type="button" className="adventure-primary" onClick={()=>{if(solved)save({answers:{...state.answers,[key+":done"]:"yes"}});else setWrong(true);}}>Проверить заметку</button>}</div></div>;
}

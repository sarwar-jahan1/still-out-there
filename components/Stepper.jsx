"use client";
import {useState} from "react";import {useLang} from "./LangProvider";
// One short story chapter at a time instead of a wall of text.
export default function Stepper({story}){const {t}=useLang();const [i,setI]=useState(0);const n=story.length;
return(<section className="glass p-5 sm:p-8 my-6 text-center min-h-[15rem] flex flex-col justify-between"><p className="text-xs uppercase tracking-widest text-signal">{t("ch."+Math.min(i+1,4))}</p>
<p key={i} className={`my-5 fadein ${i===0?"text-3xl sm:text-5xl font-extrabold font-display":"text-2xl sm:text-3xl"}`}>{i===0?`“${story[0]}”`:story[i]}</p>
<div className="flex items-center justify-between gap-2"><button className="btn btn-circle btn-outline" disabled={i===0} onClick={()=>setI(i-1)} aria-label="Previous">◀</button>
<div className="flex gap-2" aria-hidden="true">{story.map((_,k)=><span key={k} className={`w-3 h-3 rounded-full ${k===i?"bg-signal":"bg-base-content/30"}`}/>)}</div>
<button className="btn btn-circle btn-primary" disabled={i===n-1} onClick={()=>setI(i+1)} aria-label="Next">▶</button></div></section>)}

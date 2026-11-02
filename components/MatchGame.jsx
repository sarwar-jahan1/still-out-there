"use client";
import {useEffect,useState} from "react";import {mark,load,REWARDS,orbit} from "@/lib/progress";import {useLang} from "./LangProvider";import Confetti from "./Confetti";
// Reusable "build the machine" matching game. Works for any mission with `components` [{n,d}].
export default function MatchGame({m,onDone}){const {t}=useLang();const parts=m.components,n=parts.length,gid="build:"+m.id;
const ord=parts.map((_,i)=>(i+1)%n);const [sel,setSel]=useState(null);const [done,setDone]=useState([]);const [wrong,setWrong]=useState(0);const [msg,setMsg]=useState("g.how");const [bad,setBad]=useState(null);const win=done.length===n;
useEffect(()=>{setDone([]);setSel(null);setWrong(0);setMsg("g.how");if(load().games.includes(gid)){setDone(parts.map((_,i)=>i));setMsg("g.done")}},[m.id]);
const pickFn=(j,from=sel)=>{const real=ord[j];if(done.includes(real))return;if(from===null){setMsg("g.how");return}
if(from===real){const d=[...done,real];setDone(d);setSel(null);setWrong(0);setMsg("g.good");if(d.length===n){mark("games",gid);mark("items",m.id);setMsg("g.done");orbit("orbit.win");onDone&&onDone()}}
else{setWrong(w=>w+1);setBad(j);setMsg("g.try");setTimeout(()=>setBad(null),500)}};
const r=REWARDS[m.id];
return(<section className="glass p-5 my-10">{win&&<Confetti n={60} id={m.id}/>}<h2 className="text-3xl font-bold">{t("g.build")}</h2>
<p className="text-xs opacity-70 mt-1">{m.id==="spirit"?t("g.sim"):t("g.simlabel")}</p>
<p className="my-3" role="status">{t(msg)}</p>
<div className="grid sm:grid-cols-2 gap-4"><div className="grid gap-2">{parts.map((p,i)=><button key={i} disabled={done.includes(i)} draggable={!done.includes(i)} onDragStart={e=>{e.dataTransfer.setData("text/plain",String(i));setSel(i)}} onClick={()=>setSel(i)} aria-pressed={sel===i} className={`btn h-auto min-h-12 py-2 justify-start ${done.includes(i)?"btn-success":sel===i?"btn-primary":"btn-outline"}`}>{done.includes(i)?"✓ ":""}{p.n}</button>)}</div>
<div className="grid gap-2">{ord.map((real,j)=><button key={j} disabled={done.includes(real)} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();pickFn(j,+e.dataTransfer.getData("text/plain"))}} onClick={()=>pickFn(j)} className={`btn h-auto min-h-12 py-2 text-left justify-start normal-case ${done.includes(real)?"btn-success":bad===j?"btn-error":"btn-outline"} ${wrong>=2&&sel===real?"ring-2 ring-signal":""}`}>{parts[real].d}</button>)}</div></div>
{win&&r&&<p className="mt-4 text-lg">{r.icon} <b>{t("r."+r.k)}</b></p>}</section>);}

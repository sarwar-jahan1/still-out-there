"use client";
import {useEffect,useState} from "react";import {mark,load,orbit} from "@/lib/progress";import {useLang} from "./LangProvider";import Confetti from "./Confetti";
// Educational Rover Simulation: pick the part that solves each problem. Not a real repair of Spirit.
const CASES=[["The rover is stuck in soft sand and cannot roll.",4],["The rover is running low on electricity.",0],["Scientists cannot receive the rover's data on Earth.",3]];
export default function RoverFix({m,onDone}){const {t}=useLang();const [i,setI]=useState(0);const [msg,setMsg]=useState(null);const [done,setDone]=useState(false);
useEffect(()=>{if(load().games.includes("repair:spirit")){setDone(true)}},[]);
const pick=k=>{if(done)return;const[,ans]=CASES[i];if(k===ans){if(i+1>=CASES.length){mark("games","repair:spirit");setDone(true);setMsg(null);orbit("orbit.win");onDone&&onDone()}else{setI(i+1);setMsg(null)}}else{setMsg(m.components[k].d);orbit("orbit.hint")}};
return(<section className="glass p-5 my-10">{done&&<Confetti n={50} id="fix"/>}<h2 className="text-3xl font-bold">🔧 {t("g.repair")}</h2><p className="text-xs opacity-70 mt-1">{t("g.sim")}</p>
{done?<p className="mt-3 text-lg" role="status">🛞 {t("g.done")}</p>:<><p className="mt-3 text-sm text-signal font-bold">{i+1} / {CASES.length}</p><p className="text-xl my-2">{CASES[i][0]}</p>
<div className="flex flex-wrap gap-2">{m.components.map((c,k)=><button key={k} className="btn btn-outline btn-sm h-auto py-2" onClick={()=>pick(k)}>{c.n}</button>)}</div>
{msg&&<p className="mt-3" role="status">{t("g.try")} <i>{msg}</i></p>}</>}</section>);}

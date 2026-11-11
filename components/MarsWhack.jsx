"use client";
import {useEffect,useRef,useState} from "react";import {complete} from "@/lib/progress";import {finishGame} from "@/lib/scores";import {useLang} from "./LangProvider";import ResultCard from "./ResultCard";
// Whack-a-quake: tap quakes, avoid wind. SIMULATED, not real Mars data.
export default function MarsWhack({id,onDone}){const {t}=useLang();const [ph,setPh]=useState("idle");const [spots,setSpots]=useState([]);const [pops,setPops]=useState([]);const [time,setTime]=useState(40);const [score,setScore]=useState(0);const [combo,setCombo]=useState(0);const [res,setRes]=useState(null);
const o=useRef({});
const start=()=>{o.current={run:true,left:40,score:0,combo:0,spots:[],pops:[],nx:0,uid:0};setScore(0);setCombo(0);setTime(40);setSpots([]);setPops([]);setRes(null);setPh("run")};
useEffect(()=>{if(ph!=="run")return;const iv=setInterval(()=>{const c=o.current;if(!c.run)return;const now=Date.now();c.left-=0.1;c.nx-=100;
if(c.nx<=0&&c.spots.length<5){c.spots.push({id:c.uid++,x:10+Math.random()*80,y:46+Math.random()*40,q:Math.random()<.72,b:now});c.nx=Math.max(350,800-(40-c.left)*9)}
const keep=c.spots.filter(s=>now-s.b<1500);if(keep.some(()=>false)){}const lost=c.spots.filter(s=>now-s.b>=1500&&s.q).length;if(lost)c.combo=0;c.spots=keep;c.pops=c.pops.filter(p=>now-p.b<700);
setSpots([...c.spots]);setPops([...c.pops]);setTime(Math.max(0,Math.ceil(c.left)));setCombo(c.combo);
if(c.left<=0){c.run=false;const f=finishGame("quake",c.score,[500,1000,1600]);if(c.score>=500){complete("quake",id);onDone&&onDone()}setRes({...f,score:c.score});setPh("over")}},100);return()=>clearInterval(iv)},[ph]);
const tap=sp=>{const c=o.current;if(!c.run)return;c.spots=c.spots.filter(s=>s.id!==sp.id);let txt;if(sp.q){const g=100+10*c.combo;c.score+=g;c.combo++;txt="+"+g}else{c.score=Math.max(0,c.score-100);c.combo=0;txt="-100"}c.pops.push({id:c.uid++,x:sp.x,y:sp.y,txt,b:Date.now()});setScore(c.score);setCombo(c.combo);setSpots([...c.spots]);setPops([...c.pops])};
return(<section className="glass p-4 sm:p-5 my-10"><h2 className="text-3xl font-bold">🌋 {t("mw.h")}</h2><p className="text-xs opacity-70">{t("s.sim")}</p>
<div className="flex justify-between text-lg font-bold my-2"><span>⏱ {time}</span><span>⭐ {score}</span><span>{combo>1?`🔥 x${combo}`:""}</span></div>
<div className="relative w-full rounded-xl overflow-hidden select-none" style={{aspectRatio:"5/3",background:"linear-gradient(#2a1410 0%,#6a2c18 40%,#b8561f 41%,#8a3c18 100%)"}}>
<div className="absolute left-3 top-[30%] text-3xl" aria-hidden="true">🛰️</div><div className="absolute right-4 top-3 w-10 h-10 rounded-full bg-orange-200/70" aria-hidden="true"/>
{spots.map(s=><button key={s.id} onPointerDown={()=>tap(s)} aria-label={s.q?"Quake":"Wind"} className="absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-2xl" style={{left:s.x+"%",top:s.y+"%",touchAction:"manipulation"}}>
{s.q?<><span className="absolute inset-0 rounded-full bg-cyan-300/50 animate-ping"/><span className="relative w-10 h-10 rounded-full bg-cyan-300 border-2 border-white flex items-center justify-center shake">〰️</span></>:<span className="relative">🌪️</span>}</button>)}
{pops.map(p=><span key={p.id} className="absolute font-extrabold text-xl fadein pointer-events-none" style={{left:p.x+"%",top:p.y+"%",color:p.txt[0]==="+"?"#7fff9a":"#ff8a8a"}}>{p.txt}</span>)}</div>
<div className="mt-3 text-center">{ph==="idle"&&<><p className="text-sm opacity-80 mb-2">{t("mw.p")}</p><button className="btn btn-primary btn-lg w-full" onClick={start}>▶ {t("qc.go")}</button></>}
{ph==="run"&&<p className="text-sm opacity-80">{t("mw.p")}</p>}{ph==="over"&&res&&<ResultCard name="Marsquake Rush" {...res} onRetry={start}/>}</div>
<details className="mt-3"><summary className="cursor-pointer text-signal">{t("s.more")}</summary><p className="mt-2 max-w-prose">{t("mw.note")} {t("s.detail")}</p></details></section>);}

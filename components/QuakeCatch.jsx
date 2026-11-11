"use client";
import {useEffect,useRef,useState} from "react";import {complete} from "@/lib/progress";import {finishGame} from "@/lib/scores";import {useLang} from "./LangProvider";import ResultCard from "./ResultCard";
// 40-second reaction game on a SIMULATED seismograph (not real Mars data).
export default function QuakeCatch({id,onDone}){const {t}=useLang();const [ph,setPh]=useState("idle");const [pts,setPts]=useState(Array(100).fill(40));const [time,setTime]=useState(40);const [score,setScore]=useState(0);const [combo,setCombo]=useState(0);const [msg,setMsg]=useState(null);const [res,setRes]=useState(null);
const o=useRef({});
const start=()=>{o.current={buf:Array(100).fill(40),burst:0,wait:25,age:99,caught:true,i:0,left:40,score:0,combo:0,run:true};setScore(0);setCombo(0);setTime(40);setMsg(null);setRes(null);setPh("run")};
useEffect(()=>{if(ph!=="run")return;const iv=setInterval(()=>{const c=o.current;if(!c.run)return;c.i++;c.left-=0.06;c.age++;let y=40+(Math.random()-.5)*5;
if(c.burst>0){y=40+Math.sin(c.i*1.3)*26*(c.burst/18);c.burst--}else if(--c.wait<=0){c.burst=18;c.wait=30+Math.floor(Math.random()*25);c.caught=false;c.age=0}
c.buf=[...c.buf.slice(1),y];setPts(c.buf);setTime(Math.max(0,Math.ceil(c.left)));
if(c.left<=0){c.run=false;const f=finishGame("quake",c.score,[200,400,700]);if(c.score>=200){complete("quake",id);onDone&&onDone()}setRes({...f,score:c.score});setPh("over")}},60);return()=>clearInterval(iv)},[ph]);
const detect=()=>{const c=o.current;if(!c.run)return;if(!c.caught&&c.age<=22){c.caught=true;c.combo++;c.score+=100+Math.max(0,60-c.age*3)+20*(c.combo-1);setMsg("qc.hit")}else{c.score=Math.max(0,c.score-50);c.combo=0;setMsg("qc.miss")}setScore(c.score);setCombo(c.combo)};
return(<section className="glass p-4 sm:p-5 my-10"><h2 className="text-3xl font-bold">〰️ {t("qc.h")}</h2><p className="text-xs opacity-70">{t("s.sim")}</p>
<div className="flex justify-between text-lg font-bold my-2"><span>⏱ {time}</span><span>⭐ {score}</span><span>{combo>1?`🔥 x${combo}`:""}</span></div>
<svg viewBox="0 0 300 80" className="w-full rounded-xl" style={{background:"radial-gradient(circle at 50% 100%,#3a1a10,#0b1020 70%)"}} role="img" aria-label={t("s.alt")}><rect x="170" y="0" width="130" height="80" fill="#5fd4e8" opacity=".1"/><line x1="170" y1="0" x2="170" y2="80" stroke="#5fd4e8" strokeDasharray="3 3"/>
<polyline points={pts.map((y,i)=>`${i*3},${y}`).join(" ")} fill="none" stroke="#5fd4e8" strokeWidth="2" className="glowline"/></svg>
<div className="mt-3">{ph==="idle"&&<><p className="text-center text-sm opacity-80 mb-2">{t("qc.p")}</p><button className="btn btn-primary btn-lg w-full" onClick={start}>▶ {t("qc.go")}</button></>}
{ph==="run"&&<><p className="text-center text-sm h-5" role="status">{msg?t(msg):""}</p><button className="btn btn-primary btn-lg w-full" onClick={detect}>📡 {t("qc.det")}</button></>}
{ph==="over"&&res&&<ResultCard name="Quake Catcher" {...res} onRetry={start}/>}</div>
<details className="mt-3"><summary className="cursor-pointer text-signal">{t("s.more")}</summary><p className="mt-2 max-w-prose">{t("s.detail")}</p></details></section>);}

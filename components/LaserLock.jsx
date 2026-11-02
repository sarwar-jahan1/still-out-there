"use client";
import {useEffect,useRef,useState} from "react";import {complete,REWARDS} from "@/lib/progress";import {useLang} from "./LangProvider";import Confetti from "./Confetti";
const T=[200,120,290];
// Game: stop the sweeping crosshair on the retroreflector, 3 times. Educational simulation.
export default function LaserLock({id,onDone}){const {t}=useLang();const [hits,setHits]=useState(0);const [x,setX]=useState(40);const [res,setRes]=useState(null);const [n,setN]=useState(0);const dir=useRef(1),run=useRef(true),xr=useRef(40);
useEffect(()=>{let raf,last=performance.now();const loop=ts=>{const dt=Math.min(ts-last,32);last=ts;if(run.current){let v=xr.current+dir.current*dt*(0.1+hits*0.05);if(v>370){v=370;dir.current=-1}if(v<30){v=30;dir.current=1}xr.current=v;setX(v)}raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);return()=>cancelAnimationFrame(raf)},[hits]);
const target=T[hits%3];const near=Math.abs(x-target)<=16;
const fire=()=>{if(hits>=3||!run.current)return;run.current=false;const ok=Math.abs(xr.current-target)<=16;setRes(ok?"hit":"miss");setN(k=>k+1);
setTimeout(()=>{if(ok){const h=hits+1;setHits(h);if(h===3){complete("laser",id);onDone&&onDone()}}setRes(null);run.current=true},ok?2400:900)};
const win=hits>=3,r=REWARDS[id];
return(<section className="glass p-4 sm:p-5 my-10">{win&&<Confetti n={70} id="laser"/>}<div className="flex justify-between"><h2 className="text-3xl font-bold">🎯 {t("lk.h")}</h2><span className="text-2xl" aria-label={hits+" / 3"}>{[0,1,2].map(i=><span key={i}>{i<hits?"🟢":"⚪"}</span>)}</span></div>
<p className="text-xs opacity-70">{t("g.simlabel")}</p>
<svg viewBox="0 0 400 180" className="w-full rounded-xl my-3 select-none" style={{background:"linear-gradient(#070b16,#101a33)"}} role="img" aria-label="Laser aiming game">
<circle cx="30" cy="34" r="18" fill="#2a6fb0"/><rect x="0" y="130" width="400" height="50" fill="#5b5e66"/>{[60,150,240,330].map((c,i)=><ellipse key={c} cx={c} cy={150+(i%2)*14} rx="14" ry="4" fill="#4a4d55"/>)}
<rect x={target-7} y="122" width="14" height="10" fill={near?"#ffe27a":"#e0b252"} stroke="#1b2233"/>
<g stroke={near?"#7f7":"#fff"} fill="none" strokeWidth="1.5"><circle cx={x} cy="126" r="11"/><line x1={x-16} y1="126" x2={x+16} y2="126"/><line x1={x} y1="110" x2={x} y2="142"/></g>
{res&&<g key={n}><line className="beam" x1="46" y1="42" x2={x} y2="122" stroke="#7f7" strokeWidth="3"/>{res==="hit"&&<line className="beam" style={{animationDelay:"1.2s"}} x1={x} y1="122" x2="46" y2="42" stroke="#fa6" strokeWidth="3"/>}</g>}</svg>
{win?<p className="text-center font-bold text-xl" role="status">{t("lk.win")} {r.icon} {t("r."+r.k)}<br/><span className="text-sm font-normal">{t("l.time")}</span></p>:<><p className="text-center text-sm opacity-80 mb-2" role="status">{res==="hit"?t("lk.hit"):res==="miss"?t("lk.miss"):t("lk.p")}</p>
<button className="btn btn-primary btn-lg w-full" onClick={fire} disabled={!!res}>{t("lk.fire")}</button></>}</section>);}

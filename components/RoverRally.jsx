"use client";
import {useEffect,useRef,useState} from "react";import {complete} from "@/lib/progress";import {finishGame} from "@/lib/scores";import {useLang} from "./LangProvider";import ResultCard from "./ResultCard";
const GY=150;
// Endless runner: jump rocks, grab crystals. 45 seconds, 3 lives. Educational simulation.
export default function RoverRally({id,onDone}){const {t}=useLang();const s=useRef({run:false});const [,force]=useState(0);const [res,setRes]=useState(null);const [ph,setPh]=useState("idle");
const jump=()=>{const c=s.current;if(c.run&&c.h===0)c.vy=0.46};
const start=()=>{s.current={run:true,left:45,dist:0,gems:0,lives:3,h:0,vy:0,obs:[],gm:[],no:800,ng:500,inv:0,id:0};setRes(null);setPh("run")};
useEffect(()=>{let raf,last=performance.now();const loop=ts=>{const dt=Math.min(ts-last,32);last=ts;const c=s.current;
if(c.run){c.left-=dt/1000;const sp=0.22+c.dist/60000;c.dist+=sp*dt;c.vy-=0.0014*dt;c.h=Math.max(0,c.h+c.vy*dt);if(c.h===0)c.vy=0;c.inv=Math.max(0,c.inv-dt);
c.no-=dt;if(c.no<=0){c.obs.push({x:420,id:c.id++});c.no=650+Math.random()*900}c.ng-=dt;if(c.ng<=0){c.gm.push({x:420,y:Math.random()<.5?16:70,id:c.id++});c.ng=800+Math.random()*900}
c.obs.forEach(r=>r.x-=sp*dt);c.gm.forEach(g=>g.x-=sp*dt);c.obs=c.obs.filter(r=>r.x>-40);c.gm=c.gm.filter(g=>g.x>-20);
for(const r of c.obs){if(c.inv<=0&&r.x<92&&r.x+26>66&&c.h<20){c.lives--;c.inv=1200;r.x=-99}}
c.gm=c.gm.filter(g=>{if(Math.abs(g.x-80)<24&&Math.abs((g.y)-(c.h+12))<24){c.gems++;return false}return true});
if(c.left<=0||c.lives<=0){c.run=false;const sc=Math.floor(c.dist/20)+c.gems*50;const f=finishGame("rally",sc,[400,700,1000]);if(sc>=300){complete("rally",id);onDone&&onDone()}setRes({...f,score:sc});setPh("over")}
force(n=>n+1)}raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);
const kd=e=>{if((e.code==="Space"||e.key==="ArrowUp")&&s.current.run){e.preventDefault();jump()}};addEventListener("keydown",kd);return()=>{cancelAnimationFrame(raf);removeEventListener("keydown",kd)}},[]);
const c=s.current,off=-((c.dist||0)*0.3%400),score=Math.floor((c.dist||0)/20)+(c.gems||0)*50,spin=(c.dist||0)/5;
return(<section className="glass p-4 sm:p-5 my-10"><h2 className="text-3xl font-bold">🏁 {t("rr.h")}</h2><p className="text-xs opacity-70">{t("g.sim")}</p>
<div className="flex justify-between text-lg font-bold my-2"><span>⏱ {Math.max(0,Math.ceil(c.left??45))}</span><span>⭐ {score}</span><span>💎 {c.gems||0}</span><span>{"❤️".repeat(Math.max(0,c.lives??3))}</span></div>
<svg viewBox="0 0 400 200" className="w-full rounded-xl select-none touch-none" style={{background:"linear-gradient(#3a1a12,#c0602a 75%)"}} onPointerDown={jump} role="img" aria-label="Rover runner game">
<circle cx="320" cy="50" r="22" fill="#ffd9a0" opacity=".85"/>
<g transform={`translate(${off} 0)`}>{[0,400].map(o=><path key={o} transform={`translate(${o} 0)`} d="M0 150 L50 110 L110 140 L170 95 L240 140 L300 105 L360 140 L400 150 Z" fill="#7a3418" opacity=".7"/>)}</g>
<rect x="0" y={GY} width="400" height="50" fill="#8c3d1f"/><g transform={`translate(${off*2.5%80} 0)`}>{Array.from({length:12}).map((_,i)=><rect key={i} x={i*40} y={GY+10+(i%3)*10} width="18" height="3" rx="1.5" fill="#6a2c14"/>)}</g>
{(c.obs||[]).map(r=><polygon key={r.id} points={`${r.x},${GY} ${r.x+4},${GY-18} ${r.x+14},${GY-24} ${r.x+24},${GY-14} ${r.x+28},${GY}`} fill="#5a2a18" stroke="#2b1208" strokeWidth="1.5"/>)}
{(c.gm||[]).map(g=><polygon key={g.id} className="glow" points={`${g.x},${GY-g.y-12} ${g.x+9},${GY-g.y} ${g.x},${GY-g.y+12} ${g.x-9},${GY-g.y}`} fill="#7ad7ee" stroke="#fff" strokeWidth="1.5"/>)}
<g transform={`translate(60 ${GY-26-(c.h||0)})`} opacity={c.inv>0&&Math.floor(c.inv/100)%2?0.4:1} stroke="#1b2233" strokeWidth="1.2"><rect x="4" y="6" width="32" height="14" rx="3" fill="#cfd6e4"/><polygon points="0,6 40,6 44,0 4,0" fill="#2a4a8a"/><line x1="10" y1="0" x2="10" y2="-10" strokeWidth="2"/><rect x="5" y="-16" width="11" height="7" rx="2" fill="#cfd6e4"/>
{[8,20,32].map(x=><g key={x} transform={`translate(${x} 22) rotate(${spin})`}><circle r="6" fill="#444c5c"/><line x1="-6" y1="0" x2="6" y2="0"/></g>)}</g></svg>
<div className="mt-3 text-center">{ph==="idle"&&<><p className="text-sm opacity-80 mb-2">{t("rr.p")}</p><button className="btn btn-primary btn-lg w-full" onClick={start}>▶ {t("qc.go")}</button></>}
{ph==="run"&&<button className="btn btn-primary btn-lg w-full select-none" onPointerDown={jump}>⬆ {t("rr.jump")}</button>}
{ph==="over"&&res&&<ResultCard name="Rover Rally" {...res} onRetry={start}/>}</div></section>);}

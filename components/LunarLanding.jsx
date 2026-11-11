"use client";
import {useEffect,useMemo,useRef,useState} from "react";import {complete} from "@/lib/progress";import {finishGame} from "@/lib/scores";import {useLang} from "./LangProvider";import ResultCard from "./ResultCard";
const LEVELS=[{pw:110,g:0.00003},{pw:80,g:0.000036},{pw:60,g:0.00004}],TH=0.00009;
const gh=(x,px,pw)=>Math.abs(x-px)<=pw/2?200:186+6*Math.sin(x/22);
// Moon Lander: rotate and thrust to land softly on the pad. 3 levels, 3 lives. Educational simulation.
export default function LunarLanding({id,onDone}){const {t}=useLang();const s=useRef({st:"idle",lvl:0,lives:3,score:0,k:{l:false,r:false,t:false}});const [,force]=useState(0);const [res,setRes]=useState(null);
const o=s.current;const pad=o.px||200;const pw=LEVELS[o.lvl||0].pw;
const terrain=useMemo(()=>{let p="0,240";for(let x=0;x<=400;x+=8)p+=` ${x},${gh(x,pad,pw)}`;return p+" 400,240"},[pad,pw]);
const setup=lv=>{const px=80+Math.random()*240;let x=60+Math.random()*280;if(Math.abs(x-px)<60)x=(x+160)%340+30;Object.assign(s.current,{st:"run",lvl:lv,px,x,y:30,vx:(Math.random()-.5)*0.05,vy:0,a:0,fuel:100});force(n=>n+1)};
const start=()=>{s.current.lives=3;s.current.score=0;s.current.k={l:false,r:false,t:false};setRes(null);setup(0)};
useEffect(()=>{let raf,last=performance.now();const loop=ts=>{const dt=Math.min(ts-last,32);last=ts;const c=s.current;
if(c.st==="run"){const k=c.k,Lv=LEVELS[c.lvl];if(k.l)c.a-=0.12*dt;if(k.r)c.a+=0.12*dt;const ar=c.a*Math.PI/180;if(k.t&&c.fuel>0){c.vx+=Math.sin(ar)*TH*dt;c.vy-=Math.cos(ar)*TH*dt;c.fuel=Math.max(0,c.fuel-0.012*dt)}
c.vy+=Lv.g*dt;c.x=(c.x+c.vx*dt+400)%400;c.y+=c.vy*dt;
if(c.y+10>=gh(c.x,c.px,Lv.pw)){const ok=Math.abs(c.x-c.px)<=Lv.pw/2&&Math.abs(c.a)<=12&&c.vy<=0.07&&Math.abs(c.vx)<=0.045;
if(ok){c.score+=300+Math.round(c.fuel*3)+Math.round((1-c.vy/0.07)*100);c.st=c.lvl>=2?"done":"landed";
if(c.st==="done"){const f=finishGame("landing",c.score,[500,900,1200]);complete("landing",id);onDone&&onDone();setRes({...f,score:c.score})}}
else{c.lives--;c.st=c.lives<=0?"over":"crash";if(c.st==="over"){const f=finishGame("landing",c.score,[500,900,1200]);if(c.score>=300){complete("landing",id);onDone&&onDone()}setRes({...f,score:c.score})}}}
force(n=>n+1)}raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);
const m={ArrowLeft:"l",ArrowRight:"r",ArrowUp:"t"};const kd=e=>{if(m[e.key]){e.preventDefault();s.current.k[m[e.key]]=true}},ku=e=>{if(m[e.key])s.current.k[m[e.key]]=false};addEventListener("keydown",kd);addEventListener("keyup",ku);
return()=>{cancelAnimationFrame(raf);removeEventListener("keydown",kd);removeEventListener("keyup",ku)}},[]);
const hold=key=>({onPointerDown:e=>{e.currentTarget.setPointerCapture(e.pointerId);s.current.k[key]=true},onPointerUp:()=>{s.current.k[key]=false},onPointerCancel:()=>{s.current.k[key]=false},style:{touchAction:"none"}});
const flame=o.st==="run"&&o.k.t&&o.fuel>0,over=o.st==="done"||o.st==="over";
return(<section className="glass p-4 sm:p-5 my-10"><h2 className="text-3xl font-bold">🚀 {t("ll.h")}</h2><p className="text-xs opacity-70">{t("g.simlabel")}</p>
<div className="flex justify-between text-lg font-bold my-2"><span>{t("gm.level")} {(o.lvl||0)+1}/3</span><span>⭐ {o.score}</span><span>{"❤️".repeat(Math.max(0,o.lives))}</span></div>
<svg viewBox="0 0 400 240" className="w-full rounded-xl select-none" style={{background:"linear-gradient(#030511,#15203d)"}} role="img" aria-label="Moon lander game">
{[[40,30],[120,70],[200,20],[310,50],[360,110],[70,140],[260,120]].map(([a,b],i)=><circle key={i} cx={a} cy={b} r="1.3" fill="#fff"/>)}<circle cx="345" cy="38" r="16" fill="#2a6fb0"/>
<polygon points={terrain} fill="#6a6d76"/><rect x={pad-pw/2} y="198" width={pw} height="5" rx="2" fill="#5fd4e8" className="glow"/>
{o.st!=="idle"&&<g transform={`translate(${o.x} ${o.y}) rotate(${o.a})`}><rect x="-12" y="-10" width="24" height="16" rx="4" fill="#cfd6e4" stroke="#1b2233" strokeWidth="1.5"/><circle cx="0" cy="-3" r="4" fill="#7ad7ee"/><line x1="-10" y1="6" x2="-17" y2="12" stroke="#cfd6e4" strokeWidth="2.5"/><line x1="10" y1="6" x2="17" y2="12" stroke="#cfd6e4" strokeWidth="2.5"/>{flame&&<polygon points="-6,6 6,6 0,24" fill="#ffb347"/>}</g>}
{o.st==="crash"&&<text x={o.x} y={o.y} textAnchor="middle" fontSize="30">💥</text>}</svg>
{o.st==="run"&&<><div className="grid grid-cols-3 gap-2 text-xs my-2"><div>⛽<div className="h-2 rounded bg-base-300"><div className="h-2 rounded bg-signal" style={{width:o.fuel+"%"}}/></div></div><div>↓ {t("ll.sp")}<div className="h-2 rounded bg-base-300"><div className="h-2 rounded" style={{width:Math.min(100,Math.max(0,o.vy)/0.14*100)+"%",background:o.vy<=0.07?"#4ade80":"#f87171"}}/></div></div><div>⟳ {Math.round(o.a)}°</div></div>
<div className="grid grid-cols-3 gap-2"><button className="btn btn-lg btn-outline select-none" {...hold("l")}>◀</button><button className="btn btn-lg btn-primary select-none" {...hold("t")}>🔥</button><button className="btn btn-lg btn-outline select-none" {...hold("r")}>▶</button></div></>}
<div className="mt-3 text-center">{o.st==="idle"&&<><p className="text-sm opacity-80 mb-2">{t("ll.p")}</p><button className="btn btn-primary btn-lg w-full" onClick={start}>▶ {t("ll.go")}</button></>}
{o.st==="landed"&&<><p className="font-bold mb-2" role="status">✅ {t("ll.ok")}</p><button className="btn btn-primary" onClick={()=>setup(o.lvl+1)}>{t("gm.next")} ▶</button></>}
{o.st==="crash"&&<><p className="font-bold mb-2" role="status">💥 {t("ll.crash")}</p><button className="btn btn-primary" onClick={()=>setup(o.lvl)}>🔄 {t("ll.again")}</button></>}
{over&&res&&<ResultCard name="Moon Lander" {...res} onRetry={start}/>}</div></section>);}

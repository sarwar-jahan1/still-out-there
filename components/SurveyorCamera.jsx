"use client";
import {useEffect,useRef,useState} from "react";import {complete} from "@/lib/progress";import {finishGame} from "@/lib/scores";import {useLang} from "./LangProvider";import ResultCard from "./ResultCard";
const T=[{k:"earth",icon:"🌍",l:"Earth",x:150,y:70},{k:"sun",icon:"☀️",l:"Sun",x:980,y:66},{k:"crater",icon:"🕳️",l:"Crater",x:520,y:156},{k:"boulder",icon:"🪨",l:"Boulder",x:760,y:146},{k:"pebbles",icon:"⚪",l:"Pebbles",x:330,y:152}];
const STARS=Array.from({length:70},(_,i)=>[(i*97)%1200,(i*53)%125,i%5===0?1.6:1]);
// Photo-safari game: pan a Moon-surface camera and snap the object you are asked to find. Educational simulation.
export default function SurveyorCamera({id,onDone}){const {t}=useLang();const s=useRef({run:false,cam:400,k:{l:false,r:false},left:15,idx:0,score:0,order:[0,1,2,3,4],got:[],flash:0,bad:0});const [,force]=useState(0);const [ph,setPh]=useState("idle");const [res,setRes]=useState(null);const drag=useRef(null);const svgRef=useRef(null);
const end=()=>{const c=s.current;c.run=false;const f=finishGame("landing",c.score,[400,700,900]);if(c.score>=300){complete("landing",id);onDone&&onDone()}setRes({...f,score:c.score});setPh("over")};
const next=()=>{const c=s.current;c.idx++;c.left=15;if(c.idx>=T.length)end()};
const start=()=>{const o=[0,1,2,3,4].sort(()=>Math.random()-.5);s.current={run:true,cam:400,k:{l:false,r:false},left:15,idx:0,score:0,order:o,got:[],flash:0,bad:0};setRes(null);setPh("run")};
useEffect(()=>{let raf,last=performance.now();const loop=ts=>{const dt=Math.min(ts-last,32);last=ts;const c=s.current;
if(c.run){c.cam=Math.max(0,Math.min(800,c.cam+((c.k.r?1:0)-(c.k.l?1:0))*dt*0.32));c.left-=dt/1000;c.flash=Math.max(0,c.flash-dt);c.bad=Math.max(0,c.bad-dt);if(c.left<=0)next();force(n=>n+1)}raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);
const kd=e=>{const c=s.current;if(!c.run)return;if(e.key==="ArrowLeft"){e.preventDefault();c.k.l=true}if(e.key==="ArrowRight"){e.preventDefault();c.k.r=true}if(e.code==="Space"){e.preventDefault();snap()}};const ku=e=>{if(e.key==="ArrowLeft")s.current.k.l=false;if(e.key==="ArrowRight")s.current.k.r=false};
addEventListener("keydown",kd);addEventListener("keyup",ku);return()=>{cancelAnimationFrame(raf);removeEventListener("keydown",kd);removeEventListener("keyup",ku)}},[]);
const snap=()=>{const c=s.current;if(!c.run)return;const g=T[c.order[c.idx]];c.flash=250;if(Math.hypot(g.x-(c.cam+200),g.y-110)<=50){c.score+=100+Math.round(c.left*8);c.got.push(g.icon);next()}else{c.score=Math.max(0,c.score-25);c.bad=400}};
const hold=key=>({onPointerDown:e=>{e.currentTarget.setPointerCapture(e.pointerId);s.current.k[key]=true},onPointerUp:()=>{s.current.k[key]=false},onPointerCancel:()=>{s.current.k[key]=false},style:{touchAction:"none"}});
const c=s.current,g=T[c.order[Math.min(c.idx,4)]];
return(<section className="glass p-4 sm:p-5 my-10"><h2 className="text-3xl font-bold">📷 {t("sv.h")}</h2><p className="text-xs opacity-70">{t("g.simlabel")}</p>
<div className="flex justify-between text-lg font-bold my-2"><span>⏱ {Math.max(0,Math.ceil(c.left))}</span><span>{ph==="run"?`${t("sv.find")}: ${g.icon} ${g.l}`:""}</span><span>⭐ {c.score}</span></div>
<div className={`relative w-full rounded-xl overflow-hidden select-none ${c.bad>0?"shake":""}`} style={{aspectRatio:"2/1",touchAction:"pan-y"}}>
<svg ref={svgRef} viewBox={`${c.cam} 0 400 200`} className="absolute inset-0 w-full h-full" onPointerDown={e=>{if(!c.run)return;e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,cam:s.current.cam}}} onPointerMove={e=>{const d=drag.current;if(d){const r=svgRef.current.getBoundingClientRect();s.current.cam=Math.max(0,Math.min(800,d.cam-(e.clientX-d.x)*(400/r.width)))}}} onPointerUp={()=>{drag.current=null}} role="img" aria-label="Moon surface camera view">
<defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9a9da6"/><stop offset="1" stopColor="#50535b"/></linearGradient></defs>
<rect x="0" y="0" width="1200" height="200" fill="#02030a"/>{STARS.map(([x,y,r],i)=><circle key={i} cx={x} cy={y} r={r*.8} fill="#fff" opacity=".8"/>)}
<circle cx="150" cy="70" r="16" fill="#2a6fb0"/><path d="M140 66q6-8 12 0t6 8-10 6-8-14z" fill="#4caf50"/><circle cx="980" cy="66" r="24" fill="#fff3b0" opacity=".25"/><circle cx="980" cy="66" r="13" fill="#fff6c0"/>
<rect x="0" y="135" width="1200" height="65" fill="url(#mg)"/>
{[[80,168,18],[900,172,22],[1110,162,16],[640,176,14]].map(([x,y,r],i)=><ellipse key={i} cx={x} cy={y} rx={r} ry={r/4} fill="#3e4148" opacity=".7"/>)}
<ellipse cx="520" cy="156" rx="44" ry="11" fill="#3e4148" stroke="#b5b8c0" strokeWidth="2"/><polygon points="735,160 745,128 770,118 792,138 797,160" fill="#6a6d76" stroke="#d0d3da" strokeWidth="1.5"/><polygon points="745,128 770,118 765,140" fill="#8f929b"/>
{[[320,154],[334,159],[346,151],[328,162]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={4+(i%2)} fill="#9a9da6" stroke="#52555d"/>)}
{[[610,158],[1040,150],[180,160]].map(([x,y],i)=><polygon key={i} points={`${x},${y+6} ${x+4},${y-4} ${x+10},${y+6}`} fill="#5b5e66"/>)}</svg>
<div className="absolute pointer-events-none" style={{left:"50%",top:"55%",width:"25%",aspectRatio:"1",transform:"translate(-50%,-50%)",border:"2px solid #7fff9a",borderRadius:"50%",boxShadow:"0 0 12px #7fff9a"}}><div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-300/60"/><div className="absolute top-1/2 left-0 right-0 h-px bg-green-300/60"/></div>
<div className="absolute inset-0 pointer-events-none" style={{background:"repeating-linear-gradient(transparent 0 2px,rgba(0,0,0,.18) 2px 3px)"}}/>{c.flash>0&&<div className="absolute inset-0 bg-white pointer-events-none" style={{opacity:c.flash/250}}/>}</div>
<div className="mt-2 text-xl h-7" aria-live="polite">{c.got.join(" ")}</div>
{ph==="run"&&<div className="grid grid-cols-3 gap-2 mt-1"><button className="btn btn-lg btn-outline select-none" {...hold("l")}>◀</button><button className="btn btn-lg btn-primary select-none" onClick={snap}>📸 {t("sv.snap")}</button><button className="btn btn-lg btn-outline select-none" {...hold("r")}>▶</button></div>}
<div className="mt-3 text-center">{ph==="idle"&&<><p className="text-sm opacity-80 mb-2">{t("sv.p")}</p><button className="btn btn-primary btn-lg w-full" onClick={start}>▶ {t("qc.go")}</button></>}
{ph==="over"&&res&&<ResultCard name="Surveyor Camera" {...res} onRetry={start}/>}</div></section>);}

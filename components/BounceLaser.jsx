"use client";
import {useEffect,useMemo,useState} from "react";import {complete} from "@/lib/progress";import {finishGame} from "@/lib/scores";import {useLang} from "./LangProvider";import ResultCard from "./ResultCard";
const COLS=7,ROWS=5,C=50;
// Mirror puzzle: tap mirrors to bounce the laser onto the retroreflector. Educational simulation.
const LV=[{e:[2,0],d:[1,0],t:[0,5],w:[[1,3]],m:[[2,5,"\\"]]},
{e:[4,0],d:[1,0],t:[0,1],w:[[1,2]],m:[[4,3,"\\"],[2,3,"/"],[2,1,"/"]]},
{e:[2,0],d:[1,0],t:[2,6],w:[[1,2],[3,3],[1,4]],m:[[2,2,"/"],[4,2,"/"],[4,4,"\\"],[2,4,"\\"]]}];
function trace(L,ms){let [r,c]=L.e,[dx,dy]=L.d;const pts=[[c,r]];let hit=false;
for(let i=0;i<40;i++){r+=dy;c+=dx;if(r<0||r>=ROWS||c<0||c>=COLS||L.w.some(([a,b])=>a===r&&b===c)){pts.push([c-dx*.5,r-dy*.5]);break}
pts.push([c,r]);if(r===L.t[0]&&c===L.t[1]){hit=true;break}const m=ms.find(([a,b])=>a===r&&b===c);if(m)[dx,dy]=m[2]==="/"?[-dy,-dx]:[dy,dx]}return{pts,hit}}
const px=([c,r])=>`${c*C+C/2},${r*C+C/2}`;
export default function BounceLaser({id,onDone}){const {t}=useLang();const [ph,setPh]=useState("idle");const [lv,setLv]=useState(0);const [ms,setMs]=useState(LV[0].m);const [moves,setMoves]=useState(0);const [total,setTotal]=useState(0);const [won,setWon]=useState(false);const [res,setRes]=useState(null);
const L=LV[lv],tr=useMemo(()=>trace(L,ms),[lv,ms]);
const begin=(i,tot)=>{setLv(i);setMs(LV[i].m);setMoves(0);setWon(false);setTotal(tot)};
const start=()=>{begin(0,0);setRes(null);setPh("run")};
useEffect(()=>{if(!tr.hit||won||ph!=="run")return;setWon(true);const sc=Math.max(100,400-20*moves);const to=setTimeout(()=>{const tot=total+sc;if(lv+1<LV.length)begin(lv+1,tot);else{const f=finishGame("laser",tot,[500,800,950]);complete("laser",id);onDone&&onDone();setRes({...f,score:tot});setPh("over")}},1500);return()=>clearTimeout(to)},[tr.hit,ph]);
const flip=i=>{if(won||ph!=="run")return;setMs(ms.map((m,k)=>k===i?[m[0],m[1],m[2]==="/"?"\\":"/"]:m));setMoves(x=>x+1)};
return(<section className="glass p-4 sm:p-5 my-10"><h2 className="text-3xl font-bold">🪞 {t("bl.h")}</h2><p className="text-xs opacity-70">{t("g.simlabel")}</p>
<div className="flex justify-between text-lg font-bold my-2"><span>{t("gm.level")} {lv+1}/3</span><span>↻ {moves}</span><span>⭐ {total}</span></div>
<svg viewBox={`0 0 ${COLS*C} ${ROWS*C}`} className="w-full rounded-xl select-none" style={{background:"radial-gradient(circle at 10% 50%,#13305c,#050810 70%)"}} role="img" aria-label="Mirror puzzle">
{Array.from({length:ROWS*COLS}).map((_,i)=><circle key={i} cx={(i%COLS)*C+C/2} cy={Math.floor(i/COLS)*C+C/2} r="1.5" fill="#fff" opacity=".25"/>)}
{L.w.map(([r,c])=><circle key={r+"w"+c} cx={c*C+C/2} cy={r*C+C/2} r="18" fill="#5b5e66" stroke="#8a8e99" strokeWidth="2"/>)}
<circle cx={L.e[1]*C+C/2-6} cy={L.e[0]*C+C/2} r="17" fill="#2a6fb0"/><circle cx={L.t[1]*C+C/2} cy={L.t[0]*C+C/2} r="15" fill="none" stroke={tr.hit?"#ffe27a":"#e0b252"} strokeWidth="3" className={tr.hit?"glow":""}/><rect x={L.t[1]*C+C/2-9} y={L.t[0]*C+C/2-9} width="18" height="18" rx="3" fill={tr.hit?"#ffe27a":"#e0b252"}/>
<polyline points={tr.pts.map(px).join(" ")} fill="none" stroke="#7fff9a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="glowline"/>
{tr.hit&&<polyline points={[...tr.pts].reverse().map(px).join(" ")} fill="none" stroke="#ffb347" strokeWidth="2" strokeDasharray="6 6" className="flow"/>}
{ms.map(([r,c,k],i)=><g key={i} onClick={()=>flip(i)} style={{cursor:"pointer"}} role="button" tabIndex={0} aria-label="Mirror" onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();flip(i)}}}>
<rect x={c*C+2} y={r*C+2} width={C-4} height={C-4} rx="8" fill="#5fd4e8" opacity=".12" stroke="#5fd4e8" strokeDasharray="3 3"/>
<line x1={k==="/"?c*C+10:c*C+10} y1={k==="/"?r*C+C-10:r*C+10} x2={c*C+C-10} y2={k==="/"?r*C+10:r*C+C-10} stroke="#e8f4ff" strokeWidth="7" strokeLinecap="round"/></g>)}</svg>
<div className="mt-3 text-center">{ph==="idle"&&<><p className="text-sm opacity-80 mb-2">{t("bl.p")}</p><button className="btn btn-primary btn-lg w-full" onClick={start}>▶ {t("qc.go")}</button></>}
{ph==="run"&&<p className="font-bold h-6" role="status">{won?"✅ "+t("bl.ok"):t("bl.p")}</p>}
{ph==="over"&&res&&<ResultCard name="Bounce the Laser" {...res} onRetry={start}/>}</div></section>);}

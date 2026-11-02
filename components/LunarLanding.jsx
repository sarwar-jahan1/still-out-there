"use client";
import {useEffect,useRef,useState} from "react";import {complete,REWARDS} from "@/lib/progress";import {useLang} from "./LangProvider";import Confetti from "./Confetti";
const G=0.00002,TH=0.00005,SAFE=0.04,FLOOR=176;
// Game: slow the lander with thrust and touch down gently. Educational simulation, not real flight physics.
export default function LunarLanding({id,onDone}){const {t}=useLang();const s=useRef({y:20,v:0.01,fuel:100,th:false,st:"idle"});const [,force]=useState(0);
useEffect(()=>{let raf,last=performance.now();const loop=ts=>{const dt=Math.min(ts-last,32);last=ts;const o=s.current;
if(o.st==="run"){const burn=o.th&&o.fuel>0;o.v=Math.max(-0.05,o.v+(G-(burn?TH:0))*dt);o.y=Math.max(10,o.y+o.v*dt);if(burn)o.fuel=Math.max(0,o.fuel-0.02*dt);
if(o.y>=FLOOR){o.y=FLOOR;if(o.v<=SAFE){o.st="win";complete("landing",id);onDone&&onDone()}else o.st="crash"}force(x=>x+1)}raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);
const kd=e=>{if(e.key==="ArrowUp"){e.preventDefault();s.current.th=true}},ku=e=>{if(e.key==="ArrowUp")s.current.th=false};addEventListener("keydown",kd);addEventListener("keyup",ku);
return()=>{cancelAnimationFrame(raf);removeEventListener("keydown",kd);removeEventListener("keyup",ku)}},[]);
const o=s.current,sp=Math.max(0,o.v),safe=sp<=SAFE,flame=o.st==="run"&&o.th&&o.fuel>0,r=REWARDS[id];
const start=()=>{s.current={y:20,v:0.01,fuel:100,th:false,st:"run"};force(x=>x+1)};
return(<section className="glass p-4 sm:p-5 my-10">{o.st==="win"&&<Confetti n={70} id="land"/>}<h2 className="text-3xl font-bold">🚀 {t("ll.h")}</h2><p className="text-xs opacity-70">{t("g.simlabel")}</p>
<svg viewBox="0 0 400 220" className="w-full rounded-xl my-3 select-none" style={{background:"linear-gradient(#050810,#12182c)"}} role="img" aria-label="Lunar landing game">
<rect x="0" y="190" width="400" height="30" fill="#5b5e66"/><rect x="150" y="186" width="100" height="6" rx="3" fill="#7a7e88"/>
<g transform={`translate(200 ${o.y})`} className={o.st==="crash"?"shake":""}><rect x="-14" y="-12" width="28" height="18" rx="4" fill="#cfd6e4" stroke="#1b2233" strokeWidth="1.5"/><circle cx="0" cy="-3" r="4" fill="#7ad7ee"/><line x1="-12" y1="6" x2="-20" y2="14" stroke="#1b2233" strokeWidth="2"/><line x1="12" y1="6" x2="20" y2="14" stroke="#1b2233" strokeWidth="2"/>{flame&&<polygon points="-6,6 6,6 0,22" fill="#ffb347"/>}</g>
{o.st==="crash"&&<text x="200" y="110" textAnchor="middle" fill="#ff7b7b" fontSize="22" fontWeight="700">💥</text>}</svg>
<div className="grid grid-cols-2 gap-3 text-xs mb-3"><div>{t("ll.sp")}<div className="h-3 rounded bg-base-300"><div className="h-3 rounded" style={{width:Math.min(100,sp/0.08*100)+"%",background:safe?"#4ade80":"#f87171"}}/></div></div><div>{t("ll.fuel")}<div className="h-3 rounded bg-base-300"><div className="h-3 rounded bg-signal" style={{width:o.fuel+"%"}}/></div></div></div>
{o.st==="idle"&&<><p className="text-sm opacity-80 mb-2">{t("ll.p")}</p><button className="btn btn-primary btn-lg w-full" onClick={start}>{t("ll.go")}</button></>}
{o.st==="run"&&<button className="btn btn-primary btn-lg w-full touch-none select-none" style={{touchAction:"none"}} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);s.current.th=true}} onPointerUp={()=>{s.current.th=false}} onPointerCancel={()=>{s.current.th=false}}>{t("ll.thr")}</button>}
{o.st==="crash"&&<><p className="font-bold mb-2" role="status">{t("ll.crash")}</p><button className="btn btn-primary w-full" onClick={start}>{t("ll.again")}</button></>}
{o.st==="win"&&<p className="text-center font-bold text-xl" role="status">{t("ll.ok")} {r.icon} {t("r."+r.k)}</p>}</section>);}

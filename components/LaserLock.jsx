"use client";
import {useEffect,useRef,useState} from "react";import {complete,REWARDS} from "@/lib/progress";import {finishGame} from "@/lib/scores";import {useLang} from "./LangProvider";import ResultCard from "./ResultCard";
// 30-second aiming game: stop the crosshair on the retroreflector. Educational simulation.
export default function LaserLock({id,onDone}){const {t}=useLang();const [ph,setPh]=useState("idle");const [x,setX]=useState(40);const [time,setTime]=useState(30);const [score,setScore]=useState(0);const [lives,setLives]=useState(3);const [combo,setCombo]=useState(0);const [tg,setTg]=useState(200);const [shot,setShot]=useState(null);const [res,setRes]=useState(null);
const r=useRef({x:40,dir:1,left:30,score:0,lives:3,combo:0,tg:200,cool:0,run:false});const fireRef=useRef(()=>{});
const end=()=>{const o=r.current;if(!o.run)return;o.run=false;const f=finishGame("laser",o.score,[200,500,900]);if(o.score>=200){complete("laser",id);onDone&&onDone()}setRes({...f,score:o.score});setPh("over")};
useEffect(()=>{let raf,last=performance.now();const loop=ts=>{const dt=Math.min(ts-last,32);last=ts;const o=r.current;
if(o.run){o.left-=dt/1000;o.cool=Math.max(0,o.cool-dt);let v=o.x+o.dir*dt*(0.12+o.score/9000);if(v>370){v=370;o.dir=-1}if(v<30){v=30;o.dir=1}o.x=v;setX(v);setTime(Math.max(0,Math.ceil(o.left)));if(o.left<=0||o.lives<=0)end()}raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);
const kd=e=>{if(e.code==="Space"&&r.current.run){e.preventDefault();fireRef.current()}};addEventListener("keydown",kd);return()=>{cancelAnimationFrame(raf);removeEventListener("keydown",kd)}},[]);
const start=()=>{r.current={x:40,dir:1,left:30,score:0,lives:3,combo:0,tg:200,cool:0,run:true};setScore(0);setLives(3);setCombo(0);setTg(200);setTime(30);setShot(null);setRes(null);setPh("run")};
const fire=()=>{const o=r.current;if(!o.run||o.cool>0)return;o.cool=600;const d=Math.abs(o.x-o.tg),ok=d<=16;setShot({x:o.x,ok,k:Date.now()});
if(ok){o.combo++;o.score+=(d<=6?150:100)+25*(o.combo-1);o.tg=60+Math.floor(Math.random()*280)}else{o.combo=0;o.lives--}setScore(o.score);setCombo(o.combo);setLives(o.lives);setTg(o.tg)};fireRef.current=fire;
const near=Math.abs(x-tg)<=16;
return(<section className="glass p-4 sm:p-5 my-10"><h2 className="text-3xl font-bold">🎯 {t("lk.h")}</h2>
<div className="flex justify-between text-lg font-bold my-2"><span>⏱ {time}</span><span>⭐ {score}</span><span>{"❤️".repeat(lives)}{"🖤".repeat(3-lives)}</span><span>{combo>1?`🔥 x${combo}`:""}</span></div>
<svg viewBox="0 0 400 180" className="w-full rounded-xl select-none" style={{background:"radial-gradient(circle at 10% 15%,#1a3a6a,#070b16 60%)"}} role="img" aria-label="Laser aiming game">
{[[60,20],[150,50],[250,25],[340,60],[300,100],[110,90]].map(([a,b],i)=><circle key={i} cx={a} cy={b} r="1.2" fill="#fff"/>)}
<circle cx="30" cy="34" r="20" fill="#2a6fb0"/><path d="M14 30q10-8 18 2t10 4" stroke="#4caf50" strokeWidth="5" fill="none"/>
<rect x="0" y="130" width="400" height="50" fill="#6a6d76"/>{[60,150,240,330].map((c,i)=><ellipse key={c} cx={c} cy={150+(i%2)*14} rx="16" ry="4.5" fill="#50535b"/>)}
<rect x={tg-8} y="120" width="16" height="12" rx="2" fill={near?"#ffe27a":"#e0b252"} stroke="#fff" strokeWidth="1.5" className={near?"glow":""}/>
<g stroke={near?"#7f7":"#fff"} fill="none" strokeWidth="1.8"><circle cx={x} cy="126" r="12"/><line x1={x-18} y1="126" x2={x+18} y2="126"/><line x1={x} y1="108" x2={x} y2="144"/></g>
{shot&&<g key={shot.k}><line className="beam" x1="48" y1="40" x2={shot.x} y2="122" stroke={shot.ok?"#7f7":"#f87171"} strokeWidth="3"/>{shot.ok&&<line className="beam" style={{animationDelay:"1s"}} x1={shot.x} y1="122" x2="48" y2="40" stroke="#ffb347" strokeWidth="3"/>}</g>}</svg>
<div className="mt-3">{ph==="idle"&&<><p className="text-center text-sm opacity-80 mb-2">{t("lk.p")}</p><button className="btn btn-primary btn-lg w-full" onClick={start}>▶ {t("qc.go")}</button></>}
{ph==="run"&&<button className="btn btn-primary btn-lg w-full" onClick={fire}>🔴 {t("lk.fire")}</button>}
{ph==="over"&&res&&<ResultCard name="Laser Lock" {...res} onRetry={start}/>}</div></section>);}

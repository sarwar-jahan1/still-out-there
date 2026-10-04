"use client";
import {useMemo} from "react";
const C=["#5fd4e8","#d9622b","#ffd166","#ffffff","#9bf6a0"];
export default function Confetti({n=40,id=0}){
const p=useMemo(()=>Array.from({length:n},(_,i)=>({l:Math.random()*100,d:Math.random()*.4,dx:(Math.random()-.5)*320,c:C[i%C.length],s:6+Math.random()*6,t:1.8+Math.random()*1.2})),[id,n]);
return<div className="confetti" aria-hidden="true">{p.map((q,i)=><i key={i} style={{left:`${q.l}%`,width:q.s,height:q.s*.5,background:q.c,animationDelay:`${q.d}s`,animationDuration:`${q.t}s`,"--dx":`${q.dx}px`}}/>)}</div>}

"use client";
import Link from "next/link";import {useState,useEffect} from "react";
import {missions} from "@/data/missions";import {useLang} from "./LangProvider";
export default function Explorer(){const {t,L}=useLang();const [w,setW]=useState("Moon");
useEffect(()=>{const q=new URLSearchParams(window.location.search).get("w");if(q==="Mars"||q==="Moon")setW(q)},[]);
const list=missions.filter(m=>m.planet===w).map(L);const moon=w==="Moon";
return(<section id="explore" className="px-4 max-w-5xl mx-auto py-16"><h2 className="text-4xl md:text-5xl font-extrabold">{t("ex.h")}</h2>
<p className="opacity-80 mt-2">{t("ex.sub")}</p>
<div className="flex gap-3 my-6" role="tablist">{["Moon","Mars"].map(x=><button key={x} role="tab" aria-selected={w===x} onClick={()=>setW(x)} className={`btn ${w===x?"btn-primary":"btn-outline"}`}>{t(x==="Moon"?"ex.moon":"ex.mars")}</button>)}</div>
<div key={w} className="planet-in relative aspect-square max-w-xl mx-auto rounded-full shadow-2xl" style={{background:moon?"radial-gradient(circle at 35% 30%,#e4e6ea,#8a8d94 60%,#3b3d44)":"radial-gradient(circle at 35% 30%,#f09062,#b24a22 60%,#4a1c0c)",boxShadow:moon?"0 0 80px rgba(200,210,230,.25)":"0 0 80px rgba(217,98,43,.35)"}}>
<div className="absolute inset-0 rounded-full overflow-hidden" aria-hidden="true"><div className={`surface ${moon?"moon":"mars"}`}/><div className="shade"/></div>
<svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="rgba(255,255,255,.35)" strokeDasharray="1.5 1.5"/><ellipse cx="50" cy="50" rx="30" ry="46" fill="none" stroke="rgba(255,255,255,.2)" strokeDasharray="1.5 1.5"/><line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,.15)"/><line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,.15)"/><circle r="1.6" fill="#5fd4e8"><animateMotion dur="14s" repeatCount="indefinite" path="M4,50 a46,18 0 1,0 92,0 a46,18 0 1,0 -92,0"/></circle></svg>
{list.map(m=><Link key={m.id} href={`/mission/${m.id}`} aria-label={`${m.name}, ${t("v."+m.type)}, ${m.pin.place}`} className="group absolute z-10 p-3 -m-3" style={{left:`${m.pin.x}%`,top:`${m.pin.y}%`}}>
<span className="pin block w-6 h-6 rounded-full bg-signal border-2 border-white"/><span className={`sm:hidden absolute top-3 text-[10px] font-bold bg-black/70 text-white px-1.5 py-0.5 rounded whitespace-nowrap ${m.pin.x>50?"right-9":"left-9"}`}>{m.name}</span>
<span className={`absolute top-0 w-40 sm:w-48 glass p-2 text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition ${m.pin.x>50?"right-8":"left-8"}`}><b>{m.name}</b><br/>{t("v."+m.type)} · {t("v."+m.planet)}<br/>{m.shortDescription}</span></Link>)}</div>
<p className="text-center text-sm opacity-70 mt-4">{t("ex.hint")}</p></section>);}

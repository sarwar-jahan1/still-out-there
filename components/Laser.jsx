"use client";
import {useState} from "react";import {useLang} from "./LangProvider";import {mark,orbit} from "@/lib/progress";
export default function Laser({id,onDone}){const {t}=useLang();const [v,setV]=useState(22);const [go,setGo]=useState(0);const ok=Math.abs(v)<=4;
const fire=()=>{setGo(go+1);mark("games","laser");mark("items",id);orbit("orbit.win");onDone&&onDone()};
return(<section className="glass p-6 my-10"><h2 className="text-3xl font-bold">{t("l.h")}</h2><p className="text-xs opacity-70">{t("g.simlabel")}</p>
<svg viewBox="0 0 400 140" className="w-full my-4" role="img" aria-label={t("l.alt")}>
<circle cx="40" cy="70" r="30" fill="#2a6fb0"/><circle cx="360" cy="70" r="14" fill="#aaa"/><rect x="351" y="66" width="8" height="8" fill={ok?"#ff6":"#ddd"}><title>retroreflector</title></rect>
<g stroke={ok?"#7f7":"#fff"} strokeWidth="1.5" fill="none"><circle cx="355" cy={70+v*1.4} r="9"/><line x1="340" y1={70+v*1.4} x2="370" y2={70+v*1.4}/><line x1="355" y1={55+v*1.4} x2="355" y2={85+v*1.4}/></g>
{go>0&&<g key={go}><line className="beam" x1="70" y1="66" x2="346" y2="66" stroke="#7f7" strokeWidth="3"/><line className="beam" style={{animationDelay:"1.6s"}} x1="346" y1="76" x2="70" y2="76" stroke="#fa6" strokeWidth="3"/></g>}</svg>
<label className="block text-sm mb-2">{t("l.aim")}<input type="range" min="-30" max="30" value={v} onChange={e=>setV(+e.target.value)} className="range range-primary range-sm w-full mt-1" aria-label={t("l.aim")}/></label>
<p role="status" className="text-sm h-5">{ok?t("l.lock"):""}</p>
<button className="btn btn-primary" disabled={!ok} onClick={fire}>{t("l.fire")}</button>
{go>0&&<div className="mt-3 max-w-prose"><p>{t("l.p")}</p><p className="mt-2">{t("l.time")}</p><p className="mt-2">🪞 <b>{t("r.apollo")}</b></p></div>}</section>);}

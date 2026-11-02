"use client";
import {useState} from "react";import {useLang} from "./LangProvider";import {mark,orbit} from "@/lib/progress";
const pts=Array.from({length:60},(_,i)=>`${i*6},${40+(i>=12&&i<22?Math.sin(i*3)*10*Math.exp(-(i-12)/6):i>=28&&i<50?Math.sin(i*2)*28*Math.exp(-(i-28)/10):Math.sin(i)*1.5)}`).join(" ");
export default function Seismic({id,onDone}){const {t}=useLang();const [go,setGo]=useState(0);const [seen,setSeen]=useState([]);
const look=k=>{const s=seen.includes(k)?seen:[...seen,k];setSeen(s);if(s.length===2){mark("games","quake");mark("items",id);orbit("orbit.win");onDone&&onDone()}};
return(<section className="glass p-6 my-10"><h2 className="text-3xl font-bold">{t("s.h")}</h2>
<p className="text-sm opacity-80">{t("s.sim")}</p>
<svg viewBox="0 0 360 80" className="w-full my-3" role="img" aria-label={t("s.alt")}>
{seen.includes("p")&&<rect x="72" y="0" width="60" height="80" fill="#5fd4e8" opacity=".18"/>}{seen.includes("s")&&<rect x="168" y="0" width="132" height="80" fill="#d9622b" opacity=".18"/>}
<line x1="0" y1="40" x2="360" y2="40" stroke="rgba(150,170,200,.4)"/>{go>0&&<polyline key={go} className="beam" pathLength="300" points={pts} fill="none" stroke="#5fd4e8" strokeWidth="2"/>}</svg>
<div className="flex flex-wrap gap-2"><button className="btn btn-primary btn-sm" onClick={()=>{setGo(go+1);setSeen([])}}>{t("s.trig")}</button>
<button className="btn btn-sm btn-outline" disabled={!go} onClick={()=>look("p")}>{t("s.pw")}</button><button className="btn btn-sm btn-outline" disabled={!go} onClick={()=>look("s")}>{t("s.sw")}</button></div>
<div className="mt-3 max-w-prose" role="status">{seen.includes("p")&&<p>{t("s.pt")}</p>}{seen.includes("s")&&<p className="mt-1">{t("s.st")}</p>}{seen.length===2&&<p className="mt-2">〰️ <b>{t("r.insight")}</b></p>}</div>
<details className="mt-3"><summary className="cursor-pointer text-signal">{t("s.more")}</summary><p className="mt-2 max-w-prose">{t("s.detail")}</p></details></section>);}

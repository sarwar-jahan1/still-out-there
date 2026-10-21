"use client";
import {useState} from "react";import {useLang} from "./LangProvider";
export default function Laser(){const [go,setGo]=useState(0);const {t}=useLang();
return(<section className="glass p-6 my-10"><h2 className="text-3xl font-bold">{t("l.h")}</h2>
<svg viewBox="0 0 400 140" className="w-full my-4" role="img" aria-label={t("l.alt")}>
<circle cx="40" cy="70" r="30" fill="#2a6fb0"/><circle cx="360" cy="70" r="14" fill="#aaa"/>
{go>0&&<g key={go}><line className="beam" x1="70" y1="66" x2="346" y2="66" stroke="#7f7" strokeWidth="3"/><line className="beam" style={{animationDelay:"1.6s"}} x1="346" y1="76" x2="70" y2="76" stroke="#fa6" strokeWidth="3"/><circle cx="346" cy="70" r="5" fill="#ff6"/></g>}</svg>
<button className="btn btn-primary" onClick={()=>setGo(go+1)}>{go?t("l.again"):t("l.send")}</button>
{go>0&&<p className="mt-3 max-w-prose">{t("l.p")}</p>}</section>);}

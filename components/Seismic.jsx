"use client";
import {useLang} from "./LangProvider";
export default function Seismic(){const {t}=useLang();const pts=Array.from({length:60},(_,i)=>`${i*6},${40+(i>22&&i<40?Math.sin(i*2)*28*Math.exp(-(i-22)/10):Math.sin(i)*2)}`).join(" ");
return(<section className="glass p-6 my-10"><h2 className="text-3xl font-bold">{t("s.h")}</h2>
<svg viewBox="0 0 360 80" className="w-full my-3" role="img" aria-label={t("s.alt")}><polyline points={pts} fill="none" stroke="#5fd4e8" strokeWidth="2"/></svg>
<p className="text-sm opacity-70">{t("s.note")}</p><p className="mt-2 max-w-prose">{t("s.p")}</p></section>);}

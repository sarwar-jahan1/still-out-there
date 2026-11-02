"use client";
import Link from "next/link";import {useProgress,REWARDS} from "@/lib/progress";import {missions} from "@/data/missions";import {useLang} from "@/components/LangProvider";import Progress from "@/components/Progress";
export default function Backpack(){const [p]=useProgress();const {t}=useLang();
return(<section className="max-w-4xl mx-auto px-4 py-12"><h1 className="text-4xl sm:text-5xl font-extrabold">🎒 {t("bp.h")}</h1><Progress/>
<div className="grid sm:grid-cols-2 gap-4">{missions.map(m=>{const r=REWARDS[m.id];const has=p.items.includes(m.id);
return(<div key={m.id} className={`glass p-5 ${has?"":"opacity-60"}`}><div className="text-5xl">{has?r.icon:"🔒"}</div><h2 className="text-2xl font-bold mt-2">{t("r."+r.k)}</h2>
<p className="text-sm opacity-80">{t("bp.from")} <Link className="text-signal" href={`/mission/${m.id}`}>{m.name}</Link></p><p className="mt-2">{has?t("rd."+r.k):t("bp.empty")}</p></div>)})}</div></section>);}

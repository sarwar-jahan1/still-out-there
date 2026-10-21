"use client";
import Link from "next/link";import {useProgress,badges} from "@/lib/progress";import {missions} from "@/data/missions";import {useLang} from "./LangProvider";
export default function Progress(){const [p]=useProgress();const {t}=useLang();const n=p.explored.length;const next=missions.find(m=>!p.explored.includes(m.id));
return(<section className="glass p-5 max-w-xl my-8" aria-label={t("pr.h")}><b>{t("pr.h")}</b>
<progress className="progress progress-primary w-full my-2" value={n} max={missions.length}/><p className="text-sm">{n} / {missions.length} {t("pr.u")}</p>
<div className="flex flex-wrap gap-2 mt-3">{badges(p,missions).map(b=><span key={b.k} className={`badge badge-lg h-auto py-1 ${b.ok?"badge-primary unlock":"badge-ghost opacity-50"}`}>{b.ok?t("b."+b.k):"🔒 "+t("b."+b.k).slice(3)}</span>)}</div>
{next&&<Link href={`/mission/${next.id}`} className="btn btn-primary btn-sm mt-4">{t("pr.cont")}</Link>}</section>);}

"use client";
import {useState} from "react";import {missions} from "@/data/missions";import MissionCard from "@/components/MissionCard";import {useLang} from "@/components/LangProvider";
export default function Missions(){const {t,L}=useLang();const [q,setQ]=useState("");const [f,setF]=useState("All");
const r=missions.map(L).filter(m=>(f==="All"||m.planet===f)&&[m.name,m.type,m.planet,t("v."+m.type),t("v."+m.planet)].join(" ").toLowerCase().includes(q.toLowerCase()));
return(<section className="max-w-5xl mx-auto px-4 py-12"><h1 className="text-5xl font-extrabold">{t("arch.h")}</h1>
<div className="flex flex-wrap gap-3 my-6"><input className="input input-bordered w-full sm:w-auto" placeholder={t("arch.search")} aria-label={t("arch.search")} value={q} onChange={e=>setQ(e.target.value)}/>
{["All","Moon","Mars"].map(x=><button key={x} className={`btn ${f===x?"btn-primary":"btn-outline"}`} onClick={()=>setF(x)}>{t("v."+x)}</button>)}</div>
<div className="grid md:grid-cols-2 gap-5">{r.map(m=><MissionCard key={m.id} m={m}/>)}</div>{!r.length&&<p>{t("arch.none")}</p>}</section>);}

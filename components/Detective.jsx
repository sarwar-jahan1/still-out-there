"use client";
import {useEffect,useState} from "react";import {missions} from "@/data/missions";import {mark,load,orbit} from "@/lib/progress";import {useLang} from "./LangProvider";
// Clue-based mystery: each wrong guess reveals one more clue. Reuses mission data.
export default function Detective(){const {t}=useLang();const [i,setI]=useState(0);const [lvl,setLvl]=useState(1);const [res,setRes]=useState(null);const [solved,setSolved]=useState([]);
useEffect(()=>{setSolved(load().games.filter(g=>g.startsWith("detective:")).map(g=>g.slice(10)))},[]);
const m=missions[i%missions.length];const clues=[`${t("det.c1")} ${m.planet}.`,`${t("det.c2")} ${m.type.toLowerCase()}.`,t("c."+m.id)];
const guess=x=>{if(res==="ok")return;if(x.id===m.id){setRes("ok");mark("games","detective:"+m.id);setSolved(s=>s.includes(m.id)?s:[...s,m.id]);orbit("orbit.win")}else{setRes("no");setLvl(l=>Math.min(3,l+1))}};
const last=i>=missions.length-1;
return(<section className="glass p-5 my-6" aria-label={t("det.h")}><h2 className="text-3xl font-bold">🕵️ {t("det.h")}</h2><p className="text-sm opacity-80">{t("det.sub")}</p>
<p className="mt-3 text-signal font-bold">{t("det.case")} {i+1} / {missions.length}</p>
<ul className="mt-1 space-y-1">{clues.slice(0,lvl).map((c,k)=><li key={k}>🔎 {c}</li>)}</ul>
<p className="mt-3 font-semibold">{t("det.pick")}</p>
<div className="flex flex-wrap gap-2 mt-2">{missions.map(x=><button key={x.id} onClick={()=>guess(x)} disabled={res==="ok"} className={`btn btn-sm h-auto py-2 ${res==="ok"&&x.id===m.id?"btn-success":"btn-outline"}`}>{x.name}</button>)}</div>
<p className="mt-3 font-bold" role="status">{res==="ok"?t("det.ok"):res==="no"?t("det.no"):""}</p>
{res==="ok"&&(last?<p className="mt-1">{t("det.done")}</p>:<button className="btn btn-primary btn-sm mt-2" onClick={()=>{setI(i+1);setLvl(1);setRes(null)}}>{t("det.next")}</button>)}</section>);}

"use client";
import {useState} from "react";import {mark} from "@/lib/progress";import {useLang} from "./LangProvider";
export default function MissionSystem({items,onUse}){const [i,setI]=useState(null);const {t}=useLang();
return(<section className="my-10"><h2 className="text-3xl font-bold mb-2">{t("mv.how")}</h2><p className="opacity-80 mb-4">{t("mv.tap")}</p>
<div className="flex flex-col items-stretch max-w-sm">{items.map((c,k)=><div key={k} className="flex flex-col items-center">
<button onClick={()=>{setI(k);mark("engineered",c.n);onUse&&onUse()}} aria-expanded={i===k} className={`btn h-auto min-h-12 py-2 w-full ${i===k?"btn-primary":"btn-outline"}`}>{c.n}</button>
{k<items.length-1&&<svg width="12" height="28" aria-hidden="true"><line x1="6" y1="0" x2="6" y2="28" stroke="#5fd4e8" strokeWidth="2" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" from="16" to="0" dur="1s" repeatCount="indefinite"/></line></svg>}</div>)}</div>
{i!==null&&items[i]&&<p className="glass p-4 mt-4 max-w-prose" role="status"><b>{items[i].n}:</b> {items[i].d}</p>}</section>);}

"use client";
import {useEffect,useState} from "react";
import {mark,badges,load} from "@/lib/progress";import {missions} from "@/data/missions";import {useLang} from "./LangProvider";
import NasaImage from "./NasaImage";import Reveal from "./Reveal";import MissionSystem from "./MissionSystem";import Laser from "./Laser";import Seismic from "./Seismic";import Quiz from "./Quiz";
function Listen({text}){const {t,lang}=useLang();const [s,setS]=useState("idle");const [pr,setPr]=useState(0);const [vol,setVol]=useState(1);const [ok,setOk]=useState(false);useEffect(()=>{setOk("speechSynthesis"in window)},[]);
const play=()=>{if(s==="paused"){speechSynthesis.resume();setS("playing");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang==="bn"?"bn-BD":"en-US";u.volume=vol;u.onboundary=e=>setPr(Math.round(e.charIndex/text.length*100));u.onend=()=>{setS("idle");setPr(0)};u.onerror=()=>setS("idle");speechSynthesis.speak(u);setS("playing")};
useEffect(()=>()=>{ok&&speechSynthesis.cancel()},[ok]);
useEffect(()=>{if(ok){speechSynthesis.cancel();setS("idle");setPr(0)}},[lang]);
return(<div className="glass p-4 my-6 space-y-2"><b>{t("mv.listen")}</b> <span className="text-sm opacity-70">(~{Math.max(5,Math.round(text.split(/\s+/).length/2.5))} {t("mv.est")})</span>
{ok?<><div className="flex items-center gap-2 flex-wrap"><button className="btn btn-primary btn-sm" onClick={play}>{t("mv.play")}</button><button className="btn btn-sm" onClick={()=>{speechSynthesis.pause();setS("paused")}}>{t("mv.pause")}</button><button className="btn btn-sm" onClick={()=>{speechSynthesis.cancel();setS("idle");setPr(0)}}>{t("mv.stop")}</button>
<span className="flex gap-1 h-5 items-end" aria-hidden="true">{s==="playing"&&[0,1,2,3,4].map(i=><i key={i} className="bar w-1 h-5 bg-signal" style={{animationDelay:`${i*.15}s`}}/>)}</span><span className="text-sm opacity-70" role="status">{s==="idle"?t("mv.ready"):s==="playing"?t("mv.narr"):t("mv.paused")}</span></div>
<progress className="progress progress-primary w-full" value={pr} max="100" aria-label="Narration progress"/>
<label className="text-sm flex items-center gap-2">{t("mv.vol")} <input type="range" min="0" max="1" step="0.1" value={vol} onChange={e=>setVol(+e.target.value)} className="range range-xs w-32"/></label></>:<span className="text-sm block">{t("mv.nosup")}</span>}</div>);}
export default function MissionView({m:raw}){const {t,L}=useLang();const m=L(raw);const [open,setOpen]=useState(null);const [bs,setBs]=useState([]);
const refresh=()=>setBs(badges(load(),missions).filter(b=>b.ok));
useEffect(()=>{mark("explored",m.id);refresh()},[m.id]);
return(<article className="relative z-10 max-w-3xl mx-auto px-4 py-12">{m.planet==="Mars"&&<div className="dust" aria-hidden="true"/>}
<p className="opacity-70">{t("v."+m.type)} · {t("v."+m.planet)} · {t("v."+m.status)}</p>
<div className="my-4"><NasaImage m={m} fit="contain" className="max-h-[75vh]"/></div>
<h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold my-4 break-words">“{m.story[0]}”</h1>
<Listen text={m.story.join(" ")}/>
<div className="space-y-5 text-lg sm:text-xl leading-relaxed">{m.story.slice(1).map((p,i)=><p key={i}>{p}</p>)}</div>
{m.special==="compare"&&<section className="glass p-6 my-10"><h2 className="text-3xl font-bold">{t("mv.plan")}</h2>
<p className="mt-3">{t("mv.planned")}: {m.compare.planned}</p><div className="h-5 bg-signal rounded" style={{width:"8%"}}/>
<p className="mt-3">{t("mv.actual")}: {m.compare.actual}</p><div className="h-5 bg-rust rounded w-full"/></section>}
{m.special==="surveyor"&&<section className="glass p-6 my-10"><h2 className="text-3xl font-bold">{t("s3.h")}</h2>
<div className="grid grid-cols-3 text-center items-center gap-2 my-4"><div><b>{t("s3.a")}</b><p className="text-sm">{t("s3.at")}</p></div><div className="text-3xl text-signal" aria-hidden="true">⟶</div><div><b>{t("s3.b")}</b><p className="text-sm">{t("s3.bt")}</p></div></div>
<p className="max-w-prose">{t("s3.p")}</p></section>}
{m.special==="laser"&&<Laser/>}{m.special==="seismic"&&<Seismic/>}
<h2 className="text-3xl font-bold mt-12 mb-4">{t("mv.teach")}</h2>
<div className="grid gap-3">{m.facts.map((f,i)=><button key={i} aria-expanded={open===i} onClick={()=>setOpen(open===i?null:i)} className="glass p-4 text-left"><b>{f.t}</b>{open===i&&<p className="mt-2">{f.d}</p>}</button>)}</div>
<MissionSystem items={m.components} onUse={refresh}/>
<h2 className="text-3xl font-bold mt-12 mb-4">{t("mv.tl")}</h2>
<ol className="border-l-2 border-signal pl-5 space-y-5">{m.timeline.map(([d,ti,x],i)=><Reveal as="li" key={i}><p className="text-signal text-sm">{d}</p><b>{ti}</b><p className="opacity-80">{x}</p></Reveal>)}</ol>
<Quiz quiz={m.quiz} onDone={()=>{mark("quizzes",m.id);refresh()}}/>
{bs.length>0&&<p className="glass p-4">{t("mv.unl")} {bs.map(b=>t("b."+b.k)).join("  ")}</p>}
<section className="mt-10 text-sm opacity-70"><b>{t("mv.src")}</b><ul>{m.sources.map(s=><li key={s}>{s}</li>)}</ul><p>{t("mv.img")}</p></section></article>);}

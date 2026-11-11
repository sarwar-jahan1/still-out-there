"use client";
import {useEffect,useState} from "react";import {findVideo} from "@/lib/nasa";import {useLang} from "./LangProvider";
// Real NASA video from the NASA Image and Video Library. Loads only when the student presses play.
export default function NasaVideo({m}){const {t}=useLang();const [v,setV]=useState(null);const [play,setPlay]=useState(false);
useEffect(()=>{let live=true;setV(null);setPlay(false);findVideo({query:m.videoQuery||m.name}).then(r=>live&&setV(r)).catch(()=>{});return()=>{live=false}},[m.id]);
if(!v)return null;
return(<figure className="my-6"><h2 className="text-2xl font-bold mb-2">🎬 {t("mv.watch")}</h2>
{play?<video src={v.url} poster={v.poster} controls autoPlay playsInline className="w-full rounded-xl bg-black max-h-[70vh]" onError={()=>setV(null)}/>:
<button onClick={()=>setPlay(true)} aria-label={t("mv.watch")} className="relative block w-full rounded-xl overflow-hidden bg-black">{v.poster&&<img src={v.poster} alt="" loading="lazy" className="w-full max-h-[60vh] object-cover opacity-80"/>}<span className="absolute inset-0 flex items-center justify-center text-6xl drop-shadow">▶️</span></button>}
<figcaption className="text-xs opacity-70 mt-1">Video: NASA / {v.center} · “{v.title}” · NASA Image and Video Library ({v.id}). Not endorsed by NASA.</figcaption></figure>)}

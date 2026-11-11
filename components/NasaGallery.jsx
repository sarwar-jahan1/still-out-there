"use client";
import {useEffect,useState} from "react";import {findGallery} from "@/lib/nasa";import Tilt from "./Tilt";import NasaImage from "./NasaImage";
// Two different NASA photos per mission, each with credit.
export default function NasaGallery({m}){const [imgs,setImgs]=useState(null);const [bad,setBad]=useState(false);
useEffect(()=>{let live=true;setImgs(null);setBad(false);findGallery(m.gallery||[{nasaId:m.nasaId,query:m.imageQuery||m.name}]).then(r=>live&&setImgs(r)).catch(()=>live&&setBad(true));return()=>{live=false}},[m.id]);
if(bad)return<Tilt><NasaImage m={m} fit="contain" className="max-h-[60vh]"/></Tilt>;
if(!imgs)return<div className="h-56 rounded-xl glass my-4 flex items-center justify-center text-sm opacity-70">…</div>;
return(<div className={`grid gap-3 my-4 ${imgs.length>1?"sm:grid-cols-2":""}`}>{imgs.map(i=><figure key={i.id}><Tilt><img src={i.url} alt={`${m.name}: ${i.title}`} loading="lazy" onError={e=>{if(i.fallback&&e.currentTarget.src!==i.fallback)e.currentTarget.src=i.fallback}} className="w-full h-56 sm:h-64 object-cover rounded-xl"/></Tilt>
<figcaption className="text-xs opacity-70">NASA / {i.center} · “{i.title}” ({i.id}). Not endorsed by NASA.</figcaption></figure>)}</div>)}

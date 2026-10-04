"use client";
import {useEffect,useState} from "react";import {findImage} from "@/lib/nasa";
export default function NasaImage({m,className="h-48",credit=true,fit="cover"}){const [img,setImg]=useState(null);const [bad,setBad]=useState(false);
useEffect(()=>{let live=true;
if(m.image){setImg({url:m.image,title:m.name,id:"",center:"NASA"});return}
findImage({nasaId:m.nasaId,query:m.imageQuery||m.name}).then(r=>live&&setImg(r)).catch(()=>live&&setBad(true));return()=>{live=false}},[m.id]);
const grad=m.planet==="Moon"?"linear-gradient(135deg,#3b3d44,#8a8d94)":"linear-gradient(135deg,#4a1c0c,#b24a22)";
if(bad||!img)return<div className={`${className} ${fit==="contain"?"min-h-[12rem]":""} rounded-xl flex items-center justify-center text-sm`} style={{background:grad}} role="img" aria-label={`${m.name} image placeholder`}>{bad?"Image unavailable":"Loading NASA image…"}</div>;
return(<figure><img src={img.url} alt={`${m.name}: ${img.title}`} loading="lazy" onError={e=>{e.currentTarget.onerror=()=>setBad(true);e.currentTarget.src=img.fallback||""}} className={`${className} w-full rounded-xl ${fit==="contain"?"object-contain h-auto bg-black/40 mx-auto":"object-cover"}`}/>
{credit&&<figcaption className="text-xs opacity-70 mt-1">Image: NASA / {img.center} · “{img.title}” · NASA Image and Video Library{img.id?` (${img.id})`:""}. Not endorsed by NASA.</figcaption>}</figure>);}

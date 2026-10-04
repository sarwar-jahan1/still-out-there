"use client";
import {useEffect,useRef} from "react";
export default function Stage(){const r=useRef(null);
useEffect(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches||!matchMedia("(pointer: fine)").matches)return;
const f=e=>{const el=r.current;if(!el)return;el.style.setProperty("--mx",(e.clientX/innerWidth-.5).toFixed(3));el.style.setProperty("--my",(e.clientY/innerHeight-.5).toFixed(3))};
addEventListener("mousemove",f);return()=>removeEventListener("mousemove",f)},[]);
return<div ref={r} className="stage" aria-hidden="true"><div className="ring"/><div className="haze"/><div className="world mars"/><div className="world moon"/></div>}

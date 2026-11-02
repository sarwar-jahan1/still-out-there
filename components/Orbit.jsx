"use client";
import {useEffect,useState} from "react";import {usePathname} from "next/navigation";import {useLang} from "./LangProvider";
export default function Orbit(){const {t}=useLang();const path=usePathname();const [open,setOpen]=useState(true);const [ev,setEv]=useState(null);
useEffect(()=>{const f=e=>{setEv(e.detail);setOpen(true)};addEventListener("orbit",f);return()=>removeEventListener("orbit",f)},[]);
useEffect(()=>{setEv(null)},[path]);
const base=path==="/"?"orbit.home":path.startsWith("/mission")?"orbit.mission":path==="/backpack"?"orbit.back":null;const k=ev||base;if(!k)return null;
return(<div className="fixed bottom-3 left-3 z-40 flex items-end gap-2 max-w-[85vw]">
<button onClick={()=>setOpen(!open)} aria-label={open?t("orbit.close"):t("orbit.open")} aria-expanded={open} className="shrink-0 w-12 h-12 rounded-full glass flex items-center justify-center">
<svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true"><line x1="20" y1="3" x2="20" y2="9" stroke="#5fd4e8" strokeWidth="2"/><circle cx="20" cy="3" r="2" fill="#5fd4e8"/><rect x="7" y="9" width="26" height="22" rx="8" fill="#cfd6e4"/><circle cx="14.5" cy="19" r="3" fill="#0b1322"/><circle cx="25.5" cy="19" r="3" fill="#0b1322"/><path d="M14 26q6 4 12 0" stroke="#0b1322" strokeWidth="2" fill="none"/></svg></button>
{open&&<div className="glass p-3 text-sm max-w-xs" role="status"><b className="text-signal">ORBIT</b><p>{t(k)}</p></div>}</div>)}

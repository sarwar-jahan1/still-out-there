"use client";
import Link from "next/link";import {useState} from "react";
export default function Navbar(){const [open,setOpen]=useState(false);const [light,setLight]=useState(false);
const toggle=()=>{const n=!light;setLight(n);document.documentElement.setAttribute("data-theme",n?"light":"dark")};
const L=[["Explore","/#explore"],["Missions","/missions"],["About","/about"],["Credits","/credits"]];
return(<header className="sticky top-0 z-50 glass-nav mx-3 mt-3 px-4 py-3 flex items-center justify-between">
<Link href="/" className="font-display font-extrabold tracking-wide">STILL OUT THERE</Link>
<nav className={`${open?"flex":"hidden"} md:flex absolute md:static top-full left-0 right-0 flex-col md:flex-row gap-4 p-4 md:p-0 rounded-xl bg-base-200 border border-base-content/20 md:bg-transparent md:border-0`} aria-label="Main">
{L.map(([t,h])=><Link key={t} href={h} onClick={()=>setOpen(false)} className="py-2">{t}</Link>)}</nav>
<div className="flex gap-2"><button onClick={toggle} className="btn btn-sm" aria-label="Toggle light or dark mode">{light?"🌙 Dark":"☀ Light"}</button>
<button onClick={()=>setOpen(!open)} className="btn btn-sm md:hidden" aria-label="Menu" aria-expanded={open}>☰</button></div></header>);}

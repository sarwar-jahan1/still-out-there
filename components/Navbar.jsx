"use client";
import Link from "next/link";import {useState} from "react";import Sound from "./Sound";import {useLang} from "./LangProvider";
export default function Navbar(){const [open,setOpen]=useState(false);const [light,setLight]=useState(false);const {t,lang,setLang}=useLang();
const toggle=()=>{const n=!light;setLight(n);document.documentElement.setAttribute("data-theme",n?"light":"dark")};
const L=[["nav.explore","/#explore"],["nav.missions","/missions"],["nav.about","/about"],["nav.credits","/credits"]];
return(<header className="sticky top-0 z-50 glass-nav mx-3 mt-3 px-3 sm:px-4 py-3 flex items-center justify-between gap-2">
<Link href="/" className="font-display font-extrabold tracking-wide text-sm sm:text-base">STILL OUT THERE</Link>
<nav className={`${open?"flex":"hidden"} md:flex absolute md:static top-full left-0 right-0 flex-col md:flex-row gap-4 p-4 md:p-0 rounded-xl bg-base-200 border border-base-content/20 md:bg-transparent md:border-0`} aria-label="Main">
{L.map(([k,h])=><Link key={k} href={h} onClick={()=>setOpen(false)} className="py-2">{t(k)}</Link>)}</nav>
<div className="flex gap-1 sm:gap-2"><Sound/>
<button onClick={()=>setLang(lang==="en"?"bn":"en")} className="btn btn-sm btn-primary px-2" aria-label={lang==="en"?"Switch to Bangla":"Switch to English"}>{lang==="en"?"বাংলা":"English"}</button>
<button onClick={toggle} className="btn btn-sm px-2" aria-label="Toggle light or dark mode">{light?"🌙":"☀"}<span className="hidden sm:inline">{light?t("theme.dark"):t("theme.light")}</span></button>
<button onClick={()=>setOpen(!open)} className="btn btn-sm px-2 md:hidden" aria-label="Menu" aria-expanded={open}>☰</button></div></header>);}

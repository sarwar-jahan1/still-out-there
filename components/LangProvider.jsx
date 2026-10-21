"use client";
import {createContext,useContext,useEffect,useState} from "react";
import {D} from "@/lib/i18n";import {bn} from "@/data/missions.bn";
const C=createContext({lang:"en",setLang:()=>{},t:k=>k,L:m=>m});
export const useLang=()=>useContext(C);
export default function LangProvider({children}){const [lang,set]=useState("en");
useEffect(()=>{try{if(localStorage.getItem("sot-lang")==="bn")set("bn")}catch{}},[]);
useEffect(()=>{document.documentElement.lang=lang},[lang]);
const setLang=l=>{set(l);try{localStorage.setItem("sot-lang",l)}catch{}};
const t=k=>D[lang][k]??D.en[k]??k.replace(/^v\./,"");
const L=m=>lang==="bn"&&bn[m.id]?{...m,...bn[m.id]}:m;
return<C.Provider value={{lang,setLang,t,L}}>{children}</C.Provider>}
export function T({k}){return useLang().t(k)}

"use client";
import {createContext,useContext} from "react";import {D} from "@/lib/i18n";
// English-only text dictionary (kept so all copy lives in lib/i18n.js).
const v={lang:"en",t:k=>D.en[k]??k.replace(/^v\./,""),L:m=>m};
const C=createContext(v);
export const useLang=()=>useContext(C);
export default function LangProvider({children}){return<C.Provider value={v}>{children}</C.Provider>}
export function T({k}){return v.t(k)}

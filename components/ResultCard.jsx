"use client";
import {useState} from "react";import Confetti from "./Confetti";import {useLang} from "./LangProvider";
export default function ResultCard({name,score,stars,best,isNew,onRetry}){const {t}=useLang();const [copied,setCopied]=useState(false);
const text=`I scored ${score} ${"⭐".repeat(stars)} in ${name} on STILL OUT THERE! Can you beat me?`;
const share=async()=>{try{if(navigator.share)await navigator.share({text});else{await navigator.clipboard.writeText(text);setCopied(true)}}catch{}};
return(<div className="text-center py-2" role="status">{stars>=2&&<Confetti n={70} id={name+score}/>}
<div className="text-5xl unlock" aria-label={stars+" / 3"}>{[1,2,3].map(i=><span key={i} className={i<=stars?"":"opacity-25 grayscale"}>⭐</span>)}</div>
<p className="text-4xl font-extrabold mt-1">{score}</p><p className="text-sm opacity-80">{t("sc.best")}: {best}{isNew?` 🏆 ${t("sc.new")}`:""}</p>
<div className="flex flex-wrap gap-2 justify-center mt-3"><button className="btn btn-primary" onClick={onRetry}>🔄 {t("sc.again")}</button><button className="btn btn-outline" onClick={share}>📣 {t("sc.share")}</button></div>{copied&&<p className="text-sm mt-2">{t("sc.copied")}</p>}</div>)}

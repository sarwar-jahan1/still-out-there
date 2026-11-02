"use client";
import {useEffect,useRef,useState} from "react";import {complete,REWARDS} from "@/lib/progress";import {useLang} from "./LangProvider";import Confetti from "./Confetti";
// Game: press DETECT while a quake wave crosses the detection window. The signal is SIMULATED, not real Mars data.
export default function QuakeCatch({id,onDone}){const {t}=useLang();const [run,setRun]=useState(false);const [pts,setPts]=useState(Array(100).fill(40));const [got,setGot]=useState(0);const [msg,setMsg]=useState(null);
const st=useRef({buf:Array(100).fill(40),burst:0,wait:30,since:99,caught:true,i:0});
useEffect(()=>{if(!run)return;const iv=setInterval(()=>{const o=st.current;o.i++;let y=40+(Math.random()-.5)*5;
if(o.burst>0){y=40+Math.sin(o.i*1.3)*26*(o.burst/18);o.burst--;o.since=0}else{o.since++;if(--o.wait<=0){o.burst=18;o.wait=45+Math.floor(Math.random()*30);o.caught=false}}
o.buf=[...o.buf.slice(1),y];setPts(o.buf)},60);return()=>clearInterval(iv)},[run]);
const detect=()=>{const o=st.current;if(!o.caught&&(o.burst>0||o.since<12)){o.caught=true;const g=got+1;setGot(g);setMsg("qc.hit");if(g>=3){setRun(false);complete("quake",id);onDone&&onDone()}}else setMsg("qc.miss")};
const win=got>=3,r=REWARDS[id];
return(<section className="glass p-4 sm:p-5 my-10">{win&&<Confetti n={70} id="quake"/>}<div className="flex justify-between"><h2 className="text-3xl font-bold">〰️ {t("qc.h")}</h2><span className="text-2xl">{[0,1,2].map(i=><span key={i}>{i<got?"🟢":"⚪"}</span>)}</span></div>
<p className="text-xs opacity-70">{t("s.sim")}</p>
<svg viewBox="0 0 300 80" className="w-full rounded-xl my-3" style={{background:"#0b1020"}} role="img" aria-label={t("s.alt")}><rect x="170" y="0" width="130" height="80" fill="#5fd4e8" opacity=".1"/><line x1="170" y1="0" x2="170" y2="80" stroke="#5fd4e8" strokeDasharray="3 3"/>
<polyline points={pts.map((y,i)=>`${i*3},${y}`).join(" ")} fill="none" stroke="#5fd4e8" strokeWidth="1.8"/></svg>
{win?<p className="text-center font-bold text-xl" role="status">{t("qc.win")} {r.icon} {t("r."+r.k)}</p>:!run?<><p className="text-sm opacity-80 mb-2">{t("qc.p")}</p><button className="btn btn-primary btn-lg w-full" onClick={()=>{setRun(true);setMsg(null)}}>{t("qc.go")}</button></>:<><p className="text-center text-sm h-5" role="status">{msg?t(msg):""}</p><button className="btn btn-primary btn-lg w-full" onClick={detect}>{t("qc.det")}</button></>}
<details className="mt-3"><summary className="cursor-pointer text-signal">{t("s.more")}</summary><p className="mt-2 max-w-prose">{t("s.detail")}</p></details></section>);}

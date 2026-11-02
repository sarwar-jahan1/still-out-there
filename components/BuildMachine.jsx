"use client";
import {useEffect,useRef,useState} from "react";import {MACHINES} from "./machines";import {mark,load,REWARDS,orbit} from "@/lib/progress";import {useLang} from "./LangProvider";import Confetti from "./Confetti";
const rects=h=>Array.isArray(h[0])?h:[h];
const inHit=(p,[x,y])=>rects(p.hit).some(([a,b,w,h])=>x>=a-8&&x<=a+w+8&&y>=b-8&&y<=b+h+8);
function Mini({p,size=72}){const [x,y,w,h]=p.view;return<svg viewBox={`${x} ${y} ${w} ${h}`} style={{width:size,height:"auto",maxHeight:size}} aria-hidden="true">{p.draw()}</svg>}
// Visual assembly game: drag pieces onto matching outlines (or tap a piece, then tap the machine). Enter/Space auto-places a focused piece.
export default function BuildMachine({m,onDone}){const {t}=useLang();const M=MACHINES[m.id];const gid="build:"+m.id;const ref=useRef(null);const dragRef=useRef(null);
const [placed,setPlaced]=useState([]);const [sel,setSel]=useState(null);const [drag,setDrag]=useState(null);const [bad,setBad]=useState(null);const [fresh,setFresh]=useState(null);
const [was,setWas]=useState(false);useEffect(()=>{setPlaced([]);setSel(null);setWas(!!M&&load().games.includes(gid))},[m.id]);
const toSvg=e=>{const r=ref.current.getBoundingClientRect();return[(e.clientX-r.left)/r.width*400,(e.clientY-r.top)/r.height*220]};
const place=(p,pt)=>{if(placed.includes(p.id)||!(pt[0]>=0&&pt[0]<=400&&pt[1]>=0&&pt[1]<=220))return;
if(inHit(p,pt)){const np=[...placed,p.id];setPlaced(np);setSel(null);setFresh(p.id);if(np.length===M.parts.length){mark("games",gid);mark("items",m.id);orbit("orbit.win");onDone&&onDone()}}
else{setBad(p.id);setTimeout(()=>setBad(null),500)}};
if(!M)return null;
const win=placed.length===M.parts.length;const r=REWARDS[m.id];const dp=drag&&M.parts.find(q=>q.id===drag.id);
return(<section className="glass p-4 sm:p-5 my-10">{win&&<Confetti n={70} id={m.id}/>}
<div className="flex items-center justify-between gap-2"><h2 className="text-3xl font-bold">{t("g.build")}</h2><span className="text-signal font-bold">{placed.length} / {M.parts.length}</span></div>
{m.id==="spirit"&&<p className="text-xs opacity-70">{t("g.sim")}</p>}{was&&!win&&<p className="text-xs text-signal">{t("g.again")}</p>}
<svg ref={ref} viewBox="0 0 400 220" className="w-full rounded-xl my-3 touch-none select-none" style={{background:"linear-gradient(#070b16,#101a33)"}} onClick={e=>{if(sel)place(M.parts.find(q=>q.id===sel),toSvg(e))}} role="img" aria-label={m.name}>
<rect x="0" y="196" width="400" height="24" fill={M.ground}/>
<g className={win?(m.id==="spirit"?"drive":"glow"):""}>{M.parts.map(p=>placed.includes(p.id)?<g key={p.id} className={fresh===p.id?"pop":""}>{p.draw()}</g>:<g key={p.id} className="ghost">{p.draw()}</g>)}</g></svg>
{!win&&<><p className="text-center text-sm opacity-80 mb-2">👆 {t("g.drag")}</p><div className="flex flex-wrap gap-3 justify-center">{[...M.parts].reverse().filter(p=>!placed.includes(p.id)).map(p=>
<button key={p.id} aria-label={p.label} aria-pressed={sel===p.id} style={{touchAction:"none"}} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);dragRef.current={id:p.id,sx:e.clientX,sy:e.clientY,moved:false};setSel(p.id);setDrag({id:p.id,x:e.clientX,y:e.clientY,moved:false})}} onPointerMove={e=>{const d=dragRef.current;if(!d||d.id!==p.id)return;if(Math.hypot(e.clientX-d.sx,e.clientY-d.sy)>6)d.moved=true;setDrag({id:p.id,x:e.clientX,y:e.clientY,moved:d.moved})}} onPointerUp={e=>{const d=dragRef.current;dragRef.current=null;setDrag(null);if(d&&d.moved)place(p,toSvg(e))}} onPointerCancel={()=>{dragRef.current=null;setDrag(null)}}
onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();const [a,b,w,h]=rects(p.hit)[0];place(p,[a+w/2,b+h/2])}}}
className={`rounded-xl p-2 bg-base-200/60 border-2 cursor-grab ${sel===p.id?"border-signal":bad===p.id?"border-red-500 shake":"border-transparent"}`}><Mini p={p}/><span className="block text-[11px] mt-1">{p.label}</span></button>)}</div></>}
{win&&r&&<p className="text-center font-bold text-xl mt-2" role="status">{t("g.ready")} {r.icon} {t("r."+r.k)}</p>}
{dp&&drag.moved&&<div style={{position:"fixed",left:drag.x-36,top:drag.y-36,pointerEvents:"none",zIndex:80,width:72}}><Mini p={dp}/></div>}</section>);}

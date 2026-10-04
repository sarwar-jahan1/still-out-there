"use client";
import {useState} from "react";import Confetti from "./Confetti";
export default function Quiz({quiz,onDone}){const [i,setI]=useState(0);const [pick,setPick]=useState(null);const [score,setScore]=useState(0);const [first,setFirst]=useState(true);const [done,setDone]=useState(false);const [burst,setBurst]=useState(0);
if(done){const perfect=score===quiz.length;return<section className="glass p-6 my-10 text-center" role="status"><Confetti key="end" n={110} id="end"/>
<div className="text-6xl unlock" aria-hidden="true">{perfect?"🏆":"🚀"}</div><h2 className="text-3xl font-bold mt-2">{perfect?"PERFECT MISSION!":"MISSION COMPLETE!"}</h2><p className="mt-2 text-lg">First-try score: {score} / {quiz.length}</p><p className="opacity-80">Your progress and badges were saved.</p></section>}
const q=quiz[i];const ok=pick===q.a;
const choose=k=>{if(ok)return;setPick(k);if(k===q.a)setBurst(b=>b+1);else setFirst(false)};
const next=()=>{const s=score+(first?1:0);setScore(s);setFirst(true);if(i+1>=quiz.length){setDone(true);onDone&&onDone()}else{setI(i+1);setPick(null)}};
return(<section className="glass p-6 my-10"><h2 className="text-3xl font-bold">Mission Check</h2>{burst>0&&<Confetti key={burst} id={burst}/>}
<progress className="progress progress-primary w-full my-3" value={i} max={quiz.length}/><p className="text-sm opacity-70">Question {i+1} of {quiz.length}</p>
<p className="text-xl my-3">{q.q}</p><div className="grid gap-2">{q.o.map((o,k)=><button key={k} onClick={()=>choose(k)} className={`btn h-auto min-h-12 py-3 text-left justify-start ${pick===k?(k===q.a?"btn-success":"btn-error"):"btn-outline"}`}>{o}</button>)}</div>
{pick!==null&&<div className="mt-4" role="status"><p className="font-bold text-lg">{ok?"MISSION SUCCESS ✓":"TRY AGAIN"}</p><p>{q.e}</p>{ok&&<button className="btn btn-primary mt-3" onClick={next}>{i+1>=quiz.length?"Finish mission":"Next question"}</button>}</div>}</section>);}

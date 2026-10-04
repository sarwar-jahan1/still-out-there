"use client";
import {useRef,useState} from "react";
// Generated ambient hum (Web Audio). NOT a real recording of Mars or the Moon.
export default function Sound(){const [on,setOn]=useState(false);const r=useRef(null);
const toggle=()=>{try{if(!r.current){const a=new (window.AudioContext||window.webkitAudioContext)();const b=a.createBuffer(1,a.sampleRate*2,a.sampleRate);const d=b.getChannelData(0);let l=0;for(let i=0;i<d.length;i++){l=(l+.02*(Math.random()*2-1))/1.02;d[i]=l*3.5}
const s=a.createBufferSource();s.buffer=b;s.loop=true;const f=a.createBiquadFilter();f.type="lowpass";f.frequency.value=400;const g=a.createGain();g.gain.value=0;s.connect(f);f.connect(g);g.connect(a.destination);s.start();r.current={a,g}}
const {a,g}=r.current;const n=!on;if(n)a.resume();g.gain.setTargetAtTime(n?.35:0,a.currentTime,.3);setOn(n)}catch{}};
return<button onClick={toggle} className="btn btn-sm" aria-pressed={on} aria-label="Toggle generated ambient space sound" title="Generated ambient sound, not a real recording">{on?"🔊":"🔇"}</button>}

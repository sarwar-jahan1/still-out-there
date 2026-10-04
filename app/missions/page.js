"use client";
import {useState} from "react";import {missions} from "@/data/missions";import MissionCard from "@/components/MissionCard";
export default function Missions(){const [q,setQ]=useState("");const [f,setF]=useState("All");
const r=missions.filter(m=>(f==="All"||m.planet===f)&&`${m.name} ${m.type} ${m.planet}`.toLowerCase().includes(q.toLowerCase()));
return(<section className="max-w-5xl mx-auto px-4 py-12"><h1 className="text-5xl font-extrabold">Mission archive</h1>
<div className="flex flex-wrap gap-3 my-6"><input className="input input-bordered w-full sm:w-auto" placeholder="Search missions..." aria-label="Search missions" value={q} onChange={e=>setQ(e.target.value)}/>
{["All","Moon","Mars"].map(x=><button key={x} className={`btn ${f===x?"btn-primary":"btn-outline"}`} onClick={()=>setF(x)}>{x}</button>)}</div>
<div className="grid md:grid-cols-2 gap-5">{r.map(m=><MissionCard key={m.id} m={m}/>)}</div>{!r.length&&<p>No missions match. Try another word.</p>}</section>);}

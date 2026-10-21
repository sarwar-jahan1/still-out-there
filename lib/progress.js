"use client";
import {useEffect,useState} from "react";
const K="sot-progress";
export function load(){try{return {engineered:[],...(JSON.parse(localStorage.getItem(K))||{explored:[],quizzes:[]})}}catch{return{explored:[],quizzes:[],engineered:[]}}}
export function save(p){try{localStorage.setItem(K,JSON.stringify(p))}catch{}}
export function mark(type,id){const p=load();if(!p[type].includes(id)){p[type].push(id);save(p)}return p}
export function badges(p,missions){const m=id=>missions.find(x=>x.id===id);const ex=p.explored.map(m).filter(Boolean);
return[{k:"lunar",n:"🌙 Lunar Explorer",ok:ex.some(x=>x.planet==="Moon")},{k:"mars",n:"🔴 Mars Explorer",ok:ex.some(x=>x.planet==="Mars")},{k:"eng",n:"🔧 Mission Engineer",ok:(p.engineered||[]).length>=1},{k:"sci",n:"🧠 Science Detective",ok:p.quizzes.length>=2},{k:"hist",n:"🚀 Space Historian",ok:p.explored.length>=missions.length}]}
export function useProgress(){const [p,setP]=useState({explored:[],quizzes:[],engineered:[]});useEffect(()=>setP(load()),[]);return[p,setP]}

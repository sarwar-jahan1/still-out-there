"use client";
import {useEffect,useState} from "react";
const K="sot-progress";const def=()=>({explored:[],quizzes:[],engineered:[],games:[],items:[]});
export function load(){try{return{...def(),...JSON.parse(localStorage.getItem(K))}}catch{return def()}}
export function save(p){try{localStorage.setItem(K,JSON.stringify(p))}catch{}}
export function mark(type,id){const p=load();if(!p[type].includes(id)){p[type].push(id);save(p)}return p}
export const orbit=k=>{try{window.dispatchEvent(new CustomEvent("orbit",{detail:k}))}catch{}};
export const REWARDS={"apollo11-retroreflector":{icon:"🪞",k:"apollo"},surveyor3:{icon:"🛰️",k:"surveyor"},spirit:{icon:"🛞",k:"spirit"},insight:{icon:"〰️",k:"insight"}};
export function badges(p,missions){const ex=p.explored.map(id=>missions.find(x=>x.id===id)).filter(Boolean);
return[{k:"lunar",ok:ex.some(x=>x.planet==="Moon")},{k:"mars",ok:ex.some(x=>x.planet==="Mars")},{k:"eng",ok:p.games.includes("build:spirit")||p.games.includes("repair:spirit")},{k:"sci",ok:p.games.length>=2},{k:"hist",ok:p.explored.length>=missions.length}]}
export function useProgress(){const [p,setP]=useState(def());useEffect(()=>setP(load()),[]);return[p,setP]}
export function complete(gid,item){mark("games",gid);mark("items",item);orbit("orbit.win")}

const G=["laser","landing","quake","build","rally"];
export const getBest=k=>{try{return +localStorage.getItem("sot-best-"+k)||0}catch{return 0}};
export const setBest=(k,s)=>{if(s>getBest(k)){try{localStorage.setItem("sot-best-"+k,s)}catch{}return true}return false};
export const getStars=g=>{try{return +localStorage.getItem("sot-stars-"+g)||0}catch{return 0}};
export const setStars=(g,n)=>{if(n>getStars(g)){try{localStorage.setItem("sot-stars-"+g,n)}catch{}}};
export const totalStars=()=>G.reduce((a,g)=>a+getStars(g),0);
export const rankOf=n=>n>=10?"🧑‍🚀 Commander":n>=6?"🚀 Explorer":n>=3?"🛰️ Pilot":"🔭 Cadet";
export const starsFor=(s,[a,b,c])=>s>=c?3:s>=b?2:s>=a?1:0;
export function finishGame(g,score,th){const stars=starsFor(score,th);const isNew=setBest(g,score);setStars(g,stars);return{stars,isNew,best:getBest(g)}}

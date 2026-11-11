// Optional enhancement: loads a public-domain image + credit from NASA's Image and Video Library API.
// The site works without it (placeholder is shown on any failure).
const cache=new Map();
export async function findImage({nasaId,query}){
  if(nasaId&&query){try{return await one({nasaId})}catch{return one({query})}}
  return one({nasaId,query})}
async function one({nasaId,query}){
  const key=nasaId||query;if(cache.has(key))return cache.get(key);
  const url=nasaId?`https://images-api.nasa.gov/search?nasa_id=${encodeURIComponent(nasaId)}&media_type=image`:`https://images-api.nasa.gov/search?media_type=image&q=${encodeURIComponent(query)}`;
  const res=await fetch(url);if(!res.ok)throw new Error("NASA API error");
  const it=(await res.json()).collection.items.find(i=>i.links&&i.links[0]&&i.data&&i.data[0]);if(!it)throw new Error("No image");
  const d=it.data[0],thumb=it.links[0].href;
  const out={url:thumb.replace("~thumb","~medium"),fallback:thumb,title:d.title,id:d.nasa_id,center:d.center||"NASA"};
  cache.set(key,out);return out;}
export async function findVideo({query}){
  const key="v:"+query;if(cache.has(key))return cache.get(key);
  const res=await fetch(`https://images-api.nasa.gov/search?media_type=video&q=${encodeURIComponent(query)}`);if(!res.ok)throw new Error("NASA API error");
  const it=(await res.json()).collection.items.find(i=>i.href&&i.data&&i.data[0]);if(!it)throw new Error("No video");
  const man=(await (await fetch(it.href.replace(/^http:/,"https:"))).json()).map(u=>u.replace(/^http:/,"https:"));
  const url=man.find(u=>/~mobile\.mp4$/.test(u))||man.find(u=>/~small\.mp4$/.test(u))||man.find(u=>/~medium\.mp4$/.test(u))||man.find(u=>/\.mp4$/.test(u));if(!url)throw new Error("No mp4");
  const d=it.data[0];const out={url,poster:man.find(u=>/\.jpg$/.test(u))||(it.links&&it.links[0].href),title:d.title,id:d.nasa_id,center:d.center||"NASA"};cache.set(key,out);return out;}
export async function findImages({nasaId,query,n=2}){
  const key="g:"+(nasaId||"")+query+n;if(cache.has(key))return cache.get(key);const out=[];
  const add=it=>{if(!it||!it.links||!it.links[0]||!it.data||!it.data[0])return;const d=it.data[0];if(out.some(o=>o.id===d.nasa_id))return;const th=it.links[0].href;out.push({url:th.replace("~thumb","~medium"),fallback:th,title:d.title,id:d.nasa_id,center:d.center||"NASA"})};
  if(nasaId){try{const r=await fetch(`https://images-api.nasa.gov/search?nasa_id=${encodeURIComponent(nasaId)}&media_type=image`);add((await r.json()).collection.items[0])}catch{}}
  try{const r=await fetch(`https://images-api.nasa.gov/search?media_type=image&q=${encodeURIComponent(query)}`);for(const it of (await r.json()).collection.items){if(out.length>=n)break;add(it)}}catch{}
  if(!out.length)throw new Error("No image");cache.set(key,out);return out;}
// Gallery: one image per spec (each spec = a different subject), skipping duplicates by id or similar title.
export async function findGallery(specs){
  const key="G:"+JSON.stringify(specs);if(cache.has(key))return cache.get(key);const out=[],seen=new Set();
  for(const sp of specs){try{
    const url=sp.nasaId?`https://images-api.nasa.gov/search?nasa_id=${encodeURIComponent(sp.nasaId)}&media_type=image`:`https://images-api.nasa.gov/search?media_type=image&q=${encodeURIComponent(sp.query)}`;
    const items=(await (await fetch(url)).json()).collection.items;
    for(const it of items){if(!it.links||!it.links[0]||!it.data||!it.data[0])continue;const d=it.data[0];const norm=(d.title||"").toLowerCase().replace(/[^a-z]/g,"").slice(0,30);
      if(out.some(o=>o.id===d.nasa_id)||seen.has(norm))continue;seen.add(norm);const th=it.links[0].href;out.push({url:th.replace("~thumb","~medium"),fallback:th,title:d.title,id:d.nasa_id,center:d.center||"NASA"});break}
  }catch{}}
  if(!out.length)throw new Error("No image");cache.set(key,out);return out;}

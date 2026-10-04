import NasaImage from "./NasaImage";
import Link from "next/link";
export default function MissionCard({m}){return(<Link href={`/mission/${m.id}`} className="glass p-5 block hover:-translate-y-1 transition">
<div className="mb-3"><NasaImage m={m} className="h-36" credit={false}/></div>
<h3 className="text-2xl font-bold">{m.name}</h3><p className="text-sm opacity-80">{m.type} on {m.planet} · {m.status}</p><p className="mt-2 italic">“{m.hook}”</p><p className="mt-3 text-signal font-semibold">Explore story →</p></Link>);}

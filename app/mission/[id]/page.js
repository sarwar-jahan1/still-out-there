import {notFound} from "next/navigation";import {missions,get} from "@/data/missions";import MissionView from "@/components/MissionView";
export const generateStaticParams=()=>missions.map(m=>({id:m.id}));
export default function Page({params}){const m=get(params.id);if(!m)notFound();return<MissionView m={m}/>}

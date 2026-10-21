"use client";
import Link from "next/link";import Stage from "@/components/Stage";import Progress from "@/components/Progress";import Explorer from "@/components/Explorer";import {useLang} from "@/components/LangProvider";
export default function Home(){const {t}=useLang();return(<>
<section className="relative overflow-hidden md:min-h-[92vh]"><Stage/><div className="relative z-10 md:min-h-[92vh] flex flex-col md:justify-center px-5 sm:px-6 md:px-16 max-w-[1400px] mx-auto pb-10 md:pb-0"><div className="max-w-2xl">
<h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold leading-none break-words">STILL OUT THERE</h1>
<p className="text-2xl mt-6">{t("hero.sub")}</p><p className="opacity-80 mt-2 max-w-xl">{t("hero.text")}</p>
<div className="flex flex-wrap gap-3 mt-8"><Link href="/#explore" className="btn btn-primary btn-lg w-full sm:w-auto">{t("hero.cta")}</Link><Link href="/?w=Moon#explore" className="btn btn-outline btn-lg w-full sm:w-auto">{t("hero.moon")}</Link><Link href="/?w=Mars#explore" className="btn btn-outline btn-lg w-full sm:w-auto">{t("hero.mars")}</Link></div></div></div></section>
<section className="max-w-3xl mx-auto px-6 py-16"><h2 className="text-4xl font-bold">{t("intro.h")}</h2><p className="mt-4 text-xl">{t("intro.p")}</p></section>
<Explorer/><div className="px-4 max-w-5xl mx-auto"><Progress/></div></>);}

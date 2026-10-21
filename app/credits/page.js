"use client";
import {useLang} from "@/components/LangProvider";
export default function Credits(){const {t}=useLang();return(<section className="max-w-3xl mx-auto px-4 py-12 space-y-3"><h1 className="text-4xl sm:text-5xl font-extrabold">{t("cr.h")}</h1>
{["cr.p1","cr.p2","cr.p3","cr.p4"].map(k=><p key={k}>{t(k)}</p>)}<p>{t("cr.team")}{t("team")}.</p><p>{t("cr.p5")}</p></section>);}

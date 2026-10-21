"use client";
import {useLang} from "@/components/LangProvider";
export default function About(){const {t}=useLang();return(<section className="max-w-3xl mx-auto px-4 py-12 space-y-4 text-lg"><h1 className="text-4xl sm:text-5xl font-extrabold">{t("ab.h")}</h1>
<p>{t("ab.p1")}</p><p>{t("ab.p2")}{t("team")}.</p>
<h2 className="text-3xl font-bold pt-6">{t("ab.next")}</h2><ul className="list-disc pl-6"><li>{t("ab.now")}</li><li>{t("ab.nxt")}</li><li>{t("ab.then")}</li></ul></section>);}

import "./globals.css";
import StarField from "@/components/StarField";import Navbar from "@/components/Navbar";import LangProvider,{T} from "@/components/LangProvider";
export const metadata={title:"STILL OUT THERE",description:"Some machines stopped working. Their stories didn't."};
export default function RootLayout({children}){return(<html lang="en" data-theme="dark"><body><LangProvider><a href="#main" className="skip">Skip to content</a><StarField/><Navbar/><main id="main" className="relative z-10">{children}</main>
<footer className="relative z-10 mt-24 p-8 text-sm opacity-80 border-t border-white/10"><p className="font-display text-xl">STILL OUT THERE</p><p><T k="ft.tag"/></p><p className="mt-2"><T k="ft.team"/></p></footer></LangProvider></body></html>);}

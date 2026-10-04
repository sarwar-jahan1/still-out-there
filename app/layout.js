import "./globals.css";
import StarField from "@/components/StarField";import Navbar from "@/components/Navbar";
export const metadata={title:"STILL OUT THERE",description:"Some machines stopped working. Their stories didn't."};
export default function RootLayout({children}){return(<html lang="en" data-theme="dark"><body><StarField/><Navbar/><main className="relative z-10">{children}</main>
<footer className="relative z-10 mt-24 p-8 text-sm opacity-80 border-t border-white/10"><p className="font-display text-xl">STILL OUT THERE</p><p>Some machines stopped working. Their stories didn't.</p><p className="mt-2">VU_Aphelion · NASA Space Apps Challenge. Not endorsed by NASA.</p></footer></body></html>);}

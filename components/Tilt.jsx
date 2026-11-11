"use client";
import {useRef} from "react";
// Lightweight 3D tilt effect that follows the pointer.
export default function Tilt({children}){const r=useRef(null);
const mv=e=>{const b=r.current.getBoundingClientRect();const x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;r.current.style.transform=`perspective(900px) rotateY(${x*10}deg) rotateX(${-y*8}deg)`};
return<div className="my-4" style={{perspective:"900px"}}><div ref={r} onPointerMove={mv} onPointerLeave={()=>{r.current.style.transform=""}} style={{transition:"transform .15s"}}>{children}</div></div>}

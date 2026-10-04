"use client";
import { useEffect, useRef, useState } from "react";
export default function Reveal({ as: T = "div", className = "", children }) {
  const r = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setOn(true);
      return;
    }
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          o.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return (
    <T ref={r} className={`reveal ${on ? "in" : ""} ${className}`}>
      {children}
    </T>
  );
}

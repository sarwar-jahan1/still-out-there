"use client";
import { useEffect, useRef } from "react";
export default function StarField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current,
      x = c.getContext("2d");
    let w,
      h,
      id,
      stars = [],
      sh = null;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const init = () => {
      const d = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      c.width = w * d;
      c.height = h * d;
      x.setTransform(d, 0, 0, d, 0, 0);
      stars = Array.from(
        { length: Math.min(260, Math.round((w * h) / 8000)) },
        () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.4 + 0.3,
          s: Math.random() * 0.15 + 0.03,
          p: Math.random() * 6.28,
          t: Math.random() * 0.03 + 0.005,
        }),
      );
    };
    const draw = () => {
      x.clearRect(0, 0, w, h);
      for (const s of stars) {
        if (!reduce) {
          s.y -= s.s;
          s.x += s.s * 0.35;
          s.p += s.t;
          if (s.y < -2) {
            s.y = h + 2;
            s.x = Math.random() * w;
          }
          if (s.x > w + 2) s.x = -2;
        }
        x.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(s.p));
        x.fillStyle = s.r > 1.1 ? "#bfe9ff" : "#fff";
        x.beginPath();
        x.arc(s.x, s.y, s.r, 0, 6.283);
        x.fill();
      }
      if (!reduce) {
        if (!sh && Math.random() < 0.003)
          sh = {
            x: Math.random() * w * 0.7,
            y: Math.random() * h * 0.35,
            l: 0,
          };
        if (sh) {
          const g = x.createLinearGradient(sh.x, sh.y, sh.x - 90, sh.y - 40);
          g.addColorStop(0, "rgba(255,255,255,.9)");
          g.addColorStop(1, "rgba(255,255,255,0)");
          x.globalAlpha = 1;
          x.strokeStyle = g;
          x.lineWidth = 1.5;
          x.beginPath();
          x.moveTo(sh.x, sh.y);
          x.lineTo(sh.x - 90, sh.y - 40);
          x.stroke();
          sh.x += 10;
          sh.y += 4.5;
          if (++sh.l > 45) sh = null;
        }
      }
      id = requestAnimationFrame(draw);
    };
    init();
    draw();
    addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(id);
      removeEventListener("resize", init);
    };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="starcanvas" />;
}

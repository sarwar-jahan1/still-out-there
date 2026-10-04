"use client";
import { useState } from "react";
export default function Laser() {
  const [go, setGo] = useState(0);
  return (
    <section className="glass p-6 my-10">
      <h2 className="text-3xl font-bold">Send a laser to the Moon</h2>
      <svg
        viewBox="0 0 400 140"
        className="w-full my-4"
        role="img"
        aria-label="Diagram: laser travels from Earth to the Moon and reflects back. Not to scale."
      >
        <circle cx="40" cy="70" r="30" fill="#2a6fb0" />
        <circle cx="360" cy="70" r="14" fill="#aaa" />
        {go > 0 && (
          <g key={go}>
            <line
              className="beam"
              x1="70"
              y1="66"
              x2="346"
              y2="66"
              stroke="#7f7"
              strokeWidth="3"
            />
            <line
              className="beam"
              style={{ animationDelay: "1.6s" }}
              x1="346"
              y1="76"
              x2="70"
              y2="76"
              stroke="#fa6"
              strokeWidth="3"
            />
            <circle cx="346" cy="70" r="5" fill="#ff6" />
          </g>
        )}
      </svg>
      <button className="btn btn-primary" onClick={() => setGo(go + 1)}>
        {go ? "Send again" : "Send laser"}
      </button>
      {go > 0 && (
        <p className="mt-3 max-w-prose">
          Scientists time how long the light takes to return. Because they know
          the speed of light, they can work out the distance to the Moon.
          Diagram is simplified and not to scale.
        </p>
      )}
    </section>
  );
}

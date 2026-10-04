"use client";
import { useEffect, useState } from "react";
import { mark, badges, load } from "@/lib/progress";
import { missions } from "@/data/missions";
import NasaImage from "./NasaImage";
import Reveal from "./Reveal";
import MissionSystem from "./MissionSystem";
import Laser from "./Laser";
import Seismic from "./Seismic";
import Quiz from "./Quiz";
function Listen({ text }) {
  const [s, setS] = useState("idle");
  const [pr, setPr] = useState(0);
  const [vol, setVol] = useState(1);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk("speechSynthesis" in window);
  }, []);
  const play = () => {
    if (s === "paused") {
      speechSynthesis.resume();
      setS("playing");
      return;
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.volume = vol;
    u.onboundary = (e) => setPr(Math.round((e.charIndex / text.length) * 100));
    u.onend = () => {
      setS("idle");
      setPr(0);
    };
    u.onerror = () => setS("idle");
    speechSynthesis.speak(u);
    setS("playing");
  };
  useEffect(
    () => () => {
      ok && speechSynthesis.cancel();
    },
    [],
  );
  return (
    <div className="glass p-4 my-6 space-y-2">
      <b>Listen to my story</b>{" "}
      <span className="text-sm opacity-70">
        (about {Math.max(5, Math.round(text.split(/\s+/).length / 2.5))}{" "}
        seconds, estimated)
      </span>
      {ok ? (
        <>
          <div className="flex items-center gap-2 flex-wrap">
            <button className="btn btn-primary btn-sm" onClick={play}>
              ▶ Listen
            </button>
            <button
              className="btn btn-sm"
              onClick={() => {
                speechSynthesis.pause();
                setS("paused");
              }}
            >
              Pause
            </button>
            <button
              className="btn btn-sm"
              onClick={() => {
                speechSynthesis.cancel();
                setS("idle");
                setPr(0);
              }}
            >
              Stop
            </button>
            <span className="flex gap-1 h-5 items-end" aria-hidden="true">
              {s === "playing" &&
                [0, 1, 2, 3, 4].map((i) => (
                  <i
                    key={i}
                    className="bar w-1 h-5 bg-signal"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
            </span>
            <span className="text-sm opacity-70" role="status">
              {s === "idle"
                ? "Ready"
                : s === "playing"
                  ? "Narrating"
                  : "Paused"}
            </span>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={pr}
            max="100"
            aria-label="Narration progress"
          />
          <label className="text-sm flex items-center gap-2">
            Volume{" "}
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={vol}
              onChange={(e) => setVol(+e.target.value)}
              className="range range-xs w-32"
            />
          </label>
        </>
      ) : (
        <span className="text-sm">
          Narration isn’t supported here. Read the story below.
        </span>
      )}
    </div>
  );
}
function MissionImage({ m }) {
  return (
    <div className="mb-6">
      <NasaImage m={m} fit="contain" className="max-h-[75vh]" />
    </div>
  );
}
export default function MissionView({ m }) {
  const [open, setOpen] = useState(null);
  const [bs, setBs] = useState([]);
  const refresh = () => setBs(badges(load(), missions).filter((b) => b.ok));
  useEffect(() => {
    mark("explored", m.id);
    refresh();
  }, [m.id]);
  return (
    <article className="relative z-10 max-w-3xl mx-auto px-4 py-12">
      {m.planet === "Mars" && <div className="dust" aria-hidden="true" />}
      <p className="opacity-70">
        {m.type} · {m.planet} · {m.status}
      </p>
      <MissionImage m={m} />
      <h1 className="text-5xl md:text-7xl font-extrabold my-4">
        “{m.story[0]}”
      </h1>
      <Listen text={m.story.join(" ")} />
      <div className="space-y-6 text-xl leading-relaxed">
        {m.story.slice(1).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {m.special === "compare" && (
        <section className="glass p-6 my-10">
          <h2 className="text-3xl font-bold">Planned vs actual</h2>
          <p className="mt-3">Planned: {m.compare.planned}</p>
          <div className="h-5 bg-signal rounded" style={{ width: "8%" }} />
          <p className="mt-3">Actual: {m.compare.actual}</p>
          <div className="h-5 bg-rust rounded w-full" />
        </section>
      )}
      {m.special === "surveyor" && (
        <section className="glass p-6 my-10">
          <h2 className="text-3xl font-bold">A robot, then humans</h2>
          <div className="grid grid-cols-3 text-center items-center gap-2 my-4">
            <div>
              <b>April 1967</b>
              <p className="text-sm">Surveyor 3 lands and tests the soil</p>
            </div>
            <div className="text-3xl text-signal" aria-hidden="true">
              ⟶
            </div>
            <div>
              <b>Nov 1969</b>
              <p className="text-sm">
                Apollo 12 astronauts visit and return parts
              </p>
            </div>
          </div>
          <p className="max-w-prose">
            Engineers could study how materials changed after more than two
            years on the Moon.
          </p>
        </section>
      )}
      {m.special === "laser" && <Laser />}
      {m.special === "seismic" && <Seismic />}
      <h2 className="text-3xl font-bold mt-12 mb-4">What did I teach us?</h2>
      <div className="grid gap-3">
        {m.facts.map((f, i) => (
          <button
            key={i}
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
            className="glass p-4 text-left"
          >
            <b>{f.t}</b>
            {open === i && <p className="mt-2">{f.d}</p>}
          </button>
        ))}
      </div>
      <MissionSystem items={m.components} onUse={refresh} />
      <h2 className="text-3xl font-bold mt-12 mb-4">Timeline</h2>
      <ol className="border-l-2 border-signal pl-5 space-y-5">
        {m.timeline.map(([d, t, x], i) => (
          <Reveal as="li" key={i}>
            <p className="text-signal text-sm">{d}</p>
            <b>{t}</b>
            <p className="opacity-80">{x}</p>
          </Reveal>
        ))}
      </ol>
      <Quiz
        quiz={m.quiz}
        onDone={() => {
          mark("quizzes", m.id);
          refresh();
        }}
      />
      {bs.length > 0 && (
        <p className="glass p-4">
          Badges unlocked: {bs.map((b) => b.n).join("  ")}
        </p>
      )}
      <section className="mt-10 text-sm opacity-70">
        <b>Source / credit</b>
        <ul>
          {m.sources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p>
          Images come from NASA’s Image and Video Library. This project is not
          endorsed by NASA.
        </p>
      </section>
    </article>
  );
}

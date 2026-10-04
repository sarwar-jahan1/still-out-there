export default function Seismic() {
  const pts = Array.from(
    { length: 60 },
    (_, i) =>
      `${i * 6},${40 + (i > 22 && i < 40 ? Math.sin(i * 2) * 28 * Math.exp(-(i - 22) / 10) : Math.sin(i) * 2)}`,
  ).join(" ");
  return (
    <section className="glass p-6 my-10">
      <h2 className="text-3xl font-bold">Listen to Mars</h2>
      <svg
        viewBox="0 0 360 80"
        className="w-full my-3"
        role="img"
        aria-label="Illustration of a seismic wave from a marsquake"
      >
        <polyline points={pts} fill="none" stroke="#5fd4e8" strokeWidth="2" />
      </svg>
      <p className="text-sm opacity-70">
        Illustration only. This is not a real recording or sound from Mars.
      </p>
      <p className="mt-2 max-w-prose">
        When the ground shakes, waves travel through rock. A seismometer feels
        them. By studying how the waves change, scientists learn what is inside
        a planet.
      </p>
    </section>
  );
}

import Link from "next/link";
import Progress from "@/components/Progress";
import Explorer from "@/components/Explorer";
export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden min-h-[92vh]">
        <div className="stage" aria-hidden="true">
          <div className="ring" />
          <div className="haze" />
          <div className="world mars" />
          <div className="world moon" />
        </div>
        <div className="relative z-10 min-h-[92vh] flex flex-col justify-center px-6 md:px-16 max-w-[1400px] mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-extrabold leading-none">
              STILL OUT THERE
            </h1>
            <p className="text-2xl mt-6">
              Some machines stopped working. Their stories didn't.
            </p>
            <p className="opacity-80 mt-2 max-w-xl">
              Explore the NASA machines that helped us understand the Moon and
              Mars.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/#explore" className="btn btn-primary btn-lg">
                Enter the mission →
              </Link>
              <Link href="/?w=Moon#explore" className="btn btn-outline btn-lg">
                Explore the Moon
              </Link>
              <Link href="/?w=Mars#explore" className="btn btn-outline btn-lg">
                Explore Mars
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold">
          What if machines could tell their stories?
        </h2>
        <p className="mt-4 text-xl">
          In class, missions are names, dates and technical terms. But each
          machine had a journey. Here, they tell it themselves.
        </p>
      </section>
      <Explorer />
      <div className="px-4 max-w-5xl mx-auto">
        <Progress />
      </div>
    </>
  );
}

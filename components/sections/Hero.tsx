import Image from "next/image";
import { images, links, project } from "@/lib/content";
import { PixelButton } from "@/components/ui/PixelButton";

const PARTICLES = [
  { left: "8%", dur: "9s", delay: "0s", dy: "-140px", dx: "12px" },
  { left: "18%", dur: "12s", delay: "2s", dy: "-180px", dx: "-8px" },
  { left: "82%", dur: "10s", delay: "1s", dy: "-150px", dx: "-14px" },
  { left: "90%", dur: "13s", delay: "3.5s", dy: "-170px", dx: "10px" },
  { left: "50%", dur: "11s", delay: "4s", dy: "-160px", dx: "6px" },
  { left: "70%", dur: "14s", delay: "0.5s", dy: "-190px", dx: "-6px" },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden scanlines grain">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--lime) 0%, transparent 70%)" }}
      />

      {/* Particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={
              {
                left: p.left,
                bottom: "10%",
                "--dur": p.dur,
                "--delay": p.delay,
                "--dy": p.dy,
                "--dx": p.dx,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-4 lg:pb-24 lg:pt-16">
        <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[440px] lg:max-w-none order-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-8 rounded-full opacity-30 blur-2xl"
            style={{ background: "radial-gradient(circle, var(--lime) 0%, transparent 65%)" }}
          />
          <Image
            src={images.hero}
            alt="Minihood character — the face of the collection"
            width={1024}
            height={1024}
            priority
            className="anim-float relative w-full h-auto drop-shadow-[0_20px_60px_rgba(198,255,61,0.15)]"
          />
        </div>

        <div className="order-2 flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <h1 className="font-pixel leading-[1.15] text-4xl text-lime sm:text-5xl md:text-6xl xl:text-7xl text-balance">
            {project.name}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 font-medium">{project.tagline}</p>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-white/55">
            {project.supplyLabel} original pixel characters, each with their own style, personality, and place in
            the hood.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <PixelButton href="#collection" variant="primary">
              EXPLORE THE MINIS
            </PixelButton>
            <PixelButton href={links.join} variant="outline">
              JOIN THE HOOD
            </PixelButton>
          </div>
        </div>
      </div>
    </section>
  );
}

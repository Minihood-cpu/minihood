import Image from "next/image";
import { images } from "@/lib/content";

const confetti = [
  { left: "10%", dur: "8s", delay: "0s", dy: "-160px", dx: "10px" },
  { left: "25%", dur: "10s", delay: "1.2s", dy: "-190px", dx: "-14px" },
  { left: "40%", dur: "9s", delay: "0.4s", dy: "-170px", dx: "8px" },
  { left: "60%", dur: "11s", delay: "2s", dy: "-200px", dx: "-10px" },
  { left: "75%", dur: "8.5s", delay: "0.8s", dy: "-150px", dx: "12px" },
  { left: "90%", dur: "10.5s", delay: "1.6s", dy: "-180px", dx: "-6px" },
];

const faces = [images.characters.beanie, images.hero, images.characters.pinkhair];

export function SuccessState() {
  return (
    <div className="relative mx-auto flex max-w-md flex-col items-center gap-6 py-6 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={
              {
                left: p.left,
                bottom: "0%",
                "--dur": p.dur,
                "--delay": p.delay,
                "--dy": p.dy,
                "--dx": p.dx,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--lime) 0%, transparent 70%)" }}
      />

      <div className="relative flex -space-x-5">
        {faces.map((src, i) => (
          <div
            key={src}
            className="check-pop pixel-border relative h-16 w-16 overflow-hidden bg-ink sm:h-20 sm:w-20"
            style={{ zIndex: faces.length - i, animationDelay: `${i * 120}ms` }}
          >
            <Image src={src} alt="Minihood character" fill sizes="80px" className="object-cover" />
          </div>
        ))}
      </div>

      <h2 className="relative font-pixel text-3xl text-lime uppercase sm:text-4xl">You&apos;re In.</h2>
      <p className="relative text-sm text-white/60 sm:text-base">Welcome to the Minihood.</p>
    </div>
  );
}

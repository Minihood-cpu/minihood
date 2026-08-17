import Image from "next/image";
import { images, project, stats } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AboutSection() {
  return (
    <section id="about" className="relative border-t border-line bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <SectionHeader eyebrow="About Minihood" title="Welcome to Minihood" align="left" />
            <p className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-white/60">
              {project.descriptionLong}
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((s) => (
                <div key={s.label} className="pixel-border bg-ink px-3 py-5 text-center sm:px-4 sm:py-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-pixel text-lg text-lime sm:text-2xl">{s.value}</dd>
                  <dd className="mt-2 text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-md">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-6 rounded-full opacity-25 blur-2xl"
              style={{ background: "radial-gradient(circle, var(--purple) 0%, transparent 70%)" }}
            />
            <div className="pixel-border relative overflow-hidden bg-ink">
              <Image
                src={images.characters.antenna}
                alt="Minihood character close-up"
                width={1024}
                height={1024}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { images } from "@/lib/content";

const lineup = [
  images.characters.beanie,
  images.characters.pinkhair,
  images.characters.hero,
  images.characters.balaclava,
  images.characters.afro,
  images.characters.antenna,
];

export function BannerSection() {
  return (
    <section className="relative border-t border-line bg-ink py-16 sm:py-20 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent z-10"
      />

      {/* Desktop / tablet: full-bleed lineup */}
      <div className="hidden sm:flex w-full">
        {lineup.map((src, i) => (
          <div
            key={src}
            className="group relative flex-1 aspect-[3/4] overflow-hidden"
            style={{ transform: i % 2 === 1 ? "translateY(18px)" : undefined }}
          >
            <Image
              src={src}
              alt="Minihood character"
              fill
              sizes="(max-width: 1024px) 25vw, 17vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover:bg-transparent" />
          </div>
        ))}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="flex sm:hidden gap-2 overflow-x-auto scroll-row snap-x snap-mandatory px-4">
        {lineup.map((src) => (
          <div key={src} className="relative aspect-[3/4] w-[42vw] shrink-0 overflow-hidden snap-start">
            <Image src={src} alt="Minihood character" fill sizes="42vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

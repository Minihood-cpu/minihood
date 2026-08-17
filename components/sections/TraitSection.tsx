import Image from "next/image";
import { traitCategories } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TraitSection() {
  return (
    <section className="relative border-t border-line bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Variety"
          title="No Two Minis Are The Same"
          subtitle="Different looks. Different vibes. One hood."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {traitCategories.map((cat) => (
            <div key={cat.name} className="pixel-border overflow-hidden bg-ink">
              <div className="flex items-center gap-2.5 border-b-2 border-line bg-ink-elevated px-3 py-3 sm:px-3.5">
                <span
                  className="h-2.5 w-2.5 shrink-0"
                  style={{ background: `var(--${cat.accent})` }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="font-pixel text-[10px] leading-none tracking-widest text-white uppercase sm:text-[11px]">
                    {cat.name}
                  </p>
                  <p className="mt-1.5 truncate text-[9px] leading-none text-white/45 sm:text-[10px]">
                    {cat.blurb}
                  </p>
                </div>
              </div>

              <div className="group p-2 sm:p-2.5">
                <div className="grid grid-cols-2 gap-1.5">
                  {cat.images.map((src, i) => (
                    <div key={i} className="relative aspect-[4/3] overflow-hidden bg-ink-elevated">
                      <Image
                        src={src}
                        alt={`${cat.name} example ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 45vw, 180px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

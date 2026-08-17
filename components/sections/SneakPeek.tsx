import Image from "next/image";
import Link from "next/link";
import { links, sneakPeek } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRightIcon } from "@/components/ui/icons";

function Card({
  item,
  className,
  priority,
}: {
  item: (typeof sneakPeek)[number];
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`group relative shrink-0 overflow-hidden pixel-border bg-ink snap-start ${className ?? ""}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={1024}
        height={1024}
        priority={priority}
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ring-2 ring-lime ring-inset" />
      <span className="absolute bottom-2 left-2 font-pixel text-[10px] text-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-xs">
        #{item.id}
      </span>
    </div>
  );
}

export function SneakPeek() {
  const [first, ...rest] = sneakPeek;

  return (
    <section id="collection" className="relative border-t border-line bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader eyebrow="Sneak Peek" title="A Glimpse Into The Hood" align="left" className="items-center text-center sm:items-start sm:text-left" />
          <Link
            href={links.collection}
            className="font-pixel text-[10px] tracking-widest text-lime hover:text-lime-bright uppercase inline-flex items-center gap-2 shrink-0"
          >
            VIEW COLLECTION
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Desktop / tablet: asymmetric grid */}
        <div className="mt-10 hidden sm:grid grid-cols-4 grid-rows-2 gap-3 aspect-[16/9] md:gap-4">
          <Card item={first} priority className="col-span-2 row-span-2" />
          {rest.map((item) => (
            <Card key={item.id} item={item} className="col-span-1 row-span-1" />
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="mt-8 flex gap-3 overflow-x-auto scroll-row snap-x snap-mandatory sm:hidden -mx-4 px-4 pb-2">
          {sneakPeek.map((item, i) => (
            <Card key={item.id} item={item} priority={i === 0} className="aspect-square w-[62vw]" />
          ))}
        </div>
      </div>
    </section>
  );
}

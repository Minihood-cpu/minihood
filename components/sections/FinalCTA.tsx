import Image from "next/image";
import { images, links } from "@/lib/content";
import { PixelButton } from "@/components/ui/PixelButton";

export function FinalCTA() {
  return (
    <section className="relative border-t border-line bg-ink py-20 sm:py-28 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--lime) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <div className="flex -space-x-5">
          <div className="pixel-border relative h-16 w-16 overflow-hidden bg-ink sm:h-20 sm:w-20">
            <Image src={images.characters.balaclava} alt="Minihood character" fill sizes="80px" className="object-cover" />
          </div>
          <div className="pixel-border relative z-10 h-16 w-16 overflow-hidden bg-ink sm:h-20 sm:w-20">
            <Image src={images.hero} alt="Minihood character" fill sizes="80px" className="object-cover" />
          </div>
          <div className="pixel-border relative h-16 w-16 overflow-hidden bg-ink sm:h-20 sm:w-20">
            <Image src={images.characters.pinkhair} alt="Minihood character" fill sizes="80px" className="object-cover" />
          </div>
        </div>

        <h2 className="font-pixel text-2xl text-white uppercase sm:text-3xl md:text-4xl text-balance">
          Ready To Join The Hood?
        </h2>
        <p className="text-sm text-white/55 sm:text-base">Complete the tasks. Secure your spot.</p>
        <PixelButton href={links.join} variant="primary" className="mt-2">
          JOIN THE HOOD →
        </PixelButton>
      </div>
    </section>
  );
}

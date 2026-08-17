import Image from "next/image";
import { images, links } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PixelButton } from "@/components/ui/PixelButton";
import { XIcon } from "@/components/ui/icons";

const faces = [images.characters.pinkhair, images.characters.beanie, images.characters.afro];

export function CommunitySection() {
  return (
    <section id="community" className="relative border-t border-line bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <SectionHeader
          eyebrow="Community"
          title="The Hood Is Better Together"
          subtitle="Built around characters, creativity, and a community that grows together."
        />

        <div className="mt-10 flex justify-center -space-x-6">
          {faces.map((src, i) => (
            <div
              key={src}
              className="pixel-border relative h-20 w-20 overflow-hidden bg-ink sm:h-24 sm:w-24"
              style={{ zIndex: faces.length - i }}
            >
              <Image src={src} alt="Minihood community member" fill sizes="96px" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <PixelButton href={links.twitter} variant="outline" className="w-full sm:w-auto">
            <XIcon className="h-3.5 w-3.5" />
            FOLLOW ON X
          </PixelButton>
        </div>
      </div>
    </section>
  );
}

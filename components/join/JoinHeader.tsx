import Image from "next/image";
import Link from "next/link";
import { images, project } from "@/lib/content";

export function JoinHeader() {
  return (
    <header className="border-b border-line bg-ink-soft">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <Image src={images.logo} alt={`${project.name} logo`} width={28} height={28} className="h-7 w-7" />
          <span className="font-pixel text-xs text-lime">{project.name}</span>
        </Link>

        <div className="mt-8 text-center">
          <h1 className="font-pixel text-2xl text-white uppercase sm:text-3xl md:text-4xl">Join The Hood</h1>
          <p className="mt-3 text-sm text-white/55 sm:text-base">Complete the steps below to secure your spot.</p>
        </div>
      </div>
    </header>
  );
}

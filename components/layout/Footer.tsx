import Image from "next/image";
import Link from "next/link";
import { images, links, nav, project } from "@/lib/content";
import { XIcon } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
          <div className="flex items-center gap-2.5">
            <Image src={images.logo} alt={`${project.name} logo`} width={28} height={28} className="h-7 w-7" />
            <span className="font-pixel text-sm text-lime">{project.name}</span>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-pixel text-[10px] tracking-widest text-white/60 hover:text-lime uppercase transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <a href={links.twitter} target="_blank" rel="noopener noreferrer" aria-label="Minihood on X" className="text-white/60 hover:text-lime transition-colors">
              <XIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-line/60 text-center sm:text-left">
          <p className="text-[11px] tracking-wide text-white/35 uppercase">
            © {year} {project.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

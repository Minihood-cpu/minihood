"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { images, links, nav, project } from "@/lib/content";
import { PixelButton } from "@/components/ui/PixelButton";
import { XIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "bg-ink/95 border-line backdrop-blur" : "bg-ink/70 border-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
        <Link href="/#home" className="flex items-center gap-2.5 shrink-0">
          <Image src={images.logo} alt={`${project.name} logo`} width={32} height={32} className="h-8 w-8" priority />
          <span className="font-pixel text-sm sm:text-base text-lime tracking-wide">{project.name}</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-pixel text-[10px] tracking-widest text-white/70 hover:text-lime transition-colors uppercase"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Minihood on X"
            className="text-white/60 hover:text-lime transition-colors"
          >
            <XIcon className="h-5 w-5" />
          </a>
          <PixelButton href={links.join} variant="primary" className="!px-4 !py-3 text-[10px]">
            JOIN THE HOOD
          </PixelButton>
        </div>

        <button
          className="lg:hidden text-white/80 p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-line bg-ink px-4 pb-6 pt-2">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line/60">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-pixel text-xs tracking-widest text-white/80 hover:text-lime transition-colors uppercase block py-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-5 pt-5">
            <a href={links.twitter} target="_blank" rel="noopener noreferrer" aria-label="Minihood on X" className="text-white/60 hover:text-lime">
              <XIcon className="h-5 w-5" />
            </a>
          </div>
          <PixelButton href={links.join} variant="primary" className="w-full mt-5">
            JOIN THE HOOD
          </PixelButton>
        </div>
      )}
    </header>
  );
}

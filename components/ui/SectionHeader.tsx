import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, align = "center", className }: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div className={cn("flex flex-col gap-4", isCenter ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow && (
        <span className="font-pixel text-[10px] tracking-[0.2em] text-lime uppercase">{eyebrow}</span>
      )}
      <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl leading-snug uppercase text-white text-balance">
        {title}
      </h2>
      <div className={cn("section-ornament", isCenter ? "" : "ml-0")} />
      {subtitle && (
        <p className="max-w-2xl text-sm sm:text-base text-white/60 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

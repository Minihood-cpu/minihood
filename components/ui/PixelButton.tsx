import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-lime text-ink border-2 border-lime hover:bg-lime-bright",
  outline: "bg-transparent text-lime border-2 border-lime hover:bg-lime/10",
  ghost: "bg-transparent text-white border-2 border-line hover:border-lime hover:text-lime",
};

const base =
  "pixel-btn font-pixel text-[11px] sm:text-xs tracking-wide uppercase inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 select-none";

export function PixelButton({
  variant = "primary",
  className,
  children,
  href,
  ...rest
}: BaseProps & { href?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variantClasses[variant], className);

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

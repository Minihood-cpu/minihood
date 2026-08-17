import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pixel = localFont({
  src: "./fonts/press-start-2p.woff2",
  variable: "--font-pixel",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minihood.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Minihood — Small Hood. Big Energy.",
  description:
    "Minihood is a collection of 2,999 original pixel characters built for the Robinhood ecosystem.",
  openGraph: {
    title: "Minihood — Small Hood. Big Energy.",
    description:
      "Minihood is a collection of 2,999 original pixel characters built for the Robinhood ecosystem.",
    url: siteUrl,
    siteName: "Minihood",
    images: [{ url: "/images/characters/hero.png", width: 1024, height: 1024 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minihood — Small Hood. Big Energy.",
    description:
      "Minihood is a collection of 2,999 original pixel characters built for the Robinhood ecosystem.",
    images: ["/images/characters/hero.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pixel.variable}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

// Not indexable, and nothing in the public UI links here.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Admin — Minihood",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}

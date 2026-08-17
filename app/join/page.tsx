import type { Metadata } from "next";
import { JoinFlow } from "@/components/join/JoinFlow";

export const metadata: Metadata = {
  title: "Join The Hood — Minihood",
  description: "Complete the puzzle and tasks, then submit your wallet to secure your spot in Minihood.",
};

export default function JoinPage() {
  return <JoinFlow />;
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SneakPeek } from "@/components/sections/SneakPeek";
import { TraitSection } from "@/components/sections/TraitSection";
import { BannerSection } from "@/components/sections/BannerSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <SneakPeek />
        <TraitSection />
        <BannerSection />
        <CommunitySection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

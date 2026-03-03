import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { AIPoweredSection } from "@/components/home/AIPoweredSection";
import { ClassicModeSection } from "@/components/home/ClassicModeSection";
import { SoloPlaySection } from "@/components/home/SoloPlaySection";
import { RemoteControlSection } from "@/components/home/RemoteControlSection";
import { MysteryScriptSection } from "@/components/home/MysteryScriptSection";
import { ModeFunctionSection } from "@/components/home/ModeFunctionSection";
import { DownloadCTA } from "@/components/layout/DownloadCTA";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  heroSlides,
  aiPoweredSection,
  classicModeSection,
  soloPlaySection,
  remoteControlSection,
  mysteryScriptSection,
  mysteryCards,
  modeItems,
} from "@/config/home";

export const metadata: Metadata = {
  title: "Aura — AI-Powered Intelligent Sensory Technology",
  description:
    "Discover Aura, the AI-powered intelligent sensory technology that redefines intimacy. Experience AI customization, multimodal interactions, and innovative modes.",
  openGraph: {
    title: "Aura — AI-Powered Intelligent Sensory Technology",
    description:
      "Discover Aura, the AI-powered intelligent sensory technology that redefines intimacy.",
    type: "website",
    images: ["/images/01Home/Aura_index_banner01a.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura — AI-Powered Intelligent Sensory Technology",
    description:
      "Discover Aura, the AI-powered intelligent sensory technology that redefines intimacy.",
    images: ["/images/01Home/Aura_index_banner01a.webp"],
  },
};

export default function HomePage() {
  return (
    <main>
      {/* US1: Hero — First screen brand impact */}
      <HeroSection slides={heroSlides} />

      {/* US2: AI-Powered — Feature highlights */}
      <ScrollReveal className="relative z-[70]">
        <AIPoweredSection data={aiPoweredSection} />
      </ScrollReveal>

      {/* US3: Classic Mode */}
      <ScrollReveal delay={0.1} className="relative z-[60]">
        <ClassicModeSection data={classicModeSection} />
      </ScrollReveal>

      {/* US3: Solo Play */}
      <ScrollReveal delay={0.1} className="relative z-[50]">
        <SoloPlaySection data={soloPlaySection} />
      </ScrollReveal>

      {/* US3: Remote Control */}
      <ScrollReveal delay={0.1} className="relative z-[40]">
        <RemoteControlSection data={remoteControlSection} />
      </ScrollReveal>

      {/* US4: Mystery Script Cards */}
      <ScrollReveal delay={0.1} className="relative z-[30]">
        <MysteryScriptSection
          title={mysteryScriptSection.title}
          description={mysteryScriptSection.description}
          cards={mysteryCards}
        />
      </ScrollReveal>

      {/* US5: Mode Function Grid */}
      <ScrollReveal delay={0.1} className="relative z-[20]">
        <ModeFunctionSection items={modeItems} />
      </ScrollReveal>

      {/* Download CTA (from global modules) */}
      <ScrollReveal delay={0.1} className="relative z-[10]">
        <DownloadCTA />
      </ScrollReveal>
    </main>
  );
}

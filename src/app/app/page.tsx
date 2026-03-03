import type { Metadata } from "next";
import { appPageData } from "@/config/app";
import { AppHeroSection } from "@/components/app/AppHeroSection";
import { AppFeatureList } from "@/components/app/AppFeatureList";
import { AppBottomCTA } from "@/components/app/AppBottomCTA";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Aura APP — Download AI-Powered Companion App",
  description:
    "Download the Aura APP to experience AI-powered intelligent sensory technology. Customize your AI companion, control smart devices, and explore immersive interactive content.",
  openGraph: {
    title: "Aura APP — Download AI-Powered Companion App",
    description:
      "Download the Aura APP to experience AI-powered intelligent sensory technology.",
    type: "website",
    images: ["/images/02App/Aura_APP_banner01.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura APP — Download AI-Powered Companion App",
    description:
      "Download the Aura APP to experience AI-powered intelligent sensory technology.",
    images: ["/images/02App/Aura_APP_banner01.png"],
  },
};

export default function AppPage() {
  return (
    <main>
      <ScrollReveal direction="up">
        <AppHeroSection data={appPageData.hero} />
      </ScrollReveal>
      <AppFeatureList
        features={appPageData.features}
        sectionTitle={appPageData.sectionTitle}
      />
      <ScrollReveal direction="up">
        <AppBottomCTA data={appPageData.bottomCTA} />
      </ScrollReveal>
    </main>
  );
}

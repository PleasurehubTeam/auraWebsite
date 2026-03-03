import type { Metadata } from "next";
import { aboutPageData } from "@/config/about";
import { AboutHeroBanner } from "@/components/about/AboutHeroBanner";
import { BrandMessageSection } from "@/components/about/BrandMessageSection";
import { StatsSection } from "@/components/about/StatsSection";
import { AboutGallerySection } from "@/components/about/AboutGallerySection";
import { JoinCommunityCTA } from "@/components/about/JoinCommunityCTA";
import { GradientBackground } from "@/components/ui/GradientBackground";

export const metadata: Metadata = {
  title: "About — Aura Brand Story",
  description:
    "Discover the Aura brand story. Connect, share, and explore in an open and free space. Join a global community across 12 countries.",
  openGraph: {
    title: "About — Aura Brand Story",
    description:
      "Discover the Aura brand story. Connect, share, and explore in an open and free space.",
    images: [{ url: aboutPageData.hero.backgroundImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Aura Brand Story",
    description:
      "Discover the Aura brand story. Connect, share, and explore in an open and free space.",
  },
};

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Banner — full width, outside content container */}
      <AboutHeroBanner data={aboutPageData.hero} />

      {/* Brand Message */}
      <BrandMessageSection data={aboutPageData.brandMessage} />

      {/* Stats Section with background orb */}
      <div className="relative">
        <GradientBackground
          className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-[800px]"
          gradient={[
            "radial-gradient(ellipse 55% 55% at 55% 20%, #e876a8 0%, #ec8fb8 10%, #f2a5c8 20%, #f5c0d8 32%, #fce8ef 48%, #ffffff 65%)",
            "radial-gradient(ellipse 40% 40% at 75% 25%, rgba(236, 160, 200, 0.7) 0%, rgba(248, 180, 210, 0.4) 35%, transparent 65%)",
            "radial-gradient(ellipse 25% 25% at 80% 15%, #f8d5c8 0%, #fceaf0 40%, transparent 70%)",
          ]}
          rotate={[0, -3, 0]}
          scale={[1, 1.03, 1]}
        />
        <StatsSection stats={aboutPageData.stats} />
      </div>

      {/* Gallery with Category Tabs */}
      <AboutGallerySection
        categories={aboutPageData.galleryCategories}
        photos={aboutPageData.galleryPhotos}
        emptyMessage={aboutPageData.emptyState.message}
      />

      {/* Join Community CTA */}
      <JoinCommunityCTA data={aboutPageData.cta} />
    </main>
  );
}

import type { Metadata } from "next";
import { explorePageData } from "@/config/explore";
import { ExploreHeroBanner } from "@/components/explore/ExploreHeroBanner";
import { ExploreDescriptionSection } from "@/components/explore/ExploreDescriptionSection";
import { ExploreGallerySection } from "@/components/explore/ExploreGallerySection";

export const metadata: Metadata = {
  title: "Explore — Aura Community Story",
  description:
    "Explore the Aura community. Connect, share, and discover authentic stories in a space free from judgment.",
  openGraph: {
    title: "Explore — Aura Community Story",
    description:
      "Explore the Aura community. Connect, share, and discover authentic stories in a space free from judgment.",
    images: [{ url: explorePageData.hero.backgroundImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore — Aura Community Story",
    description:
      "Explore the Aura community. Connect, share, and discover authentic stories.",
  },
};

export default function ExplorePage() {
  return (
    <main className="overflow-hidden">
      <ExploreHeroBanner data={explorePageData.hero} />
      <ExploreDescriptionSection
        description={explorePageData.hero.description}
      />
      <ExploreGallerySection
        photos={explorePageData.galleryPhotos}
        emptyMessage={explorePageData.emptyState.message}
      />
    </main>
  );
}

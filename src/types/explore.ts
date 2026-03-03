import type { MasonryPhoto } from "./gallery";

// ─── Explore Hero ────────────────────────────────────────────
export interface ExploreHeroData {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  backgroundAlt: string;
  fallbackColor: string;
}

// ─── Explore Gallery Photo ───────────────────────────────────
export interface ExploreGalleryPhoto extends MasonryPhoto {
  order?: number;
}

// ─── Explore Page Data (Top-Level Aggregate) ─────────────────
export interface ExplorePageData {
  hero: ExploreHeroData;
  galleryPhotos: ExploreGalleryPhoto[];
  emptyState: { message: string };
}

// ─── About Hero ───────────────────────────────────────────────
export interface AboutHeroData {
  title: string;
  slogan: string;
  backgroundImage: string;
  backgroundAlt: string;
  fallbackColor: string;
}

// ─── Brand Message ────────────────────────────────────────────
export interface BrandMessage {
  text: string;
}

// ─── Stats ────────────────────────────────────────────────────
export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  label: string;
}

// ─── Gallery ──────────────────────────────────────────────────
import type { MasonryPhoto } from "./gallery";

export interface AboutGalleryCategory {
  id: string;
  label: string;
  order: number;
}

export interface GalleryPhoto extends MasonryPhoto {
  category: string;
}

// ─── Community CTA ────────────────────────────────────────────
export interface CommunityCTAData {
  heading: string;
  description: string;
}

// ─── Page Data (Top-Level Aggregate) ──────────────────────────
export interface AboutPageData {
  hero: AboutHeroData;
  brandMessage: BrandMessage;
  stats: StatItem[];
  galleryCategories: AboutGalleryCategory[];
  galleryPhotos: GalleryPhoto[];
  cta: CommunityCTAData;
  emptyState: { message: string };
}

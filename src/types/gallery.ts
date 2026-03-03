// ─── Shared Gallery Base Interface ────────────────────────────
// Used by both About and Explore gallery components

export interface MasonryPhoto {
  id: string;
  title: string;
  featuredImage: string;
  imageAlt: string;
  cardSize: "large" | "small";
}

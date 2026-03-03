// ─── News Category ─────────────────────────────────────────────
export type NewsCategory = "breaking-news" | "event" | "about-aura";

export interface NewsCategoryItem {
  id: NewsCategory;
  label: string;
  order: number;
}

// ─── News Article ──────────────────────────────────────────────
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: NewsCategory;
  featuredImage: string;
  imageAlt: string;
  publishDate: string;
  summary: string;
  content: string;
  cardSize: "large" | "small";
}

// ─── Page Configuration ────────────────────────────────────────
export interface NewsHeroData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundAlt: string;
}

export interface NewsEmptyStateData {
  illustration: string;
  message: string;
  actionLabel: string;
}

export interface NewsPageData {
  hero: NewsHeroData;
  categories: NewsCategoryItem[];
  emptyState: NewsEmptyStateData;
}

// ─── Hook Return Types ─────────────────────────────────────────
export interface UseNewsArticlesReturn {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

export interface UseNewsArticleReturn {
  article: NewsArticle | null;
  loading: boolean;
  error: string | null;
}

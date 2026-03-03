"use client";

import { useState, useEffect } from "react";
import type {
  NewsArticle,
  NewsCategory,
  UseNewsArticlesReturn,
} from "@/types/news";
import { getNewsArticlesByCategory, newsArticles } from "@/config/news";

export function useNewsArticles(
  category?: NewsCategory,
): UseNewsArticlesReturn {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allArticles = category
      ? getNewsArticlesByCategory(category)
      : newsArticles;
    setArticles(allArticles);
    setLoading(false);
  }, [category]);

  return { articles, loading, error: null, hasMore: false, loadMore: () => {} };
}

"use client";

import { useState, useEffect, useRef } from "react";
import type { UseNewsArticleReturn } from "@/types/news";
import { getNewsArticleBySlug } from "@/config/news";

export function useNewsArticle(slug: string): UseNewsArticleReturn {
  const [article, setArticle] = useState<UseNewsArticleReturn["article"]>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    setLoading(true);
    setArticle(null);
    setError(null);

    timerRef.current = setTimeout(() => {
      try {
        const found = getNewsArticleBySlug(slug);
        setArticle(found ?? null);
        setError(null);
      } catch {
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [slug]);

  return { article, loading, error };
}

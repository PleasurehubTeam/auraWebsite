"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NewsArticle } from "@/types/news";
import { NewsCard } from "@/components/news/NewsCard";

interface NewsGridProps {
  articles: NewsArticle[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function NewsGrid({
  articles,
  loading,
  hasMore,
  onLoadMore,
}: NewsGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading, onLoadMore]);

  return (
    <section aria-label="News articles">
      <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={article.cardSize === "large" ? "row-span-2" : ""}
            >
              <NewsCard article={article} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center justify-center gap-2 py-8">
          <div className="h-2 w-2 animate-pulse rounded-full bg-brand-pink" />
          <div className="h-2 w-2 animate-pulse rounded-full bg-brand-pink [animation-delay:150ms]" />
          <div className="h-2 w-2 animate-pulse rounded-full bg-brand-pink [animation-delay:300ms]" />
        </div>
      )}

      {/* Intersection Observer sentinel */}
      <div ref={sentinelRef} className="h-4" />
    </section>
  );
}

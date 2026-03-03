"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { NewsCategory, NewsPageData, NewsArticle } from "@/types/news";
import { useNewsArticles } from "@/hooks/useNewsArticles";
import { NewsCategoryTabs } from "@/components/news/NewsCategoryTabs";
import { NewsEmptyState } from "@/components/news/NewsEmptyState";
import { MobileNewsList } from "@/components/news/MobileNewsList";

const PLACEHOLDER_IMAGE = "/images/news/news-placeholder.webp";

/** Responsive column count: 1 (mobile) / 2 (md) / 4 (lg) */
function useColumnCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setCount(4);
      else if (window.matchMedia("(min-width: 768px)").matches) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

/** Distribute items into columns in row-first order (1>2>3>4, 5>6>7>8, ...) */
function distributeToColumns<T>(items: T[], columnCount: number): T[][] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });
  return columns;
}

function WaterfallCard({
  article,
  index,
}: {
  article: NewsArticle;
  index: number;
}) {
  const [imgSrc, setImgSrc] = useState(article.featuredImage);

  return (
    <motion.article
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/news/${article.slug}`} className="group block">
        <Image
          src={imgSrc}
          alt={article.imageAlt}
          width={800}
          height={600}
          className="h-auto w-full rounded-2xl object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          loading="lazy"
          onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
        />

        {/* Title */}
        <div className="py-2">
          <h3 className="truncate text-sm font-medium text-black transition-colors duration-300 group-hover:text-brand-pink lg:text-base">
            {article.title}
          </h3>
        </div>
      </Link>
    </motion.article>
  );
}

interface NewsListingContentProps {
  pageData: NewsPageData;
}

export function NewsListingContent({ pageData }: NewsListingContentProps) {
  const [activeCategory, setActiveCategory] =
    useState<NewsCategory>("breaking-news");

  const { articles, loading } = useNewsArticles(activeCategory);

  const columnCount = useColumnCount();

  const showEmpty = articles.length === 0 && !loading;

  const columns = useMemo(
    () => (columnCount ? distributeToColumns(articles, columnCount) : []),
    [articles, columnCount],
  );

  return (
    <div>
      <NewsCategoryTabs
        categories={pageData.categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="min-h-[100vh]"
        >
          {showEmpty ? (
            <NewsEmptyState
              illustration={pageData.emptyState.illustration}
              message={pageData.emptyState.message}
              actionLabel={pageData.emptyState.actionLabel}
              onAction={() => setActiveCategory("breaking-news")}
            />
          ) : columnCount === null ? null : columnCount === 1 ? (
            /* Mobile: list mode */
            <MobileNewsList articles={articles} />
          ) : (
            /* Desktop: waterfall mode */
            <div className="flex w-full gap-x-4 overflow-hidden">
              {columns.map((col, colIndex) => (
                <div key={colIndex} className="flex min-w-0 flex-1 flex-col">
                  {col.map((article, rowIndex) => (
                    <WaterfallCard
                      key={article.id}
                      article={article}
                      index={colIndex + rowIndex * columnCount}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

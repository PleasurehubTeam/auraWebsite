"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { NewsArticle } from "@/types/news";

const PLACEHOLDER_IMAGE = "/images/news/news-placeholder.webp";
const MOBILE_PAGE_SIZE = 10;

function MobileNewsItem({
  article,
  index,
}: {
  article: NewsArticle;
  index: number;
}) {
  const [imgSrc, setImgSrc] = useState(article.featuredImage);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link href={`/news/${article.slug}`} className="group flex gap-3 py-4">
        {/* Left: Image */}
        <div className="h-[90px] w-[120px] flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={imgSrc}
            alt={article.imageAlt}
            width={240}
            height={180}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="120px"
            loading="lazy"
            onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
          />
        </div>

        {/* Right: Title & Date */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-black transition-colors duration-300 group-hover:text-brand-pink">
            {article.title}
          </h3>
          <span className="mt-1 text-xs text-gray-400">
            {article.publishDate}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

interface MobileNewsListProps {
  articles: NewsArticle[];
}

export function MobileNewsList({ articles }: MobileNewsListProps) {
  const [visibleCount, setVisibleCount] = useState(MOBILE_PAGE_SIZE);

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  const loadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + MOBILE_PAGE_SIZE, articles.length),
    );
  };

  return (
    <div>
      {/* Divider-separated list */}
      <div className="divide-y divide-gray-100">
        {visibleArticles.map((article, index) => (
          <MobileNewsItem key={article.id} article={article} index={index} />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pb-2 pt-6">
          <button
            onClick={loadMore}
            className="rounded-full bg-gray-50 px-6 py-2.5 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-black active:scale-95"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

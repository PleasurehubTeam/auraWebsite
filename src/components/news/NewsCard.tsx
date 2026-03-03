"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/types/news";

const PLACEHOLDER_IMAGE = "/images/03News/news-placeholder.webp";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export function NewsCard({ article }: NewsCardProps) {
  const [imgSrc, setImgSrc] = useState(article.featuredImage);
  return (
    <article
      className={`relative overflow-hidden rounded-2xl ${
        article.cardSize === "large"
          ? "row-span-2 min-h-[400px]"
          : "min-h-[200px]"
      } h-[250px] md:h-auto`}
    >
      <Link
        href={`/news/${article.slug}`}
        className="group relative block h-full w-full"
      >
        <Image
          src={imgSrc}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 transition-transform duration-300 group-hover:translate-y-[-4px]">
          <h3 className="truncate text-sm font-medium text-white lg:text-base">
            {article.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}

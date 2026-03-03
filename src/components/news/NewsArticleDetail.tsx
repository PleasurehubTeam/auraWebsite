"use client";

import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/types/news";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ShareButton } from "@/components/news/ShareButton";

interface NewsArticleDetailProps {
  article: NewsArticle;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function categoryLabel(category: string): string {
  const labels: Record<string, string> = {
    "breaking-news": "Breaking news",
    event: "Event",
    "about-aura": "About Aura",
  };
  return labels[category] ?? category;
}

export function NewsArticleDetail({ article }: NewsArticleDetailProps) {
  return (
    <article>
      {/* Hero area: image + meta */}
      <ScrollReveal>
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-10">
          {/* Featured image - 3/5 */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={article.featuredImage}
                alt={article.imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>

          {/* Meta info - 2/5 */}
          <div className="flex flex-col justify-center lg:col-span-2">
            <h1 className="mb-4 text-3xl font-bold lg:text-4xl">
              {article.title}
            </h1>
            <p className="mb-2 text-gray-500">
              {formatDate(article.publishDate)}
            </p>
            <span className="inline-block self-start rounded-full bg-brand-pink/10 px-3 py-1 text-sm text-brand-pink">
              {categoryLabel(article.category)}
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* Article body */}
      <ScrollReveal>
        <div
          className="prose prose-lg mx-auto max-w-prose"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </ScrollReveal>

      {/* Footer: share + back */}
      <ScrollReveal>
        <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-8">
          <ShareButton />
          <Link
            href="/news"
            className="font-medium text-brand-pink hover:underline"
          >
            &larr; Back to News Center
          </Link>
        </div>
      </ScrollReveal>
    </article>
  );
}

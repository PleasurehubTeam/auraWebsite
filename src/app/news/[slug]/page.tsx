import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllNewsArticles, getNewsArticleBySlug } from "@/config/news";
import { NewsArticleDetail } from "@/components/news/NewsArticleDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllNewsArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found | Aura" };
  }

  return {
    title: `${article.title} | Aura News`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | Aura News`,
      description: article.summary,
      type: "article",
      publishedTime: article.publishDate,
      images: [article.featuredImage],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <NewsArticleDetail article={article} />
    </main>
  );
}

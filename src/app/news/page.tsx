import type { Metadata } from "next";
import { newsPageData } from "@/config/news";
import { NewsHeroBanner } from "@/components/news/NewsHeroBanner";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { NewsListingContent } from "@/components/news/NewsListingContent";

export const metadata: Metadata = {
  title: "News Center | Aura",
  description: "Stay up-to-date with Aura's latest news, events, and stories.",
  openGraph: {
    title: "News Center | Aura",
    description:
      "Stay up-to-date with Aura's latest news, events, and stories.",
    type: "website",
  },
};

export default function NewsPage() {
  return (
    <main>
      <NewsHeroBanner {...newsPageData.hero} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <ScrollReveal>
          <NewsListingContent pageData={newsPageData} />
        </ScrollReveal>
      </div>
    </main>
  );
}

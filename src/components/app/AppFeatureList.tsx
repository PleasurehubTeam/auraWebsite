import type { FeatureSectionData } from "@/types/app";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AppFeatureSection } from "./AppFeatureSection";

interface AppFeatureListProps {
  features: FeatureSectionData[];
  sectionTitle: string;
}

export function AppFeatureList({
  features,
  sectionTitle,
}: AppFeatureListProps) {
  return (
    <section className="mt-8 bg-white sm:mt-0">
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 lg:pt-24">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            {sectionTitle}
          </h2>
        </ScrollReveal>
      </div>

      {features.map((feature, index) => (
        <ScrollReveal
          key={feature.id}
          direction={index % 2 === 0 ? "left" : "right"}
          delay={0.1}
        >
          <AppFeatureSection feature={feature} index={index} />
        </ScrollReveal>
      ))}
    </section>
  );
}

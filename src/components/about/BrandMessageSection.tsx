import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { BrandMessage } from "@/types/about";

interface BrandMessageSectionProps {
  data: BrandMessage;
}

export function BrandMessageSection({ data }: BrandMessageSectionProps) {
  return (
    <section className="relative z-10 bg-white py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <p className="font-montserrat mx-auto max-w-3xl whitespace-pre-line text-center text-xl font-bold leading-relaxed text-gray-900 md:text-2xl lg:text-3xl">
            {data.text}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

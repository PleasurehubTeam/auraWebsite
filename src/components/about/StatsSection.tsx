import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FlipCounter } from "@/components/about/FlipCounter";
import type { StatItem } from "@/types/about";

interface StatsSectionProps {
  stats: StatItem[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="relative z-10 mb-16 py-10 md:mb-32 md:py-16 md:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-24 lg:gap-32">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <FlipCounter value={stat.value} suffix={stat.suffix} />
                <p className="font-montserrat mt-2 text-base font-bold text-black md:text-xl lg:text-lg">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ExploreHeroData } from "@/types/explore";

interface ExploreHeroBannerProps {
  data: ExploreHeroData;
}

export function ExploreHeroBanner({ data }: ExploreHeroBannerProps) {
  return (
    <section
      className="relative z-10 h-auto w-full overflow-hidden sm:min-h-[80vh]"
      style={{ backgroundColor: data.fallbackColor }}
    >
      {/* 背景图片 - 移动端自适应高度完整展示，sm+ 填充裁切 */}
      <Image
        src={data.backgroundImage}
        alt={data.backgroundAlt}
        fill
        priority
        className="hidden object-cover sm:block"
        sizes="100vw"
      />
      <Image
        src={data.backgroundImage}
        alt={data.backgroundAlt}
        width={1200}
        height={800}
        priority
        className="block h-auto w-full object-contain sm:hidden"
        sizes="100vw"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Content */}
      <div className="absolute bottom-4 right-4 z-20 px-4 text-right sm:bottom-auto sm:right-[250px] sm:top-1/2 sm:-translate-y-1/2">
        <ScrollReveal direction="up">
          <h1 className="font-montserrat mb-4 text-xl font-bold text-white sm:whitespace-nowrap md:text-5xl lg:text-6xl">
            {data.title}
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <p className="font-montserrat letter-spacing-3 mb-6 text-right text-lg text-white/80 sm:whitespace-nowrap md:text-xl lg:text-3xl">
            {data.subtitle}
          </p>
        </ScrollReveal>
        {/* <ScrollReveal direction="up" delay={0.2}>
          <p className="font-montserrat text-sm md:text-base lg:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </ScrollReveal> */}
      </div>
    </section>
  );
}

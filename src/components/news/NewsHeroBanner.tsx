"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { NewsHeroData } from "@/types/news";

interface NewsHeroBannerProps extends NewsHeroData {}

export function NewsHeroBanner({
  title,
  subtitle,
  backgroundImage,
  backgroundAlt,
}: NewsHeroBannerProps) {
  return (
    <section className="relative h-auto w-full overflow-hidden sm:h-[60vh] sm:rounded-b-3xl lg:h-[70vh]">
      {/* 背景图片 - 移动端自适应高度完整展示，sm+ 填充裁切 */}
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        fill
        className="hidden object-cover sm:block"
        priority
        sizes="100vw"
      />
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        width={1200}
        height={800}
        className="block h-auto w-full object-contain sm:hidden"
        priority
        sizes="100vw"
      />

      {/* 暗色渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* 文字内容 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-16">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl">
            <h1 className="text-2xl font-bold text-white sm:text-4xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80 sm:mt-4 sm:text-lg lg:text-xl">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

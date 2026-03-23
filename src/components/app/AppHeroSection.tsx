"use client";

import type { AppHeroData } from "@/types/app";
import { downloadConfig } from "@/config/download";
import { AndroidBadgeLink } from "@/components/icons/StoreBadges";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { MockupCarousel } from "./MockupCarousel";

interface AppHeroSectionProps {
  data: AppHeroData;
}

export function AppHeroSection({ data }: AppHeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <GradientBackground />
      {/* 轮播区域 - 移动端缩小上下间距 */}
      <div className="relative z-10 pb-6 pt-12 sm:pb-6 sm:pt-24">
        <MockupCarousel mockups={data.mockups} />
      </div>

      {/* 标题 + 下载按钮 */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          {data.title}
        </h1>

        <div className="mt-8 flex justify-center">
          <AndroidBadgeLink
            href={downloadConfig.androidApkUrl}
            className="h-[40px] sm:h-[55px] lg:h-[70px]"
          />
        </div>
      </div>
    </section>
  );
}

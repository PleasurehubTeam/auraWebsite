"use client";

import Image from "next/image";
import { downloadConfig } from "@/config/download";
import {
  AndroidBadgeLink,
  GooglePlayBadgeLink,
} from "@/components/icons/StoreBadges";
import { GradientBackground } from "@/components/ui/GradientBackground";

export function DownloadCTA() {
  return (
    <section
      className="px-4 py-20 sm:px-6 lg:px-8"
      aria-label="Download Aura app"
    >
      {/* 内容区域 - GradientBackground 包裹 */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-[#ebe9e8]">
        <GradientBackground
          className="absolute z-0"
          inset="-25% -80%"
          rotate={[0, -15, 0]}
          scale={[1.5, 1.6, 1.5]}
        />
        <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-12">
          {/* 标题 */}
          <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl">
            {downloadConfig.heading}
          </h2>

          {/* 描述 */}
          <p className="mb-6 max-w-2xl text-base text-black sm:text-lg">
            {downloadConfig.description}
          </p>

          {/* 品牌图标 + 名称 */}
          <div className="mb-8 flex flex-col items-center gap-2">
            <Image
              src="/images/home/aura-index-icon.png"
              alt="Aura"
              width={120}
              height={120}
              className="h-auto w-[120px]"
            />
            <span className="text-xl text-black">Aura</span>
          </div>

          {/* 商店下载按钮 */}
          <div className="flex gap-3">
            <AndroidBadgeLink
              href={downloadConfig.androidApkUrl}
              className="h-[40px] sm:h-[55px] lg:h-[70px]"
            />
            <GooglePlayBadgeLink
              href={downloadConfig.googlePlayUrl}
              className="h-[40px] sm:h-[55px] lg:h-[70px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

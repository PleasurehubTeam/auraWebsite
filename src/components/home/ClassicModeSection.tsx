"use client";

import Image from "next/image";
import type { ClassicModeData } from "@/types/home";

interface ClassicModeSectionProps {
  data: ClassicModeData;
}

export function ClassicModeSection({ data }: ClassicModeSectionProps) {
  return (
    <section aria-label="Classic Mode mb-8">
      {/* 标题区域 - 白底黑字 */}
      <div className="bg-white px-4 pb-12 pt-12 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-3 text-3xl font-bold text-black sm:text-4xl">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg text-gray-600">{data.subtitle}</p>
          )}
        </div>
      </div>

      {/* 内容区域 - 黑底 */}
      <div className="relative overflow-visible bg-black px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          {/* 应用截图 - 绝对定位，不影响布局高度 */}
          <div className="absolute -bottom-40 left-1/2 hidden w-full max-w-[320px] -translate-x-1/2 overflow-hidden rounded-3xl lg:left-0 lg:block lg:translate-x-0">
            <Image
              src={data.appScreenshot}
              alt="Aura Classic Mode interface"
              width={320}
              height={569}
              className="h-auto w-full"
            />
          </div>

          {/* 功能图片 - 右侧内容 */}
          <div className="lg:ml-[360px]">
            {/* 功能图片 */}
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/01Home/Aura_index_icon_01.png"
                alt="Aura features"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* 移动端应用截图 */}
          <div className="mt-12 flex justify-center lg:hidden">
            <div className="w-full max-w-[280px] overflow-hidden rounded-3xl">
              <Image
                src={data.appScreenshot}
                alt="Aura Classic Mode interface"
                width={320}
                height={569}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

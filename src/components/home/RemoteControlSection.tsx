"use client";

import Image from "next/image";
import type { RemoteControlData } from "@/types/home";

interface RemoteControlSectionProps {
  data: RemoteControlData;
}

export function RemoteControlSection({ data }: RemoteControlSectionProps) {
  return (
    <section aria-label="Remote Control Mode">
      {/* 文字区域 */}
      <div className="bg-white px-4 pb-12 pt-12 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl">
            {data.title}
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-black sm:text-lg">
            {data.description}
          </p>
        </div>
      </div>

      {/* 图片区域 - 背景拉满，图片限宽 */}
      <div className="flex justify-center bg-[#efefef]">
        <div className="relative aspect-[2/1] w-full max-w-7xl overflow-hidden">
          <Image
            src={data.image}
            alt="Remote Control - connect with your partner"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>
    </section>
  );
}

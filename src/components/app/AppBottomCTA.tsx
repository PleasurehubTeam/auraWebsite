"use client";

import Image from "next/image";
import type { AppBottomCTAData } from "@/types/app";
import { downloadConfig } from "@/config/download";
import {
  AndroidBadgeLink,
  AppStoreBadgeLink,
  GooglePlayBadgeLink,
} from "@/components/icons/StoreBadges";
import { GradientBackground } from "@/components/ui/GradientBackground";

interface AppBottomCTAProps {
  data: AppBottomCTAData;
}

export function AppBottomCTA({ data }: AppBottomCTAProps) {
  return (
    <section className="relative mt-20 overflow-hidden py-20 lg:py-32">
      <GradientBackground
        className="absolute z-0"
        inset="-25% -80%"
        rotate={[0, -15, 0]}
        scale={[1.5, 1.6, 1.5]}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Image
          src="/images/home/aura-index-icon.png"
          alt="Aura"
          width={80}
          height={80}
          className="mx-auto h-16 w-16 sm:h-20 sm:w-20"
        />

        <h2 className="mt-6 text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
          {data.heading}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base text-black sm:text-lg">
          {data.description}
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <AppStoreBadgeLink
            href={downloadConfig.appStoreUrl}
            className="h-[40px] sm:h-[55px] lg:h-[70px]"
          />
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
    </section>
  );
}

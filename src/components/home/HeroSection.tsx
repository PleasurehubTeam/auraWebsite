"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { HeroSlide } from "@/types/home";
import { downloadConfig } from "@/config/download";
import {
  AndroidBadgeLink,
  AppStoreBadgeLink,
  GooglePlayBadgeLink,
} from "@/components/icons/StoreBadges";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { useImagePreload } from "@/hooks/useImagePreload";

interface HeroSectionProps {
  slides: HeroSlide[];
}

const INTERVAL_MS = 10000;

export function HeroSection({ slides }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  // Preload all slide images so carousel transitions are instant
  const allSlideImages = useMemo(
    () => slides.flatMap((s) => [s.phoneScreenshot, s.productImage]),
    [slides],
  );
  useImagePreload(allSlideImages);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slides.length, activeIndex]);

  return (
    <section className="relative flex min-h-[500px] w-full items-start overflow-hidden bg-white pb-8 pt-6 sm:min-h-0 sm:items-center sm:pb-0 sm:pt-0 sm:[aspect-ratio:4000/1715]">
      {/* 渐变背景 - 逆时针旋转动画，绝对定位最底层 */}
      <GradientBackground />
      {/* 右上角暖色点缀 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 90% 10%, rgba(255,200,170,0.3) 0%, transparent 70%)",
        }}
      />

      {/* 内容区域 - 左：手机截图，右：文字+产品 */}
      {/* 内容区域 - 统一 1280px 最大宽度 */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex w-full flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:gap-16"
          >
            {/* 左侧 - 手机截图 */}
            <div className="absolute left-[20px] top-[100px] z-[1] flex shrink-0 items-end self-center sm:relative sm:left-auto sm:top-auto sm:z-auto lg:self-end">
              <div
                className="relative w-[160px] sm:w-[260px] lg:w-[380px]"
                style={{ aspectRatio: "320 / 650" }}
              >
                <Image
                  src={activeSlide.phoneScreenshot}
                  alt={`Aura app - ${activeSlide.audience} edition`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 260px, 380px"
                />
              </div>
            </div>

            {/* 右侧 - 文字 + 产品图片 */}
            <div className="flex flex-1 flex-col items-center sm:gap-6 lg:items-start lg:gap-0">
              {/* 文字区域 */}
              <div className="relative z-[2] text-center sm:z-auto lg:w-full lg:text-left">
                <h1 className="mb-2 text-xl font-bold leading-tight text-gray-900 sm:mb-4 sm:text-3xl lg:text-5xl xl:text-6xl">
                  {activeSlide.slogan}
                </h1>
              </div>

              {/* 移动端：首屏显示下载按钮，非首屏显示等高占位块 */}
              {activeIndex === 0 ? (
                <div className="relative z-[2] w-full pt-[400px] sm:hidden sm:pt-0">
                  {activeSlide.subtitle && (
                    <p className="mb-4 whitespace-pre-line text-center text-sm text-black">
                      {activeSlide.subtitle}
                    </p>
                  )}
                  <div className="flex w-full justify-center gap-3">
                    <AppStoreBadgeLink
                      href={downloadConfig.appStoreUrl}
                      className="h-[55px]"
                    />
                    <AndroidBadgeLink
                      href={downloadConfig.androidApkUrl}
                      className="h-[55px]"
                    />
                    <GooglePlayBadgeLink
                      href={downloadConfig.googlePlayUrl}
                      className="h-[55px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full pt-[496px] sm:hidden sm:pt-0" />
              )}

              {/* 产品图片 */}
              <div className="absolute right-[20px] top-[150px] z-[1] h-[180px] w-[180px] sm:relative sm:right-auto sm:top-auto sm:z-auto sm:h-[300px] sm:w-[300px] lg:left-[150px] lg:top-[-20px] lg:h-[450px] lg:w-[450px]">
                <Image
                  src={activeSlide.productImage}
                  alt={`Aura product - ${activeSlide.audience} edition`}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 300px, 450px"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 下载按钮 - 右下角，仅第一张幻灯片显示 */}
      <AnimatePresence>
        {activeIndex === 0 && (
          <motion.div
            className="z-10 hidden sm:absolute sm:inset-x-0 sm:bottom-0 sm:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center pb-4 sm:pb-8 lg:items-end lg:pb-12">
                {activeSlide.subtitle && (
                  <p className="mb-4 whitespace-pre-line text-right text-sm text-black sm:text-lg lg:text-xl">
                    {activeSlide.subtitle}
                  </p>
                )}
                <div className="flex gap-3">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

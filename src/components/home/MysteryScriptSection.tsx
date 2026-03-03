"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CarouselCard } from "@/types/home";
import { GradientBackground } from "@/components/ui/GradientBackground";

const GAP = 16;
const AUTO_PLAY_MS = 3000;

interface MysteryScriptSectionProps {
  title: string;
  description: string;
  cards: CarouselCard[];
}

export function MysteryScriptSection({
  title,
  description,
  cards,
}: MysteryScriptSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(230);
  const [cardStep, setCardStep] = useState(246);
  const [visibleCount, setVisibleCount] = useState(5);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // 根据容器内容宽度计算卡片尺寸，保证可见卡片恰好填满
  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const style = getComputedStyle(containerRef.current);
    const availableWidth =
      containerRef.current.clientWidth -
      parseFloat(style.paddingLeft) -
      parseFloat(style.paddingRight);
    const baseWidth = window.matchMedia("(min-width: 640px)").matches
      ? 230
      : 200;
    const visibleCount = Math.max(
      1,
      Math.floor((availableWidth + GAP) / (baseWidth + GAP)),
    );
    const actualWidth = Math.floor(
      (availableWidth - (visibleCount - 1) * GAP) / visibleCount,
    );
    setCardWidth(actualWidth);
    setCardStep(actualWidth + GAP);
    setVisibleCount(visibleCount);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // 无缝跳转：滑到第二组后，关闭动画瞬移回第一组对应位置
  useEffect(() => {
    if (currentIndex < cards.length) return;
    const timer = setTimeout(() => {
      setAnimated(false);
      setCurrentIndex(0);
    }, 500); // 等过渡动画结束后再跳
    return () => clearTimeout(timer);
  }, [currentIndex, cards.length]);

  // 关闭动画后下一帧重新开启
  useEffect(() => {
    if (!animated) {
      requestAnimationFrame(() => setAnimated(true));
    }
  }, [animated]);

  // 自动轮播
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const offset = -currentIndex * cardStep;

  return (
    <section aria-label="Mystery Script">
      {/* 标题区域 - 白底 */}
      <div className="bg-white px-4 pb-12 pt-12 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-3 text-3xl font-bold text-black sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {description}
          </p>
        </div>
      </div>

      {/* 轮播区域 - 渐变背景全宽包裹 */}
      <div className="relative overflow-hidden py-8">
        <GradientBackground
          className="absolute z-0"
          inset="-25% -80%"
          rotate={[0, -15, 0]}
          scale={[1.5, 1.6, 1.5]}
        />

        <div
          ref={containerRef}
          className="relative z-10 mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex"
            style={{
              transform: `translateX(${offset}px)`,
              transition: animated ? "transform 500ms ease-in-out" : "none",
            }}
          >
            {/* 渲染两组实现无缝衔接 */}
            {[...cards, ...cards].map((card, i) => (
              <div
                key={`${card.id}-${i}`}
                className="shrink-0"
                style={{
                  width: `${cardWidth}px`,
                  marginRight: `${GAP}px`,
                }}
              >
                <div className="relative aspect-[614/1274] overflow-hidden rounded-2xl">
                  <Image
                    src={card.image}
                    alt={card.title || "Mystery script card"}
                    fill
                    className="object-cover"
                    sizes="230px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

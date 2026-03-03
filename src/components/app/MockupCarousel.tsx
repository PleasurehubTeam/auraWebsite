"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import type { MockupItem } from "@/types/app";

import "swiper/css";
import "swiper/css/effect-coverflow";

interface MockupCarouselProps {
  mockups: MockupItem[];
}

// 轮播间距 & slide 宽度 — 移动端缩小以展示更多截图
const GAP_MOBILE = 16;
const GAP_DESKTOP = 40;
const ITEM_WIDTH_MOBILE = 120;
const ITEM_WIDTH_DESKTOP = 280;

export function MockupCarousel({ mockups }: MockupCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [gap, setGap] = useState(GAP_DESKTOP);

  // 根据容器宽度和设备类型计算可见 slide 数量及间距
  const measure = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const itemW = isMobile ? ITEM_WIDTH_MOBILE : ITEM_WIDTH_DESKTOP;
    const currentGap = isMobile ? GAP_MOBILE : GAP_DESKTOP;
    setGap(currentGap);
    const containerW = containerRef.current?.offsetWidth ?? 0;
    const count = Math.max(
      1,
      Math.floor((containerW + currentGap) / (itemW + currentGap)),
    );
    // const oddCount = count % 2 === 0 ? count - 1 : count;
    // setSlidesPerView(Math.max(1, oddCount));
    setSlidesPerView(Math.max(1, count));
    console.log(count, "slidesPerView");
  }, []);

  // 初始化测量 & 监听窗口缩放
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    // 轮播容器 - 移动端缩小上下间距
    <div
      ref={containerRef}
      className="mx-auto max-w-7xl overflow-visible py-4 sm:py-8"
    >
      {/* Swiper 轮播 - coverflow 3D 效果 + 自动播放 */}
      <Swiper
        // style={{overflow: "visible"}}
        modules={[Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        loopAdditionalSlides={slidesPerView}
        slidesPerView={slidesPerView}
        spaceBetween={gap}
        coverflowEffect={{
          rotate: 12,
          stretch: 0,
          depth: 100,
          modifier: 1,
          scale: 1.05,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={500}
      >
        {mockups.map((mockup) => (
          <SwiperSlide key={mockup.id}>
            <Image
              src={mockup.image}
              alt={mockup.alt}
              width={ITEM_WIDTH_DESKTOP}
              height={ITEM_WIDTH_DESKTOP * 2}
              className="h-auto w-full rounded-2xl object-contain"
              sizes={`(max-width: 768px) ${ITEM_WIDTH_MOBILE}px, ${ITEM_WIDTH_DESKTOP}px`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

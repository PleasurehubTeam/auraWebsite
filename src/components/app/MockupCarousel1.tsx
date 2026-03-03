"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import type { MockupItem } from "@/types/app";

import "swiper/css";
import "swiper/css/effect-cards";

interface MockupCarouselProps {
  mockups: MockupItem[];
}

// slide 宽度 — 移动端缩小以展示更多截图
const ITEM_WIDTH_MOBILE = 120;
const ITEM_WIDTH_DESKTOP = 280;

export function MockupCarousel({ mockups }: MockupCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    // 轮播容器 - 移动端缩小上下间距
    <div
      ref={containerRef}
      className="mx-auto w-[120px] py-4 sm:w-[280px] sm:py-8"
    >
      {/* Swiper 轮播 - coverflow 3D 效果 + 自动播放 */}
      <Swiper
        modules={[Autoplay, EffectCards]}
        effect="cards"
        grabCursor
        loop
        cardsEffect={{
          perSlideOffset: 120,
          perSlideRotate: 0,
          rotate: false,
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

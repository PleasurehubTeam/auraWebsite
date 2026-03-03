"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { AboutHeroData } from "@/types/about";

interface AboutHeroBannerProps {
  data: AboutHeroData;
}

export function AboutHeroBanner({ data }: AboutHeroBannerProps) {
  return (
    <section
      className="relative z-10 h-auto w-full overflow-hidden sm:min-h-[80vh]"
      style={{ backgroundColor: data.fallbackColor }}
    >
      {/* 背景图片 - 移动端自适应高度完整展示，sm+ 填充裁切 */}
      <Image
        src={data.backgroundImage}
        alt={data.backgroundAlt}
        fill
        priority
        className="hidden object-cover sm:block"
        sizes="100vw"
      />
      <Image
        src={data.backgroundImage}
        alt={data.backgroundAlt}
        width={1200}
        height={800}
        priority
        className="block h-auto w-full object-contain sm:hidden"
        sizes="100vw"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Content */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 z-20 px-4 text-center sm:bottom-[200px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <h1 className="font-montserrat mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {data.title}
        </h1>
        <p className="font-montserrat mx-auto mt-[20px] max-w-xl text-sm text-white/80 [word-spacing:4px] sm:[word-spacing:10px] md:text-base lg:text-xl">
          {data.slogan}
        </p>
      </motion.div>
    </section>
  );
}

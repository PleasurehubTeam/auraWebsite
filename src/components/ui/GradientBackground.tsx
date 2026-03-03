"use client";

import { motion } from "framer-motion";

interface GradientBackgroundProps {
  /** 单个渐变字符串或多层渐变数组（数组模式下每层独立渲染，支持 z-index 层级隔离） */
  gradient?: string | string[];
  /** Inset values, e.g. "-50% -25%" */
  inset?: string;
  /** Rotation keyframes */
  rotate?: number[];
  /** Scale keyframes */
  scale?: number[];
  /** Animation duration in seconds */
  duration?: number;
  className?: string;
}

/* 多层渐变（独立 div 层级隔离，避免 alpha 混合导致颜色变淡） */
const DEFAULT_GRADIENT = [
  /* z-1: 底层 — 右上暖色 */
  "radial-gradient(ellipse 45% 42% at 72% 30%, #faf0e6 0%, #fceaf0 45%, transparent 70%)",
  /* z-2: 中层 — 左侧柔粉 */
  "radial-gradient(ellipse 35% 30% at 30% 35%, rgba(236, 160, 200, 0.55) 0%, rgba(248, 200, 220, 0.25) 50%, transparent 70%)",
  /* z-3: 顶层 — 居中偏上基础粉色渐变（底部留白） */
  "radial-gradient(ellipse 70% 45% at 50% 30%, #ec8fb8 0%, #f2a5c8 15%, #f5c0d8 30%, #fce8ef 50%, #ffffff 70%)",
];

export function GradientBackground({
  gradient = DEFAULT_GRADIENT,
  inset = "-50% -25%",
  rotate = [0, -30, 0],
  scale = [1, 1.1, 1],
  duration = 10,
  className = "absolute z-0",
}: GradientBackgroundProps) {
  const transition = { duration, repeat: Infinity, ease: "easeInOut" as const };
  const animate = { rotate, scale };

  /* 数组模式：每层渐变渲染为独立 div，通过 z-index 实现层级隔离 */
  if (Array.isArray(gradient)) {
    return (
      <div className={className} style={{ inset }}>
        {gradient.map((g, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{ background: g, zIndex: i }}
            animate={animate}
            transition={transition}
          />
        ))}
      </div>
    );
  }

  /* 单字符串模式：保持原有行为 */
  return (
    <motion.div
      className={className}
      style={{ inset, background: gradient }}
      animate={animate}
      transition={transition}
    />
  );
}

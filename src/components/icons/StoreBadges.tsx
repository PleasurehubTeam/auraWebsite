"use client";

import { motion } from "framer-motion";

// Next.js serves public/ at root, so no "/public" prefix
const SPRITE_PATH = "/images/home/aura-index-icon-01.svg";

/**
 * Sprite: viewBox 0 0 461.53 70.26
 *
 * App Store  badge: x 0      → 214.81  (width 214.81)
 * Gap:              x 214.81 → 246.74
 * Google Play badge: x 246.74 → 461.53  (width 214.79)
 *
 * backgroundSize  = (spriteWidth / badgeWidth) × 100%
 *   App Store   → 461.53 / 214.81 ≈ 214.86%
 *   Google Play → 461.53 / 214.79 ≈ 214.88%
 *
 * backgroundPosition (percentage formula):
 *   App Store   → 0%   (left edge)
 *   Google Play → 100% (right edge)
 */
const spriteConfig = {
  appStore: {
    backgroundSize: "214.86% 100%",
    backgroundPosition: "0 0",
    aspectRatio: "214.81 / 70.26",
    label: "Download on App Store",
  },
  googlePlay: {
    backgroundSize: "214.88% 100%",
    backgroundPosition: "100% 0",
    aspectRatio: "214.79 / 70.26",
    label: "Get it on Google Play",
  },
} as const;

interface StoreBadgeLinkProps {
  type: "appStore" | "googlePlay";
  href: string;
  className?: string;
}

export function StoreBadgeLink({
  type,
  href,
  className = "h-12",
}: StoreBadgeLinkProps) {
  const cfg = spriteConfig[type];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{
        display: "block",
        aspectRatio: cfg.aspectRatio,
        backgroundImage: `url(${SPRITE_PATH})`,
        backgroundSize: cfg.backgroundSize,
        backgroundPosition: cfg.backgroundPosition,
        backgroundRepeat: "no-repeat",
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 12 }}
      aria-label={cfg.label}
    />
  );
}

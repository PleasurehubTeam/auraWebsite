"use client";

import { motion } from "framer-motion";

/**
 * Sprite: download-buttons.svg (viewBox 0 0 666.67 666.67)
 *
 * 2×3 grid layout, each button ≈ 292.36 × 91.36 (viewBox units):
 *   internal path size: 219.272 × 68.522, aspect ratio 3.2:1
 *
 *   Row 1 (top):  Android APK  |  Huawei AppGallery
 *   Row 2 (mid):  App Store    |  Galaxy Store
 *   Row 3 (bot):  Google Play  |  (empty)
 *
 * backgroundSize  = (spriteW / btnW) × 100%  ≈ 228.03%
 *                   (spriteH / btnH) × 100%  ≈ 729.70%
 *
 * backgroundPosition (percentage):
 *   Android APK  → 8.91%  30.58%
 *   App Store    → 8.91%  49.95%
 *   Google Play  → 8.91%  69.33%
 */
const SPRITE_PATH = "/images/home/download-buttons.svg";

const spriteConfig = {
  androidApk: {
    backgroundPosition: "8.91% 30.58%",
    label: "Download APK 6.0+ Android",
  },
  appStore: {
    backgroundPosition: "8.91% 49.95%",
    label: "Download on App Store",
  },
  googlePlay: {
    backgroundPosition: "8.91% 69.33%",
    label: "Get it on Google Play",
  },
} as const;

const BACKGROUND_SIZE = "228.03% 729.70%";
const ASPECT_RATIO = "219.272 / 68.522";

type BadgeType = keyof typeof spriteConfig;

interface StoreBadgeLinkProps {
  type: BadgeType;
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
        aspectRatio: ASPECT_RATIO,
        backgroundImage: `url(${SPRITE_PATH})`,
        backgroundSize: BACKGROUND_SIZE,
        backgroundPosition: cfg.backgroundPosition,
        backgroundRepeat: "no-repeat",
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 12 }}
      aria-label={cfg.label}
    />
  );
}

// Convenience alias for Android APK button
export function AndroidBadgeLink({
  href,
  className = "h-12",
}: Omit<StoreBadgeLinkProps, "type">) {
  return <StoreBadgeLink type="androidApk" href={href} className={className} />;
}

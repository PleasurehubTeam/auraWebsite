"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { TabItem } from "@/types/home";
import { useImagePreload } from "@/hooks/useImagePreload";

const PLACEHOLDER_IMAGE = "/images/news/news-placeholder.webp";

interface TabSwitcherProps {
  tabs: TabItem[];
  className?: string;
}

export function TabSwitcher({ tabs, className = "" }: TabSwitcherProps) {
  const instanceId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = tabs[activeIndex];
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());

  // Preload all tab images so switching tabs is instant
  const allTabImages = useMemo(
    () =>
      tabs.flatMap(
        (t) => [t.image, t.phoneScreenshot].filter(Boolean) as string[],
      ),
    [tabs],
  );
  useImagePreload(allTabImages);

  const getImgSrc = (original: string) =>
    failedSrcs.has(original) ? PLACEHOLDER_IMAGE : original;

  const handleImgError = (original: string) => {
    setFailedSrcs((prev) => new Set(prev).add(original));
  };

  return (
    <div className={className}>
      {/* 标签栏 */}
      <div className="relative mx-auto mb-8 w-full max-w-7xl">
        {/* 标签按钮 */}
        <div className="flex justify-center gap-2" role="tablist">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveIndex(index)}
              className="relative z-10 px-5 py-2.5 text-sm font-bold transition-colors sm:text-2xl"
              style={{
                color: index === activeIndex ? "#000000" : "#999999",
              }}
            >
              {/* 滑动指示器 - 底部横条 */}
              {index === activeIndex && (
                <motion.div
                  layoutId={`tab-indicator-${instanceId}`}
                  className="absolute bottom-0 left-0 right-0 z-10 h-0.5 bg-brand-pink"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
        {/* 滚动槽 - 与指示器等高的底部横条 */}
        <div
          className="absolute bottom-0 left-0 right-0 z-0 h-0.5"
          style={{ backgroundColor: "#fce8ef" }}
        />
      </div>

      {/* 标签内容 */}
      <div className="relative min-h-[300px] sm:min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            id={`panel-${activeTab.id}`}
            role="tabpanel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-6 lg:gap-8"
          >
            {/* 描述 */}
            <div className="text-center">
              <p className="text-wrap text-base leading-relaxed text-black">
                {activeTab.description}
              </p>
            </div>
            {/* 图片区域 */}
            <div className="relative w-full">
              {/* 背景图 */}
              <div className="aspect-[2/1] w-full overflow-hidden rounded-2xl">
                <Image
                  src={getImgSrc(activeTab.image)}
                  alt={activeTab.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => handleImgError(activeTab.image)}
                />
              </div>
              {/* 手机截图 - 绝对定位，溢出显示 */}
              {activeTab.phoneScreenshot && (
                <div
                  className="absolute hidden lg:block lg:w-[250px]"
                  style={{ left: 100, bottom: -150 }}
                >
                  <Image
                    src={getImgSrc(activeTab.phoneScreenshot)}
                    alt={`${activeTab.label} phone`}
                    width={1220}
                    height={2320}
                    className="h-auto w-full"
                    onError={() => handleImgError(activeTab.phoneScreenshot!)}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

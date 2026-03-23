"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { NewsCategoryItem, NewsCategory } from "@/types/news";

interface NewsCategoryTabsProps {
  categories: NewsCategoryItem[];
  activeCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
}

export function NewsCategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: NewsCategoryTabsProps) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const activeIndex = categories.findIndex((cat) => cat.id === activeCategory);

  // 计算指示器位置
  useEffect(() => {
    const tabList = tabListRef.current;
    if (!tabList) return;
    const buttons = tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    const activeButton = buttons[activeIndex];
    if (!activeButton) return;

    const listRect = tabList.getBoundingClientRect();
    const btnRect = activeButton.getBoundingClientRect();
    setIndicatorStyle({
      left: btnRect.left - listRect.left,
      width: btnRect.width,
    });
  }, [activeIndex]);

  return (
    <nav role="tablist" aria-label="News categories" className="relative mb-10">
      <div
        ref={tabListRef}
        className="relative flex items-stretch gap-6 lg:gap-8"
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(cat.id)}
              className={`relative flex-1 pb-3 text-xl font-bold transition-colors lg:text-2xl ${
                isActive
                  ? "text-[#000000]"
                  : "text-[#8a8a8a] hover:text-gray-600"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
        {/* 滑动指示器 - 在按钮外部，不受 Google Translate DOM 修改影响 */}
        <motion.div
          className="absolute bottom-0 z-10 h-0.5 bg-brand-pink"
          animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
      {/* Track line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#fceff4]" />
    </nav>
  );
}

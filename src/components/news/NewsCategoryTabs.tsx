"use client";

import { useId } from "react";
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
  const instanceId = useId();

  return (
    <nav role="tablist" aria-label="News categories" className="relative mb-10">
      <div className="flex items-stretch gap-6 lg:gap-8">
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
              {isActive && (
                <motion.div
                  layoutId={`news-tab-indicator-${instanceId}`}
                  className="absolute bottom-0 left-0 right-0 z-10 h-0.5 bg-brand-pink"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      {/* Track line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#fceff4]" />
    </nav>
  );
}

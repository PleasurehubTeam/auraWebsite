"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalCarouselProps {
  children: React.ReactNode;
  className?: string;
  /** 自动轮播间隔（毫秒），默认 3000 */
  autoPlayInterval?: number;
}

export function HorizontalCarousel({
  children,
  className = "",
  autoPlayInterval = 3000,
}: HorizontalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const childArray = Children.toArray(children);
  const itemCount = childArray.length;

  // 复制三份实现无缝轮播
  const tripleChildren = [...childArray, ...childArray, ...childArray];

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  // 初始化滚动位置到中间那组
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // 滚动到中间那组的起始位置
    const singleGroupWidth = el.scrollWidth / 3;
    el.scrollLeft = singleGroupWidth;
    checkScroll();
  }, [checkScroll]);

  // 监听滚动，到边界时无缝跳转
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const singleGroupWidth = el.scrollWidth / 3;
      // 滚动到第三组区域时，跳回第二组对应位置
      if (el.scrollLeft >= singleGroupWidth * 2) {
        el.scrollLeft -= singleGroupWidth;
      }
      // 滚动到第一组区域时，跳到第二组对应位置
      if (el.scrollLeft <= 0) {
        el.scrollLeft += singleGroupWidth;
      }
      checkScroll();
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // 自动轮播
  useEffect(() => {
    if (isHovered) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      // 找到当前第一个可见的子元素宽度
      const firstChild = el.children[0] as HTMLElement | undefined;
      const itemWidth = firstChild
        ? firstChild.offsetWidth + 16 // 16 = gap-4
        : el.clientWidth * 0.3;
      el.scrollBy({ left: itemWidth, behavior: "smooth" });
    }, autoPlayInterval);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, autoPlayInterval]);

  // 点击聚焦：将点击的 card 滚动到容器中心
  const handleCardClick = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    // 查找最近的 data-index 元素
    const target = (e.target as HTMLElement).closest(
      "[data-index]",
    ) as HTMLElement | null;
    if (!target) return;

    const cardLeft = target.offsetLeft;
    const cardWidth = target.offsetWidth;
    const containerWidth = el.clientWidth;
    const scrollTarget = cardLeft - (containerWidth - cardWidth) / 2;

    el.scrollTo({ left: scrollTarget, behavior: "smooth" });
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChild = el.children[0] as HTMLElement | undefined;
    const itemWidth = firstChild
      ? firstChild.offsetWidth + 16
      : el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -itemWidth : itemWidth,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`group relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 滚动容器 */}
      <div
        ref={scrollRef}
        onClick={handleCardClick}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tripleChildren.map((child, i) =>
          isValidElement(child)
            ? cloneElement(
                child as React.ReactElement<Record<string, unknown>>,
                {
                  key: `carousel-${i}`,
                },
              )
            : child,
        )}
      </div>

      {/* 左箭头 */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/10 text-black backdrop-blur-sm transition-colors hover:bg-black/20 md:flex"
          aria-label="向左滚动"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* 右箭头 */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/10 text-black backdrop-blur-sm transition-colors hover:bg-black/20 md:flex"
          aria-label="向右滚动"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

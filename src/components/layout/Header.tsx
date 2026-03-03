"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/config/navigation";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  const [mode, setMode] = useState<"static" | "hidden" | "fixed">("static");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const isScrollingUp = currentY < lastScrollY.current;
      const headerHeight = 64;

      if (currentY <= headerHeight) {
        setMode("static");
      } else if (isScrollingUp) {
        setMode("fixed");
      } else {
        setMode("hidden");
      }

      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`z-[100] w-full border-b border-white/20 bg-white/70 backdrop-blur-xl transition-transform duration-300 ${
        mode === "static"
          ? "relative"
          : mode === "fixed"
            ? "fixed left-0 top-0 translate-y-0"
            : "fixed left-0 top-0 -translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/home/aura-logo.svg"
            alt="Aura"
            width={100}
            height={32}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-brand-pink"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import type { ModeItem } from "@/types/home";

interface ModeFunctionSectionProps {
  items: ModeItem[];
}

export function ModeFunctionSection({ items }: ModeFunctionSectionProps) {
  return (
    <section
      className="bg-white px-4 py-12 sm:px-6 sm:py-20 lg:px-8"
      aria-label="Mode Function overview"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-black sm:text-4xl">
          Mode Function
        </h2>

        {/* 4×2 网格 */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative aspect-[1265/864] w-full overflow-hidden rounded-xl"
            >
              <Image
                src={item.icon}
                alt={item.label}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

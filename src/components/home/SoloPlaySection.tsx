"use client";

import type { TabSectionData } from "@/types/home";
import { TabSwitcher } from "@/components/ui/TabSwitcher";

interface SoloPlaySectionProps {
  data: TabSectionData;
}

export function SoloPlaySection({ data }: SoloPlaySectionProps) {
  return (
    <section
      className="bg-white px-4 py-12 sm:px-6 sm:py-20 lg:px-8"
      aria-label="Solo Play modes"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-black sm:text-4xl">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg text-gray-400">{data.subtitle}</p>
          )}
        </div>

        <TabSwitcher tabs={data.tabs} />
      </div>
    </section>
  );
}

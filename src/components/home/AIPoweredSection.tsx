"use client";

import type { TabSectionData } from "@/types/home";
import { TabSwitcher } from "@/components/ui/TabSwitcher";

interface AIPoweredSectionProps {
  data: TabSectionData;
}

export function AIPoweredSection({ data }: AIPoweredSectionProps) {
  return (
    <section
      className="border bg-white px-4 py-[35px] sm:px-6 lg:px-8"
      aria-label="AI-Powered features"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-black-500 mb-3 text-3xl font-bold sm:text-4xl">
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

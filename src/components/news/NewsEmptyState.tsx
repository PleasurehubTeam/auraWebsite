"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface NewsEmptyStateProps {
  illustration: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}

export function NewsEmptyState({
  illustration,
  message,
  actionLabel,
  onAction,
}: NewsEmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center py-16">
      <Image
        src={illustration}
        alt="Aura"
        width={120}
        height={120}
        className="mb-8 opacity-20"
      />
      <p className="mb-6 text-center text-lg text-gray-500">{message}</p>
      <Button variant="secondary" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
}

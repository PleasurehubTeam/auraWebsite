"use client";

import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { MasonryPhoto } from "@/types/gallery";

interface ImagePreviewProps {
  photos: MasonryPhoto[];
  currentPhoto: MasonryPhoto | null;
  onClose: () => void;
  onNavigate: (photo: MasonryPhoto) => void;
}

export function ImagePreview({
  photos,
  currentPhoto,
  onClose,
  onNavigate,
}: ImagePreviewProps) {
  const currentIndex = currentPhoto
    ? photos.findIndex((p) => p.id === currentPhoto.id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(photos[currentIndex - 1]);
  }, [hasPrev, currentIndex, photos, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(photos[currentIndex + 1]);
  }, [hasNext, currentIndex, photos, onNavigate]);

  useEffect(() => {
    if (!currentPhoto) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [currentPhoto, onClose, goPrev, goNext]);

  if (!currentPhoto) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close button */}
        <button
          className="absolute right-4 top-4 z-50 flex min-h-[44px] min-w-[44px] items-center justify-center text-white/80 transition-colors hover:text-white"
          onClick={onClose}
          aria-label="Close preview"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Prev button */}
        {hasPrev && (
          <button
            className="absolute left-4 z-50 flex min-h-[44px] min-w-[44px] items-center justify-center text-white/80 transition-colors hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Next button */}
        {hasNext && (
          <button
            className="absolute right-4 z-50 flex min-h-[44px] min-w-[44px] items-center justify-center text-white/80 transition-colors hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.id}
            className="relative max-h-[85vh] max-w-[90vw]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentPhoto.featuredImage}
              alt={currentPhoto.imageAlt}
              width={1600}
              height={1200}
              className="h-auto max-h-[85vh] w-auto max-w-full rounded-lg object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
          {currentIndex + 1} / {photos.length}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

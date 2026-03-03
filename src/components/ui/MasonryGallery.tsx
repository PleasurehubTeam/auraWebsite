"use client";

import { type ReactNode, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { MasonryPhoto } from "@/types/gallery";

const PLACEHOLDER_IMAGE = "/images/news/news-placeholder.webp";

interface MasonryGalleryProps {
  photos: MasonryPhoto[];
  emptyMessage: string;
  onPhotoClick?: (photo: MasonryPhoto) => void;
  renderCaption?: (photo: MasonryPhoto) => ReactNode;
  className?: string;
}

function GalleryCard({
  photo,
  index,
  onClick,
  renderCaption,
}: {
  photo: MasonryPhoto;
  index: number;
  onClick?: (photo: MasonryPhoto) => void;
  renderCaption?: (photo: MasonryPhoto) => ReactNode;
}) {
  const [imgSrc, setImgSrc] = useState(photo.featuredImage);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`group relative overflow-hidden ${onClick ? "cursor-pointer" : ""}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick ? () => onClick(photo) : undefined}
    >
      <Image
        src={imgSrc}
        alt={photo.imageAlt}
        width={800}
        height={600}
        className="h-auto w-full rounded-2xl object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        loading="lazy"
        onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t via-transparent to-transparent" />

      {/* Caption */}
      <div className="z-20 p-2 sm:p-4">
        {renderCaption ? (
          renderCaption(photo)
        ) : (
          <h3 className="truncate text-xs font-medium text-black transition-colors duration-300 group-hover:text-brand-pink sm:text-sm lg:text-base">
            {photo.title}
          </h3>
        )}
      </div>
    </motion.article>
  );
}

export function MasonryGallery({
  photos,
  emptyMessage,
  onPhotoClick,
  renderCaption,
  className = "",
}: MasonryGalleryProps) {
  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`columns-1 gap-4 md:columns-2 lg:columns-4 ${className}`}>
      {photos.map((photo, index) => (
        <div key={photo.id} className="break-inside-avoid">
          <GalleryCard
            photo={photo}
            index={index}
            onClick={onPhotoClick}
            renderCaption={renderCaption}
          />
        </div>
      ))}
    </div>
  );
}

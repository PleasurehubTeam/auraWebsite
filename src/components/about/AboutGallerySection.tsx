"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NewsCategoryTabs } from "@/components/news/NewsCategoryTabs";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MasonryGallery } from "@/components/ui/MasonryGallery";
import { ImagePreview } from "@/components/ui/ImagePreview";
import type { AboutGalleryCategory, GalleryPhoto } from "@/types/about";
import type { MasonryPhoto } from "@/types/gallery";
import type { NewsCategoryItem, NewsCategory } from "@/types/news";

interface AboutGallerySectionProps {
  categories: AboutGalleryCategory[];
  photos: GalleryPhoto[];
  emptyMessage: string;
}

export function AboutGallerySection({
  categories,
  photos,
  emptyMessage,
}: AboutGallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [previewPhoto, setPreviewPhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos = photos.filter((p) => p.category === activeCategory);

  const handlePhotoClick = (photo: MasonryPhoto) => {
    setPreviewPhoto(photo as GalleryPhoto);
  };

  // Adapt About categories to NewsCategoryTabs' expected interface
  const tabCategories: NewsCategoryItem[] = categories.map((cat) => ({
    id: cat.id as NewsCategory,
    label: cat.label,
    order: cat.order,
  }));

  return (
    <section className="md:py-20 lg:py-24" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="gallery-heading" className="sr-only">
          Photo Gallery
        </h2>
        <ScrollReveal direction="up">
          <NewsCategoryTabs
            categories={tabCategories}
            activeCategory={activeCategory as NewsCategory}
            onCategoryChange={(cat) => setActiveCategory(cat as string)}
          />
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="min-h-[100vh]"
          >
            <MasonryGallery
              photos={filteredPhotos}
              emptyMessage={emptyMessage}
              onPhotoClick={handlePhotoClick}
              className="!columns-2 md:!columns-2 lg:!columns-4"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <ImagePreview
        photos={filteredPhotos}
        currentPhoto={previewPhoto}
        onClose={() => setPreviewPhoto(null)}
        onNavigate={handlePhotoClick}
      />
    </section>
  );
}

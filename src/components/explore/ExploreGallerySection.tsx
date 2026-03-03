"use client";

import { useState } from "react";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { MasonryGallery } from "@/components/ui/MasonryGallery";
import { ImagePreview } from "@/components/ui/ImagePreview";
import type { MasonryPhoto } from "@/types/gallery";
import type { ExploreGalleryPhoto } from "@/types/explore";

interface ExploreGallerySectionProps {
  photos: ExploreGalleryPhoto[];
  emptyMessage: string;
}

export function ExploreGallerySection({
  photos,
  emptyMessage,
}: ExploreGallerySectionProps) {
  const [previewPhoto, setPreviewPhoto] = useState<ExploreGalleryPhoto | null>(
    null,
  );

  const handlePhotoClick = (photo: MasonryPhoto) => {
    setPreviewPhoto(photo as ExploreGalleryPhoto);
  };

  return (
    <section
      className="relative overflow-hidden bg-white py-8 md:py-20"
      aria-labelledby="explore-gallery-heading"
    >
      {/* Top gradient — circular, covering full width */}
      <div className="absolute -top-10 left-0 right-0 z-0 h-[800px] overflow-hidden">
        <GradientBackground
          className="absolute z-0"
          inset="0"
          gradient={[
            /* 底层：宽椭圆粉色渐变，从顶部铺满两侧，向下渐变到白色 */
            "radial-gradient(ellipse 120% 60% at 50% 0%, #f2a5c8 0%, #fce8ef 40%, #ffffff 75%)",
            /* 顶层：右上角暖色椭圆渐变，向下过渡到白色 */
            "radial-gradient(ellipse 60% 80% at 75% 10%, rgba(252, 234, 192, 0.8) 0%, rgba(250, 240, 230, 0.5) 25%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
          ]}
          rotate={[0, 2.5, 0]}
          scale={[1, 1.05, 1]}
        />
      </div>

      {/* Bottom gradient (flipped) */}
      <div className="absolute -bottom-10 left-0 right-0 z-0 h-[800px] rotate-180 overflow-hidden">
        <GradientBackground
          className="absolute z-0"
          inset="0"
          gradient={[
            "radial-gradient(ellipse 120% 60% at 50% 0%, #f2a5c8 0%, #fce8ef 40%, #ffffff 75%)",
            "radial-gradient(ellipse 60% 80% at 75% 10%, rgba(252, 234, 192, 0.8) 0%, rgba(250, 240, 230, 0.5) 25%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
          ]}
          rotate={[0, 2.5, 0]}
          scale={[1, 1.05, 1]}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="explore-gallery-heading" className="sr-only">
          Community Photo Gallery
        </h2>

        <MasonryGallery
          photos={photos}
          emptyMessage={emptyMessage}
          onPhotoClick={handlePhotoClick}
          className="!columns-2 md:!columns-2 lg:!columns-4"
        />
      </div>

      <ImagePreview
        photos={photos}
        currentPhoto={previewPhoto}
        onClose={() => setPreviewPhoto(null)}
        onNavigate={handlePhotoClick}
      />
    </section>
  );
}

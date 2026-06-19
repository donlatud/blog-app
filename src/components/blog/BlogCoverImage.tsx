"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import type { BlogImage } from "@/types/blog";

type BlogCoverImageProps = {
  title: string;
  coverImageUrl: string;
  images?: BlogImage[];
};

type Slide = {
  key: string;
  url: string;
  label: string;
};

type SidePeekProps = {
  slide: Slide;
  onSelect: () => void;
};

function SidePeek({ slide, onSelect }: SidePeekProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`View ${slide.label}`}
      className="group relative aspect-21/9 w-[14%] shrink-0 overflow-hidden rounded-xl bg-muted sm:w-[16%]"
    >
      <Image
        src={slide.url}
        alt=""
        aria-hidden="true"
        fill
        sizes="160px"
        className="object-cover opacity-50 transition-opacity group-hover:opacity-70"
      />
    </button>
  );
}

export function BlogCoverImage({
  title,
  coverImageUrl,
  images = [],
}: BlogCoverImageProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides: Slide[] = [];

  if (coverImageUrl) {
    slides.push({
      key: "cover",
      url: coverImageUrl,
      label: `Cover image for ${title}`,
    });
  }

  images.forEach((image) => {
    slides.push({
      key: image.id,
      url: image.imageUrl,
      label: `Supporting image ${image.position} for ${title}`,
    });
  });

  if (slides.length === 0) {
    return null;
  }

  const total = slides.length;
  const safeIndex = Math.min(activeIndex, total - 1);
  const hasMultiple = total > 1;
  const activeSlide = slides[safeIndex];
  const previousIndex = (safeIndex - 1 + total) % total;
  const nextIndex = (safeIndex + 1) % total;

  const goPrevious = () => {
    setActiveIndex((current) => (current - 1 + total) % total);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % total);
  };

  return (
    <PageContainer as="section" className="mt-8">
      <section
        aria-label={`Image gallery for ${title}`}
        aria-roledescription="carousel"
        className="relative"
      >
        {hasMultiple ? (
          <div className="flex items-stretch gap-2 sm:gap-3">
            <SidePeek
              slide={slides[previousIndex]}
              onSelect={goPrevious}
            />

            <div className="relative min-w-0 flex-1">
              <figure className="relative aspect-21/9 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={activeSlide.url}
                  alt={activeSlide.label}
                  fill
                  priority={safeIndex === 0}
                  sizes="(max-width: 768px) 70vw, 900px"
                  className="object-cover"
                />
              </figure>

              <button
                type="button"
                onClick={goPrevious}
                aria-label="Previous image"
                className="absolute top-1/2 left-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/45 sm:left-4 sm:size-11"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="absolute top-1/2 right-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/45 sm:right-4 sm:size-11"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>

            <SidePeek slide={slides[nextIndex]} onSelect={goNext} />
          </div>
        ) : (
          <figure className="relative aspect-21/9 overflow-hidden rounded-xl bg-muted">
            <Image
              src={activeSlide.url}
              alt={activeSlide.label}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
            />
          </figure>
        )}

        {hasMultiple ? (
          <div
            role="tablist"
            aria-label="Select image"
            className="mt-4 flex items-center justify-center gap-2"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.key}
                type="button"
                role="tab"
                aria-selected={index === safeIndex}
                aria-label={`Go to image ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={
                  index === safeIndex
                    ? "h-2 w-6 rounded-full bg-foreground transition-all"
                    : "size-2 rounded-full bg-muted-foreground/40 transition-all hover:bg-muted-foreground"
                }
              />
            ))}
          </div>
        ) : null}
      </section>
    </PageContainer>
  );
}

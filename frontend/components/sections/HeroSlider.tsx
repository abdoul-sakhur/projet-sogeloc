"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { HeroSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";
import LinkPendingIndicator from "@/components/LinkPendingIndicator";

const AUTOPLAY_MS = 10000;

export default function HeroSlider({ section }: { section: HeroSection }) {
  const slides = [...section.slides].sort((a, b) => a.order - b.order);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (slides.length === 0) return null;

  return (
    <section className="relative aspect-[1680/640] max-h-[640px] min-h-[280px] w-full overflow-hidden bg-dark">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="relative h-full min-w-0 flex-[0_0_100%]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: slide.backgroundImage
                    ? `url(${strapiMediaUrl(slide.backgroundImage.url)})`
                    : undefined,
                }}
              />
              {/* Voile sombre léger (10%), fidèle à .bg-overlay-2 du thème d'origine */}
              <div className="absolute inset-0 bg-dark/10" />

              <div className="relative flex h-full items-center">
                <div className="mx-auto w-full max-w-[1140px] px-6">
                  <div className="max-w-[650px]">
                    <h1 className="font-heading text-[30px] font-bold leading-[1.2] text-white sm:text-[40px] md:text-[50px] lg:text-[65px] xl:text-[85px]">
                      {slide.title}
                    </h1>
                    {slide.description && (
                      <p className="mt-[10px] max-w-[650px] text-[15px] font-bold leading-[1.5] text-white md:mt-[30px] md:text-[18px]">
                        {slide.description}
                      </p>
                    )}
                    {slide.ctaLabel && slide.ctaLink && (
                      <Link
                        href={slide.ctaLink}
                        className="mt-[30px] inline-flex h-[65px] min-w-[170px] items-center justify-center rounded-[3px] bg-primary px-6 font-sans text-sm font-bold capitalize tracking-wide text-white transition-colors hover:bg-primary-hover"
                      >
                        {slide.ctaLabel}
                        <LinkPendingIndicator />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Slide précédente"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white md:left-8"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Slide suivante"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white md:right-8"
          >
            <ChevronIcon direction="right" />
          </button>

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Aller à la slide ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`rounded-full transition-all ${
                  i === selected ? "h-2.5 w-2.5 bg-primary" : "h-2 w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HeroSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";

const AUTOPLAY_MS = 10000;

export default function HeroSlider({ section }: { section: HeroSection }) {
  const slides = [...section.slides].sort((a, b) => a.order - b.order);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[current];
  const goTo = (index: number) => setCurrent((index + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        {/* Colonne texte */}
        <div>
          <h1 className="font-heading text-4xl font-bold text-dark md:text-5xl">{slide.title}</h1>
          {slide.description && (
            <p className="mt-6 max-w-lg text-base leading-relaxed text-body">{slide.description}</p>
          )}
          {slide.ctaLabel && slide.ctaLink && (
            <Link
              href={slide.ctaLink}
              className="mt-8 inline-block bg-primary px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-hover"
            >
              {slide.ctaLabel}
            </Link>
          )}

          {slides.length > 1 && (
            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                aria-label="Slide précédente"
                onClick={() => goTo(current - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-dark transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                aria-label="Slide suivante"
                onClick={() => goTo(current + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-dark transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronIcon direction="right" />
              </button>

              <div className="flex items-center gap-2 pl-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Aller à la slide ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === current ? "w-8 bg-primary" : "w-2 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Colonne visuelle */}
        <div className="relative aspect-4/3 md:aspect-square">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary-alt) 0%, var(--color-primary) 45%, var(--color-dark) 100%)",
              clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          />
          {slide.backgroundImage && (
            <div className="absolute inset-y-6 right-6 left-16 overflow-hidden shadow-xl md:left-24">
              <Image
                src={strapiMediaUrl(slide.backgroundImage.url)}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

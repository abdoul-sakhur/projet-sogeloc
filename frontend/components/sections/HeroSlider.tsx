"use client";

import { useEffect, useState } from "react";
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
    <section className="relative h-[85vh] min-h-[560px] overflow-hidden bg-dark">
      {/* Photos de fond, une par slide, en fondu enchaîné */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: s.backgroundImage
              ? `url(${strapiMediaUrl(s.backgroundImage.url)})`
              : undefined,
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Voile sombre pour la lisibilité du texte, dégradé vers la droite */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-dark/50 to-transparent" />

      {/* Panneau diagonal aux couleurs de la marque, à droite */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-[48%]"
        style={{
          background: "linear-gradient(135deg, var(--color-primary-alt), var(--color-primary))",
          clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      <div className="relative flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl text-white">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl">
              {slide.title}
            </h1>
            {slide.description && (
              <p className="mt-6 max-w-lg text-base leading-relaxed">{slide.description}</p>
            )}
            {slide.ctaLabel && slide.ctaLink && (
              <Link
                href={slide.ctaLink}
                className="mt-8 inline-block bg-primary px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-hover"
              >
                {slide.ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Slide précédente"
            onClick={() => goTo(current - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white md:left-8"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Slide suivante"
            onClick={() => goTo(current + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white md:right-8"
          >
            <ChevronIcon direction="right" />
          </button>

          <div className="absolute bottom-8 left-6 flex items-center gap-2 md:left-24">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Aller à la slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all ${
                  i === current ? "h-2.5 w-2.5 bg-primary" : "h-2 w-2 bg-white/50"
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

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

  return (
    <section className="relative flex h-[70vh] min-h-[480px] items-center overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 bg-dark bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: s.backgroundImage
              ? `url(${strapiMediaUrl(s.backgroundImage.url)})`
              : undefined,
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-dark/50" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl text-white">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">{slide.title}</h1>
          {slide.description && <p className="mt-6 text-lg leading-relaxed">{slide.description}</p>}
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

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Aller à la slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`h-2 w-8 transition-colors ${i === current ? "bg-primary" : "bg-white/50"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

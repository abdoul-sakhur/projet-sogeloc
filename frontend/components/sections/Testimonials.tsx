"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { TestimonialsSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";

const AUTOPLAY_MS = 8000;

export default function Testimonials({ section }: { section: TestimonialsSection }) {
  const testimonials = [...section.testimonials].sort((a, b) => a.order - b.order);
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

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-surface-alt px-6 py-20">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeading subtitle={section.subtitle} title={section.title} align="center" />

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="min-w-0 flex-[0_0_100%]">
                <figure className="mx-auto flex max-w-2xl flex-col items-center px-4 text-center">
                  <QuoteIcon />
                  <blockquote className="mt-6 font-heading text-[19px] font-medium leading-[1.6] text-dark md:text-[22px]">
                    « {testimonial.quote} »
                  </blockquote>
                  <figcaption className="mt-8 flex flex-col items-center">
                    {testimonial.photo && (
                      <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full">
                        <Image
                          src={strapiMediaUrl(testimonial.photo.url)}
                          alt={testimonial.authorName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="font-heading text-[15px] font-bold text-dark">
                      {testimonial.authorName}
                    </span>
                    {(testimonial.authorRole || testimonial.company) && (
                      <span className="text-[13px] text-body">
                        {[testimonial.authorRole, testimonial.company].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        {testimonials.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Aller au témoignage ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`rounded-full transition-all ${
                  i === selected ? "h-2.5 w-2.5 bg-primary" : "h-2 w-2 bg-dark/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function QuoteIcon() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" className="text-primary-ink">
      <path
        fill="currentColor"
        d="M0 28V17.36C0 12.4 1.16 8.32 3.48 5.12 5.88 1.84 9.28 0 13.68 0v6.16c-2.24 0-3.96.84-5.16 2.52-1.12 1.6-1.68 3.68-1.68 6.24h6.36V28H0Zm19.52 0V17.36c0-4.96 1.16-9.04 3.48-12.24C25.4 1.84 28.8 0 33.2 0v6.16c-2.24 0-3.96.84-5.16 2.52-1.12 1.6-1.68 3.68-1.68 6.24h6.36V28h-13.2Z"
      />
    </svg>
  );
}

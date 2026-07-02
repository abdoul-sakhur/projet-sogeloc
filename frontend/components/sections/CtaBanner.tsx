import Link from "next/link";
import type { CtaBannerSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";

export default function CtaBanner({ section }: { section: CtaBannerSection }) {
  return (
    <section
      className="relative bg-cover bg-center px-6 py-20 text-center"
      style={
        section.backgroundImage
          ? { backgroundImage: `url(${strapiMediaUrl(section.backgroundImage.url)})` }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-dark/70" />

      <div className="relative mx-auto max-w-3xl">
        {section.subtitle && (
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-primary">
            {section.subtitle}
          </p>
        )}
        <h2 className="mt-2 font-heading text-3xl font-bold text-white md:text-4xl">
          {section.title}
        </h2>
        {section.cta && (
          <Link
            href={section.cta.link}
            className={`mt-8 inline-block px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors ${
              section.cta.style === "secondary"
                ? "bg-secondary hover:bg-dark"
                : "bg-primary hover:bg-primary-hover"
            }`}
          >
            {section.cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}

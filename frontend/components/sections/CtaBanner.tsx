import Image from "next/image";
import Link from "next/link";
import type { CtaBannerSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import LinkPendingIndicator from "@/components/LinkPendingIndicator";

export default function CtaBanner({ section }: { section: CtaBannerSection }) {
  return (
    <section className="px-6 py-10 md:py-16">
      <div className="mx-auto max-w-[1140px]">
        <div className="relative overflow-hidden rounded-3xl bg-dark">
          <div className="grid gap-8 p-8 md:grid-cols-2 md:items-center md:p-12">
            <div>
              {section.subtitle && (
                <p className="font-heading text-sm font-bold uppercase tracking-wide text-primary">
                  {section.subtitle}
                </p>
              )}
              <h2 className="mt-2 font-heading text-2xl font-bold leading-tight text-white md:text-[32px]">
                {section.title}
              </h2>
              {section.cta && (
                <Link
                  href={section.cta.link}
                  className={`mt-6 inline-flex h-[52px] items-center justify-center rounded-full px-7 font-sans text-sm font-bold capitalize tracking-wide text-white transition-colors ${
                    section.cta.style === "secondary"
                      ? "bg-secondary hover:bg-primary"
                      : "bg-primary hover:bg-primary-hover"
                  }`}
                >
                  {section.cta.label}
                  <LinkPendingIndicator />
                </Link>
              )}
            </div>

            <div className="relative aspect-4/3 overflow-hidden rounded-2xl md:aspect-square">
              {section.image ? (
                <Image
                  src={strapiMediaUrl(section.image.url)}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <ImagePlaceholder />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

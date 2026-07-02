import Image from "next/image";
import Link from "next/link";
import type { AboutSection as AboutSectionType } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";
import RichText from "@/components/RichText";

export default function AboutSection({ section }: { section: AboutSectionType }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
      {section.image && (
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={strapiMediaUrl(section.image.url)}
            alt={section.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div>
        <SectionHeading subtitle={section.subtitle} title={section.title} />
        <RichText content={section.content} className="mt-6 text-body" />

        {section.videoUrl && (
          <a
            href={section.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-heading text-sm font-semibold text-primary hover:text-primary-hover"
          >
            {section.videoLabel || "En vidéo"}
          </a>
        )}

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

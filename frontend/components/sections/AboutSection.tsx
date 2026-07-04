import Image from "next/image";
import Link from "next/link";
import type { AboutSection as AboutSectionType } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";
import RichText from "@/components/RichText";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function AboutSection({ section }: { section: AboutSectionType }) {
  return (
    <section className="mx-auto grid max-w-[1140px] gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:gap-8">
      <div>
        <SectionHeading subtitle={section.subtitle} title={section.title} size="large" />
        <RichText content={section.content} className="mt-6 text-justify text-[16px] leading-[27px] text-body" />

        {section.cta && (
          <Link
            href={section.cta.link}
            className={`mt-5 inline-flex h-[55px] min-w-[200px] items-center justify-center rounded-[3px] px-4 font-sans text-sm font-bold capitalize tracking-wide text-white transition-colors ${
              section.cta.style === "secondary"
                ? "bg-secondary hover:bg-primary"
                : "bg-primary hover:bg-primary-hover"
            }`}
          >
            {section.cta.label}
          </Link>
        )}
      </div>

      <div className="relative">
        <div className="relative aspect-4/3 overflow-hidden rounded-[3px]">
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

        {section.videoUrl && (
          <div className="relative mx-6 -mt-10 max-w-[290px] rounded-[4px] bg-primary p-6 shadow-lg md:absolute md:bottom-[20px] md:left-[-30px] md:mx-0 md:mt-0 xl:left-[-55px]">
            <p className="mb-4 font-heading text-[18px] leading-[1.4] text-white">
              {section.videoLabel || "En vidéo"}
            </p>
            <a
              href={section.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary"
              aria-label="Voir la vidéo"
            >
              <PlayIcon />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7Z" />
    </svg>
  );
}

import Image from "next/image";
import type { PartnerLogosSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";

export default function PartnerLogos({ section }: { section: PartnerLogosSection }) {
  if (section.logos.length === 0) return null;

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeading subtitle={section.subtitle} title={section.title} align="center" />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {section.logos.map((partner) => {
            const logo = (
              <div className="relative h-10 w-[120px] grayscale transition-all duration-300 hover:grayscale-0">
                <Image
                  src={strapiMediaUrl(partner.logo.url)}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            );

            return partner.url ? (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
              >
                {logo}
              </a>
            ) : (
              <div key={partner.id} aria-label={partner.name}>
                {logo}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

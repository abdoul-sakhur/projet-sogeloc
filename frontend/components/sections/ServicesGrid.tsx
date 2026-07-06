import Image from "next/image";
import Link from "next/link";
import type { ServicesGridSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";

export default function ServicesGrid({ section }: { section: ServicesGridSection }) {
  const services = [...section.services].sort((a, b) => a.order - b.order);
  // Pages dédiées existantes pour certains domaines (voir /services/<slug>).
  const dedicatedPage: Record<string, string> = {
    LOGISTIQUE: "/services/logistique",
    "BÂTIMENTS - TRAVAUX PUBLICS": "/services/btp",
    GESTION: "/services/gestion",
    DIVERS: "/services/divers",
  };
  const dedicatedLink = dedicatedPage[section.title ?? ""];

  return (
    <section className="bg-surface-alt px-6 py-20">
      <div className="mx-auto max-w-[1140px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading subtitle={section.subtitle} title={section.title} />
          {dedicatedLink && (
            <Link
              href={dedicatedLink}
              className="inline-flex h-[48px] items-center justify-center rounded-full border border-dark px-6 text-sm font-semibold text-dark transition-colors hover:bg-dark hover:text-white"
            >
              Voir la page dédiée
            </Link>
          )}
        </div>

        <div className="mt-10 grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-[4px] bg-white p-5 shadow-[0px_5px_83px_0px_rgba(40,40,40,0.04)] transition-transform duration-300 hover:-translate-y-[5px] md:p-[30px]"
            >
              {service.image && (
                <div className="relative mb-[10px] aspect-4/3 overflow-hidden rounded-[5px] border border-primary">
                  <Image
                    src={strapiMediaUrl(service.image.url)}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="relative z-[2]">
                <h3 className="relative mb-[20px] pb-[18px] font-heading text-[19px] font-bold text-dark transition-colors group-hover:text-white md:text-[22px]">
                  {service.title}
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-border transition-colors group-hover:bg-white" />
                </h3>
                {(service.shortDescription || service.description) && (
                  <p className="text-[14px] leading-[24px] text-body transition-colors group-hover:text-white">
                    {service.shortDescription || service.description}
                  </p>
                )}
              </div>

              {/* Overlay orange (85%) au survol, fidèle à .service__overlay/.bg-overlay-theme */}
              <div className="pointer-events-none absolute inset-0 z-[1] bg-primary/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

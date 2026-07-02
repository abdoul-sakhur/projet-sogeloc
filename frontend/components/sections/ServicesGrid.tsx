import Image from "next/image";
import type { ServicesGridSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";

export default function ServicesGrid({ section }: { section: ServicesGridSection }) {
  const services = [...section.services].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-surface-alt px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading subtitle={section.subtitle} title={section.title} align="center" />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="group relative overflow-hidden bg-white shadow-sm">
              {service.image && (
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={strapiMediaUrl(service.image.url)}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold uppercase text-dark">
                  {service.title}
                </h3>
                {service.shortDescription && (
                  <p className="mt-3 text-sm leading-relaxed text-body">
                    {service.shortDescription}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import type { CertificationsSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Certifications({ section }: { section: CertificationsSection }) {
  if (section.items.length === 0) return null;

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeading subtitle={section.subtitle} title={section.title} align="center" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {section.items.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i, 3) * 100}>
              <div className="flex h-full flex-col items-center gap-4 rounded-[4px] border border-border bg-white p-6 text-center shadow-[0px_5px_83px_0px_rgba(40,40,40,0.04)]">
                {item.logo ? (
                  <div className="relative h-14 w-14 shrink-0">
                    <Image
                      src={strapiMediaUrl(item.logo.url)}
                      alt={item.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface-alt text-primary-ink">
                    <ShieldIcon />
                  </div>
                )}
                <div>
                  <p className="font-heading text-[15px] font-bold text-dark">{item.label}</p>
                  {item.description && (
                    <p className="mt-1 text-[13px] leading-[20px] text-body">{item.description}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2 4 5v6c0 5 3.4 8.9 8 10 4.6-1.1 8-5 8-10V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

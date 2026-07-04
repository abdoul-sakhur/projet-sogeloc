import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/types";
import { fetchServices, fetchSettings, strapiMediaUrl } from "@/lib/api";
import { FALLBACK_SETTINGS } from "@/lib/constants";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ContactForm from "@/components/sections/ContactForm";

export default async function CategoryLandingPage({
  category,
  heroTitle,
  heroDescription,
  offersDescription,
  contactHeading,
  contactDescription,
  heroIcon = "building",
}: {
  category: Service["category"];
  heroTitle: string;
  heroDescription: string;
  offersDescription: string;
  contactHeading: string;
  contactDescription: string;
  heroIcon?: "truck" | "building" | "chart" | "grid";
}) {
  const [services, settings] = await Promise.all([
    fetchServices(category).catch(() => []),
    fetchSettings().catch(() => null),
  ]);

  const email = settings?.email || FALLBACK_SETTINGS.email;
  const phone = settings?.phone || FALLBACK_SETTINGS.phone;
  const highlights = services.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-surface px-6 py-16 md:py-20">
        <div className="mx-auto max-w-[1140px]">
          <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-10">
            <h1 className="font-heading text-[32px] font-bold leading-tight text-dark md:text-[46px]">
              {heroTitle}
            </h1>
            <p className="text-[16px] leading-[27px] text-body md:pt-2">{heroDescription}</p>
          </div>

          <div className="relative mt-10 aspect-[16/6] w-full overflow-hidden rounded-[4px] bg-gradient-to-br from-primary-alt via-primary to-dark">
            <div className="absolute inset-0 flex items-center justify-center text-white/80">
              {heroIcon === "truck" && <TruckIcon />}
              {heroIcon === "building" && <BuildingIcon />}
              {heroIcon === "chart" && <ChartIcon />}
              {heroIcon === "grid" && <GridIcon />}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <MailIcon />
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-dark"
            >
              <PhoneIcon />
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Bandeau offres */}
      {highlights.length > 0 && (
        <section className="bg-dark px-6 py-16">
          <div className="mx-auto grid max-w-[1140px] gap-10 md:grid-cols-[280px_1fr] md:items-center">
            <div>
              <span className="block font-heading text-[15px] font-bold uppercase text-primary">
                Nos prestations
              </span>
              <p className="mt-3 text-[14px] leading-[24px] text-white/80">{offersDescription}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {highlights.map((service, i) => (
                <div key={service.id} className="rounded-[4px] bg-white p-6 shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-alt text-primary">
                    <OfferIcon index={i} />
                  </div>
                  <h3 className="font-heading text-[17px] font-bold text-dark">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="mt-2 text-[14px] leading-[22px] text-body">
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Rangées alternées image / texte */}
      {services.length > 0 && (
        <section className="px-6 py-20">
          <div className="mx-auto flex max-w-[1140px] flex-col gap-16">
            {services.map((service, i) => {
              const imageBlock = (
                <div className="relative aspect-4/3 overflow-hidden rounded-[4px]">
                  {service.image ? (
                    <Image
                      src={strapiMediaUrl(service.image.url)}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </div>
              );

              const textBlock = (
                <div>
                  <span className="block font-sans text-[14px] font-bold text-primary">
                    Nos prestations
                  </span>
                  <h3 className="mt-2 font-heading text-[24px] font-bold text-dark">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="mt-3 text-[15px] leading-[24px] text-body">
                      {service.description}
                    </p>
                  )}
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex h-[48px] items-center justify-center rounded-full border border-dark px-6 text-sm font-semibold text-dark transition-colors hover:bg-dark hover:text-white"
                  >
                    En savoir plus
                  </Link>
                </div>
              );

              return (
                <div key={service.id} className="grid items-center gap-8 md:grid-cols-2">
                  {i % 2 === 0 ? (
                    <>
                      {imageBlock}
                      {textBlock}
                    </>
                  ) : (
                    <>
                      {textBlock}
                      {imageBlock}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Bandeau contact */}
      <section className="bg-dark px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1140px] gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-heading text-[28px] font-bold text-white md:text-[36px]">
              {contactHeading}
            </h2>
            <p className="mt-4 text-[15px] leading-[24px] text-white/80">{contactDescription}</p>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="mt-6 inline-flex h-[55px] items-center justify-center rounded-[3px] bg-primary px-8 text-sm font-bold capitalize tracking-wide text-white transition-colors hover:bg-primary-hover"
            >
              Nous contacter
            </a>
          </div>

          <div className="rounded-[4px] bg-white p-8">
            <h3 className="font-heading text-[20px] font-bold text-dark">Demandez un devis</h3>
            <p className="mt-2 text-sm text-body">
              Décrivez-nous votre besoin, notre équipe vous répond dans les meilleurs délais.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TruckIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M1 3h13v13H1z" />
      <path d="M14 8h4l3 3v5h-7V8Z" />
      <circle cx="5.5" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 21V6l8-3 8 3v15" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 10h.01M9 14h.01M15 10h.01M15 14h.01" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 4v16h16" />
      <path d="M8 16V10M13 16V7M18 16v-4" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7 10-7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

function OfferIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 3h13v13H1z" />
        <path d="M14 8h4l3 3v5h-7V8Z" />
        <circle cx="5.5" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 10 12 4l9 6" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2h9l3 3v17H6z" />
      <path d="M15 2v3h3" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}

import type { ContactSection as ContactSectionType } from "@/lib/types";
import { fetchSettings } from "@/lib/api";
import { FALLBACK_SETTINGS } from "@/lib/constants";
import ContactForm from "./ContactForm";

export default async function ContactSection({ section }: { section: ContactSectionType }) {
  const settings = await fetchSettings().catch(() => null);
  const phone = settings?.phone || FALLBACK_SETTINGS.phone;
  const email = settings?.email || FALLBACK_SETTINGS.email;
  const address = settings?.address || FALLBACK_SETTINGS.address;
  const hours = settings?.hours || FALLBACK_SETTINGS.hours;
  const lat = settings?.mapLat ?? 5.3489182;
  const lng = settings?.mapLng ?? -3.9798831;

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {section.title && (
          <h2 className="text-center font-heading text-3xl font-bold text-dark md:text-4xl">
            {section.title}
          </h2>
        )}
        {section.description && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-body">{section.description}</p>
        )}

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <ul className="space-y-3 text-sm text-body">
              <li>
                <span className="font-heading font-semibold text-dark">Adresse : </span>
                {address}
              </li>
              <li>
                <span className="font-heading font-semibold text-dark">E-mail : </span>
                <a href={`mailto:${email}`} className="hover:text-primary">
                  {email}
                </a>
              </li>
              <li>
                <span className="font-heading font-semibold text-dark">Téléphone : </span>
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-primary">
                  {phone}
                </a>
              </li>
              <li>
                <span className="font-heading font-semibold text-dark">Horaires : </span>
                {hours}
              </li>
            </ul>

            {section.showMap && (
              <div className="mt-8 aspect-4/3 w-full overflow-hidden">
                <iframe
                  title="Localisation ARTEMIS"
                  className="h-full w-full border-0"
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&marker=${lat}%2C${lng}&layer=mapnik`}
                />
              </div>
            )}
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

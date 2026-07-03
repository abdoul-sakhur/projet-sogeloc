import Link from "next/link";
import { fetchSettings } from "@/lib/api";
import { FALLBACK_SETTINGS, NAV_LINKS } from "@/lib/constants";

const SOCIAL_ICONS = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "twitter", label: "Twitter" },
  { key: "linkedin", label: "LinkedIn" },
] as const;

export default async function Footer() {
  const settings = await fetchSettings().catch(() => null);
  const phone = settings?.phone || FALLBACK_SETTINGS.phone;
  const phoneSecondary = settings?.phoneSecondary || FALLBACK_SETTINGS.phoneSecondary;
  const email = settings?.email || FALLBACK_SETTINGS.email;
  const address = settings?.address || FALLBACK_SETTINGS.address;
  const hours = settings?.hours || FALLBACK_SETTINGS.hours;
  const siteName = settings?.siteName || FALLBACK_SETTINGS.siteName;
  const footerText = settings?.footerText || FALLBACK_SETTINGS.footerText;
  const socialLinks = SOCIAL_ICONS.map((icon) => ({
    ...icon,
    href: settings?.social?.[icon.key],
  })).filter((icon) => icon.href);

  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <h3 className="font-heading text-2xl font-bold">{siteName}</h3>
          <p className="mt-3 text-sm text-body">{footerText}</p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-primary">
            Contact
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-body">
            <li>{address}</li>
            <li>
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-primary">
                {phone}
              </a>
            </li>
            {phoneSecondary && (
              <li>
                <a href={`tel:${phoneSecondary.replace(/\s+/g, "")}`} className="hover:text-primary">
                  {phoneSecondary}
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${email}`} className="hover:text-primary">
                {email}
              </a>
            </li>
            {hours && <li>{hours}</li>}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-primary">
            Navigation
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-body">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {socialLinks.length > 0 && (
            <ul className="mt-6 flex gap-4">
              {socialLinks.map((icon) => (
                <li key={icon.key}>
                  <a
                    href={icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={icon.label}
                    className="text-body hover:text-primary"
                  >
                    {icon.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-body">
        © {new Date().getFullYear()} {siteName}. Tous droits réservés.
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { fetchSettings, strapiMediaUrl } from "@/lib/api";
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
    <footer>
      <div className="border-t border-border bg-white px-6 pt-[50px] pb-[40px] md:pt-[70px]">
        <div className="mx-auto grid max-w-[1140px] gap-10 md:grid-cols-3">
          <div>
            {settings?.logo ? (
              <Image
                src={strapiMediaUrl(settings.logo.url)}
                alt={siteName}
                width={140}
                height={48}
                className="h-10 w-auto"
              />
            ) : (
              <h3 className="font-heading text-2xl font-bold text-dark">{siteName}</h3>
            )}
            <p className="mt-3 text-[14px] text-body">{footerText}</p>

            {socialLinks.length > 0 && (
              <ul className="mt-6 flex gap-[9px]">
                {socialLinks.map((icon) => (
                  <li key={icon.key}>
                    <a
                      href={icon.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={icon.label}
                      className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-dark text-[13px] font-bold text-white transition-colors hover:bg-primary"
                    >
                      {icon.label.charAt(0)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h4 className="font-heading text-[17px] font-bold text-dark">Contact</h4>
            <ul className="mt-[20px] space-y-[11px] text-[14px] text-body">
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
            <h4 className="font-heading text-[17px] font-bold text-dark">Navigation</h4>
            <ul className="mt-[20px] space-y-[11px] text-[14px] text-body">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-dark px-6 py-[20px] text-center text-xs text-body">
        © {new Date().getFullYear()} {siteName}. Tous droits réservés.
      </div>
    </footer>
  );
}

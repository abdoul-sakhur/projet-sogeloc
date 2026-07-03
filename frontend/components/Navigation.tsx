import Link from "next/link";
import Image from "next/image";
import { fetchSettings, strapiMediaUrl } from "@/lib/api";
import { FALLBACK_SETTINGS, NAV_LINKS } from "@/lib/constants";
import MobileNavToggle from "./MobileNavToggle";

export default async function Navigation() {
  const settings = await fetchSettings().catch(() => null);
  const phone = settings?.phone || FALLBACK_SETTINGS.phone;
  const phoneSecondary = settings?.phoneSecondary || FALLBACK_SETTINGS.phoneSecondary;
  const siteName = settings?.siteName || FALLBACK_SETTINGS.siteName;

  return (
    <header className="relative z-50 border-b border-border bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          {settings?.logo ? (
            <Image
              src={strapiMediaUrl(settings.logo.url)}
              alt={siteName}
              width={140}
              height={48}
              className="h-10 w-auto"
            />
          ) : (
            <span className="font-heading text-2xl font-bold text-dark">{siteName}</span>
          )}
        </Link>

        <nav className="hidden md:flex md:items-center">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 font-heading text-sm font-semibold tracking-wide text-dark transition-colors hover:text-primary ${
                i > 0 ? "border-l border-border" : "pl-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <span className="text-primary">
            <PhoneIcon />
          </span>
          <div className="flex flex-col text-right font-heading text-sm font-semibold text-dark">
            <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-primary">
              {phone}
            </a>
            {phoneSecondary && (
              <a href={`tel:${phoneSecondary.replace(/\s+/g, "")}`} className="hover:text-primary">
                {phoneSecondary}
              </a>
            )}
          </div>
        </div>

        <MobileNavToggle />
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

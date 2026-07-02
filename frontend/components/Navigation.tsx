import Link from "next/link";
import Image from "next/image";
import { fetchSettings, strapiMediaUrl } from "@/lib/api";
import { FALLBACK_SETTINGS, NAV_LINKS } from "@/lib/constants";
import MobileNavToggle from "./MobileNavToggle";

export default async function Navigation() {
  const settings = await fetchSettings().catch(() => null);
  const phone = settings?.phone || FALLBACK_SETTINGS.phone;
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

        <nav className="hidden md:flex md:items-center md:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-sm font-semibold tracking-wide text-dark transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="hidden font-heading text-sm font-semibold text-dark md:block"
        >
          {phone}
        </a>

        <MobileNavToggle />
      </div>
    </header>
  );
}

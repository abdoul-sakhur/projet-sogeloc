"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";
import MobileNavToggle from "./MobileNavToggle";

const SCROLL_THRESHOLD = 80;

export default function HeaderShell({
  logoUrl,
  siteName,
  phone,
  phoneSecondary,
}: {
  logoUrl?: string;
  siteName: string;
  phone: string;
  phoneSecondary?: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const opaque = scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        opaque ? "border-b border-border bg-white shadow-[0_3px_4px_rgba(0,0,0,0.07)]" : "border-b border-white/15 bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[80px] max-w-[1140px] items-center justify-between px-6 md:h-[100px]">
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={siteName}
              width={140}
              height={48}
              className="h-10 w-auto"
            />
          ) : (
            <span
              className={`font-heading text-2xl font-bold ${opaque ? "text-dark" : "text-white"}`}
            >
              {siteName}
            </span>
          )}
        </Link>

        <NavLinks transparent={!opaque} />

        <div className="hidden items-center gap-3 md:flex">
          <span
            className={`flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 ${
              opaque ? "border-dark/25 text-dark" : "border-white/30 text-white"
            }`}
          >
            <PhoneIcon />
          </span>
          <div
            className={`flex flex-col text-right font-heading text-[20px] font-medium leading-tight ${
              opaque ? "text-dark" : "text-white"
            }`}
          >
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

        <MobileNavToggle light={!opaque} />
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

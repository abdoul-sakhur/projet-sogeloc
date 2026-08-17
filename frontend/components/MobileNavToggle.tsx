"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function MobileNavToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-0.5 w-6 bg-dark transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span className={`h-0.5 w-6 bg-dark transition-opacity ${open ? "opacity-0" : ""}`} />
        <span
          className={`h-0.5 w-6 bg-dark transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full flex flex-col bg-white shadow-lg">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-border px-6 py-4 font-heading text-sm font-semibold text-dark hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

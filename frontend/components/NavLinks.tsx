"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import LinkPendingIndicator from "@/components/LinkPendingIndicator";

export default function NavLinks({ transparent }: { transparent: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex md:items-center">
      {NAV_LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative mr-[30px] font-sans text-[15px] font-bold capitalize tracking-[0.4px] transition-colors last:mr-0 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-primary after:transition-transform after:duration-300 after:content-[''] ${
              active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
            } ${transparent ? "text-white" : "text-dark"}`}
          >
            {link.label}
            <LinkPendingIndicator size={11} />
          </Link>
        );
      })}
    </nav>
  );
}

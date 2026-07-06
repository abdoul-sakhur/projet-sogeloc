import Link from "next/link";
import type { DomainsGridSection } from "@/lib/types";
import SectionHeading from "@/components/SectionHeading";

const DOMAINS = [
  {
    title: "Bâtiments - Travaux Publics",
    description: "Construction de bâtiments, routes et ponts.",
    href: "/services/btp",
    icon: "building",
  },
  {
    title: "Logistique",
    description: "Transport, douane, dédouanement, stockage.",
    href: "/services/logistique",
    icon: "truck",
  },
  {
    title: "Gestion",
    description: "Biens immobiliers, projets, ressources humaines, administration.",
    href: "/services/gestion",
    icon: "chart",
  },
  {
    title: "Divers",
    description: "Création d'entreprise, événementiel, nettoyage, agence de voyages.",
    href: "/services/divers",
    icon: "grid",
  },
] as const;

export default function DomainsGrid({ section }: { section: DomainsGridSection }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeading
          subtitle={section.subtitle || "Nos activités"}
          title={section.title || "Nos domaines d'intervention"}
        />

        <div className="mt-10 grid gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
          {DOMAINS.map((domain) => (
            <Link
              key={domain.href}
              href={domain.href}
              className="group block rounded-[4px] bg-white p-8 shadow-[0px_5px_83px_0px_rgba(40,40,40,0.06)] transition-transform duration-300 hover:-translate-y-[5px]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-alt text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <DomainIcon icon={domain.icon} />
              </div>
              <h3 className="mt-6 font-heading text-[19px] font-bold text-dark">
                {domain.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[22px] text-body">{domain.description}</p>
              <span className="mt-4 inline-block text-[13px] font-bold text-primary">
                En savoir plus →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DomainIcon({ icon }: { icon: (typeof DOMAINS)[number]["icon"] }) {
  if (icon === "building") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 21V6l8-3 8 3v15" />
        <path d="M9 21v-6h6v6" />
        <path d="M9 10h.01M9 14h.01M15 10h.01M15 14h.01" />
      </svg>
    );
  }
  if (icon === "truck") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 3h13v13H1z" />
        <path d="M14 8h4l3 3v5h-7V8Z" />
        <circle cx="5.5" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </svg>
    );
  }
  if (icon === "chart") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4v16h16" />
        <path d="M8 16V10M13 16V7M18 16v-4" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  );
}

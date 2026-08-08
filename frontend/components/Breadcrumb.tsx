import Link from "next/link";
import { breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo";

export default function Breadcrumb({
  items,
  offsetForFixedHeader = false,
}: {
  items: BreadcrumbItem[];
  /**
   * Set when this can end up as the very first element on the page (e.g. a
   * hero section that's conditionally rendered). The header is `fixed` (see
   * HeaderShell.tsx, h-[80px] / md:h-[100px]) and overlaps content instead of
   * pushing it down, so whatever renders first must compensate itself.
   */
  offsetForFixedHeader?: boolean;
}) {
  const jsonLd = breadcrumbJsonLd(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Fil d'Ariane"
        className={`bg-white px-6 pb-3 ${offsetForFixedHeader ? "pt-[104px] md:pt-[124px]" : "pt-4"}`}
      >
        <ol className="mx-auto flex max-w-[1140px] flex-wrap items-center gap-1.5 text-xs text-body">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-primary-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-dark">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

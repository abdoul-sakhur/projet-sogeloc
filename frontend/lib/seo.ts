import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sogeloc.com";

/**
 * Builds canonical + Open Graph metadata for a page. `path` is the site-relative
 * route (e.g. "/apropos"); it's resolved against metadataBase (set in the root
 * layout) for both the canonical link and the OG url. Next.js falls back to
 * these openGraph values for Twitter Card tags when `twitter` isn't set.
 *
 * `image` should be an absolute URL (e.g. from strapiMediaUrl()) when the page
 * has one of its own (project/article cover); otherwise pages fall back to the
 * site logo set in the root layout's openGraph.images, which Next.js does NOT
 * inherit once a child route sets its own openGraph object — so every page
 * must supply an image explicitly to keep a "summary_large_image" Twitter card.
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Builds a BreadcrumbList JSON-LD object from a page's breadcrumb trail. */
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

export function pageMetadata(
  path: string,
  title: string,
  description?: string,
  image?: string
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

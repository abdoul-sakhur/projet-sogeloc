import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sogeloc.com";

/**
 * Builds canonical + Open Graph metadata for a page. `path` is the site-relative
 * route (e.g. "/apropos"); it's resolved against metadataBase (set in the root
 * layout) for both the canonical link and the OG url. Next.js falls back to
 * these openGraph values for Twitter Card tags when `twitter` isn't set.
 */
export function pageMetadata(
  path: string,
  title: string,
  description?: string
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

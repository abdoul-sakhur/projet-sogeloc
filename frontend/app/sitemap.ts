import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sogeloc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/apropos", "/services", "/contact"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}

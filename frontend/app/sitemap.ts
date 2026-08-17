import type { MetadataRoute } from "next";
import { fetchArticles, fetchProjects } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";

// Fetches Strapi content directly, independent of the root layout's route
// config — needs its own override so `next build` doesn't try (and fail) to
// prerender this when Strapi isn't reachable at build time (see layout.tsx).
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/apropos",
    "/services",
    "/services/btp",
    "/services/logistique",
    "/services/gestion",
    "/services/divers",
    "/projets",
    "/actualites",
    "/contact",
  ];

  const [projects, articles] = await Promise.all([
    fetchProjects().catch(() => []),
    fetchArticles().catch(() => []),
  ]);

  const dynamicRoutes = [
    ...projects.map((project) => `/projets/${project.slug}`),
    ...articles.map((article) => `/actualites/${article.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}

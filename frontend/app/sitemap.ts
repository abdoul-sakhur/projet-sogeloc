import type { MetadataRoute } from "next";
import { fetchArticles, fetchProjects } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";

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

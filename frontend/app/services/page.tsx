import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPage, fetchSettings, strapiMediaUrl } from "@/lib/api";
import PageBuilder from "@/components/PageBuilder";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    fetchPage("services").catch(() => null),
    fetchSettings().catch(() => null),
  ]);
  return {
    ...pageMetadata(
      "/services",
      page?.seo?.metaTitle || page?.title || "Nos services | SOGELOC",
      page?.seo?.metaDescription ||
        "SOGELOC intervient en Bâtiments et Travaux Publics, Logistique, Gestion et services complémentaires : découvrez l'ensemble de notre offre.",
      settings?.logo ? strapiMediaUrl(settings.logo.url) : undefined
    ),
    keywords: page?.seo?.metaKeywords,
  };
}

export default async function ServicesPage() {
  const page = await fetchPage("services").catch(() => null);
  if (!page) notFound();

  return <PageBuilder sections={page.sections} />;
}

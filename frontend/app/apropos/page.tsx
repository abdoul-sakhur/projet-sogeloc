import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPage, fetchSettings, strapiMediaUrl } from "@/lib/api";
import PageBuilder from "@/components/PageBuilder";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    fetchPage("apropos").catch(() => null),
    fetchSettings().catch(() => null),
  ]);
  return {
    ...pageMetadata(
      "/apropos",
      page?.seo?.metaTitle || page?.title || "À propos | SOGELOC",
      page?.seo?.metaDescription ||
        "Découvrez SOGELOC, entreprise ivoirienne de Bâtiments et Travaux Publics, Logistique et Gestion : notre histoire, nos valeurs et notre savoir-faire.",
      settings?.logo ? strapiMediaUrl(settings.logo.url) : undefined
    ),
    keywords: page?.seo?.metaKeywords,
  };
}

export default async function AproposPage() {
  const page = await fetchPage("apropos").catch(() => null);
  if (!page) notFound();

  return (
    <PageBuilder
      sections={page.sections}
      breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Présentation" }]}
    />
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPage } from "@/lib/api";
import PageBuilder from "@/components/PageBuilder";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage("apropos").catch(() => null);
  return {
    ...pageMetadata(
      "/apropos",
      page?.seo?.metaTitle || page?.title || "À propos | SOGELOC",
      page?.seo?.metaDescription ||
        "Découvrez SOGELOC, entreprise ivoirienne de Bâtiments et Travaux Publics, Logistique et Gestion : notre histoire, nos valeurs et notre savoir-faire."
    ),
    keywords: page?.seo?.metaKeywords,
  };
}

export default async function AproposPage() {
  const page = await fetchPage("apropos").catch(() => null);
  if (!page) notFound();

  return <PageBuilder sections={page.sections} />;
}

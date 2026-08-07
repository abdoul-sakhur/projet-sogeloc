import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPage, fetchSettings, strapiMediaUrl } from "@/lib/api";
import PageBuilder from "@/components/PageBuilder";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    fetchPage("contact").catch(() => null),
    fetchSettings().catch(() => null),
  ]);
  return {
    ...pageMetadata(
      "/contact",
      page?.seo?.metaTitle || page?.title || "Contact | SOGELOC",
      page?.seo?.metaDescription ||
        "Contactez SOGELOC pour vos projets de Bâtiments et Travaux Publics, Logistique ou Gestion : téléphone, email, adresse et formulaire de contact.",
      settings?.logo ? strapiMediaUrl(settings.logo.url) : undefined
    ),
    keywords: page?.seo?.metaKeywords,
  };
}

export default async function ContactPage() {
  const page = await fetchPage("contact").catch(() => null);
  if (!page) notFound();

  return <PageBuilder sections={page.sections} />;
}

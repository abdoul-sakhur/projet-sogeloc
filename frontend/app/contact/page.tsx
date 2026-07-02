import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPage } from "@/lib/api";
import PageBuilder from "@/components/PageBuilder";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage("contact").catch(() => null);
  return {
    title: page?.seo?.metaTitle || page?.title || "Contact | ARTEMIS Construction & Travaux",
    description: page?.seo?.metaDescription,
    keywords: page?.seo?.metaKeywords,
  };
}

export default async function ContactPage() {
  const page = await fetchPage("contact").catch(() => null);
  if (!page) notFound();

  return <PageBuilder sections={page.sections} />;
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPage } from "@/lib/api";
import PageBuilder from "@/components/PageBuilder";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage("home").catch(() => null);
  return {
    title: page?.seo?.metaTitle || page?.title || "ARTEMIS Construction & Travaux",
    description: page?.seo?.metaDescription,
    keywords: page?.seo?.metaKeywords,
  };
}

export default async function HomePage() {
  const page = await fetchPage("home").catch(() => null);
  if (!page) notFound();

  return <PageBuilder sections={page.sections} />;
}

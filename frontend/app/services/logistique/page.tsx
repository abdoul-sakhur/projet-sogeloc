import type { Metadata } from "next";
import CategoryLandingPage from "@/components/CategoryLandingPage";
import { pageMetadata } from "@/lib/seo";
import { fetchSettings, strapiMediaUrl } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings().catch(() => null);
  return pageMetadata(
    "/services/logistique",
    "Logistique | SOGELOC",
    "Transport, dédouanement, entreposage et gestion de stock : SOGELOC prend en charge l'ensemble de votre chaîne logistique.",
    settings?.logistiqueHeroImage
      ? strapiMediaUrl(settings.logistiqueHeroImage.url)
      : settings?.logo
        ? strapiMediaUrl(settings.logo.url)
        : undefined
  );
}

export default function LogistiquePage() {
  return (
    <CategoryLandingPage
      category="logistique"
      heroTitle="Votre logistique entre de bonnes mains"
      heroDescription="De l'acheminement à la livraison, en passant par le dédouanement et le stockage, SOGELOC prend en charge l'ensemble de votre chaîne logistique avec des solutions fiables et adaptées à vos besoins."
      offersDescription="Des solutions logistiques fiables, pensées pour accompagner vos marchandises à chaque étape."
      contactHeading="Une solution logistique sur mesure pour votre activité"
      contactDescription="Décrivez-nous votre besoin, notre équipe vous répond rapidement pour construire ensemble la solution la plus adaptée."
    />
  );
}

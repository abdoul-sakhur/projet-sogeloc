import type { Metadata } from "next";
import CategoryLandingPage from "@/components/CategoryLandingPage";
import { pageMetadata } from "@/lib/seo";
import { fetchSettings, strapiMediaUrl } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings().catch(() => null);
  return pageMetadata(
    "/services/gestion",
    "Gestion | SOGELOC",
    "Gestion de biens immobiliers, de projets, des ressources humaines et administrative : SOGELOC gère vos activités avec rigueur et efficacité.",
    settings?.gestionHeroImage
      ? strapiMediaUrl(settings.gestionHeroImage.url)
      : settings?.logo
        ? strapiMediaUrl(settings.logo.url)
        : undefined
  );
}

export default function GestionPage() {
  return (
    <CategoryLandingPage
      category="gestion"
      heroTitle="Une gestion rigoureuse pour des activités sereines"
      heroDescription="Biens immobiliers, projets, ressources humaines et administration : SOGELOC prend en charge la gestion de vos activités avec rigueur, transparence et efficacité."
      offersDescription="Des solutions de gestion fiables, pensées pour vous libérer du quotidien opérationnel."
      contactHeading="Confiez-nous la gestion de votre activité"
      contactDescription="Décrivez-nous votre besoin, notre équipe vous répond rapidement pour construire ensemble la solution la plus adaptée."
    />
  );
}

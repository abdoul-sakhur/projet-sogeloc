import type { Metadata } from "next";
import CategoryLandingPage from "@/components/CategoryLandingPage";

export const metadata: Metadata = {
  title: "Divers | SOGELOC",
  description:
    "Création d'entreprise, événementiel, nettoyage, agence de voyages : SOGELOC vous accompagne au-delà du BTP, de la logistique et de la gestion.",
};

export default function DiversPage() {
  return (
    <CategoryLandingPage
      category="divers"
      heroTitle="Des services complémentaires à votre écoute"
      heroDescription="Création d'entreprise, événementiel, nettoyage, agence de voyages : SOGELOC met aussi son savoir-faire au service de vos besoins ponctuels ou récurrents."
      offersDescription="Des prestations variées, avec la même exigence de qualité et de sérieux."
      contactHeading="Un besoin particulier ? Parlons-en"
      contactDescription="Décrivez-nous votre besoin, notre équipe vous répond rapidement pour construire ensemble la solution la plus adaptée."
    />
  );
}

import type { Metadata } from "next";
import CategoryLandingPage from "@/components/CategoryLandingPage";

export const metadata: Metadata = {
  title: "Logistique | SOGELOC",
  description:
    "Transport, dédouanement, entreposage et gestion de stock : SOGELOC prend en charge l'ensemble de votre chaîne logistique.",
};

export default function LogistiquePage() {
  return (
    <CategoryLandingPage
      category="logistique"
      heroIcon="truck"
      heroTitle="Votre logistique entre de bonnes mains"
      heroDescription="De l'acheminement à la livraison, en passant par le dédouanement et le stockage, SOGELOC prend en charge l'ensemble de votre chaîne logistique avec des solutions fiables et adaptées à vos besoins."
      offersDescription="Des solutions logistiques fiables, pensées pour accompagner vos marchandises à chaque étape."
      contactHeading="Une solution logistique sur mesure pour votre activité"
      contactDescription="Décrivez-nous votre besoin, notre équipe vous répond rapidement pour construire ensemble la solution la plus adaptée."
    />
  );
}

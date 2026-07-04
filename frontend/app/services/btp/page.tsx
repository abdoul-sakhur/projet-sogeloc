import type { Metadata } from "next";
import CategoryLandingPage from "@/components/CategoryLandingPage";

export const metadata: Metadata = {
  title: "Bâtiments - Travaux Publics | SOGELOC",
  description:
    "Construction de bâtiments, routes et ponts : SOGELOC réalise vos projets de Bâtiments et Travaux Publics de la conception à la livraison.",
};

export default function BtpPage() {
  return (
    <CategoryLandingPage
      category="btp"
      heroIcon="building"
      heroTitle="Bâtir vos projets, du premier plan à la livraison"
      heroDescription="Construction de bâtiments, routes et ponts : SOGELOC accompagne entreprises et particuliers à chaque étape de leurs projets de Bâtiments et Travaux Publics, avec exigence et savoir-faire."
      offersDescription="Des réalisations solides et durables, pensées pour répondre aux besoins de nos clients."
      contactHeading="Un projet de construction ? Parlons-en"
      contactDescription="Décrivez-nous votre besoin, notre équipe vous répond rapidement pour construire ensemble la solution la plus adaptée."
    />
  );
}

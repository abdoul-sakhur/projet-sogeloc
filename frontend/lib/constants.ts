export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Artemis", href: "/apropos" },
  { label: "Nos Services", href: "/services" },
  { label: "Nos Projets", href: "/projets" },
  { label: "Notre Equipe", href: "/equipe" },
  { label: "Nous Contacter", href: "/contact" },
] as const;

// Valeurs affichées tant que Strapi Site Settings n'a pas encore été renseigné
// (voir CONTENU_EXTRAIT.md section 6).
export const FALLBACK_SETTINGS = {
  siteName: "ARTEMIS",
  phone: "+225 27 22 46 90 37",
  email: "infos@artemisconstruction-ci.com",
  address: "08 Bp 2553 ABJ 08, Abidjan, Cocody - Riviéra Jardin",
  hours: "Lun - Ven: 08h00 – 18h30",
  footerText: "Filiale du GROUPE KAYDAN",
};

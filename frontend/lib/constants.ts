export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Présentation", href: "/apropos" },
  { label: "Nos Services", href: "/services" },
  { label: "Réalisations", href: "/projets" },
  { label: "Actualités", href: "/actualites" },
  { label: "Nous Contacter", href: "/contact" },
] as const;

// Valeurs affichées tant que Strapi Site Settings n'a pas encore été renseigné
// (voir memory sogeloc_company_info pour la source).
export const FALLBACK_SETTINGS = {
  siteName: "SOGELOC",
  phone: "+225 07 89 469 362",
  phoneSecondary: "+225 05 64 231 818",
  email: "contact@sogeloc.com",
  address: "27 Bp 1067 ABJ 27, Cocody Angré, Angré Djerogobite 1",
  hours: "",
  footerText: "Avec nous, réalisez vos projets !",
};

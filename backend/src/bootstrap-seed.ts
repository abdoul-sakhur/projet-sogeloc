import type { Core } from '@strapi/strapi';

const DIACRITICS_PATTERN = new RegExp('[̀-ͯ]', 'g');

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(DIACRITICS_PATTERN, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const SEEDED_COLLECTIONS = [
  'api::hero-slide.hero-slide',
  'api::service.service',
  'api::project.project',
  'api::team-member.team-member',
] as const;

async function clearExistingContent(strapi: Core.Strapi) {
  for (const uid of SEEDED_COLLECTIONS) {
    const entries = await strapi.documents(uid as any).findMany({});
    for (const entry of entries) {
      await strapi.documents(uid as any).delete({ documentId: entry.documentId });
    }
  }

  const pages = await strapi.documents('api::page.page').findMany({});
  for (const page of pages) {
    await strapi.documents('api::page.page').delete({ documentId: page.documentId });
  }

  const settings = await strapi.documents('api::site-settings.site-setting').findFirst({});
  if (settings) {
    await strapi.documents('api::site-settings.site-setting').delete({ documentId: settings.documentId });
  }
}

/**
 * Seeds SOGELOC's real content (provided by the client 2026-07-03, see
 * sogeloc_company_info memory / conversation history). Replaces the earlier
 * ARTEMIS Construction & Travaux placeholder content that was used only as a
 * structural/design reference when this Next.js + Strapi stack was scaffolded.
 * Idempotent: skipped once Site Settings already reports siteName "SOGELOC",
 * so it never overwrites content edited afterwards in the admin.
 */
export default async function seed({ strapi }: { strapi: Core.Strapi }) {
  const currentSettings = await strapi.documents('api::site-settings.site-setting').findFirst({});
  if (currentSettings?.siteName === 'SOGELOC') return;

  strapi.log.info('[seed] Replacing placeholder content with real SOGELOC content...');
  await clearExistingContent(strapi);

  const heroSlides = await Promise.all(
    [
      {
        title: 'Avec nous, réalisez vos projets !',
        description: 'BTP - LOGISTIQUE - GESTION',
        order: 1,
      },
    ].map((data) => strapi.documents('api::hero-slide.hero-slide').create({ data, status: 'published' }))
  );

  const serviceDefs = [
    // BTP
    {
      title: 'Construction de bâtiments',
      category: 'btp' as const,
      description: 'Réalisation de projets de construction de bâtiments pour entreprises et particuliers.',
      order: 1,
    },
    {
      title: 'Construction de routes et ponts',
      category: 'btp' as const,
      description: 'Création, bitumage et réparation de routes et ponts.',
      order: 2,
    },
    {
      title: 'Ameublement',
      category: 'btp' as const,
      description: "Fourniture et installation de mobilier dans le cadre de vos projets de construction.",
      order: 3,
    },
    // Logistique
    {
      title: 'Transport et livraison',
      category: 'logistique' as const,
      description:
        'Transport et livraison de fournitures industrielles, produits miniers, produits dangereux, conteneurs et colis lourds.',
      order: 4,
    },
    {
      title: 'Commissionnaire agréé en douane',
      category: 'logistique' as const,
      description:
        "Documents d'importation et d'exportation de marchandises, dédouanement à l'import-export, dégroupage.",
      order: 5,
    },
    {
      title: 'Dédouanement',
      category: 'logistique' as const,
      description: 'Courrier express, Supply Chain Solution, Cargo Express, expédition.',
      order: 6,
    },
    {
      title: 'Approvisionnement',
      category: 'logistique' as const,
      description: 'Approvisionnement en matières premières et fournitures.',
      order: 7,
    },
    {
      title: 'Gestion de stock',
      category: 'logistique' as const,
      description: 'Suivi et gestion de vos stocks.',
      order: 8,
    },
    // Gestion
    {
      title: 'Gestion de biens immobiliers',
      category: 'gestion' as const,
      description: 'Gestion complète de biens immobiliers pour le compte de nos clients.',
      order: 9,
    },
    {
      title: 'Promotion immobilière',
      category: 'gestion' as const,
      description: "Accompagnement dans la conception et la commercialisation de programmes immobiliers.",
      order: 10,
    },
    {
      title: 'Gestion de projets',
      category: 'gestion' as const,
      description: 'Pilotage et coordination de vos projets, du démarrage à la livraison.',
      order: 11,
    },
    {
      title: 'Gestion des ressources humaines et matérielles',
      category: 'gestion' as const,
      description: 'Gestion des ressources humaines et matérielles nécessaires à vos activités.',
      order: 12,
    },
    {
      title: 'Gestion administrative et financière',
      category: 'gestion' as const,
      description: 'Gestion administrative et financière de vos structures et projets.',
      order: 13,
    },
    // Divers
    {
      title: "Création d'entreprise",
      category: 'divers' as const,
      description: "Accompagnement complet pour la formalisation et le lancement d'activités.",
      order: 14,
    },
    {
      title: 'Événementiel',
      category: 'divers' as const,
      description: "Organisation et gestion d'événements professionnels ou privés.",
      order: 15,
    },
    {
      title: 'Service de nettoyage',
      category: 'divers' as const,
      description: 'Entretien de locaux professionnels et résidentiels.',
      order: 16,
    },
    {
      title: 'Agence de voyages',
      category: 'divers' as const,
      description:
        "Billetterie et conseil, service de réservation hôtel/voiture, organisation de séminaires et congrès, assurance voyage.",
      order: 17,
    },
  ];

  const services = await Promise.all(
    serviceDefs.map((data) =>
      strapi.documents('api::service.service').create({
        data: { ...data, slug: slugify(data.title) },
        status: 'published',
      })
    )
  );

  const byCategory = (category: (typeof serviceDefs)[number]['category']) =>
    services.filter((_, i) => serviceDefs[i].category === category).map((s) => s.id);

  await strapi.documents('api::site-settings.site-setting').create({
    data: {
      siteName: 'SOGELOC',
      siteDescription:
        "Société de Gestion, de Logistique et de Construction — entreprise privée de droit ivoirien intervenant en Bâtiments et Travaux Publics, Immobilier, Prestations logistiques et Gestion de biens et services.",
      phone: '+225 07 89 469 362',
      phoneSecondary: '+225 05 64 231 818',
      email: 'contact@sogeloc.com',
      address: '27 Bp 1067 ABJ 27, Cocody Angré, Angré Djerogobite 1 (près du lycée univers roi des rois)',
      // Coordonnées approximatives du quartier Cocody Angré, Abidjan — à affiner
      // avec la localisation précise du siège (voir memory sogeloc_company_info).
      mapLat: 5.3897,
      mapLng: -3.9639,
      footerText: 'Avec nous, réalisez vos projets !',
    },
  });

  await strapi.documents('api::page.page').create({
    data: {
      title: 'Accueil',
      slug: 'home',
      seo: {
        metaTitle: 'SOGELOC — BTP, Logistique, Gestion',
        metaDescription:
          "SOGELOC, Société de Gestion, de Logistique et de Construction. Avec nous, réalisez vos projets !",
      },
      sections: [
        { __component: 'sections.hero', slides: heroSlides.map((s) => s.id) },
        {
          __component: 'sections.about',
          subtitle: 'Présentation',
          title: 'Qui sommes-nous ?',
          content:
            "La Société de Gestion, de Logistique et de Construction (Sogeloc) est une entreprise privée de droit ivoirien, conçue pour réaliser des services moyens et d'envergure en matière de Bâtiments et Travaux Publics (BTP), Immobilier, Prestations logistiques, Gestion de biens et services, Fournitures en matériels informatiques, bureautiques et industriels, et divers.\n\nNotre engagement : la satisfaction de nos clients sous le prisme de l'efficacité, la célérité et la performance. Fort de notre savoir-faire et de notre expertise, la qualité du travail bien fait est au centre de nos valeurs.",
          cta: { label: 'Tout savoir', link: '/apropos', style: 'secondary' },
        },
        {
          __component: 'sections.services-grid',
          subtitle: 'Nos activités',
          title: 'Nos domaines d’intervention',
          services: services.map((s) => s.id),
        },
        {
          __component: 'sections.contact',
          title: 'NOUS CONTACTER',
          showMap: true,
        },
      ],
    },
    status: 'published',
  });

  await strapi.documents('api::page.page').create({
    data: {
      title: 'À propos',
      slug: 'apropos',
      seo: { metaTitle: 'À propos | SOGELOC' },
      sections: [
        {
          __component: 'sections.page-title',
          subtitle: 'SOGELOC',
          title: 'Avec nous, réalisez vos projets !',
        },
        {
          __component: 'sections.about',
          subtitle: 'Présentation',
          title: 'BTP - Logistique - Gestion',
          content:
            "La Société de Gestion, de Logistique et de Construction (Sogeloc) est une entreprise privée de droit ivoirien, conçue pour réaliser des services moyens et d'envergure en matière de :\n\nBâtiments et Travaux Publics (BTP), Immobilier, Prestations logistiques, Gestion de biens et services, Fournitures en matériels informatiques, bureautiques et industriels, et divers.\n\nNotre engagement est la satisfaction de nos clients sous le prisme de l'efficacité, la célérité et la performance. Fort de notre savoir-faire et de notre expertise, la qualité du travail bien fait est au centre de nos valeurs. Notre entreprise, sous l'effet du modernisme, n'échappe pas à la transition numérique, à l'ère de l'intelligence artificielle.",
        },
      ],
    },
    status: 'published',
  });

  await strapi.documents('api::page.page').create({
    data: {
      title: 'Nos services',
      slug: 'services',
      seo: { metaTitle: 'Nos services | SOGELOC' },
      sections: [
        {
          __component: 'sections.page-title',
          subtitle: 'Nos services',
          title: 'Des services complets pour tous vos projets',
        },
        {
          __component: 'sections.services-grid',
          title: 'BÂTIMENTS - TRAVAUX PUBLICS',
          services: byCategory('btp'),
        },
        {
          __component: 'sections.services-grid',
          title: 'LOGISTIQUE',
          services: byCategory('logistique'),
        },
        {
          __component: 'sections.services-grid',
          title: 'GESTION',
          services: byCategory('gestion'),
        },
        {
          __component: 'sections.services-grid',
          title: 'DIVERS',
          services: byCategory('divers'),
        },
      ],
    },
    status: 'published',
  });

  await strapi.documents('api::page.page').create({
    data: {
      title: 'Contact',
      slug: 'contact',
      seo: { metaTitle: 'Contact | SOGELOC' },
      sections: [
        {
          __component: 'sections.page-title',
          subtitle: 'Contact',
          title: 'Parlons de votre projet',
        },
        {
          __component: 'sections.contact',
          title: 'Nous Contacter',
          description:
            "Une question, un projet ? Contactez-nous, notre équipe vous répond dans les meilleurs délais.",
          showMap: true,
        },
      ],
    },
    status: 'published',
  });

  strapi.log.info('[seed] Done seeding SOGELOC content.');
}

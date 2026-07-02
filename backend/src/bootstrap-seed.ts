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

/**
 * Seeds initial content extracted from the scraped ARTEMIS Construction & Travaux
 * site (see CONTENU_EXTRAIT.md at the repo root). Runs once: skipped as soon as a
 * Page entry already exists, so it never overwrites content edited in the admin.
 * Media fields are left empty — the source images were not present in the scrape
 * and must be uploaded manually (see CONTENU_EXTRAIT.md section 5/7 "Points d'attention").
 */
const SEEDED_COLLECTIONS = [
  'api::hero-slide.hero-slide',
  'api::service.service',
  'api::project.project',
  'api::team-member.team-member',
  'api::site-settings.site-setting',
] as const;

async function clearPartialSeed(strapi: Core.Strapi) {
  for (const uid of SEEDED_COLLECTIONS) {
    const entries = await strapi.documents(uid as any).findMany({});
    for (const entry of entries) {
      await strapi.documents(uid as any).delete(entry.documentId);
    }
  }
}

export default async function seed({ strapi }: { strapi: Core.Strapi }) {
  const existingPages = await strapi.documents('api::page.page').count({});
  if (existingPages > 0) return;

  // A previous run may have crashed mid-way (e.g. missing required field) and left
  // orphaned hero-slides/services/projects/etc. behind even though no Page exists yet.
  await clearPartialSeed(strapi);

  strapi.log.info('[seed] Seeding initial ARTEMIS content...');

  const heroSlides = await Promise.all(
    [
      {
        title: 'Simplifier la complexité',
        description:
          "La réalisation des travaux est assurée par des techniciens de grandes expériences dans le domaine selectionnés avec soin dans le but de fournir un travail répondant aux attentes.",
        order: 1,
      },
      {
        title: "Bâtir l'avenir en toute quiétude!",
        description:
          "Fournir un service moderne et fiable par des solutions originales et efficaces en misant sur un esprit d'excellence et sur la responsabilisation de ses ressources.",
        order: 2,
      },
      {
        title: 'Livrer ce qui est planifié',
        description:
          "Grâce à une stratégie qui a fait ses preuves et un esprit d'excellence, ARTEMIS CONSTRUCTION & TRAVAUX est en mesure de rendre l'impossible ... possible.",
        order: 3,
      },
    ].map((data) => strapi.documents('api::hero-slide.hero-slide').create({ data, status: 'published' }))
  );

  const serviceDefs = [
    {
      title: 'BATIMENT',
      category: 'service' as const,
      shortDescription: 'Constructions neuves, Réhabilitation de Bâtiments',
      description:
        "ARTEMIS assure la mise en oeuvre et la réalisation de batiment pour des entreprises et des particuliers, tout en respectant les normes requises afin de satisfaire sa clientèle.",
      order: 1,
    },
    {
      title: 'ROUTES',
      category: 'service' as const,
      shortDescription: 'Routes Bitumées, Routes en terre',
      description:
        "ARTEMIS contribue chaque année à améliorer la qualité du réseau et des infrastructures routières. De la voirie communale à l'autoroute, en passant par les pistes villageoises dans le domaine public ou privé.",
      order: 2,
    },
    {
      title: 'VOIRIES ET RESEAUX DIVERS',
      category: 'service' as const,
      shortDescription: 'Raccordements et branchements de terrains viabilisés',
      description:
        "C'est le rassemblement des différents raccordements et branchements réalisés sur un terrain pour qu'il soit viabilisé. Cela désigne aussi la mise en place des diverses voies permettant à un territoire d'être desservi par les différents réseaux routiers, d'assainissement, d'eau, d'électricité, de télécommunication.",
      order: 3,
    },
    {
      title: 'GENIE CIVIL',
      category: 'service' as const,
      shortDescription: 'Ouvrages d\'art, industriels et commerciaux',
      description:
        "ARTEMIS génie civil réalise des chantiers complexes sur l'étendue du territoire : ouvrages d'art, industriels et commerciaux, travaux souterrains, assainissement, réhabilitation de bâtiments.",
      order: 4,
    },
    {
      title: 'CONSTRUCTION',
      category: 'service' as const,
      shortDescription: "Accompagnement à chaque étape de vos projets",
      description:
        "Maîtres d'ouvrage, constructeurs, investisseurs, propriétaires ou gestionnaires de parcs immobiliers, ARTEMIS vous accompagne à chaque étape de vos projets de construction puis tout au long du cycle de vie de vos bâtiments.",
      order: 5,
    },
    {
      title: 'INFRASTRUCTURES DE TRANSPORTS',
      category: 'service' as const,
      shortDescription: 'Construction et entretien des infrastructures routières',
      description:
        "La construction et l'entretien des infrastructures routières constituent un domaine de prédilection de notre entreprise. Ainsi, nous réalisons des routes et assurons l'entretien quelque soit la nature.",
      order: 6,
    },
    {
      title: 'ETUDES',
      category: 'intervention' as const,
      shortDescription: "Études technico-économiques, DAO",
      description:
        "ARTEMIS CONSTRUCTION & TRAVAUX réalise diverses études en Génie civil notamment des études technico-économiques de faisabilité de projet de Génie civil, les études techniques d'exécution, établissement des DAO.",
      order: 7,
    },
    {
      title: 'REALISATION DES TRAVAUX',
      category: 'intervention' as const,
      shortDescription: 'Bâtiment, travaux publics, VRD',
      description:
        "ARTEMIS CONSTRUCTION & TRAVAUX assure la réalisation des travaux de bâtiment, travaux publics et Voirie et réseaux divers. Nous disposons d'une ressource humaine jeune et dynamique dévoué à l'accomplissement de ces travaux.",
      order: 8,
    },
    {
      title: 'ENCADREMENT – OPC',
      category: 'intervention' as const,
      shortDescription: 'Ordonnancement, Pilotage et Coordination',
      description:
        "ARTEMIS CONSTRUCTION & TRAVAUX assiste ses clients dans la mise en œuvre de leurs projets. ARTEMIS CONSTRUCTION & TRAVAUX assure également l'Ordonnancement, le Pilotage et la Coordination dans le cadre de la gestion de projets.",
      order: 9,
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

  const projectDefs = [
    {
      title: 'Symphonia',
      categories: ['Construction', 'Immobilier'],
      description:
        'Travaux de construction de 84 Villas Duplex sur 300 et 600 m2 et 14 immeubles R+1 et 1,5km de voirie pour le compte de KAYDAN REAL ESTATE',
      client: 'KAYDAN REAL ESTATE',
      location: 'Cocody Faya',
      servicesText: 'Réalisation des travaux',
      order: 1,
    },
    {
      title: 'Redstone',
      categories: ['Construction', 'Immobilier'],
      description:
        "Travaux de construction d'un immeuble R+3 à usage d'habitation à Cocody Riviera – GENIE 2000",
      client: 'Particulier',
      location: 'Cocody Riviera',
      servicesText: 'Etude et réalisation des travaux',
      order: 2,
    },
    {
      title: 'Callisto-etoile',
      categories: ['Construction', 'Immobilier'],
      description: 'Travaux de construction de 74 Villas Duplex',
      client: 'KAYDAN REAL ESTATE',
      location: 'Cocody Faya',
      servicesText: 'Réalisation des travaux',
      order: 3,
    },
    {
      title: 'Symphonium',
      categories: ['Construction'],
      description:
        'Travaux de construction 5 immeubles R+2 dont 16 Magasins et 20 Appartements de 3 pièces.',
      client: 'KAYDAN REAL ESTATE',
      servicesText: 'Réalisation des travaux',
      order: 4,
    },
  ];

  const projects = await Promise.all(
    projectDefs.map((data) =>
      strapi.documents('api::project.project').create({
        data: { ...data, slug: slugify(data.title) },
        status: 'published',
      })
    )
  );

  const teamDefs = [
    { firstName: 'Tiémoko', lastName: 'DIOMANDE', position: 'Directeur Général', order: 1 },
    { firstName: 'Eric', lastName: 'OBODJI', position: 'Directeur des Opérations', order: 2 },
    { firstName: 'Abdel Aziz', lastName: 'BAMBA', position: 'Directeur Technique', order: 3 },
    { firstName: 'Aboubacar', lastName: 'DIALLO', position: 'Responsable Bureau Etudes', order: 4 },
  ];

  const teamMembers = await Promise.all(
    teamDefs.map((data) => strapi.documents('api::team-member.team-member').create({ data, status: 'published' }))
  );

  await strapi.documents('api::site-settings.site-setting').create({
    data: {
      siteName: 'ARTEMIS',
      siteDescription:
        "ARTEMIS CONSTRUCTION & TRAVAUX, filiale du groupe KAYDAN, offre une gamme diverse de services en Bâtiments et Travaux Publics en Côte d'Ivoire.",
      phone: '+225 27 22 46 90 37',
      email: 'infos@artemisconstruction-ci.com',
      address: '08 Bp 2553 ABJ 08, Abidjan, Cocody - Riviéra Jardin',
      hours: 'Lun - Ven: 08h00 – 18h30',
      mapLat: 5.3489182,
      mapLng: -3.9798831,
      footerText: 'Filiale du GROUPE KAYDAN',
    },
  });

  const homeCounters = [
    { value: '3', label: 'Projets de bâtiment réalisés' },
    { value: '1', label: 'Projets de voiries et réseaux divers' },
    { value: '0', label: 'Projet de routes' },
    { value: '1', label: "Années d'expérience dans le domaine de la construction" },
  ];

  const aproposCounters = [
    { value: '1', label: 'Projets de bâtiment réalisés' },
    { value: '0', label: 'Projets de voiries et réseaux divers' },
    { value: '0', label: 'Projet de routes' },
    { value: '1', label: "Années d'expérience dans le domaine de la construction" },
  ];

  await strapi.documents('api::page.page').create({
    data: {
      title: 'Accueil',
      slug: 'home',
      seo: {
        metaTitle: 'ARTEMIS Construction & Travaux',
        metaDescription:
          "Bâtir l'avenir en toute quiétude. ARTEMIS Construction & Travaux, filiale du groupe KAYDAN.",
      },
      sections: [
        { __component: 'sections.hero', slides: heroSlides.map((s) => s.id) },
        {
          __component: 'sections.about',
          subtitle: 'A propos',
          title: "BATIR L'AVENIR EN TOUTE QUIETUDE…",
          content:
            'Opérationnelle depuis six (06) ans, CONSTRUCTION & TRAVAUX, filiale du groupe KAYDAN, offre une gamme diverse de services en Bâtiments et Travaux Publics.\n\nDans le domaine de la construction en Côte d\'ivoire, notre entreprise fait partie des plus importantes sociétés grâce d\'une part à la qualité de ses services et ses réalisations et d\'autre part à ses partenariats stratégiques aussi bien au plan local qu\'à l\'international.',
          videoUrl: 'https://www.youtube.com/watch?v=aFyvYIJjvUQ',
          videoLabel: 'En vidéo',
          cta: { label: 'Tout savoir', link: '/apropos', style: 'secondary' },
        },
        {
          __component: 'sections.services-grid',
          subtitle: 'Services',
          title: 'Fournir des services modernes et fiables…',
          services: services.map((s) => s.id),
        },
        {
          __component: 'sections.projects-grid',
          subtitle: 'Projets',
          title: "Notre travail est la résultante d'une cohesion et d'une expertise efficace.",
          projects: projects.map((p) => p.id),
        },
        {
          __component: 'sections.stats',
          subtitle: 'Artemis en chiffre.',
          title: "Construire les personnes et les projets qui améliorent l'infrastructure Africaine.",
          counters: homeCounters,
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
      seo: { metaTitle: 'À propos | ARTEMIS Construction & Travaux' },
      sections: [
        {
          __component: 'sections.page-title',
          subtitle: 'A propos de ARTEMIS',
          title: "Construire les personnes et les projets qui améliorent l'infrastructure africaine.",
        },
        {
          __component: 'sections.about',
          title: "BATIR L'AVENIR EN TOUTE QUIETUDE…",
          content:
            "Opérationnelle depuis six (06) ans, ARTEMIS CONSTRUCTION & TRAVAUX, filiale du groupe KAYDAN, offre une gamme diverse de services en Bâtiments et Travaux Publics.\n\nDans le domaine de la construction en Côte d'ivoire, notre entreprise fait partie des plus importantes sociétés grâce d'une part à la qualité de ses services et ses réalisations et d'autre part à ses partenariats stratégiques aussi bien au plan local qu'à l'international.\n\nNotre mission est de fournir à nos clients des services modernes et fiables en leur proposant des solutions originales et efficaces, en misant sur un esprit d'Excellence et sur la responsabilisation de nos ressources.\n\nNotre engagement : Simplifier la complexité et livrer ce qui est planifié.",
          videoUrl: 'https://www.youtube.com/watch?v=aFyvYIJjvUQ',
          videoLabel: 'Regarder notre vidéo',
        },
        {
          __component: 'sections.stats',
          counters: aproposCounters,
        },
      ],
    },
    status: 'published',
  });

  const mainServices = services.filter((_, i) => serviceDefs[i].category === 'service');
  const interventionServices = services.filter((_, i) => serviceDefs[i].category === 'intervention');

  await strapi.documents('api::page.page').create({
    data: {
      title: 'Nos services',
      slug: 'services',
      seo: { metaTitle: 'Nos services | ARTEMIS Construction & Travaux' },
      sections: [
        {
          __component: 'sections.page-title',
          subtitle: 'Nos services',
          title: 'Fournir une qualité de service moderne et fiable.',
        },
        {
          __component: 'sections.services-grid',
          title: 'SERVICES',
          services: mainServices.map((s) => s.id),
        },
        {
          __component: 'sections.services-grid',
          title: "NATURE D'INTERVENTION",
          services: interventionServices.map((s) => s.id),
        },
      ],
    },
    status: 'published',
  });

  await strapi.documents('api::page.page').create({
    data: {
      title: 'Nos projets',
      slug: 'projets',
      seo: { metaTitle: 'Nos projets | ARTEMIS Construction & Travaux' },
      sections: [
        {
          __component: 'sections.page-title',
          subtitle: 'Nos projets',
          title: "Notre travail est la résultante d'une cohesion et d'une expertise efficace.",
        },
        {
          __component: 'sections.projects-grid',
          projects: projects.map((p) => p.id),
        },
      ],
    },
    status: 'published',
  });

  await strapi.documents('api::page.page').create({
    data: {
      title: 'Notre équipe',
      slug: 'equipe',
      seo: { metaTitle: 'Notre équipe | ARTEMIS Construction & Travaux' },
      sections: [
        {
          __component: 'sections.page-title',
          subtitle: 'Notre équipe',
          title: 'Des Experts Travaillant En Étroite Collaboration.',
        },
        {
          __component: 'sections.team-grid',
          members: teamMembers.map((m) => m.id),
        },
      ],
    },
    status: 'published',
  });

  await strapi.documents('api::page.page').create({
    data: {
      title: 'Contact',
      slug: 'contact',
      seo: { metaTitle: 'Contact | ARTEMIS Construction & Travaux' },
      sections: [
        {
          __component: 'sections.contact',
          title: 'Nous Contactez',
          description:
            'Le contrôle complet des produits nous permet de garantir à nos clients les meilleurs prix et services de qualité. Faites nous confiance.',
          showMap: true,
        },
      ],
    },
    status: 'published',
  });

  strapi.log.info('[seed] Done seeding initial ARTEMIS content.');
}

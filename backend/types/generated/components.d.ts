import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_abouts';
  info: {
    displayName: 'About';
    icon: 'information';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videoLabel: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SectionsCertifications extends Struct.ComponentSchema {
  collectionName: 'components_sections_certifications';
  info: {
    displayName: 'Certifications';
    icon: 'shield';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.certification-item', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsContact extends Struct.ComponentSchema {
  collectionName: 'components_sections_contacts';
  info: {
    displayName: 'Contact';
    icon: 'envelop';
  };
  attributes: {
    description: Schema.Attribute.Text;
    showMap: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_banners';
  info: {
    displayName: 'CTA Banner';
    icon: 'picture';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsDomainsGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_domains_grids';
  info: {
    displayName: 'Domains Grid';
    icon: 'th-large';
  };
  attributes: {
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero Slider';
    icon: 'images';
  };
  attributes: {
    slides: Schema.Attribute.Relation<
      'oneToMany',
      'api::hero-slide.hero-slide'
    >;
  };
}

export interface SectionsPageTitle extends Struct.ComponentSchema {
  collectionName: 'components_sections_page_titles';
  info: {
    displayName: 'Page Title Banner';
    icon: 'landscape';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPartnerLogos extends Struct.ComponentSchema {
  collectionName: 'components_sections_partner_logos';
  info: {
    displayName: 'Partner Logos';
    icon: 'picture';
  };
  attributes: {
    logos: Schema.Attribute.Component<'shared.partner-logo', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsProjectsGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_projects_grids';
  info: {
    displayName: 'Projects Grid';
    icon: 'bulletList';
  };
  attributes: {
    featuredOnly: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    projects: Schema.Attribute.Relation<'oneToMany', 'api::project.project'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsServicesGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_grids';
  info: {
    displayName: 'Services Grid';
    icon: 'apps';
  };
  attributes: {
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsStats extends Struct.ComponentSchema {
  collectionName: 'components_sections_stats';
  info: {
    displayName: 'Stats Banner';
    icon: 'chartCircle';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    counters: Schema.Attribute.Component<'shared.counter-item', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTeamGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_team_grids';
  info: {
    displayName: 'Team Grid';
    icon: 'user';
  };
  attributes: {
    members: Schema.Attribute.Relation<
      'oneToMany',
      'api::team-member.team-member'
    >;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials';
  info: {
    displayName: 'Testimonials';
    icon: 'message';
  };
  attributes: {
    subtitle: Schema.Attribute.String;
    testimonials: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    title: Schema.Attribute.String;
  };
}

export interface SharedCertificationItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_certification_items';
  info: {
    displayName: 'Certification Item';
    icon: 'shield';
  };
  attributes: {
    description: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    logo: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedCounterItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_counter_items';
  info: {
    displayName: 'Counter Item';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_ctas';
  info: {
    displayName: 'CTA';
    icon: 'cursor';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    style: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedPartnerLogo extends Struct.ComponentSchema {
  collectionName: 'components_shared_partner_logos';
  info: {
    displayName: 'Partner Logo';
    icon: 'picture';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaKeywords: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
  };
}

export interface SharedSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Links';
    icon: 'earth';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    linkedin: Schema.Attribute.String;
    twitter: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.about': SectionsAbout;
      'sections.certifications': SectionsCertifications;
      'sections.contact': SectionsContact;
      'sections.cta-banner': SectionsCtaBanner;
      'sections.domains-grid': SectionsDomainsGrid;
      'sections.hero': SectionsHero;
      'sections.page-title': SectionsPageTitle;
      'sections.partner-logos': SectionsPartnerLogos;
      'sections.projects-grid': SectionsProjectsGrid;
      'sections.services-grid': SectionsServicesGrid;
      'sections.stats': SectionsStats;
      'sections.team-grid': SectionsTeamGrid;
      'sections.testimonials': SectionsTestimonials;
      'shared.certification-item': SharedCertificationItem;
      'shared.counter-item': SharedCounterItem;
      'shared.cta': SharedCta;
      'shared.partner-logo': SharedPartnerLogo;
      'shared.seo': SharedSeo;
      'shared.social-links': SharedSocialLinks;
    }
  }
}

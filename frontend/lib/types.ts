export interface Media {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface Cta {
  id: number;
  label: string;
  link: string;
  style: "primary" | "secondary";
}

export interface CounterItem {
  id: number;
  value: string;
  label: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface HeroSlide {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  backgroundImage?: Media;
  ctaLabel?: string;
  ctaLink?: string;
  order: number;
}

export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  category: "service" | "intervention";
  shortDescription?: string;
  description?: string;
  image?: Media;
  hoverImage?: Media;
  order: number;
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  categories?: string[];
  description?: string;
  client?: string;
  location?: string;
  servicesText?: string;
  status: "en-cours" | "completed";
  coverImage?: Media;
  gallery?: Media[];
  order: number;
}

export interface TeamMember {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  position: string;
  bio?: string;
  image?: Media;
  email?: string;
  phone?: string;
  order: number;
}

interface SectionBase<TComponent extends string> {
  id: number;
  __component: TComponent;
}

export interface PageTitleSection extends SectionBase<"sections.page-title"> {
  subtitle?: string;
  title: string;
  backgroundImage?: Media;
}

export interface HeroSection extends SectionBase<"sections.hero"> {
  slides: HeroSlide[];
}

export interface AboutSection extends SectionBase<"sections.about"> {
  subtitle?: string;
  title: string;
  content?: string;
  image?: Media;
  videoUrl?: string;
  videoLabel?: string;
  cta?: Cta;
}

export interface ServicesGridSection extends SectionBase<"sections.services-grid"> {
  subtitle?: string;
  title?: string;
  services: Service[];
}

export interface ProjectsGridSection extends SectionBase<"sections.projects-grid"> {
  subtitle?: string;
  title?: string;
  featuredOnly: boolean;
  projects: Project[];
}

export interface TeamGridSection extends SectionBase<"sections.team-grid"> {
  subtitle?: string;
  title?: string;
  members: TeamMember[];
}

export interface StatsSection extends SectionBase<"sections.stats"> {
  subtitle?: string;
  title?: string;
  backgroundImage?: Media;
  counters: CounterItem[];
}

export interface ContactSection extends SectionBase<"sections.contact"> {
  title?: string;
  description?: string;
  showMap: boolean;
}

export interface CtaBannerSection extends SectionBase<"sections.cta-banner"> {
  title: string;
  subtitle?: string;
  backgroundImage?: Media;
  cta?: Cta;
}

export type Section =
  | PageTitleSection
  | HeroSection
  | AboutSection
  | ServicesGridSection
  | ProjectsGridSection
  | TeamGridSection
  | StatsSection
  | ContactSection
  | CtaBannerSection;

export interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  seo?: Seo;
  sections: Section[];
}

export interface SiteSettings {
  siteName?: string;
  siteDescription?: string;
  logo?: Media;
  favicon?: Media;
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
  mapLat?: number;
  mapLng?: number;
  social?: SocialLinks;
  footerText?: string;
}

export interface ContactFormInput {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

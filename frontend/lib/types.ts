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
  category: "btp" | "logistique" | "gestion" | "divers";
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
  coverImage?: Media;
  backgroundImage?: Media;
  gallery?: Media[];
  order: number;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  category?: string;
  author?: string;
  excerpt?: string;
  content?: string;
  coverImage?: Media;
  backgroundImage?: Media;
  publishedAt: string;
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

export interface Testimonial {
  id: number;
  documentId: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  quote: string;
  photo?: Media;
  order: number;
}

export interface CertificationItem {
  id: number;
  label: string;
  description?: string;
  logo?: Media;
}

export interface PartnerLogo {
  id: number;
  name: string;
  logo: Media;
  url?: string;
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

export interface DomainsGridSection extends SectionBase<"sections.domains-grid"> {
  subtitle?: string;
  title?: string;
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
  image?: Media;
  cta?: Cta;
}

export interface TestimonialsSection extends SectionBase<"sections.testimonials"> {
  subtitle?: string;
  title?: string;
  testimonials: Testimonial[];
}

export interface CertificationsSection extends SectionBase<"sections.certifications"> {
  subtitle?: string;
  title?: string;
  items: CertificationItem[];
}

export interface PartnerLogosSection extends SectionBase<"sections.partner-logos"> {
  subtitle?: string;
  title?: string;
  logos: PartnerLogo[];
}

export type Section =
  | PageTitleSection
  | HeroSection
  | AboutSection
  | DomainsGridSection
  | ServicesGridSection
  | ProjectsGridSection
  | TeamGridSection
  | StatsSection
  | ContactSection
  | CtaBannerSection
  | TestimonialsSection
  | CertificationsSection
  | PartnerLogosSection;

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
  phoneSecondary?: string;
  email?: string;
  address?: string;
  hours?: string;
  mapLat?: number;
  mapLng?: number;
  social?: SocialLinks;
  footerText?: string;
  btpHeroImage?: Media;
  logistiqueHeroImage?: Media;
  gestionHeroImage?: Media;
  diversHeroImage?: Media;
}

export interface ContactFormInput {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

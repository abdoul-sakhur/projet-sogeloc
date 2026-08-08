import type { Section } from "@/lib/types";
import type { BreadcrumbItem } from "@/lib/seo";
import Breadcrumb from "./Breadcrumb";
import PageTitleBanner from "./sections/PageTitleBanner";
import HeroSlider from "./sections/HeroSlider";
import AboutSection from "./sections/AboutSection";
import DomainsGrid from "./sections/DomainsGrid";
import ServicesGrid from "./sections/ServicesGrid";
import ProjectsGrid from "./sections/ProjectsGrid";
import TeamGrid from "./sections/TeamGrid";
import StatsBanner from "./sections/StatsBanner";
import ContactSection from "./sections/ContactSection";
import CtaBanner from "./sections/CtaBanner";
import Testimonials from "./sections/Testimonials";
import Certifications from "./sections/Certifications";
import PartnerLogos from "./sections/PartnerLogos";
import Reveal from "./Reveal";

export default function PageBuilder({
  sections,
  breadcrumb,
}: {
  sections: Section[];
  /** Rendered right after "sections.page-title", if that section is present. */
  breadcrumb?: BreadcrumbItem[];
}) {
  return (
    <>
      {sections.map((section) => {
        // Strapi assigns component ids per-table, not globally: two sections of
        // different types in the same dynamic zone can share the same `id`.
        const key = `${section.__component}-${section.id}`;

        switch (section.__component) {
          // Bannières au-dessus de la ligne de flottaison : visibles au chargement,
          // pas d'animation d'apparition au scroll.
          case "sections.page-title":
            return (
              <div key={key}>
                <PageTitleBanner section={section} />
                {breadcrumb && <Breadcrumb items={breadcrumb} />}
              </div>
            );
          case "sections.hero":
            return <HeroSlider key={key} section={section} />;
          case "sections.about":
            // AboutSection anime elle-même ses deux colonnes (slide-in gauche/droite).
            return <AboutSection key={key} section={section} />;
          case "sections.domains-grid":
            return (
              <Reveal key={key}>
                <DomainsGrid section={section} />
              </Reveal>
            );
          case "sections.services-grid":
            return (
              <Reveal key={key}>
                <ServicesGrid section={section} />
              </Reveal>
            );
          case "sections.projects-grid":
            return (
              <Reveal key={key}>
                <ProjectsGrid section={section} />
              </Reveal>
            );
          case "sections.team-grid":
            return (
              <Reveal key={key}>
                <TeamGrid section={section} />
              </Reveal>
            );
          case "sections.stats":
            return (
              <Reveal key={key}>
                <StatsBanner section={section} />
              </Reveal>
            );
          case "sections.contact":
            return (
              <Reveal key={key}>
                <ContactSection section={section} />
              </Reveal>
            );
          case "sections.cta-banner":
            return (
              <Reveal key={key}>
                <CtaBanner section={section} />
              </Reveal>
            );
          case "sections.testimonials":
            return (
              <Reveal key={key}>
                <Testimonials section={section} />
              </Reveal>
            );
          case "sections.certifications":
            return (
              <Reveal key={key}>
                <Certifications section={section} />
              </Reveal>
            );
          case "sections.partner-logos":
            return (
              <Reveal key={key}>
                <PartnerLogos section={section} />
              </Reveal>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

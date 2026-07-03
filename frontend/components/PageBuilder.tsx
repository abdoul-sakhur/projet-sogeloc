import type { Section } from "@/lib/types";
import PageTitleBanner from "./sections/PageTitleBanner";
import HeroSlider from "./sections/HeroSlider";
import AboutSection from "./sections/AboutSection";
import ServicesGrid from "./sections/ServicesGrid";
import ProjectsGrid from "./sections/ProjectsGrid";
import TeamGrid from "./sections/TeamGrid";
import StatsBanner from "./sections/StatsBanner";
import ContactSection from "./sections/ContactSection";
import CtaBanner from "./sections/CtaBanner";

export default function PageBuilder({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section) => {
        // Strapi assigns component ids per-table, not globally: two sections of
        // different types in the same dynamic zone can share the same `id`.
        const key = `${section.__component}-${section.id}`;

        switch (section.__component) {
          case "sections.page-title":
            return <PageTitleBanner key={key} section={section} />;
          case "sections.hero":
            return <HeroSlider key={key} section={section} />;
          case "sections.about":
            return <AboutSection key={key} section={section} />;
          case "sections.services-grid":
            return <ServicesGrid key={key} section={section} />;
          case "sections.projects-grid":
            return <ProjectsGrid key={key} section={section} />;
          case "sections.team-grid":
            return <TeamGrid key={key} section={section} />;
          case "sections.stats":
            return <StatsBanner key={key} section={section} />;
          case "sections.contact":
            return <ContactSection key={key} section={section} />;
          case "sections.cta-banner":
            return <CtaBanner key={key} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}

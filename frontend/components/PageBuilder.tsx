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
        switch (section.__component) {
          case "sections.page-title":
            return <PageTitleBanner key={section.id} section={section} />;
          case "sections.hero":
            return <HeroSlider key={section.id} section={section} />;
          case "sections.about":
            return <AboutSection key={section.id} section={section} />;
          case "sections.services-grid":
            return <ServicesGrid key={section.id} section={section} />;
          case "sections.projects-grid":
            return <ProjectsGrid key={section.id} section={section} />;
          case "sections.team-grid":
            return <TeamGrid key={section.id} section={section} />;
          case "sections.stats":
            return <StatsBanner key={section.id} section={section} />;
          case "sections.contact":
            return <ContactSection key={section.id} section={section} />;
          case "sections.cta-banner":
            return <CtaBanner key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}

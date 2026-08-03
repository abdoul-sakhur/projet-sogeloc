import type { StatsSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function StatsBanner({ section }: { section: StatsSection }) {
  return (
    <section
      className="relative bg-cover bg-fixed bg-center px-6 py-24"
      style={
        section.backgroundImage
          ? { backgroundImage: `url(${strapiMediaUrl(section.backgroundImage.url)})` }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-dark/80" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading subtitle={section.subtitle} title={section.title} light align="center" />

        <div className="mt-12 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {section.counters.map((counter, i) => (
            <Reveal key={counter.id} delay={Math.min(i, 3) * 100}>
              <div>
                <p className="font-heading text-4xl font-bold text-primary">{counter.value}</p>
                <p className="mt-2 text-sm text-white">{counter.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

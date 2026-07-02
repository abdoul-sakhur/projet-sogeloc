import type { PageTitleSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";

export default function PageTitleBanner({ section }: { section: PageTitleSection }) {
  return (
    <section
      className="relative flex min-h-[320px] items-center bg-cover bg-center px-6 py-20"
      style={
        section.backgroundImage
          ? { backgroundImage: `url(${strapiMediaUrl(section.backgroundImage.url)})` }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-dark/60" />

      <div className="relative mx-auto max-w-4xl text-white">
        {section.subtitle && (
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-primary">
            {section.subtitle}
          </p>
        )}
        <h1 className="mt-2 font-heading text-3xl font-bold md:text-5xl">{section.title}</h1>
      </div>
    </section>
  );
}

import type { PageTitleSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";

export default function PageTitleBanner({ section }: { section: PageTitleSection }) {
  return (
    <section
      className="relative bg-dark bg-cover bg-center bg-fixed pt-[100px] pb-[50px] px-6 sm:pt-[200px] sm:pb-[100px] lg:pt-[265px] lg:pb-[70px]"
      style={
        section.backgroundImage
          ? { backgroundImage: `url(${strapiMediaUrl(section.backgroundImage.url)})` }
          : undefined
      }
    >
      {/* Voile sombre léger (10%), fidèle à .bg-overlay-2 du thème d'origine */}
      <div className="absolute inset-0 bg-dark/10" />

      <div className="relative mx-auto max-w-[1140px]">
        {section.subtitle && (
          <span className="block font-sans text-[14px] font-bold text-white/90 sm:text-[15px]">
            {section.subtitle}
          </span>
        )}
        <h1 className="mt-[10px] font-heading text-[25px] font-bold text-white sm:mt-[14px] sm:text-[40px]">
          {section.title}
        </h1>
      </div>
    </section>
  );
}

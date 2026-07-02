import Image from "next/image";
import Link from "next/link";
import type { ProjectsGridSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";

export default function ProjectsGrid({ section }: { section: ProjectsGridSection }) {
  const projects = [...section.projects].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-dark px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading subtitle={section.subtitle} title={section.title} light align="center" />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projets/${project.slug}`}
              className="group block overflow-hidden bg-white/5"
            >
              {project.coverImage && (
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={strapiMediaUrl(project.coverImage.url)}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                {project.categories && project.categories.length > 0 && (
                  <p className="font-heading text-xs font-semibold uppercase tracking-wide text-primary">
                    {project.categories.join(", ")}
                  </p>
                )}
                <h3 className="mt-1 font-heading text-lg font-bold text-white">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

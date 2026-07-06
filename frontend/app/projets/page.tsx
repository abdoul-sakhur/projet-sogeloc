import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchProjects, strapiMediaUrl } from "@/lib/api";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Nos réalisations | SOGELOC",
  description: "Galerie photos des réalisations de SOGELOC : chantiers, projets livrés et en cours.",
};

export default async function ProjetsPage() {
  const projects = await fetchProjects().catch(() => []);

  return (
    <>
      <section className="bg-dark px-6 pt-[140px] pb-16 md:pt-[180px] md:pb-20">
        <div className="mx-auto max-w-[1140px]">
          <span className="block font-heading text-[15px] font-bold uppercase text-primary">
            Réalisations
          </span>
          <h1 className="mt-2 font-heading text-[32px] font-bold text-white md:text-[40px]">
            Galerie photos de nos réalisations
          </h1>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1140px]">
          {projects.length === 0 ? (
            <p className="text-body">
              Nos premières réalisations seront bientôt présentées ici. Revenez bientôt !
            </p>
          ) : (
            <div className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projets/${project.slug}`}
                  className="group relative block aspect-4/3 overflow-hidden rounded-[4px]"
                >
                  {project.coverImage ? (
                    <Image
                      src={strapiMediaUrl(project.coverImage.url)}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ImagePlaceholder />
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-dark/80 via-dark/10 to-transparent p-5">
                    {project.categories && project.categories.length > 0 && (
                      <span className="font-sans text-[12px] font-bold text-primary">
                        {project.categories.join(" · ")}
                      </span>
                    )}
                    <h2 className="mt-1 font-heading text-[18px] font-bold text-white">
                      {project.title}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

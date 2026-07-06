import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchProjectBySlug, strapiMediaUrl } from "@/lib/api";
import RichText from "@/components/RichText";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug).catch(() => null);
  return {
    title: project ? `${project.title} | SOGELOC` : "Projet",
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug).catch(() => null);
  if (!project) notFound();

  return (
    <>
      <section
        className="relative flex min-h-[280px] items-center bg-dark bg-cover bg-center px-6 py-16 text-white"
        style={
          project.backgroundImage
            ? { backgroundImage: `url(${strapiMediaUrl(project.backgroundImage.url)})` }
            : undefined
        }
      >
        {project.backgroundImage && <div className="absolute inset-0 bg-dark/50" />}
        <div className="relative mx-auto max-w-4xl">
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-primary">
            Nos projets
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">{project.title}</h1>
          {project.categories && project.categories.length > 0 && (
            <p className="mt-3 text-sm text-body">{project.categories.join(" · ")}</p>
          )}
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {project.gallery.map((image) => (
              <div key={image.id} className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={strapiMediaUrl(image.url)}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="font-heading text-2xl font-bold text-dark">À savoir</h2>
        <RichText content={project.description} className="mt-4 text-body" />

        <dl className="mt-8 grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
          {project.client && (
            <div>
              <dt className="font-heading text-xs font-bold uppercase tracking-wide text-primary">
                Client
              </dt>
              <dd className="mt-1 text-sm text-body">{project.client}</dd>
            </div>
          )}
          {project.location && (
            <div>
              <dt className="font-heading text-xs font-bold uppercase tracking-wide text-primary">
                Localisation
              </dt>
              <dd className="mt-1 text-sm text-body">{project.location}</dd>
            </div>
          )}
          {project.servicesText && (
            <div>
              <dt className="font-heading text-xs font-bold uppercase tracking-wide text-primary">
                Services
              </dt>
              <dd className="mt-1 text-sm text-body">{project.servicesText}</dd>
            </div>
          )}
        </dl>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchArticles, strapiMediaUrl } from "@/lib/api";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Actualités | SOGELOC",
  description: "Suivez l'actualité de SOGELOC : chantiers, vie de l'entreprise et actualités du secteur.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ActualitesPage() {
  const articles = await fetchArticles().catch(() => []);

  return (
    <>
      <section className="bg-dark px-6 pt-[140px] pb-16 md:pt-[180px] md:pb-20">
        <div className="mx-auto max-w-[1140px]">
          <span className="block font-heading text-[15px] font-bold uppercase text-primary">
            Actualités
          </span>
          <h1 className="mt-2 font-heading text-[32px] font-bold text-white md:text-[40px]">
            Les dernières nouvelles de SOGELOC
          </h1>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1140px]">
          {articles.length === 0 ? (
            <p className="text-body">Aucun article publié pour l&apos;instant. Revenez bientôt.</p>
          ) : (
            <div className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/actualites/${article.slug}`}
                  className="group block overflow-hidden rounded-[4px] bg-white shadow-[0px_5px_83px_0px_rgba(40,40,40,0.04)] transition-transform duration-300 hover:-translate-y-[5px]"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    {article.coverImage ? (
                      <Image
                        src={strapiMediaUrl(article.coverImage.url)}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <ImagePlaceholder />
                    )}
                  </div>
                  <div className="p-5">
                    {article.category && (
                      <span className="font-sans text-[13px] font-bold text-primary">
                        {article.category}
                      </span>
                    )}
                    <h2 className="mt-2 font-heading text-[18px] font-bold text-dark">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="mt-2 text-[14px] leading-[22px] text-body">{article.excerpt}</p>
                    )}
                    <p className="mt-3 text-[12px] text-body/70">{formatDate(article.publishedAt)}</p>
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchArticleBySlug, fetchArticles, strapiMediaUrl } from "@/lib/api";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import RichText from "@/components/RichText";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sogeloc.com";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug).catch(() => null);
  return {
    title: article ? `${article.title} | SOGELOC` : "Article",
    description: article?.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    fetchArticleBySlug(slug).catch(() => null),
    fetchArticles().catch(() => []),
  ]);

  if (!article) notFound();

  const shareUrl = `${SITE_URL}/actualites/${article.slug}`;
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 6);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    url: shareUrl,
    ...(article.author ? { author: { "@type": "Person", name: article.author } } : {}),
    ...(article.coverImage ? { image: strapiMediaUrl(article.coverImage.url) } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {article.backgroundImage && (
        <section
          className="relative flex min-h-[220px] items-center bg-dark bg-cover bg-center px-6 py-12 text-white"
          style={{ backgroundImage: `url(${strapiMediaUrl(article.backgroundImage.url)})` }}
        >
          <div className="absolute inset-0 bg-dark/50" />
          <div className="relative mx-auto max-w-[1140px]">
            <span className="font-heading text-sm font-bold uppercase tracking-wide text-primary">
              Actualités
            </span>
            <h1 className="mt-2 font-heading text-2xl font-bold md:text-4xl">{article.title}</h1>
          </div>
        </section>
      )}

      <section className="px-6 py-12 md:py-16">
      <div className="mx-auto max-w-[1140px]">
        <Link href="/actualites" className="text-sm font-semibold text-body hover:text-primary">
          ← Retour aux actualités
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px]">
          <article>
            {!article.backgroundImage && (
              <h1 className="font-heading text-[26px] font-bold text-dark md:text-[36px]">
                {article.title}
              </h1>
            )}
            <p className="mt-3 text-[14px] text-body">
              {article.author && <span>{article.author} · </span>}
              {article.category && <span>{article.category} · </span>}
              {formatDate(article.publishedAt)}
            </p>

            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[4px]">
              {article.coverImage ? (
                <Image
                  src={strapiMediaUrl(article.coverImage.url)}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <ImagePlaceholder />
              )}
            </div>

            <div className="mt-6 flex items-center gap-3 border-b border-border pb-6">
              <span className="text-sm font-semibold text-dark">Partager :</span>
              <ShareLinks url={shareUrl} title={article.title} />
            </div>

            <RichText
              content={article.content}
              className="mt-8 text-[16px] leading-[27px] text-body"
            />
          </article>

          <aside>
            <h2 className="font-heading text-[18px] font-bold text-dark">Articles similaires</h2>
            <div className="mt-6 flex flex-col gap-5">
              {relatedArticles.length === 0 && (
                <p className="text-sm text-body">Aucun autre article pour l&apos;instant.</p>
              )}
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/actualites/${related.slug}`}
                  className="group flex gap-3"
                >
                  <div className="relative h-[70px] w-[90px] shrink-0 overflow-hidden rounded-[3px]">
                    {related.coverImage ? (
                      <Image
                        src={strapiMediaUrl(related.coverImage.url)}
                        alt={related.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImagePlaceholder />
                    )}
                  </div>
                  <div>
                    <p className="font-heading text-[14px] font-bold leading-[1.3] text-dark transition-colors group-hover:text-primary">
                      {related.title}
                    </p>
                    {related.category && (
                      <span className="text-[12px] text-body">{related.category}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
      </section>
    </>
  );
}

function ShareLinks({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "E-mail",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  return (
    <ul className="flex gap-2">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Partager sur ${link.label}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-alt text-xs font-bold text-dark transition-colors hover:bg-primary hover:text-white"
          >
            {link.label.charAt(0)}
          </a>
        </li>
      ))}
    </ul>
  );
}

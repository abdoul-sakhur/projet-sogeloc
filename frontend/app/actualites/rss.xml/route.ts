import { fetchArticles } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await fetchArticles().catch(() => []);

  const items = articles
    .map((article) => {
      const url = `${SITE_URL}/actualites/${article.slug}`;
      return `
    <item>
      <title>${escapeXml(article.title.trim())}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      ${article.excerpt ? `<description>${escapeXml(article.excerpt)}</description>` : ""}
      ${article.author ? `<author>${escapeXml(article.author)}</author>` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Actualités SOGELOC</title>
    <link>${SITE_URL}/actualites</link>
    <description>Suivez l'actualité de SOGELOC : chantiers, vie de l'entreprise et actualités du secteur.</description>
    <language>fr</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

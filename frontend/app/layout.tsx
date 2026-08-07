import type { Metadata, Viewport } from "next";
import { Barlow, Roboto } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { API_URL, fetchSettings, strapiMediaUrl } from "@/lib/api";
import { FALLBACK_SETTINGS } from "@/lib/constants";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#030f23",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings().catch(() => null);
  const siteName = settings?.siteName || FALLBACK_SETTINGS.siteName;
  const description = settings?.siteDescription || FALLBACK_SETTINGS.footerText;
  const title = `${siteName} — BTP, Logistique, Gestion`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      siteName,
      locale: "fr_CI",
      type: "website",
      ...(settings?.logo ? { images: [{ url: strapiMediaUrl(settings.logo.url) }] } : {}),
    },
    ...(settings?.favicon
      ? { icons: { icon: strapiMediaUrl(settings.favicon.url) } }
      : {}),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSettings().catch(() => null);
  const siteName = settings?.siteName || FALLBACK_SETTINGS.siteName;
  const phone = settings?.phone || FALLBACK_SETTINGS.phone;
  const email = settings?.email || FALLBACK_SETTINGS.email;
  const address = settings?.address || FALLBACK_SETTINGS.address;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: siteName,
    url: SITE_URL,
    description: settings?.siteDescription || FALLBACK_SETTINGS.footerText,
    telephone: phone,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Abidjan",
      addressCountry: "CI",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings?.mapLat ?? 5.3897,
      longitude: settings?.mapLng ?? -3.9639,
    },
    areaServed: "CI",
    ...(settings?.logo ? { logo: strapiMediaUrl(settings.logo.url), image: strapiMediaUrl(settings.logo.url) } : {}),
  };

  return (
    <html
      lang="fr"
      className={`${barlow.variable} ${roboto.variable} h-full antialiased`}
    >
      <head>
        {/* Les images (hero, services, réalisations...) sont servies depuis l'origine
            Strapi, distincte du frontend : anticiper le handshake DNS/TLS profite
            au LCP, qui est presque toujours une image sur ce site. */}
        <link rel="preconnect" href={API_URL} />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

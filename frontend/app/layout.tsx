import type { Metadata } from "next";
import { Barlow, Roboto } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { fetchSettings, strapiMediaUrl } from "@/lib/api";
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
    "@type": "Organization",
    name: siteName,
    url: SITE_URL,
    description: settings?.siteDescription || FALLBACK_SETTINGS.footerText,
    telephone: phone,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressCountry: "CI",
    },
    ...(settings?.logo ? { logo: strapiMediaUrl(settings.logo.url) } : {}),
  };

  return (
    <html
      lang="fr"
      className={`${barlow.variable} ${roboto.variable} h-full antialiased`}
    >
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

import type { MetadataRoute } from "next";
import { fetchSettings } from "@/lib/api";
import { FALLBACK_SETTINGS } from "@/lib/constants";

// Fetches Strapi content directly, independent of the root layout's route
// config — needs its own override so `next build` doesn't try (and fail) to
// prerender this when Strapi isn't reachable at build time (see layout.tsx).
export const dynamic = "force-dynamic";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await fetchSettings().catch(() => null);
  const siteName = settings?.siteName || FALLBACK_SETTINGS.siteName;

  // Pas d'icônes dédiées (192x192 / 512x512 PNG) fournies pour l'instant — le
  // favicon dynamique de Strapi n'est pas garanti aux tailles attendues par un
  // manifest PWA. À compléter avec un champ `icons` dès que ces fichiers existent.
  return {
    name: `${siteName} — BTP, Logistique, Gestion`,
    short_name: siteName,
    description: settings?.siteDescription || FALLBACK_SETTINGS.footerText,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#030f23",
    lang: "fr",
  };
}

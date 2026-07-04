import { fetchSettings, strapiMediaUrl } from "@/lib/api";
import { FALLBACK_SETTINGS } from "@/lib/constants";
import HeaderShell from "./HeaderShell";

export default async function Navigation() {
  const settings = await fetchSettings().catch(() => null);

  return (
    <HeaderShell
      logoUrl={settings?.logo ? strapiMediaUrl(settings.logo.url) : undefined}
      siteName={settings?.siteName || FALLBACK_SETTINGS.siteName}
      phone={settings?.phone || FALLBACK_SETTINGS.phone}
      phoneSecondary={settings?.phoneSecondary || FALLBACK_SETTINGS.phoneSecondary}
    />
  );
}

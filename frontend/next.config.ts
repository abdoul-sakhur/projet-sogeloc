import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Self-contained server.js + pruned node_modules trace, needed for a lean
  // Docker production image (see frontend/Dockerfile).
  output: "standalone",
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  images: {
    // Next.js refuses to proxy-optimize images whose host resolves to a
    // private/loopback IP (SSRF protection) — that includes "localhost",
    // which is where Strapi runs in dev. It also bites the VPS's own
    // hostname (srv1896005.hstgr.cloud) when accessed *from that same VPS*,
    // since it resolves to 127.0.1.1 there — hence the extra env-driven
    // escape hatch below, set via NEXT_IMAGE_UNOPTIMIZED in frontend/.env.local.
    // Remove once a real domain (not the VPS's own hostname) is in use.
    unoptimized:
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_IMAGE_UNOPTIMIZED === "true",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.sogeloc.com",
        pathname: "/uploads/**",
      },
      // Temporary: VPS accessed directly by its own hostname (behind
      // Traefik on 443, see docker-compose.vps.yml) before a real domain is
      // pointed at it. Remove once *.sogeloc.com is live and
      // NEXT_PUBLIC_STRAPI_API_URL points there.
      {
        protocol: "https",
        hostname: "srv1896005.hstgr.cloud",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

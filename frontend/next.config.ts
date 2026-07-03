import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Next.js refuses to proxy-optimize images whose host resolves to a
    // private/loopback IP (SSRF protection) — that includes "localhost",
    // which is where Strapi runs in dev. Production Strapi will be on a
    // real public domain, so optimization stays on there.
    unoptimized: process.env.NODE_ENV === "development",
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
    ],
  },
};

export default nextConfig;

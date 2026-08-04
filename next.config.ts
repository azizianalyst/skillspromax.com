import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Keep Node-native deps out of the server bundle.
  serverExternalPackages: ["@prisma/client", "nodemailer"],
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // One-pager launch: send old marketing URLs home (expand later).
    const toHome = [
      "/programs",
      "/programs/:slug",
      "/apply",
      "/admissions",
      "/campus",
      "/parents",
      "/contact",
      "/why-us",
      "/outcomes",
      "/promises",
      "/business",
    ];
    return toHome.map((source) => ({
      source,
      destination: "/",
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;

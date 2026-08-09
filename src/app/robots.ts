import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Public one-pager is crawlable; staff/student surfaces stay blocked. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/portal", "/portal/", "/login", "/api/"],
      },
    ],
    sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml`,
    host: site.url.replace(/\/$/, ""),
  };
}

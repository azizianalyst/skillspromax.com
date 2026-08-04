import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/** One-pager launch — index home + legal only. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/refund-policy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

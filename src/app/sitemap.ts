import type { MetadataRoute } from "next";

/** Empty while the site is noindex / nofollow. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}

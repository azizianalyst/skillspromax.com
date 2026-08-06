import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Site-wide noindex / nofollow until launch indexing is approved. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    host: site.url.replace(/\/$/, ""),
  };
}

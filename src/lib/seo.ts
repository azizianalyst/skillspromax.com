import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * One-pager launch helpers. Multi-page / city SEO comes after go-live.
 */

export function absoluteUrl(path: string) {
  const base = site.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const index = opts.index ?? false;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.name,
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
  };
}

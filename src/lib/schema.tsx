import { site, programs, homeFaq } from "@/content/site";

/**
 * Structured data for search and AI assistants.
 * Dubai online launch — no street address / geo pin yet.
 */

export const NAP = {
  legalName: "SkillsProMax",
  telephone: site.phone.display,
  url: site.url,
  email: site.emails.info,
} as const;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "Organization"],
    "@id": `${site.url}/#organization`,
    name: NAP.legalName,
    alternateName: site.name,
    url: site.url,
    telephone: NAP.telephone,
    email: NAP.email,
    description:
      "AI, automation and digital skills training online from Dubai for students worldwide. Live batches, monthly fees in USD, real client work before completion.",
    areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name })),
    knowsAbout: [
      "AI automation",
      "n8n workflow automation",
      "Applied AI",
      "Freelancing",
      "Digital skills training",
    ],
    sameAs: [] as string[],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Programs",
      itemListElement: programs.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: p.name,
          description: p.summary,
          provider: { "@id": `${site.url}/#organization` },
          url: `${site.url}/#programs`,
        },
        price: p.feeMonthly * p.feeMonths,
        priceCurrency: "USD",
        availability:
          p.status === "open"
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
      })),
    },
  };
}

export function courseSchema(slug: string) {
  const p = programs.find((x) => x.slug === slug);
  if (!p) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: p.name,
    description: p.summary,
    url: `${site.url}/#programs`,
    provider: {
      "@type": "EducationalOrganization",
      name: NAP.legalName,
      url: site.url,
    },
    coursePrerequisites: p.entry,
    offers: {
      "@type": "Offer",
      price: p.feeMonthly * p.feeMonths,
      priceCurrency: "USD",
      category: "Tuition",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: p.commitment,
    },
  };
}

export function faqSchema(items: readonly { q: string; a: string }[] = homeFaq.items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

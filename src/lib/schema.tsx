import { site, programs, parents } from "@/content/site";

/**
 * Structured data for local search and AI assistants.
 *
 * Gemini's local answers are grounded in Google Maps data, so these fields
 * must match the Google Business Profile EXACTLY — same name, same address
 * string, same phone, same hours. Any drift weakens both.
 */

/** The canonical NAP. Change it here and nowhere else. */
export const NAP = {
  /** Must match the signboard and the Google Business Profile character for character. */
  legalName: "SkillsProMax Computer & AI Institute",
  streetAddress: `${site.address.landmark}, ${site.address.road}`,
  addressLocality: "Depalpur",
  addressRegion: "Punjab",
  addressCountry: "PK",
  telephone: site.phone.display,
  url: site.url,
} as const;

/**
 * TODO before launch: replace with the real pin.
 * Get it by dropping a pin on the building in Google Maps, right-clicking,
 * and copying the coordinates. Do not guess — a wrong pin sends students
 * to the wrong place and is very hard to correct later.
 */
const GEO = { latitude: 30.6700, longitude: 73.6500, isApproximate: true };

const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "20:00",
  },
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: NAP.legalName,
    alternateName: site.name,
    url: site.url,
    telephone: NAP.telephone,
    email: site.emails.info,
    description:
      "AI, automation and digital skills training in Tehsil Depalpur, District Okara. Separate halls for boys and girls, flexible timings, monthly fees, and real client work before graduation.",
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.streetAddress,
      addressLocality: NAP.addressLocality,
      addressRegion: NAP.addressRegion,
      addressCountry: NAP.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    openingHoursSpecification: openingHours,
    areaServed: [
      "Depalpur",
      "Allahabad",
      "Hujra Shah Muqeem",
      "Basirpur",
      "Okara",
      "Pattoki",
      "Kasur",
      "Sahiwal",
      "Renala Khurd",
    ].map((name) => ({ "@type": "Place", name })),
    knowsAbout: [
      "AI automation",
      "n8n workflow automation",
      "Applied AI",
      "Retrieval augmented generation",
      "Freelancing",
      "Digital skills training",
    ],
    sameAs: [
      // TODO: add Facebook, LinkedIn, YouTube URLs once live.
    ],
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
          url: `${site.url}/programs/${p.slug}`,
        },
        price: p.feeMonthly * p.feeMonths,
        priceCurrency: "PKR",
        availability:
          p.status === "open"
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
      })),
    },
  };
}

/** Course schema for an individual program page. */
export function courseSchema(slug: string) {
  const p = programs.find((x) => x.slug === slug);
  if (!p) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: p.name,
    description: p.summary,
    url: `${site.url}/programs/${p.slug}`,
    provider: {
      "@type": "EducationalOrganization",
      name: NAP.legalName,
      url: site.url,
    },
    educationalCredentialAwarded: "Certificate of completion",
    coursePrerequisites: p.entry,
    offers: {
      "@type": "Offer",
      price: p.feeMonthly * p.feeMonths,
      priceCurrency: "PKR",
      category: "Tuition",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: p.commitment,
      location: {
        "@type": "Place",
        name: NAP.legalName,
        address: {
          "@type": "PostalAddress",
          streetAddress: NAP.streetAddress,
          addressLocality: NAP.addressLocality,
          addressRegion: NAP.addressRegion,
          addressCountry: NAP.addressCountry,
        },
      },
    },
  };
}

/**
 * FAQ schema from the parents page.
 * Answer-first phrasing is what gets extracted into AI answers and
 * Google's "people also ask" — keep the first sentence a direct answer.
 */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: parents.items.map((item) => ({
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

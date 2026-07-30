import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd, organizationSchema } from "@/lib/schema";

/**
 * Public marketing chrome: header, footer, skip link, and the
 * EducationalOrganization JSON-LD. Admin and auth routes are outside this
 * group, so they get their own chrome (see app/admin/layout.tsx).
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <JsonLd data={organizationSchema()} />
    </>
  );
}

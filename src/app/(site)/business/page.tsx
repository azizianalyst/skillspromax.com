import type { Metadata } from "next";
import { business, site } from "@/content/site";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { pageMeta } from "@/lib/seo";

/** Phase-2 SEO — live for enquiries, deferred from first sitemap. */
export const metadata: Metadata = pageMeta({
  title: "Automation for Businesses in Okara",
  description:
    "AI automation for dairy, potato trading, agri dealers, schools and clinics in Okara District. Built locally by SkillsProMax.",
  path: "/business",
  index: false,
});

export default function BusinessPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-14 md:py-20">
          <p className="eyebrow">For local businesses</p>
          <h1 className="display-xl mt-5 max-w-3xl">{business.heading}</h1>
          <p className="lede mt-6 max-w-2xl">{business.body}</p>
        </div>
      </section>

      <section className="border-b border-line bg-sand">
        <div className="shell section">
          <h2 className="display-lg max-w-xl">Where we usually start.</h2>
          <ul className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-3">
            {business.examples.map((e) => (
              <li key={e.title} className="border-t border-line pt-5">
                <h3 className="font-sans text-[0.9375rem] font-semibold tracking-normal text-ink">
                  {e.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{e.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell section">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">How it works</p>
              <h2 className="display-lg mt-5">Two ways to work with us.</h2>

              <div className="mt-9 space-y-8">
                <div className="border-t border-line pt-6">
                  <h3 className="font-display text-xl">Student-built, supervised</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                    Senior students build your system as part of their program, reviewed by
                    an instructor before anything goes live. You get the system at a
                    fraction of city-agency cost; they get real experience. We are open
                    about which projects these are, and we do not put a student on anything
                    business-critical without supervision.
                  </p>
                </div>
                <div className="border-t border-line pt-6">
                  <h3 className="font-display text-xl">Built by our own team</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                    For work that needs to be right the first time. Quoted per project.
                  </p>
                </div>
                <div className="border-t border-line pt-6">
                  <h3 className="font-display text-xl">Training your staff</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                    Half-day or full-day sessions at your premises or at our campus, teaching
                    your own team to use AI properly for the work they already do. From
                    Rs. 40,000 per session depending on size and scope.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="mb-6">
                <h2 className="display-md">{business.cta.heading}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  {business.cta.body} Or call{" "}
                  <a href={site.phone.href} className="text-accent hover:underline">
                    {site.phone.display}
                  </a>
                  .
                </p>
              </div>
              <InquiryForm subjectHint="Business enquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

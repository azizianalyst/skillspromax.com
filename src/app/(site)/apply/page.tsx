import type { Metadata } from "next";
import { ApplicationForm } from "@/components/forms/application-form";
import { site, promises } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Apply for Admission — Free Application",
  description:
    "Apply free to SkillsProMax — Dubai-based online AI and automation training for students worldwide. Monthly fees in USD, entry assessment. No application fee. WhatsApp +971 50 208 3909.",
  path: "/apply",
});

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>;
}) {
  const { program } = await searchParams;

  return (
    <div className="border-b border-line">
      <div className="shell grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Admissions</p>
          <h1 className="display-lg mt-5">Apply for a seat.</h1>
          <p className="lede mt-5">
            It takes about four minutes. There is no application fee, and applying does
            not commit you to anything. Someone will call you within two working days.
          </p>

          <div className="card mt-9 p-6">
            <h2 className="font-sans text-sm font-semibold tracking-normal text-ink">
              What we will tell you on that call
            </h2>
            <ul className="mt-4 space-y-3 text-[0.875rem] leading-relaxed text-ink-2">
              <li>Exactly what the program covers and what it costs each month.</li>
              <li>What our previous students actually earned — the real numbers.</li>
              <li>
                Whether a different program suits you better, or whether a free
                government course is the more sensible choice for your situation.
              </li>
            </ul>
          </div>

          <div className="mt-8 border-t border-line pt-7">
            <h2 className="font-sans text-sm font-semibold tracking-normal text-ink">
              Things we will never do
            </h2>
            <ul className="mt-4 space-y-2.5">
              {promises.slice(0, 4).map((p) => (
                <li key={p} className="flex gap-2.5 text-[0.875rem] leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 border-t border-line pt-7 text-sm leading-relaxed text-muted">
            Prefer to talk first? Call{" "}
            <a href={site.phone.href} className="text-accent hover:underline">
              {site.phone.display}
            </a>{" "}
            or{" "}
            <a href={site.whatsapp.href} className="text-accent hover:underline">
              message us on WhatsApp
            </a>
            . You can also just walk in — {site.address.landmark}, {site.address.road}.
          </p>
        </div>

        <div className="lg:col-span-7">
          <ApplicationForm defaultProgram={program} />
        </div>
      </div>
    </div>
  );
}

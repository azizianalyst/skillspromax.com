import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";
import { campus, site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Campus & Timings — Allahabad Depalpur",
  description:
    "SkillsProMax campus on Depalpur–Kasur Road beside Govt. Associate College for Women, Allahabad. Separate AC halls, morning to evening batches. Visit before you enrol.",
  path: "/campus",
});

export default function CampusPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-14 md:py-20">
          <p className="eyebrow">The campus</p>
          <h1 className="display-xl mt-5 max-w-3xl">{campus.heading}</h1>
          <p className="lede mt-6 max-w-2xl">{campus.body}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/apply" className="btn btn-primary btn-lg">Apply for a seat</Link>
            <a href={site.phone.href} className="btn btn-outline btn-lg">
              <Phone className="size-4" aria-hidden /> Call to visit
            </a>
          </div>
        </div>
      </section>

      {/* Separate halls — headline, not a footnote */}
      <section className="border-b border-line bg-accent-soft">
        <div className="shell section">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="display-lg">
                Boys and girls are taught in separate halls. Always.
              </h2>
              <p className="lede mt-5">
                We have three separate halls. Girls study in their own hall, in their own
                batches, at their own timings, and there is no shared classroom at any
                point in any program. Parents are welcome to visit before enrolling and at
                any time afterwards.
              </p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">
                In this district that arrangement decides whether many families let a
                daughter attend at all. We are not treating it as an accommodation — it is
                how the institute is built.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="card p-7">
                <h3 className="font-display text-xl">Also worth knowing</h3>
                <ul className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-ink-2">
                  <li>Female students may take the midday batch, between college timings.</li>
                  <li>
                    This work can be done from home afterwards — which for many families
                    matters more than anything else on this page.
                  </li>
                  <li>
                    A short walk from Govt. Associate College for Women, Allahabad, on a
                    road your family already knows.
                  </li>
                </ul>
                <Link href="/parents" className="btn btn-outline mt-6 w-full">
                  Information for parents
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="border-b border-line">
        <div className="shell section">
          <h2 className="display-lg max-w-xl">What the building actually has.</h2>
          <ul className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-3">
            {campus.features.map((f) => (
              <li key={f.title} className="border-t border-line pt-5">
                <h3 className="font-sans text-[0.9375rem] font-semibold tracking-normal text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Timings */}
      <section className="border-b border-line bg-sand">
        <div className="shell section">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">
                <Clock className="size-3.5" aria-hidden /> Timings
              </p>
              <h2 className="display-lg mt-5">{campus.timings.heading}</h2>
              <p className="lede mt-5">{campus.timings.body}</p>
            </div>
            <div className="lg:col-span-8">
              <div className="card divide-y divide-line">
                {campus.timings.slots.map((s) => (
                  <div key={s.label} className="grid grid-cols-3 items-baseline gap-4 px-6 py-5">
                    <span className="text-sm font-semibold text-accent">{s.label}</span>
                    <span className="text-sm tnum text-ink">{s.value}</span>
                    <span className="text-sm text-muted">{s.note}</span>
                  </div>
                ))}
              </div>
              <div className="card mt-5 bg-sand-deep p-6">
                <h3 className="font-sans text-sm font-semibold tracking-normal text-ink">
                  Harvest season
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                  {campus.timings.note}
                </p>
              </div>
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                {site.hours.map((h) => (
                  <div key={h.label} className="border-t border-line pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                      {h.label}
                    </dt>
                    <dd className="mt-1 text-sm text-ink">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Getting here */}
      <section className="border-b border-line">
        <div className="shell section">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">
                <MapPin className="size-3.5" aria-hidden /> Finding us
              </p>
              <h2 className="display-lg mt-5">On the Depalpur–Kasur Road.</h2>
              <p className="lede mt-5">
                The easiest landmark is the women&rsquo;s college — we are right beside it.
              </p>
              <address className="mt-8 not-italic text-[1.0625rem] leading-relaxed text-ink">
                {site.address.landmark}
                <br />
                {site.address.road}
                <br />
                {site.address.tehsil}, {site.address.district}
              </address>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={site.phone.href} className="btn btn-primary">
                  <Phone className="size-4" aria-hidden /> {site.phone.display}
                </a>
                <a href={site.whatsapp.href} className="btn btn-outline">
                  WhatsApp for directions
                </a>
              </div>
            </div>
            <div className="card p-7">
              <h3 className="font-display text-xl">Coming from</h3>
              <dl className="mt-5 divide-y divide-line">
                {[
                  ["Depalpur city", "On the Kasur road — ask for the women's college at Allahabad"],
                  ["Okara city", "Via Depalpur, then the Kasur road"],
                  ["Pattoki / Kasur side", "Straight along the Depalpur road"],
                  ["Surrounding villages", "Local transport runs along this road throughout the day"],
                ].map(([from, how]) => (
                  <div key={from} className="grid grid-cols-3 gap-4 py-3.5">
                    <dt className="text-sm font-medium text-ink">{from}</dt>
                    <dd className="col-span-2 text-[0.875rem] leading-relaxed text-muted">{how}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-muted">
                Coming for the first time? Call and we will stay on the phone until you
                find it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

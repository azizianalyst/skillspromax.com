import Link from "next/link";
import { campus } from "@/content/site";

export function CampusPreview() {
  return (
    <section className="border-b border-line bg-sand">
      <div className="shell section">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">The campus</p>
            <h2 className="display-lg mt-5">{campus.heading}</h2>
            <p className="lede mt-5">{campus.body}</p>
            <Link href="/campus" className="btn btn-outline mt-8">
              Campus details and timings
            </Link>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {campus.features.map((f) => (
                <li key={f.title} className="border-t border-line pt-5">
                  <h3 className="font-sans text-sm font-semibold tracking-normal text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">{f.body}</p>
                </li>
              ))}
            </ul>

            {/* Timings */}
            <div className="card mt-10 p-6">
              <h3 className="font-sans text-sm font-semibold tracking-normal text-ink">
                {campus.timings.heading}
              </h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                {campus.timings.body}
              </p>
              <dl className="mt-5 grid gap-4 sm:grid-cols-4">
                {campus.timings.slots.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {s.label}
                    </dt>
                    <dd className="mt-1.5 text-sm text-ink tnum">{s.value}</dd>
                    <dd className="text-xs text-muted">{s.note}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-ink-2">
                {campus.timings.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

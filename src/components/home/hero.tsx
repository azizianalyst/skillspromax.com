import { Check, MessageCircle } from "lucide-react";
import { hero, site } from "@/content/site";

export function Hero() {
  return (
    <section className="border-b border-line">
      <div className="shell grid gap-14 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow">{hero.eyebrow}</p>

          <h1 className="display-xl mt-6">{hero.heading}</h1>

          <p className="lede mt-6 max-w-xl">{hero.body}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href={hero.primary.href} className="btn btn-primary btn-lg">
              {hero.primary.label}
            </a>
            <a href={hero.secondary.href} className="btn btn-outline btn-lg">
              {hero.secondary.label}
            </a>
            <a href={site.whatsapp.href} className="btn btn-ghost btn-lg">
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp
            </a>
          </div>

          <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {hero.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-ink-2">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="card overflow-hidden">
            <div className="border-b border-line bg-sand px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                How you join
              </p>
              <p className="mt-3 font-display text-xl leading-snug">{site.location.label}</p>
              <p className="mt-1 text-sm text-muted">
                Live classes · Small batches · Monthly fees
              </p>
            </div>

            <dl className="divide-y divide-line">
              {[
                ["Format", "Live online — attend from any city in Pakistan"],
                ["Batches", "Separate cohorts for male and female students"],
                ["Size", "Capped groups so your work is reviewed"],
                ["Fees", "Charged monthly, not as one large amount"],
              ].map(([term, detail]) => (
                <div key={term} className="grid grid-cols-3 gap-4 px-6 py-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                    {term}
                  </dt>
                  <dd className="col-span-2 text-sm leading-relaxed text-ink-2">{detail}</dd>
                </div>
              ))}
            </dl>

            <div className="border-t border-line px-6 py-4">
              <a href="/#apply" className="text-sm font-medium text-accent hover:underline">
                Apply free — no fee to apply →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

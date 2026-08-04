import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { programs, workshops, site } from "@/content/site";
import { formatPkr } from "@/lib/utils";

const statusLabel: Record<string, string> = {
  open: "Admissions open",
  waitlist: "Waitlist",
  planned: "Coming soon",
};

function waForProgram(name: string) {
  const text = `Assalam-o-Alaikum, I am interested in ${name} at SkillsProMax.`;
  return `${site.whatsapp.href}?text=${encodeURIComponent(text)}`;
}

export function ProgramCards() {
  return (
    <section id="programs" className="scroll-mt-24 border-b border-line bg-sand">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">Programs</p>
          <h2 className="display-lg mt-5">Start where you actually are.</h2>
          <p className="lede mt-5">
            Four programs on one ladder — not a catalogue of unrelated courses. Complete
            beginners start at Foundation. People already freelancing start at Re-skill.
            People in jobs take Advance in the evenings.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {programs.map((p) => (
            <article key={p.slug} className="card flex flex-col overflow-hidden">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand-deep">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <span
                  className={
                    (p.status === "open" ? "chip chip-accent" : "chip chip-amber") +
                    " absolute right-3 top-3 bg-canvas/95 backdrop-blur-sm"
                  }
                >
                  {statusLabel[p.status]}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="display-md">{p.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{p.audience}</p>

                <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
                  {p.summary}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-faint">Duration</dt>
                    <dd className="mt-1 text-ink">{p.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-faint">Fee</dt>
                    <dd className="mt-1 text-ink tnum">
                      {formatPkr(p.feeMonthly)}
                      <span className="text-muted">/month</span>
                      <span className="block text-xs text-muted">
                        {p.feeMonths} months · {formatPkr(p.feeMonthly * p.feeMonths)} total
                      </span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="/#apply" className="btn btn-primary btn-sm">
                    Apply for this
                  </a>
                  <a href={waForProgram(p.name)} className="btn btn-outline btn-sm">
                    <MessageCircle className="size-3.5" aria-hidden />
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div id="workshops" className="card mt-5 p-7">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h3 className="display-md">{workshops.heading}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{workshops.body}</p>
              <p className="mt-4 font-display text-2xl text-accent tnum">
                {formatPkr(workshops.fee)}
              </p>
              <p className="text-xs text-muted">per workshop · two days</p>
            </div>
            <ul className="grid gap-4 lg:col-span-8 sm:grid-cols-2">
              {workshops.items.map((w) => (
                <li key={w.title} className="border-t border-line pt-4">
                  <h4 className="text-sm font-semibold text-ink">{w.title}</h4>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{w.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

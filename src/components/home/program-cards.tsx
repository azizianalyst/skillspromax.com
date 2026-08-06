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
    <section id="programs" className="scroll-mt-24 border-b border-line bg-panel">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">Programs</p>
          <h2 className="display-lg mt-5">A clear ladder. Not a catalogue.</h2>
          <p className="lede mt-5">
            Four programs on one path. Beginners start at Foundation. Freelancers move to
            Re-skill. Working professionals take Advance in the evenings.{" "}
            <a href="/#skills" className="font-medium text-ink underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
              See every skill module and sub-module
            </a>
            .
          </p>
        </div>

        <div className="mt-16 space-y-6">
          {programs.map((p, index) => (
            <article
              key={p.slug}
              className="grid overflow-hidden border border-line bg-canvas lg:grid-cols-12"
            >
              <div className="relative aspect-[16/11] bg-sand-deep lg:col-span-5 lg:aspect-auto lg:min-h-[18rem]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-center p-7 md:p-10 lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={p.status === "open" ? "chip chip-accent" : "chip chip-amber"}>
                    {statusLabel[p.status]}
                  </span>
                </div>

                <h3 className="display-md mt-4">{p.name}</h3>
                <p className="mt-2 text-sm text-muted">{p.audience}</p>
                <p className="mt-5 max-w-xl text-[0.975rem] leading-relaxed text-ink-2">
                  {p.summary}
                </p>

                <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-faint">Duration</dt>
                    <dd className="mt-1 font-medium text-ink">{p.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-faint">Monthly fee</dt>
                    <dd className="mt-1 font-medium text-ink tnum">
                      {formatPkr(p.feeMonthly)}
                      <span className="font-normal text-muted">
                        {" "}
                        · {p.feeMonths} months
                      </span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-wrap gap-3">
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

        <div id="workshops" className="mt-6 border border-line bg-sand p-7 md:p-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h3 className="display-md">{workshops.heading}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">{workshops.body}</p>
              <p className="mt-6 font-display text-3xl text-ink tnum">
                {formatPkr(workshops.fee)}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                per workshop · two days
              </p>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
              {workshops.items.map((w) => (
                <li key={w.title} className="border-t border-line pt-5">
                  <h4 className="font-display text-lg text-ink">{w.title}</h4>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{w.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

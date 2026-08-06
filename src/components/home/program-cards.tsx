import Image from "next/image";
import { programs, workshops, site } from "@/content/site";
import { formatMoney } from "@/lib/utils";

const statusLabel: Record<string, string> = {
  open: "Open",
  waitlist: "Waitlist",
  planned: "Soon",
};

function waForProgram(name: string) {
  const text = `Assalam-o-Alaikum, I am interested in ${name} at SkillsProMax Dubai.`;
  return `${site.whatsapp.href}?text=${encodeURIComponent(text)}`;
}

export function ProgramCards() {
  return (
    <section id="programs" className="scroll-mt-24 border-b border-line">
      <div className="shell section">
        <div className="max-w-xl">
          <p className="eyebrow">Programs</p>
          <h2 className="display-lg mt-4">Start where you are</h2>
          <p className="lede mt-4">
            Four clear programs.{" "}
            <a href="/#skills" className="font-medium text-accent hover:underline">
              View skill modules
            </a>
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {programs.map((p) => (
            <article key={p.slug} className="card overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden bg-sand-deep">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted">{p.audience}</p>
                  </div>
                  <span className={p.status === "open" ? "chip chip-accent" : "chip chip-amber"}>
                    {statusLabel[p.status]}
                  </span>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-2">{p.summary}</p>
                <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-faint">Monthly</p>
                    <p className="mt-1 text-base font-semibold tnum text-ink">
                      {formatMoney(p.feeMonthly)}
                      <span className="text-sm font-normal text-muted"> · {p.feeMonths} mo</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a href="/#apply" className="btn btn-primary btn-sm">Apply</a>
                    <a href={waForProgram(p.name)} className="btn btn-outline btn-sm">Chat</a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div id="workshops" className="mt-5 card p-5 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-ink">{workshops.heading}</h3>
              <p className="mt-2 max-w-xl text-sm text-muted">{workshops.body}</p>
            </div>
            <p className="text-2xl font-bold tnum text-ink">{formatMoney(workshops.fee)}</p>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {workshops.items.map((w) => (
              <li key={w.title} className="rounded-xl bg-sand px-4 py-3">
                <p className="text-sm font-semibold text-ink">{w.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{w.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

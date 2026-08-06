"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Layers,
  MessageCircle,
  X,
} from "lucide-react";
import { programs, workshops, site, type Program } from "@/content/site";
import { formatMoney } from "@/lib/utils";

const statusLabel: Record<string, string> = {
  open: "Open",
  waitlist: "Waitlist",
  planned: "Soon",
};

const paths = [
  {
    id: "beginner",
    label: "I’m a beginner / student",
    recommend: "foundation",
    hint: "Start with Foundation",
  },
  {
    id: "clients",
    label: "I want client work",
    recommend: "ai-automation-practitioner",
    hint: "Flagship · Practitioner",
  },
  {
    id: "freelancer",
    label: "I’m a freelancer losing rates",
    recommend: "re-skill",
    hint: "Re-skill rebuilds your offer",
  },
  {
    id: "employed",
    label: "I already have a job",
    recommend: "advance",
    hint: "Advance fits evenings",
  },
] as const;

function waForProgram(name: string) {
  const text = `Assalam-o-Alaikum, I am interested in ${name} at SkillsProMax (Dubai-based, online worldwide).`;
  return `${site.whatsapp.href}?text=${encodeURIComponent(text)}`;
}

function ProgramCard({
  program,
  featured,
  recommended,
}: {
  program: Program;
  featured?: boolean;
  recommended?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const moduleCount = program.modules.length;
  const subCount = program.modules.reduce((n, m) => n + m.subModules.length, 0);
  const total = program.feeMonthly * program.feeMonths;

  return (
    <article
      className={
        "card flex flex-col overflow-hidden transition-shadow " +
        (recommended
          ? "ring-2 ring-accent shadow-[0_12px_40px_-24px_rgba(22,127,160,0.55)]"
          : featured
            ? "md:col-span-2 lg:grid lg:grid-cols-2"
            : "")
      }
    >
      <div className={"relative overflow-hidden bg-sand-deep " + (featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[280px]" : "aspect-[16/10]")}>
        <Image
          src={program.image}
          alt={program.name}
          fill
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          className="object-cover"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className={program.status === "open" ? "chip chip-accent bg-white/95" : "chip chip-amber bg-white/95"}>
            {statusLabel[program.status]}
          </span>
          {featured && <span className="chip bg-ink text-white border-ink">Flagship</span>}
          {recommended && <span className="chip chip-accent bg-white/95">Best match</span>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-ink">{program.name}</h3>
          <p className="mt-1 text-sm text-muted">{program.audience}</p>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink-2 line-clamp-3">{program.summary}</p>

        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
          <div className="rounded-xl bg-sand px-3 py-2.5">
            <dt className="flex items-center gap-1 font-medium text-faint">
              <Clock className="size-3.5" aria-hidden /> Duration
            </dt>
            <dd className="mt-1 font-semibold text-ink">{program.duration}</dd>
          </div>
          <div className="rounded-xl bg-sand px-3 py-2.5">
            <dt className="flex items-center gap-1 font-medium text-faint">
              <Layers className="size-3.5" aria-hidden /> Curriculum
            </dt>
            <dd className="mt-1 font-semibold text-ink">
              {moduleCount} modules · {subCount} skills
            </dd>
          </div>
          <div className="col-span-2 rounded-xl bg-sand px-3 py-2.5 sm:col-span-1">
            <dt className="font-medium text-faint">Commitment</dt>
            <dd className="mt-1 font-semibold text-ink">{program.commitment}</dd>
          </div>
        </dl>

        <div className="mt-4 rounded-xl border border-accent/20 bg-accent-soft/60 px-3.5 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">You finish with</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-2">{program.outcome}</p>
        </div>

        <div className="mt-auto border-t border-line pt-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-faint">Monthly</p>
              <p className="mt-1 text-lg font-semibold tnum text-ink">
                {formatMoney(program.feeMonthly)}
                <span className="text-sm font-normal text-muted">
                  {" "}
                  · {program.feeMonths} mo · {formatMoney(total)} total
                </span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={`/#apply`} className="btn btn-primary btn-sm">
                Apply
                <ArrowRight className="size-3.5" aria-hidden />
              </a>
              <a href={waForProgram(program.name)} className="btn btn-outline btn-sm">
                <MessageCircle className="size-3.5" aria-hidden />
                Chat
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-4 flex w-full items-center justify-between gap-2 rounded-xl border border-line bg-sand px-3.5 py-2.5 text-left text-sm font-medium text-ink hover:bg-sand-deep"
            aria-expanded={open}
          >
            Is this the right fit?
            <ChevronDown
              className={"size-4 text-muted transition-transform " + (open ? "rotate-180" : "")}
              aria-hidden
            />
          </button>

          {open && (
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">For you if</p>
                <ul className="mt-2 space-y-2">
                  {program.forYouIf.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-ink-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-faint">Not for you if</p>
                <ul className="mt-2 space-y-2">
                  {program.notForYouIf.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <X className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="sm:col-span-2 rounded-xl border border-line bg-white px-3.5 py-3 text-sm leading-relaxed text-muted">
                <span className="font-semibold text-ink">Honest note: </span>
                {program.honestNote}
              </p>
              <a href="/#skills" className="sm:col-span-2 text-sm font-medium text-accent hover:underline">
                See full skill modules for {program.name} →
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProgramCards() {
  const [path, setPath] = useState<(typeof paths)[number]["id"] | null>(null);
  const active = paths.find((p) => p.id === path);
  const featured = programs.find((p) => p.slug === "ai-automation-practitioner")!;
  const others = programs.filter((p) => p.slug !== "ai-automation-practitioner");

  return (
    <section id="programs" className="scroll-mt-24 border-b border-line">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">Programs</p>
          <h2 className="display-lg mt-4">Pick the path that matches you</h2>
          <p className="lede mt-4">
            Four programs. One clear recommendation based on where you are now — then expand any card for the honest fit check.
          </p>
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-faint">I am…</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {paths.map((p) => {
              const selected = path === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPath(selected ? null : p.id)}
                  className={
                    "pill " +
                    (selected
                      ? "border-accent bg-accent-soft text-accent"
                      : "")
                  }
                  aria-pressed={selected}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
          {active && (
            <p className="mt-3 text-sm text-ink-2">
              Suggested: <span className="font-semibold text-accent">{active.hint}</span>
              {" · "}
              Not sure?{" "}
              <a href={site.whatsapp.href} className="font-medium text-accent hover:underline">
                WhatsApp us
              </a>{" "}
              and we’ll place you.
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <ProgramCard
            program={featured}
            featured
            recommended={active?.recommend === featured.slug}
          />
          {others.map((p) => (
            <ProgramCard
              key={p.slug}
              program={p}
              recommended={active?.recommend === p.slug}
            />
          ))}
        </div>

        <div id="workshops" className="mt-5 card p-5 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="chip chip-accent w-fit">Try before you commit</p>
              <h3 className="mt-3 text-lg font-semibold text-ink">{workshops.heading}</h3>
              <p className="mt-2 max-w-xl text-sm text-muted">{workshops.body}</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-faint">From</p>
              <p className="text-2xl font-bold tnum text-ink">{formatMoney(workshops.fee)}</p>
            </div>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {workshops.items.map((w) => (
              <li key={w.title} className="rounded-xl bg-sand px-4 py-3">
                <p className="text-sm font-semibold text-ink">{w.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{w.detail}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href="/#apply" className="btn btn-primary btn-sm">
              Ask about a workshop
            </a>
            <a href={site.whatsapp.href} className="btn btn-outline btn-sm">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

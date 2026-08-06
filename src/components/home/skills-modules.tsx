"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { programs, type Program } from "@/content/site";

function SkillAccordion({ program, defaultOpen }: { program: Program; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const moduleCount = program.modules.length;
  const subCount = program.modules.reduce((n, m) => n + m.subModules.length, 0);

  return (
    <article className="border border-line bg-panel">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-6 px-6 py-7 text-left md:px-9 md:py-8"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {program.name}
            </p>
            <p className="text-xs text-faint">
              {moduleCount} modules · {subCount} sub-modules
            </p>
          </div>
          <h3 className="mt-3 font-display text-2xl text-ink md:text-[1.75rem]">
            Skills inside {program.name}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-[0.9375rem]">
            {program.audience}. Each skill module opens into focused sub-modules taught live.
          </p>
        </div>
        <span
          className={
            "mt-1 flex size-10 shrink-0 items-center justify-center border border-line text-ink transition-transform " +
            (open ? "rotate-180 bg-ink text-white" : "bg-canvas")
          }
          aria-hidden
        >
          <ChevronDown className="size-4" />
        </span>
      </button>

      {open && (
        <div className="border-t border-line px-6 pb-8 pt-2 md:px-9 md:pb-10">
          <ol className="space-y-8">
            {program.modules.map((mod, i) => (
              <li key={mod.title} className="grid gap-5 border-t border-line pt-7 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="tnum text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Module {String(i + 1).padStart(2, "0")}
                  </p>
                  <h4 className="mt-3 font-display text-xl text-ink">{mod.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{mod.body}</p>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
                  {mod.subModules.map((sub, j) => (
                    <li
                      key={sub.title}
                      className="group border border-line bg-canvas p-5 transition-colors hover:border-ink/30"
                    >
                      <p className="tnum text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-faint">
                        {String(i + 1).padStart(2, "0")}.{String(j + 1).padStart(2, "0")}
                      </p>
                      <h5 className="mt-2 font-sans text-[0.975rem] font-semibold text-ink">
                        {sub.title}
                      </h5>
                      <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                        {sub.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
            <a href="/#apply" className="btn btn-primary btn-sm">
              Apply for {program.name}
            </a>
            <a href="/#programs" className="btn btn-outline btn-sm">
              Back to programs
            </a>
          </div>
        </div>
      )}
    </article>
  );
}

export function SkillsModules() {
  return (
    <section id="skills" className="scroll-mt-24 border-b border-line bg-sand">
      <div className="shell section">
        <div className="max-w-3xl">
          <p className="eyebrow">Curriculum depth</p>
          <h2 className="display-lg mt-5">Skills modules — each skill opens into sub-modules.</h2>
          <p className="lede mt-5">
            Not a vague syllabus. Every skill is broken into teachable units so students,
            parents, and hiring managers can see exactly what is covered.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {programs.map((program) => (
            <SkillAccordion
              key={program.slug}
              program={program}
              defaultOpen={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

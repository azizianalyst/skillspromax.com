"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { programs, type Program } from "@/content/site";

function SkillAccordion({ program }: { program: Program }) {
  const [open, setOpen] = useState(false);
  const subCount = program.modules.reduce((n, m) => n + m.subModules.length, 0);

  return (
    <article className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div>
          <h3 className="text-base font-semibold text-ink">{program.name}</h3>
          <p className="mt-1 text-sm text-muted">
            {program.modules.length} modules · {subCount} sub-modules
          </p>
        </div>
        <span className="flex size-9 items-center justify-center rounded-full border border-line bg-sand">
          <ChevronDown
            className={"size-4 text-muted transition-transform " + (open ? "rotate-180" : "")}
            aria-hidden
          />
        </span>
      </button>

      {open && (
        <div className="space-y-5 border-t border-line px-5 py-5">
          {program.modules.map((mod, i) => (
            <div key={mod.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                Module {i + 1}
              </p>
              <h4 className="mt-1 text-sm font-semibold text-ink">{mod.title}</h4>
              <p className="mt-1 text-sm text-muted">{mod.body}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {mod.subModules.map((sub) => (
                  <li key={sub.title} className="rounded-xl bg-sand px-3.5 py-3">
                    <p className="text-sm font-medium text-ink">{sub.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{sub.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <a href="/#apply" className="btn btn-primary btn-sm">
            Apply for {program.name}
          </a>
        </div>
      )}
    </article>
  );
}

export function SkillsModules() {
  return (
    <section id="skills" className="scroll-mt-24 border-b border-line bg-sand">
      <div className="shell section">
        <div className="max-w-xl">
          <p className="eyebrow">Curriculum</p>
          <h2 className="display-lg mt-4">Skills, modules, sub-modules</h2>
          <p className="lede mt-4">Open any program to see the full skill tree.</p>
        </div>

        <div className="mt-8 space-y-3">
          {programs.map((program) => (
            <SkillAccordion key={program.slug} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}

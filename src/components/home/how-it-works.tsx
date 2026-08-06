import { howItWorks } from "@/content/site";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-b border-line bg-sand">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">Admissions</p>
          <h2 className="display-lg mt-5">{howItWorks.heading}</h2>
          <p className="lede mt-5">{howItWorks.body}</p>
        </div>

        <ol className="mt-14 grid gap-0 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, i) => (
            <li
              key={step.title}
              className="border-b border-line px-0 py-8 sm:border-r sm:px-6 sm:odd:pl-0 lg:border-b-0 lg:py-10 lg:last:border-r-0"
            >
              <p className="tnum text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-xl text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

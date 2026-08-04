import { howItWorks } from "@/content/site";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-b border-line bg-sand">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">Process</p>
          <h2 className="display-md mt-4">{howItWorks.heading}</h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">{howItWorks.body}</p>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="card p-5">
              <p className="tnum font-display text-2xl text-accent">{i + 1}</p>
              <h3 className="mt-3 font-sans text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { howItWorks } from "@/content/site";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-b border-line">
      <div className="shell section">
        <div className="max-w-xl">
          <p className="eyebrow">Process</p>
          <h2 className="display-lg mt-4">{howItWorks.heading}</h2>
          <p className="lede mt-4">{howItWorks.body}</p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-line bg-sand p-5">
              <p className="text-sm font-semibold text-accent">{i + 1}</p>
              <h3 className="mt-3 text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

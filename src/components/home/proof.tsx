export function Proof() {
  return (
    <section className="border-b border-line bg-panel">
      <div className="shell section">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Why this academy</p>
            <h2 className="display-lg mt-5">
              Built like a school. Measured like a workshop.
            </h2>
            <p className="lede mt-6">
              Parents and students deserve a calm, clear standard — not loud promises.
              We teach what the market still pays for, in small live batches, with work
              that has to be finished.
            </p>
          </div>

          <div className="lg:col-span-7">
            <blockquote className="border-l-2 border-accent pl-6 md:pl-8">
              <p className="font-display text-xl italic leading-relaxed text-ink md:text-[1.65rem]">
                The internet does not know where you sit. It knows whether your work is
                any good. That is the part we teach.
              </p>
            </blockquote>

            <dl className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
              {[
                ["Live online", "Join from any city in Pakistan with a laptop and stable internet"],
                ["Small batches", "Capped groups so every student's work is reviewed"],
                ["Honest outcomes", "We publish who earned — and who earned nothing — after each batch"],
              ].map(([stat, label]) => (
                <div key={stat}>
                  <dt className="font-display text-2xl tracking-tight text-ink">{stat}</dt>
                  <dd className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

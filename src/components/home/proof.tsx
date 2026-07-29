export function Proof() {
  return (
    <section className="border-b border-line bg-sand">
      <div className="shell section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">It works from here</p>
            <h2 className="display-lg mt-5">
              You do not have to be in Lahore to earn like it.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <blockquote className="border-l-2 border-accent pl-6">
              <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
                A freelancer from a village near Hujra Shah Muqeem — in this same tehsil —
                started with no internet and no money, and was later named by the Pakistan
                Software Export Board among the top 100 freelancers in the country.
              </p>
              <footer className="mt-5 text-sm text-muted">
                Publicly reported by Fiverr&rsquo;s Pakistan community. He now runs his own
                digital agency and won national freelancer awards in 2022 and 2023.
              </footer>
            </blockquote>

            <p className="mt-8 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
              We mention this for one reason. Every institute shows you photographs of
              offices in other countries. We would rather point at a village thirty
              kilometres from this building. The internet does not know where you are
              sitting — but it does know whether your work is any good. That is the part
              we teach.
            </p>

            <dl className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
              {[
                ["1.59 million", "People in Tehsil Depalpur — and no dedicated AI or automation training in the tehsil until now"],
                ["$1.76 billion", "Earned by Pakistani freelancers in FY2026, per State Bank of Pakistan data"],
                ["4th largest", "Pakistan's global ranking as a source of freelance talent"],
              ].map(([stat, label]) => (
                <div key={stat}>
                  <dt className="font-display text-3xl tracking-tight text-accent tnum">{stat}</dt>
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

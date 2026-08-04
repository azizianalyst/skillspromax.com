export function Proof() {
  return (
    <section className="border-b border-line bg-sand">
      <div className="shell section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Pakistan can earn</p>
            <h2 className="display-lg mt-5">
              You do not have to be in a big-city office to earn online.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <blockquote className="border-l-2 border-accent pl-6">
              <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
                Pakistani freelancers keep ranking among the world&apos;s largest talent
                pools — and a large share of that work is done from homes and small towns,
                not only from Karachi or Lahore offices.
              </p>
              <footer className="mt-5 text-sm text-muted">
                The internet does not know where you sit. It knows whether your work is any
                good. That is the part we teach.
              </footer>
            </blockquote>

            <dl className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
              {[
                ["Online live", "Join from any city in Pakistan with a laptop and stable internet"],
                ["$1.76B+", "Earned by Pakistani freelancers in recent SBP-reported years"],
                ["Honest outcomes", "We publish who earned — and who earned nothing — after each batch"],
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

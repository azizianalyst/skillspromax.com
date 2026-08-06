export function Proof() {
  return (
    <section className="border-b border-line bg-sand">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">Simple idea</p>
          <h2 className="display-lg mt-4">Learn online from Dubai. Build real work.</h2>
          <p className="lede mt-5">
            No campus travel required. Join live classes from home across the UAE, finish with a
            supervised deliverable, and see clear monthly fees in AED.
          </p>
        </div>

        <dl className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            ["Live online", "Dubai & UAE"],
            ["Small batches", "Your work gets reviewed"],
            ["Monthly fees", "Clear AED pricing"],
          ].map(([title, body]) => (
            <div key={title} className="rounded-xl border border-line bg-canvas p-6">
              <dt className="text-base font-semibold text-ink">{title}</dt>
              <dd className="mt-2 text-sm text-muted">{body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

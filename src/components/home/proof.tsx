export function Proof() {
  return (
    <section className="border-b border-line">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">Dubai-based · Worldwide</p>
          <h2 className="display-lg mt-4">Built for people who want modern skills — not certificates.</h2>
          <p className="lede mt-4">
            Live online from Dubai. Join from any country. Small batches. Clear USD fees. Real deliverables before you finish.
          </p>
        </div>

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["Live online", "Join from anywhere"],
            ["Small batches", "Work gets reviewed"],
            ["USD monthly", "No lump-sum pressure"],
          ].map(([title, body]) => (
            <div key={title} className="card p-5">
              <dt className="text-base font-semibold text-ink">{title}</dt>
              <dd className="mt-1.5 text-sm text-muted">{body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

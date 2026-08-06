export function Proof() {
  return (
    <section className="border-b border-line">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">Dubai · UAE</p>
          <h2 className="display-lg mt-5">Built for people who want modern skills — not certificates.</h2>
          <p className="lede mt-5">
            Live online from Dubai. Small batches. Clear AED fees. Real deliverables before you finish.
          </p>
        </div>

        <dl className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            ["Live online", "Dubai & across the UAE"],
            ["Small batches", "Work gets reviewed"],
            ["AED monthly", "No lump-sum pressure"],
          ].map(([title, body]) => (
            <div
              key={title}
              className="rounded-3xl border border-line bg-panel p-6 shadow-[0_1px_2px_rgba(10,15,26,0.03)]"
            >
              <dt className="font-display text-xl font-bold tracking-tight text-ink">{title}</dt>
              <dd className="mt-2 text-sm text-muted">{body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

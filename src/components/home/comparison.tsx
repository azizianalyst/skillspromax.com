import { honestComparison } from "@/content/site";

export function Comparison() {
  return (
    <section className="border-b border-line">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">The honest comparison</p>
          <h2 className="display-lg mt-5">{honestComparison.heading}</h2>
          <p className="lede mt-5">{honestComparison.intro}</p>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="border-y border-line-strong">
                <th scope="col" className="py-4 pr-6 text-xs font-semibold uppercase tracking-wider text-faint">
                  &nbsp;
                </th>
                <th scope="col" className="py-4 pr-6 text-xs font-semibold uppercase tracking-wider text-faint">
                  Free government courses
                </th>
                <th scope="col" className="py-4 text-xs font-semibold uppercase tracking-wider text-accent">
                  SkillsProMax
                </th>
              </tr>
            </thead>
            <tbody>
              {honestComparison.rows.map((row) => (
                <tr key={row.point} className="border-b border-line align-top">
                  <th scope="row" className="w-40 py-5 pr-6 text-sm font-semibold text-ink">
                    {row.point}
                  </th>
                  <td className="w-1/2 py-5 pr-6 text-[0.875rem] leading-relaxed text-muted">
                    {row.free}
                  </td>
                  <td className="py-5 text-[0.875rem] leading-relaxed text-ink-2">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
          We are aware that publishing this table costs us enrolments. We would rather
          you choose us for the right reason, or choose the free option and finish it,
          than pay us and drop out.
        </p>
      </div>
    </section>
  );
}

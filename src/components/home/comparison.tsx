import { honestComparison } from "@/content/site";

export function Comparison() {
  return (
    <section className="border-b border-line bg-sand">
      <div className="shell section">
        <div className="max-w-xl">
          <p className="eyebrow">Compare</p>
          <h2 className="display-lg mt-4">{honestComparison.heading}</h2>
          <p className="lede mt-4">{honestComparison.intro}</p>
        </div>

        <div className="mt-8 overflow-x-auto card">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-sand-deep">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-faint" />
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-faint">
                  Free courses
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-accent">
                  SkillsProMax
                </th>
              </tr>
            </thead>
            <tbody>
              {honestComparison.rows.map((row) => (
                <tr key={row.point} className="border-t border-line align-top">
                  <th className="px-4 py-4 text-sm font-semibold text-ink">{row.point}</th>
                  <td className="px-4 py-4 text-muted">{row.free}</td>
                  <td className="px-4 py-4 text-ink-2">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

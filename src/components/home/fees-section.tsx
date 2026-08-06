import { programs, site } from "@/content/site";
import { formatPkr } from "@/lib/utils";

export function FeesSection() {
  return (
    <section id="fees" className="scroll-mt-24 border-b border-line bg-panel">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">Fees</p>
          <h2 className="display-lg mt-5">Monthly fees. Clear totals.</h2>
          <p className="lede mt-5">
            Pay month by month. Ask on the admissions call about instalments and merit
            reductions. No application fee.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto border border-line">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-sand">
                {["Program", "Monthly", "Months", "Total"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-faint first:pl-5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {programs.map((p) => (
                <tr key={p.slug} className="bg-canvas">
                  <td className="px-5 py-4 font-medium text-ink">{p.name}</td>
                  <td className="px-5 py-4 tnum text-ink-2">{formatPkr(p.feeMonthly)}</td>
                  <td className="px-5 py-4 tnum text-muted">{p.feeMonths}</td>
                  <td className="px-5 py-4 tnum font-semibold text-ink">
                    {formatPkr(p.feeMonthly * p.feeMonths)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="/#apply" className="btn btn-primary btn-sm">
            Apply free
          </a>
          <a href={site.whatsapp.href} className="text-sm font-medium text-ink hover:underline">
            Or WhatsApp questions first →
          </a>
        </div>
      </div>
    </section>
  );
}

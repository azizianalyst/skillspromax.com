import { programs, site } from "@/content/site";
import { formatMoney } from "@/lib/utils";

export function FeesSection() {
  return (
    <section id="fees" className="scroll-mt-24 border-b border-line">
      <div className="shell section">
        <div className="max-w-xl">
          <p className="eyebrow">Fees</p>
          <h2 className="display-lg mt-4">Simple monthly pricing (USD)</h2>
          <p className="lede mt-4">No application fee. Ask about instalments on the call.</p>
        </div>

        <div className="mt-8 overflow-hidden card">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand">
              <tr>
                {["Program", "Monthly", "Months", "Total"].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-faint">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.slug} className="border-t border-line">
                  <td className="px-4 py-3.5 font-medium text-ink">{p.name}</td>
                  <td className="px-4 py-3.5 tnum text-ink-2">{formatMoney(p.feeMonthly)}</td>
                  <td className="px-4 py-3.5 tnum text-muted">{p.feeMonths}</td>
                  <td className="px-4 py-3.5 tnum font-semibold text-ink">
                    {formatMoney(p.feeMonthly * p.feeMonths)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/#apply" className="btn btn-primary btn-sm">Apply free</a>
          <a href={site.whatsapp.href} className="btn btn-outline btn-sm">WhatsApp first</a>
        </div>
      </div>
    </section>
  );
}

import { programs } from "@/content/site";
import { formatPkr } from "@/lib/utils";

export function FeesSection() {
  return (
    <section id="fees" className="scroll-mt-24 border-b border-line">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">Pricing</p>
          <h2 className="display-md mt-4">Fees — monthly, not a lump sum</h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
            Pay month by month. Ask on the admissions call about instalments and merit
            reductions. No application fee.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                {["Program", "Monthly", "Months", "Total"].map((h) => (
                  <th
                    key={h}
                    className="px-0 py-3 pr-6 text-xs font-semibold uppercase tracking-wider text-faint"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {programs.map((p) => (
                <tr key={p.slug}>
                  <td className="py-4 pr-6 font-medium text-ink">{p.name}</td>
                  <td className="py-4 pr-6 tnum text-ink-2">{formatPkr(p.feeMonthly)}</td>
                  <td className="py-4 pr-6 tnum text-muted">{p.feeMonths}</td>
                  <td className="py-4 tnum font-semibold text-ink">
                    {formatPkr(p.feeMonthly * p.feeMonths)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-muted">
          Ready?{" "}
          <a href="/#apply" className="font-medium text-accent hover:underline">
            Apply free
          </a>{" "}
          or WhatsApp us with questions before you commit.
        </p>
      </div>
    </section>
  );
}

import { promises } from "@/content/site";

export function PromisesStrip() {
  return (
    <section id="promises" className="scroll-mt-24 border-b border-line bg-panel">
      <div className="shell section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Our promises</p>
            <h2 className="display-lg mt-5">Seven things we will not do.</h2>
            <p className="lede mt-5">
              This sector has a reputation problem in Pakistan, and it was earned. These
              commitments are written here so you can hold us to them.
            </p>
          </div>

          <ul className="lg:col-span-8 lg:pl-8">
            {promises.map((p, i) => (
              <li
                key={p}
                className="flex gap-4 border-b border-line py-5 text-[0.9375rem] leading-relaxed text-ink first:border-t"
              >
                <span className="tnum shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

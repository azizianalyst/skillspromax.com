import { differentiators } from "@/content/site";

export function Differentiators() {
  return (
    <section id="why-us" className="scroll-mt-24 border-b border-line bg-sand">
      <div className="shell section">
        <div className="max-w-xl">
          <p className="eyebrow">Why us</p>
          <h2 className="display-lg mt-4">Clear standards. No empty promises.</h2>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {differentiators.map((item, i) => (
            <li
              key={item.title}
              className="rounded-3xl border border-line bg-panel p-6 shadow-[0_1px_2px_rgba(10,15,26,0.03)]"
            >
              <p className="font-display text-2xl font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

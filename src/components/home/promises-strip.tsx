import { promises } from "@/content/site";

export function PromisesStrip() {
  return (
    <section id="promises" className="scroll-mt-24 border-b border-line bg-sand">
      <div className="shell section">
        <div className="max-w-xl">
          <p className="eyebrow">Promises</p>
          <h2 className="display-lg mt-4">What we will not do</h2>
        </div>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {promises.map((p) => (
            <li key={p} className="card px-4 py-3.5 text-sm leading-relaxed text-ink-2">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

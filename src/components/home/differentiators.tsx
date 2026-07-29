import { differentiators } from "@/content/site";

export function Differentiators() {
  return (
    <section className="border-b border-line">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">Why we are different</p>
          <h2 className="display-lg mt-5">
            Most institutes sell certificates. We are trying to sell you an income.
          </h2>
          <p className="lede mt-5">
            That difference shows up in six specific decisions — each of which costs us
            money or students, and each of which we make anyway.
          </p>
        </div>

        <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {differentiators.map((item, i) => (
            <li key={item.title} className="border-t border-line pt-6">
              <span className="font-display text-2xl text-accent-line tnum">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-sans text-[1.0625rem] font-semibold leading-snug tracking-normal text-ink">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

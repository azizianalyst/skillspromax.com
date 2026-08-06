import { homeFaq } from "@/content/site";
import { JsonLd, faqSchema } from "@/lib/schema";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-b border-line bg-sand">
      <JsonLd data={faqSchema(homeFaq.items)} />
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="display-lg mt-5">{homeFaq.heading}</h2>
          <p className="lede mt-5">
            Straight answers before you apply — including for parents paying the fee.
          </p>
        </div>

        <dl className="mx-auto mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {homeFaq.items.map((item) => (
            <div key={item.q} className="py-7">
              <dt className="font-display text-xl text-ink">{item.q}</dt>
              <dd className="mt-3 text-[0.975rem] leading-relaxed text-ink-2">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

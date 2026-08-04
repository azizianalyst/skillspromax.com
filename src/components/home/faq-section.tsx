import { homeFaq } from "@/content/site";
import { JsonLd, faqSchema } from "@/lib/schema";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-b border-line bg-sand">
      <JsonLd data={faqSchema(homeFaq.items)} />
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="display-md mt-4">{homeFaq.heading}</h2>
        </div>

        <dl className="mt-12 mx-auto max-w-3xl divide-y divide-line border-y border-line">
          {homeFaq.items.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="font-sans text-base font-semibold text-ink">{item.q}</dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

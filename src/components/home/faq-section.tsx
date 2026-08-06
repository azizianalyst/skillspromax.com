import { homeFaq } from "@/content/site";
import { JsonLd, faqSchema } from "@/lib/schema";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-b border-line">
      <JsonLd data={faqSchema(homeFaq.items)} />
      <div className="shell section">
        <div className="max-w-xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="display-lg mt-4">{homeFaq.heading}</h2>
        </div>

        <dl className="mx-auto mt-10 max-w-2xl divide-y divide-line">
          {homeFaq.items.map((item) => (
            <div key={item.q} className="py-5">
              <dt className="text-base font-semibold text-ink">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

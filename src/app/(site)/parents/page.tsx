import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { parents, site } from "@/content/site";
import { JsonLd, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "For parents",
  description:
    "Straight answers for parents and guardians: separate halls for boys and girls, fees charged monthly, what your child will be able to do, and what they can realistically earn.",
};

export default function ParentsPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <section className="border-b border-line">
        <div className="shell py-14 md:py-20">
          <p className="eyebrow">For families</p>
          <h1 className="display-xl mt-5 max-w-3xl">{parents.heading}</h1>
          <p className="lede mt-6 max-w-2xl">{parents.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={site.phone.href} className="btn btn-primary btn-lg">
              <Phone className="size-4" aria-hidden /> Speak to us directly
            </a>
            <Link href="/campus" className="btn btn-outline btn-lg">See the campus</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell section">
          <dl className="max-w-3xl">
            {parents.items.map((item, i) => (
              <div key={item.q} className="border-b border-line py-8 first:border-t">
                <dt className="flex gap-5">
                  <span className="font-display text-xl text-accent-line tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl leading-snug text-ink">{item.q}</span>
                </dt>
                <dd className="mt-3 pl-[2.6rem] text-[1.0625rem] leading-relaxed text-ink-2">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-sand">
        <div className="shell section">
          <div className="card max-w-2xl p-8">
            <h2 className="display-md">Come and see for yourself.</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">
              You are welcome to walk in any day between 8 AM and 8 PM. Look at the halls,
              meet the person who would teach your child, and ask us for the earnings
              figures from our previous batch. If we cannot answer a question honestly, we
              will tell you that too.
            </p>
            <address className="mt-6 not-italic text-[0.9375rem] leading-relaxed text-muted">
              {site.address.landmark}
              <br />
              {site.address.road}, {site.address.tehsil}
            </address>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={site.phone.href} className="btn btn-primary">
                <Phone className="size-4" aria-hidden /> {site.phone.display}
              </a>
              <a href={site.whatsapp.href} className="btn btn-outline">WhatsApp us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

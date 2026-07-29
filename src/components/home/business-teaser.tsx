import Link from "next/link";
import { business } from "@/content/site";

export function BusinessTeaser() {
  return (
    <section className="border-b border-line bg-sand">
      <div className="shell section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">For local businesses</p>
            <h2 className="display-lg mt-5">{business.heading}</h2>
            <p className="lede mt-5">{business.body}</p>
            <Link href="/business" className="btn btn-primary mt-8">
              Discuss your business
            </Link>
          </div>

          <ul className="grid gap-x-10 gap-y-6 lg:col-span-7 sm:grid-cols-2">
            {business.examples.map((e) => (
              <li key={e.title} className="border-t border-line pt-5">
                <h3 className="font-sans text-sm font-semibold tracking-normal text-ink">
                  {e.title}
                </h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">{e.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

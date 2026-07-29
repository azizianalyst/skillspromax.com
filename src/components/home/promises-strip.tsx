import Link from "next/link";
import { promises } from "@/content/site";

export function PromisesStrip() {
  return (
    <section className="border-b border-line">
      <div className="shell section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Our promises</p>
            <h2 className="display-lg mt-5">Seven things we will not do.</h2>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">
              This sector has a reputation problem in Pakistan, and it was earned. These
              are the specific commitments we hold ourselves to — written down so you can
              hold us to them.
            </p>
            <Link href="/promises" className="btn btn-ghost mt-5 -ml-2">
              Read the full commitments →
            </Link>
          </div>

          <ul className="lg:col-span-8 lg:pl-8">
            {promises.map((p) => (
              <li
                key={p}
                className="flex gap-4 border-b border-line py-4 text-[0.9375rem] leading-relaxed text-ink first:border-t"
              >
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

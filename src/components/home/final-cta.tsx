import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <section className="bg-ink text-white">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="display-lg text-white">
              Come and see the place before you decide.
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
              Walk in, look at the halls, meet the person who will teach you, and ask us
              anything — including what our last batch actually earned. Bring a parent if
              you like. No appointment needed.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-wrap gap-3">
              <Link href="/apply" className="btn btn-lg bg-white text-ink hover:bg-white/90">
                Apply for a seat
              </Link>
              <a
                href={site.whatsapp.href}
                className="btn btn-lg border border-white/25 text-white hover:bg-white/10"
              >
                <MessageCircle className="size-4" aria-hidden />
                WhatsApp
              </a>
            </div>
            <a
              href={site.phone.href}
              className="mt-6 flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <Phone className="size-4" aria-hidden />
              Or call {site.phone.display}
            </a>
            <p className="mt-5 border-t border-white/15 pt-5 text-[0.8125rem] leading-relaxed text-white/50">
              {site.address.landmark}, {site.address.road}
              <br />
              {site.address.tehsil}, {site.address.district}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

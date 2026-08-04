import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <section id="contact" className="scroll-mt-24 bg-ink text-white">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="display-lg text-white">Ready to start? Apply free or WhatsApp us.</h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
              Tell us your city and which program fits. We will call within two working days —
              and we will tell you honestly if a free course is the better first step.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-wrap gap-3">
              <a href="/#apply" className="btn btn-lg bg-white text-ink hover:bg-white/90">
                Apply free
              </a>
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
              {site.location.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

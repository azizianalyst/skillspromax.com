import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line hero-bg">
      <div className="shell py-16 md:py-20">
        <p className="eyebrow">Dubai admissions</p>
        <h2 className="display-lg mt-4 max-w-2xl">Ready to start?</h2>
        <p className="lede mt-4 max-w-xl">
          Apply free. We call within two working days and tell you honestly if this is the right fit.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/#apply" className="btn btn-primary btn-lg">
            Apply free
          </a>
          <a href={site.whatsapp.href} className="btn btn-outline btn-lg">
            <MessageCircle className="size-4" aria-hidden />
            WhatsApp
          </a>
        </div>
        <a
          href={site.phone.href}
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
        >
          <Phone className="size-4" aria-hidden />
          {site.phone.display}
        </a>
      </div>
    </section>
  );
}

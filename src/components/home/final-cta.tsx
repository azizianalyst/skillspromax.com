import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <section id="contact" className="scroll-mt-24 bg-ink text-white">
      <div className="shell py-16 md:py-20">
        <h2 className="display-lg max-w-2xl text-white">Ready to start?</h2>
        <p className="mt-4 max-w-xl text-base text-white/65">
          Apply free. We call within two working days and tell you honestly if this is the right fit.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/#apply" className="btn btn-lg bg-white text-ink hover:bg-white/90">
            Apply free
          </a>
          <a
            href={site.whatsapp.href}
            className="btn btn-lg border border-white/20 text-white hover:bg-white/10"
          >
            <MessageCircle className="size-4" aria-hidden />
            WhatsApp
          </a>
        </div>
        <a href={site.phone.href} className="mt-6 inline-flex items-center gap-2 text-sm text-white/55 hover:text-white">
          <Phone className="size-4" aria-hidden />
          {site.phone.display}
        </a>
      </div>
    </section>
  );
}

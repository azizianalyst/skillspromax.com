import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <section id="contact" className="scroll-mt-24 relative overflow-hidden bg-ink text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 85% 20%, rgba(8,145,178,0.35), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="shell relative py-20 md:py-24">
        <p className="eyebrow border-white/15 bg-white/5 text-accent-line">Dubai admissions</p>
        <h2 className="display-lg mt-5 max-w-2xl text-white">Ready to start?</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
          Apply free. We call within two working days and tell you honestly if this is the right fit.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="/#apply" className="btn btn-lg bg-white text-ink hover:bg-white/90">
            Apply free
          </a>
          <a
            href={site.whatsapp.href}
            className="btn btn-lg border border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            <MessageCircle className="size-4" aria-hidden />
            WhatsApp
          </a>
        </div>
        <a
          href={site.phone.href}
          className="mt-7 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
        >
          <Phone className="size-4" aria-hidden />
          {site.phone.display}
        </a>
      </div>
    </section>
  );
}

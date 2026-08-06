import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <section id="contact" className="scroll-mt-24 relative overflow-hidden bg-ink text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(139,105,20,0.35), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="shell relative py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent-line before:bg-accent-line">Admissions</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-tight text-white">
              Apply free. We will tell you honestly if this academy is the right next step.
            </h2>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/65">
              Share your city and the program you have in mind. We call within two working
              days — and we will say so if a free course is the better first move.
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
              className="mt-7 flex items-center gap-2 text-sm text-white/60 hover:text-white"
            >
              <Phone className="size-4" aria-hidden />
              Or call {site.phone.display}
            </a>
            <p className="mt-6 border-t border-white/15 pt-5 text-[0.8125rem] leading-relaxed text-white/45">
              {site.location.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

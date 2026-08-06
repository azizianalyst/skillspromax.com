import Image from "next/image";
import { hero, site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate min-h-[min(92dvh,52rem)] overflow-hidden bg-ink text-white">
      <Image
        src="/images/programs/ai-automation-practitioner.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-ken object-cover opacity-45"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/55"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30"
        aria-hidden
      />

      <div className="shell relative flex min-h-[min(92dvh,52rem)] flex-col justify-end pb-16 pt-28 md:pb-24 md:pt-36">
        <p className="reveal eyebrow text-accent-line before:bg-accent-line">{hero.eyebrow}</p>

        <p className="reveal reveal-delay-1 mt-8 font-display text-[clamp(2rem,5vw,3.25rem)] leading-none tracking-tight text-white">
          Skills<span className="text-accent-line">Pro</span>Max
        </p>

        <h1 className="reveal reveal-delay-1 mt-5 max-w-3xl font-display text-[clamp(2.4rem,6.5vw,4.5rem)] leading-[1.05] tracking-tight text-white">
          {hero.heading}
        </h1>

        <p className="reveal reveal-delay-2 mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/75 md:text-lg">
          {hero.body}
        </p>

        <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-3">
          <a href={hero.primary.href} className="btn btn-lg bg-white text-ink hover:bg-white/90">
            {hero.primary.label}
          </a>
          <a
            href={hero.secondary.href}
            className="btn btn-lg border border-white/30 text-white hover:bg-white/10"
          >
            {hero.secondary.label}
          </a>
          <a
            href={site.whatsapp.href}
            className="btn btn-lg text-white/80 hover:text-white"
          >
            WhatsApp
          </a>
        </div>

        <ul className="reveal reveal-delay-3 mt-14 grid max-w-3xl gap-3 border-t border-white/15 pt-8 sm:grid-cols-2">
          {hero.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-white/70">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-line" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

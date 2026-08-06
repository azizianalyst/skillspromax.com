import { hero, site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line atmosphere">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10,15,26,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,15,26,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
        }}
        aria-hidden
      />

      <div className="shell relative py-20 md:py-28 lg:py-32">
        <p className="reveal eyebrow">{hero.eyebrow}</p>

        <p className="reveal reveal-delay-1 mt-8 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-ink">
          Skills<span className="text-accent">Pro</span>Max
        </p>

        <h1 className="reveal reveal-delay-1 display-xl mt-4 max-w-4xl text-ink">
          {hero.heading}
        </h1>

        <p className="reveal reveal-delay-2 lede mt-6 max-w-xl">{hero.body}</p>

        <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-3">
          <a href={hero.primary.href} className="btn btn-primary btn-lg">
            {hero.primary.label}
          </a>
          <a href={hero.secondary.href} className="btn btn-outline btn-lg">
            {hero.secondary.label}
          </a>
          <a href={site.whatsapp.href} className="btn btn-ghost btn-lg">
            WhatsApp
          </a>
        </div>

        <ul className="reveal reveal-delay-3 mt-14 grid max-w-3xl gap-3 sm:grid-cols-2">
          {hero.points.map((point) => (
            <li
              key={point}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm text-ink-2 backdrop-blur-sm"
            >
              <span className="size-2 shrink-0 rounded-full bg-accent" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

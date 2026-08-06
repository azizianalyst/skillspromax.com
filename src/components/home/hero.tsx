import { hero, site } from "@/content/site";

export function Hero() {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="shell py-16 md:py-24 lg:py-28">
        <p className="eyebrow">{hero.eyebrow}</p>

        <h1 className="display-xl mt-5 max-w-3xl text-ink">
          Skills<span className="text-accent">Pro</span>Max
          <span className="mt-3 block font-semibold tracking-tight text-ink">
            {hero.heading}
          </span>
        </h1>

        <p className="lede mt-6 max-w-xl">{hero.body}</p>

        <div className="mt-9 flex flex-wrap gap-3">
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

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8 text-sm text-muted">
          {hero.points.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

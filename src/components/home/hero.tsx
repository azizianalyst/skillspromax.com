import { ArrowRight, MessageCircle, Phone, Star } from "lucide-react";
import { hero, programs, site } from "@/content/site";

const jumpLinks = [
  { label: "Programs", href: "/#programs" },
  { label: "Skills", href: "/#skills" },
  { label: "Fees", href: "/#fees" },
  { label: "Apply", href: "/#apply" },
];

export function Hero() {
  return (
    <section className="hero-bg border-b border-line">
      <div className="shell py-12 md:py-16 lg:py-20">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
            {hero.eyebrow} · Live batches open
          </span>
          <span className="eyebrow border-amber-200 bg-amber-50 text-amber-800">
            <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
            Small batches · AED monthly
          </span>
        </div>

        <h1 className="display-xl mt-8 max-w-4xl text-ink">
          SkillsProMax — Dubai&apos;s trusted{" "}
          <span className="text-accent">AI &amp; automation training</span>
        </h1>

        <p className="lede mt-5 max-w-2xl">{hero.body}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {programs.slice(0, 6).map((p) => (
            <a key={p.slug} href="/#programs" className="pill">
              {p.name}
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={hero.primary.href} className="btn btn-primary btn-lg">
            {hero.primary.label}
            <ArrowRight className="size-4" aria-hidden />
          </a>
          <a href={site.phone.href} className="btn btn-outline btn-lg">
            <Phone className="size-4" aria-hidden />
            {site.phone.display}
          </a>
          <a href={site.whatsapp.href} className="btn btn-outline btn-lg text-emerald-700">
            <MessageCircle className="size-4" aria-hidden />
            WhatsApp
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wide text-faint">
          <span>Or jump to</span>
          {jumpLinks.map((link) => (
            <a key={link.href} href={link.href} className="normal-case text-accent hover:underline">
              {link.label}
            </a>
          ))}
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {hero.points.map((point) => (
            <li key={point} className="chip">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { site, programs } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sand">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <span className="font-display text-xl">
            Skills<span className="text-accent">Pro</span>Max
          </span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline} Digital skills training in Tehsil Depalpur, District Okara.
          </p>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink">
            Programs
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={`/programs/${p.slug}`} className="text-muted hover:text-accent">
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/programs#workshops" className="text-muted hover:text-accent">
                Weekend workshops
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink">
            Institute
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/why-us" className="text-muted hover:text-accent">Why SkillsProMax</Link></li>
            <li><Link href="/campus" className="text-muted hover:text-accent">Campus &amp; timings</Link></li>
            <li><Link href="/parents" className="text-muted hover:text-accent">For parents</Link></li>
            <li><Link href="/business" className="text-muted hover:text-accent">For businesses</Link></li>
            <li><Link href="/outcomes" className="text-muted hover:text-accent">Our results</Link></li>
            <li><Link href="/admissions" className="text-muted hover:text-accent">Admissions &amp; fees</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink">
            Visit or call
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              <span>
                {site.address.landmark}
                <br />
                {site.address.road}
                <br />
                {site.address.tehsil}, {site.address.district}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              <a href={site.phone.href} className="hover:text-accent">{site.phone.display}</a>
            </li>
            <li className="flex gap-2.5">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              <a href={site.whatsapp.href} className="hover:text-accent">WhatsApp us</a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              <div className="space-y-1">
                <a href={`mailto:${site.emails.admissions}`} className="block hover:text-accent">
                  {site.emails.admissions}
                </a>
                <a href={`mailto:${site.emails.info}`} className="block hover:text-accent">
                  {site.emails.info}
                </a>
                <a href={`mailto:${site.emails.support}`} className="block hover:text-accent">
                  {site.emails.support}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-3 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/promises" className="hover:text-accent">Our promises</Link>
            <Link href="/refund-policy" className="hover:text-accent">Refund policy</Link>
            <Link href="/privacy" className="hover:text-accent">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

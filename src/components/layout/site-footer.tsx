import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { site, programs } from "@/content/site";
import { NAP } from "@/lib/schema";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sand">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <span className="font-display text-xl">
            Skills<span className="text-accent">Pro</span>Max
          </span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline} AI and automation training online across Pakistan.
          </p>
          <p className="mt-3 text-sm text-muted">{site.location.label}</p>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink">
            On this page
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {programs.map((p) => (
              <li key={p.slug}>
                <a href="/#programs" className="text-muted hover:text-accent">
                  {p.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/#fees" className="text-muted hover:text-accent">
                Fees
              </a>
            </li>
            <li>
              <a href="/#apply" className="text-muted hover:text-accent">
                Apply
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              <a href={site.phone.href} className="hover:text-accent">
                {site.phone.display}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              <a href={site.whatsapp.href} className="hover:text-accent">
                WhatsApp us
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              <a href={`mailto:${site.emails.admissions}`} className="hover:text-accent">
                {site.emails.admissions}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-3 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {NAP.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/refund-policy" className="hover:text-accent">
              Refund policy
            </Link>
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { site, programs } from "@/content/site";
import { NAP } from "@/lib/schema";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sand">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <span className="font-display text-2xl tracking-tight">
            Skills<span className="text-accent">Pro</span>Max
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            A live online digital skills academy for Pakistan — serious teaching, monthly
            fees, and work that has to be finished.
          </p>
          <p className="mt-4 text-sm text-muted">{site.location.label}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">
            Programs
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {programs.map((p) => (
              <li key={p.slug}>
                <a href="/#programs" className="text-muted hover:text-ink">
                  {p.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/#skills" className="text-muted hover:text-ink">
                Skills modules
              </a>
            </li>
            <li>
              <a href="/#fees" className="text-muted hover:text-ink">
                Fees
              </a>
            </li>
            <li>
              <a href="/#faq" className="text-muted hover:text-ink">
                FAQ
              </a>
            </li>
            <li>
              <a href="/#apply" className="text-muted hover:text-ink">
                Apply
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">
            Contact
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              <a href={site.phone.href} className="hover:text-ink">
                {site.phone.display}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              <a href={site.whatsapp.href} className="hover:text-ink">
                WhatsApp us
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              <a href={`mailto:${site.emails.admissions}`} className="hover:text-ink">
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
            <Link href="/refund-policy" className="hover:text-ink">
              Refund policy
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { site, programs } from "@/content/site";
import { NAP } from "@/lib/schema";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sand">
      <div className="shell grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold tracking-tight">
            Skills<span className="text-accent">Pro</span>Max
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Live online digital skills training from Dubai across the UAE.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-faint">Links</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href="/#programs" className="text-muted hover:text-ink">Programs</a></li>
            <li><a href="/#skills" className="text-muted hover:text-ink">Skills</a></li>
            <li><a href="/#fees" className="text-muted hover:text-ink">Fees</a></li>
            <li><a href="/#faq" className="text-muted hover:text-ink">FAQ</a></li>
            <li><a href="/#apply" className="text-muted hover:text-ink">Apply</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-faint">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              <a href={site.phone.href} className="hover:text-ink">{site.phone.display}</a>
            </li>
            <li className="flex gap-2.5">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              <a href={site.whatsapp.href} className="hover:text-ink">WhatsApp</a>
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
          <p>© {new Date().getFullYear()} {NAP.legalName}</p>
          <div className="flex gap-5">
            <Link href="/refund-policy" className="hover:text-ink">Refund policy</Link>
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

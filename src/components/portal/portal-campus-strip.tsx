import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/content/site";

/** Contact strip for enrolled students — no public street address. */
export function PortalCampusStrip() {
  return (
    <aside className="mt-10 border-t border-line pt-6 print:hidden">
      <div className="rounded-[var(--radius)] border border-line bg-canvas px-5 py-4 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-faint">Need help?</p>
        <p className="mt-2 text-sm text-ink-2">{site.location.label}</p>
        <p className="mt-1.5 text-xs text-muted">
          Message admissions on WhatsApp or call — quote your roll number.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={site.whatsapp.href} className="btn btn-primary btn-sm">
            <MessageCircle className="size-3.5" aria-hidden />
            WhatsApp
          </a>
          <a href={site.phone.href} className="btn btn-outline btn-sm">
            <Phone className="size-3.5" aria-hidden />
            {site.phone.display}
          </a>
        </div>
      </div>
    </aside>
  );
}

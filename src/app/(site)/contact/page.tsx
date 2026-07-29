import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { site } from "@/content/site";
import { InquiryForm } from "@/components/forms/inquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, WhatsApp, email or visit SkillsProMax — near Govt. Associate College for Women, Allahabad, Depalpur–Kasur Road, Tehsil Depalpur, District Okara.",
};

export default function ContactPage() {
  return (
    <div className="border-b border-line">
      <div className="shell grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Contact</p>
          <h1 className="display-lg mt-5">Talk to a person.</h1>
          <p className="lede mt-5">
            Most people here would rather call than fill in a form, and that is completely
            fine. The number below reaches a real person during opening hours.
          </p>

          <div className="mt-10 space-y-7">
            <div className="flex gap-4">
              <Phone className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="text-sm font-semibold text-ink">Phone</h2>
                <a
                  href={site.phone.href}
                  className="mt-1 block text-[1.0625rem] text-ink-2 hover:text-accent"
                >
                  {site.phone.display}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <MessageCircle className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="text-sm font-semibold text-ink">WhatsApp</h2>
                <a
                  href={site.whatsapp.href}
                  className="mt-1 block text-[1.0625rem] text-ink-2 hover:text-accent"
                >
                  {site.whatsapp.display}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="text-sm font-semibold text-ink">Email</h2>
                <dl className="mt-2 space-y-2 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-faint">Admissions</dt>
                    <dd>
                      <a
                        href={`mailto:${site.emails.admissions}`}
                        className="text-ink-2 hover:text-accent"
                      >
                        {site.emails.admissions}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-faint">
                      General enquiries
                    </dt>
                    <dd>
                      <a href={`mailto:${site.emails.info}`} className="text-ink-2 hover:text-accent">
                        {site.emails.info}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-faint">
                      Current students
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${site.emails.support}`}
                        className="text-ink-2 hover:text-accent"
                      >
                        {site.emails.support}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="text-sm font-semibold text-ink">Visit</h2>
                <address className="mt-1 not-italic text-[0.9375rem] leading-relaxed text-ink-2">
                  {site.address.landmark}
                  <br />
                  {site.address.road}
                  <br />
                  {site.address.tehsil}, {site.address.district}
                </address>
                <p className="mt-2 text-[0.8125rem] text-muted">
                  Walk in any day — no appointment needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="text-sm font-semibold text-ink">Opening hours</h2>
                <dl className="mt-1 space-y-1 text-[0.9375rem] text-ink-2">
                  {site.hours.map((h) => (
                    <div key={h.label} className="flex gap-2">
                      <dt>{h.label}:</dt>
                      <dd>{h.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <h2 className="display-md">Or send us a message</h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
            This goes straight to our admissions team. We usually reply within one working
            day.
          </p>
          <div className="mt-6">
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}

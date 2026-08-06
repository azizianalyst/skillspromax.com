import { CheckCircle2, Clock, MessageCircle, Phone, Shield } from "lucide-react";
import { ApplicationForm } from "@/components/forms/application-form";
import { site } from "@/content/site";

const steps = [
  {
    title: "Submit in 3 minutes",
    body: "Pick a program, tell us where you are, and share how to reach you.",
  },
  {
    title: "We call within 2 working days",
    body: "Fees in USD, batch timing for your zone, and an honest fit check.",
  },
  {
    title: "Entry assessment if it fits",
    body: "If another path is better, we say so before you pay anything.",
  },
];

export function ApplySection() {
  return (
    <section id="apply" className="scroll-mt-24 border-b border-line bg-sand">
      <div className="shell section">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-4">
            <p className="eyebrow">Apply</p>
            <h2 className="display-lg mt-4">Apply free</h2>
            <p className="lede mt-4">
              Start with the essentials. Expand “Fill full application” only if you want to add more now.
            </p>

            <ol className="mt-8 space-y-4">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="mt-8 space-y-2.5 text-sm text-ink-2">
              <li className="flex gap-2">
                <Shield className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                Separate male / female online cohorts
              </li>
              <li className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                Live batches across time zones
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                We never guarantee a job or income
              </li>
            </ul>

            <div className="mt-8 card p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-faint">Prefer to talk first?</p>
              <div className="mt-3 flex flex-col gap-2">
                <a href={site.whatsapp.href} className="btn btn-primary btn-sm w-full">
                  <MessageCircle className="size-4" aria-hidden />
                  WhatsApp {site.whatsapp.display}
                </a>
                <a href={site.phone.href} className="btn btn-outline btn-sm w-full">
                  <Phone className="size-4" aria-hidden />
                  Call {site.phone.display}
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <ApplicationForm />
          </div>
        </div>
      </div>
    </section>
  );
}

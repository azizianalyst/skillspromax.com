import { ApplicationForm } from "@/components/forms/application-form";
import { site } from "@/content/site";

export function ApplySection() {
  return (
    <section id="apply" className="scroll-mt-24 border-b border-line bg-panel">
      <div className="shell section">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="eyebrow">Admissions</p>
            <h2 className="display-lg mt-5">Apply free</h2>
            <p className="lede mt-5">
              No fee to apply. Tell us your city and program interest. We call within two
              working days — and we will say if a free government course is the better start
              for you.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              <li>
                WhatsApp:{" "}
                <a href={site.whatsapp.href} className="text-accent hover:underline">
                  {site.whatsapp.display}
                </a>
              </li>
              <li>
                Call:{" "}
                <a href={site.phone.href} className="text-accent hover:underline">
                  {site.phone.display}
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href={`mailto:${site.emails.admissions}`}
                  className="text-accent hover:underline"
                >
                  {site.emails.admissions}
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-8">
            <ApplicationForm />
          </div>
        </div>
      </div>
    </section>
  );
}

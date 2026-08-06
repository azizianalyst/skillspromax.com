import { ApplicationForm } from "@/components/forms/application-form";
import { site } from "@/content/site";

export function ApplySection() {
  return (
    <section id="apply" className="scroll-mt-24 border-b border-line">
      <div className="shell section">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Apply</p>
            <h2 className="display-lg mt-4">Apply free</h2>
            <p className="lede mt-4">
              No fee. Tell us your city and program. We call within two working days.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              <li>
                WhatsApp:{" "}
                <a href={site.whatsapp.href} className="font-medium text-ink hover:underline">
                  {site.whatsapp.display}
                </a>
              </li>
              <li>
                Call:{" "}
                <a href={site.phone.href} className="font-medium text-ink hover:underline">
                  {site.phone.display}
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

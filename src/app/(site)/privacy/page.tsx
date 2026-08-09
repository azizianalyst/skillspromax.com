import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How SkillsProMax handles personal information from applications, enquiries and student accounts for our Dubai-based online programs.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="border-b border-line">
      <div className="shell py-14 md:py-20">
        <p className="eyebrow">Policy</p>
        <h1 className="display-lg mt-5">Privacy</h1>

        <div className="prose-doc mt-10">
          <h2>What we collect</h2>
          <p>
            When you apply or send an enquiry we collect your name, phone number, and
            optionally your email, ID or passport details, city, country, education and
            the information you type into the form. If you enrol, we also keep attendance,
            assessment and fee records.
          </p>

          <h2>Why we collect it</h2>
          <p>
            To contact you about your application, to place you in the correct online
            cohort, to keep student and fee records, and to calculate the outcome figures
            we publish. Published outcome figures are always aggregate — we never publish
            an individual student&rsquo;s name or earnings without their written permission.
          </p>

          <h2>Who can see it</h2>
          <p>
            Only our admissions and teaching staff. We do not sell your information, and we
            do not share it with third parties for marketing. We will never pass your phone
            number to another institute or business.
          </p>

          <h2>ID and identity documents</h2>
          <p>
            National ID, Emirates ID or passport details are optional at application. We
            may ask for them at enrolment for our own student records only. They are not
            shared with anyone.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Application records are kept for two years. Student records are kept for five
            years after completion so we can verify your enrolment if a future employer or
            client asks.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to correct or delete your information at any time by emailing{" "}
            <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a>. You can ask
            us to stop contacting you and we will.
          </p>

          <h2>This website</h2>
          <p>
            We use a session cookie for the student and staff portal. We do not run
            advertising trackers on this site.
          </p>

          <h2>Contact</h2>
          <p>
            Questions:{" "}
            <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a>
            {" · "}
            <a href={site.whatsapp.href}>WhatsApp {site.whatsapp.display}</a>
          </p>
        </div>
      </div>
    </section>
  );
}

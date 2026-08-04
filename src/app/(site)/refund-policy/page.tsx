import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Refund Policy",
  description:
    "SkillsProMax refund policy for programs in Depalpur — written publicly and honoured. Read before you enrol.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <section className="border-b border-line">
      <div className="shell py-14 md:py-20">
        <p className="eyebrow">Policy</p>
        <h1 className="display-lg mt-5">Refund policy</h1>

        <div className="prose-doc mt-10">
          <p>
            Refund stonewalling is one of the most common complaints against paid training
            providers in Pakistan. So ours is written here in plain language, and we honour
            it without argument.
          </p>

          <h2>Before your batch starts</h2>
          <p>
            Full refund of any fee paid, no questions asked and no deduction.
          </p>

          <h2>Within the first week of your batch</h2>
          <p>
            Full refund of the month&rsquo;s fee if you decide the program is not right for
            you. Tell us in person, by phone or by email — whichever is easiest.
          </p>

          <h2>After the first week</h2>
          <p>
            The current month&rsquo;s fee is not refundable, because the seat and the
            instructor time have been committed. You will not be charged for any month you
            have not yet started, and there is no penalty for leaving.
          </p>

          <h2>If we cancel or fail to deliver</h2>
          <p>
            If we cancel a batch, or if we fail to deliver what is described on the program
            page, you receive a full refund of every rupee paid for the undelivered
            portion. This applies regardless of timing.
          </p>

          <h2>If you need to pause</h2>
          <p>
            Illness, family emergency, harvest season, a job that changes shift — tell us
            and we will move you to a later batch instead of taking your money for a course
            you cannot attend. There is no charge for transferring batches once.
          </p>

          <h2>How to request a refund</h2>
          <p>
            Email <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a> with
            your name and reference number, or come to the office. We will respond within
            three working days and process approved refunds within fourteen days.
          </p>

          <h2>If we get it wrong</h2>
          <p>
            If we do not honour this policy, say so publicly and email{" "}
            <a href={`mailto:${site.emails.info}`}>{site.emails.info}</a> directly. We have
            published this commitment precisely so that it can be held against us.
          </p>
        </div>
      </div>
    </section>
  );
}

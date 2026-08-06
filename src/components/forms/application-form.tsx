"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle, Phone, MessageCircle } from "lucide-react";
import { submitApplication, type FormState } from "@/app/actions/apply";
import { programs, site } from "@/content/site";
import { formatMoney } from "@/lib/utils";

const initial: FormState = { ok: false };

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p className="mt-1.5 flex items-start gap-1.5 text-xs text-[color:var(--color-danger)]">
      <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden />
      {errors[0]}
    </p>
  );
}

export function ApplicationForm({ defaultProgram }: { defaultProgram?: string }) {
  const [state, action, pending] = useActionState(submitApplication, initial);

  if (state.ok && state.reference) {
    return (
      <div className="card p-8 md:p-10">
        <CheckCircle2 className="size-9 text-accent" aria-hidden />
        <h2 className="display-md mt-5">Application received</h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
          Your reference number is{" "}
          <strong className="tnum text-ink">{state.reference}</strong>. Please keep it —
          quote it when you call or WhatsApp.
        </p>

        <ol className="mt-7 space-y-3 border-t border-line pt-6 text-[0.9375rem] text-ink-2">
          <li className="flex gap-3">
            <span className="tnum font-display text-accent">1.</span>
            Someone from admissions will call you within two working days.
          </li>
          <li className="flex gap-3">
            <span className="tnum font-display text-accent">2.</span>
            We will explain the program, fees and online timings, and answer your questions.
          </li>
          <li className="flex gap-3">
            <span className="tnum font-display text-accent">3.</span>
            If it suits you, we arrange your entry assessment.
          </li>
        </ol>

        <p className="mt-7 border-t border-line pt-6 text-sm leading-relaxed text-muted">
          If a different program suits you better we will say so — including if a free
          government course is genuinely the better choice for you right now.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={`${site.whatsapp.href}?text=${encodeURIComponent(
              `Assalam-o-Alaikum, I applied to SkillsProMax. Reference: ${state.reference}`,
            )}`}
            className="btn btn-primary"
          >
            <MessageCircle className="size-4" aria-hidden /> WhatsApp with reference
          </a>
          <a href={site.phone.href} className="btn btn-outline">
            <Phone className="size-4" aria-hidden /> {site.phone.display}
          </a>
        </div>
      </div>
    );
  }

  const e = state.errors ?? {};

  return (
    <form action={action} className="card p-6 md:p-8" noValidate>
      {state.message && !state.ok && (
        <div
          role="alert"
          className="mb-7 flex items-start gap-2.5 rounded-[var(--radius-sm)] border border-[color:var(--color-danger)] bg-[color:var(--color-danger-soft)] p-4 text-sm text-[color:var(--color-danger)]"
        >
          <AlertCircle className="mt-px size-4 shrink-0" aria-hidden />
          {state.message}
        </div>
      )}

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* ---------------- Program ---------------- */}
      <fieldset>
        <legend className="font-display text-xl">1 · Which program?</legend>
        <p className="mt-1.5 text-sm text-muted">
          Not sure? Choose the closest one — we will guide you on the call.
        </p>

        <div className="mt-5 space-y-2.5">
          {programs.map((p) => (
            <label
              key={p.slug}
              className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-sm)] border border-line p-4 transition-colors hover:border-line-strong has-checked:border-accent has-checked:bg-accent-soft"
            >
              <input
                type="radio"
                name="programSlug"
                value={p.slug}
                defaultChecked={defaultProgram === p.slug}
                className="mt-1 accent-[color:var(--color-accent)]"
              />
              <span className="flex-1">
                <span className="block text-sm font-semibold text-ink">{p.name}</span>
                <span className="mt-0.5 block text-xs text-muted">{p.audience}</span>
                <span className="mt-1.5 block text-xs tnum text-ink-2">
                  {formatMoney(p.feeMonthly)}/month · {p.feeMonths} months · {p.duration}
                </span>
              </span>
            </label>
          ))}
        </div>
        <FieldError errors={e.programSlug} />
      </fieldset>

      <hr className="hair my-8" />

      {/* ---------------- About you ---------------- */}
      <fieldset>
        <legend className="font-display text-xl">2 · About you</legend>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="fullName">
              Full name <span className="text-[color:var(--color-danger)]">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              className="field"
              required
              autoComplete="name"
              aria-invalid={!!e.fullName}
            />
            <FieldError errors={e.fullName} />
          </div>

          <div>
            <label className="label" htmlFor="fatherName">Father&rsquo;s name</label>
            <input id="fatherName" name="fatherName" className="field" />
            <FieldError errors={e.fatherName} />
          </div>

          <div className="sm:col-span-2">
            <span className="label">
              Gender <span className="text-[color:var(--color-danger)]">*</span>
            </span>
            <div className="flex gap-3">
              {[
                ["MALE", "Male"],
                ["FEMALE", "Female"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-line px-4 py-2.5 text-sm transition-colors hover:border-line-strong has-checked:border-accent has-checked:bg-accent-soft has-checked:text-accent"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={value}
                    required
                    className="accent-[color:var(--color-accent)]"
                  />
                  {label}
                </label>
              ))}
            </div>
            <p className="hint">
              We ask only to place you in the correct batch. Male and female students are
              taught in separate cohorts.
            </p>
            <FieldError errors={e.gender} />
          </div>

          <div>
            <label className="label" htmlFor="phone">
              Mobile number <span className="text-[color:var(--color-danger)]">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              className="field"
              placeholder="0300 1234567"
              required
              autoComplete="tel"
              aria-invalid={!!e.phone}
            />
            <FieldError errors={e.phone} />
          </div>

          <div>
            <label className="label" htmlFor="whatsapp">WhatsApp number</label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="tel"
              className="field"
              placeholder="If different from above"
            />
            <FieldError errors={e.whatsapp} />
          </div>

          <div>
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="field"
              autoComplete="email"
              aria-invalid={!!e.email}
            />
            <p className="hint">Optional, but we will email your reference number.</p>
            <FieldError errors={e.email} />
          </div>

          <div>
            <label className="label" htmlFor="cnic">Emirates ID / passport (optional)</label>
            <input
              id="cnic"
              name="cnic"
              className="field"
              placeholder="Optional — for admissions records"
              aria-invalid={!!e.cnic}
            />
            <FieldError errors={e.cnic} />
          </div>

          <div>
            <label className="label" htmlFor="city">
              City <span className="text-[color:var(--color-danger)]">*</span>
            </label>
            <input
              id="city"
              name="city"
              className="field"
              required
              placeholder="e.g. Dubai, Abu Dhabi, Sharjah, Ajman"
              aria-invalid={!!e.city}
            />
            <FieldError errors={e.city} />
          </div>

          <div>
            <label className="label" htmlFor="education">Education</label>
            <input
              id="education"
              name="education"
              className="field"
              placeholder="e.g. FSc, BA 2nd year, BS Computer Science"
            />
            <FieldError errors={e.education} />
          </div>
        </div>
      </fieldset>

      <hr className="hair my-8" />

      {/* ---------------- Practical ---------------- */}
      <fieldset>
        <legend className="font-display text-xl">3 · Practical details</legend>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="preferredSlot">Preferred timing</label>
            <select id="preferredSlot" name="preferredSlot" className="field" defaultValue="">
              <option value="">No preference</option>
              <option value="MORNING">Morning · 8:00 – 10:30 AM</option>
              <option value="MIDDAY">Midday · 11:00 AM – 1:30 PM</option>
              <option value="AFTERNOON">Afternoon · 2:30 – 5:00 PM</option>
              <option value="EVENING">Evening · 5:30 – 8:00 PM</option>
            </select>
            <p className="hint">
              During wheat and potato harvest we will move your batch rather than lose you.
            </p>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-sm)] border border-line p-4">
            <input
              type="checkbox"
              name="hasComputer"
              className="mt-0.5 accent-[color:var(--color-accent)]"
            />
            <span className="text-sm text-ink-2">
              I have my own laptop or computer
              <span className="mt-0.5 block text-xs text-muted">
                Not required — we have machines at the campus.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-sm)] border border-line p-4">
            <input
              type="checkbox"
              name="hasInternet"
              className="mt-0.5 accent-[color:var(--color-accent)]"
            />
            <span className="text-sm text-ink-2">
              I have internet at home
              <span className="mt-0.5 block text-xs text-muted">
                Useful for practice, but not a condition of admission.
              </span>
            </span>
          </label>

          <div className="sm:col-span-2">
            <label className="label" htmlFor="howHeard">How did you hear about us?</label>
            <input
              id="howHeard"
              name="howHeard"
              className="field"
              placeholder="Facebook, a friend, passed the building…"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label" htmlFor="motivation">
              Why do you want to join? What would you like to be earning a year from now?
            </label>
            <textarea id="motivation" name="motivation" rows={4} className="field" />
            <p className="hint">
              A few honest lines is plenty. We read every one of these.
            </p>
            <FieldError errors={e.motivation} />
          </div>
        </div>
      </fieldset>

      <hr className="hair my-8" />

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 accent-[color:var(--color-accent)]"
        />
        <span className="text-sm leading-relaxed text-ink-2">
          You may contact me by phone, WhatsApp or email about my application.{" "}
          <span className="text-[color:var(--color-danger)]">*</span>
        </span>
      </label>
      <FieldError errors={e.consent} />

      <button type="submit" disabled={pending} className="btn btn-primary btn-lg mt-7 w-full">
        {pending ? "Sending…" : "Submit application"}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        No fee is due at this stage. Applying does not commit you to anything.
      </p>
    </form>
  );
}

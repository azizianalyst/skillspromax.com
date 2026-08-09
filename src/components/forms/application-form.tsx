"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Phone,
} from "lucide-react";
import { submitApplication, type FormState } from "@/app/actions/apply";
import { programs, site } from "@/content/site";
import { formatMoney } from "@/lib/utils";

const initial: FormState = { ok: false };

const paths = [
  { id: "beginner", label: "Beginner / student", recommend: "foundation" },
  { id: "clients", label: "Want client work", recommend: "ai-automation-practitioner" },
  { id: "freelancer", label: "Freelancer losing rates", recommend: "re-skill" },
  { id: "employed", label: "Already employed", recommend: "advance" },
] as const;

const FULL_ONLY_FIELDS = [
  "fatherName",
  "whatsapp",
  "email",
  "cnic",
  "education",
  "preferredSlot",
  "motivation",
  "howHeard",
] as const;

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
  const [path, setPath] = useState<(typeof paths)[number]["id"] | null>(null);
  const [programSlug, setProgramSlug] = useState(defaultProgram ?? "foundation");
  const [fullForm, setFullForm] = useState(false);

  const selected = useMemo(
    () => programs.find((p) => p.slug === programSlug) ?? programs[0],
    [programSlug],
  );

  useEffect(() => {
    if (!state.errors) return;
    const needsFull = FULL_ONLY_FIELDS.some((key) => state.errors?.[key]?.length);
    if (needsFull) setFullForm(true);
  }, [state.errors]);

  if (state.ok && state.reference) {
    return (
      <div className="card p-8 md:p-10">
        <CheckCircle2 className="size-9 text-accent" aria-hidden />
        <h2 className="display-md mt-5">Application received</h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
          Your reference number is{" "}
          <strong className="tnum text-ink">{state.reference}</strong>. Keep it —
          quote it when you call or WhatsApp.
        </p>

        <ol className="mt-7 space-y-3 border-t border-line pt-6 text-[0.9375rem] text-ink-2">
          <li className="flex gap-3">
            <span className="tnum font-semibold text-accent">1.</span>
            Admissions calls you within two working days.
          </li>
          <li className="flex gap-3">
            <span className="tnum font-semibold text-accent">2.</span>
            We explain the program, USD fees, and live timings for your time zone.
          </li>
          <li className="flex gap-3">
            <span className="tnum font-semibold text-accent">3.</span>
            If it fits, we arrange your entry assessment. If not, we say so before you pay.
          </li>
        </ol>

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
    <form action={action} className="card relative overflow-hidden p-6 md:p-8" noValidate>
      {state.message && !state.ok && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2.5 rounded-xl border border-[color:var(--color-danger)] bg-[color:var(--color-danger-soft)] p-4 text-sm text-[color:var(--color-danger)]"
        >
          <AlertCircle className="mt-px size-4 shrink-0" aria-hidden />
          {state.message}
        </div>
      )}

      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Online-first delivery mode for admissions context */}
      <input type="hidden" name="deliveryMode" value="ONLINE_LIVE" />
      <input type="hidden" name="hasInternet" value="true" />

      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">Quick apply</p>
        <span className="chip chip-accent">{fullForm ? "Full form" : "Minimum"}</span>
      </div>

      {/* Program — compact */}
      <fieldset>
        <legend className="text-base font-semibold text-ink">Which program?</legend>
        <p className="mt-1 text-sm text-muted">Tap who you are — we pre-select the best match.</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {paths.map((p) => {
            const selectedPath = path === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setPath(selectedPath ? null : p.id);
                  if (!selectedPath) setProgramSlug(p.recommend);
                }}
                className={
                  "pill " + (selectedPath ? "border-accent bg-accent-soft text-accent" : "")
                }
                aria-pressed={selectedPath}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {programs.map((p) => {
            const checked = programSlug === p.slug;
            const recommended = path
              ? paths.find((x) => x.id === path)?.recommend === p.slug
              : false;
            return (
              <label
                key={p.slug}
                className={
                  "flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition-colors " +
                  (checked
                    ? "border-accent bg-accent-soft"
                    : "border-line hover:border-line-strong")
                }
              >
                <input
                  type="radio"
                  name="programSlug"
                  value={p.slug}
                  checked={checked}
                  onChange={() => setProgramSlug(p.slug)}
                  className="mt-1 accent-[color:var(--color-accent)]"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="text-sm font-semibold text-ink">{p.name}</span>
                    {recommended && <span className="chip chip-accent">Best</span>}
                  </span>
                  <span className="mt-0.5 block text-xs tnum text-muted">
                    {formatMoney(p.feeMonthly)}/mo · {p.duration}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        <FieldError errors={e.programSlug} />

        <div className="mt-3 rounded-xl bg-sand px-3.5 py-2.5 text-xs text-muted">
          <span className="font-semibold text-ink">{selected.name}</span>
          {" · "}
          {formatMoney(selected.feeMonthly)}/mo · {formatMoney(selected.feeMonthly * selected.feeMonths)} total
        </div>
      </fieldset>

      <hr className="hair my-6" />

      {/* Minimum required fields */}
      <fieldset>
        <legend className="text-base font-semibold text-ink">Essentials</legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
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
            <label className="label" htmlFor="phone">
              Mobile / WhatsApp <span className="text-[color:var(--color-danger)]">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              className="field"
              placeholder="+971 50 208 3909"
              required
              autoComplete="tel"
              aria-invalid={!!e.phone}
            />
            <FieldError errors={e.phone} />
          </div>

          <div>
            <span className="label">
              Gender <span className="text-[color:var(--color-danger)]">*</span>
            </span>
            <div className="flex gap-2">
              {[
                ["MALE", "Male"],
                ["FEMALE", "Female"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-line px-3 py-2.5 text-sm transition-colors has-checked:border-accent has-checked:bg-accent-soft has-checked:text-accent"
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
            <FieldError errors={e.gender} />
          </div>

          <div>
            <label className="label" htmlFor="country">
              Country <span className="text-[color:var(--color-danger)]">*</span>
            </label>
            <input
              id="country"
              name="country"
              className="field"
              required
              autoComplete="country-name"
              placeholder="e.g. UAE, UK, Pakistan"
            />
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
              autoComplete="address-level2"
              placeholder="e.g. Dubai, London"
              aria-invalid={!!e.city}
            />
            <FieldError errors={e.city} />
          </div>
        </div>
      </fieldset>

      {/* Expand full form */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setFullForm((v) => !v)}
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-sand px-4 py-3 text-left text-sm font-semibold text-ink hover:bg-sand-deep"
          aria-expanded={fullForm}
        >
          <span>{fullForm ? "Hide extra details" : "Fill full application"}</span>
          <ChevronDown
            className={"size-4 text-muted transition-transform " + (fullForm ? "rotate-180" : "")}
            aria-hidden
          />
        </button>
        <p className="mt-2 text-xs text-muted">
          Optional. You can submit with essentials only — we collect the rest on the call.
        </p>
      </div>

      {fullForm && (
        <fieldset className="mt-5">
          <legend className="sr-only">Full application details</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="fatherName">Guardian / parent name</label>
              <input id="fatherName" name="fatherName" className="field" autoComplete="off" />
              <FieldError errors={e.fatherName} />
            </div>

            <div>
              <label className="label" htmlFor="whatsapp">WhatsApp (if different)</label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="tel"
                className="field"
                placeholder="Same as mobile is fine"
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
              <FieldError errors={e.email} />
            </div>

            <div>
              <label className="label" htmlFor="cnic">ID / passport (optional)</label>
              <input
                id="cnic"
                name="cnic"
                className="field"
                placeholder="Emirates ID, passport, or national ID"
                aria-invalid={!!e.cnic}
              />
              <FieldError errors={e.cnic} />
            </div>

            <div className="sm:col-span-2">
              <label className="label" htmlFor="education">Education</label>
              <input
                id="education"
                name="education"
                className="field"
                placeholder="e.g. High school, bachelor's, currently studying"
              />
              <FieldError errors={e.education} />
            </div>

            <div className="sm:col-span-2">
              <label className="label" htmlFor="preferredSlot">Preferred live timing</label>
              <select id="preferredSlot" name="preferredSlot" className="field" defaultValue="">
                <option value="">No preference — match my time zone</option>
                <option value="MORNING">Morning (Gulf time)</option>
                <option value="MIDDAY">Midday (Gulf time)</option>
                <option value="AFTERNOON">Afternoon (Gulf time)</option>
                <option value="EVENING">Evening (Gulf time)</option>
              </select>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-4">
              <input
                type="checkbox"
                name="hasComputer"
                className="mt-0.5 accent-[color:var(--color-accent)]"
              />
              <span className="text-sm text-ink-2">
                I have a laptop or computer for class
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-4">
              <input
                type="checkbox"
                name="hasInternet"
                className="mt-0.5 accent-[color:var(--color-accent)]"
                defaultChecked
              />
              <span className="text-sm text-ink-2">
                I have stable internet for video calls
              </span>
            </label>

            <div className="sm:col-span-2">
              <label className="label" htmlFor="howHeard">How did you hear about us?</label>
              <input
                id="howHeard"
                name="howHeard"
                className="field"
                placeholder="Google, Instagram, a friend, WhatsApp…"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label" htmlFor="motivation">
                Why do you want to join — and what does success look like in a year?
              </label>
              <textarea id="motivation" name="motivation" rows={3} className="field" />
              <FieldError errors={e.motivation} />
            </div>
          </div>
        </fieldset>
      )}

      <hr className="hair my-6" />

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

      <button type="submit" disabled={pending} className="btn btn-primary btn-lg mt-6 w-full">
        {pending ? "Sending…" : `Apply free · ${selected.name}`}
      </button>

      <p className="mt-3 text-center text-xs leading-relaxed text-muted">
        No fee due now. {fullForm ? "Full application" : "Minimum apply"} — we can finish details on the call.
      </p>
    </form>
  );
}

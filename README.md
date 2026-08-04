# SkillsProMax — website

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Prisma + Postgres · Auth.js v5

Institute site, admissions CRM and admin panel for SkillsProMax, Tehsil Depalpur,
District Okara.

---

## Important: hosting

**Hostinger *shared* hosting cannot run this app.** Shared hosting only serves a static
export — no server routes, so no login, no admin panel, no database, and no JazzCash
callback verification.

Pick one of these instead. The code is identical for all three.

| Option | Cost | Notes |
|---|---|---|
| **Vercel** (recommended) | Free tier is enough to start | Keep the domain at Hostinger, point DNS at Vercel. Email stays at Hostinger. |
| Hostinger VPS | ~$5–20/mo | Everything on one bill. You maintain Node, PM2/Docker, SSL. |
| Hostinger managed Node.js / Next.js hosting | Varies | Handles build and runtime for you. |

Your `@skillspromax.com` mailboxes stay at Hostinger either way — the app sends through
Hostinger SMTP so replies land in the inbox staff already check.

---

## Local setup

```bash
cd web
npm install

cp .env.example .env      # then fill it in — see below
npx prisma generate
npx prisma db push        # creates the tables
npm run db:seed           # creates the first admin user + seeds the course catalogue

npm run dev               # http://localhost:3000
```

### Environment variables

| Variable | What it is |
|---|---|
| `DATABASE_URL` | Postgres connection string. [Neon](https://neon.tech) free tier works well. |
| `AUTH_SECRET` | Generate with `openssl rand -base64 32` |
| `AUTH_URL` | `http://localhost:3000` locally, `https://skillspromax.com` in production |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` | From Hostinger → Emails → Configuration. Use the `admission@` mailbox. |
| `MAIL_ADMISSIONS` | `admission@skillspromax.com` — **every form on the site notifies this address** |
| `MAIL_INFO` / `MAIL_SUPPORT` | Shown on the contact page |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Used once by `npm run db:seed`. Change the password immediately after first login. |
| `JAZZCASH_*` | Phase 4. Leave blank until you have merchant credentials. |

---

## Structure

```
src/
  app/
    page.tsx                 Home
    programs/                Index + [slug] detail
    apply/                   Application form
    admissions/              Process + full fee table
    campus/                  Building, separate halls, timings
    parents/                 Parent-facing Q&A
    business/                Local business services + enquiry form
    why-us/  outcomes/  promises/
    contact/  refund-policy/  privacy/
    actions/apply.ts         Server actions: application + enquiry
    portal/                  Student portal (overview, fees, profile)
    api/payments/jazzcash/   Hosted checkout return + IPN
  components/
    layout/                  Header, footer
    home/                    Homepage sections
    forms/                   Application form, enquiry form
    portal/                  Student portal UI
  content/site.ts            ← ALL COPY LIVES HERE
  lib/                       db, mail, validation, jazzcash, fees, student
prisma/schema.prisma         Data model
```

**Edit copy in `src/content/site.ts`, not in components.** Programs, fees, timings,
addresses, promises and the parent Q&A are all there.

### Before launch — replace these

- `src/content/site.ts` → campus phone / WhatsApp (`+92 329 1522376`)
- Add real photographs of the halls and building to `public/` and wire them into
  `campus/page.tsx` and the homepage hero. Real photos of *this* building matter more
  than anything else on the site — do not use stock imagery.

---

## Design system

White canvas, near-black text, one deep green accent (`#0b5b45`). Editorial serif
headlines (Instrument Serif) with Inter for everything else. Borders instead of shadows,
small radii, no gradients. Tokens live at the top of `src/app/globals.css` under `@theme`.

Utility classes worth knowing: `.shell` (page gutter), `.section` (vertical rhythm),
`.display-xl/lg/md`, `.lede`, `.eyebrow`, `.card`, `.btn` + `.btn-primary/outline/ghost/ink`,
`.field`, `.label`, `.chip`, `.tnum` (tabular figures for money).

---

## Data model notes

- **`Application`** is the CRM record. `ApplicationStatus` is the pipeline:
  `NEW → CONTACTED → ASSESSMENT_SCHEDULED → ASSESSED → OFFERED → ENROLLED`
  (or `REJECTED` / `WITHDRAWN`). Every status change should be logged as an
  `ApplicationNote` so there's an audit trail of who said what.
- **`Batch.gender`** is required. Boys and girls are taught in separate batches, always —
  the schema enforces the policy rather than relying on staff discipline.
- **`Enrollment.deliverableShipped`** is what "completed" means. Attendance is not
  completion, and the published outcome figures depend on this field being honest.
- **`CohortOutcome`** holds the six published figures per batch, including
  `earnedNothing`. Publishing the bad number is the point.
- **`FeePayment`** statuses: `PENDING` → `VERIFIED` (or `FAILED`). Students pay from
  `/portal/fees`; staff confirm on `/admin/fees`. JazzCash hosted checkout sets
  `gatewayRef` and verifies via return/IPN when merchant credentials are configured.

---

## Status

- [x] Public site (13 pages)
- [x] Application form → database + `admission@` notification + applicant acknowledgement
- [x] Enquiry form → database + `admission@`
- [x] Prisma schema
- [x] Auth (Auth.js v5, roles: ADMIN / STAFF / STUDENT)
- [x] Admin panel: dashboard, applications pipeline (with status/notes/assignment), inquiries, batches, fees, outcomes
- [x] Student portal (overview, fees, profile, manual payment submission)
- [x] JazzCash hosted checkout (activates when `JAZZCASH_*` env is set) + Easypaisa via manual txn ID

## Verify before you trust it

`npx tsc --noEmit`, `npm run build`, and a full click-through (including sign-in,
the admin pipeline, both public forms, and the student portal) have been run against
this code with the local SQLite dev database. Re-run the same steps after any schema
or dependency change:

```bash
npm install
npx tsc --noEmit     # type errors
npm run build        # build errors
npm run dev          # then click through every page
```

Then test: submit an application, check the row lands in the database, and check the
email arrives at `admission@skillspromax.com` (requires real SMTP credentials in `.env`).

### Student portal smoke test

Seed creates a demo student (password from seed):

- Email: `usman.tariq@student.skillspromax.com`
- Password: `skillspromax-dev-123`

1. Sign in at `/login` → should land on `/portal`
2. Open Fees → pay Month 2 → submit a transaction ID
3. Sign in as admin → Fees → Verify
4. Sign back in as student → instalment shows Verified

JazzCash online button appears only when `JAZZCASH_MERCHANT_ID`, `JAZZCASH_PASSWORD`
and `JAZZCASH_INTEGRITY_SALT` are all set.
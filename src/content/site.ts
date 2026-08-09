/**
 * Single source of truth for site-wide content.
 * Edit copy here rather than inside components.
 */

export const site = {
  name: "SkillsProMax",
  tagline: "Learn skills that pay.",
  domain: "skillspromax.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://skillspromax.com",

  emails: {
    admissions: "admission@skillspromax.com",
    info: "info@skillspromax.com",
    support: "support@skillspromax.com",
  },

  phone: { display: "+971 50 208 3909", href: "tel:+971502083909" },
  whatsapp: { display: "+971 50 208 3909", href: "https://wa.me/971502083909" },

  /** Based in Dubai — students join online from anywhere. */
  location: {
    label: "Dubai-based · Online worldwide",
    country: "United Arab Emirates",
    city: "Dubai",
  },

  currency: "USD" as const,

  /** Internal notes — not shown on the public one-pager. */
  address: {
    landmark: "Dubai (online cohorts)",
    road: "",
    tehsil: "",
    district: "Dubai",
    country: "United Arab Emirates",
    get full() {
      return "Dubai, United Arab Emirates — online live batches worldwide";
    },
  },

  hours: [
    { label: "Monday – Saturday", value: "Live online batches (multiple time-zone slots)" },
    { label: "Sunday", value: "Workshops / catch-up by arrangement" },
  ],

  serviceArea: [
    "Worldwide",
    "United Arab Emirates",
    "Dubai",
    "Middle East",
    "Asia",
    "Europe",
    "Africa",
    "Americas",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Navigation — one-pager anchors                                      */
/* ------------------------------------------------------------------ */

export const nav = [
  { label: "Programs", href: "/#programs" },
  { label: "Fees", href: "/#fees" },
  { label: "FAQ", href: "/#faq" },
  { label: "Apply", href: "/#apply" },
] as const;

/* ------------------------------------------------------------------ */
/* Homepage — hero                                                     */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Dubai-based · Online worldwide",
  heading: "Learn skills that pay.",
  body:
    "Live online AI and automation training from Dubai. Join from anywhere in the world. Small batches. Monthly fees in USD. Real work before you finish.",
  primary: { label: "Apply free", href: "/#apply" },
  secondary: { label: "See programs", href: "/#programs" },
  points: [
    "Join from any country — laptop and internet",
    "Small batches with reviewed work",
    "Pay monthly in USD — no lump sum",
    "Finish with a real deliverable",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Differentiators                                                     */
/* ------------------------------------------------------------------ */

export const differentiators = [
  {
    title: "We teach what the market pays for in 2026",
    body:
      "AI automation, integration and applied AI work — the categories where demand and rates are still rising. We do not teach basic content writing, translation or basic graphic design, because those rates have fallen sharply since AI arrived. Teaching a dying skill is not a favour to anyone.",
  },
  {
    title: "You work on real businesses before you finish",
    body:
      "From the middle of the program, every student is given a real brief from a real business — a clinic, salon, trading company, logistics team, or school — and delivers it under supervision. You graduate with a working system and a written case study, not a printed certificate.",
  },
  {
    title: "Taught by people who do this work for money",
    body:
      "Our instructors deliver client projects. If we cannot do the work ourselves, we do not teach it. That is the whole standard.",
  },
  {
    title: "We publish our real numbers",
    body:
      "After every batch we publish how many enrolled, how many finished, how many earned money within 90 days, and how many earned nothing. Including the bad batches. That honesty is how you tell us apart.",
  },
  {
    title: "Small batches, with a real entry test",
    body:
      "Batches are capped so every student's work gets reviewed. There is an entry assessment, and not everyone passes. If a program is not right for you, we will tell you before you pay — and point you to a free or low-cost alternative if that genuinely suits you better.",
  },
  {
    title: "We never promise a job or an income",
    body:
      "No guaranteed placement. No fake income promises. We will show you honest ranges and honest timeframes. Any institute promising you a guaranteed income is selling you something else.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Honest comparison against the free alternatives                     */
/* ------------------------------------------------------------------ */

export const honestComparison = {
  heading: "There are free courses. Should you take them instead?",
  intro:
    "Sometimes yes, and we will say so. Free YouTube and Coursera paths exist. If money is the only constraint, start there — genuinely. Here is the honest difference.",
  rows: [
    {
      point: "Cost",
      free: "Free or low-cost recorded courses.",
      us: "Paid monthly in USD. We are the more expensive option and we will not pretend otherwise.",
    },
    {
      point: "Finishing",
      free: "Most people do not finish. Completion on free online courses typically runs well under 20%.",
      us: "A fixed live batch, attendance that is noticed, and a pass/fail on work you produced.",
    },
    {
      point: "What you build",
      free: "Practice exercises.",
      us: "A real system for a real business, supervised, plus a written case study you can show a client.",
    },
    {
      point: "Feedback",
      free: "Usually none. Nobody reviews your output.",
      us: "Your work is reviewed against the standard a paying client would apply.",
    },
    {
      point: "After the course",
      free: "You are on your own.",
      us: "Twelve months of support: proposal review, rate coaching, contract checks, and our alumni network.",
    },
    {
      point: "Best students",
      free: "No route onward.",
      us: "The strongest graduates in each cohort may be offered paid delivery work with us.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Programs                                                            */
/* ------------------------------------------------------------------ */

export type SkillSubModule = {
  title: string;
  body: string;
};

export type SkillModule = {
  title: string;
  body: string;
  /** Nested lessons / skill units inside this module */
  subModules: SkillSubModule[];
};

export type Program = {
  slug: string;
  name: string;
  image: string;
  audience: string;
  status: "open" | "waitlist" | "planned";
  duration: string;
  commitment: string;
  feeMonthly: number;
  feeMonths: number;
  entry: string;
  summary: string;
  outcome: string;
  honestNote: string;
  modules: SkillModule[];
  forYouIf: string[];
  notForYouIf: string[];
};

export const programs: Program[] = [
  {
    slug: "foundation",
    name: "Foundation",
    image: "/images/programs/foundation.jpg",
    audience: "Students, fresh graduates, complete beginners",
    status: "open",
    duration: "8 weeks",
    commitment: "3 days a week · 2 hours per session",
    feeMonthly: 99,
    feeMonths: 2,
    entry: "Matric or above. Basic computer familiarity. No coding needed.",
    summary:
      "The groundwork nobody else teaches. Not software tutorials — the ability to work like a professional: clear written English for clients, how the internet and APIs actually work, using AI properly and knowing when it is wrong, and handling data without making a mess.",
    outcome:
      "One working automation you built yourself, an honest picture of what digital work pays, and an assessment result that tells you which program to take next.",
    honestNote:
      "This will not make you money on its own. It is the foundation that makes the next program work — and the entry test at the end decides whether you are ready for it.",
    modules: [
      {
        title: "Professional English for client work",
        body: "Emails, updates, asking good questions, disagreeing politely, saying no. Work register, not grammar class.",
        subModules: [
          { title: "Client email craft", body: "Clear subject lines, status updates, and replies that do not waste a client's time." },
          { title: "Asking and clarifying", body: "How to ask good questions, confirm scope, and reduce rework before you start." },
          { title: "Saying no professionally", body: "Polite pushback, boundaries, and revision limits without losing the relationship." },
          { title: "Spoken work English", body: "Short calls, screen shares, and summarizing decisions after a meeting." },
        ],
      },
      {
        title: "How the internet actually works",
        body: "HTTP, APIs, JSON, webhooks, authentication — hands-on and without code.",
        subModules: [
          { title: "HTTP and URLs", body: "Requests, responses, status codes, and what 'the server said no' really means." },
          { title: "APIs and JSON", body: "Reading payloads, fields, nested data, and mapping one system to another." },
          { title: "Webhooks", body: "Event-driven flows: when a form submits, a payment clears, or a lead arrives." },
          { title: "Auth basics", body: "API keys, tokens, and why credentials must never sit in a shared spreadsheet." },
        ],
      },
      {
        title: "Using AI properly",
        body: "Context engineering rather than prompt tricks. Verification discipline before anything reaches a client.",
        subModules: [
          { title: "Context engineering", body: "Give models the right brief, examples, and constraints — not one clever sentence." },
          { title: "Model strengths and limits", body: "What current tools are good at, where they invent, and when not to trust them." },
          { title: "Verification drills", body: "Check facts, numbers, and code-like steps before you send work onward." },
          { title: "Safe AI habits", body: "Privacy, client data, and what never belongs in a public chat box." },
        ],
      },
      {
        title: "Data literacy",
        body: "Spreadsheets taken seriously, structured data, cleaning messy records, basic analysis with AI assistance.",
        subModules: [
          { title: "Spreadsheet discipline", body: "Tables, naming, and structures that survive more than one person editing." },
          { title: "Cleaning messy data", body: "Duplicates, dates, phone formats, and incomplete rows from real businesses." },
          { title: "Simple analysis", body: "Totals, filters, and questions a manager would actually ask." },
          { title: "AI-assisted checks", body: "Use AI to spot anomalies — then verify by hand before you act." },
        ],
      },
      {
        title: "Build one real thing",
        body: "A small working automation, start to finish, solving an actual problem.",
        subModules: [
          { title: "Pick a real problem", body: "Choose a workflow worth finishing — not a toy demo." },
          { title: "Map the steps", body: "Trigger, actions, outputs, and what success looks like." },
          { title: "Build and test", body: "Assemble the flow, break it on purpose, and fix the failure paths." },
          { title: "Handover note", body: "Write a short explanation so someone else can run what you built." },
        ],
      },
      {
        title: "The market, honestly",
        body: "What work exists, what it pays, what is dying, and what platforms really require.",
        subModules: [
          { title: "Work that still pays", body: "Categories rising in 2026 versus skills whose rates have collapsed." },
          { title: "Platform reality", body: "How Upwork and similar markets actually work — costs, rejection, and alternatives." },
          { title: "Local vs remote demand", body: "Gulf businesses, retainers, and international clients — honest ranges." },
          { title: "Your next program", body: "Read your Foundation result and choose the right ladder step." },
        ],
      },
    ],
    forYouIf: [
      "You are in college or recently finished and want a real direction",
      "You have tried free online courses and never finished one",
      "You are willing to be told the truth about where you stand",
    ],
    notForYouIf: [
      "You want to start earning within a month",
      "You are looking for a certificate to hang on a wall",
    ],
  },
  {
    slug: "ai-automation-practitioner",
    name: "AI Automation Practitioner",
    image: "/images/programs/ai-automation-practitioner.jpg",
    audience: "The flagship — for people ready to work with clients",
    status: "open",
    duration: "16 weeks",
    commitment: "4 days a week · 2.5 hours per session",
    feeMonthly: 149,
    feeMonths: 4,
    entry:
      "Foundation passed, or an entry assessment showing equivalent ability. Functional written English required.",
    summary:
      "Build the automation and AI systems that businesses pay a monthly retainer for. Lead handling, records, invoicing, reporting, document processing, AI agents inside real workflows — built to a standard a client will actually pay for and keep paying for.",
    outcome:
      "A shipped, documented system running for a real business, a written case study with a measurable result, and the commercial skills to price, invoice and get paid internationally.",
    honestNote:
      "Realistically, a strong graduate earns their first paid work within 60–90 days of finishing, often $400–$1,100 in the early months. Some earn nothing. We publish both numbers.",
    modules: [
      {
        title: "Weeks 1–2 · Foundations",
        body: "APIs, authentication, context engineering, professional AI tooling, verification discipline.",
        subModules: [
          { title: "API fluency lab", body: "Auth, headers, and reading real business APIs without guessing." },
          { title: "Context engineering studio", body: "Briefs, examples, and guardrails for production AI use." },
          { title: "Tooling setup", body: "Professional workspace, credentials hygiene, and cost awareness." },
          { title: "Verification standard", body: "The checklist before any output reaches a client." },
        ],
      },
      {
        title: "Weeks 3–5 · Build craft",
        body: "n8n as the primary tool, with Make and Zapier when a client requires them.",
        subModules: [
          { title: "n8n core craft", body: "Nodes, data mapping, branches, and reusable patterns." },
          { title: "Lead and CRM flows", body: "Capture, route, enrich, and notify without losing a lead." },
          { title: "Records and invoicing", body: "Sync sheets, invoices, and status updates across tools." },
          { title: "Documents and PDFs", body: "Parse, extract, and file documents into usable records." },
        ],
      },
      {
        title: "Weeks 6–10 · Production discipline",
        body: "Error handling, retries, logging, cost control, credentials and security. AI agents with human checkpoints.",
        subModules: [
          { title: "Failure paths", body: "Retries, alerts, and what happens when an API is down." },
          { title: "Logging and costs", body: "See what ran, what failed, and what it cost to run." },
          { title: "Security basics", body: "Secrets, access, and client data handled like a real vendor." },
          { title: "Agent checkpoints", body: "AI steps with human approval before irreversible actions." },
          { title: "Client brief kickoff", body: "Your real business brief begins under supervision." },
        ],
      },
      {
        title: "Weeks 11–14 · Client delivery",
        body: "Scope, acceptance criteria, documentation, handover, support and retainer design.",
        subModules: [
          { title: "Scope writing", body: "Turn a vague request into fixed deliverables and acceptance tests." },
          { title: "Build to ship", body: "Finish the client system to a standard they will keep paying for." },
          { title: "Documentation pack", body: "Handover notes, runbooks, and support boundaries." },
          { title: "Case study write-up", body: "Measurable result, before/after, and proof you can show next clients." },
        ],
      },
      {
        title: "Weeks 15–16 · Getting paid",
        body: "Pricing, contracts, invoices, and platform reality for freelancers worldwide.",
        subModules: [
          { title: "Pricing and retainers", body: "Stop racing to the bottom — price systems, not hours." },
          { title: "Payment basics", body: "Invoices and getting paid locally or internationally." },
          { title: "Contracts and disputes", body: "Simple agreements, revisions, and what to do when payment stalls." },
          { title: "Platform vs direct", body: "Marketplace costs and rejection — plus routes that do not need a platform." },
        ],
      },
    ],
    forYouIf: [
      "You can commit four days a week for four months",
      "You want client work and retainers, not one-off small gigs",
      "You are comfortable being corrected on your work every week",
    ],
    notForYouIf: [
      "You cannot attend consistently",
      "You want a quick certificate",
    ],
  },
  {
    slug: "re-skill",
    name: "Re-skill",
    image: "/images/programs/re-skill.jpg",
    audience: "Freelancers whose rates are falling",
    status: "open",
    duration: "8 weeks",
    commitment: "Evenings · 3 days a week",
    feeMonthly: 179,
    feeMonths: 2,
    entry: "You already earn something from freelancing or digital work.",
    summary:
      "For writers, translators, designers, video editors and virtual assistants watching their income shrink. You already know how to find clients and deliver on time — that is the hard part, and you have it. What you sell has been commoditised by AI. This program changes what you sell, without losing the clients you have.",
    outcome:
      "A rebuilt service offer, a higher rate, and a plan for re-pitching your existing clients rather than starting over.",
    honestNote:
      "Freelance writing postings fell around 30% within eight months of ChatGPT. Translation postings fell about 19%, with rates down to roughly half. If this is happening to you, waiting is the expensive option.",
    modules: [
      {
        title: "Where your existing skill still has value",
        body: "Judgment, taste, client relationships and domain knowledge do not commoditise. Tool execution does.",
        subModules: [
          { title: "Skill audit", body: "Separate what still earns from what AI has made cheap." },
          { title: "Client equity", body: "Map relationships and trust you already own." },
          { title: "Domain advantage", body: "Industry knowledge that tools cannot replace overnight." },
          { title: "Portfolio truth", body: "What to keep showing — and what to retire." },
        ],
      },
      {
        title: "What to stop selling, and what to sell instead",
        body: "Map your current offer onto work that is still growing.",
        subModules: [
          { title: "Dying offers", body: "Identify services whose rates and demand are collapsing." },
          { title: "Growth offers", body: "Automation, systems, and AI-assisted operations that retain." },
          { title: "Offer rewrite", body: "A clear one-page service description a client can buy." },
          { title: "Package tiers", body: "Starter, standard, and retainer versions of the new offer." },
        ],
      },
      {
        title: "Automation and AI build craft",
        body: "n8n, APIs and AI agents, taught fast because you already understand client work.",
        subModules: [
          { title: "Fast n8n path", body: "Build patterns freelancers need most — without beginner fluff." },
          { title: "API glue work", body: "Connect the tools your clients already use." },
          { title: "AI inside workflows", body: "Useful agents with human review, not demos." },
          { title: "Demo to deliverable", body: "Turn practice builds into client-ready systems." },
        ],
      },
      {
        title: "Production discipline",
        body: "Error handling, logging, cost control and security — what lets you charge retainer rates.",
        subModules: [
          { title: "Reliability", body: "Retries, alerts, and monitoring for paid systems." },
          { title: "Cost control", body: "Keep AI and API spend predictable for retainers." },
          { title: "Security habit", body: "Credentials and client data handled like a vendor." },
          { title: "Support window", body: "Define what is included after go-live." },
        ],
      },
      {
        title: "Repricing without losing the account",
        body: "How to raise your rate with an existing client, what to say, and what to offer.",
        subModules: [
          { title: "Value narrative", body: "Explain the new offer in language the client already trusts." },
          { title: "Transition plan", body: "Move from old deliverables to new systems without a cold cut." },
          { title: "Rate conversation", body: "Scripts and timing for a clean raise discussion." },
          { title: "If they say no", body: "Fallback packages and when to walk away." },
        ],
      },
      {
        title: "Proof and positioning",
        body: "Rebuild your portfolio and profile around the new offer.",
        subModules: [
          { title: "Case rewrite", body: "Turn past work into proof for systems and outcomes." },
          { title: "Profile overhaul", body: "Headlines, services, and samples that match the new offer." },
          { title: "Outbound kit", body: "Messages for warm clients and warm referrals." },
          { title: "90-day plan", body: "What to sell first after you finish Re-skill." },
        ],
      },
    ],
    forYouIf: [
      "Your freelance income has dropped in the last two years",
      "You have existing clients you would rather keep than replace",
      "You can study in the evenings while still working",
    ],
    notForYouIf: [
      "You have never earned from freelancing — take Foundation first",
    ],
  },
  {
    slug: "advance",
    name: "Advance",
    image: "/images/programs/advance.jpg",
    audience: "People already in a job",
    status: "waitlist",
    duration: "8 weeks",
    commitment: "Evenings and Saturday",
    feeMonthly: 229,
    feeMonths: 2,
    entry: "Currently employed, in any function.",
    summary:
      "Become the person at your workplace who makes AI actually work. Not freelancing — no Upwork, no Fiverr. You automate your own function, build something real inside your own organisation, and learn to present it upward so the work is recognised.",
    outcome:
      "A working automation deployed in your actual workplace, plus the internal business case and presentation to go with it.",
    honestNote:
      "We cannot promise you a promotion — that decision belongs to your employer. What we can do is make sure you have something real to show them.",
    modules: [
      {
        title: "Automating your own function",
        body: "Finance, HR, operations, sales, marketing or support — we work on your actual job.",
        subModules: [
          { title: "Function map", body: "List weekly tasks and find the ones that waste the most hours." },
          { title: "Automation candidates", body: "Pick work that is repetitive, rules-based, and measurable." },
          { title: "Stakeholder fit", body: "Who must approve, who will use it, and who can block it." },
          { title: "Pilot choice", body: "One problem small enough to finish inside the program." },
        ],
      },
      {
        title: "AI fluency you can defend",
        body: "Using AI to a standard you can justify to a manager.",
        subModules: [
          { title: "Defensible prompts", body: "Briefs you can explain in a meeting without sounding vague." },
          { title: "Verification for managers", body: "How you prove the output is safe enough for work use." },
          { title: "Data handling", body: "What never goes into public tools — and safer alternatives." },
          { title: "Where not to use AI", body: "Judgment calls that protect your reputation at work." },
        ],
      },
      {
        title: "Build it inside your workplace",
        body: "You bring the problem. You leave with a working tool that solves it.",
        subModules: [
          { title: "Workplace constraints", body: "Access, tools, and politics that shape what you can ship." },
          { title: "Build sprint", body: "Assemble the automation against your real inputs." },
          { title: "User test", body: "Have a colleague run it and capture friction." },
          { title: "Stabilise", body: "Fix the top failure cases before you present upward." },
        ],
      },
      {
        title: "The business case",
        body: "Cost, risk, data protection, what to pilot first, and how to measure it.",
        subModules: [
          { title: "Hours and money", body: "Estimate time saved and soft costs honestly." },
          { title: "Risk register", body: "Data, errors, and dependency risks in plain language." },
          { title: "Pilot plan", body: "Scope, duration, and success criteria for leadership." },
          { title: "Measure after", body: "Simple metrics you can report in 30 days." },
        ],
      },
      {
        title: "Presenting upward",
        body: "The skill that turns good work into recognition.",
        subModules: [
          { title: "One-page narrative", body: "Problem, solution, result — no slide theatre." },
          { title: "Demo discipline", body: "Show the live tool, not a concept deck." },
          { title: "Ask clearly", body: "What you want: time, budget, ownership, or a wider rollout." },
          { title: "Follow-through", body: "How to keep ownership after the first yes." },
        ],
      },
    ],
    forYouIf: [
      "You are employed and want more leverage in your role",
      "You can only study in evenings and on Saturday",
      "You want to lead AI adoption where you work",
    ],
    notForYouIf: [
      "You want to become a freelancer — take Practitioner instead",
    ],
  },
];

export const workshops = {
  heading: "Weekend workshops",
  body:
    "Two days, Saturday and Sunday. The cheapest way to see how we teach before committing to a program — and useful on its own.",
  fee: 49,
  items: [
    { title: "Build and sell your first AI automation", detail: "Leave with one working automation and a proposal template you can send." },
    { title: "AI for business owners: what to automate first", detail: "For shop owners, traders, dairy and agri businesses, clinics and schools." },
    { title: "Getting paid properly", detail: "Invoices, contracts and payment options for freelancers working internationally." },
    { title: "Being found by AI search", detail: "How ChatGPT, Gemini and Google AI answers decide which businesses to recommend." },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Campus                                                              */
/* ------------------------------------------------------------------ */

export const campus = {
  heading: "Online-first training",
  body:
    "SkillsProMax is Dubai-based and runs live online batches for students worldwide. There is no public street address — you join from home on a fixed schedule.",
  features: [
    { title: "Live online classrooms", body: "Fixed schedule sessions with attendance and reviewed work." },
    { title: "Separate cohorts", body: "Male and female students are placed in separate online batches." },
    { title: "Small batches", body: "Every student's work gets reviewed — not a massive webinar." },
    { title: "Time-zone placement", body: "We match you to a slot that works for your country." },
    { title: "Admissions by call", body: "Apply free — we call or WhatsApp within two working days." },
    { title: "No campus visit required", body: "Laptop and internet are enough to start." },
  ],
  timings: {
    heading: "Timings that fit real life",
    body: "We run several live online slots across the week so students who work or study can still join.",
    slots: [
      { label: "Morning", value: "Gulf morning", note: "Good for Asia / Middle East" },
      { label: "Midday", value: "Gulf midday", note: "Flexible cohorts" },
      { label: "Afternoon", value: "Gulf afternoon", note: "After work/study" },
      { label: "Evening", value: "Gulf evening", note: "For people in jobs" },
    ],
    note: "If your time zone does not fit a published slot, tell us on the admissions call and we will place you honestly.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* One-pager — how it works                                            */
/* ------------------------------------------------------------------ */

export const howItWorks = {
  heading: "How learning works",
  body: "Live online batches from our Dubai base. Join from anywhere in the world. Small cohorts, real reviews, monthly fees in USD.",
  steps: [
    {
      title: "Apply free",
      body: "Tell us your country, city, program interest and timing. No application fee.",
    },
    {
      title: "Call + assessment",
      body: "We call within two working days, explain fees in USD honestly, and run a short entry check.",
    },
    {
      title: "Live online batch",
      body: "Fixed schedule with slots across time zones. Attendance matters. Work is reviewed.",
    },
    {
      title: "Ship real work",
      body: "You finish with a supervised client-style deliverable — not a certificate for watching videos.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* One-pager FAQ (Dubai-based · worldwide)                             */
/* ------------------------------------------------------------------ */

export const homeFaq = {
  heading: "Questions before you apply",
  items: [
    {
      q: "How much does SkillsProMax cost?",
      a: "Foundation is $99/month for 2 months. Practitioner is $149/month for 4 months. Re-skill is $179/month for 2 months, Advance $229/month for 2 months, and workshops from $49. Fees are in USD. There is no application fee. Ask about instalments on the admissions call.",
    },
    {
      q: "Where is SkillsProMax based?",
      a: "We are based in Dubai. Classes are live online, so you join from home on a fixed schedule. You do not need to be in Dubai — or in the UAE — to apply.",
    },
    {
      q: "Can I join from any country?",
      a: "Yes. Anyone worldwide can apply if you have a laptop, stable internet, and can attend live sessions in your time zone. Your country does not change the fee or curriculum.",
    },
    {
      q: "Are boys and girls in separate batches?",
      a: "Yes. Male and female students are placed in separate online cohorts and timings. We ask gender only so we can place you correctly — there is no mixed live classroom.",
    },
    {
      q: "Is this safe for my daughter to study from home?",
      a: "Yes. Classes are live online from home. She needs a laptop and internet — not travel to a mixed campus. Parents can join the free admissions call and ask anything before paying.",
    },
    {
      q: "How long until I finish a program?",
      a: "Foundation, Re-skill and Advance run about 2 months. Practitioner runs about 4 months. Workshops are short one-off sessions. Exact dates are confirmed after your admissions call and entry check.",
    },
    {
      q: "Do you guarantee a job or income?",
      a: "No. We never promise a job or a salary. We teach skills the market pays for, review your work, and publish real batch outcomes after every cohort — including who earned nothing.",
    },
    {
      q: "Who is this for?",
      a: "Students, fresh graduates, freelancers whose rates are falling, and working professionals who want AI and automation skills they can use at work or with clients. If Foundation is a better fit than Practitioner, we will say so before you pay.",
    },
    {
      q: "What do I need to start?",
      a: "A computer for class, internet that holds a video call, and enough English to follow professional client work. Apply free — we will tell you honestly if you are not ready yet.",
    },
    {
      q: "What happens after I apply?",
      a: "We call within two working days, explain fees in USD, and run a short entry check. If the program is not right for you, we say so before you pay. WhatsApp +971 50 208 3909 if you want to talk first.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* For businesses                                                      */
/* ------------------------------------------------------------------ */

export const business = {
  heading: "Automation for growing businesses",
  body:
    "We build practical automation systems for clinics, schools, trading companies, logistics teams and service businesses — and our senior students build them under supervision, so the cost is a fraction of a city agency.",
  examples: [
    { title: "Lead handling", body: "Capture, qualify and follow up leads without a spreadsheet mess." },
    { title: "Operations records", body: "Stock, appointments, collections and status updates that stay current." },
    { title: "Invoicing and reminders", body: "Clean invoices, payment follow-ups and simple reporting." },
    { title: "Schools and academies", body: "Admissions enquiries, fee reminders, attendance reports to parents." },
    { title: "Clinics and labs", body: "Appointments, reminders, report delivery over WhatsApp." },
    { title: "Staff training", body: "Half-day or full-day sessions teaching your own team to use AI properly." },
  ],
  cta: {
    heading: "Tell us what takes your staff the most time",
    body: "A short conversation, no charge. If we cannot help, we will say so.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* For parents                                                         */
/* ------------------------------------------------------------------ */

export const parents = {
  heading: "Information for parents and guardians",
  intro:
    "Most of our students are young people whose families are paying the fee. You deserve straight answers before you spend that money. Ask us anything on WhatsApp or the admissions call.",
  items: [
    {
      q: "Are boys and girls taught separately?",
      a: "Yes. Male and female students are placed in separate online cohorts and timings. There is no mixed live classroom.",
    },
    {
      q: "Is this safe for my daughter to study from home?",
      a: "Classes are live online from home. She needs a laptop and internet — not travel to a shared campus. You can join the admissions call with her.",
    },
    {
      q: "What will my child actually be able to do afterwards?",
      a: "Build automation and AI systems that businesses pay for — freelancing from home or becoming harder to replace at work. Foundation covers groundwork; Practitioner ships a real supervised deliverable.",
    },
    {
      q: "How much will they earn?",
      a: "We will not give you a figure and call it a promise. A strong Practitioner graduate often earns first paid work within two to three months of finishing, commonly a few hundred USD early on. Some earn nothing. We publish both numbers after every batch.",
    },
    {
      q: "Can they work from home?",
      a: "Yes. This work needs a computer and internet, not daily travel — which matters for many families.",
    },
    {
      q: "What are the fees and how are they paid?",
      a: "Fees are charged monthly in USD, not as one large amount. See the Fees section on the homepage for current figures. Ask us about instalments and merit reductions.",
    },
    {
      q: "Is this the same as free online courses?",
      a: "No. Free courses can be a good start if money is tight — we will say so. The difference here is a fixed live batch, work that is checked, a real assessment, and support afterwards.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Promises — the anti-junk commitments                                */
/* ------------------------------------------------------------------ */

export const promises = [
  "We will never guarantee you a job or an income.",
  "We will never claim an accreditation we do not hold.",
  "We publish our real completion and earnings numbers after every batch, including the bad ones.",
  "Nobody passes by attendance alone. Assessment is on work produced.",
  "Our refund policy is written down, public, and honoured.",
  "If a program is not right for you, we will tell you before you pay.",
  "We will not teach a skill whose market is collapsing just because it is easy to sell.",
] as const;

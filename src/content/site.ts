/**
 * Single source of truth for site-wide content.
 * Edit copy here rather than inside components.
 */

export const site = {
  name: "SkillsProMax",
  tagline: "A serious school for skills that pay.",
  domain: "skillspromax.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://skillspromax.com",

  emails: {
    admissions: "admission@skillspromax.com",
    info: "info@skillspromax.com",
    support: "support@skillspromax.com",
  },

  phone: { display: "+92 329 1522376", href: "tel:+923291522376" },
  whatsapp: { display: "+92 329 1522376", href: "https://wa.me/923291522376" },

  /** Public location — no street address while we launch Pakistan-wide online. */
  location: {
    label: "Pakistan · Online live batches",
    country: "Pakistan",
  },

  /** Kept for staff/GBP later — not shown on the public one-pager. */
  address: {
    landmark: "Near Govt. Associate College for Women, Allahabad",
    road: "Depalpur–Kasur Road",
    tehsil: "Tehsil Depalpur",
    district: "District Okara, Punjab",
    country: "Pakistan",
    get full() {
      return `${this.landmark}, ${this.road}, ${this.tehsil}, ${this.district}`;
    },
  },

  hours: [
    { label: "Monday – Saturday", value: "Live online batches (evening slots available)" },
    { label: "Sunday", value: "Workshops / catch-up by arrangement" },
  ],

  serviceArea: [
    "Pakistan",
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Okara",
    "Sahiwal",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Navigation — one-pager anchors                                      */
/* ------------------------------------------------------------------ */

export const nav = [
  { label: "Programs", href: "/#programs" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Fees", href: "/#fees" },
  { label: "FAQ", href: "/#faq" },
  { label: "Apply", href: "/#apply" },
] as const;

/* ------------------------------------------------------------------ */
/* Homepage — hero                                                     */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Digital skills academy · Pakistan",
  heading: "A serious school for skills that pay.",
  body:
    "SkillsProMax is a live online academy for AI, automation and digital work — taught in small batches, with real projects and honest standards. Join from anywhere in Pakistan.",
  primary: { label: "Apply free", href: "/#apply" },
  secondary: { label: "View programs", href: "/#programs" },
  points: [
    "Live online classes from any city in Pakistan",
    "Small batches with reviewed student work",
    "Monthly fees — no large lump sum",
    "Real deliverables before you finish",
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
      "From the middle of the program, every student is given a real brief from a real business — a dairy, a potato trader, an agri-input dealer, a school, a clinic — and delivers it under supervision. You graduate with a working system and a written case study, not a printed certificate.",
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
      "Batches are capped so every student's work gets reviewed. There is an entry assessment, and not everyone passes. If a program is not right for you, we will tell you before you pay — and point you to a free government course instead if that genuinely suits you better.",
  },
  {
    title: "We never promise a job or an income",
    body:
      "No guaranteed placement. No \"earn one lakh a month.\" We will show you honest ranges and honest timeframes. Any institute promising you a guaranteed income is selling you something else.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Honest comparison against the free alternatives                     */
/* ------------------------------------------------------------------ */

export const honestComparison = {
  heading: "There are free courses. Should you take them instead?",
  intro:
    "Sometimes yes, and we will say so. DigiSkills and NAVTTC are free, and NAVTTC even pays a monthly stipend. If money is the binding constraint, start there — genuinely. Here is the honest difference.",
  rows: [
    {
      point: "Cost",
      free: "Free. NAVTTC pays a stipend of roughly Rs. 3,000–5,000 per month.",
      us: "Paid, billed monthly. We are the more expensive option and we will not pretend otherwise.",
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
  modules: { title: string; body: string }[];
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
    feeMonthly: 7500,
    feeMonths: 2,
    entry: "Matric or above. Basic computer familiarity. No coding needed.",
    summary:
      "The groundwork nobody else teaches. Not software tutorials — the ability to work like a professional: clear written English for clients, how the internet and APIs actually work, using AI properly and knowing when it is wrong, and handling data without making a mess.",
    outcome:
      "One working automation you built yourself, an honest picture of what digital work pays, and an assessment result that tells you which program to take next.",
    honestNote:
      "This will not make you money on its own. It is the foundation that makes the next program work — and the entry test at the end decides whether you are ready for it.",
    modules: [
      { title: "Professional English for client work", body: "Emails, updates, asking good questions, disagreeing politely, saying no. Work register, not grammar class. This single skill is the biggest earnings gap between equally skilled freelancers." },
      { title: "How the internet actually works", body: "HTTP, APIs, JSON, webhooks, authentication — hands-on and without code. Without this, every tool feels like magic. With it, everything after becomes learnable." },
      { title: "Using AI properly", body: "Context engineering rather than prompt tricks. What models are good and bad at. Verification discipline: how to know when the answer is wrong before you send it to a client." },
      { title: "Data literacy", body: "Spreadsheets taken seriously, structured and unstructured data, cleaning messy records, basic analysis with AI assistance." },
      { title: "Build one real thing", body: "A small working automation, start to finish, solving an actual problem. Proof to yourself that you can finish something." },
      { title: "The market, honestly", body: "What work exists, what it pays, what is dying, what platforms really require. Most people pick a skill from a YouTube advert. Six weeks of honest market reality is worth more." },
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
    feeMonthly: 11000,
    feeMonths: 4,
    entry:
      "Foundation passed, or an entry assessment showing equivalent ability. Functional written English required.",
    summary:
      "Build the automation and AI systems that businesses pay a monthly retainer for. Lead handling, records, invoicing, reporting, document processing, AI agents inside real workflows — built to a standard a client will actually pay for and keep paying for.",
    outcome:
      "A shipped, documented system running for a real business, a written case study with a measurable result, and the commercial skills to price, invoice and get paid internationally.",
    honestNote:
      "Realistically, a strong graduate earns their first paid work within 60–90 days of finishing, often Rs. 25,000–60,000 in the early months. Some earn nothing. We publish both numbers.",
    modules: [
      { title: "Weeks 1–2 · Foundations", body: "APIs, authentication, context engineering, professional AI tooling, verification discipline. Foundation graduates start ahead here." },
      { title: "Weeks 3–5 · Build craft", body: "n8n as the primary tool, with Make and Zapier when a client requires them. Real business workflows: lead routing, records sync, invoicing, reporting, PDF and document processing." },
      { title: "Weeks 6–10 · Production discipline", body: "The difference between a demo and something a business will pay for: error handling, retries, logging, cost control, credentials and security. AI agents with human checkpoints. Your real client brief begins here." },
      { title: "Weeks 11–14 · Client delivery", body: "Turning a vague request into a fixed scope with acceptance criteria. Documentation, handover, support and retainer design. You ship your brief and write it up." },
      { title: "Weeks 15–16 · Getting paid", body: "Pricing properly instead of racing to the bottom. PSEB registration, FBR NTN, Payoneer, contracts, invoices, disputes. Platform reality: Upwork verification, how Connects actually cost, why accounts get rejected, and the routes that do not need a platform at all." },
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
    feeMonthly: 13000,
    feeMonths: 2,
    entry: "You already earn something from freelancing or digital work.",
    summary:
      "For writers, translators, designers, video editors and virtual assistants watching their income shrink. You already know how to find clients and deliver on time — that is the hard part, and you have it. What you sell has been commoditised by AI. This program changes what you sell, without losing the clients you have.",
    outcome:
      "A rebuilt service offer, a higher rate, and a plan for re-pitching your existing clients rather than starting over.",
    honestNote:
      "Freelance writing postings fell around 30% within eight months of ChatGPT. Translation postings fell about 19%, with rates down to roughly half. If this is happening to you, waiting is the expensive option.",
    modules: [
      { title: "Where your existing skill still has value", body: "Judgment, taste, client relationships and domain knowledge do not commoditise. Tool execution does. We separate the two honestly." },
      { title: "What to stop selling, and what to sell instead", body: "Mapping your current offer onto work that is still growing — automation, systems, AI-assisted operations and content production at volume." },
      { title: "Automation and AI build craft", body: "n8n, APIs and AI agents, taught fast because you already understand client work." },
      { title: "Production discipline", body: "Error handling, logging, cost control and security — what lets you charge retainer rates instead of hourly." },
      { title: "Repricing without losing the account", body: "How to raise your rate with an existing client, what to say, and what to offer in exchange." },
      { title: "Proof and positioning", body: "Rebuilding your portfolio and profile around the new offer." },
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
    feeMonthly: 17500,
    feeMonths: 2,
    entry: "Currently employed, in any function.",
    summary:
      "Become the person at your workplace who makes AI actually work. Not freelancing — no Upwork, no Fiverr. You automate your own function, build something real inside your own organisation, and learn to present it upward so the work is recognised.",
    outcome:
      "A working automation deployed in your actual workplace, plus the internal business case and presentation to go with it.",
    honestNote:
      "We cannot promise you a promotion — that decision belongs to your employer. What we can do is make sure you have something real to show them.",
    modules: [
      { title: "Automating your own function", body: "Finance, HR, operations, sales, marketing or support — we work on your actual job, not a generic example." },
      { title: "AI fluency you can defend", body: "Using AI to a standard you can justify to a manager, including verification, data handling and where not to use it." },
      { title: "Build it inside your workplace", body: "You bring the problem. You leave with a working tool that solves it." },
      { title: "The business case", body: "Cost, risk, data protection, what to pilot first, and how to measure it." },
      { title: "Presenting upward", body: "The skill that turns good work into recognition." },
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
  fee: 3500,
  items: [
    { title: "Build and sell your first AI automation", detail: "Leave with one working automation and a proposal template you can send." },
    { title: "AI for business owners: what to automate first", detail: "For shop owners, traders, dairy and agri businesses, clinics and schools." },
    { title: "Getting paid from abroad", detail: "PSEB registration, Payoneer, FBR NTN, contracts and invoices. What actually works from Pakistan." },
    { title: "Being found by AI search", detail: "How ChatGPT, Gemini and Google AI answers decide which businesses to recommend." },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Campus                                                              */
/* ------------------------------------------------------------------ */

export const campus = {
  heading: "A proper place to study",
  body:
    "We built the campus before we opened admissions, because studying in a hot, crowded room does not work. Our own building on Depalpur–Kasur Road, next to Govt. Associate College for Women, Allahabad.",
  features: [
    { title: "Three separate halls", body: "Boys and girls are taught in separate halls, always. Never a shared classroom." },
    { title: "Air conditioned throughout", body: "Every hall and office. Summer batches run normally." },
    { title: "Fully furnished", body: "Proper desks, proper seating, proper lighting — set up for long practical sessions." },
    { title: "Offices and meeting rooms", body: "For admissions conversations, parent meetings and one-to-one reviews." },
    { title: "Beside a women's college", body: "A short walk for students at Govt. Associate College for Women, on a road families already know." },
    { title: "Backup power", body: "So a load-shedding hour does not cost you a session." },
  ],
  timings: {
    heading: "Timings that fit real life",
    body:
      "This is an agricultural district and most of our students are also studying or working. So we run several batches and we are flexible about it.",
    slots: [
      { label: "Morning", value: "8:00 – 10:30 AM", note: "Before college" },
      { label: "Midday", value: "11:00 AM – 1:30 PM", note: "Girls' batches" },
      { label: "Afternoon", value: "2:30 – 5:00 PM", note: "After college" },
      { label: "Evening", value: "5:30 – 8:00 PM", note: "For people in jobs" },
    ],
    note:
      "During wheat and potato harvest we will move your batch rather than lose you. Tell us and we will arrange it.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* One-pager — how it works                                            */
/* ------------------------------------------------------------------ */

export const howItWorks = {
  heading: "How learning works",
  body: "Live online batches you can join from anywhere in Pakistan. Small cohorts, real reviews, monthly fees.",
  steps: [
    {
      title: "Apply free",
      body: "Tell us your city, program interest and timing. No application fee.",
    },
    {
      title: "Call + assessment",
      body: "We call within two working days, explain fees honestly, and run a short entry check.",
    },
    {
      title: "Live online batch",
      body: "Fixed schedule on Zoom/Meet-class style sessions. Attendance matters. Work is reviewed.",
    },
    {
      title: "Ship real work",
      body: "You finish with a supervised client-style deliverable — not a certificate for watching videos.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* One-pager FAQ (Pakistan-wide)                                       */
/* ------------------------------------------------------------------ */

export const homeFaq = {
  heading: "Questions people ask before applying",
  items: [
    {
      q: "Is this online or on campus?",
      a: "Live online batches for students across Pakistan. That is how you join today. A Punjab campus visit can be arranged later by appointment — we do not publish a street address on this site yet.",
    },
    {
      q: "Can I join from Lahore, Karachi or another city?",
      a: "Yes. If you have a laptop, stable internet and can attend live sessions, you can apply from anywhere in Pakistan.",
    },
    {
      q: "Are boys and girls in separate batches?",
      a: "Yes. We run separate cohorts and timings for male and female students. We ask gender only to place you correctly.",
    },
    {
      q: "How are fees paid?",
      a: "Monthly — not one large lump sum. Exact amounts are listed under Fees on this page. Ask about instalments on the admissions call.",
    },
    {
      q: "Do you guarantee a job or income?",
      a: "No. Anyone who promises guaranteed income is selling something else. We publish real batch outcomes — including who earned nothing — after each cohort.",
    },
    {
      q: "What if DigiSkills or NAVTTC is free?",
      a: "If money is the only constraint, start there — genuinely. We are paid because you get a live batch, reviewed work, and a year of support after you finish.",
    },
    {
      q: "What do I need to start?",
      a: "A computer you can use for class, internet that holds a video call, and enough English to follow professional client work. We will tell you honestly if you are not ready yet.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* For businesses                                                      */
/* ------------------------------------------------------------------ */

export const business = {
  heading: "Automation for businesses in Okara",
  body:
    "Okara runs on potatoes, dairy and wheat. Most of the record-keeping behind those businesses is still done by hand. We build systems that take that work off your staff — and our senior students build them under supervision, so the cost is a fraction of a city agency.",
  examples: [
    { title: "Dairy and milk collection", body: "Daily collection records, per-farmer ledgers, yield tracking, automatic payment summaries." },
    { title: "Potato traders and cold storage", body: "Stock in and out, lot tracking, buyer ledgers, automated payment reminders." },
    { title: "Agri-input dealers", body: "Inventory, credit ledgers, WhatsApp order taking, season-based reordering." },
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
      a: "Classes are live online from home. She needs a laptop and internet — not travel to a shared city campus. You can join the admissions call with her.",
    },
    {
      q: "What will my child actually be able to do afterwards?",
      a: "Build automation and AI systems that businesses pay for — freelancing from home or becoming harder to replace at work. Foundation covers groundwork; Practitioner ships a real supervised deliverable.",
    },
    {
      q: "How much will they earn?",
      a: "We will not give you a figure and call it a promise. A strong Practitioner graduate often earns first paid work within two to three months of finishing, commonly Rs. 25,000–60,000 early on. Some earn nothing. We publish both numbers after every batch.",
    },
    {
      q: "Can they work from home?",
      a: "Yes. This work needs a computer and internet, not daily travel — which matters for many families.",
    },
    {
      q: "What are the fees and how are they paid?",
      a: "Fees are charged monthly, not as one large amount. See the Fees section on the homepage for current figures. Ask us about instalments and merit reductions.",
    },
    {
      q: "Is this the same as free government courses?",
      a: "No. If money is tight, DigiSkills or NAVTTC are genuine options — we will say so. The difference is a fixed live batch, work that is checked, a real assessment, and a year of support afterwards.",
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

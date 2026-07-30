import puppeteer from "puppeteer-core";
import { PrismaClient } from "@prisma/client";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:3000";
const APPID = process.env.NEWID;
const log = (...a) => console.log("•", ...a);

const db = new PrismaClient();
const before = await db.application.findUnique({
  where: { id: APPID },
  select: { status: true },
});
log("DB status BEFORE:", before.status);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let sawNextAction = false;
try {
  const page = await browser.newPage();
  page.on("request", (r) => {
    if (r.method() === "POST") {
      const h = r.headers();
      console.log("  [POST]", r.url().replace(BASE, ""), "| next-action:", !!h["next-action"], "| cookie:", h["cookie"] ? h["cookie"].slice(0, 40) + "…" : "NONE");
    }
  });

  // login
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle2" });
  await page.type('#password', "skillspromax-dev-123");
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.click('button[type="submit"]'),
  ]);
  log("logged in ->", page.url());

  // detail page, wait for the form to hydrate
  await page.goto(`${BASE}/admin/applications/${APPID}`, { waitUntil: "networkidle2" });
  await page.waitForSelector('#status', { visible: true });
  await new Promise((r) => setTimeout(r, 1500)); // let React hydrate the action binding

  await page.select("#status", "ASSESSED");
  await page.type("#note", "Browser-driven end-to-end mutation test.");

  // click and wait for either the Next-Action fetch or a navigation
  await Promise.all([
    page.waitForResponse(
      (r) => r.url().includes(`/admin/applications/${APPID}`) && r.request().method() === "POST",
      { timeout: 20000 },
    ),
    page.click('button[type="submit"]'),
  ]);
  await new Promise((r) => setTimeout(r, 1500));
  log("ended at:", page.url(), "| saw Next-Action header:", sawNextAction);
} finally {
  await browser.close();
}

const after = await db.application.findUnique({
  where: { id: APPID },
  select: { status: true },
});
const note = await db.applicationNote.findFirst({
  where: { applicationId: APPID },
  orderBy: { createdAt: "desc" },
  select: { body: true, statusFrom: true, statusTo: true },
});
log("DB status AFTER: ", after.status);
log("latest note:     ", JSON.stringify(note));
log(
  "MUTATION",
  after.status !== before.status && after.status === "ASSESSED" ? "SUCCEEDED" : "FAILED",
);
await db.$disconnect();

import puppeteer from "puppeteer-core";
import { PrismaClient } from "@prisma/client";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:3000";
const log = (...a) => console.log("•", ...a);

const db = new PrismaClient();

// Pick any application that is not already ASSESSED.
const target = await db.application.findFirst({
  where: { status: { not: "ASSESSED" } },
  select: { id: true, status: true },
});
if (!target) throw new Error("no target application found");
const APPID = target.id;
log("target app:", APPID, "| status BEFORE:", target.status);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let actionPosts = 0;
try {
  const page = await browser.newPage();
  page.on("request", (r) => {
    if (r.method() === "POST" && r.url().includes(`/admin/applications/${APPID}`)) {
      actionPosts++;
      log("  POST observed, next-action header:", !!r.headers()["next-action"]);
    }
  });

  // login (the form navigates client-side via router.push, so wait for path change)
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle2" });
  await page.type('#email', "admin@skillspromax.com");
  await page.type('#password', "skillspromax-dev-123");
  await page.click('button[type="submit"]');
  await page.waitForFunction(
    () => !location.pathname.startsWith("/login"),
    { timeout: 20000 },
  );
  log("logged in ->", page.url());

  // detail page
  await page.goto(`${BASE}/admin/applications/${APPID}`, { waitUntil: "networkidle2" });
  log("detail url:", page.url());
  await page.waitForSelector('#status', { visible: true, timeout: 20000 });
  // confirm the session cookie is present in the browser
  const cookiePresent = await page.evaluate(() =>
    /authjs\.session-token|next-auth\.session-token/.test(document.cookie),
  );
  log("session cookie in document.cookie:", cookiePresent);
  await new Promise((r) => setTimeout(r, 2500)); // allow React to bind the action

  await page.select("#status", "ASSESSED");
  await page.type("#note", "Browser-driven end-to-end mutation test.");
  await Promise.all([
    page.waitForResponse(
      (r) => r.url().includes(`/admin/applications/${APPID}`) && r.request().method() === "POST",
      { timeout: 20000 },
    ),
    page.click('button[type="submit"]'),
  ]);
  await new Promise((r) => setTimeout(r, 1500));
  log("ended at:", page.url());
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
log("status AFTER:", after.status);
log("latest note:", JSON.stringify(note));
log("MUTATION", after.status === "ASSESSED" ? "SUCCEEDED" : "FAILED");
await db.$disconnect();

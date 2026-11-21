import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = "screenshots";
mkdirSync(outDir, { recursive: true });

const executablePath = "/Users/ashrafulasif/Library/Caches/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-mac-arm64/chrome-headless-shell";

console.log("Starting vite preview server on port 5274...");
const preview = spawn("npx", ["vite", "preview", "--port", "5274"], { stdio: "pipe" });

// Wait for preview server to be ready
await new Promise((resolve) => {
  preview.stdout.on("data", (data) => {
    if (data.toString().includes("http://localhost:5274/")) {
      resolve();
    }
  });
});

console.log("Preview server running. Launching Playwright browser...");
const browser = await chromium.launch({ executablePath });

try {
  // 1. Desktop Hero Showcase
  console.log("Capturing 01-hero-showcase.png...");
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await desktopCtx.newPage();
  await page.goto("http://localhost:5274/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(outDir, "01-hero-showcase.png"), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // 2. Deliveries Grid
  console.log("Capturing 02-deliveries-grid.png...");
  await page.evaluate(() => {
    const el = document.getElementById("sold") || document.querySelector(".deliveries") || document.querySelector(".wall");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: join(outDir, "02-deliveries-grid.png"), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // 3. Lightbox Modal
  console.log("Capturing 03-lightbox-modal.png...");
  // Click on a delivery thumbnail or card to open lightbox
  const photoTrigger = await page.$(".card, .photo, .deal-photos button, button.thumb, img[src*='deliveries']");
  if (photoTrigger) {
    await photoTrigger.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: join(outDir, "03-lightbox-modal.png") });
  }

  // 4. Admin Login Page
  console.log("Capturing 04-admin-login.png...");
  await page.goto("http://localhost:5274/admin/login", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(outDir, "04-admin-login.png") });

  await desktopCtx.close();

  // 5. Mobile Viewport
  console.log("Capturing 05-mobile-view.png...");
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    deviceScaleFactor: 2,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto("http://localhost:5274/", { waitUntil: "networkidle" });
  await mobilePage.evaluate(() => document.fonts.ready);
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: join(outDir, "05-mobile-view.png") });
  await mobileCtx.close();

  console.log("All screenshots successfully captured in screenshots/");
} catch (err) {
  console.error("Screenshot error:", err);
} finally {
  await browser.close();
  preview.kill();
}

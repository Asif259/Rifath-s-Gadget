// Full-page screenshots of the landing page for review.
// Usage: start the dev server (npm run dev), then: node scripts/shots.mjs [baseUrl]
// Writes .impeccable/review/{desktop,mobile}[-en].png and prints layout problems it can detect.
import { chromium } from "playwright";
import { existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const base = process.argv[2] ?? "http://localhost:5273/";
const out = ".impeccable/review";
mkdirSync(out, { recursive: true });

// Use a locally cached headless Chromium when the bundled one is not installed.
const cached = join(homedir(), "Library/Caches/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-mac-arm64/chrome-headless-shell");
const browser = await chromium.launch(existsSync(cached) ? { executablePath: cached } : {});

const views = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 },
];

for (const lang of ["bn", "en"]) {
  for (const v of views) {
    const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: !!v.isMobile, deviceScaleFactor: v.deviceScaleFactor ?? 1 });
    await ctx.addInitScript((l) => localStorage.setItem("lang", l), lang);
    const page = await ctx.newPage();
    await page.goto(`${base}?static`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Load lazy images before the full-page capture.
    await page.evaluate(async () => {
      for (const img of document.querySelectorAll("img")) img.loading = "eager";
      await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
    });
    // Scroll through once so on-scroll reveals run, then return to the top.
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300));
    });
    const file = `${out}/${v.name}${lang === "en" ? "-en" : ""}.png`;
    await page.screenshot({ path: file, fullPage: true });

    const problems = await page.evaluate(() => {
      const issues = [];
      const W = document.documentElement.clientWidth;
      if (document.documentElement.scrollWidth > W + 1) issues.push(`horizontal scroll: ${document.documentElement.scrollWidth} > ${W}`);
      for (const el of document.querySelectorAll("h1,h2,h3,p,a,button,figcaption,li,label,output,legend,span")) {
        const r = el.getBoundingClientRect();
        if (!r.width || el.closest(".wall")) continue; // the phone photo strip scrolls sideways on purpose
        if (r.right > W + 1 || r.left < -1) issues.push(`outside viewport: <${el.tagName.toLowerCase()} class="${el.className}"> "${(el.textContent || "").trim().slice(0, 40)}"`);
        if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow === "hidden" && el.clientWidth > 0) issues.push(`clipped text: "${(el.textContent || "").trim().slice(0, 40)}"`);
      }
      for (const box of document.querySelectorAll(".slip, .viewer-side, .q")) {
        const b = box.getBoundingClientRect();
        for (const el of box.querySelectorAll("button, a, output, span")) {
          const r = el.getBoundingClientRect();
          if (r.width && (r.right > b.right + 1 || r.left < b.left - 1)) issues.push(`outside its container: "${(el.textContent || "").trim().slice(0, 30)}"`);
        }
      }
      for (const el of document.querySelectorAll("a,button,input")) {
        const r = el.getBoundingClientRect();
        if (r.width && r.height < 40 && !el.closest(".thumbs")) issues.push(`small tap target ${Math.round(r.height)}px: "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}"`);
      }
      return [...new Set(issues)].slice(0, 20);
    });
    console.log(`${file}${problems.length ? "\n  " + problems.join("\n  ") : "  ok"}`);
    await ctx.close();
  }
}
await browser.close();

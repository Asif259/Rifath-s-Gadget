import { chromium } from "playwright";
const [file, out] = process.argv.slice(2);
const exe = process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const b = await chromium.launch({ executablePath: exe });
const p = await b.newPage({ viewport: { width: 2200, height: 1200 } });
await p.goto("file://" + file, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
for (const [sel, name] of [[".artboard.desktop", "d"], [".artboard.mobile", "m"]]) {
  const el = await p.$(sel); await el.screenshot({ path: `${out}-${name}.png` });
}
await b.close();

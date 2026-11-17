// Renders the landing page as static HTML artboards for import into Figma (html_to_figma).
// Usage: node scripts/mock.mjs <out.html> [bn|en]
// Uses the same copy (src/content.ts) and stylesheet (src/styles.css) as the site.
import { readFileSync, writeFileSync } from "node:fs";
import { copy, deliveries, heroCases, money, num, savingRange, reviewCount } from "../src/content.ts";

const out = process.argv[2] ?? "mock.html";
const lang = process.argv[3] === "en" ? "en" : "bn";
const t = copy[lang];
const css = readFileSync("src/styles.css", "utf8");
const icon = (name) =>
  readFileSync(`node_modules/@phosphor-icons/core/assets/regular/${name}.svg`, "utf8")
    .replace("<svg ", '<svg aria-hidden="true" ');
const b64 = (path, type = "image/jpeg") => `data:${type};base64,${readFileSync(path).toString("base64")}`;
const logo = b64("public/favicon.png", "image/png");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const byId = (id) => deliveries.find((d) => d.id === id);

const nav = () => `
<div class="nav-bar"><nav class="nav" aria-label="Menu">
  <a class="brand" href="#"><img src="${logo}" alt=""><span class="body-1">Rifath’s Gadget</span></a>
  <div class="nav-links caption-1"><a href="#how">${t.nav.how}</a><a href="#sold">${t.nav.sold}</a><a href="#faq">${t.nav.faq}</a></div>
  <div class="nav-end">
    <div class="lang caption-1"><button aria-pressed="${lang === "bn"}">বাংলা</button><button aria-pressed="${lang === "en"}">EN</button></div>
    <a class="btn btn-primary button-sm" href="#">${icon("whatsapp-logo")}<span>${t.nav.cta}</span></a>
  </div>
</nav></div>`;

const hero = () => {
  const d = byId(heroCases[0]);
  const specs = d.specs.slice(0, 6);
  return `
<section class="hero"><div class="wrap">
  <div class="hero-head">
    <h1 class="heading-1">${t.hero.title.map((l) => `<span>${esc(l)}</span>`).join("")}</h1>
    <p class="lede title-2 muted">${esc(t.hero.body)}</p>
    <div class="hero-cta">
      <a class="btn btn-primary big button-lg" href="#">${icon("whatsapp-logo")}${esc(t.hero.cta)}</a>
      <p class="proof caption-1">${icon("seal-check")}${esc(t.hero.proof(money(savingRange.min, lang), money(savingRange.max, lang), num(reviewCount, lang)))}</p>
    </div>
  </div>
  <div class="deal">
    <div class="deal-tabs" role="tablist">
      ${heroCases.map((id, k) => { const c = byId(id); return `<button class="deal-tab" role="tab" aria-selected="${k === 0}">${k === 0 ? '<span class="tab-bg"></span><span class="timer" style="transform:scaleX(.45)"></span>' : ""}<span class="body-4 tab-name"><span class="full">${esc(c.buyer[lang])}</span><span class="short">${esc(c.buyer[lang].replace(/^(মো\.|Md\.)\s*/, "").split(" ")[0])}</span></span><span class="caption-4 muted tab-model">${esc(c.model)}</span></button>`; }).join("")}
    </div>
    <div class="deal-body">
      <div class="deal-ask">
        <p class="heading-4"><span class="muted">${esc(t.hero.asked)} </span>${esc(d.asked[lang])}</p>
        <figure class="deal-review">
          <blockquote class="body-3">“${esc(d.review.text[lang])}”</blockquote>
          <figcaption class="deal-buyer"><span class="avatar body-4">${esc(d.buyer[lang].slice(0, 1))}</span><div><p class="body-4">${esc(d.buyer[lang])}</p><p class="caption-2 muted">${esc(t.hero.buyer)} · ${esc(d.model)}</p></div></figcaption>
        </figure>
      </div>
      <div class="deal-arrow"><span>${icon("arrow-right")}</span></div>
      <div class="deal-found">
        <p class="heading-5"><span class="muted">${esc(t.hero.found)} </span><span class="nowrap">${esc(d.model)}</span></p>
        <ul class="spec-list body-6">${specs.map((s) => `<li>${icon("check-circle")}<span>${esc(s[lang])}</span></li>`).join("")}</ul>
        <div class="deal-saving">
          <p class="saving"><b class="heading-3">${money(d.saving, lang)}</b><span class="body-2 muted">${esc(t.hero.below)}</span></p>
          <a class="link button-sm" href="#">${esc(t.sold.details)}${icon("arrow-right")}</a>
        </div>
      </div>
    </div>
  </div>
</div></section>`;
};

const tagline = () => `
<section class="tagline"><div class="wrap"><p class="heading-2">${t.tagline.split(" ").map((w, i) => `<span class="w${i < 9 ? " on" : ""}">${esc(w)} </span>`).join("")}</p></div></section>`;

const benefitIcons = ["wallet", "tag", "shield-check", "hand-coins"];
const benefits = () => `
<section class="section"><div class="wrap">
  <div class="section-head"><h2 class="heading-2">${esc(t.benefits.title)}</h2></div>
  <div class="benefits">${t.benefits.items.map((b, i) => `<article class="benefit"><span class="icon-box">${icon(benefitIcons[i])}</span><h3 class="heading-6">${esc(b.t)}</h3><p class="body-3 muted">${esc(b.d)}</p></article>`).join("")}</div>
</div></section>`;

const how = () => `
<section class="section" id="how"><div class="wrap">
  <div class="section-head"><h2 class="heading-2">${esc(t.how.title)}</h2></div>
  <ol class="steps">${t.how.steps.map((s, i) => `<li class="step"><span class="step-n body-4">${num(i + 1, lang)}</span><h3 class="heading-6">${esc(s.t)}</h3><p class="body-3 muted">${esc(s.d)}</p></li>`).join("")}</ol>
</div></section>`;

const card = (d) => `
<article class="sold-card">
  <a class="sold-photo" href="#"><img src="${b64(`public/deliveries/${d.id}/t${d.cover}.jpg`)}" alt=""><span class="photo-count caption-4">${icon("images")}${num(d.count, lang)}${esc(t.sold.photos)}</span></a>
  <div class="sold-body">
    <h3 class="heading-6">${esc(d.model)}</h3>
    <div class="chips">${d.highlights.map((h) => `<span class="chip caption-4">${esc(h)}</span>`).join("")}</div>
    <span class="badge-saving caption-3">${icon("tag")}${money(d.saving, lang)} ${esc(t.sold.below)}</span>
    ${d.review ? `<figure class="quote"><blockquote class="body-6">“${esc(d.review.text[lang])}”</blockquote><figcaption><span class="body-4">${esc(d.buyer[lang])}</span></figcaption></figure>` : `<p class="caption-2 muted">${esc(t.sold.buyer)}: ${esc(d.buyer[lang])}</p>`}
    <div class="sold-foot"><a class="link button-sm" href="#">${esc(t.sold.details)}${icon("arrow-right")}</a></div>
  </div>
</article>`;
const sold = () => `
<section class="section" id="sold"><div class="wrap">
  <div class="section-head"><h2 class="heading-2">${esc(t.sold.title)}</h2><p class="body-3 muted">${esc(t.sold.body)}</p></div>
  <div class="sold-grid">${deliveries.map(card).join("")}</div>
</div></section>`;

const finder = () => `
<section class="section" id="finder"><div class="wrap finder">
  <div>
    <div class="section-head"><h2 class="heading-2">${esc(t.finder.title)}</h2><p class="body-3 muted">${esc(t.finder.body)}</p></div>
    <ul class="risk-list body-2">${t.risk.items.map((r) => `<li>${icon("check-circle")}${esc(r)}</li>`).join("")}</ul>
  </div>
  <form class="form-card">
    <div><div class="budget-row"><label class="title-3">${esc(t.finder.budget)}</label><output class="heading-4">${money(60000, lang)}</output></div>
      <div style="position:relative;height:24px;margin-top:8px"><div style="position:absolute;left:0;right:0;top:10px;height:4px;border-radius:9999px;background:var(--line)"></div><div style="position:absolute;left:0;width:25%;top:10px;height:4px;border-radius:9999px;background:var(--blue)"></div><div style="position:absolute;left:calc(25% - 12px);top:0;width:24px;height:24px;border-radius:9999px;background:#fff;border:2px solid var(--blue)"></div></div>
      <div class="range-ends caption-2 muted"><span>${money(40000, lang)}</span><span>${money(120000, lang)}</span></div></div>
    <fieldset class="choice"><legend class="title-3">${esc(t.finder.use)}</legend><div class="choice-row">${t.finder.uses.map((u, i) => `<button type="button" class="caption-1" aria-pressed="${i === 0}"><span class="lbl">${esc(u)}</span></button>`).join("")}</div></fieldset>
    <fieldset class="choice"><legend class="title-3">${esc(t.finder.size)}</legend><div class="choice-row">${t.finder.sizes.map((u, i) => `<button type="button" class="caption-1" aria-pressed="${i === 2}"><span class="lbl">${esc(u)}</span></button>`).join("")}</div></fieldset>
    <a class="btn btn-primary big button-md" href="#">${icon("whatsapp-logo")}${esc(t.finder.send)}</a>
    <p class="caption-2 muted" style="text-align:center">${esc(t.finder.note)}</p>
  </form>
</div></section>`;

const faq = () => `
<section class="section" id="faq"><div class="wrap faq">
  <div class="section-head"><h2 class="heading-2">${esc(t.faq.title)}</h2></div>
  <div class="qa">${t.faq.items.map((x, i) => `<div class="q${i === 0 ? " open" : ""}"><button class="title-2">${esc(x.q)}${icon("plus")}</button>${i === 0 ? `<div class="a"><p class="body-3 muted">${esc(x.a)}</p></div>` : ""}</div>`).join("")}</div>
</div></section>`;

const close = () => `
<section class="close"><div class="wrap">
  <div class="section-head"><h2 class="heading-2">${t.close.title.map((l) => `<span style="display:block">${esc(l)}</span>`).join("")}</h2><p class="title-2 muted">${esc(t.close.body)}</p></div>
  <div class="actions"><a class="btn btn-primary big button-lg" href="#">${icon("whatsapp-logo")}${esc(t.hero.cta)}</a><a class="btn btn-line big button-lg" href="#">${icon("facebook-logo")}${esc(t.close.facebook)}</a></div>
</div></section>
<footer class="footer"><div class="wrap">
  <span class="brand"><img src="${logo}" alt=""><span class="body-1">Rifath’s Gadget</span></span>
  <div class="footer-meta caption-2 muted"><span>+880 1887-502002</span><span>${esc(t.close.area)}</span><span>${esc(t.close.tagline)}</span></div>
</div></footer>`;

const page = () => `<div class="page site lang-${lang}">${nav()}<main>${hero()}${tagline()}${benefits()}${how()}${sold()}${finder()}${faq()}</main>${close()}</div>`;

const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>Rifath's Gadget mock</title>
<link href="https://fonts.googleapis.com/css2?family=Anek+Bangla:wdth,wght@100,400..700&family=Geist:wght@400..700&display=swap" rel="stylesheet">
<style>${css}
body { background: #e9e9e4; }
.boards { display: flex; gap: 120px; align-items: flex-start; padding: 80px; }
.artboard { background: var(--page); flex: none; }
.artboard.desktop { width: 1440px; }
.artboard.mobile { width: 390px; }
.artboard .nav-bar { position: relative; top: 0; }
</style></head><body><div class="boards">
<div class="artboard desktop" data-name="Desktop 1440">${page()}</div>
<div class="artboard mobile" data-name="Mobile 390">${page()}</div>
</div></body></html>`;
writeFileSync(out, html);
console.log(out, Math.round(html.length / 1024) + " KB");

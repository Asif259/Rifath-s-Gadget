---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["src/styles.css","index.html"]
---

Scope: the single landing page (src/App.tsx, src/styles.css, index.html). Mode: Persuade.
Audience: university students and young professionals in Bangladesh, mostly on phones. Action: send a budget on WhatsApp. Proof: 8 real deliveries with specs, saving below market price and 7 buyer reviews, all from public/deliveries/<id>/description.md. Figma: file jlJjw892VWVlOQoOXdwHve, page "Landing page", frames 10:2, 11:2, 12:2, 13:2 (bn/en, 1440/390), generated from scripts/mock.mjs with the same CSS.

## Direction contract

THESIS: The hero proves the mechanism with a real case instead of a photo: what one customer asked for, what we found, how far below market price it came, and what the buyer said. Refuses delivery photos in the hero (user rejected them) and the split hero with a device render.

OWN-WORLD: Light. Page #FAFAF7, surfaces #FFFFFF with 1px #E6E6E1 borders, tint #F2F2ED, ink #0B0F14, muted #5B6470, blue #1F6BFF for actions, savings badges and check icons. Geist (Latin) and Anek Bangla (Bangla). Landing-page-design text styles, spacing tokens and Tailwind radii; Phosphor icons. Floating translucent nav pill. Hero heading gradient #000 to #666 (skill rule B5); no other gradients.

STORY: The visitor reads the promise, sees four real request to result cases, learns the four benefits and three steps, browses all eight deliveries with specs and the buyer's words, sets a budget and sends it on WhatsApp.

FIRST VIEWPORT: Centered two-line promise, one paragraph, one WhatsApp button and a proof line (৳20,000 to ৳36,000 below market on the last 8 deliveries, 7 buyer reviews). Below, the deal sheet: buyer tabs, then left panel with the request and the buyer's review, an arrow, right panel with model, six specs and the saving. Phones: the same, stacked, button full width.

FORM: seed: none (pinned) The user said: "I don't like the idea that there is delvery images at the hero section" and asked to use /landing-page-design and Figma. The landing-page-design skill pins layout A, centered hero, nav pill, tagline reveal, type and spacing scales.
Signature interaction: the deal sheet cycles through four real cases every 7 seconds with a progress line; hovering or focusing pauses it; tabs select a case; "All specs and photos" opens the delivery viewer. Motion: hero enters once, sections rise 32px on first view, tagline words light up one by one on scroll, chip and tab pills slide, press scale 0.98.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

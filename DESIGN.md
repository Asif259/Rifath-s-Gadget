---
name: Rifath's Gadget
description: Laptop sourcing in Dhaka. Light, photo-led page where real handover photos carry the trust and one blue action sends the budget.
colors:
  page: "#fafaf7"
  paper: "#ffffff"
  tint: "#f2f2ed"
  ink: "#0b0f14"
  ink-2: "#2a3038"
  muted: "#5b6470"
  line: "#e6e6e1"
  line-2: "#d6d6cf"
  send-blue: "#1f6bff"
  send-blue-press: "#1656d6"
typography:
  display:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "clamp(30px, 3.2vw, 48px)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  display-bn:
    fontFamily: "Anek Bangla, Geist, system-ui, sans-serif"
    fontSize: "clamp(32px, 3.4vw, 50px)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "clamp(28px, 3.3vw, 44px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  figure:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "clamp(30px, 3vw, 40px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  body:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  body-bn:
    fontFamily: "Anek Bangla, Geist, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.45
  caption:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  sm: "8px"
  md: "10px"
  lg: "14px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4.5vw, 56px)"
  max: "1240px"
  slip: "20px"
  card: "24px"
  section: "clamp(72px, 10vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.send-blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.send-blue-press}"
  button-line:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  button-line-small:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "44px"
  chip:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "40px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
  order-slip:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "20px"
  photo-frame:
    backgroundColor: "{colors.tint}"
    rounded: "{rounded.lg}"
  review-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "24px"
  send-bar:
    backgroundColor: "{colors.paper}"
    padding: "10px 16px"
  lang-toggle-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    height: "40px"
---

# Design System: Rifath's Gadget

## Overview

**Creative North Star: "The Handover Table"**

The page is an off-white table with real laptops laid on it. Every image is a photograph from an actual delivery: pink bedroom walls, yellow bedsheets, battery-cycle screens. Those photographs are the only colour on the page. Around them sits ink-black type on a warm off-white ground, held together by 1px hairlines. Nothing is decorated, lit or layered; the evidence does the persuading.

Density is calm and editorial. The first screen pairs a working order slip (budget slider, use chips, screen size, send) with a three-photo wall, so the visitor can act before scrolling. Below, sections alternate between the page ground and a slightly darker tint band, separated only by space and hairlines. On phones, a fixed bottom bar keeps the current budget and the send action reachable.

Bangla reads first. Every type role has a Bangla counterpart in Anek Bangla with looser leading and near-zero tracking. Motion is small and earned: a single blur-fade entrance for the hero, a pressed scale on every tap, a slow zoom on photo hover, and a shared-element expand when a photo opens into its set.

**Key Characteristics:**
- Off-white ground, ink type, hairline structure; photographs supply all colour.
- One blue (#1f6bff) reserved for the send action, focus and text selection.
- Flat surfaces: no shadows, gradients, glass or glows.
- Square-ish corners: 8px controls, 10px buttons, 14px cards and photos.
- Geist 600 for Latin display with tight negative tracking; Anek Bangla for Bangla.
- Bilingual by default, with per-language type adjustments.

## Colors

A near-neutral, warm off-white palette with a single saturated blue that marks the one action.

### Primary
- **Send Blue** (#1f6bff): The WhatsApp send button (slip, phone send bar, closing section), the focus outline, range and checkbox accent, caret, and the 18% selection tint. It never fills a surface, a section or a headline.
- **Send Blue Pressed** (#1656d6): Hover state of the primary button on pointer devices.

### Neutral
- **Handover Off-White** (#fafaf7): Page ground, header background, theme colour.
- **Paper** (#ffffff): Raised working surfaces: the order slip, line buttons, the language toggle, review cards, the closing section, the phone send bar, the viewer side panel.
- **Table Tint** (#f2f2ed): Alternate section bands, photo-frame placeholder while an image loads, nav hover fill.
- **Ink** (#0b0f14): All primary text, the selected chip pill, the active language button, range fill and thumb ring, FAQ plus/minus, viewer scrim at 88% and photo-count pill at 72%.
- **Ink Soft** (#2a3038): Form legends and unselected chip text.
- **Muted Slate** (#5b6470): Second headline line, ledes, captions, body copy under titles, step numbers, footer text.
- **Hairline** (#e6e6e1): Header rule, slip and card borders, range track, footer rules.
- **Hairline Strong** (#d6d6cf): Interactive borders (line buttons, chips, language toggle) and list rules (steps, FAQ), scrollbar thumb.

### Named Rules
**The One Blue Rule.** Blue appears only on the send action, focus and selection. Header CTA, nav links and body links stay ink. If a second thing on screen is blue, one of them is wrong.

**The Photographs Bring The Colour Rule.** No colour is added to the interface to make it lively. Warmth and variety come from the delivery photos alone.

## Typography

**Display Font:** Geist (with Anek Bangla, system-ui)
**Body Font:** Geist for Latin, Anek Bangla for Bangla (each falls back to the other, then system-ui)

**Character:** Geist at 600 with tight negative tracking gives a crisp, product-catalogue voice. Anek Bangla carries the Bangla first read with taller leading and no tracking, so both languages feel equally native.

### Hierarchy
- **Display** (600, clamp(30px, 3.2vw, 48px), 1.04, -0.035em): Hero promise in two lines; the second line drops to Muted Slate. Bangla: clamp(32px, 3.4vw, 50px), 1.18, -0.01em. Closing title scales to clamp(32px, 4.4vw, 56px) at 16ch.
- **Headline** (600, clamp(28px, 3.3vw, 44px), 1.12, -0.03em): Section titles, max 22ch (26ch for wide variants). Bangla line-height 1.3.
- **Title** (600, 20px, 1.3, -0.015em): Benefit and card titles; 18px in steps and FAQ questions.
- **Figure** (600, clamp(30px, 3vw, 40px), 1, -0.03em, tabular numerals): The live budget amount in the slip; 20px in the phone send bar.
- **Body** (400, 17px, 1.6): Running copy. Bangla 18px at 1.7. Ledes clamp(16px, 1.2vw, 18px), max 52ch; FAQ answers max 62ch.
- **Label** (600, 15px): Form legends, caption names, buttons at 16px.
- **Caption** (400, 14px, 1.45): Photo facts in Muted Slate, footer, slip note; 13px for range ends and the photo count.

### Named Rules
**The Two Scripts Rule.** Every heading style has a `lang-bn` counterpart: looser line-height, tracking near 0. Never apply Latin negative tracking to Bangla.

**The Tabular Money Rule.** Budgets, counts and step numbers use tabular numerals so the figure does not jitter while the slider moves.

## Layout

A centered column of min(100% - 2 × gutter, 1240px) with a fluid gutter of clamp(16px, 4.5vw, 56px). The hero is a 5.4fr / 6.6fr grid: copy and slip left, photo wall right (one tall photo spanning two rows beside two stacked, min-height 480px, 14px gaps). Content sections use clamp(72px, 10vw, 128px) vertical padding; "how it works" and FAQ use a 4fr / 8fr title-left grid; benefits are three columns of 4:5 photos; delivered laptops are a four-column grid of 3:4 photos (two below 1080px).

Below 900px everything stacks: promise, lede, a horizontally scroll-snapped strip of 150px photos bleeding to the screen edge, then the slip. The fixed send bar appears and the body gains 76px bottom padding. Below 560px the brand wordmark hides, the close actions go full width, and the first chip row wraps. The desktop nav hides below 1080px. The sticky header is 68px tall; scroll padding is 84px.

## Elevation & Depth

The system is flat. No element has a drop shadow. Depth comes from tone (Paper over Off-White, Tint bands) and 1px hairlines. The only layered surfaces are the photo viewer, which sits on an 88% ink scrim, and the photo-count pill on a 72% ink fill. The selected viewer thumbnail uses a 2px ink ring (`box-shadow: 0 0 0 2px`), which is an outline, not elevation.

### Named Rules
**The Hairline Not Shadow Rule.** To separate a surface, change its tone or give it a 1px line. Never lift it with a shadow.

## Shapes

Corners are square-ish and consistent: 8px on chips and nav items, 10px on buttons, the language toggle and small controls, 14px on the order slip, photo frames, review cards and viewer panels. Circles appear only on the logo, range thumb and viewer arrow buttons; the photo count is a full pill. Photos are always clipped by a frame with `object-fit: cover` (contain inside the viewer). Borders are 1px; there are no thick strokes.

## Components

### Buttons
Solid, compact and tactile.
- **Shape:** gently squared (10px), 48px tall, 0 20px padding, 600 at 16px, icon gap 10px.
- **Primary:** Send Blue fill, white text, WhatsApp glyph. Used only for sending the budget.
- **Line:** Paper fill, 1px Hairline Strong border, ink text. Header CTA and secondary actions; border turns ink on hover.
- **Small:** 44px tall, 0 14px, 15px.
- **States:** hover only on fine pointers (primary darkens to Send Blue Pressed); press scales to 0.97 over 160ms with the out-expo ease; focus is a 2px blue outline offset 3px.

### Chips
- **Style:** 40px tall, 8px corners, 1px Hairline Strong border, Ink Soft text at 15px, transparent fill.
- **Selected:** an ink pill slides between options as a shared layout element (spring 0.35s, bounce 0.15); label turns white. Unselected chips take an ink border on hover; all press to 0.97.

### Order Slip (signature)
Paper card, 1px Hairline, 14px corners, 20px padding (18px on phones), 14px internal gap. Top row: label left, the budget as a large tabular figure right. Below: a range input with a 6px ink-filled track over Hairline and a 26px white thumb ringed in ink that scales to 1.12 while dragged; min/max under it at 13px. Then two chip groups (use, screen size), the full-width primary button, and a centered 14px muted note.

### Photo Frame
Tint placeholder, 14px corners, overflow clipped. Each frame is a button that opens the viewer. On fine-pointer hover the image zooms to 1.03 over 500ms; on press the frame scales to 0.99. Caption under it: name in 15px 600 ink, one fact in 14px muted. Delivered-laptop frames carry a photo-count pill bottom-right.

### Viewer (signature)
A full-screen dialog on an 88% ink scrim, fading in over 250ms. The tapped frame expands into place as a shared element (spring 0.5s, bounce 0.12). Photo area left on black with arrow buttons (48px white circles at 92%), a 300px Paper side panel right with name, facts, a 4-column 3:4 thumbnail grid (5 on phones; inactive at 55% opacity), and a tabular counter. Photos change with a 40px slide plus 6px blur over 300ms; arrow keys, swipe and Esc work. Stacks to one column below 900px.

### Navigation
Sticky 68px header on the page ground with a bottom Hairline. Brand mark (circular logo + wordmark, 600 at 17px). Nav links are muted 15px with 10px 12px padding, 8px corners, turning ink on a Tint fill at hover. A segmented language toggle (Paper, Hairline Strong border, 3px inset) shows the active language as an ink pill. A small line button carries the WhatsApp CTA.

### Phone Send Bar
Below 900px only: fixed to the bottom, Paper with a top Hairline, safe-area padded. Left: muted "budget" label over the live amount at 20px tabular. Right: the primary send button.

### Lists and FAQ
Steps sit in a two-column grid, each item a top Hairline Strong rule with a muted tabular number in a 36px column. FAQ rows are 64px-minimum buttons, 18px 600, with a hairline plus that rotates to a minus (200ms); answers open by height and opacity over 250ms.

### Reviews
Paper cards, 1px Hairline, 14px corners, 24px padding, quote at 18px, name muted at 15px. The section renders only when real customer reviews exist in content; it is hidden while the list is empty.

### Close and Footer
Paper band with a top Hairline: large closing title left, action buttons right, then a footer row of brand and muted 14px text above another Hairline.

## Do's and Don'ts

### Do:
- **Do** use real delivery photographs for every image; the colour on the page comes from them.
- **Do** keep Send Blue (#1f6bff) on the send action, focus outline and selection only.
- **Do** separate surfaces with tone (Paper, Tint) and 1px hairlines (#e6e6e1, #d6d6cf).
- **Do** use 8 / 10 / 14px corners for chips / buttons / cards and photos.
- **Do** give every heading a Bangla variant with looser leading and tracking near 0.
- **Do** use the out-expo ease cubic-bezier(0.23, 1, 0.32, 1): press 0.97 over 160ms, photo zoom 1.03 over 500ms, hero blur-fade (12px, 16px rise, 0.9s, 90ms stagger) once on load.
- **Do** honour reduced motion: entrances and slides drop to plain fades or nothing.
- **Do** render the reviews section only from real customer words.

### Don't:
- **Don't** use gradients, glass, glows or backdrop blur on any surface. The range track's two-stop hard fill is the only gradient and it is a progress fill, not decoration.
- **Don't** add drop shadows to cards, buttons or photos.
- **Don't** put eyebrow or kicker labels above headings.
- **Don't** use stock photos, device renders or illustrations in place of delivery photos.
- **Don't** colour links, nav items or headings blue.
- **Don't** animate on scroll; nothing moves except the hero entrance, presses, hovers, chips, FAQ and the viewer.
- **Don't** write or imply reviews, prices or guarantees that do not exist.

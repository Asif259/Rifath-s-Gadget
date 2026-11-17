---
name: Rifath's Gadget
description: A laptop found for one budget, checked before purchase, paid for at handover.
colors:
  page: "#FAFAF7"
  surface: "#FFFFFF"
  tint: "#F2F2ED"
  line: "#E6E6E1"
  line-2: "#D6D6CF"
  ink: "#0B0F14"
  ink-2: "#2A3038"
  muted: "#5B6470"
  blue: "#1F6BFF"
  blue-press: "#1656D6"
  blue-tint: "#EAF1FF"
typography:
  heading-1:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "60px"
    fontWeight: 600
    lineHeight: "60px"
    letterSpacing: "-0.03em"
  heading-2:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "48px"
    fontWeight: 600
    lineHeight: "48px"
    letterSpacing: "-0.025em"
  heading-3:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: "40px"
    letterSpacing: "-0.02em"
  heading-4:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: "36px"
    letterSpacing: "-0.015em"
  heading-5:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "32px"
    letterSpacing: "-0.01em"
  heading-6:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "28px"
  title-1:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: "28px"
  title-2:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: "28px"
  title-3:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "24px"
  title-4:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
  body-1:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "24px"
  body-2:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "24px"
  body-3:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  body-4:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "20px"
  body-6:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  button-lg:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: "28px"
  button-md:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "24px"
  button-sm:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "20px"
  caption-1:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
  caption-2:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  caption-3:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
  caption-4:
    fontFamily: "Geist, Anek Bangla, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "16px"
rounded:
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  s-25: "2px"
  s-50: "4px"
  s-75: "8px"
  s-100: "12px"
  s-200: "16px"
  s-300: "24px"
  s-400: "32px"
  s-500: "40px"
  s-600: "48px"
  s-700: "64px"
  s-800: "80px"
  s-900: "96px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
    typography: "{typography.button-md}"
    rounded: "{rounded.xl}"
    padding: "8px 12px"
  button-primary-hover:
    backgroundColor: "{colors.blue-press}"
  button-primary-big:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.2xl}"
    padding: "12px 24px"
  button-line:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "7px 11px"
  link:
    textColor: "{colors.blue}"
  nav-pill:
    rounded: "{rounded.full}"
    padding: "8px 8px 8px 16px"
  lang-switch:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.muted}"
    typography: "{typography.caption-1}"
    rounded: "{rounded.full}"
    padding: "2px"
  lang-switch-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  deal-sheet:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.3xl}"
    padding: "8px"
  deal-request-panel:
    backgroundColor: "{colors.tint}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  deal-found-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  benefit-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  icon-box:
    backgroundColor: "{colors.blue-tint}"
    textColor: "{colors.blue}"
    rounded: "{rounded.xl}"
    size: "40px"
  step-number:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    size: "32px"
  delivery-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.3xl}"
    padding: "8px"
  chip:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.lg}"
    padding: "2px 8px"
  badge-saving:
    backgroundColor: "{colors.blue-tint}"
    textColor: "{colors.blue-press}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  choice-pill:
    textColor: "{colors.ink-2}"
    typography: "{typography.caption-1}"
    rounded: "{rounded.full}"
    padding: "9px 15px"
  choice-pill-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  form-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.3xl}"
    padding: "32px"
  faq-item:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.2xl}"
    padding: "16px 24px"
  viewer-side:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.3xl}"
    padding: "24px"
---

# Design System: Rifath's Gadget

## Overview

**Creative North Star: "The Deal Sheet"**

The page reads like a clear receipt of one real job: what a buyer asked for, what was found, how far below market it came, and what the buyer said. Everything else is quiet paper around that sheet. A warm off-white page, white surfaces edged with 1px hairlines, near-black ink, and one confident blue reserved for actions, savings and checks. Density is calm: one idea per section, 96px between sections, a centered 680px column for every promise.

The system is built on the landing-page-design skill's fixed scales. Type comes from a closed set of named styles (heading, title, body, button, caption), spacing from twelve tokens, corners from the Tailwind radius scale with nested corners computed from their parent. Geist carries Latin; Anek Bangla carries Bangla, which reads first. Phosphor icons are the only icon set. Motion is soft and once-only: sections rise 32px into place, tagline words light up as they are read, pills slide between choices.

Trust is carried by evidence, never by decoration. Every delivery fact, saving and review shown on a surface comes from that delivery's `public/deliveries/<id>/description.md`. Nothing is invented to fill a layout.

**Key Characteristics:**
- Light, warm-neutral paper with white hairline-bordered surfaces.
- One accent (blue) for actions, savings and check icons; ink for selection and numbering.
- Closed named type styles on the Tailwind scale, Bangla line heights loosened.
- Rounded, nested corners (8 / 12 / 16 / 24 / full).
- Floating translucent nav pill; the hero heading gradient is the only gradient.
- Soft, once-only motion on cubic-bezier(0.22, 1, 0.36, 1).

## Colors

A warm off-white neutral family with one saturated blue; ink does the work of contrast, blue does the work of action.

### Primary
- **Action Blue** (#1F6BFF): every primary button (WhatsApp), links, check and seal icons, the deal-tab progress line, the range fill, focus rings.
- **Action Blue Pressed** (#1656D6): primary button hover; text on the saving badge, where it holds contrast on Blue Wash.
- **Blue Wash** (#EAF1FF): saving badge fill, benefit icon box fill, text selection.

### Neutral
- **Warm Paper** (#FAFAF7): page background and browser theme color.
- **Surface White** (#FFFFFF): cards, deal sheet, form card, FAQ items, viewer side panel, active tab and language segment.
- **Bone Tint** (#F2F2ED): recessed areas: the request panel, tab track, language switch track, chips, photo placeholders, current nav link.
- **Hairline** (#E6E6E1): 1px borders on every surface, section and footer dividers, range track.
- **Hairline Strong** (#D6D6CF): line-button border, choice-pill border, dividers sitting on Bone Tint (review rule, step top rule).
- **Ink** (#0B0F14): body text, step numbers, the deal arrow disc, selected choice pill, selected thumbnail ring, skip link.
- **Ink Soft** (#2A3038): quoted reviews, spec lists, chip text.
- **Muted Slate** (#5B6470): secondary copy, ledes, labels, inactive nav and tab text.

### Named Rules
**The One Accent Rule.** Blue appears only where the visitor can act or where a saving or check is proven. Selection states that are not actions use ink, not blue.

**The One Gradient Rule.** The hero heading carries a 90deg gradient from #000000 to #666666 (landing-page-design rule B5, a recorded detector exception for `src/styles.css`). No other text, surface or button carries a gradient. The range input's two-stop fill is a hard-edged progress fill, not a gradient.

## Typography

**Latin Font:** Geist (with Anek Bangla, system-ui, sans-serif)
**Bangla Font:** Anek Bangla (with Geist, system-ui, sans-serif), applied by the `lang-bn` root class.

**Character:** a precise neo-grotesk paired with a wide, open Bangla face; both set in 400 to 600, never lighter, never heavier.

### Hierarchy
- **Heading 1** (600, 60px / 60px, -0.03em): the hero promise only, two lines, max 680px. 36/40px under 600px container width (the hero heading itself drops to 30/36px).
- **Heading 2** (600, 48px / 48px, -0.025em): section titles, the tagline sentence and the closing title. 30/36px on phones.
- **Heading 3** (600, 36px / 40px): the saving amount on the deal sheet.
- **Heading 4** (600, 30px / 36px): the buyer's request on the deal sheet, the live budget figure.
- **Heading 5 / 6** (600, 24/32px and 20/28px): model names and card titles.
- **Title 1 to 4** (500, 20/28, 18/28, 16/24, 14/20): ledes (title-2), form labels and legends (title-3), FAQ questions (title-2).
- **Body 1 to 6** (600 / 500 / 400 at 16/24; 600 / 400 at 14/20): running copy is body-3; names are body-4; review quotes in cards are body-6.
- **Button lg / md / sm** (600, 18/28, 16/24, 14/20): hero CTA, standard buttons, nav CTA.
- **Caption 1 to 4** (500 / 400 at 14/20; 600 / 500 at 12/16): nav links, language switch, choice pills, proof line, photo facts, footer.

### Named Rules
**The Named Style Rule.** Text uses one of the named styles above and nothing else. No ad-hoc font sizes; the only overrides are the documented phone sizes for headings 1 to 3, the hero lede and the deal-sheet request.

**The Bangla Room Rule.** Bangla needs space for vowel signs above and below the line. Under `lang-bn`, headings 1 to 4 set line-height 1.3 and letter-spacing 0, headings 5 and 6 set 1.45 and 0, title 1 to 3 and body 1 to 3 set 1.6. This is a recorded script exception to the fixed Tailwind line heights.

**The Tabular Figure Rule.** Money and counts (saving, saving badge, budget output) use tabular numerals.

## Layout

A centered single column, max 1200px with 48px gutters (16px under 600px container width). Sections are separated by 96px of padding (64px on phones; the hero uses 96px top on desktop, 48px on phones). Section heads cap at 680px with 16px between title and lede; centered heads center their text.

Spacing uses only the twelve tokens: 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96px. Inner card padding is 24px or 32px; gaps inside cards are 8, 12 or 24px; grids sit 48px below their section head.

Grids: benefits 4 columns, delivery cards 2, steps 3, finder and FAQ split 1:1 and 4:8 with 48px gutters. The deal sheet splits 5fr / arrow / 7fr.

Breakpoints are container queries on `.page` (`container: page / inline-size`), so the live site and fixed-width mocks share rules:
- **1080px:** benefits 2 columns, deliveries 1 column.
- **860px:** nav links hide; deal sheet, finder, FAQ and steps stack; the deal arrow rotates 90deg.
- **600px:** phone sizes for headings, brand name hides, nav CTA becomes an icon, deal sheet tightens (4px padding, 16px radius, 24px panels with 12px radius), spec list and cards go single column, primary big buttons and close actions go full width.

The photo viewer uses a viewport media query at 860px to stack its photo above its side panel.

## Elevation & Depth

Depth is mostly tonal: white surfaces on warm paper, edged with 1px hairlines, with Bone Tint for recessed areas. Soft ink-tinted shadows appear on only three floating layers and two small active indicators.

### Shadow Vocabulary
- **Nav float** (`box-shadow: 0 8px 24px rgba(11, 15, 20, 0.06)`): the floating nav pill, together with a 72% white fill and `backdrop-filter: saturate(1.6) blur(16px)`.
- **Sheet float** (`box-shadow: 0 24px 48px rgba(11, 15, 20, 0.06)`): the hero deal sheet only.
- **Segment lift** (`box-shadow: 0 1px 2px rgba(11, 15, 20, 0.08)`): the active deal tab and active language segment.
- **Range thumb** (`box-shadow: inset 0 0 0 2px #1F6BFF, 0 1px 3px rgba(11, 15, 20, 0.16)`): the budget slider thumb.
- **Thumb ring** (`box-shadow: 0 0 0 2px #0B0F14`): selected viewer thumbnail; an outline, not elevation.

### Named Rules
**The Hairline First Rule.** A new card is a white surface with a 1px Hairline border and no shadow. Shadows are reserved for things that float over content (nav, deal sheet) and for the active segment of a track.

## Shapes

Rounded and friendly, on the Tailwind radius scale: 8px (chips, thumbnails), 12px (buttons, tabs, icon boxes), 16px (inner panels, benefit cards, FAQ items, photo frames, big primary button), 24px (outer containers: deal sheet, delivery card, form card, viewer panels), full (nav pill, nav links, language switch, choice pills, badges, avatars, step numbers, progress line).

**The Nested Corner Rule.** An inner radius equals the outer radius minus the padding between them. The deal sheet (24px radius, 8px padding) holds 16px panels; the delivery card (24px, 8px) holds a 16px photo; on phones the sheet (16px, 4px) holds 12px panels.

Photos are clipped to 3:4 portrait in delivery cards (4:3 on phones) and shown uncropped (`object-fit: contain`) on black in the viewer.

## Components

### Buttons
Quiet, solid, unadorned.
- **Shape:** gently rounded (12px); big variant 16px; inside the nav pill, fully round.
- **Primary:** Action Blue fill, white text, 8px 12px padding (big: 12px 24px, button-lg), a 20px Phosphor icon with an 8px gap. Primary always means WhatsApp.
- **Hover / Active:** fine pointers darken to Action Blue Pressed over 300ms; every button presses to `scale(0.98)`. Focus is a 2px Action Blue outline offset 2px.
- **Line:** white fill, 1px Hairline Strong border, ink text; hover turns the border ink. Used for the Facebook / Messenger alternative.
- **Link:** Action Blue text with a 16px arrow that nudges 2px right on hover.

### Navigation
A floating translucent pill, sticky 16px from the top, centered. Brand (28px round logo plus body-1 name), three anchor links in caption-1 (muted, current link gets Bone Tint fill and ink text), the language switch, and the WhatsApp primary button. The language switch is a Bone Tint track with 2px padding; the active segment is white with Segment lift. Under 860px the links hide; under 600px the brand name and CTA label hide.

### Hero Deal Sheet (signature)
A white 24px sheet with Sheet float, 8px padding. Top: a Bone Tint tab track of real buyer cases; the active tab is a white segment that slides between tabs (shared layout, spring 0.45s, bounce 0.12) with a 2px Action Blue progress line that fills over the 7-second case interval. Cases advance automatically; hover or focus pauses. Body: the request panel (Bone Tint, 32px padding: the buyer's request in heading-4, then the buyer's review above a Hairline Strong rule with avatar and name), an ink arrow disc, and the found panel (white with Hairline border, 32px padding: model, two-column spec list with blue check icons, then the saving in heading-3 and a link to all specs and photos). Case content crossfades with an 8px vertical shift over 0.35s.

### Tagline Reveal
One heading-2 sentence, max 880px, centered. Each word starts at 28% ink and turns full ink (600ms) once it crosses a line 40% up from the bottom of the viewport. Reduced motion shows it fully lit.

### Cards / Containers
- **Benefit card:** white, Hairline border, 16px radius, 24px padding; a 40px Blue Wash icon box with a 24px blue Phosphor icon, heading-6 title, body-3 muted text.
- **Step:** no card; a Hairline Strong top rule, a 32px ink number disc, heading-6 and body-3.
- **Delivery card:** white, Hairline border, 24px radius, 8px padding; a 200px photo column (3:4, hover zooms the image to 1.03 over 500ms, a dark translucent photo count pill) beside heading-6 model, chips, saving badge, the buyer's full review (body-6 in Ink Soft above a Hairline rule, name in body-4, "translated" note in English), and a footer link.
- **FAQ item:** white, Hairline border, 16px radius; title-2 question with a plus icon that rotates 45deg when open; the answer expands by height over 0.5s.

### Chips and Badges
- **Chip:** Bone Tint fill, Ink Soft text, 8px radius, 2px 8px padding; facts from the delivery only.
- **Saving badge:** Blue Wash fill, Action Blue Pressed text, fully round, 4px 12px, with a 16px icon and tabular numerals.

### Inputs / Fields
- **Form card:** white, Hairline border, 24px radius, 32px padding, 24px gaps.
- **Budget range:** a 4px track filled Action Blue up to the value over Hairline; a 24px white thumb ringed in Action Blue that scales to 1.1 while dragged. The value shows in heading-4 tabular numerals.
- **Choice pills:** caption-1, fully round, 1px Hairline Strong border, Ink Soft text; hover turns the border ink; the selected pill is solid ink with white text, and the ink pill slides between options (spring 0.45s, bounce 0.12).

### Photo Viewer
Full-screen over 88% ink. A 24px-radius black photo stage (photos swap with a 40px horizontal slide over 0.5s, swipe or 40px round white arrow buttons) beside a 360px white side panel: heading-5 model, a spec list with 16px blue checks, the review, a five-column grid of 3:4 thumbnails (50% opacity, selected at full with an ink ring), and a live photo counter. The panel enters with a 24px rise over 0.5s. Focus is trapped inside.

### Close and Footer
The close section repeats the centered heading-2 promise with primary and line actions. The footer sits on a Hairline top rule with the brand and contact meta.

### Motion
- **Base curve:** cubic-bezier(0.22, 1, 0.36, 1) for every transition.
- **Hero entrance:** opacity plus 24px rise, 0.8s, staggered 0.08s per item, once on load.
- **Section reveal:** opacity plus 32px rise, 0.7s, once, when 64px inside the viewport.
- **State changes:** 300ms on color, background, border and transform.
- **Reduced motion:** transitions collapse to near zero; the tagline is fully lit; the hero renders without its entrance; case and viewer swaps become plain fades.

## Do's and Don'ts

### Do:
- **Do** use only the named text styles, the twelve spacing tokens (2 to 96px) and the Tailwind radii (8, 12, 16, 24, full).
- **Do** compute inner corners as outer radius minus padding.
- **Do** keep hero heading and subheading at max 680px.
- **Do** use Phosphor icons at 16, 20 or 24px.
- **Do** keep Action Blue for actions, savings and checks; use ink for non-action selection.
- **Do** loosen Bangla line heights (1.3 large headings, 1.45 heading 5 and 6, 1.6 body and titles).
- **Do** take every delivery fact, saving and review from `public/deliveries/<id>/description.md`, and show one name per buyer.
- **Do** reveal sections once with a 32px rise on cubic-bezier(0.22, 1, 0.36, 1), and press buttons to scale 0.98.
- **Do** write breakpoints as container queries on `.page` at 1080, 860 and 600px.

### Don't:
- **Don't** add any gradient beyond the hero heading's #000 to #666.
- **Don't** invent reviews, prices, savings, specs or model details that the delivery's description.md does not state.
- **Don't** put shadows on ordinary cards; use a 1px Hairline border.
- **Don't** set text in ad-hoc sizes or weights outside the named styles.
- **Don't** use any icon set other than Phosphor.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

University students buying a first laptop on a tight budget (study, light programming), and young professionals who need a laptop for office work, freelancing, design or development. Both mostly browse on phones and are wary of being sold a bad used laptop.

## Product Purpose

Rifath's Gadget is a laptop sourcing service. It keeps no stock. A customer sends a budget and what the laptop is for; Rifath's Gadget suggests a specification, searches the market for two to three days or longer, and shows laptops until one suits. Before buying the chosen laptop it checks the cash memo, motherboard, RAM, SSD health and battery cycles. The customer checks the laptop at handover and pays then. Anyone can message for a laptop suggestion without buying.

Success: a visitor sends a WhatsApp or Messenger message with a budget.

## Positioning

No stock means nothing to push: the laptop is found for one customer's budget and use, checked before purchase, and paid for only at handover. The checking risk sits with Rifath's Gadget, not the buyer.

## Operating Context

- Contact happens on WhatsApp (+880 1887-502002) and the Facebook page / Messenger (https://www.facebook.com/share/19o7DbSKTY/).
- Handover in person in Dhaka; courier to other districts.
- Typical budgets: ৳40,000 to ৳120,000.
- Warranty and condition vary with budget and with each laptop.

## Capabilities and Constraints

- Single landing page; Bangla first, English second.
- Stack: Vite, React 19, TypeScript, `motion` (existing codebase).
- Undecided: whether Rifath's Gadget gives any guarantee or return of its own. Say nothing about one until confirmed.

## Brand Commitments

- Name: Rifath's Gadget. Tagline on the logo: "Tech for a better you".
- Logo: `public/logo.webp` (white R with phone outline, blue gradient, black circle).

## Evidence on Hand

- 8 real deliveries, 56 photos: `public/deliveries/<1-8>/` (`n.jpg`, thumbnails `tn.jpg`). Facts per delivery in `src/content.ts` list only what the photos show (brand, battery cycles, warranty screens, accessories).
- Per-delivery post text in `public/deliveries/<id>/description.md`: model, full specs, saving below market price (৳20,000 to ৳36,000), the buyer's first request where stated, and the buyer's review (7 of 8 deliveries). Use only these; never write or imply other reviews.
- No selling prices or sales counts. Do not invent them.

## Product Principles

1. Show, don't claim: real delivery photos and battery screens carry the trust.
2. One action: every section leads to sending a budget on WhatsApp.
3. Plain words in the customer's language; Bangla reads first.
4. Promise only what the business does: no stock, checks before buying, pay at handover.

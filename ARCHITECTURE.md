# SITE ARCHITECTURE & CONTENT SPECIFICATION

This document outlines the site structure, routing, component hierarchy, and content layout for the Skincare Clinic web application.

> **Status (implementation):** Built with **Astro 7 + Tailwind v4**, Netlify adapter, static pages + one SSR action for the contact form. All copy is **Greek** (`lang="el"`); treatments live in the `treatments` content collection (34 entries) with one static page each at `/services/{slug}`.

> **Agent Directive:** Read this document alongside `DESIGN.md`. Maintain the sharp-edged (`rounded-none`), card-free, editorial serif aesthetic across all specified pages and components. Fonts: Playfair Display (display) + Commissioner (sans) — both with full Greek support.

---

## 1. Tech Stack & Route Overview

- **Framework:** Astro 7 (server output, prerendered static pages, Netlify functions only for `/contact` form action)
- **Styling:** Tailwind CSS v4 (Playfair Display / Commissioner)
- **Booking Integration:** Direct external redirection to Treatwell (No internal booking engine)
- **CMS:** PagesCMS (see `.pages.yml` and README) — `site.json`, `home.json`, `contact.json`, `pages.json`, `src/content/treatments/*`, `src/data/services-menu.json` is source-managed

| Route Path            | Page Name        | Primary Objective                                                                                                    |
| :-------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------- |
| `/`                   | **Homepage**     | Hero **video** (photo fallback), best-sellers, marquee, studio teaser, booking CTA                                    |
| `/services`           | **Services**     | Category-grouped directory of all 34 treatments + laser/wax/brow region menus; each row links to its detail page       |
| `/services/[slug]`    | **Treatment**    | Full treatment page: intro, problem, benefits, before/after, FAQ, info sidebar, Treatwell CTA (34 static pages)        |
| `/studio`             | **Studio**       | Photo gallery, **360° virtual tour** (pannellum, equirectangular scenes in `src/assets/tour/`), technology, hygiene    |
| `/faq`                | **FAQ**          | General booking/cancellation Q&A + per-treatment FAQs aggregated from content collection                               |
| `/contact`            | **Contact**      | Details + Resend-powered enquiry form; address/phone/hours from `site.json`                                            |

---

## 2. Global Navigation & Header Rules

### Top Header Bar

- **Logo (Center or Left):** Plain text styled with `Noto Serif Display`. Clicking the logo routes directly to `/` (Homepage). There is NO separate "Home" text link in the navigation menu.
- **Navigation Links:**
  - `Services` (`/services`)
  - `Studio` (`/studio`)
  - `FAQ` (`/faq`)
  - `Contact` (`/contact`)
- **Global CTA Button:**
  - Label: `BOOK NOW` (or `BOOK APPOINTMENT`)
  - Link: External Treatwell URL (Must open in new tab via `target="_blank" rel="noopener noreferrer"`).
  - Style: Sharp block, high-contrast black/white button per `DESIGN.md`.

---

## 3. Page Structure & Component Breakdown

### A. Homepage (`/`)

1. **Hero Section:**
   - High-impact `Noto Serif Display` campaign headline.
   - Background: High-contrast monochrome layout with subtle warm linen accents.
   - Dual Actions: Primary `BOOK NOW` (Treatwell) and secondary `EXPLORE TREATMENTS` (`/services`).
2. **Featured Treatments Section:**
   - Linear listing preview (LPG, EMS, Endospheres, Press) using hairline dividers (NO cards).
   - Link to view full `/services` page.
3. **Studio Teaser:**
   - Full-width sharp-cornered editorial imagery showcase of the clinic interior.
   - Direct link to `/studio`.
4. **Direct Booking Banner:**
   - Full-width block CTA directing users to Treatwell.

### B. Services Page (`/services`)

- **Layout:** Vertical editorial treatment directory using border-divided rows (NO cards).
- **Treatment Sections:**
  1. **LPG Endermologie:** Body & facial targeting, lymphatic drainage benefits, duration, pricing.
  2. **EMS (Electrical Muscle Stimulation):** Muscle toning, body sculpting breakdown.
  3. **Endospheres Therapy:** Compressive micro-vibration details and targeted benefits.
  4. **Pressotherapy:** Advanced pneumatic drainage treatment overview.
- **Component Pattern:** Each treatment entry includes a `Noto Serif Display` title, duration/pricing metadata, concise body description, and an inline `BOOK ON TREATWELL` action.

### C. Studio Page (`/studio`)

- **Layout:** High-fashion visual grid using sharp `rounded-none` image containers.
- **Content Sections:**
  1. **The Space:** Editorial gallery of the interior design, treatment rooms, and atmosphere.
  2. **Our Technology:** High-resolution imagery and specifications of the clinic's machinery (LPG, EMS, Endospheres, Press devices).
  3. **Hygiene & Standards:** Brief minimalist text block outlining clinical protocols.

### D. FAQ Page (`/faq`)

- **Layout:** Single-column sharp accordion or open border-separated list.
- **Categories covered:**
  - Preparation for treatment (LPG, EMS, Endospheres, Press).
  - Contraindications & safety.
  - Booking & cancellation policy via Treatwell.

### E. Contact Page (`/contact`)

- **Layout:** 2-column minimalist split (Desktop) or stacked linear section (Mobile).
- **Column 1 — Details:** Clinic address, phone, email, operating hours, direct Treatwell link.
- **Column 2 — Inquiry Form:** Sharp under-lined inputs (`rounded-none`) for general inquiries (Name, Email, Phone, Message).

---

## 4. File Structure Convention

```text
app/ (or src/pages/)
├── layout.tsx                # Global Nav (Logo, Links, Treatwell CTA) + Footer
├── page.tsx                  # Homepage
├── services/
│   └── page.tsx              # Services Directory (LPG, EMS, Endospheres, Press)
├── studio/
│   └── page.tsx              # Studio & Machinery Gallery
├── faq/
│   └── page.tsx              # FAQ List
└── contact/
    └── page.tsx              # Contact Form & Location Details
```

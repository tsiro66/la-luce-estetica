# SITE ARCHITECTURE & CONTENT SPECIFICATION

This document outlines the site structure, routing, component hierarchy, and content layout for the Skincare Clinic web application.

> **Agent Directive:** Read this document alongside `DESIGN.md`. Maintain the sharp-edged (`rounded-none`), card-free, editorial serif aesthetic across all specified pages and components.

---

## 1. Tech Stack & Route Overview

- **Framework:** Next.js (App Router) or Vite + React
- **Styling:** Tailwind CSS (Custom configured for Noto Serif / Noto Serif Display)
- **Booking Integration:** Direct external redirection to Treatwell (No internal booking engine)

| Route Path  | Page Name    | Primary Objective                                                           |
| :---------- | :----------- | :-------------------------------------------------------------------------- |
| `/`         | **Homepage** | High-impact brand hero, service preview, studio teaser, book CTA            |
| `/services` | **Services** | Editorial listing of core treatments (LPG, EMS, Endospheres, Press therapy) |
| `/studio`   | **Studio**   | Imagery showcase of physical space and medical-grade machinery              |
| `/faq`      | **FAQ**      | Minimalist accordion/list addressing common treatment queries               |
| `/contact`  | **Contact**  | Minimalist consultation inquiry form & location details                     |

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

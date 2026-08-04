# DESIGN SYSTEM RULES & UI CONSTRAINTS (LUXURY SKINCARE)

This document dictates visual, typographic, and structural constraints for all frontend components created or modified for this skincare clinic application.

> **Agent Directive:** Enforce a brutalist-luxury aesthetic. Never use rounded corners (`rounded-none` everywhere) or card/box containers. Rely on editorial serif typography, generous white space, and subtle nude skin-tone accents for hierarchy.

---

## 1. Architectural Principles & Layout

- **Zero Roundness Policy (STRICT):**
  - NEVER use any radius utility (`rounded`, `rounded-md`, `rounded-full`, etc.).
  - Every button, image wrapper, input, modal, and hover state must feature sharp 90-degree corners using `rounded-none`.
- **No Cards or Boxed Containers:**
  - Do NOT wrap clinical services, testimonials, or pricing in elevated card boxes (`bg-white shadow` or `bg-neutral-900 border`).
  - Structure content using **editorial columns, generous vertical whitespace (`py-20 sm:py-32`), and ultra-thin hairline dividers (`border-b border-neutral-200 dark:border-neutral-800`)**.

---

## 2. Typography Rules

Only two font families are permitted across the application: **Noto Serif Display** (for striking editorial headers) and **Noto Serif** (for body copy and clinical details).

- **Heading Rules (Noto Serif Display):**
  - Main Hero / Campaign Titles (`h1`): `font-serif-display text-5xl sm:text-7xl font-light tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.1]`.
  - Section Headers (`h2`): `font-serif-display text-2xl sm:text-4xl font-normal tracking-wide text-neutral-900 dark:text-neutral-100 uppercase pb-4 mb-8 border-b border-neutral-900/10 dark:border-neutral-100/10`.
  - Treatment & Service Titles (`h3`): `font-serif-display text-xl sm:text-2xl font-light text-neutral-900 dark:text-neutral-100`.
- **Body & Clinical Details (Noto Serif):**
  - Primary Body Text: `font-serif text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-light`.
  - Microcopy & Treatment Notes: `font-serif text-xs tracking-widest text-neutral-500 dark:text-neutral-400 uppercase`.

---

## 3. Color Palette (Monochrome + Nude Accent)

The palette is rooted in high-contrast black and white, elevated by subtle nude skin tones used exclusively for highlights, subtle background fills, or focus states.

### Core Neutrals

- **Primary Canvas:** `bg-white` (Light) / `bg-[#0B0A0A]` (Deep Off-Black)
- **High-Contrast Text:** `text-neutral-900` (Light) / `text-neutral-50` (Dark)
- **Hairline Borders:** `border-neutral-900` or `border-neutral-200` (Light) / `border-neutral-800` (Dark)

### Nude / Skin-Tone Accent Variables

- **Skin Tone Subtle Fills:** `bg-[#FDF8F5]` (Warm Porcelain) or `bg-[#F4EBE1]` (Soft Linen)
- **Skin Tone Accent Borders / Details:** `border-[#E5D4C0]` (Soft Warm Nude) or `text-[#B8977E]` (Deep Muted Sand)

---

## 4. Components & Layout Patterns

### Luxury Editorial Actions (Buttons)

- **Primary Booking Action:** `inline-flex items-center justify-center rounded-none bg-neutral-900 px-8 py-4 font-serif text-xs uppercase tracking-[0.2em] text-white hover:bg-[#B8977E] dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-[#E5D4C0] transition-colors duration-300`
- **Secondary / Treatment Inquiry:** `inline-flex items-center justify-center rounded-none border border-neutral-900 bg-transparent px-8 py-4 font-serif text-xs uppercase tracking-[0.2em] text-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 transition-colors duration-300`

### Treatment Lists (Replacing Cards)

Instead of service cards, display treatments in a stark, luxury list format with subtle skin-tone hover effects:

```html
<div
  class="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-900 dark:border-neutral-100"
>
  <div
    class="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:bg-[#FDF8F5] dark:hover:bg-neutral-900/50 px-4 transition-colors duration-200"
  >
    <div
      class="md:col-span-3 font-serif text-xs uppercase tracking-widest text-[#B8977E]"
    >
      01 / Facial Treatment
    </div>
    <div class="md:col-span-6 font-serif-display text-2xl font-light">
      Customized Botanical Peel
    </div>
    <div class="md:col-span-3 text-right font-serif text-sm text-neutral-500">
      60 MIN — $240
    </div>
  </div>
</div>
```

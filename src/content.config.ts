import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const treatments = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/treatments" }),
  schema: z.object({
    /** Short display title (cards, menus) */
    title: z.string(),
    /** SEO page title, e.g. "…στο Χαλάνδρι" */
    pageTitle: z.string().optional(),
    /** Editorial subtitle shown under the title */
    subtitle: z.string().optional(),
    /** One of: Αποτρίχωση, Πρόσωπο, Μασάζ, Σώμα */
    category: z.string(),
    /** Session duration, e.g. "45 λεπτά" */
    duration: z.string(),
    /** Sort position within category */
    order: z.number().default(99),
    /** Shown on homepage best-sellers section */
    bestseller: z.boolean().default(false),
    /** Rich content fields (all optional — transcribed gradually) */
    problems: z.array(z.string()).default([]),
    benefits: z.array(z.string()).default([]),
    before: z.array(z.string()).default([]),
    after: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    info: z
      .object({
        resultDuration: z.string().optional(),
        pain: z.string().optional(),
        recovery: z.string().optional(),
      })
      .optional(),
    /** Image filename inside src/assets/site, resolved via import.meta.glob */
    image: z.string().optional(),
  }),
});

export const collections = { treatments };

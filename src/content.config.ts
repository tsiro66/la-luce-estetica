import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const treatments = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/treatments" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    duration: z.string(),
    price: z.number(),
    order: z.number().default(99),
    featured: z.boolean().default(true),
  }),
});

export const collections = { treatments };

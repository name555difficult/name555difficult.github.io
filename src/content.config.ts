import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const BLOG_PATH = "src/content/blog";

const taxonomyPath = z
  .string()
  .refine(
    value => value.split("/").filter(Boolean).length >= 2,
    "taxonomy entries must use at least two path levels like `AI/LLM`"
  );

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string().min(20),
      pdf: z.string().regex(/^\/pdfs\/.+\.pdf$/),
      taxonomy: z.array(taxonomyPath).min(1),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().optional(),
      draft: z.boolean().default(false),
      cover: image().or(z.string()).optional(),
    }),
});

export const collections = { blog };

import { defineCollection, z } from 'astro:content';

const artiklar = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    featuredImage: z.string().optional(),
    slug: z.string().optional(),
  }),
});

const sidor = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string().optional(),
  }),
});

export const collections = { artiklar, sidor };

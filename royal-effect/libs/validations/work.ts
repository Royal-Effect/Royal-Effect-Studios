import { z } from "zod/v4";

export const selectedWorkColorClasses = ["bg-surface", "bg-surface-2"] as const;

const categorySchema = z.object({
  _id: z.string().min(1),
  title: z.string().min(1),
});

const sanityColorSchema = z.object({
  hex: z.string().min(1),
  hsl: z.object({ h: z.number(), s: z.number(), l: z.number() }).optional(),
  rgb: z.object({ r: z.number(), g: z.number(), b: z.number() }).optional(),
});

const workColorSwatchSchema = z.object({
  color: sanityColorSchema,
  foreground: z.string().optional(),
});

const workAssetSchema = z.object({
  image: z.any(), // Sanity image reference
  label: z.string().optional(),
  alt: z.string().min(1),
  caption: z.string().optional(),
});

const selectedWorkSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string().min(1),
  title: z.string().min(1),
  client: z.string().min(1),
  category: categorySchema,
  color: z.enum(selectedWorkColorClasses),
  summary: z.string().min(1),
  year: z.string().regex(/^\d{4}$/),
  services: z.array(z.string().min(1)).optional(),
  challenge: z.string().min(1),
  outcome: z.string().min(1),
  brandIdentity: z.string().optional(),
  brandDesign: z.string().optional(),
  searchTerms: z.array(z.string().min(1)).optional(),
  brandColors: z.array(workColorSwatchSchema).min(1),
  gallery: z.array(workAssetSchema).min(1),
});

export const selectedWorkListSchema = z.array(selectedWorkSchema);

export {
  categorySchema,
  selectedWorkSchema,
  workColorSwatchSchema,
  workAssetSchema,
};

export type SelectedWork = z.infer<typeof selectedWorkSchema>;
export type Category = z.infer<typeof categorySchema>;
export type WorkColorSwatch = z.infer<typeof workColorSwatchSchema>;
export type WorkAsset = z.infer<typeof workAssetSchema>;

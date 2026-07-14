import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { workSlugsQuery, blogSlugsQuery } from "@/sanity/lib/queries";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://royal-effect-studios.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ─── Static Routes ────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/royaleffect`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // ─── Dynamic Work Routes ──────────────────────────────────────────────────
  let workRoutes: MetadataRoute.Sitemap = [];
  try {
    const workSlugs = await client.fetch<string[]>(workSlugsQuery);
    workRoutes = workSlugs.map((slug) => ({
      url: `${BASE_URL}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch (err) {
    console.error("[sitemap] Failed to fetch work slugs:", err);
  }

  // ─── Dynamic Blog Routes ──────────────────────────────────────────────────
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogSlugs = await client.fetch<string[]>(blogSlugsQuery);
    blogRoutes = blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("[sitemap] Failed to fetch blog slugs:", err);
  }

  return [...staticRoutes, ...workRoutes, ...blogRoutes];
}

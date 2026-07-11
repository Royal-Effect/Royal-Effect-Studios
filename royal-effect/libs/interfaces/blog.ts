import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "next-sanity";
import type { WorkAssetInterface } from "./selectedWork";

export interface BlogCategoryInterface {
  _id: string;
  title: string;
}

export interface BlogInterface {
  _id: string;
  title: string;
  slug: string;
  category: BlogCategoryInterface;
  content?: PortableTextBlock[];
  publishedAt: string;
  excerpt?: string;
  coverImage: WorkAssetInterface;
}

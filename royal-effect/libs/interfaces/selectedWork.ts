import type { SanityImageSource } from "@sanity/image-url";

interface WorkColorSwatchInterface {
  color: {
    hex: string;
    hsl?: { h: number; s: number; l: number };
    rgb?: { r: number; g: number; b: number };
  };
  foreground?: string;
  /** Auto-generated on the frontend from hex */
  name?: string;
}

interface WorkAssetInterface {
  image: SanityImageSource;
  label?: string;
  alt: string;
  caption?: string;
}

interface CategoryInterface {
  _id: string;
  title: string;
}

interface SelectedWorkInterface {
  id: number;
  slug: string;
  title: string;
  client: string;
  category: CategoryInterface;
  color: string;
  summary: string;
  year: string;
  services?: string[];
  challenge: string;
  outcome: string;
  brandIdentity?: string;
  brandDesign?: string;
  searchTerms?: string[];
  brandColors: WorkColorSwatchInterface[];
  displayImage: WorkAssetInterface;
  hoverImage?: WorkAssetInterface;
  gallery: WorkAssetInterface[];
}

export type {
  CategoryInterface,
  SelectedWorkInterface,
  WorkAssetInterface,
  WorkColorSwatchInterface,
};
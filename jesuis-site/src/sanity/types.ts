import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  url: string;
  width: number;
  height: number;
  lqip?: string;
  hotspot?: { x: number; y: number };
};

export type ProductCategory = "book" | "guide" | "game" | "parable" | "course";
export type ProductStatus = "available" | "soon";

export type SiteSettings = {
  mainProjectStatus?: "soon" | "open";
  mainProjectUrl?: string;
  telegramUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  email?: string;
  introVideoUrl?: string;
  heroPhoto?: SanityImage;
  aboutPhoto?: SanityImage;
};

export type PostCard = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt: string;
  cover?: SanityImage;
};

export type Post = PostCard & {
  body: PortableTextBlock[];
};

export type ProductCard = {
  _id: string;
  slug: string;
  category: ProductCategory;
  title: string;
  subtitle?: string;
  shortDescription?: string;
  status: ProductStatus;
  price?: number;
  currency?: string;
  buyUrl?: string;
  cover?: SanityImage;
  coverVideoUrl?: string;
};

export type Product = ProductCard & {
  gallery: SanityImage[];
  body: PortableTextBlock[];
};

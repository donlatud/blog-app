export type BlogListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  publishedAt: string;
  viewCount?: number;
  /** Optional display label — not in DB yet; for UI mockup */
  category?: string;
};

export type BlogImage = {
  id: string;
  imageUrl: string;
  position: number;
};

export type BlogDetail = BlogListItem & {
  content: string;
  viewCount: number;
  images: BlogImage[];
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

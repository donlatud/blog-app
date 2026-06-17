export type BlogListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  publishedAt: string;
  /** Optional display label — not in DB yet; for UI mockup */
  category?: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

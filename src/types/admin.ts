import type { PaginationMeta } from "@/types/blog";

export type BlogStatus = "draft" | "published";

export type AdminBlogListItem = {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  publishedAt: string | null;
  viewCount: number;
  status: BlogStatus;
  createdAt: string;
};

export type AdminBlogStatusFilter = "all" | BlogStatus;

export type AdminBlogListResponse = {
  data: AdminBlogListItem[];
  meta: PaginationMeta;
};

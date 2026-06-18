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

export type AdminBlogImage = {
  id?: string;
  imageUrl: string;
  position: number;
};

export type AdminBlogDetail = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  status: BlogStatus;
  viewCount: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  images: AdminBlogImage[];
};

export type AdminBlogPayload = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  status: BlogStatus;
  images: AdminBlogImage[];
};

export type AdminBlogResponse = {
  data: AdminBlogDetail;
};

export type CommentModerationStatus = "pending" | "approved" | "rejected";

export type AdminCommentStatusFilter = CommentModerationStatus | "all";

export type AdminCommentBlog = {
  id: string;
  title: string;
  slug: string;
};

export type AdminCommentListItem = {
  id: string;
  authorName: string;
  body: string;
  status: CommentModerationStatus;
  createdAt: string;
  reviewedAt: string | null;
  blog: AdminCommentBlog | null;
};

export type AdminCommentListResponse = {
  data: AdminCommentListItem[];
  meta: PaginationMeta;
};

export type AdminCommentResponse = {
  data: AdminCommentListItem;
};

export type AdminCommentPendingCountResponse = {
  data: { count: number };
};

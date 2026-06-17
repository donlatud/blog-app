import { BLOG_PAGE_SIZE } from "@/constants/config";
import type { BlogListItem, PaginationMeta } from "@/types/blog";

import { apiClient, toApiError } from "./client";

type BlogListResponse = {
  data: BlogListItem[];
  meta: PaginationMeta;
};

type FetchBlogListParams = {
  page?: number;
  search?: string;
  limit?: number;
};

export async function fetchBlogList({
  page = 1,
  search = "",
  limit = BLOG_PAGE_SIZE,
}: FetchBlogListParams = {}): Promise<BlogListResponse> {
  const trimmedSearch = search.trim();

  try {
    const { data } = await apiClient.get<BlogListResponse>("/api/blogs", {
      params: {
        page,
        limit,
        ...(trimmedSearch ? { search: trimmedSearch } : {}),
      },
    });

    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

import { API_BASE_URL, BLOG_PAGE_SIZE } from "@/constants/config";
import type { BlogDetail, BlogListItem, PaginationMeta } from "@/types/blog";

import { apiClient, toApiError } from "./client";
import { ApiError } from "@/lib/api/apiError";

type BlogListResponse = {
  data: BlogListItem[];
  meta: PaginationMeta;
};

type BlogDetailResponse = {
  data: BlogDetail;
};

type BlogViewResponse = {
  data: {
    viewCount: number;
  };
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

export async function fetchBlogBySlug(slug: string): Promise<BlogDetail> {
  try {
    const { data } = await apiClient.get<BlogDetailResponse>(`/api/blogs/${slug}`);
    return data.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function fetchBlogBySlugOnServer(slug: string): Promise<BlogDetail> {
  const response = await fetch(`${API_BASE_URL}/api/blogs/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const code = body?.error?.code ?? "REQUEST_FAILED";
    const message = body?.error?.message ?? "Request failed";
    throw new ApiError(response.status, code, message);
  }

  return (body as BlogDetailResponse).data;
}

export async function recordBlogViewOnServer(slug: string): Promise<number> {
  const response = await fetch(
    `${API_BASE_URL}/api/blogs/${encodeURIComponent(slug)}/view`,
    {
      method: "POST",
      cache: "no-store",
    }
  );

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const code = body?.error?.code ?? "REQUEST_FAILED";
    const message = body?.error?.message ?? "Request failed";
    throw new ApiError(response.status, code, message);
  }

  return (body as BlogViewResponse).data.viewCount;
}

export async function recordBlogView(slug: string): Promise<number> {
  try {
    const { data } = await apiClient.post<BlogViewResponse>(
      `/api/blogs/${slug}/view`
    );
    return data.data.viewCount;
  } catch (error) {
    throw toApiError(error);
  }
}

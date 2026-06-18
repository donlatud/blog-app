import type {
  AdminBlogDetail,
  AdminBlogListResponse,
  AdminBlogPayload,
  AdminBlogResponse,
  AdminBlogStatusFilter,
  BlogStatus,
} from "@/types/admin";

import { apiClient, toApiError } from "../client";

type FetchAdminBlogListParams = {
  page?: number;
  limit?: number;
  status?: AdminBlogStatusFilter;
};

function buildAdminBlogsPath({
  page = 1,
  limit = 10,
  status = "all",
}: FetchAdminBlogListParams) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    status,
  });

  return `/api/admin/blogs?${params.toString()}`;
}

export async function fetchAdminBlogList(
  params: FetchAdminBlogListParams = {}
): Promise<AdminBlogListResponse> {
  try {
    const { data } = await apiClient.get<AdminBlogListResponse>(
      buildAdminBlogsPath(params)
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function fetchAdminBlogById(id: string): Promise<AdminBlogDetail> {
  try {
    const { data } = await apiClient.get<AdminBlogResponse>(
      `/api/admin/blogs/${id}`
    );
    return data.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function createAdminBlog(
  payload: AdminBlogPayload
): Promise<AdminBlogDetail> {
  try {
    const { data } = await apiClient.post<AdminBlogResponse>(
      "/api/admin/blogs",
      payload
    );
    return data.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function updateAdminBlog(
  id: string,
  payload: AdminBlogPayload
): Promise<AdminBlogDetail> {
  try {
    const { data } = await apiClient.put<AdminBlogResponse>(
      `/api/admin/blogs/${id}`,
      payload
    );
    return data.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function patchAdminBlogStatus(
  id: string,
  status: BlogStatus
): Promise<AdminBlogDetail> {
  try {
    const { data } = await apiClient.patch<AdminBlogResponse>(
      `/api/admin/blogs/${id}/status`,
      { status }
    );
    return data.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function deleteAdminBlog(id: string): Promise<void> {
  try {
    await apiClient.delete(`/api/admin/blogs/${id}`);
  } catch (error) {
    throw toApiError(error);
  }
}

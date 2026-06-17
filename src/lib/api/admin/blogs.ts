import type {
  AdminBlogDetail,
  AdminBlogListResponse,
  AdminBlogPayload,
  AdminBlogResponse,
  AdminBlogStatusFilter,
  BlogStatus,
} from "@/types/admin";

import { apiClient, toApiError } from "../client";
import { ApiError } from "@/lib/api/apiError";
import { API_BASE_URL } from "@/constants/config";

type FetchAdminBlogListParams = {
  page?: number;
  limit?: number;
  status?: AdminBlogStatusFilter;
};

async function getServerCookieHeader() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

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

async function serverFetch<T>(path: string): Promise<T> {
  const cookieHeader = await getServerCookieHeader();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
    cache: "no-store",
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const code = body?.error?.code ?? "REQUEST_FAILED";
    const message = body?.error?.message ?? "Request failed";
    throw new ApiError(response.status, code, message);
  }

  return body as T;
}

export async function fetchAdminBlogList(
  params: FetchAdminBlogListParams = {}
): Promise<AdminBlogListResponse> {
  return serverFetch<AdminBlogListResponse>(buildAdminBlogsPath(params));
}

export async function fetchAdminBlogById(id: string): Promise<AdminBlogDetail> {
  const body = await serverFetch<AdminBlogResponse>(`/api/admin/blogs/${id}`);
  return body.data;
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

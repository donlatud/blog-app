import { API_BASE_URL } from "@/constants/config";
import type { AdminBlogListResponse, AdminBlogStatusFilter } from "@/types/admin";

import { ApiError } from "@/lib/api/apiError";

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
  const path = buildAdminBlogsPath(params);

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
    cache: "no-store",
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const code = body?.error?.code ?? "REQUEST_FAILED";
    const message = body?.error?.message ?? "Failed to fetch admin blogs";
    throw new ApiError(response.status, code, message);
  }

  return body as AdminBlogListResponse;
}

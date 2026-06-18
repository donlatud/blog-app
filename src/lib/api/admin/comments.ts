import type {
  AdminCommentListResponse,
  AdminCommentPendingCountResponse,
  AdminCommentResponse,
  AdminCommentStatusFilter,
  CommentModerationStatus,
} from "@/types/admin";

import { apiClient, toApiError } from "../client";
import { ApiError } from "@/lib/api/apiError";
import { API_BASE_URL } from "@/constants/config";

type FetchAdminCommentListParams = {
  page?: number;
  limit?: number;
  status?: AdminCommentStatusFilter;
};

async function getServerCookieHeader() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

function buildAdminCommentsPath({
  page = 1,
  limit = 10,
  status = "pending",
}: FetchAdminCommentListParams) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    status,
  });

  return `/api/admin/comments?${params.toString()}`;
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

export async function fetchAdminCommentList(
  params: FetchAdminCommentListParams = {}
): Promise<AdminCommentListResponse> {
  return serverFetch<AdminCommentListResponse>(buildAdminCommentsPath(params));
}

export async function fetchAdminCommentPendingCount(): Promise<number> {
  try {
    const { data } = await apiClient.get<AdminCommentPendingCountResponse>(
      "/api/admin/comments/pending-count"
    );
    return data.data.count;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function patchAdminCommentStatus(
  id: string,
  status: CommentModerationStatus
) {
  try {
    const { data } = await apiClient.patch<AdminCommentResponse>(
      `/api/admin/comments/${id}/status`,
      { status }
    );
    return data.data;
  } catch (error) {
    throw toApiError(error);
  }
}

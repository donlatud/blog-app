import type {
  AdminCommentListResponse,
  AdminCommentPendingCountResponse,
  AdminCommentResponse,
  AdminCommentStatusFilter,
  CommentModerationStatus,
} from "@/types/admin";

import { apiClient, toApiError } from "../client";

type FetchAdminCommentListParams = {
  page?: number;
  limit?: number;
  status?: AdminCommentStatusFilter;
};

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

export async function fetchAdminCommentList(
  params: FetchAdminCommentListParams = {}
): Promise<AdminCommentListResponse> {
  try {
    const { data } = await apiClient.get<AdminCommentListResponse>(
      buildAdminCommentsPath(params)
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
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

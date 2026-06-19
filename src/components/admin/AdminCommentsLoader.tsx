"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { AdminCommentsView } from "@/components/admin/AdminCommentsView";
import { ADMIN_COMMENT_MODERATION_EVENT, BLOG_PAGE_SIZE } from "@/constants/config";
import { ApiError } from "@/lib/api/apiError";
import { fetchAdminCommentList } from "@/lib/api/admin/comments";
import type {
  AdminCommentListItem,
  AdminCommentStatusFilter,
} from "@/types/admin";
import type { PaginationMeta } from "@/types/blog";

function parseStatus(value: string | null): AdminCommentStatusFilter {
  if (
    value === "pending" ||
    value === "approved" ||
    value === "rejected" ||
    value === "all"
  ) {
    return value;
  }

  return "pending";
}

export function AdminCommentsLoader() {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const status = parseStatus(searchParams.get("status"));

  const [comments, setComments] = useState<AdminCommentListItem[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    page,
    limit: BLOG_PAGE_SIZE,
    total: 0,
    totalPages: 1,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    fetchAdminCommentList({
      page,
      limit: BLOG_PAGE_SIZE,
      status,
    })
      .then((result) => {
        if (!cancelled) {
          setComments(result.data);
          setMeta(result.meta);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setComments([]);
          setError(
            err instanceof ApiError
              ? err.message
              : "Unable to load comments. Please try again."
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [page, status]);

  const handleCommentUpdated = useCallback(
    (updated: AdminCommentListItem) => {
      const matchesFilter = status === "all" || status === updated.status;

      setComments((current) => {
        if (!matchesFilter) {
          return current.filter((comment) => comment.id !== updated.id);
        }

        return current.map((comment) =>
          comment.id === updated.id ? updated : comment
        );
      });

      setMeta((current) => {
        if (!matchesFilter && current.total > 0) {
          return {
            ...current,
            total: current.total - 1,
            totalPages: Math.max(1, Math.ceil((current.total - 1) / current.limit)),
          };
        }

        return current;
      });

      window.dispatchEvent(new Event(ADMIN_COMMENT_MODERATION_EVENT));
    },
    [status]
  );

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <p className="text-sm text-muted-foreground">Loading comments...</p>
      </div>
    );
  }

  return (
    <AdminCommentsView
      comments={comments}
      meta={meta}
      status={status}
      page={page}
      error={error}
      onCommentUpdated={handleCommentUpdated}
    />
  );
}

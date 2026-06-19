"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { AdminDashboardView } from "@/components/admin/AdminDashboardView";
import { BLOG_PAGE_SIZE } from "@/constants/config";
import { ApiError } from "@/lib/api/apiError";
import { fetchAdminBlogList } from "@/lib/api/admin/blogs";
import type { AdminBlogListItem, AdminBlogStatusFilter } from "@/types/admin";
import type { PaginationMeta } from "@/types/blog";

function parseStatus(value: string | null): AdminBlogStatusFilter {
  if (value === "published" || value === "draft") {
    return value;
  }

  return "all";
}

export function AdminDashboardLoader() {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const status = parseStatus(searchParams.get("status"));

  const [blogs, setBlogs] = useState<AdminBlogListItem[]>([]);
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

    fetchAdminBlogList({
      page,
      limit: BLOG_PAGE_SIZE,
      status,
    })
      .then((result) => {
        if (!cancelled) {
          setBlogs(result.data);
          setMeta(result.meta);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setBlogs([]);
          setError(
            err instanceof ApiError
              ? err.message
              : "Unable to load articles. Please try again."
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

  const handleBlogDeleted = useCallback(
    (blogId: string) => {
      setBlogs((current) => current.filter((blog) => blog.id !== blogId));
      setMeta((current) => {
        if (current.total <= 0) {
          return current;
        }

        const total = current.total - 1;

        return {
          ...current,
          total,
          totalPages: Math.max(1, Math.ceil(total / current.limit)),
        };
      });
    },
    []
  );

  const handleBlogUpdated = useCallback(
    (updated: AdminBlogListItem) => {
      const matchesFilter = status === "all" || status === updated.status;

      setBlogs((current) => {
        if (!matchesFilter) {
          return current.filter((blog) => blog.id !== updated.id);
        }

        return current.map((blog) =>
          blog.id === updated.id ? updated : blog
        );
      });

      setMeta((current) => {
        if (!matchesFilter && current.total > 0) {
          const total = current.total - 1;

          return {
            ...current,
            total,
            totalPages: Math.max(1, Math.ceil(total / current.limit)),
          };
        }

        return current;
      });
    },
    [status]
  );

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <AdminDashboardView
      blogs={blogs}
      meta={meta}
      status={status}
      page={page}
      error={error}
      onBlogDeleted={handleBlogDeleted}
      onBlogUpdated={handleBlogUpdated}
    />
  );
}

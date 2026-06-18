"use client";

import { useEffect, useState } from "react";
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
    />
  );
}

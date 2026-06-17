import { redirect } from "next/navigation";

import { AdminDashboardView } from "@/components/admin/AdminDashboardView";
import { BLOG_PAGE_SIZE } from "@/constants/config";
import { ApiError } from "@/lib/api/apiError";
import { fetchAdminBlogList } from "@/lib/api/admin/blogs";
import type { AdminBlogStatusFilter } from "@/types/admin";
import type { PaginationMeta } from "@/types/blog";

type AdminDashboardPageProps = {
  searchParams: Promise<{
    page?: string;
    status?: string;
  }>;
};

function parseStatus(value?: string): AdminBlogStatusFilter {
  if (value === "published" || value === "draft") {
    return value;
  }

  return "all";
}

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const status = parseStatus(params.status);

  let meta: PaginationMeta = {
    page,
    limit: BLOG_PAGE_SIZE,
    total: 0,
    totalPages: 1,
  };

  try {
    const result = await fetchAdminBlogList({
      page,
      limit: BLOG_PAGE_SIZE,
      status,
    });

    return (
      <AdminDashboardView
        blogs={result.data}
        meta={result.meta}
        status={status}
        page={page}
      />
    );
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        redirect("/admin/login");
      }

      if (error.status === 403) {
        redirect("/");
      }
    }

    return (
      <AdminDashboardView
        blogs={[]}
        meta={meta}
        status={status}
        page={page}
      />
    );
  }
}

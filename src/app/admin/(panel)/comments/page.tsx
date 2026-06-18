import { redirect } from "next/navigation";

import { AdminCommentsView } from "@/components/admin/AdminCommentsView";
import { BLOG_PAGE_SIZE } from "@/constants/config";
import { ApiError } from "@/lib/api/apiError";
import { fetchAdminCommentList } from "@/lib/api/admin/comments";
import type { AdminCommentStatusFilter } from "@/types/admin";
import type { PaginationMeta } from "@/types/blog";

type AdminCommentsPageProps = {
  searchParams: Promise<{
    page?: string;
    status?: string;
  }>;
};

function parseStatus(value?: string): AdminCommentStatusFilter {
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

export default async function AdminCommentsPage({
  searchParams,
}: AdminCommentsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const status = parseStatus(params.status);

  const emptyMeta: PaginationMeta = {
    page,
    limit: BLOG_PAGE_SIZE,
    total: 0,
    totalPages: 1,
  };

  try {
    const result = await fetchAdminCommentList({
      page,
      limit: BLOG_PAGE_SIZE,
      status,
    });

    return (
      <AdminCommentsView
        comments={result.data}
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
      <AdminCommentsView
        comments={[]}
        meta={emptyMeta}
        status={status}
        page={page}
      />
    );
  }
}

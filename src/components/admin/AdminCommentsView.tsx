"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { AdminAlert } from "@/components/admin/AdminAlert";
import { AdminCommentCard } from "@/components/admin/AdminCommentCard";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { cn } from "@/lib/utils";
import type {
  AdminCommentListItem,
  AdminCommentStatusFilter,
} from "@/types/admin";
import type { PaginationMeta } from "@/types/blog";

const tabs: { label: string; value: AdminCommentStatusFilter }[] = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "All", value: "all" },
];

type AdminCommentsViewProps = {
  comments: AdminCommentListItem[];
  meta: PaginationMeta;
  status: AdminCommentStatusFilter;
  page: number;
  error?: string | null;
  onCommentUpdated: (comment: AdminCommentListItem) => void;
};

function buildCommentsHref(status: AdminCommentStatusFilter, page = 1) {
  const params = new URLSearchParams({
    status,
    page: String(page),
  });

  return `/admin/comments?${params.toString()}`;
}

export function AdminCommentsView({
  comments,
  meta,
  status,
  page,
  error = null,
  onCommentUpdated,
}: AdminCommentsViewProps) {
  const router = useRouter();
  const start = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const end = Math.min(meta.page * meta.limit, meta.total);

  return (
    <>
      <header className="border-b border-border bg-background px-4 py-6 sm:px-8">
        <h1 className="text-headline text-2xl">Manage comments</h1>
      </header>

        <section className="flex-1 px-4 py-6 sm:px-8">
        <nav
          aria-label="Comment filters"
          className="mb-6 flex flex-wrap gap-6 border-b border-border"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.value}
              href={buildCommentsHref(tab.value)}
              className={cn(
                "-mb-px border-b-2 px-1 pb-3 text-sm font-medium transition-colors",
                status === tab.value
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              aria-current={status === tab.value ? "page" : undefined}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        {error ? <AdminAlert message={error} className="mb-6" /> : null}

        {comments.length === 0 && !error ? (
          <p className="text-body text-sm text-muted-foreground">
            No comments in this category.
          </p>
        ) : (
          <ul className="flex list-none flex-col gap-4">
            {comments.map((comment) => (
              <li key={comment.id}>
                <AdminCommentCard
                  comment={comment}
                  onCommentUpdated={onCommentUpdated}
                />
              </li>
            ))}
          </ul>
        )}

        {meta.total > 0 ? (
          <AdminPagination
            start={start}
            end={end}
            total={meta.total}
            page={page}
            totalPages={meta.totalPages}
            itemLabel="comments"
            ariaLabel="Comments pagination"
            onPageChange={(nextPage) =>
              router.push(buildCommentsHref(status, nextPage))
            }
            className="mt-8"
          />
        ) : null}
      </section>
    </>
  );
}

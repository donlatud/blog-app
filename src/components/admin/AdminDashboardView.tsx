"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { AdminAlert } from "@/components/admin/AdminAlert";
import { AdminBlogTable } from "@/components/admin/AdminBlogTable";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AdminBlogListItem, AdminBlogStatusFilter } from "@/types/admin";
import type { PaginationMeta } from "@/types/blog";
const tabs: { label: string; value: AdminBlogStatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Drafts", value: "draft" },
];

type AdminDashboardViewProps = {
  blogs: AdminBlogListItem[];
  meta: PaginationMeta;
  status: AdminBlogStatusFilter;
  page: number;
  error?: string | null;
  onBlogDeleted: (blogId: string) => void;
  onBlogUpdated: (blog: AdminBlogListItem) => void;
};

function buildAdminHref(status: AdminBlogStatusFilter, page = 1) {
  const params = new URLSearchParams({
    status,
    page: String(page),
  });

  return `/admin?${params.toString()}`;
}

export function AdminDashboardView({
  blogs,
  meta,
  status,
  page,
  error = null,
  onBlogDeleted,
  onBlogUpdated,
}: AdminDashboardViewProps) {
  const router = useRouter();
  const start = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const end = Math.min(meta.page * meta.limit, meta.total);

  return (
    <>
      <header className="flex flex-col gap-4 border-b border-border bg-background px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <h1 className="text-headline text-2xl">Dashboard</h1>
        <Link
          href="/admin/blogs/new"
          className={cn(buttonVariants({ variant: "inverted", size: "lg" }), "h-10 gap-2 px-4")}
        >
          <Plus aria-hidden="true" className="size-4" />
          Create article
        </Link>
      </header>

      <section className="flex-1 px-4 py-6 sm:px-8">
        <nav aria-label="Article filters" className="mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.value}
              href={buildAdminHref(tab.value)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                status === tab.value
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={status === tab.value ? "page" : undefined}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        {error ? <AdminAlert message={error} className="mb-6" /> : null}

        <section className="surface-card overflow-hidden">
          <AdminBlogTable
            blogs={blogs}
            onBlogDeleted={onBlogDeleted}
            onBlogUpdated={onBlogUpdated}
          />

          {meta.total > 0 ? (
            <AdminPagination
              start={start}
              end={end}
              total={meta.total}
              page={page}
              totalPages={meta.totalPages}
              itemLabel="items"
              ariaLabel="Dashboard pagination"
              onPageChange={(nextPage) =>
                router.push(buildAdminHref(status, nextPage))
              }
              className="border-t border-border px-6 py-4"
            />
          ) : null}        </section>
      </section>
    </>
  );
}

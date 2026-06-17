"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { AdminBlogTable } from "@/components/admin/AdminBlogTable";
import { Button, buttonVariants } from "@/components/ui/button";
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
}: AdminDashboardViewProps) {
  const router = useRouter();
  const start = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const end = Math.min(meta.page * meta.limit, meta.total);

  return (
    <>
      <header className="flex flex-col gap-4 border-b border-border bg-background px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-headline text-2xl">Dashboard</h1>
        <Link
          href="/admin/blogs/new"
          className={cn(buttonVariants({ variant: "inverted", size: "lg" }), "h-10 gap-2 px-4")}
        >
          <Plus aria-hidden="true" className="size-4" />
          Create article
        </Link>
      </header>

      <section className="flex-1 px-8 py-6">
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

        <section className="surface-card overflow-hidden">
          <AdminBlogTable blogs={blogs} />

          <footer className="flex flex-col gap-4 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {start}-{end} of {meta.total} items
            </p>

            <nav aria-label="Dashboard pagination" className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => router.push(buildAdminHref(status, page - 1))}
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={page >= meta.totalPages}
                onClick={() => router.push(buildAdminHref(status, page + 1))}
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </Button>
            </nav>
          </footer>
        </section>
      </section>
    </>
  );
}

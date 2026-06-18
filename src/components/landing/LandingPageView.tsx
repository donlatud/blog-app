"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogListAlert } from "@/components/blog/BlogListAlert";
import { Pagination } from "@/components/blog/Pagination";
import { LandingHero } from "@/components/landing/LandingHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { ApiErrorState } from "@/lib/api/apiError";
import type { BlogListItem, PaginationMeta } from "@/types/blog";

type LandingPageViewProps = {
  blogs: BlogListItem[];
  meta: PaginationMeta;
  search: string;
  page: number;
  error?: ApiErrorState | null;
};

function buildQueryPath(pathname: string, search: string, page: number) {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function LandingPageView({
  blogs,
  meta,
  search,
  page,
  error = null,
}: LandingPageViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const navigate = useCallback(
    (nextSearch: string, nextPage: number) => {
      startTransition(() => {
        router.push(buildQueryPath(pathname, nextSearch, nextPage));
      });
    },
    [pathname, router]
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleSearchSubmit = useCallback(
    (value: string) => {
      navigate(value, 1);
    },
    [navigate]
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      navigate(search, nextPage);
    },
    [navigate, search]
  );

  const showEmptyState = !error && blogs.length === 0;
  const currentPage = Math.min(page, meta.totalPages);

  return (
    <>
      <SiteHeader
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <main className="w-full flex-1 pb-8">
        <LandingHero />

        {error ? (
          <BlogListAlert
            variant="error"
            message={error.message}
            status={error.status}
          />
        ) : null}

        {showEmptyState ? (
          <BlogListAlert
            variant="empty"
            message={
              search
                ? `ไม่พบบทความที่ตรงกับ "${search}"`
                : "ยังไม่มีบทความที่เผยแพร่"
            }
          />
        ) : null}

        {!error && blogs.length > 0 ? (
          <div
            className={isPending ? "opacity-60 transition-opacity" : undefined}
            aria-busy={isPending}
          >
            <BlogGrid blogs={blogs} />
            <Pagination
              page={currentPage}
              totalPages={meta.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        ) : null}
      </main>

      <SiteFooter />
    </>
  );
}

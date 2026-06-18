import { LandingPageView } from "@/components/landing/LandingPageView";
import { BLOG_PAGE_SIZE } from "@/constants/config";
import { ApiError, type ApiErrorState } from "@/lib/api/apiError";
import { fetchBlogList } from "@/lib/api/blogs";
import type { BlogListItem, PaginationMeta } from "@/types/blog";

type HomePageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const search = params.search?.trim() ?? "";

  let blogs: BlogListItem[] = [];
  let meta: PaginationMeta = {
    page,
    limit: BLOG_PAGE_SIZE,
    total: 0,
    totalPages: 1,
  };
  let error: ApiErrorState | null = null;

  try {
    const result = await fetchBlogList({ page, search, limit: BLOG_PAGE_SIZE });
    blogs = result.data;
    meta = result.meta;
  } catch (err) {
    if (err instanceof ApiError) {
      error = {
        message: err.message,
        status: err.status,
        code: err.code,
      };
    } else {
      error = {
        message: "โหลดรายการบทความไม่สำเร็จ",
        status: 500,
        code: "UNKNOWN_ERROR",
      };
    }
  }

  return (
    <LandingPageView
      blogs={blogs}
      meta={meta}
      search={search}
      page={page}
      error={error}
    />
  );
}

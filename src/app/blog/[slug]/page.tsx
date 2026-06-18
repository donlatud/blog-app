import { notFound } from "next/navigation";

import { BlogDetailPageView } from "@/components/blog/BlogDetailPageView";
import { ApiError } from "@/lib/api/apiError";
import {
  fetchBlogBySlugOnServer,
  recordBlogViewOnServer,
} from "@/lib/api/blogs";

export const dynamic = "force-dynamic";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  try {
    const blog = await fetchBlogBySlugOnServer(slug);

    let viewCount = blog.viewCount;
    try {
      viewCount = await recordBlogViewOnServer(slug);
    } catch {
      // Keep the count from the initial fetch if increment fails.
    }

    return <BlogDetailPageView blog={{ ...blog, viewCount }} />;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

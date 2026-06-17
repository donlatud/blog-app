import { notFound } from "next/navigation";

import { BlogDetailPageView } from "@/components/blog/BlogDetailPageView";
import { ApiError } from "@/lib/api/apiError";
import { fetchBlogBySlug } from "@/lib/api/blogs";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  try {
    const blog = await fetchBlogBySlug(slug);
    return <BlogDetailPageView blog={blog} />;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

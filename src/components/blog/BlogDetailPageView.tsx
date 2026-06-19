"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { BlogArticleContent } from "@/components/blog/BlogArticleContent";
import { BlogBreadcrumb } from "@/components/blog/BlogBreadcrumb";
import { BlogCommentSection } from "@/components/blog/BlogCommentSection";
import { BlogCoverImage } from "@/components/blog/BlogCoverImage";
import { BlogDetailHeader } from "@/components/blog/BlogDetailHeader";
import { BlogDetailMeta } from "@/components/blog/BlogDetailMeta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { BlogDetail } from "@/types/blog";

type BlogDetailPageViewProps = {
  blog: BlogDetail;
};

export function BlogDetailPageView({ blog }: BlogDetailPageViewProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = useCallback(
    (value: string) => {
      const params = new URLSearchParams();
      if (value.trim()) {
        params.set("search", value.trim());
      }
      const query = params.toString();
      router.push(query ? `/?${query}` : "/");
    },
    [router]
  );

  return (
    <>
      <SiteHeader
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        activeNav={null}
      />

      <main className="w-full flex-1 pb-16">
        <BlogBreadcrumb title={blog.title} />
        <BlogDetailHeader title={blog.title} />
        <BlogDetailMeta publishedAt={blog.publishedAt} viewCount={blog.viewCount} />
        <BlogCoverImage
          title={blog.title}
          coverImageUrl={blog.coverImageUrl}
          images={blog.images}
        />
        <BlogArticleContent content={blog.content} />
        <BlogCommentSection slug={blog.slug} comments={blog.comments ?? []} />
      </main>

      <SiteFooter />
    </>
  );
}

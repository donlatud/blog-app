import Image from "next/image";
import Link from "next/link";

import { formatBlogDate } from "@/lib/format-date";
import { cn } from "@/lib/utils";
import type { BlogListItem } from "@/types/blog";

type BlogCardProps = {
  blog: BlogListItem;
  className?: string;
};

export function BlogCard({ blog, className }: BlogCardProps) {
  return (
    <article className={cn("group flex flex-col", className)}>
      <Link href={`/blog/${blog.slug}`} className="flex flex-col gap-4">
        <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-muted">
          {blog.coverImageUrl ? (
            <Image
              src={blog.coverImageUrl}
              alt={`ภาพปกบทความ ${blog.title}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full min-h-40 items-center justify-center text-sm text-muted-foreground">
              ไม่มีภาพปก
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-meta flex flex-wrap items-center gap-2 uppercase tracking-wide">
            {blog.category ? (
              <span className="font-medium text-foreground/80">
                {blog.category}
              </span>
            ) : null}
            <time dateTime={blog.publishedAt}>
              {formatBlogDate(blog.publishedAt)}
            </time>
          </p>

          <h2 className="font-heading line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary-700">
            {blog.title}
          </h2>

          <p className="text-body line-clamp-3 text-sm text-muted-foreground">
            {blog.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}

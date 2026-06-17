import { BlogCard } from "@/components/blog/BlogCard";
import { PageContainer } from "@/components/layout/PageContainer";
import type { BlogListItem } from "@/types/blog";

type BlogGridProps = {
  blogs: BlogListItem[];
  emptyMessage?: string;
};

export function BlogGrid({
  blogs,
  emptyMessage = "ไม่พบบทความที่ตรงกับการค้นหา",
}: BlogGridProps) {
  return (
    <section aria-label="รายการบทความ">
      <PageContainer className="py-8">
        {blogs.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">{emptyMessage}</p>
        ) : (
          <ul className="grid list-none grid-cols-1 gap-8 sm:grid-cols-2">
            {blogs.map((blog) => (
              <li key={blog.id}>
                <BlogCard blog={blog} />
              </li>
            ))}
          </ul>
        )}
      </PageContainer>
    </section>
  );
}

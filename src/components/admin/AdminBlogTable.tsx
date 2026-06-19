import Image from "next/image";

import { AdminBlogRowActions } from "@/components/admin/AdminBlogRowActions";
import { formatAdminDate } from "@/lib/format-date";
import type { AdminBlogListItem } from "@/types/admin";

type AdminBlogTableProps = {
  blogs: AdminBlogListItem[];
  onBlogDeleted: (blogId: string) => void;
  onBlogUpdated: (blog: AdminBlogListItem) => void;
};

function StatusBadge({ status }: { status: AdminBlogListItem["status"] }) {
  if (status === "published") {
    return (
      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
        Published
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
      Draft
    </span>
  );
}

export function AdminBlogTable({
  blogs,
  onBlogDeleted,
  onBlogUpdated,
}: AdminBlogTableProps) {
  if (blogs.length === 0) {
    return (
      <p className="px-6 py-12 text-center text-sm text-muted-foreground">
        No articles found for this filter.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th scope="col" className="px-6 py-4 font-medium">
              Cover
            </th>
            <th scope="col" className="px-4 py-4 font-medium">
              Title
            </th>
            <th scope="col" className="px-4 py-4 font-medium">
              Slug
            </th>
            <th scope="col" className="px-4 py-4 font-medium">
              Status
            </th>
            <th scope="col" className="px-4 py-4 font-medium">
              Date
            </th>
            <th scope="col" className="px-4 py-4 font-medium">
              Views
            </th>
            <th scope="col" className="px-6 py-4 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} className="border-b border-border last:border-b-0">
              <td className="px-6 py-4">
                <figure className="relative size-14 overflow-hidden rounded-lg bg-muted">
                  {blog.coverImageUrl ? (
                    <Image
                      src={blog.coverImageUrl}
                      alt={`Cover image for ${blog.title}`}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : null}
                </figure>
              </td>
              <td className="max-w-xs px-4 py-4 font-medium text-foreground">
                {blog.title}
              </td>
              <td className="px-4 py-4 text-muted-foreground">/blog/{blog.slug}</td>
              <td className="px-4 py-4">
                <StatusBadge status={blog.status} />
              </td>
              <td className="px-4 py-4 text-muted-foreground">
                {blog.publishedAt
                  ? formatAdminDate(blog.publishedAt)
                  : formatAdminDate(blog.createdAt)}
              </td>
              <td className="px-4 py-4 text-muted-foreground">
                {blog.viewCount.toLocaleString("en-US")}
              </td>
              <td className="px-6 py-4">
                <AdminBlogRowActions
                  blog={blog}
                  onBlogDeleted={onBlogDeleted}
                  onBlogUpdated={onBlogUpdated}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

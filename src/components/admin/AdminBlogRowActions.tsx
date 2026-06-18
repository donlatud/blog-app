"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";

import { patchAdminBlogStatus, deleteAdminBlog } from "@/lib/api/admin/blogs";
import { ApiError } from "@/lib/api/apiError";
import type { AdminBlogListItem } from "@/types/admin";

type AdminBlogRowActionsProps = {
  blog: AdminBlogListItem;
};

export function AdminBlogRowActions({ blog }: AdminBlogRowActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleStatus = async () => {
    setIsUpdating(true);

    try {
      const nextStatus = blog.status === "published" ? "draft" : "published";
      await patchAdminBlogStatus(blog.id, nextStatus);
      router.refresh();
    } catch (error) {
      window.alert(
        error instanceof ApiError
          ? error.message
          : "Unable to update article status."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete "${blog.title}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setIsUpdating(true);

    try {
      await deleteAdminBlog(blog.id);
      router.refresh();
    } catch (error) {
      window.alert(
        error instanceof ApiError
          ? error.message
          : "Unable to delete this article."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/blogs/${blog.id}/edit`}
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label={`Edit ${blog.title}`}
      >
        <Pencil aria-hidden="true" className="size-4" />
      </Link>

      <button
        type="button"
        onClick={handleToggleStatus}
        disabled={isUpdating}
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
        aria-label={
          blog.status === "published"
            ? `Unpublish ${blog.title}`
            : `Publish ${blog.title}`
        }
      >
        {blog.status === "published" ? (
          <EyeOff aria-hidden="true" className="size-4" />
        ) : (
          <Eye aria-hidden="true" className="size-4" />
        )}
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isUpdating}
        className="rounded-md p-2 text-destructive transition-colors hover:bg-destructive/5 disabled:opacity-50"
        aria-label={`Delete ${blog.title}`}
      >
        <Trash2 aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}

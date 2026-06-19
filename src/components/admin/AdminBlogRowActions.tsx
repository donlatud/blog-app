"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { patchAdminBlogStatus, deleteAdminBlog } from "@/lib/api/admin/blogs";
import { ApiError } from "@/lib/api/apiError";
import type { AdminBlogListItem } from "@/types/admin";

type AdminBlogRowActionsProps = {
  blog: AdminBlogListItem;
  onBlogDeleted: (blogId: string) => void;
  onBlogUpdated: (blog: AdminBlogListItem) => void;
};

type ConfirmAction = "delete" | "toggle" | null;

export function AdminBlogRowActions({
  blog,
  onBlogDeleted,
  onBlogUpdated,
}: AdminBlogRowActionsProps) {
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const nextStatus = blog.status === "published" ? "draft" : "published";
  const isDeleteDialog = confirmAction === "delete";
  const isToggleDialog = confirmAction === "toggle";

  const handleConfirm = async () => {
    setIsUpdating(true);

    try {
      if (isDeleteDialog) {
        await deleteAdminBlog(blog.id);
        onBlogDeleted(blog.id);
        setConfirmAction(null);
        return;
      }

      if (isToggleDialog) {
        const updated = await patchAdminBlogStatus(blog.id, nextStatus);
        onBlogUpdated({
          ...blog,
          status: updated.status,
          publishedAt: updated.publishedAt,
        });
        setConfirmAction(null);
      }
    } catch (error) {
      setConfirmAction(null);
      window.alert(
        error instanceof ApiError
          ? error.message
          : isDeleteDialog
            ? "Unable to delete this article."
            : "Unable to update article status."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
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
          onClick={() => setConfirmAction("toggle")}
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
          onClick={() => setConfirmAction("delete")}
          disabled={isUpdating}
          className="rounded-md p-2 text-destructive transition-colors hover:bg-destructive/5 disabled:opacity-50"
          aria-label={`Delete ${blog.title}`}
        >
          <Trash2 aria-hidden="true" className="size-4" />
        </button>
      </div>

      <ConfirmDialog
        open={confirmAction !== null}
        title={
          isDeleteDialog
            ? "Delete article?"
            : nextStatus === "published"
              ? "Publish article?"
              : "Move to draft?"
        }
        description={
          isDeleteDialog
            ? `Delete "${blog.title}"? This action cannot be undone.`
            : nextStatus === "published"
              ? `Publish "${blog.title}"? It will be visible on the public site.`
              : `Move "${blog.title}" to draft? It will be hidden from the public site.`
        }
        confirmLabel={
          isDeleteDialog
            ? "Delete"
            : nextStatus === "published"
              ? "Publish"
              : "Move to draft"
        }
        confirmVariant={isDeleteDialog ? "destructive" : "default"}
        isLoading={isUpdating}
        onConfirm={handleConfirm}
        onCancel={() => {
          if (!isUpdating) {
            setConfirmAction(null);
          }
        }}
      />
    </>
  );
}

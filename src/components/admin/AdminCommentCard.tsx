import Link from "next/link";

import { AdminCommentActions } from "@/components/admin/AdminCommentActions";
import { formatRelativeTime } from "@/lib/utils/formatRelativeTime";
import { cn } from "@/lib/utils";
import type { AdminCommentListItem } from "@/types/admin";

const statusLabels = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
} as const;

const statusStyles = {
  pending: "text-amber-600",
  approved: "text-emerald-600",
  rejected: "text-destructive",
} as const;

type AdminCommentCardProps = {
  comment: AdminCommentListItem;
  onCommentUpdated: (comment: AdminCommentListItem) => void;
};

export function AdminCommentCard({
  comment,
  onCommentUpdated,
}: AdminCommentCardProps) {
  return (
    <article className="surface-card rounded-xl border border-border p-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-foreground">
            {comment.authorName}
            {comment.blog ? (
              <>
                {" "}
                <span className="font-normal text-muted-foreground">
                  in article:{" "}
                </span>
                <Link
                  href={`/blog/${comment.blog.slug}`}
                  className="font-normal text-foreground underline-offset-4 hover:underline"
                >
                  {comment.blog.title}
                </Link>
              </>
            ) : null}
          </p>
        </div>

        <span
          className={cn(
            "text-xs font-medium",
            statusStyles[comment.status]
          )}
        >
          {statusLabels[comment.status]}
        </span>
      </header>

      <blockquote className="text-body mt-4 text-sm text-foreground">
        &ldquo;{comment.body}&rdquo;
      </blockquote>

      <footer className="mt-4 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <time
          dateTime={comment.createdAt}
          className="text-meta text-xs text-muted-foreground"
        >
          {formatRelativeTime(comment.createdAt)}
        </time>

        <AdminCommentActions
          comment={comment}
          onCommentUpdated={onCommentUpdated}
        />
      </footer>
    </article>
  );
}

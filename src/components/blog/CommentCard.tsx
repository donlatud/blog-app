import { formatRelativeTime } from "@/lib/utils/formatRelativeTime";
import type { BlogComment } from "@/types/blog";

type CommentCardProps = {
  comment: BlogComment;
};

function getInitial(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : "?";
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <article className="rounded-xl border border-border bg-background p-5">
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground"
        >
          {getInitial(comment.authorName)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {comment.authorName}
          </p>
          <time
            dateTime={comment.createdAt}
            className="text-xs text-muted-foreground"
          >
            {formatRelativeTime(comment.createdAt)}
          </time>
        </div>
      </header>
      <p className="mt-4 text-sm leading-relaxed text-foreground">{comment.body}</p>
    </article>
  );
}

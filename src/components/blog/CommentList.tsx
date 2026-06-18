import { CommentCard } from "@/components/blog/CommentCard";
import type { BlogComment } from "@/types/blog";

type CommentListProps = {
  comments: BlogComment[];
};

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No comments yet. Be the first to share your thoughts.
      </p>
    );
  }

  return (
    <ul className="flex list-none flex-col gap-4">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentCard comment={comment} />
        </li>
      ))}
    </ul>
  );
}

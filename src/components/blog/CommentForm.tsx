"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Info } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { COMMENT_BODY_MAX, validateCommentBody } from "@/constants/comment";
import { useAuth } from "@/context/AuthProvider";
import { ApiError } from "@/lib/api/apiError";
import { postBlogComment } from "@/lib/api/comments";
import { cn } from "@/lib/utils";

type CommentFormProps = {
  slug: string;
  onSubmitted: () => void;
};

export function CommentForm({ slug, onSubmitted }: CommentFormProps) {
  const { user } = useAuth();
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const validationError = validateCommentBody(body);

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      await postBlogComment(slug, body);
      setBody("");
      onSubmitted();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError("Your session has expired. Please sign in again to comment.");
        return;
      }

      setError(
        err instanceof ApiError
          ? err.message
          : "Unable to send your comment. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    const loginHref = `/login?redirect=${encodeURIComponent(`/blog/${slug}`)}`;

    return (
      <div className="rounded-xl bg-muted/60 p-6 text-center">
        <p className="text-sm text-foreground">
          Sign in to join the conversation.
        </p>
        <Link
          href={loginHref}
          className={cn(buttonVariants({ variant: "inverted" }), "mt-4 inline-flex")}
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-muted/60 p-6"
      noValidate
    >
      <h3 className="text-xl font-semibold text-foreground">Leave a comment</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Commenting as {user.displayName}
      </p>

      <div className="mt-5">
        <Textarea
          name="body"
          label="Write a comment"
          placeholder="Share your thoughts here"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          maxLength={COMMENT_BODY_MAX}
          error={error ?? undefined}
          disabled={isSubmitting}
        />
      </div>

      <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
        <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
        <span>Please comment politely. Thai characters and numbers only.</span>
      </p>

      <Button
        type="submit"
        variant="inverted"
        className="mt-5 h-11 w-full text-base sm:w-auto sm:px-8"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send comment"}
      </Button>
    </form>
  );
}

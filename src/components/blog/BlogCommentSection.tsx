"use client";

import { useState } from "react";

import { CommentForm } from "@/components/blog/CommentForm";
import { CommentList } from "@/components/blog/CommentList";
import { PageContainer } from "@/components/layout/PageContainer";
import type { BlogComment } from "@/types/blog";

type BlogCommentSectionProps = {
  slug: string;
  comments: BlogComment[];
};

export function BlogCommentSection({ slug, comments }: BlogCommentSectionProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <PageContainer as="section" className="mt-12 border-t border-border pt-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold text-foreground">Comments</h2>

        <div className="mt-6">
          <CommentList comments={comments} />
        </div>

        {successMessage ? (
          <p
            role="status"
            className="mt-6 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-foreground"
          >
            {successMessage}
          </p>
        ) : null}

        <div className="mt-8">
          <CommentForm
            slug={slug}
            onSubmitted={() =>
              setSuccessMessage(
                "Your comment has been submitted and is awaiting approval."
              )
            }
          />
        </div>
      </div>
    </PageContainer>
  );
}

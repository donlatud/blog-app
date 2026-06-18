"use client";

import { PageError } from "@/components/layout/PageError";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type BlogDetailErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function BlogDetailError({ error, reset }: BlogDetailErrorProps) {
  return (
    <>
      <SiteHeader activeNav={null} />
      <main className="w-full flex-1">
        <PageError
          title="Unable to load article"
          message={error.message || "We could not load this article right now."}
          onReset={reset}
          homeHref="/"
          homeLabel="Browse articles"
        />
      </main>
      <SiteFooter />
    </>
  );
}

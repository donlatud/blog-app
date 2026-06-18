"use client";

import { PageError } from "@/components/layout/PageError";

type AdminPanelErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminPanelError({ error, reset }: AdminPanelErrorProps) {
  return (
    <PageError
      title="Something went wrong"
      message={error.message || "Unable to load this admin page."}
      onReset={reset}
      homeHref="/admin"
      homeLabel="Back to dashboard"
      className="min-h-[50vh]"
    />
  );
}

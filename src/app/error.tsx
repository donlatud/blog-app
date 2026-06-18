"use client";

import { PageError } from "@/components/layout/PageError";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type RootErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ error, reset }: RootErrorProps) {
  return (
    <>
      <SiteHeader activeNav={null} />
      <main className="w-full flex-1">
        <PageError
          title="Unable to load page"
          message={error.message || "An unexpected error occurred."}
          onReset={reset}
        />
      </main>
      <SiteFooter />
    </>
  );
}

"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageErrorProps = {
  title: string;
  message?: string;
  resetLabel?: string;
  onReset?: () => void;
  homeHref?: string;
  homeLabel?: string;
  className?: string;
};

export function PageError({
  title,
  message = "Something went wrong. Please try again.",
  resetLabel = "Try again",
  onReset,
  homeHref = "/",
  homeLabel = "Back to home",
  className,
}: PageErrorProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center px-4 py-24 text-center",
        className
      )}
    >
      <h1 className="text-headline text-2xl sm:text-3xl">{title}</h1>
      <p className="text-body mt-4 max-w-md text-sm text-muted-foreground">
        {message}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {onReset ? (
          <Button type="button" size="lg" onClick={onReset}>
            {resetLabel}
          </Button>
        ) : null}

        <Link
          href={homeHref}
          className={cn(
            buttonVariants({ variant: onReset ? "outline" : "default", size: "lg" }),
            "h-10 px-5"
          )}
        >
          {homeLabel}
        </Link>
      </div>
    </section>
  );
}

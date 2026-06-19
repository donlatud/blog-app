"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AdminPaginationProps = {
  start: number;
  end: number;
  total: number;
  page: number;
  totalPages: number;
  itemLabel?: string;
  ariaLabel: string;
  onPageChange: (page: number) => void;
  className?: string;
};

export function AdminPagination({
  start,
  end,
  total,
  page,
  totalPages,
  itemLabel = "items",
  ariaLabel,
  onPageChange,
  className,
}: AdminPaginationProps) {
  return (
    <footer
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <p className="text-sm text-muted-foreground">
        Showing {start}-{end} of {total} {itemLabel}
      </p>

      <nav aria-label={ariaLabel} className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </Button>

        <span
          aria-current="page"
          className="min-w-8 rounded-lg bg-foreground px-3 py-1.5 text-center text-sm font-medium text-background"
        >
          {page}
        </span>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </Button>
      </nav>
    </footer>
  );
}

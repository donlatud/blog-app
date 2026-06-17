"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <nav
      aria-label="การแบ่งหน้า"
      className={cn("w-full border-y border-border py-8", className)}
    >
      <PageContainer className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-10 gap-1 px-4"
          disabled={!canGoPrevious}
          onClick={() => onPageChange?.(page - 1)}
        >
          <ChevronLeft className="size-4" aria-hidden />
          ก่อนหน้า
        </Button>

        <p className="text-sm text-muted-foreground">
          หน้า{" "}
          <span className="font-medium text-foreground">{page}</span> จาก{" "}
          <span className="font-medium text-foreground">{totalPages}</span>
        </p>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-10 gap-1 px-4"
          disabled={!canGoNext}
          onClick={() => onPageChange?.(page + 1)}
        >
          ถัดไป
          <ChevronRight className="size-4" aria-hidden />
        </Button>
      </PageContainer>
    </nav>
  );
}

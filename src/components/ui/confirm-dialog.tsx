"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "default" | "destructive";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "default",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleCancel = () => {
    if (isLoading) {
      return;
    }

    onCancel();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      className={cn(
        "fixed top-1/2 left-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-0 shadow-lg",
        "backdrop:bg-black/40 backdrop:backdrop-blur-[1px]"
      )}
      onCancel={(event) => {
        event.preventDefault();
        handleCancel();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          handleCancel();
        }
      }}
    >
      <section className="flex flex-col">
        <header className="border-b border-border px-6 py-5">
          <h2
            id="confirm-dialog-title"
            className="text-lg font-semibold text-foreground"
          >
            {title}
          </h2>
        </header>

        <p
          id="confirm-dialog-description"
          className="px-6 py-4 text-sm leading-relaxed text-muted-foreground"
        >
          {description}
        </p>

        <footer className="flex flex-col-reverse gap-3 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={confirmVariant === "destructive" ? "destructive" : "inverted"}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmLabel}
          </Button>
        </footer>
      </section>
    </dialog>
  );
}

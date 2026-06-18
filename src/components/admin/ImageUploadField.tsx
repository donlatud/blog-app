"use client";

import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";

import { uploadAdminImage } from "@/lib/api/admin/uploads";
import { ApiError } from "@/lib/api/apiError";
import { cn } from "@/lib/utils";

type ImageUploadFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  variant?: "cover" | "square";
  className?: string;
};

export function ImageUploadField({
  label,
  value,
  onChange,
  variant = "cover",
  className,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const url = await uploadAdminImage(file);
      onChange(url);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Unable to upload image."
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-label text-foreground">{label}</span>

      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-dashed border-border bg-muted/30",
          variant === "cover" ? "aspect-[16/10] w-full" : "aspect-square w-full"
        )}
      >
        {value ? (
          <>
            <Image
              src={value}
              alt={`${label} preview`}
              fill
              sizes={variant === "cover" ? "640px" : "160px"}
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 rounded-full bg-background/90 p-1 text-foreground shadow-sm"
              aria-label={`Remove ${label}`}
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50"
          >
            {isUploading ? (
              <Loader2 aria-hidden="true" className="size-5 animate-spin" />
            ) : (
              <ImagePlus aria-hidden="true" className="size-5" />
            )}
            <span>{isUploading ? "Uploading..." : "Click to upload"}</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
      />

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

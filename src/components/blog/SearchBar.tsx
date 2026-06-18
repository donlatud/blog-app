"use client";

import { Search } from "lucide-react";
import { type FormEvent, useCallback } from "react";

import { cn } from "@/lib/utils";

type SearchBarProps = {
  id?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
};

export function SearchBar({
  id,
  value,
  defaultValue = "",
  placeholder = "Search articles...",
  onChange,
  onSubmit,
  className,
}: SearchBarProps) {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const query = String(formData.get("search") ?? "");
      onSubmit?.(query);
    },
    [onSubmit]
  );

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn("relative", className)}
    >
      <label htmlFor={id} className="sr-only">
        Search articles
      </label>
      <input
        id={id}
        name="search"
        type="search"
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="search-pill w-full pr-10 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <button
        type="submit"
        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Search"
      >
        <Search className="size-4" aria-hidden />
      </button>
    </form>
  );
}

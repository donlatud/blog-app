"use client";

import Link from "next/link";
import { useId } from "react";

import { SearchBar } from "@/components/blog/SearchBar";
import { PageContainer } from "@/components/layout/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Browse", href: "/", active: true },
  { label: "Latest", href: "/?sort=latest", active: false },
  { label: "Topics", href: "/?view=topics", active: false },
] as const;

type SiteHeaderProps = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  signInHref?: string;
  className?: string;
};

export function SiteHeader({
  searchValue = "",
  onSearchChange,
  onSearchSubmit,
  signInHref = "/login",
  className,
}: SiteHeaderProps) {
  const searchId = useId();

  return (
    <header className={cn("w-full border-b border-border bg-background", className)}>
      <PageContainer className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <nav
          aria-label="เมนูหลัก"
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:flex-1 lg:justify-start lg:gap-10"
        >
          <Link
            href="/"
            className="font-heading text-xl font-bold tracking-tight text-foreground"
          >
            Blog
          </Link>

          <ul className="flex list-none items-center gap-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium text-foreground transition-colors hover:text-primary-600",
                    item.active &&
                      "underline decoration-foreground decoration-2 underline-offset-8"
                  )}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
          <SearchBar
            id={searchId}
            value={searchValue}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
            className="w-full sm:w-64"
          />
          <Link
            href={signInHref}
            className={cn(buttonVariants({ size: "lg" }), "h-10 px-5")}
          >
            Sign In
          </Link>
        </div>
      </PageContainer>
    </header>
  );
}

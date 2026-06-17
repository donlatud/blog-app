"use client";

import Link from "next/link";
import { useId } from "react";

import { SearchBar } from "@/components/blog/SearchBar";
import { PageContainer } from "@/components/layout/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Browse", href: "/", key: "browse" as const },
  { label: "Latest", href: "/?sort=latest", key: "latest" as const },
  { label: "Topics", href: "/?view=topics", key: "topics" as const },
] as const;

type SiteHeaderProps = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  signInHref?: string;
  activeNav?: (typeof navItems)[number]["key"] | null;
  className?: string;
};

export function SiteHeader({
  searchValue = "",
  onSearchChange,
  onSearchSubmit,
  signInHref = "/login",
  activeNav = "browse",
  className,
}: SiteHeaderProps) {
  const searchId = useId();
  const { user, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <header className={cn("w-full border-b border-border bg-background", className)}>
      <PageContainer className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <nav
          aria-label="Main navigation"
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
                    activeNav === item.key &&
                      "underline decoration-foreground decoration-2 underline-offset-8"
                  )}
                  aria-current={activeNav === item.key ? "page" : undefined}
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

          {!isLoading && user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-foreground">
                {user.displayName}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href={signInHref}
              className={cn(buttonVariants({ size: "lg" }), "h-10 px-5")}
            >
              Sign In
            </Link>
          )}
        </div>
      </PageContainer>
    </header>
  );
}

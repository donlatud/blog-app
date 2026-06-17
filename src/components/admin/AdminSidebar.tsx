"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  LogOut,
  MessageSquare,
  PlusSquare,
} from "lucide-react";

import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Articles",
    href: "/admin",
    icon: LayoutGrid,
    match: (pathname: string) => pathname === "/admin",
  },
  {
    label: "Create article",
    href: "/admin/blogs/new",
    icon: PlusSquare,
    match: (pathname: string) => pathname.startsWith("/admin/blogs/new"),
  },
  {
    label: "Manage comments",
    href: "/admin/comments",
    icon: MessageSquare,
    match: (pathname: string) => pathname.startsWith("/admin/comments"),
  },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-border bg-background">
      <header className="px-6 pb-2 pt-8">
        <p className="font-heading text-lg font-bold text-foreground">Admin Panel</p>
        <p className="text-meta mt-1 text-sm">Moderator</p>
      </header>

      <nav aria-label="Admin navigation" className="px-4 pb-8 pt-6">
        <ul className="flex list-none flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.match(pathname);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon aria-hidden="true" className="size-[18px] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}

          <li className="mt-2 border-t border-border pt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              <LogOut aria-hidden="true" className="size-[18px] shrink-0" />
              <span>Log out</span>
            </button>
          </li>
        </ul>
      </nav>

      {user ? (
        <p className="sr-only">Signed in as {user.displayName}</p>
      ) : null}
    </aside>
  );
}

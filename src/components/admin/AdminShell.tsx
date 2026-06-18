"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/context/AuthProvider";

type AdminShellProps = {
  children: React.ReactNode;
};

function AdminLoadingSkeleton() {
  return (
    <div className="flex min-h-screen bg-background" aria-busy="true" aria-label="Loading admin panel">
      <div className="hidden w-64 shrink-0 border-r border-border bg-background lg:block" />
      <div className="flex min-w-0 flex-1 flex-col bg-muted/30">
        <div className="h-14 border-b border-border lg:hidden" />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    </div>
  );
}

export function AdminShell({ children }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <AdminLoadingSkeleton />;
  }

  if (!user || user.role !== "admin") {
    return <AdminLoadingSkeleton />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
          aria-label="Close navigation menu"
        />
      ) : null}

      <AdminSidebar
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col bg-muted/30">
        <header className="flex items-center gap-3 border-b border-border bg-background px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted"
            aria-label="Open navigation menu"
            aria-expanded={mobileNavOpen}
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
          <p className="font-heading text-base font-bold text-foreground">Admin Panel</p>
        </header>

        {children}
      </div>
    </div>
  );
}

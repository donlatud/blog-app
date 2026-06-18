function DashboardSkeleton() {
  return (
    <>
      <header className="flex flex-col gap-4 border-b border-border bg-background px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-8 w-40 animate-pulse rounded bg-muted" />
        <div className="h-10 w-36 animate-pulse rounded-lg bg-muted" />
      </header>

      <section className="flex-1 px-8 py-6" aria-busy="true" aria-label="Loading admin panel">
        <div className="mb-6 flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>

        <div className="surface-card overflow-hidden">
          <div className="border-b border-border px-6 py-4">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="border-b border-border px-6 py-4 last:border-b-0">
              <div className="h-14 w-full animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default function AdminPanelLoading() {
  return <DashboardSkeleton />;
}

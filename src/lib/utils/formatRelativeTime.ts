const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const diffMs = Date.now() - date.getTime();

  if (Number.isNaN(diffMs)) {
    return "";
  }

  if (diffMs < MINUTE_MS) {
    return "just now";
  }

  if (diffMs < HOUR_MS) {
    const minutes = Math.floor(diffMs / MINUTE_MS);
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  if (diffMs < DAY_MS) {
    const hours = Math.floor(diffMs / HOUR_MS);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (diffMs < DAY_MS * 7) {
    const days = Math.floor(diffMs / DAY_MS);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

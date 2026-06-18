import { cn } from "@/lib/utils";

type AdminAlertProps = {
  message: string;
  variant?: "error" | "info";
  className?: string;
};

export function AdminAlert({
  message,
  variant = "error",
  className,
}: AdminAlertProps) {
  return (
    <p
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        variant === "error"
          ? "border-destructive/30 bg-destructive/5 text-destructive"
          : "border-border bg-muted/40 text-muted-foreground",
        className
      )}
    >
      {message}
    </p>
  );
}

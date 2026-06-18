import { PageContainer } from "@/components/layout/PageContainer";
import { cn } from "@/lib/utils";

type BlogListAlertProps = {
  variant: "error" | "empty";
  message: string;
  status?: number;
  className?: string;
};

export function BlogListAlert({
  variant,
  message,
  status,
  className,
}: BlogListAlertProps) {
  return (
    <PageContainer className={cn("py-16", className)}>
      <p
        role={variant === "error" ? "alert" : "status"}
        className={cn(
          "text-center text-sm",
          variant === "error" ? "text-destructive" : "text-muted-foreground"
        )}
      >
        {message}
        {variant === "error" && status ? (
          <span className="mt-1 block text-xs text-muted-foreground">
            รหัสสถานะ: {status}
          </span>
        ) : null}
      </p>
    </PageContainer>
  );
}

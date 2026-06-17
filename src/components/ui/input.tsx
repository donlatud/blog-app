import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-label text-foreground">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          error && "border-destructive",
          className
        )}
        {...props}
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
  label: string;
  error?: string;
};

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={textareaId} className="text-label text-foreground">
        {label}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          "min-h-32 w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          error && "border-destructive",
          className
        )}
        {...props}
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

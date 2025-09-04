import { cn } from "@/lib/utils";

export default function AdPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-64 w-full bg-muted/50 border-2 border-dashed border-border rounded-lg",
        className
      )}
    >
      <p className="text-muted-foreground text-sm">Ad Placeholder</p>
    </div>
  );
}

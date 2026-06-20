import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-sm border border-amber-900/15 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-900", className)}>
      {children}
    </span>
  );
}

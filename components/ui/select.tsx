import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-12 w-full rounded-md border border-stone-300 bg-white/90 px-3 text-sm outline-none transition focus:border-amber-800 focus:ring-4 focus:ring-amber-900/10",
        className,
      )}
      {...props}
    />
  );
}

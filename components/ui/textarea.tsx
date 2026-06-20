import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-md border border-stone-300 bg-white/90 px-3 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-amber-800 focus:ring-4 focus:ring-amber-900/10",
        className,
      )}
      {...props}
    />
  );
}

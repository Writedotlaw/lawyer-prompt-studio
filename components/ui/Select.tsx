import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  variant?: "default" | "compact";
};

export default function Select({ variant = "default", className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "glass-select",
        variant === "compact" && "px-3 py-2 text-xs",
        className
      )}
      {...props}
    />
  );
}

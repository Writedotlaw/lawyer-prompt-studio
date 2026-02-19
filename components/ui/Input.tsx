import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: "default" | "compact";
};

export default function Input({ variant = "default", className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "glass-input",
        variant === "compact" && "px-3 py-2 text-xs",
        className
      )}
      {...props}
    />
  );
}

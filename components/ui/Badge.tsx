import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "accent" | "success" | "warning" | "danger" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  accent: "badge",
  success: "inline-flex items-center rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success",
  warning: "inline-flex items-center rounded-full bg-warning/15 px-3 py-1 text-xs font-medium text-warning",
  danger: "inline-flex items-center rounded-full bg-danger/15 px-3 py-1 text-xs font-medium text-danger",
  neutral: "inline-flex items-center rounded-full bg-base-200/15 px-3 py-1 text-xs font-medium text-base-200"
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export default function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return <span className={cn(toneClasses[tone], className)} {...props} />;
}

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "surface" | "raised" | "flat";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const variantClasses: Record<CardVariant, string> = {
  surface: "surface",
  raised: "surface-raised",
  flat: "rounded-3xl border border-base-200/10 bg-base-900/60"
};

export default function Card({ variant = "surface", className, ...props }: CardProps) {
  return <div className={cn(variantClasses[variant], className)} {...props} />;
}

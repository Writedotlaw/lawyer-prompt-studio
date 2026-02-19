import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TagTone = "default" | "accent" | "teal" | "muted";

const toneClasses: Record<TagTone, string> = {
  default: "chip",
  accent: "inline-flex items-center rounded-full border border-accent-400/40 bg-accent-500/15 px-3 py-1 text-xs text-accent-100",
  teal: "inline-flex items-center rounded-full border border-teal-400/40 bg-teal-500/15 px-3 py-1 text-xs text-teal-100",
  muted: "inline-flex items-center rounded-full border border-base-200/10 bg-base-200/10 px-3 py-1 text-xs text-base-200"
};

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: TagTone;
};

export default function Tag({ tone = "default", className, ...props }: TagProps) {
  return <span className={cn(toneClasses[tone], className)} {...props} />;
}

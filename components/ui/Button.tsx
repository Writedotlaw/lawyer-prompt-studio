import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-500 text-base-950 shadow-glow hover:bg-accent-400 focus:ring-2 focus:ring-accent-400/30",
  secondary:
    "bg-base-200/10 text-base-50 border border-base-200/10 hover:border-base-200/40 hover:bg-base-200/15",
  outline:
    "border border-base-200/30 text-base-50 hover:border-accent-300/70 hover:text-accent-100",
  ghost: "text-base-200 hover:text-base-50 hover:bg-base-200/10",
  danger:
    "bg-danger/20 text-danger border border-danger/40 hover:bg-danger/30 hover:border-danger/60"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm"
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const buttonStyles = ({
  variant = "secondary",
  size = "md",
  className
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

export default function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />;
}

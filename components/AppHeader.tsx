"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import WriteLawMark from "@/components/WriteLawMark";

const navLinks = [
  { href: "/", label: "Presets" },
  { href: "/library", label: "Prompt Library" },
  { href: "/wizard", label: "Prompt Workbench" },
];

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-base-200/10 bg-base-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-4">
          <WriteLawMark />
        </div>
        <nav className="hidden items-center gap-1 rounded-full border border-base-200/10 bg-base-900/40 p-1 text-sm lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn("nav-link", isActive && "nav-link-active")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden text-xs text-base-300 sm:block">Write.law-inspired brand pass · Secure by default</div>
          <Link href="/wizard" className={cn(buttonStyles({ variant: "primary" }), "hidden sm:inline-flex")}>
            Open Workbench
          </Link>
        </div>
      </div>
      <div className="border-t border-base-200/10 bg-base-900/40 px-6 py-2 text-xs text-base-300 lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1 transition",
                  isActive ? "bg-base-200/10 text-base-50" : "text-base-300"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

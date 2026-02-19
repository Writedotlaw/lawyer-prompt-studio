import "./globals.css";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "Lawyer Prompt Studio",
  description: "Ready-to-ship legal prompt templates and a guided prompt wizard."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <div className="absolute inset-0 bg-hero-radial" />
          <div className="absolute inset-0 bg-mesh" />
          <div className="absolute inset-0 bg-grid-faint [background-size:120px_120px] opacity-20" />
          <div className="relative">
            <AppHeader />
            <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
              {children}
            </main>
            <footer className="border-t border-base-200/10">
              <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-xs text-base-300 sm:flex-row sm:items-center">
                <p>Built for legal teams. Not a law firm. No legal advice.</p>
                <p>Write.law-inspired branding concept · 2026</p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}

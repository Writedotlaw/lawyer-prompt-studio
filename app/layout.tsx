import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Lawyer Prompt Studio",
  description: "Ready-to-ship legal prompt templates and a guided prompt wizard."
};

const navLinks = [
  { href: "/library", label: "Library" },
  { href: "/wizard", label: "Template Wizard" },
  { href: "/my-templates", label: "My Templates" }
];

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body>
        <div className="min-h-screen bg-hero-radial">
          <div className="absolute inset-0 bg-grid-faint [background-size:120px_120px] opacity-20" />
          <div className="relative">
            <header className="border-b border-white/10">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-brass-200">Lawyer Prompt Studio</p>
                  <p className="text-xs text-ink-200">Production-ready legal prompt templates</p>
                </div>
                <nav className="flex items-center gap-6 text-sm text-ink-100">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="transition hover:text-brass-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </header>
            <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
              {children}
            </main>
            <footer className="border-t border-white/10">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-xs text-ink-300">
                <p>Built for legal teams. Not a law firm. No legal advice.</p>
                <p>Local-first MVP · 2026</p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}

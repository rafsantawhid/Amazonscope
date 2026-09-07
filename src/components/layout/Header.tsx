"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/asin-checker", label: "ASIN Research" },
  { href: "/best-sellers", label: "Best Sellers" },
  { href: "/deals", label: "Deals" },
  { href: "/categories", label: "Categories" },
  { href: "/reviews", label: "Reviews" },
  { href: "/seller", label: "Seller" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark((d) => !d);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-strong">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Amazon<span className="gradient-text">Scope</span></span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors", pathname === item.href || pathname.startsWith(item.href + "/") ? "bg-accent text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground")}>{item.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleDark} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary" aria-label="Toggle theme">{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
          <Link href="/dashboard" className="hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:shadow-orange-500/40 sm:inline-flex">Workspace</Link>
          <button className="rounded-lg p-2 hover:bg-secondary xl:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>

      {mobileOpen && <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl xl:hidden"><nav className="flex flex-col gap-1 p-4">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={cn("rounded-lg px-4 py-3 text-sm font-medium", pathname === item.href ? "bg-accent text-primary" : "text-muted-foreground hover:bg-secondary")}>{item.label}</Link>)}<Link href="/dashboard" onClick={() => setMobileOpen(false)} className="mt-2 rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-white">Workspace</Link></nav></div>}
    </header>
  );
}

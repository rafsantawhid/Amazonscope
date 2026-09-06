import { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Search, Bookmark, History, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard — AmazonScope",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to your <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your saved products, recent searches and AI assistant will appear here.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Search, title: "ASIN Checker", href: "/asin-checker", color: "from-orange-500 to-amber-500" },
          { icon: Bookmark, title: "Saved Products", href: "/saved", color: "from-blue-500 to-cyan-500" },
          { icon: History, title: "Search History", href: "/dashboard", color: "from-emerald-500 to-teal-500" },
          { icon: Sparkles, title: "AI Assistant", href: "/dashboard", color: "from-violet-500 to-purple-500" },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-2xl border border-border/60 bg-card p-6 hover:shadow-lg hover:border-orange-500/30 transition-all"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white mb-4`}>
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

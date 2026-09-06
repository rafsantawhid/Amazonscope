import { Metadata } from "next";
import { BarChart3, TrendingUp, Gift, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Amazon Categories & Best Sellers",
  description: "Browse Amazon categories, best sellers, movers & shakers, new releases and gift ideas.",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Categories & <span className="gradient-text">Best Sellers</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Explore Amazon categories, track ranking changes, and discover winning products.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {[
          { icon: BarChart3, title: "Best Sellers", color: "from-orange-500 to-amber-500" },
          { icon: TrendingUp, title: "Movers & Shakers", color: "from-emerald-500 to-teal-500" },
          { icon: Sparkles, title: "New Releases", color: "from-blue-500 to-cyan-500" },
          { icon: Gift, title: "Gift Ideas", color: "from-pink-500 to-rose-500" },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-border/60 bg-card p-6 hover:shadow-lg transition-shadow">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white mb-4`}>
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">{item.title}</h3>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-border/60 bg-muted/30 p-12 text-center">
        <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold">Category explorer coming online</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Full category browsing and best-seller lists will load once the RapidAPI connection is active.
        </p>
      </div>
    </div>
  );
}

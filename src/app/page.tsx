import Link from "next/link";
import {
  Search,
  BarChart3,
  Store,
  Tag,
  Star,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { GlobalSearch } from "@/components/search/GlobalSearch";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-600 dark:text-orange-400 mb-6">
            <Zap className="h-4 w-4" />
            Real-time Amazon Product Intelligence
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Research any Amazon product{" "}
            <span className="gradient-text">in seconds</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter an ASIN, product URL, seller ID, category or keyword. Get rich
            analytics, reviews, offers, BSR, deals and more — powered by official
            real-time Amazon data.
          </p>

          <div className="mt-10 max-w-2xl mx-auto">
            <GlobalSearch />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> ASIN Checker
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Seller Lookup
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Review Analyzer
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Live Deals
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Search,
              title: "ASIN Checker",
              description:
                "Paste any ASIN or Amazon URL and get full product details, images, price history signals, BSR, variations and more.",
              href: "/asin-checker",
              color: "from-orange-500 to-amber-500",
            },
            {
              icon: Store,
              title: "Seller Intelligence",
              description:
                "Lookup any seller profile, ratings, total products, feedback and store analytics in one place.",
              href: "/seller",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Star,
              title: "Review Analyzer",
              description:
                "Deep dive into customer reviews, rating distribution, verified purchases and sentiment signals.",
              href: "/reviews",
              color: "from-yellow-500 to-orange-500",
            },
            {
              icon: Tag,
              title: "Deals Explorer",
              description:
                "Discover live deals, lightning deals, promo codes and ranked discount opportunities across Amazon.",
              href: "/deals",
              color: "from-red-500 to-pink-500",
            },
            {
              icon: BarChart3,
              title: "Category & Best Sellers",
              description:
                "Browse categories, track best sellers, movers & shakers, new releases and gift ideas.",
              href: "/categories",
              color: "from-emerald-500 to-teal-500",
            },
            {
              icon: Zap,
              title: "AI Amazon Assistant",
              description:
                "Ask anything about ASINs, listings, FBA, keywords, ranking or optimization. Powered by Gemini.",
              href: "/dashboard",
              color: "from-violet-500 to-purple-500",
            },
          ].map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:shadow-xl hover:border-orange-500/30 hover:-translate-y-1"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-orange-600 transition-colors">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border/40 bg-gradient-to-b from-orange-500/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to research smarter?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Start with a free ASIN lookup. No credit card required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/asin-checker"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
            >
              Try ASIN Checker
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-8 py-3.5 text-base font-semibold hover:bg-secondary transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

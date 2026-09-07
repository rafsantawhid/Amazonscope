import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Search, ShoppingBag, Sparkles, Store, Tag, Star, Zap } from "lucide-react";

export const metadata: Metadata = { title: "Research Workspace — AmazonScope" };

const tools = [
  { href: "/asin-checker", icon: Search, title: "ASIN Research", text: "Deep product, offers, reviews and market signals.", badge: "Core" },
  { href: "/best-sellers", icon: BarChart3, title: "Best Sellers", text: "Explore live ranking data and product opportunities.", badge: "Live" },
  { href: "/deals", icon: Tag, title: "Deals Explorer", text: "Find live deal inventory and discounted products.", badge: "Live" },
  { href: "/seller", icon: Store, title: "Seller Intelligence", text: "Inspect seller profiles and their product catalog.", badge: "Live" },
  { href: "/reviews", icon: Star, title: "Review Analyzer", text: "Pull real customer reviews for any ASIN.", badge: "Live" },
  { href: "/categories", icon: ShoppingBag, title: "Category Explorer", text: "Browse live Amazon category data.", badge: "Live" },
];

export default function DashboardPage() {
  return <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-7 shadow-sm sm:p-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="relative">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-600"><Sparkles className="h-3.5 w-3.5"/>RESEARCH WORKSPACE</div>
        <h1 className="max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">Turn Amazon data into <span className="gradient-text">decisions.</span></h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">AmazonScope is now organized around live research workflows instead of empty dashboard cards. Pick a tool and work directly with the connected Amazon data source.</p>
        <Link href="/asin-checker" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">Start product research <ArrowUpRight className="h-4 w-4"/></Link>
      </div>
    </section>

    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map(({ href, icon: Icon, title, text, badge }) => <Link key={href} href={href} className="group rounded-2xl border border-border/60 bg-card p-5 transition hover:-translate-y-0.5 hover:border-orange-500/30 hover:shadow-lg"><div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600"><Icon className="h-5 w-5"/></div><span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-600">{badge}</span></div><h2 className="mt-5 font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p><div className="mt-4 flex items-center gap-1 text-xs font-semibold text-orange-600 opacity-0 transition group-hover:opacity-100">Open tool <ArrowUpRight className="h-3.5 w-3.5"/></div></Link>)}
    </section>

    <div className="mt-8 grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-border/60 bg-card p-6"><div className="flex items-center gap-3"><Zap className="h-5 w-5 text-orange-500"/><h2 className="font-bold">Live data philosophy</h2></div><p className="mt-3 text-sm leading-6 text-muted-foreground">Metrics are shown only when the Amazon data source provides them. We do not invent monthly sales, revenue, historical charts or seller counts.</p></div>
      <div className="rounded-2xl border border-border/60 bg-card p-6"><div className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-violet-500"/><h2 className="font-bold">AI analysis</h2></div><p className="mt-3 text-sm leading-6 text-muted-foreground">The AI layer runs server-side and analyzes supplied Amazon data. API keys stay on the server, never in the browser.</p></div>
    </div>
  </main>;
}

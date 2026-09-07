import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Database,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Tag,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { GlobalSearch } from "@/components/search/GlobalSearch";

const tools = [
  {
    icon: Search,
    title: "ASIN Product Intelligence",
    description:
      "Turn an ASIN or Amazon URL into a complete research profile with product details, pricing, BSR, ratings, sellers, offers, images and variations.",
    href: "/asin-checker",
  },
  {
    icon: Store,
    title: "Seller Intelligence",
    description:
      "Investigate sellers, storefronts, feedback, product portfolios and marketplace competition before you make a sourcing decision.",
    href: "/seller",
  },
  {
    icon: Star,
    title: "Review Intelligence",
    description:
      "Explore rating distributions and customer feedback to understand what buyers love, what they dislike and where products can improve.",
    href: "/reviews",
  },
  {
    icon: Tag,
    title: "Deals Explorer",
    description:
      "Find interesting deals and discounted products so you can discover opportunities without jumping between dozens of Amazon pages.",
    href: "/deals",
  },
  {
    icon: BarChart3,
    title: "Categories & Best Sellers",
    description:
      "Explore Amazon categories and best-selling products to spot niches, trends and products worth researching further.",
    href: "/categories",
  },
  {
    icon: Sparkles,
    title: "AI Amazon Assistant",
    description:
      "Use AI-assisted research to turn product data into practical questions, comparisons, opportunity ideas and next steps.",
    href: "/dashboard",
  },
];

const workflow = [
  ["01", "Search", "Enter an ASIN, Amazon URL, keyword, seller or category."],
  ["02", "Analyze", "Review product, pricing, BSR, offers, sellers and customer signals."],
  ["03", "Compare", "Put competing products and sellers into context before deciding."],
  ["04", "Decide", "Save the products worth pursuing and move forward with confidence."],
];

const faqs = [
  ["What is an ASIN?", "An ASIN, or Amazon Standard Identification Number, is Amazon's unique identifier for products in its catalog. AmazonScope lets you use that identifier as a starting point for product research."],
  ["What can I learn from an ASIN lookup?", "Depending on the data available for a listing, you can inspect product information, images, pricing, ratings, review counts, BSR, category information, variations, sellers and offers."],
  ["Can AmazonScope help with product research?", "Yes. AmazonScope is designed to bring the signals sellers commonly need for product research into one workflow, helping with sourcing, competition checks and listing analysis."],
  ["Does AmazonScope show historical data?", "Historical metrics require snapshots collected over time. AmazonScope does not invent historical values when they have not been collected; those capabilities can be built from stored observations."],
  ["Who is AmazonScope for?", "It is useful for Amazon FBA sellers, online arbitrage researchers, wholesalers, private-label sellers and anyone who needs a faster way to investigate Amazon products and sellers."],
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-48 right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute top-[42rem] left-[-14rem] h-[32rem] w-[32rem] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-[110rem] right-[-16rem] h-[38rem] w-[38rem] rounded-full bg-orange-400/10 blur-3xl" />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-600 dark:text-orange-400">
            <Zap className="h-4 w-4" />
            Amazon product research, simplified
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Research smarter.
            <br />
            <span className="gradient-text">Find better products.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            AmazonScope brings product, seller, review, offer and market signals into one clean research workspace — so you can spend less time hunting for data and more time making decisions.
          </p>
          <div className="mx-auto mt-10 max-w-3xl">
            <GlobalSearch />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {["ASIN lookup", "Seller research", "Review insights", "Deals & best sellers"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-3xl border border-border/70 bg-card/80 p-3 shadow-2xl shadow-orange-500/5 backdrop-blur sm:p-5">
          <div className="rounded-2xl border border-border/60 bg-background p-5 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-600">
                  <Target className="h-4 w-4" />
                  Your research command center
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl">From one ASIN to the full picture.</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Stop opening tab after tab. Start with a product and follow the signals that matter.
                </p>
              </div>
              <Link href="/asin-checker" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600">
                Try an ASIN <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [Database, "Product data", "Core listing intelligence"],
                [LineChart, "Market signals", "Price, BSR & demand clues"],
                [Users, "Competition", "Sellers & offers"],
                [ShieldCheck, "Decision support", "Research before you buy"],
              ].map(([Icon, title, text]) => (
                <div key={title as string} className="rounded-2xl border border-border/60 bg-card p-5">
                  <Icon className="h-5 w-5 text-orange-500" />
                  <div className="mt-4 font-semibold">{title as string}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{text as string}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Everything in one place</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Tools built around the way sellers actually research.</h2>
            <p className="mt-4 text-muted-foreground">Whether you are checking one listing or exploring an entire niche, AmazonScope gives each research task its own focused workspace.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.title} href={tool.href} className="group rounded-2xl border border-border/60 bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                  <tool.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{tool.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-orange-600">Explore tool <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">A faster workflow</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Four steps from curiosity to confidence.</h2>
            <p className="mt-5 leading-7 text-muted-foreground">Good product research is not about collecting every number. It is about connecting the right signals and knowing what to investigate next.</p>
          </div>
          <div className="space-y-4">
            {workflow.map(([number, title, description]) => (
              <div key={number} className="group flex gap-5 rounded-2xl border border-border/60 bg-card p-5 transition hover:border-orange-500/30">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-sm font-bold text-orange-600">{number}</div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">Product intelligence</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">See the signals behind an Amazon listing.</h2>
              <p className="mt-5 max-w-xl leading-7 text-slate-300">A product page is only the beginning. AmazonScope organizes the information around it so you can quickly understand the listing, its market position and the competition around it.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Price & availability", "BSR & category", "Ratings & reviews", "Sellers & offers", "Images & variations", "Product specifications"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-200"><CheckCircle2 className="h-4 w-4 text-orange-400" />{item}</div>
                ))}
              </div>
              <Link href="/asin-checker" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-100">Open ASIN Checker <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur sm:p-7">
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div><p className="text-xs uppercase tracking-wider text-slate-400">Product overview</p><p className="mt-1 font-semibold">Listing intelligence</p></div>
                  <div className="rounded-lg bg-orange-500/15 px-3 py-1 text-xs font-medium text-orange-300">ASIN</div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {["Current price", "Best Sellers Rank", "Rating", "Reviews", "Seller count", "Availability"].map((item) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-4"><div className="text-xs text-slate-400">{item}</div><div className="mt-2 h-4 w-2/3 rounded bg-white/10" /></div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"><div className="text-xs text-slate-400">Research signals</div><div className="mt-4 h-20 rounded-lg bg-gradient-to-r from-orange-500/20 via-white/5 to-transparent" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Built for real research</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">One workspace. Multiple ways to win.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Use the same research foundation whether you are sourcing your next deal, validating a niche or studying a competitor.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["FBA Sellers", "Evaluate products before investing inventory and time."],
            ["Online Arbitrage", "Move from deal discovery to product validation faster."],
            ["Private Label", "Study listings, reviews and competitors to find gaps."],
            ["Wholesale", "Research brands, sellers and product-level competition."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="mb-5 h-1 w-10 rounded-full bg-orange-500" />
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/50 bg-orange-500/[0.04]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Know the language of Amazon</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">The metrics that matter, without the confusion.</h2>
              <p className="mt-5 leading-7 text-muted-foreground">Amazon research becomes easier when you know what each signal tells you. Use AmazonScope as a practical starting point for understanding listings and markets.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["ASIN", "The unique product identifier used across Amazon's catalog."],
                ["BSR", "A category ranking that helps indicate a product's position within its category."],
                ["Buy Box", "The prominent offer customers see when purchasing a product."],
                ["Seller count", "A useful competition signal showing how many sellers are offering a listing."],
                ["Rating", "A quick view of overall customer satisfaction."],
                ["Review count", "The volume of customer feedback available for a product."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl border border-border/60 bg-card p-5"><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Questions before you start?</h2>
        </div>
        <div className="mt-12 divide-y divide-border rounded-2xl border border-border/60 bg-card px-6">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 max-w-3xl pr-8 text-sm leading-7 text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-border/50">
        <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600"><Sparkles className="h-7 w-7" /></div>
          <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-5xl">Your next product is worth researching.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Start with an ASIN, explore the data, and build your decision from evidence instead of guesswork.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/asin-checker" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">Start researching <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/pricing" className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 font-semibold transition hover:bg-secondary">View pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

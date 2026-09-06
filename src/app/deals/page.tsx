import { Metadata } from "next";
import { Tag, Zap, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Amazon Deals Explorer — Live Deals & Discounts",
  description: "Discover live Amazon deals, lightning deals, and high-discount products in real time.",
};

export default function DealsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Amazon <span className="gradient-text">Deals Explorer</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Live deals, lightning deals and high-discount opportunities across Amazon.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500 mb-4">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg">Lightning Deals</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Time-limited deals with deep discounts. Updated in real time.
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 mb-4">
            <Tag className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg">Best Discounts</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Ranked by discount percentage so you can find the biggest savings.
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 mb-4">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg">Ending Soon</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Deals that are about to expire — act fast before they disappear.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-border/60 bg-muted/30 p-12 text-center">
        <Tag className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold">Live deals loading soon</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Connect your RapidAPI key and the live deals feed will appear here automatically.
        </p>
      </div>
    </div>
  );
}

import { Metadata } from "next";
import { Store, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Amazon Seller Lookup",
  description: "Lookup any Amazon seller profile, ratings, products and store analytics.",
};

export default function SellerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Amazon <span className="gradient-text">Seller Lookup</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Enter a Seller ID to get full profile, ratings, product count and store analytics.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Enter Seller ID (e.g. A1F83G8C2ARO7P)"
            className="w-full rounded-2xl border border-border/60 bg-card py-4 pl-12 pr-28 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />
          <button className="absolute right-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white">
            Lookup
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-border/60 bg-muted/30 p-12 text-center">
        <Store className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold">Enter a Seller ID to begin</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Full seller intelligence will appear here after you search.
        </p>
      </div>
    </div>
  );
}

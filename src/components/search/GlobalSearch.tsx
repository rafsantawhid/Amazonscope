"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { extractAsin } from "@/lib/amazon/client";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    startTransition(() => {
      const asin = extractAsin(trimmed);
      if (asin) {
        router.push(`/asin-checker?asin=${asin}`);
      } else if (trimmed.startsWith("http") || trimmed.includes("amazon.")) {
        router.push(`/asin-checker?url=${encodeURIComponent(trimmed)}`);
      } else {
        router.push(`/asin-checker?q=${encodeURIComponent(trimmed)}`);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter ASIN, Amazon URL, or keyword…"
          className="w-full rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl py-4 pl-12 pr-32 text-base shadow-lg shadow-black/5 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Search"
          )}
        </button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground text-center">
        Example: B0CMZFCQ6D or https://www.amazon.com/dp/B0CMZFCQ6D
      </p>
    </form>
  );
}

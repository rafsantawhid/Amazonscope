"use client";

import { use, useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Loader2,
  ExternalLink,
  Star,
  Package,
  Tag,
  ImageIcon,
} from "lucide-react";
import { extractAsin } from "@/lib/amazon/client";
import { formatCurrency, formatNumber } from "@/lib/utils";

type ProductData = {
  asin?: string;
  product_title?: string;
  product_price?: string | number;
  product_original_price?: string | number;
  currency?: string;
  product_star_rating?: string | number;
  product_num_ratings?: number;
  product_photo?: string;
  product_photos?: string[];
  product_availability?: string;
  is_best_seller?: boolean;
  product_description?: string;
  about_product?: string[];
  product_information?: Record<string, string>;
  product_details?: Record<string, string>;
  brand?: string;
  [key: string]: any;
};

export function AsinCheckerClient({
  searchParams,
}: {
  searchParams: Promise<{ asin?: string; url?: string; q?: string }>;
}) {
  const params = use(searchParams);
  const initialQuery = params.asin || params.url || params.q || "";
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function fetchProduct(input: string) {
    setError(null);
    setData(null);

    const asin = extractAsin(input);
    if (!asin && !input.includes("amazon.")) {
      setError("Please enter a valid ASIN or Amazon product URL.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/amazon/product-details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            asin: asin || undefined,
            url: !asin ? input : undefined,
            country: "US",
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `Request failed (${res.status})`);
        }

        const json = await res.json();
        const product = json.data || json.product || json;
        setData(product);

        if (asin) {
          router.replace(`/asin-checker?asin=${asin}`, { scroll: false });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch product");
      }
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) fetchProduct(query.trim());
  }

  useEffect(() => {
    if (initialQuery) {
      fetchProduct(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ASIN (e.g. B0CMZFCQ6D) or full Amazon URL"
            className="w-full rounded-2xl border border-border/60 bg-card py-4 pl-12 pr-28 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending || !query.trim()}
            className="absolute right-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check"}
          </button>
        </div>
      </form>

      {error && (
        <div className="max-w-2xl mx-auto rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {isPending && !data && (
        <div className="grid gap-6 lg:grid-cols-3 animate-pulse">
          <div className="lg:col-span-1 h-80 rounded-2xl bg-muted" />
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 w-3/4 rounded bg-muted" />
            <div className="h-6 w-1/2 rounded bg-muted" />
            <div className="h-24 rounded bg-muted" />
          </div>
        </div>
      )}

      {data && !isPending && (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
              {data.product_photo || data.product_photos?.[0] ? (
                <img
                  src={data.product_photo || data.product_photos?.[0]}
                  alt={data.product_title || "Product"}
                  className="w-full rounded-xl object-contain aspect-square bg-white"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-xl bg-muted">
                  <ImageIcon className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              {data.brand && (
                <p className="text-sm font-medium text-orange-600">{data.brand}</p>
              )}
              <h2 className="mt-1 text-2xl font-bold leading-snug">
                {data.product_title || "Untitled Product"}
              </h2>
              {data.asin && (
                <p className="mt-2 text-sm text-muted-foreground">
                  ASIN: <span className="font-mono">{data.asin}</span>
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-3xl font-bold text-orange-600">
                  {formatCurrency(data.product_price, data.currency || "USD")}
                </p>
                {data.product_original_price && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatCurrency(data.product_original_price, data.currency || "USD")}
                  </p>
                )}
              </div>

              {(data.product_star_rating || data.product_num_ratings) && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-lg bg-amber-500/10 px-3 py-1.5">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span className="font-semibold">
                      {data.product_star_rating ?? "—"}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatNumber(data.product_num_ratings)} ratings
                  </span>
                </div>
              )}

              {data.is_best_seller && (
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600">
                  <Tag className="h-3 w-3" /> Best Seller
                </span>
              )}
            </div>

            {data.product_availability && (
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>{data.product_availability}</span>
              </div>
            )}

            {data.about_product && data.about_product.length > 0 && (
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <h3 className="font-semibold mb-3">About this item</h3>
                <ul className="space-y-2">
                  {data.about_product.map((point: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.asin && (
              <a
                href={`https://www.amazon.com/dp/${data.asin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
              >
                View on Amazon <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      )}

      {!data && !isPending && !error && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="mx-auto h-12 w-12 opacity-30 mb-4" />
          <p>Enter an ASIN or Amazon URL above to get started.</p>
        </div>
      )}
    </div>
  );
}

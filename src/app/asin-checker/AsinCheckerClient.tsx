"use client";

import { use, useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  CheckCircle2,
  ExternalLink,
  ImageIcon,
  Layers3,
  Loader2,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Tag,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { extractAsin } from "@/lib/amazon/client";
import { formatCurrency, formatNumber } from "@/lib/utils";

type AnyRecord = Record<string, any>;
type ResearchData = {
  data: AnyRecord;
  offers: any;
  reviews: any;
  topReviews: any;
  asin: string;
};

function unwrapProduct(json: any): AnyRecord | null {
  if (!json || typeof json !== "object") return null;
  const candidates = [json.data?.data, json.data, json.product, json];
  return candidates.find((x) => x && typeof x === "object" && !Array.isArray(x) && (x.product_title || x.asin || x.product_photo)) || null;
}

function first(obj: AnyRecord | null | undefined, keys: string[], fallback: any = undefined) {
  if (!obj) return fallback;
  for (const key of keys) {
    const value: any = key.split(".").reduce((v, k) => v?.[k], obj);
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return fallback;
}

function asArray(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  for (const key of ["products", "offers", "items", "reviews", "data", "results", "seller_offers"]) {
    if (Array.isArray(value[key])) return value[key];
  }
  return [];
}

function display(value: any, fallback = "Not available") {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function Section({ title, icon, children, className = "" }: { title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-border/60 bg-card p-5 shadow-sm ${className}`}>
      <div className="mb-5 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">{icon}</span>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Metric({ label, value, hint }: { label: string; value: any; hint?: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/50 p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-bold tracking-tight">{display(value, "—")}</p>
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Gallery({ product }: { product: AnyRecord }) {
  const images = useMemo(() => {
    const raw = first(product, ["product_photos", "product_images", "images"], []);
    const list = Array.isArray(raw) ? raw : [];
    const primary = first(product, ["product_photo", "product_image"]);
    return Array.from(new Set([primary, ...list].filter(Boolean))).slice(0, 12);
  }, [product]);
  const [selected, setSelected] = useState(images[0]);

  useEffect(() => setSelected(images[0]), [images]);

  return (
    <div className="space-y-3">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-white p-4">
        {selected ? <img src={selected} alt={display(product.product_title, "Product")} className="h-full w-full object-contain" /> : <ImageIcon className="h-16 w-16 text-muted-foreground/40" />}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.slice(0, 10).map((image, index) => (
            <button key={`${image}-${index}`} type="button" onClick={() => setSelected(image)} className={`aspect-square overflow-hidden rounded-lg border bg-white p-1 ${selected === image ? "border-orange-500 ring-2 ring-orange-500/20" : "border-border/60"}`}>
              <img src={image} alt={`Product image ${index + 1}`} className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function KeyValueGrid({ value }: { value: any }) {
  if (!value || typeof value !== "object") return <p className="text-sm text-muted-foreground">Not available.</p>;
  const entries = Object.entries(value).filter(([, v]) => v !== null && v !== undefined && v !== "");
  if (!entries.length) return <p className="text-sm text-muted-foreground">Not available.</p>;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {entries.map(([key, val]) => (
        <div key={key} className="rounded-lg bg-muted/40 px-3 py-2">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{key.replaceAll("_", " ")}</p>
          <p className="mt-1 break-words text-sm font-medium">{display(val)}</p>
        </div>
      ))}
    </div>
  );
}

function OfferTable({ offers }: { offers: any }) {
  const rows = asArray(offers);
  if (!rows.length) return <p className="text-sm text-muted-foreground">Offer data is not available from the current Amazon data source.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="border-b border-border/60 text-xs text-muted-foreground"><tr><th className="px-3 py-3">Seller</th><th className="px-3 py-3">Price</th><th className="px-3 py-3">Condition</th><th className="px-3 py-3">Fulfillment</th><th className="px-3 py-3">Buy Box</th></tr></thead>
        <tbody>{rows.slice(0, 20).map((offer, i) => {
          const price = first(offer, ["price", "offer_price", "listing_price", "product_price"]);
          const seller = first(offer, ["seller_name", "seller", "merchant_name", "seller_id"], "Unknown seller");
          const fulfillment = first(offer, ["fulfillment", "delivery", "fulfillment_type"], first(offer, ["is_fba"]) === true ? "FBA" : "FBM / Unknown");
          const buyBox = first(offer, ["is_buy_box", "buy_box", "is_buybox"]);
          return <tr key={i} className="border-b border-border/40 last:border-0"><td className="px-3 py-3 font-medium">{display(seller)}</td><td className="px-3 py-3 font-semibold text-orange-600">{formatCurrency(price, "USD")}</td><td className="px-3 py-3">{display(first(offer, ["condition", "product_condition"]), "New")}</td><td className="px-3 py-3">{display(fulfillment)}</td><td className="px-3 py-3">{buyBox ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : "—"}</td></tr>;
        })}</tbody>
      </table>
    </div>
  );
}

function ReviewList({ reviews, topReviews }: { reviews: any; topReviews: any }) {
  const rows = [...asArray(topReviews), ...asArray(reviews)].filter((review, i, arr) => arr.findIndex((x) => JSON.stringify(x) === JSON.stringify(review)) === i).slice(0, 8);
  if (!rows.length) return <p className="text-sm text-muted-foreground">Recent review data is not available from the current source.</p>;
  return <div className="space-y-3">{rows.map((review, i) => <article key={i} className="rounded-xl border border-border/60 p-4"><div className="flex flex-wrap items-center gap-2"><span className="font-semibold">{display(first(review, ["reviewer_name", "author", "reviewer"]), "Amazon customer")}</span><span className="flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-1 text-xs"><Star className="h-3 w-3 fill-amber-500 text-amber-500" />{display(first(review, ["rating", "review_rating", "star_rating"]), "—")}</span><span className="text-xs text-muted-foreground">{display(first(review, ["review_date", "date"]), "")}</span></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{display(first(review, ["review_text", "text", "content", "review_body"]), "Review text unavailable.")}</p></article>)}</div>;
}

export function AsinCheckerClient({ searchParams }: { searchParams: Promise<{ asin?: string; url?: string; q?: string }> }) {
  const params = use(searchParams);
  const initialQuery = params.asin || params.url || params.q || "";
  const [query, setQuery] = useState(initialQuery);
  const [research, setResearch] = useState<ResearchData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function fetchProduct(input: string) {
    setError(null);
    setResearch(null);
    const asin = extractAsin(input);
    if (!asin && !input.includes("amazon.")) { setError("Please enter a valid ASIN or Amazon product URL."); return; }
    startTransition(async () => {
      try {
        const res = await fetch("/api/amazon/product-details", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ asin: asin || undefined, url: !asin ? input : undefined, country: "US" }) });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json.error || `Request failed (${res.status})`);
        const product = unwrapProduct(json);
        if (!product) throw new Error("No product data returned from API");
        setResearch({ data: product, offers: json.offers, reviews: json.reviews, topReviews: json.topReviews, asin: json.asin || product.asin || asin! });
        if (asin) router.replace(`/asin-checker?asin=${asin}`, { scroll: false });
      } catch (err) { setError(err instanceof Error ? err.message : "Failed to fetch product"); }
    });
  }

  useEffect(() => { if (initialQuery) fetchProduct(initialQuery); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const product = research?.data;
  const offers = research?.offers;
  const reviews = research?.reviews;
  const images = product ? first(product, ["product_photos", "product_images", "images"], []) : [];
  const rating = product ? first(product, ["product_star_rating", "rating", "average_rating"]) : undefined;
  const reviewCount = product ? first(product, ["product_num_ratings", "num_ratings", "review_count", "reviews_count"]) : undefined;
  const price = product ? first(product, ["product_price", "price", "current_price", "buy_box_price"]) : undefined;
  const originalPrice = product ? first(product, ["product_original_price", "original_price", "list_price"]) : undefined;
  const bsr = product ? first(product, ["best_sellers_rank", "bsr", "sales_rank", "rank"]) : undefined;
  const category = product ? first(product, ["category", "category_name", "product_category", "browse_node_name"]) : undefined;
  const sellers = product ? first(product, ["number_of_sellers", "seller_count", "num_sellers"]) : undefined;
  const estimatedSales = product ? first(product, ["estimated_monthly_sales", "monthly_sales"]) : undefined;
  const estimatedRevenue = product ? first(product, ["estimated_monthly_revenue", "monthly_revenue"]) : undefined;
  const offerRows = asArray(offers);
  const reviewRows = asArray(reviews);
  const distribution = first(product, ["rating_distribution", "review_distribution", "ratings_distribution"], first(reviews || {}, ["rating_distribution", "review_distribution"], null));

  return (
    <div className="space-y-8">
      <form onSubmit={(e) => { e.preventDefault(); if (query.trim()) fetchProduct(query.trim()); }} className="mx-auto max-w-3xl">
        <div className="relative flex items-center"><Search className="absolute left-4 h-5 w-5 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter ASIN or Amazon product URL" className="w-full rounded-2xl border border-border/60 bg-card py-4 pl-12 pr-28 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" disabled={isPending} /><button disabled={isPending || !query.trim()} className="absolute right-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze"}</button></div>
      </form>

      {error && <div className="mx-auto max-w-3xl rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</div>}

      {isPending && !product && <div className="space-y-5 animate-pulse"><div className="h-80 rounded-2xl bg-muted" /><div className="h-32 rounded-2xl bg-muted" /><div className="h-64 rounded-2xl bg-muted" /></div>}

      {product && !isPending && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm"><Gallery product={product} /></div>
            <div className="space-y-5 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">{product.brand && <span className="text-sm font-semibold text-orange-600">{display(product.brand)}</span>}{product.is_best_seller && <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600"><Tag className="mr-1 inline h-3 w-3" />Best Seller</span>}</div>
              <div><h2 className="text-2xl font-bold leading-tight sm:text-3xl">{display(product.product_title || product.title, "Untitled product")}</h2><p className="mt-2 text-sm text-muted-foreground">ASIN <span className="font-mono font-medium">{research.asin}</span>{category && <> · {display(category)}</>}</p></div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Current price" value={formatCurrency(price, product.currency || "USD")} /><Metric label="Original price" value={formatCurrency(originalPrice, product.currency || "USD")} /><Metric label="Rating" value={rating ? `${rating} / 5` : "—"} hint={reviewCount ? `${formatNumber(Number(reviewCount))} reviews` : undefined} /><Metric label="Availability" value={first(product, ["product_availability", "availability", "stock"], "—")} /></div>
              <div className="flex flex-wrap gap-3"><a href={`https://www.amazon.com/dp/${research.asin}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">Open Amazon <ExternalLink className="h-4 w-4" /></a><button type="button" className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-secondary">Save product</button><button type="button" className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-secondary">Export</button></div>
            </div>
          </div>

          <Section title="Sales & market metrics" icon={<TrendingUp className="h-4 w-4" />}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Metric label="Estimated monthly sales" value={estimatedSales ?? "Not available"} hint="Estimate when supported by the data source" /><Metric label="Estimated monthly revenue" value={estimatedRevenue ?? "Not available"} /><Metric label="BSR" value={display(bsr, "Not available")} /><Metric label="Category" value={display(category, "Not available")} /></div>
            <div className="mt-4 rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">Price history and sales history require stored snapshots over time. AmazonScope can use Supabase to build these charts instead of inventing historical values.</div>
          </Section>

          <Section title="Competition" icon={<Users className="h-4 w-4" />}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Metric label="Sellers" value={display(sellers, offerRows.length ? String(offerRows.length) : "Not available")} /><Metric label="Number of offers" value={offerRows.length || "Not available"} /><Metric label="Buy Box" value={display(first(product, ["buy_box_seller", "buy_box_owner", "buy_box"]), "Not available")} /><Metric label="FBA / FBM" value={display(first(product, ["fulfillment", "fulfillment_type", "buy_box_fulfillment"]), "See offers")} /></div>
            <div className="mt-5"><OfferTable offers={offers} /></div>
          </Section>

          <Section title="Reviews & review analysis" icon={<Star className="h-4 w-4" />}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Metric label="Rating" value={rating ? `${rating} / 5` : "—"} /><Metric label="Review count" value={reviewCount ? formatNumber(Number(reviewCount)) : "—"} /><Metric label="Rating distribution" value={distribution ? "Available" : "Not available"} /><Metric label="Recent reviews" value={reviewRows.length || "Not available"} /></div>
            {distribution && <div className="mt-5"><KeyValueGrid value={distribution} /></div>}
            <div className="mt-5"><ReviewList reviews={reviews} topReviews={research.topReviews} /></div>
          </Section>

          <Section title="Product information" icon={<Package className="h-4 w-4" />}>
            <KeyValueGrid value={{ ...first(product, ["product_information"], {}), ...first(product, ["product_details"], {}), dimensions: first(product, ["product_dimensions", "dimensions"]), weight: first(product, ["item_weight", "weight"]), manufacturer: first(product, ["manufacturer"]), model: first(product, ["item_model_number", "model_number"]), first_available: first(product, ["date_first_available", "first_available", "release_date"]) }} />
          </Section>

          <Section title="Images & gallery" icon={<ImageIcon className="h-4 w-4" />}>
            {Array.isArray(images) && images.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">{images.slice(0, 18).map((image: string, i: number) => <div key={`${image}-${i}`} className="aspect-square rounded-xl border border-border/60 bg-white p-2"><img src={image} alt={`Gallery ${i + 1}`} className="h-full w-full object-contain" /></div>)}</div> : <p className="text-sm text-muted-foreground">No gallery images returned.</p>}
          </Section>

          <div className="grid gap-6 lg:grid-cols-2">
            <Section title="Variations" icon={<Layers3 className="h-4 w-4" />}><KeyValueGrid value={first(product, ["variations", "product_variations"], null)} /></Section>
            <Section title="Offers" icon={<ShoppingCart className="h-4 w-4" />}><OfferTable offers={offers} /></Section>
          </div>

          <Section title="Product opportunity" icon={<BarChart3 className="h-4 w-4" />}>
            <div className="grid gap-4 md:grid-cols-3"><div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5"><CheckCircle2 className="h-5 w-5 text-emerald-600" /><h3 className="mt-3 font-semibold">Pros</h3><p className="mt-2 text-sm text-muted-foreground">Strong signals include {rating ? `a ${rating}/5 rating` : "available product data"}{reviewCount ? ` and ${formatNumber(Number(reviewCount))} reviews` : ""}.</p></div><div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5"><TrendingUp className="h-5 w-5 text-orange-600" /><h3 className="mt-3 font-semibold">Competition assessment</h3><p className="mt-2 text-sm text-muted-foreground">{offerRows.length ? `${offerRows.length} offers were returned for the first page.` : "Offer competition data is unavailable."}</p></div><div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5"><XCircle className="h-5 w-5 text-red-600" /><h3 className="mt-3 font-semibold">Risks</h3><p className="mt-2 text-sm text-muted-foreground">Historical sales, keyword demand and profitability need additional data before making a sell/no-sell decision.</p></div></div>
          </Section>

          <Section title="AI analysis" icon={<ShieldCheck className="h-4 w-4" />}>
            <div className="rounded-xl border border-dashed border-orange-500/30 bg-orange-500/5 p-5"><h3 className="font-semibold">AI Product Opportunity</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The dashboard is now structured for AI analysis using the product, competition and review datasets. Gemini integration can turn these signals into a full opportunity score, pros/cons, competition assessment and keyword/product insights without exposing API keys to the browser.</p><div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-card px-3 py-1">Demand</span><span className="rounded-full bg-card px-3 py-1">Competition</span><span className="rounded-full bg-card px-3 py-1">Reviews</span><span className="rounded-full bg-card px-3 py-1">Pricing</span><span className="rounded-full bg-card px-3 py-1">Keywords</span></div></div>
          </Section>
        </div>
      )}

      {!product && !isPending && !error && <div className="py-16 text-center text-muted-foreground"><Search className="mx-auto mb-4 h-12 w-12 opacity-30" /><p>Enter an ASIN or Amazon URL to generate the product intelligence report.</p></div>}
    </div>
  );
}

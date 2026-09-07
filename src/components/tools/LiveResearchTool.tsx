"use client";

import { useState } from "react";
import { Loader2, Search, ExternalLink, RefreshCw, AlertCircle } from "lucide-react";

function arr(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  for (const k of ["products", "items", "deals", "results", "data", "offers", "reviews", "categories"]) if (Array.isArray(value[k])) return value[k];
  return [];
}
function pick(o: any, keys: string[], fallback = "—") {
  if (!o || typeof o !== "object") return fallback;
  for (const k of keys) { const v = k.split(".").reduce((x, y) => x?.[y], o); if (v !== undefined && v !== null && v !== "") return typeof v === "object" ? JSON.stringify(v) : String(v); }
  return fallback;
}

export function LiveResearchTool({ kind }: { kind: "deals" | "categories" | "best-sellers" | "reviews" | "seller" }) {
  const [input, setInput] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  async function load(nextPage = page) {
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams({ action: kind, page: String(nextPage), country: "US" });
      if (kind === "seller") params.set("seller_id", input.trim());
      if (kind === "reviews") params.set("asin", input.trim());
      const res = await fetch(`/api/amazon/tools?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `Request failed (${res.status})`);
      setData(json.data ?? json);
      setPage(nextPage);
    } catch (e) { setError(e instanceof Error ? e.message : "Request failed"); }
    finally { setLoading(false); }
  }

  const rows = arr(data);
  const needsInput = kind === "seller" || kind === "reviews";
  const title = kind === "deals" ? "Live Amazon Deals" : kind === "categories" ? "Amazon Category Explorer" : kind === "best-sellers" ? "Live Best Sellers" : kind === "seller" ? "Seller Intelligence" : "Review Analyzer";
  const subtitle = kind === "seller" ? "Search a real seller ID and inspect profile + product data." : kind === "reviews" ? "Enter an ASIN to load real customer reviews from Amazon data." : "Live data from the connected Amazon research API — no demo records.";

  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div className="mb-8 rounded-3xl border border-border/60 bg-card p-7 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div><div className="mb-2 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600">LIVE DATA</div><h1 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p></div>
        {needsInput && <div className="flex w-full max-w-xl gap-2"><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && load(1)} placeholder={kind === "seller" ? "Seller ID" : "ASIN"} className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500/40"/><button onClick={() => load(1)} disabled={loading || !input.trim()} className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white disabled:opacity-50">{loading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Search className="h-4 w-4"/>}Search</button></div>}
      </div>
      {!needsInput && <button onClick={() => load(1)} disabled={loading} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{loading ? <Loader2 className="h-4 w-4 animate-spin"/> : <RefreshCw className="h-4 w-4"/>}Load live data</button>}
    </div>

    {error && <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0"/><div><b>Live API error</b><p className="mt-1">{error}</p></div></div>}

    {kind === "seller" && data && <div className="mb-6 grid gap-4 sm:grid-cols-3">{[["Seller", pick(data.profile?.data || data.profile, ["seller_name","name","store_name"], input)], ["Rating", pick(data.profile?.data || data.profile, ["seller_rating","rating","star_rating"])], ["Products", String(arr(data.products).length || pick(data.profile?.data || data.profile, ["product_count","products_count"], "—"))]].map(([l,v]) => <div key={l} className="rounded-2xl border border-border/60 bg-card p-5"><p className="text-xs text-muted-foreground">{l}</p><p className="mt-1 text-xl font-bold">{v}</p></div>)}</div>}

    {data && <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
      {rows.length ? <div className="divide-y divide-border/50">{rows.map((item, i) => { const asin = pick(item,["asin","product_asin","ASIN"],""); const image = pick(item,["product_photo","image","thumbnail","product_image"],""); const title = pick(item,["product_title","title","name","deal_title","category_name"],`Result ${i+1}`); const price = pick(item,["product_price","price","deal_price","current_price"]); const old = pick(item,["product_original_price","original_price","list_price"]); const rating = pick(item,["product_star_rating","rating","average_rating"]); const reviews = pick(item,["product_num_ratings","review_count","reviews_count"]); return <div key={i} className="flex gap-4 p-5 hover:bg-muted/30">{image !== "—" && <img src={image} alt="" className="h-24 w-24 shrink-0 rounded-xl bg-white object-contain"/>}<div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="rounded-md bg-orange-500/10 px-2 py-1 text-[11px] font-bold text-orange-600">{asin || "AMAZON"}</span>{rating !== "—" && <span className="text-xs">★ {rating}</span>}</div><h3 className="mt-2 line-clamp-2 font-semibold">{title}</h3><div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground"><span className="font-semibold text-foreground">{price}</span>{old !== "—" && <span className="line-through">{old}</span>}{reviews !== "—" && <span>{reviews} reviews</span>}</div></div>{asin && <a href={`https://www.amazon.com/dp/${asin}`} target="_blank" rel="noreferrer" className="self-center rounded-lg border border-border p-2 hover:bg-secondary"><ExternalLink className="h-4 w-4"/></a>}</div>})}</div> : <div className="p-14 text-center text-muted-foreground">{data ? "The API returned no list items for this request." : "Run the live search to load real Amazon data."}</div>}
    </div>}

    {data && (kind === "deals" || kind === "best-sellers" || kind === "reviews" || kind === "seller") && <div className="mt-5 flex justify-between"><button disabled={loading || page <= 1} onClick={() => load(page-1)} className="rounded-xl border px-4 py-2 text-sm disabled:opacity-40">Previous</button><span className="px-3 py-2 text-sm text-muted-foreground">Page {page}</span><button disabled={loading || rows.length === 0} onClick={() => load(page+1)} className="rounded-xl border px-4 py-2 text-sm disabled:opacity-40">Next</button></div>}
  </div>;
}

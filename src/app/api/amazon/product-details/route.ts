import { NextRequest, NextResponse } from "next/server";
import {
  extractAsin,
  getProductDetails,
  getProductOffers,
  getProductReviews,
  getTopProductReviews,
} from "@/lib/amazon/client";

function unwrap(value: any): any {
  if (!value || typeof value !== "object") return value;
  if (value.data && typeof value.data === "object") return value.data;
  return value;
}

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findDeep(root: any, keys: string[], maxDepth = 8): any {
  const wanted = new Set(keys.map(normalizeKey));
  const seen = new Set<any>();

  function visit(value: any, depth: number): any {
    if (depth > maxDepth || value === null || value === undefined) return undefined;
    if (typeof value !== "object" || seen.has(value)) return undefined;
    seen.add(value);

    if (Array.isArray(value)) {
      for (const item of value) {
        const found = visit(item, depth + 1);
        if (found !== undefined && found !== null && found !== "") return found;
      }
      return undefined;
    }

    for (const [key, child] of Object.entries(value)) {
      if (wanted.has(normalizeKey(key)) && child !== undefined && child !== null && child !== "") {
        return child;
      }
    }

    for (const child of Object.values(value)) {
      const found = visit(child, depth + 1);
      if (found !== undefined && found !== null && found !== "") return found;
    }

    return undefined;
  }

  return visit(root, 0);
}

function extractMarketMetrics(product: any, offers: any, reviews: any) {
  const bsr = findDeep(product, [
    "best_sellers_rank",
    "best_seller_rank",
    "sales_rank",
    "salesrank",
    "bsr",
  ]);

  const category = findDeep(product, [
    "category",
    "category_name",
    "product_category",
    "browse_node_name",
    "department",
  ]);

  const sellers = findDeep(product, [
    "number_of_sellers",
    "seller_count",
    "num_sellers",
  ]);

  const monthlySales = findDeep(product, [
    "estimated_monthly_sales",
    "monthly_sales",
    "bought_past_month",
    "bought_in_past_month",
  ]);

  const monthlyRevenue = findDeep(product, [
    "estimated_monthly_revenue",
    "monthly_revenue",
  ]);

  const offerRows = Array.isArray(offers)
    ? offers
    : Array.isArray(offers?.offers)
      ? offers.offers
      : Array.isArray(offers?.items)
        ? offers.items
        : [];

  const reviewCount = findDeep(product, [
    "product_num_ratings",
    "num_ratings",
    "review_count",
    "reviews_count",
  ]) ?? findDeep(reviews, ["review_count", "reviews_count", "total_reviews"]);

  const sellerCount = sellers ?? (offerRows.length ? offerRows.length : undefined);

  return {
    best_sellers_rank: bsr,
    category,
    seller_count: sellerCount,
    estimated_monthly_sales: monthlySales,
    estimated_monthly_revenue: monthlyRevenue,
    review_count: reviewCount,
    data_source: "RapidAPI Real-Time Amazon Data",
    note: monthlySales && !monthlyRevenue
      ? "Amazon exposes a bought-past-month demand signal for this listing; monthly revenue is not directly provided by this endpoint."
      : undefined,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { asin, url, country = "US" } = body;

    if (!asin && url) asin = extractAsin(url);
    if (!asin) return NextResponse.json({ error: "ASIN or valid Amazon product URL is required" }, { status: 400 });
    if (!/^[A-Z0-9]{10}$/i.test(asin)) return NextResponse.json({ error: "Invalid ASIN format" }, { status: 400 });

    const normalizedAsin = asin.toUpperCase();
    const detailsResponse = await getProductDetails({ asin: normalizedAsin, country });

    if (detailsResponse?.status === "ERROR" || detailsResponse?.error) {
      const raw = detailsResponse.error;
      const message = typeof raw === "string" ? raw : raw?.message || detailsResponse.message || "Amazon API returned an error";
      return NextResponse.json({ error: message }, { status: 502 });
    }

    const [offersResult, reviewsResult, topReviewsResult] = await Promise.allSettled([
      getProductOffers({ asin: normalizedAsin, country, page: 1, limit: 20 }),
      getProductReviews({ asin: normalizedAsin, country, page: 1 }),
      getTopProductReviews({ asin: normalizedAsin, country }),
    ]);

    const offers = offersResult.status === "fulfilled" ? unwrap(offersResult.value) : null;
    const reviews = reviewsResult.status === "fulfilled" ? unwrap(reviewsResult.value) : null;
    const topReviews = topReviewsResult.status === "fulfilled" ? unwrap(topReviewsResult.value) : null;
    const product = unwrap(detailsResponse);
    const marketMetrics = extractMarketMetrics(product, offers, reviews);

    return NextResponse.json({
      asin: normalizedAsin,
      data: {
        ...(product && typeof product === "object" ? product : {}),
        ...marketMetrics,
      },
      offers,
      reviews,
      topReviews,
      marketMetrics,
      partialData: {
        offers: offersResult.status === "rejected",
        reviews: reviewsResult.status === "rejected",
        topReviews: topReviewsResult.status === "rejected",
      },
    });
  } catch (error) {
    console.error("[product-details]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch product research data" },
      { status: 500 }
    );
  }
}

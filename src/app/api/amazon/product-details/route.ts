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

    return NextResponse.json({
      asin: normalizedAsin,
      data: unwrap(detailsResponse),
      offers: offersResult.status === "fulfilled" ? unwrap(offersResult.value) : null,
      reviews: reviewsResult.status === "fulfilled" ? unwrap(reviewsResult.value) : null,
      topReviews: topReviewsResult.status === "fulfilled" ? unwrap(topReviewsResult.value) : null,
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

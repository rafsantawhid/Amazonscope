import { NextRequest, NextResponse } from "next/server";
import {
  getBestSellers,
  getDeals,
  getProductCategoryList,
  getProductReviews,
  getSellerProfile,
  getSellerProducts,
} from "@/lib/amazon/client";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const p = req.nextUrl.searchParams;
    const action = p.get("action") || "deals";
    const country = (p.get("country") || "US") as any;
    const page = Number(p.get("page") || "1");

    let data: unknown;
    switch (action) {
      case "deals":
        data = await getDeals({ country, page });
        break;
      case "best-sellers":
        data = await getBestSellers({
          country,
          page,
          category: p.get("category") || "aps",
          type: (p.get("type") || "BEST_SELLERS") as any,
        });
        break;
      case "categories":
        data = await getProductCategoryList({ country });
        break;
      case "seller": {
        const sellerId = p.get("seller_id")?.trim();
        if (!sellerId) return NextResponse.json({ error: "Seller ID is required" }, { status: 400 });
        const [profile, products] = await Promise.allSettled([
          getSellerProfile({ seller_id: sellerId, country }),
          getSellerProducts({ seller_id: sellerId, country, page }),
        ]);
        return NextResponse.json({
          sellerId,
          profile: profile.status === "fulfilled" ? profile.value : null,
          products: products.status === "fulfilled" ? products.value : null,
          errors: {
            profile: profile.status === "rejected" ? String(profile.reason) : null,
            products: products.status === "rejected" ? String(products.reason) : null,
          },
        });
      }
      case "reviews": {
        const asin = p.get("asin")?.trim().toUpperCase();
        if (!asin) return NextResponse.json({ error: "ASIN is required" }, { status: 400 });
        data = await getProductReviews({ asin, country, page, sort_by: p.get("sort_by") || undefined, star_rating: p.get("star_rating") || undefined });
        break;
      }
      default:
        return NextResponse.json({ error: "Unknown research tool" }, { status: 400 });
    }
    return NextResponse.json({ data, action, country, page });
  } catch (error) {
    console.error("[amazon/tools]", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Amazon research request failed" }, { status: 502 });
  }
}

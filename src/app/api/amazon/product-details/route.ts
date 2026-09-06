import { NextRequest, NextResponse } from "next/server";
import { getProductDetails, extractAsin } from "@/lib/amazon/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { asin, url, country = "US" } = body;

    if (!asin && url) {
      asin = extractAsin(url);
    }

    if (!asin) {
      return NextResponse.json(
        { error: "ASIN or valid Amazon product URL is required" },
        { status: 400 }
      );
    }

    if (!/^[A-Z0-9]{10}$/i.test(asin)) {
      return NextResponse.json({ error: "Invalid ASIN format" }, { status: 400 });
    }

    const data = await getProductDetails({
      asin: asin.toUpperCase(),
      country,
    });

    return NextResponse.json({ data, asin: asin.toUpperCase() });
  } catch (error) {
    console.error("[product-details]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch product details",
      },
      { status: 500 }
    );
  }
}

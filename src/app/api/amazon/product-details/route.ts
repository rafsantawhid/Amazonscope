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

    const response = await getProductDetails({
      asin: asin.toUpperCase(),
      country,
    });

    // RapidAPI wraps the product in { status, request_id, data: product }
    // Normalize so the client always receives the actual product object
    const product =
      response?.data && typeof response.data === "object" && !Array.isArray(response.data)
        ? response.data
        : response;

    // Guard against error status from RapidAPI
    if (response?.status === "ERROR" || response?.error) {
      const errorMessage =
        typeof response?.error === "string"
          ? response.error
          : response?.error?.message;
      const message = errorMessage || response?.message || "RapidAPI returned an error";
      return NextResponse.json({ error: message }, { status: 502 });
    }

    return NextResponse.json({
      data: product,
      asin: asin.toUpperCase(),
    });
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

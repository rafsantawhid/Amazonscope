/**
 * AmazonScope - Official RapidAPI Real-Time Amazon Data Client
 * Production-ready with caching, retries, and typed responses
 */

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST =
  process.env.RAPIDAPI_HOST || "real-time-amazon-data.p.rapidapi.com";

if (!RAPIDAPI_KEY && process.env.NODE_ENV === "production") {
  console.warn("RAPIDAPI_KEY is not set");
}

export type CountryCode =
  | "US" | "AU" | "BR" | "CA" | "CN" | "FR" | "DE" | "IN" | "IT" | "MX"
  | "NL" | "SG" | "ES" | "TR" | "AE" | "GB" | "JP" | "SA" | "PL" | "SE"
  | "BE" | "EG" | "ZA" | "IE";

interface RequestOptions {
  cacheTtlSeconds?: number;
  retries?: number;
}

export interface AmazonApiError {
  message?: string;
  code?: string;
  [key: string]: unknown;
}

export interface AmazonProductDetailsResponse<T = Record<string, unknown>> {
  status?: string;
  request_id?: string;
  data?: T;
  error?: AmazonApiError | string;
  message?: string;
  [key: string]: unknown;
}

async function amazonFetch<T>(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined> = {},
  options: RequestOptions = {}
): Promise<T> {
  if (!RAPIDAPI_KEY) {
    throw new Error("RAPIDAPI_KEY environment variable is required");
  }

  const url = new URL(`https://${RAPIDAPI_HOST}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const maxRetries = options.retries ?? 2;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": RAPIDAPI_HOST,
          "Content-Type": "application/json",
        },
        next: options.cacheTtlSeconds
          ? { revalidate: options.cacheTtlSeconds }
          : undefined,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`RapidAPI error ${res.status}: ${text.slice(0, 200)}`);
      }

      const data = await res.json();
      return data as T;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
      }
    }
  }

  throw lastError ?? new Error("Unknown RapidAPI error");
}

export async function searchProducts(params: {
  query: string;
  page?: number;
  country?: CountryCode;
  sort_by?: "RELEVANCE" | "LOWEST_PRICE" | "HIGHEST_PRICE" | "REVIEWS" | "NEWEST" | "BEST_SELLERS";
  category?: string;
  min_price?: number;
  max_price?: number;
  product_condition?: string;
  is_prime?: boolean;
}) {
  return amazonFetch("/search", {
    query: params.query,
    page: params.page ?? 1,
    country: params.country ?? "US",
    sort_by: params.sort_by ?? "RELEVANCE",
    category: params.category,
    min_price: params.min_price,
    max_price: params.max_price,
    product_condition: params.product_condition,
    is_prime: params.is_prime,
  });
}

export async function getProductDetails(params: {
  asin: string;
  country?: CountryCode;
  language?: string;
}): Promise<AmazonProductDetailsResponse> {
  return amazonFetch<AmazonProductDetailsResponse>("/product-details", {
    asin: params.asin,
    country: params.country ?? "US",
    language: params.language,
  });
}

export async function getProductOffers(params: {
  asin: string;
  country?: CountryCode;
  page?: number;
  limit?: number;
}) {
  return amazonFetch("/product-offers", {
    asin: params.asin,
    country: params.country ?? "US",
    page: params.page ?? 1,
    limit: params.limit ?? 20,
  });
}

export async function getProductReviews(params: {
  asin: string;
  country?: CountryCode;
  page?: number;
  sort_by?: string;
  star_rating?: string;
}) {
  return amazonFetch("/product-reviews", {
    asin: params.asin,
    country: params.country ?? "US",
    page: params.page ?? 1,
    sort_by: params.sort_by,
    star_rating: params.star_rating,
  });
}

export async function getTopProductReviews(params: {
  asin: string;
  country?: CountryCode;
}) {
  return amazonFetch("/top-product-reviews", {
    asin: params.asin,
    country: params.country ?? "US",
  });
}

export async function getSellerProfile(params: {
  seller_id: string;
  country?: CountryCode;
}) {
  return amazonFetch("/seller-profile", {
    seller_id: params.seller_id,
    country: params.country ?? "US",
  });
}

export async function getSellerProducts(params: {
  seller_id: string;
  country?: CountryCode;
  page?: number;
}) {
  return amazonFetch("/seller-products", {
    seller_id: params.seller_id,
    country: params.country ?? "US",
    page: params.page ?? 1,
  });
}

export async function getBestSellers(params: {
  category?: string;
  type?: "BEST_SELLERS" | "NEW_RELEASES" | "MOVERS_AND_SHAKERS" | "MOST_WISHED_FOR" | "GIFT_IDEAS";
  country?: CountryCode;
  page?: number;
}) {
  return amazonFetch("/best-sellers", {
    category: params.category ?? "aps",
    type: params.type ?? "BEST_SELLERS",
    country: params.country ?? "US",
    page: params.page ?? 1,
  });
}

export async function getDeals(params: {
  country?: CountryCode;
  page?: number;
}) {
  return amazonFetch("/deals", {
    country: params.country ?? "US",
    page: params.page ?? 1,
  });
}

export async function getProductCategoryList(params: {
  country?: CountryCode;
}) {
  return amazonFetch("/product-category-list", {
    country: params.country ?? "US",
  });
}

export function extractAsin(input: string): string | null {
  const cleaned = input.trim();
  if (/^[A-Z0-9]{10}$/i.test(cleaned)) return cleaned.toUpperCase();

  const match =
    cleaned.match(/\/dp\/([A-Z0-9]{10})/i) ||
    cleaned.match(/\/gp\/product\/([A-Z0-9]{10})/i) ||
    cleaned.match(/\/ASIN\/([A-Z0-9]{10})/i) ||
    cleaned.match(/asin=([A-Z0-9]{10})/i);

  return match ? match[1].toUpperCase() : null;
}

import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini AI is not configured. Add GEMINI_API_KEY to the server environment." },
        { status: 500 },
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { prompt, product, offers, reviews, topReviews, asin } = body as {
      prompt?: string;
      product?: unknown;
      offers?: unknown;
      reviews?: unknown;
      topReviews?: unknown;
      asin?: string;
    };

    if (!product || typeof product !== "object") {
      return NextResponse.json({ error: "Product data is required." }, { status: 400 });
    }

    const userPrompt = typeof prompt === "string" && prompt.trim()
      ? prompt.trim()
      : "Give me a concise Amazon seller opportunity analysis for this product.";

    const productContext = JSON.stringify({ asin, product, offers, reviews, topReviews });
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `You are AmazonScope, an Amazon product research analyst. Analyze only the supplied Amazon data. Never invent sales, revenue, rank, seller counts, or other missing metrics. Clearly distinguish facts from interpretations.\n\nUser request:\n${userPrompt}\n\nAmazon product data:\n${productContext}`,
      config: {
        temperature: 0.3,
        maxOutputTokens: 1200,
      },
    });

    const text = response.text?.trim();
    if (!text) {
      return NextResponse.json({ error: "Gemini returned an empty response." }, { status: 502 });
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini AI error:", error);
    const message = error instanceof Error ? error.message : "Gemini AI request failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

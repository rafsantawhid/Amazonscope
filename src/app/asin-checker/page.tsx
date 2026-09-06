import { Metadata } from "next";
import { AsinCheckerClient } from "./AsinCheckerClient";

export const metadata: Metadata = {
  title: "Amazon ASIN Checker — Free Product Details & Research",
  description:
    "Instantly check any Amazon ASIN or product URL. Get title, price, rating, BSR, reviews, images, variations, seller info and more with AmazonScope.",
  keywords: [
    "Amazon ASIN Checker",
    "ASIN lookup",
    "Amazon product details",
    "Amazon product research",
  ],
  openGraph: {
    title: "Amazon ASIN Checker | AmazonScope",
    description: "Free real-time Amazon ASIN and product URL checker.",
  },
};

export default function AsinCheckerPage({
  searchParams,
}: {
  searchParams: Promise<{ asin?: string; url?: string; q?: string }>;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Amazon <span className="gradient-text">ASIN Checker</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Enter an ASIN, Amazon product URL or GTIN to get complete product
          intelligence instantly.
        </p>
      </div>

      <AsinCheckerClient searchParams={searchParams} />
    </div>
  );
}

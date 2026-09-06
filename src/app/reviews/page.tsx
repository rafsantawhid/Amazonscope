import { Metadata } from "next";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Review Analyzer — AmazonScope",
};

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <Star className="mx-auto h-12 w-12 text-orange-500 mb-4" />
      <h1 className="text-3xl font-bold">Review <span className="gradient-text">Analyzer</span></h1>
      <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
        Deep analysis of customer reviews, rating distribution and verified purchases. Use the ASIN Checker to start analyzing a product.
      </p>
    </div>
  );
}

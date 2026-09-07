import { Metadata } from "next";
import { LiveResearchTool } from "@/components/tools/LiveResearchTool";

export const metadata: Metadata = {
  title: "Review Analyzer — AmazonScope",
  description: "Analyze real Amazon customer reviews by ASIN.",
};

export default function ReviewsPage() {
  return <LiveResearchTool kind="reviews" />;
}

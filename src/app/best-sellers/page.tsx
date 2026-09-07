import { Metadata } from "next";
import { LiveResearchTool } from "@/components/tools/LiveResearchTool";

export const metadata: Metadata = {
  title: "Amazon Best Sellers — Live Rankings | AmazonScope",
  description: "Explore live Amazon best seller rankings and product opportunities.",
};

export default function BestSellersPage() {
  return <LiveResearchTool kind="best-sellers" />;
}

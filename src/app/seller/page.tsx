import { Metadata } from "next";
import { LiveResearchTool } from "@/components/tools/LiveResearchTool";

export const metadata: Metadata = {
  title: "Amazon Seller Lookup — Live Intelligence | AmazonScope",
  description: "Lookup real Amazon seller profiles and product data.",
};

export default function SellerPage() {
  return <LiveResearchTool kind="seller" />;
}

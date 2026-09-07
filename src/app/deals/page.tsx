import { Metadata } from "next";
import { LiveResearchTool } from "@/components/tools/LiveResearchTool";

export const metadata: Metadata = {
  title: "Amazon Deals Explorer — Live Deals | AmazonScope",
  description: "Discover live Amazon deals and discount opportunities using connected Amazon data.",
};

export default function DealsPage() {
  return <LiveResearchTool kind="deals" />;
}

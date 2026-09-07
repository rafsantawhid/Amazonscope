import { Metadata } from "next";
import { LiveResearchTool } from "@/components/tools/LiveResearchTool";

export const metadata: Metadata = {
  title: "Amazon Categories — Live Data | AmazonScope",
  description: "Explore live Amazon category data and research opportunities.",
};

export default function CategoriesPage() {
  return <LiveResearchTool kind="categories" />;
}

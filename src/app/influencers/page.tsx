import { Metadata } from "next";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Influencer Hub — AmazonScope",
};

export default function InfluencersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <Users className="mx-auto h-12 w-12 text-orange-500 mb-4" />
      <h1 className="text-3xl font-bold">Influencer <span className="gradient-text">Hub</span></h1>
      <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
        Discover Amazon influencers, their posts and tagged products. Coming soon.
      </p>
    </div>
  );
}

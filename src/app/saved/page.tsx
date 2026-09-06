import { Metadata } from "next";
import { Bookmark } from "lucide-react";

export const metadata: Metadata = {
  title: "Saved Products — AmazonScope",
};

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <Bookmark className="mx-auto h-12 w-12 text-orange-500 mb-4" />
      <h1 className="text-3xl font-bold">Saved <span className="gradient-text">Products</span></h1>
      <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
        Your bookmarked products will appear here after you sign in.
      </p>
    </div>
  );
}

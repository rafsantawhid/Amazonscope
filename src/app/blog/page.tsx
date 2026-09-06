import { Metadata } from "next";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — AmazonScope",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <BookOpen className="mx-auto h-12 w-12 text-orange-500 mb-4" />
      <h1 className="text-3xl font-bold">AmazonScope <span className="gradient-text">Blog</span></h1>
      <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
        Product research tips, Amazon strategy and platform updates. Coming soon.
      </p>
    </div>
  );
}

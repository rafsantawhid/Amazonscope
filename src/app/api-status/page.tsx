import { Metadata } from "next";
import { Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "API Status — AmazonScope",
};

export default function ApiStatusPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <Activity className="mx-auto h-12 w-12 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold">API <span className="gradient-text">Status</span></h1>
      <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
        All systems operational. Real-time Amazon data is available.
      </p>
    </div>
  );
}

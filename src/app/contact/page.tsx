import { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — AmazonScope",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Get in <span className="gradient-text">touch</span>
      </h1>
      <p className="mt-4 text-muted-foreground">
        Questions, feedback or enterprise inquiries — we are here to help.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-8">
          <Mail className="mx-auto h-8 w-8 text-orange-500 mb-4" />
          <h3 className="font-semibold">Email</h3>
          <p className="mt-2 text-sm text-muted-foreground">support@amazonscope.com</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-8">
          <MessageSquare className="mx-auto h-8 w-8 text-orange-500 mb-4" />
          <h3 className="font-semibold">Feedback</h3>
          <p className="mt-2 text-sm text-muted-foreground">We read every message</p>
        </div>
      </div>
    </div>
  );
}

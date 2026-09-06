import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "AmazonScope — Amazon Product Intelligence Platform",
    template: "%s | AmazonScope",
  },
  description:
    "Enterprise Amazon ASIN Checker, Product Research, Seller Lookup, Reviews Analyzer, Best Sellers & Deals Intelligence. Powered by real-time Amazon data.",
  keywords: [
    "Amazon ASIN Checker",
    "Amazon Product Details",
    "Amazon Product Search",
    "Amazon Seller Lookup",
    "Amazon Review Checker",
    "Amazon Best Seller Rank",
    "Amazon Deals Finder",
    "Amazon Product Intelligence",
    "Helium 10 alternative",
    "Jungle Scout alternative",
  ],
  authors: [{ name: "AmazonScope" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AmazonScope",
    title: "AmazonScope — Amazon Product Intelligence Platform",
    description:
      "Search any ASIN, URL, seller or category and get rich analytics in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AmazonScope — Amazon Product Intelligence",
    description: "Enterprise Amazon product research platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

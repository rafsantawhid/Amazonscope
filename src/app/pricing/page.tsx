import { Metadata } from "next";
import Link from "next/link";
import { Check, Zap, Crown, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — AmazonScope",
  description: "Simple, transparent pricing for Amazon product intelligence. Start free, upgrade when you need more.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying AmazonScope",
    icon: Zap,
    features: [
      "10 ASIN lookups / day",
      "Basic product details",
      "Search history (7 days)",
      "Community support",
    ],
    cta: "Get Started",
    href: "/asin-checker",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious sellers & researchers",
    icon: Crown,
    features: [
      "Unlimited ASIN lookups",
      "Full product intelligence",
      "Seller lookup & analytics",
      "Deals & Best Sellers",
      "Review analyzer",
      "AI Assistant",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    href: "/dashboard",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams and agencies",
    icon: Building2,
    features: [
      "Everything in Pro",
      "API access",
      "Team seats",
      "Custom integrations",
      "Dedicated support",
      "SLA & onboarding",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Simple, transparent <span className="gradient-text">pricing</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Start free. Upgrade only when you need more power.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-8 ${plan.popular
                ? "border-orange-500 shadow-xl shadow-orange-500/10 scale-105"
                : "border-border/60 bg-card"
              }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-1 text-xs font-semibold text-white">
                Most Popular
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                plan.popular
                  ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white"
                  : "bg-secondary"
                }`}>
                <plan.icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold">{plan.name}</h2>
            </div>

            <div className="mb-2">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              className={`block w-full text-center rounded-xl py-3 font-semibold transition-all ${
                plan.popular
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
                  : "border border-border hover:bg-secondary"
                }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

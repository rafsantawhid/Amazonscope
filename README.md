# AmazonScope

**Amazon Product Intelligence Platform** — production-grade SaaS comparable to Helium 10 / Jungle Scout.

Built with Next.js 16, TypeScript, Tailwind CSS 4, Supabase, TanStack Query, Framer Motion and the official RapidAPI Real-Time Amazon Data API.

## Features (Foundation)

- Premium glassmorphism UI (Apple / Stripe / Linear inspired)
- Dark & Light mode
- Global smart search (ASIN / URL / keyword)
- ASIN Checker with rich product details
- RapidAPI client covering Product, Seller, Deals, Best Sellers, Categories endpoints
- Supabase schema for products, sellers, reviews, offers, cache, search history, saved products, AI chats
- SEO foundation (metadata, Open Graph, robots.txt)
- Server Actions + API routes ready
- Gemini AI Assistant architecture prepared

## Getting Started

### 1. Clone & Install

```bash
cd amazonscope
npm install
```

### 2. Environment Variables

Copy `.env.example` → `.env.local` and fill in:

```
RAPIDAPI_KEY=...
RAPIDAPI_HOST=real-time-amazon-data.p.rapidapi.com   # or mega version
GEMINI_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database

Run the SQL in `supabase/schema.sql` inside your Supabase project SQL editor.

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # App Router pages + API routes
│   ├── asin-checker/
│   ├── api/amazon/
│   ├── deals/
│   ├── categories/
│   └── ...
├── components/
│   ├── layout/             # Header, Footer, Providers
│   ├── search/
│   ├── product/
│   └── ui/
├── lib/
│   ├── amazon/             # RapidAPI client
│   ├── supabase/
│   ├── ai/                 # Gemini helpers
│   └── utils.ts
└── types/
```

## Next Steps (Roadmap)

1. **Cache layer** – write successful RapidAPI responses into `api_cache` + serve stale-while-revalidate
2. **Full Product Details page** (`/product/[asin]`) with gallery, variations, offers, review histogram
3. **Seller Lookup**, **Deals**, **Best Sellers**, **Categories** pages
4. **Review Analyzer** with rating distribution charts
5. **Gemini AI Assistant** (server-side only, chat history in Supabase)
6. **Auth + Dashboard + Saved Products**
7. **Pricing page + Stripe**
8. **XML Sitemap + JSON-LD**
9. **Rate-limit protection & usage quotas**

## API Endpoints Integrated (Client)

- `/search`
- `/product-details`
- `/product-offers`
- `/product-reviews`
- `/top-product-reviews`
- `/seller-profile`, `/seller-products`, `/seller-reviews`
- `/best-sellers`
- `/deals`, `/deal-products`
- `/product-category-list`
- ASIN ↔ GTIN utilities

## Design System

- Glassmorphism cards & sticky header
- Orange primary gradient
- Skeleton loading states
- Mobile-first responsive
- Accessible focus rings

---

**AmazonScope** — Built for serious Amazon sellers & researchers.

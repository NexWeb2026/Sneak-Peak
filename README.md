# Sneak-Peak

Sneak-Peak is a South African premium sneaker storefront demo built with Next.js App Router, TypeScript, Tailwind CSS, GSAP, Lenis, Framer Motion, Zustand, React Three Fiber, and Shopify-ready integration points.

## Features

- Scroll-driven 3D sneaker storytelling
- Responsive product catalogue with filters and search
- Product galleries, size guidance, delivery estimates, and restock forms
- Persistent cart, saved products, recently viewed products, and drop reminders
- South African rand pricing and local checkout fields
- Drop calendar and demo checkout
- South African policy templates

## Requirements

- Node.js 22
- npm 11 or a compatible npm release

The repository includes an `.nvmrc` so compatible Node version managers can select the expected runtime automatically.

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

The demo catalogue and cart work without environment variables. To prepare a future Shopify connection, copy `.env.local.example` to `.env.local` and replace the placeholders:

```bash
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-api-token
```

Never commit `.env.local` or real credentials. For Netlify, add production values under **Project configuration > Environment variables**.

The Storefront API integration points live in `src/lib/shopify.ts`. They currently fall back to the local demo catalogue until the query and mutation TODOs are implemented.

## Quality checks

```bash
npm run lint
npm run build
```

## Deploy to Netlify

This project uses Netlify's automatically managed Next.js adapter. Do not install or pin the legacy `@netlify/plugin-nextjs` package.

1. Push the repository to GitHub.
2. In Netlify, select **Add new project > Import an existing project**.
3. Choose the GitHub repository.
4. Netlify will read `netlify.toml` and use:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node.js: `22`
5. Add the optional Shopify variables only when the live Shopify integration is ready.
6. Deploy the site.

Every push to the connected branch will create a new Netlify deployment.

## Push to GitHub

```bash
git add .
git commit -m "Build Sneak-Peak storefront demo"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

If an `origin` remote already exists, update it with `git remote set-url origin ...` instead of adding it again.

## Asset strategy

The repository commits only the model files and optimized textures used at runtime. Original source archives and superseded high-resolution exports remain available locally but are excluded from Git. Product imagery is currently served from Unsplash, while transparent gallery cutouts and 3D assets are served from `public`.

See `ASSET-NOTICE.md` before making the repository or deployment public.

## Demo boundaries

Checkout, restock notifications, drop reminders, and saved products are presentation flows. No payment is taken and no customer email is sent until those features are connected to production services.

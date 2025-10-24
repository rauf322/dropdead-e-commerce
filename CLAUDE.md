# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development**
- `npm run dev` - Start Next.js development server on port 3000
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

**Database**
- `npm run postinstall` - Generate Prisma Client (runs automatically after install)
- `npx prisma generate` - Manually generate Prisma Client
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma studio` - Open Prisma Studio GUI
- `npx prisma db seed` - Seed database with sample data (via db/seed.ts)

## Architecture

This is a Next.js 15 e-commerce application using the App Router with a PostgreSQL database via Prisma ORM.

### Project Structure

```
src/
├── app/                    # Next.js App Router (routing only)
│   ├── (root)/            # Main route group
│   │   ├── page.tsx       # Homepage
│   │   ├── layout.tsx     # Route-specific layout
│   │   └── product/[slug]/ # Dynamic product pages
│   ├── layout.tsx         # Root layout with ThemeProvider
│   ├── loading.tsx        # Global loading state
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── ui/               # shadcn/ui components (Button, Card, Sheet, etc.)
│   └── shared/           # Shared business components (Header, Product, etc.)
├── lib/                  # Business logic and utilities
│   ├── actions/          # Server actions (product.actions.ts)
│   ├── constants/        # App constants (APP_NAME, LATEST_PRODUCTS_LIMIT, etc.)
│   ├── utils.ts          # Utilities (cn, convertToPlainObject, formatNumberWithDecimal)
│   └── validators.ts     # Zod schemas
├── types/                # TypeScript type definitions
└── generated/            # Prisma-generated files (do not edit)

db/                       # Database configuration (outside src/)
├── prisma.ts            # Prisma client with Neon adapter
├── sampleData.ts        # Seed data
└── seed.ts              # Seed script

prisma/
└── schema.prisma        # Database schema
```

### Key Patterns

**Path Aliases**
- `@/*` maps to `./src/*`
- `@/db/*` maps to `./db/*`
- Always use these aliases for imports

**Database Access**
- Import Prisma client from `@/db/prisma` (NOT from `@prisma/client`)
- The client uses Neon serverless adapter with WebSocket configuration
- Prisma is extended with custom result transformations:
  - `price` and `rating` are automatically converted from Decimal to string
  - Use `convertToPlainObject()` from `@/lib/utils` when passing Prisma objects to client components

**Server Actions**
- All data fetching functions in `src/lib/actions/` use `'use server'` directive
- Server actions return plain objects (not Prisma objects with Decimal types)
- Example: `getLatestProducts()` in product.actions.ts

**Component Patterns**
- Server components can be async (see src/app/(root)/page.tsx:8)
- Use `<Suspense>` with custom `<Loading />` component for async data fetching
- Client components use `'use client'` directive

**Styling**
- Tailwind CSS with `cn()` utility from `@/lib/utils`
- Dark mode via `next-themes` (ThemeProvider in root layout)
- shadcn/ui components with Class Variance Authority (CVA) for variants

**Type Safety**
- TypeScript strict mode enabled
- Zod for runtime validation (validators.ts)
- Custom types in `src/types/`

### Database Schema

Single `Product` model with:
- UUID primary key
- Unique slug for URLs
- String array for multiple images
- Decimal types for price/rating (converted to strings via Prisma extension)
- Optional banner field for featured products
- Boolean `isFeatured` flag

### Environment Variables

Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string (Neon serverless)
- Optional: `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_DESCRIPTION`, `SERVER_URL`, `LATEST_PRODUCTS_LIMIT`

# Agent Guidelines

## Commands
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **No test scripts available**

## Code Style
- **Framework**: Next.js 15 (App Router), React 19, TypeScript (strict mode)
- **Imports**: Use `@/` for src imports, `@/db/` for database (e.g., `@/components/ui/button`, `@/db/prisma`)
- **Components**: Function declarations with typed props, arrow functions for small utilities
- **Styling**: Tailwind CSS via `cn()` utility from `@/lib/utils` (clsx + tailwind-merge)
- **UI Components**: shadcn/ui with CVA for variants, `data-slot` attributes on root elements
- **Naming**: PascalCase for components, camelCase for functions/variables, SCREAMING_SNAKE_CASE for constants
- **Types**: Explicit typing, use `React.ComponentProps<>` for extending component props
- **Exports**: Named exports for utilities, default exports for page/layout components
- **Icons**: lucide-react only
- **Server Actions**: Mark with `'use server'`, use `convertToPlainObject()` for Prisma results
- **Validation**: Use Zod schemas from `@/lib/validators`, define currency with 2 decimal validation
- **Error Handling**: Use `notFound()` from `next/navigation` for missing resources
- **Database**: Prisma via `@/db/prisma`, never expose raw Prisma objects to client

## Notes
- No comments unless requested
- Run `npm run lint` after changes
- Path aliases: `@/*` → `./src/*`, `@/db/*` → `./db/*`

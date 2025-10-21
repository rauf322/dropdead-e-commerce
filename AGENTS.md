# Agent Guidelines

## Commands
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **No test scripts available**

## Code Style
- **Framework**: Next.js 15 (App Router), React 19, TypeScript (strict mode)
- **Imports**: Use `@/` alias for app directory imports (e.g., `@/components/ui/button`, `@/lib/utils`)
- **Components**: Function declarations with typed props, arrow functions for small utilities
- **Styling**: Tailwind CSS classes via `cn()` utility from `@/lib/utils` (clsx + tailwind-merge)
- **UI Components**: Use shadcn/ui patterns with CVA for variants (see `app/components/ui/`)
- **Naming**: PascalCase for components, camelCase for functions/variables, SCREAMING_SNAKE_CASE for constants
- **Types**: Explicit typing preferred, use `React.ComponentProps<>` for component props extension
- **Exports**: Named exports for utilities, default exports for page/layout components
- **Icons**: Use lucide-react
- **Constants**: Define in `app/lib/constants/`
- **Async Components**: Server components can be async (see `app/(root)/page.tsx:3`)

## Notes
- No comments unless requested
- Check lint after changes
- Path alias `@/*` maps to `./app/*`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## UI Component Rule

- Do not add extra visual design work unless the user explicitly asks for design changes.
- When implementing UI, prefer using the shadcn CLI with this project's package manager (`pnpm dlx shadcn@latest ...`) to search, inspect docs, and add components before building custom markup.
- Only create custom UI markup when no suitable shadcn component or block exists, or when the user explicitly asks for a custom implementation.

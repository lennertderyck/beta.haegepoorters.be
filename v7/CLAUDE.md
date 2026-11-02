# Project notes

## Server actions and auth

Every export of a `"use server"` file, and every inline `"use server"` function, is a public POST endpoint. Layout and page checks don't protect it, and neither does `src/proxy.ts` (it only does optimistic redirects).

- Write exported actions with `defineAction` from `src/lib/auth/action.ts`: it checks capabilities and validates the input with zod before the handler runs.
- Inline actions in pages start with `await requireCapability(...)` from `src/lib/auth/guards.ts`, then parse their input with a zod schema.
- Never trust ids from the client: restrict Sanity mutations to the expected `_type` (see `activitySelection` in `src/lib/actions/queries/activities.ts`).
- Data and vendor modules (`src/lib/actions/**`, `src/lib/vendors/sanity`, the Supabase admin client, `src/lib/modules/Auth.utils.ts`) start with `import "server-only"`. Don't put `"use server"` on helpers that aren't meant to be called from the client.
- Capabilities: `leader` / `webmaster` for the activity editor, `webmaster` for the backoffice.

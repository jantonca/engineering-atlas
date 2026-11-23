# Engineering Atlas

A personal study site for senior and staff-level engineering topics. Static Astro site, deployed to Cloudflare Workers Static Assets.

## Commands

Requires the Node version in `.node-version` and pnpm.

| Command | What it does |
| --- | --- |
| `pnpm dev` | Local dev server |
| `pnpm build` | Build to `dist/` and create the Pagefind search index |
| `pnpm check` | Type-check Astro and MDX files |
| `pnpm preview` | Serve `dist/` locally with Wrangler |

## Layout

| Path | Contents |
| --- | --- |
| `src/` | Site source: pages, layouts, components, lesson content |
| `docs/plan.md` | Study plan: topics, order and guide template |
| `docs/design-reference/` | Visual direction specimen and screenshots |
| `docs/agent-skills.md` | How to use the repo's agent skills |
| `AGENTS.md` | Rules for working in this repo |

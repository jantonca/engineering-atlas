# Guide 03: remaining work

Working plan for finishing `web-platform-foundations.mdx`. Delete this file when the guide is done. Scope and template rules stay in `plan.md` and `AGENTS.md`.

## Where the guide stands (26 November 2026)

Done: chapters 1–7 with scenes, the bug map, Test yourself (8 questions) and sources per chapter.

Missing from the guide template (`plan.md`, "Guide template"):

- Summary
- Key terms
- Trade-offs as one section (some exist inside chapters)
- Current tools, each with both labels (how widely used, how mature)
- What AI has changed
- Chapter 8, browser support. The bug map says "No chapter yet". None of these plan tools appear on the page: modern CSS (`:has()`, container queries, cascade layers, anchor positioning, popover, logical properties), semantic HTML, Can I Use, progressive enhancement.

Chapter 7 is about twice as long as the other chapters. The Zod and Valibot comparison should move to Current tools.

## Plan

Work in this order.

### 1. Research (first session)

Check against primary sources and record the date:

- Baseline status and dates for each modern CSS feature above.
- browserslist: current version and whether it supports Baseline queries.
- Both labels for each tool: MDN/Baseline, Can I Use, browserslist, Chrome DevTools Memory panel, web workers, service workers, HTTP caching headers, Zod, Valibot, Standard Schema, TypeScript.
- Current versions: Zod 4.6.7, Valibot 1.5.0 and TypeScript 7.0.2 are written in the guide, but they were not checked again in the review.
- What AI has changed in this area. Every claim needs a source. Mark uncertainty.

Write the findings with links and dates where the build step can use them (for example a section at the end of this file).

### 2. Chapter 8: which browsers, and what happens in older ones

Proposed scene: a Baseline timeline.

- One row for each modern CSS feature: first browser, "Newly available", "Widely available" (30 months later).
- A slider sets the oldest browser your users have. Each feature shows "safe" or "needs a fallback".
- An "older browser" switch shows one component with and without the feature, to teach progressive enhancement.
- Semantic HTML is the base layer that works in every browser.

Use a new visual form. Do not reuse the timeline-with-lanes layout of chapters 2–4.

### 3. Quick review section

Place it after chapter 8 and before Test yourself, with a link near the top of the page.

- Summary: eight one-line answers, each linked to its chapter.
- Key terms: short definitions, each linked to the chapter that explains it.
- Trade-offs: one table (main thread vs small pieces vs worker, ignore vs cancel, `no-cache` vs hashed names, type vs schema, and others).
- Current tools: both labels for each tool. Proposed visual: a grid with how widely used on one axis and how mature on the other. Move the Zod and Valibot details here from chapter 7.
- What AI has changed.

This design becomes the pattern for the other 17 guides.

## Open questions

1. Quick review at the end with a link from the top (proposed), or at the top?
2. Is the Baseline timeline with a slider the right scene for chapter 8?
3. Keep the big result number in all seven scenes, or only where the number is the lesson (event loop, workers, caching)?

## Already fixed (review follow-up)

- Every scene plays once when it comes into view.
- On a phone, pressing Play scrolls the animated part into view (`follow()` in `src/scripts/sim.ts`).
- The memory scene takes 5.4 s instead of 9 s, and its graph keeps a steady height.
- Site favicon.

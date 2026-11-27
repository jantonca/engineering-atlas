# Guide 03: remaining work

Working plan for finishing `web-platform-foundations.mdx`. Delete this file when the guide is done. Scope and template rules stay in `plan.md` and `AGENTS.md`.

## Where the guide stands (27 November 2026)

Done: chapters 1–8 with scenes, the bug map, the Quick review (summary, key terms, trade-offs, current tools with both labels, what AI has changed), Test yourself (8 questions) and sources. The Zod and Valibot comparison moved from chapter 7 to Current tools.

Decisions (27 November 2026):

1. Quick review sits after chapter 8 and before Test yourself, linked from the bug map.
2. Chapter 8 uses a Baseline timeline with three real browserslist targets (`baseline 2022`, `baseline widely available`, `baseline newly available`), not a slider. A slider suggested that one date decides support for every browser family.
3. The big result number stays only where the number is the lesson. On review, the existing scenes already follow this: race and API data show a value, not a count. No scene changed.

Still open:

- The site's own contents menu (`LocalNav.astro`) uses `popover` with no fallback. In browsers older than Firefox 125 or Safari 17 the menu button does nothing. This is the case chapter 8 teaches.
- The shared scene choices in `sim.css` hide the native radio and draw the selection with `:has()`. In a browser without `:has()` (for example Firefox 120), the choice and focus ring disappear. Optional fix: keep the native radio visible inside `@supports not selector(:has(*))`.
- The chapter 8 popover demo is a drawing. A second reviewer suggested using a real popover in the current-browser state so Esc and outside clicks work. Not done, to keep the scene simple.
- Mark the guide `Done` in `plan.md` only after a final read-through, then delete this file.

## Plan

Work in this order.

### 1. Research (done 27 November 2026)

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

## Research findings (checked 27 November 2026)

### Baseline status of the chapter 8 features

Source: `web-features` 3.48.0 ([npm](https://www.npmjs.com/package/web-features), published 26 November 2026), cross-checked with the [webstatus.dev API](https://api.webstatus.dev/v1/features/has). Core browsers: Chrome, Edge, Firefox and Safari, desktop and mobile. Widely available = 30 months after Newly available.

| Feature | Status | Newly available | Widely available | Last core browser |
|---|---|---|---|---|
| Logical properties | Widely | 20 Sep 2021 | 20 Mar 2024 | Safari 15 |
| Cascade layers | Widely | 14 Mar 2022 | 14 Sep 2024 | Safari 15.4 |
| Container queries (size) | Widely | 14 Feb 2023 | 14 Aug 2025 | Firefox 110 |
| `:has()` | Widely | 19 Dec 2023 | 19 Jun 2026 | Firefox 121 |
| Popover | Newly | 27 Jan 2025 | 27 Jul 2027 (expected) | Safari iOS 18.3 |
| Anchor positioning | Limited | — | — | Firefox lacks `position-visibility: anchor-valid` and `anchor-visible`; the full feature needs Chrome 157 and Safari 27 |

Notes:

- Popover: the `popover` attribute itself reached Widely on 16 Oct 2026, but the feature as a whole is Newly available because iOS Safari needed 18.3.
- Anchor positioning: most of it (for example `position-try`) has been Newly available since 13 Jan 2026 (Firefox 147). The feature counts as Limited because two `position-visibility` values (`anchor-valid`, `anchor-visible`) are missing in Firefox. Firefox 147 does support the older plural values. Teach it as "the core works in all core browsers; one part does not".
- Page link: [webstatus.dev](https://webstatus.dev/features/anchor-positioning) for each feature id (`logical-properties`, `cascade-layers`, `container-queries`, `has`, `popover`, `anchor-positioning`).
- Related, already used in chapters: `@supports` Widely since 2018; `scheduler` (scheduler.yield) Limited (no Safari); OffscreenCanvas Widely since 27 Sep 2025; dedicated workers Widely since 2018; service workers Widely since 2020; `AbortController` Widely since 2021.

### browserslist

- Current version 4.29.6 (16 Nov 2026, [npm](https://www.npmjs.com/package/browserslist)).
- Baseline queries were added in 4.26.0 ([changelog](https://github.com/browserslist/browserslist/blob/main/CHANGELOG.md)): `baseline widely available`, `baseline newly available`, `baseline 2024`, `baseline widely available on YYYY-MM-DD`, `… with downstream` ([README](https://github.com/browserslist/browserslist#queries)). Version data comes from `baseline-browser-mapping` (browserslist 4.29.6 requires `^2.11.37`).
- `defaults` is `> 0.5%, last 2 versions, Firefox ESR, not dead`, from Can I Use data (caniuse-lite).

### Real users differ by site

[web.dev case study, RUMvision (10 Feb 2025)](https://web.dev/case-studies/rumvision): in December 2024, real-user support for Baseline 2024 features was 34%, 59% and 39% on three sites; Widely available features had 95–100%. Good evidence for "decide with your own analytics".

### Versions written in the guide

All still current on 27 Nov 2026 ([npm registry](https://registry.npmjs.org/)): Zod 4.6.7 (12 Oct 2026), Valibot 1.5.0 (9 Sep 2026), TypeScript 7.0.2 (8 Jul 2026), `@standard-schema/spec` 1.1.0 (15 Dec 2025; the package version; the interface is Standard Schema V1).

### Tool labels (proposed, audited by a second reviewer on 27 Nov 2026)

Labels are a judgement from the sources above. "How widely used" has no "niche" value, so tools that every browser supports but few apps need get a note instead.

| Tool | How widely used | How mature | Basis |
|---|---|---|---|
| MDN Web Docs | Standard | Stable | The main reference; Baseline badges on pages |
| Baseline | Growing | Stable | Launched 2023; now in MDN, Can I Use, VS Code ([web.dev, May 2025](https://web.dev/blog/baseline-vscode)), browserslist 4.26+ |
| Can I Use | Standard | Stable | Data behind browserslist `defaults` |
| browserslist | Standard | Stable | Used by Autoprefixer, Babel, Lightning CSS; Baseline queries are newer |
| Chrome DevTools Memory panel | Standard (judgement: no usage data found) | Stable | [Fix memory problems](https://developer.chrome.com/docs/devtools/memory-problems) |
| Web workers | Not labelled: usage not verified | Stable | Widely available since 2018. Say so on the page instead of guessing |
| Service workers | Growing | Stable | Widely available since 2020. On 18.9% of sites in the 2025 crawl, up from about 1.7% in 2022; much of the rise comes from Google Tag Manager ([Web Almanac 2025, PWA](https://almanac.httparchive.org/en/2025/pwa)) |
| HTTP caching headers | Standard | Stable | RFC 9111 (2022) |
| TypeScript | Standard | Stable | 7.0.2 |
| Zod | Standard | Stable | 4.6.7; ~13× Valibot's npm downloads |
| Valibot | Growing | Stable | 1.5.0 |
| Standard Schema | Growing | Stable | Spec 1.1.0; implemented by Zod, Valibot, ArkType |
| Chrome DevTools for agents (MCP server) | New | Stable | 1.0 on 19 May 2026 ([blog](https://developer.chrome.com/blog/devtools-for-agents-v1)) |
| Modern Web Guidance | New | Stable | 1.0 on 10 Nov 2026 ([blog](https://developer.chrome.com/blog/modern-web-guidance-v1)) |

### What AI has changed (sourced)

- **Agents get browser support wrong without guidance.** Chrome's Modern Web Guidance team says coding agents rarely check the project's browser targets. They either rebuild built-in features in JavaScript or use new features without detection or fallbacks. On Chrome's own evaluation checks for features that do not work in all core browsers (feature detection, `@supports`, fallbacks or conditional polyfills), unguided models passed 43% of the time; with the guidance, 87%. This measures their test suite, not broken pages in production ([Chrome for Developers, Cross-browser by default, 12 Nov 2026](https://developer.chrome.com/blog/cross-browser-by-default)). The guidance treats Widely available as safe, and requires a fallback strategy for Newly and Limited; for an extra style that older browsers simply ignore, that strategy can be no code at all. A project can set its own target in AGENTS.md or CLAUDE.md. These are Google's own numbers for their own tool.
- **The same post names four fallback patterns** (useful for chapter 8): no fallback (ignored safely, for example `text-wrap: balance`), `@supports`, a small script, a polyfill loaded only when needed.
- **Agents can now see the running page.** Chrome DevTools for agents (formerly the Chrome DevTools MCP server, preview 23 Sep 2025, 1.0 on 19 May 2026) lets an agent record performance traces and take heap snapshots to find detached DOM nodes ([preview post](https://developer.chrome.com/blog/chrome-devtools-mcp), [1.0 post](https://developer.chrome.com/blog/devtools-for-agents-v1)). The evidence questions in chapters 1, 2 and 6 are things an agent can now gather; a person still has to judge them. Security note from the docs: by default the agent gets its own browser; if you connect it to your signed-in browser, it can see and act on those pages ([get started](https://developer.chrome.com/docs/devtools/agents/get-started)).
- **Schemas now also check model output.** Zod converts schemas to JSON Schema (`z.toJSONSchema()`, since Zod 4), and its docs say JSON Schema is widely used to define structured outputs for AI ([Zod, JSON Schema](https://zod.dev/json-schema)). LLM APIs accept a JSON Schema for structured outputs ([Claude docs, Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)). Model output is one more edge where data enters the app, so chapter 7's rule applies. A valid shape can still hold wrong values.
- **Built-in AI in the browser is not Baseline.** Translator, Language Detector and Summarizer are Limited availability: desktop Chrome 138+; Edge 138+ for Summarizer and 148+ for Translator and Language Detector (`web-features` 3.48.0). Use them as enhancements with a fallback, the same rule as chapter 8.
- Uncertain, not used: claims about how much AI changes how often teams use workers or service workers. No primary source found.

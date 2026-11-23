# Engineering Skills Plan

A study plan to keep senior and staff-level engineering knowledge up to date. Daily work uses only part of what a senior engineer should be able to explain. This plan covers the rest, one topic at a time.

**In short**

- 18 topics, one learning guide for each.
- Each guide covers the common questions, the key ideas, the trade-offs and the latest tools.
- No coding exercises and no framework tutorials. The goal is to understand ideas and explain them.
- Study the topics in number order. Topic 18 is optional.

## Scope

**In scope**

- Ideas you should be able to explain in your own words.
- Trade-offs: when to choose one option over another.
- The current tools in each area: what they are for, the main alternatives, and when not to use them.
- What AI has changed in each area.

**Out of scope**

- Coding tests and algorithm puzzles.
- Step-by-step tutorials for frameworks or languages. Topic 3 covers how JavaScript and TypeScript behave, not how to write them.
- Personal examples from past work. That is a separate task.

## Topics

The numbers show the study order.

| # | Guide | Status |
|---|---|---|
| 1 | Frontend System Design | Not started |
| 2 | AI-Assisted Engineering | Not started |
| 3 | Web Platform Foundations | Not started |
| 4 | Rendering and App Architecture | Not started |
| 5 | State and Real-Time Data | Not started |
| 6 | Web Performance | Not started |
| 7 | Testing and Quality | Not started |
| 8 | Accessibility | Not started |
| 9 | Web Security and Privacy | Not started |
| 10 | Technical Leadership and Strategy | Not started |
| 11 | Design Systems | Not started |
| 12 | Delivery and Developer Experience | Not started |
| 13 | Monitoring and Reliability | Not started |
| 14 | Backend API and Cloud Basics | Not started |
| 15 | How LLMs Work | Not started |
| 16 | Building AI Features | Not started |
| 17 | Product Experiments | Not started |
| 18 | Graphics on the Web (optional) | Not started |

Status values: `Not started`, `In progress`, `Done`.

## Study order

Follow the numbers. Some notes:

- Study topic 1 first as an overview. At the end, return to it and practise full design questions. By then you know all the parts.
- Topic 2 is early because many interviews now ask how you work with AI. It does not depend on other topics.
- Some topics are the base for a later one. Topic 8 (accessibility) comes before topic 11 (design systems). Topic 15 (how LLMs work) comes before topic 16 (building AI features).
- Topic 18 is optional. Study it only for visual or graphics roles.

The next list shows priorities for each type of role. It does not replace the study order. When you prepare for a specific role, spend more time on its priority topics.

## Priorities by role type

Topics 1, 2 and 3 matter for every role. This list shows the extra priority topics for each type of role, most important first.

- **Staff or Principal Frontend Engineer:** 4, 5, 6, 10, 8, 9, 14
- **Frontend Platform / Developer Experience:** 12, 7, 10, 13, 11, 4
- **Design Systems Engineer:** 11, 8, 7, 10, 4
- **Technical Lead:** 10, 12, 7, 13, 9
- **Staff Software Engineer, AI-focused:** 16, 15, 14, 13, 9
- **Visual or graphics specialist:** 18, 6, 8

## One home for each idea

Some ideas belong to more than one topic. Each idea is explained fully in one guide. Other guides link to that guide instead of explaining the idea again.

| Idea | Main guide |
|---|---|
| Full design questions that use many topics | 1. Frontend system design |
| HTML, modern CSS and browser support | 3. Web platform foundations |
| Test levels and what must pass before a release | 7. Testing and quality |
| Diagrams, decision records, codemods and large migrations | 10. Technical leadership and strategy |
| Build tools, feature flags, rollback and DORA metrics | 12. Delivery and developer experience |
| Whether an experiment result can be trusted | 17. Product experiments |

## Guide template

Every guide covers these eight parts. The page can show them in any order and in any form, for example as visual scenes:

1. **Summary.** One page for a quick review.
2. **Common questions.** Questions asked in interviews and design reviews, each with a short answer. Some are scenarios: something has gone wrong, and you explain what you would do.
3. **Key terms.** The words you should be able to explain.
4. **Trade-offs.** When to choose X over Y.
5. **Current tools.** What each tool is for, the main alternatives, and when not to use it. Each tool has two labels:
   - **How widely used:** `Standard` (used by most teams), `Growing` (spreading quickly) or `New` (recently released).
   - **How mature:** `Stable`, `Experimental` (may still change), `Draft` (the standard is not final) or `Retired` (shut down or replaced; know what replaced it).
6. **What AI has changed** in this area.
7. **Test yourself.** Questions to answer out loud, without notes.
8. **Sources.** Links, with the date they were checked.

The two tool labels are separate because a tool can be popular and still not mature. For example, OpenTelemetry is a widely used monitoring standard, but its browser support is still experimental.

Guides are MDX pages on the Engineering Atlas website.

**Keep tools current.**
Check tools and versions online when writing or reviewing a guide, and record the date. Tools change fast, especially in AI. The tool lists below are a starting point, not a final list.

On 23 November 2026, only these items were checked online: PartyKit, Vite 8, OAuth 2.1 and OpenTelemetry in the browser. All other tools still need checking.

## How to study

- One topic per session. Split a big guide into parts.
- Read a question, answer it out loud, then read the answer.
- Ask an AI assistant to act as an interviewer on that topic only.
- Mark the questions you found hard. Test them again a week later.
- Update the status in the Topics table.

## Topic details

Each guide explains the terms and tools listed below. You do not need to know them before you start.

### 1. Frontend system design

Designing a web product from start to end: requirements, data, APIs, rendering, caching, failure cases and release. This guide brings the other topics together. It links to them instead of repeating them.

**Common questions**

- Design the frontend for a product page, a live dashboard or a shared document editor.
- What happens on this page when an API is slow or fails?
- How would you release this safely to millions of users?
- How would you support many languages, including right-to-left languages such as Arabic?

**Tools to cover:** reference stacks (Next.js, React Router, TanStack Start, Astro); CDN and edge platforms (Cloudflare, Vercel, CloudFront); translation and formatting (the browser `Intl` API, ICU message format, i18next, FormatJS). Diagrams are in topic 10.

### 2. AI-assisted engineering

Using AI coding agents in daily work, and helping a team use them safely. This guide is about judgement: which tasks to give an agent, what context to give it, how to check the result, which permissions to allow, and when not to use an agent. How models work is in topic 15. AI inside a product is in topic 16.

**Common questions**

- How do you use AI in your daily work, and how do you check what it produces?
- When should you not use an AI agent for a task?
- How would you introduce AI coding tools to a team safely?
- Does AI change how junior engineers should learn?
- How would you measure whether AI tools actually help?

**Tools to cover:** Claude Code, Codex, Cursor, GitHub Copilot (agent mode and coding agent), Gemini CLI; instruction files (AGENTS.md, CLAUDE.md); skills, subagents, hooks and MCP servers; AI code review (CodeRabbit, Copilot review); spec-first tools (GitHub Spec Kit, Kiro); sandboxing and permissions.

### 3. Web platform foundations

How the browser and JavaScript work underneath every framework. Ideas only, no syntax practice.

**Common questions**

- What is the event loop? Why can a long task make the page feel frozen?
- Two requests finish in the wrong order, and the page shows old data. Why does this happen, and how do you prevent it?
- What does the browser do between receiving HTML and showing pixels on the screen?
- When would you move work to a web worker?
- What causes memory leaks in a page that stays open for hours?
- How does HTTP caching work? What do `Cache-Control` and `ETag` do?
- Why can an app with correct TypeScript types still fail on an API response?
- How do you decide which browsers to support, and what happens in older ones?

**Tools to cover:** MDN and Baseline (which features work in all main browsers), Can I Use, browserslist; Chrome DevTools memory panel; web workers and service workers; HTTP caching headers; TypeScript's limits and runtime validation (Zod, Valibot); semantic HTML; progressive enhancement; modern CSS (container queries, cascade layers, `:has()`, anchor positioning, popover, logical properties for right-to-left layouts).

### 4. Rendering and app architecture

Where and when pages are built: in the browser, on the server, when the site is built, or on servers close to the user (called "the edge"). Also how to divide a large frontend into parts.

**Common questions**

- When would you render on the server instead of in the browser? What does it cost?
- What do React Server Components solve, and what new problems do they bring?
- Would you split this app into micro-frontends? Why or why not?
- How does your rendering choice affect search engines and link previews?

**Tools to cover:** React 19 (Server Components, Actions, React Compiler); Next.js App Router and its caching; React Router (Remix 2 merged into it); TanStack Start; Astro islands and server islands; Module Federation for micro-frontends; search basics (meta tags, structured data, sitemaps). Build tools are in topic 12.

### 5. State and real-time data

Where data lives in the browser, how it stays in sync with the server, and how several people can work on the same thing at once.

**Common questions**

- How do you decide what goes in global state, in the server data cache or in the URL?
- When should cached data be refreshed or thrown away?
- For live updates, would you use polling, server-sent events or WebSockets?
- Two users edit the same thing at the same time. What happens?
- The app shows a change before the server confirms it (an optimistic update). After a reconnect, the server rejects it. How do you fix the screen and the data?

**Tools to cover:** TanStack Query, Zustand, Jotai, Redux Toolkit, XState, signals; server-sent events and WebSockets; Yjs, Automerge, Liveblocks and PartyServer for shared editing; local-first sync (Zero, ElectricSQL). PartyKit's hosted platform was scheduled to shut down on 23 October 2026, and PartyServer replaces it.

### 6. Web performance

How fast pages load and respond, how to measure it, and how to keep it fast over time.

**Common questions**

- The site got slower after a release. How do you find the cause?
- What are LCP, INP and CLS, and how do you improve each one?
- How do you stop performance getting worse over time?

**Tools to cover:** Chrome DevTools performance panel and its AI assistance; Lighthouse; PageSpeed Insights; Chrome UX Report (CrUX); the web-vitals library; WebPageTest; newer browser features (Speculation Rules, View Transitions, `fetchpriority`, AVIF images).

### 7. Testing and quality

How to decide what to test, at which level, and what must pass before a release.

**Common questions**

- What should we mock, and what must run against real services?
- How do you split tests between component, integration, contract and end-to-end tests?
- How do you catch visual and accessibility problems before users see them?
- What do you do about flaky tests?
- What evidence should block a release?

**Tools to cover:** Vitest, Playwright, Testing Library, MSW; Storybook interaction tests; visual testing (Chromatic, Playwright screenshots); contract testing (Pact); cross-browser testing (Playwright browsers, BrowserStack); test data and test isolation. Accessibility rules are in topic 8.

### 8. Accessibility

Making products that everyone can use, including people who use only a keyboard or a screen reader.

**Common questions**

- How do you make a custom dropdown or a modal accessible?
- What do automated tools catch, and what do they miss?
- How do you build accessibility into the team's process instead of fixing it at the end?

**Tools to cover:** WCAG 2.2 and the WCAG 3 draft; laws (European Accessibility Act, local laws such as the Australian Disability Discrimination Act); axe-core, Playwright with axe, Storybook accessibility checks, eslint-plugin-jsx-a11y; screen readers (VoiceOver, NVDA, JAWS); native HTML (`dialog`, `popover`, `inert`).

### 9. Web security and privacy

Protecting users, their data and the code supply chain. The supply chain is all the outside code your product depends on, such as npm packages.

**Common questions**

- How do you prevent XSS in a React app? What is a Content Security Policy?
- Where should login tokens be stored in the browser?
- The user is logged in. What stops them from seeing another customer's data?
- How do you manage the risk of npm dependencies?

**Tools to cover:** OWASP Top 10 and the OWASP Top 10 for LLM apps; Content Security Policy, Trusted Types; OAuth 2.0 and the OAuth 2.1 draft, OIDC, passkeys; login services (Auth0, Clerk, Better Auth); npm provenance and trusted publishing, Socket, Snyk; recent npm supply-chain attacks as examples; privacy laws (GDPR, local laws such as the Australian Privacy Act).

### 10. Technical leadership and strategy

How senior engineers set direction across teams: decisions, priorities, standards, ownership and large changes. For platform and design-system teams, this includes who owns what, how other teams contribute, and what support the platform team promises.

**Common questions**

- How do you make a big technical decision when people disagree?
- How do you choose what to work on when the facts are unclear?
- How do you get other teams to follow a direction when you are not their manager?
- How do you link a technical investment to product or business results?
- Should we build this ourselves or buy it? How do you decide?
- When do you stop feature work to fix technical debt?
- How would you migrate a large codebase without stopping feature work?
- When should a team be allowed to work outside the shared platform, and who decides?
- How do you help other engineers grow?

**Tools to cover:** decision records (ADR, MADR) and RFC templates; C4 model, Mermaid, Excalidraw; technology radars; gradual migration (the strangler fig pattern); codemods combined with AI agents for large migrations; public staff-engineer guides and career frameworks (StaffEng, company career ladders). DORA metrics are in topic 12.

### 11. Design systems

Shared components, styles and rules that many teams use to build consistent interfaces.

**Common questions**

- How do you get other teams to use a shared component library?
- How do you release a breaking change to a component that 20 teams use?
- What are design tokens, and why do they matter?
- How do you share UI between a website and a native app?

**Tools to cover:** Figma (variables, Dev Mode, Code Connect, Figma MCP server); the design token format from the W3C Design Tokens Community Group (DTCG), Style Dictionary, Tokens Studio; Storybook and Chromatic; component libraries (Radix, React Aria, Base UI, shadcn/ui); Tailwind CSS; theming with CSS custom properties and cascade layers. General CSS is in topic 3. Ownership and contribution rules are in topic 10.

### 12. Delivery and developer experience

How code is built and released, and how easy it is for engineers to do good work. Testing strategy is in topic 7.

**Common questions**

- How do you release a risky change safely?
- A release broke something. How do you roll it back quickly?
- How do you keep builds fast in a large codebase?
- How would you measure delivery speed or developer experience?

**Tools to cover:** GitHub Actions; Turborepo, Nx, pnpm workspaces; build tools (Vite 8 with Rolldown and Oxc, Turbopack, esbuild); Biome, Oxlint; Changesets, Renovate; feature flags (LaunchDarkly, Statsig, GrowthBook, the OpenFeature standard); preview deployments; Backstage; DORA, SPACE and DX Core 4 metrics.

### 13. Monitoring and reliability

Knowing whether the product works for real users, and responding well when it does not.

**Common questions**

- How do you know the frontend is working for real users right now?
- What is an SLO (a reliability target)? How would you set one for a checkout page?
- Explain, step by step, how you would handle a production incident.

**Tools to cover:** OpenTelemetry (its browser support is still experimental); Sentry (errors, tracing, session replay); Datadog real-user monitoring; Grafana tools (including Faro for the frontend); Honeycomb; incident tools (PagerDuty, incident.io).

### 14. Backend, API and cloud basics

Enough backend and cloud knowledge to make good frontend architecture decisions.

**Common questions**

- Would you use REST or GraphQL for this product, and why?
- What is a backend-for-frontend, and when is it worth building one?
- What happens if a payment request is sent twice?

**Tools to cover:** REST with OpenAPI, GraphQL (including federation), tRPC, gRPC; serverless and edge functions (AWS Lambda, Cloudflare Workers); queues (SQS, Kafka); Postgres, Redis, SQLite at the edge; infrastructure as code (Terraform/OpenTofu, AWS CDK, SST); containers and Kubernetes (ideas only).

### 15. How LLMs work

A practical understanding of large language models (LLMs), the AI models behind tools such as Claude and ChatGPT: what they do well, where they fail and what they cost.

**Common questions**

- Explain how an LLM works to a product manager.
- Why do models invent facts, and how do you reduce it?
- When would you use RAG instead of fine-tuning?

**Tools to cover:** current model families (Claude, GPT, Gemini, open models such as Llama, Qwen, DeepSeek, Mistral); reasoning models; context windows; prompt caching; embeddings; image and file input; cost per token.

### 16. Building AI features

Adding AI to a product so it is useful, safe, testable and affordable.

**Common questions**

- Design an assistant feature for our product. What can go wrong?
- How do you test a feature whose answers change every time?
- How do you show users that an answer might be wrong?
- When is a fixed, step-by-step workflow better than an agent?
- What evidence shows that a model upgrade or a prompt change is safe?
- How do you stop the AI from showing a user documents they are not allowed to see?

**Ideas to cover:** test sets that match real use; checks that must pass before a model or prompt change goes live; search that respects user permissions; prompt injection; limits on what tools the AI can use; cost and speed budgets; what happens when the user cancels or the model fails.

**Tools to cover:** Vercel AI SDK, the Anthropic and OpenAI SDKs, Claude Agent SDK, OpenAI Agents SDK; LangGraph, LlamaIndex, Mastra; vector search (pgvector, Pinecone); testing and tracing (Langfuse, Braintrust, LangSmith, promptfoo); structured output; MCP; chat interface kits (AI SDK UI, assistant-ui, CopilotKit).

### 17. Product experiments

Testing changes with real users, and deciding whether a result can be trusted. How to release the change is in topic 12.

**Common questions**

- How would you run an A/B test on the checkout? What could make the result wrong?
- How do you decide whether a feature worked?
- The experiment looks positive. Could a tracking error, uneven groups or checking the results too often explain it?

**Tools to cover:** PostHog, Statsig, GrowthBook, Optimizely, Amplitude, GA4; key ideas (sample size, statistical significance, sample ratio mismatch, checking results too early).

### 18. Graphics on the web (optional)

3D and visual work in the browser, and keeping it fast.

**Common questions**

- How do you keep a 3D scene fast on a cheap phone?
- What does WebGPU change compared with WebGL?

**Tools to cover:** WebGL 2, WebGPU; Three.js (WebGPU renderer, TSL shading language); React Three Fiber, Babylon.js, PlayCanvas; 3D models and compression (glTF, Draco, Meshopt, KTX2); Gaussian splatting; WebXR; OffscreenCanvas.


# Guide 02: remaining work

Working plan for `ai-assisted-engineering.mdx`. Delete this file when the guide is done. Scope and template rules stay in `plan.md` and `AGENTS.md`.

## Where the guide stands (27 November 2026)

Built: map, six chapters with scenes, Quick review and Test yourself. Status in `plan.md` and `guides.ts` is In progress. Checked in Chrome at 1440 px and 390 px, light and dark themes, reduced motion, keyboard on the scene controls; no overflow and no console errors. `pnpm check` and `pnpm build` pass. All 57 external links returned 200 on 27 November 2026.

Left before marking Done: a final read-through of the whole page for plain English and facts, as for guide 03. Then delete this file.

Scope from `plan.md`: judgement in daily work with coding agents, and helping a team use them safely. Which tasks to give an agent, what context to give it, how to check the result, which permissions to allow, and when not to use one. How models work belongs to guide 15. AI inside a product belongs to guide 16. DORA metrics belong to guide 12, test levels to guide 7, and large migrations with codemods to guide 10. This guide links to those guides and does not explain those ideas again.

## Plan

### 1. Research (done 27 November 2026)

Findings are at the end of this file. Every tool, version, status and AI claim was checked against a primary source, or is marked as not verified.

### 2. Page structure (revised after the first audit, 27 November 2026)

Same pattern as guide 03: a map → chapters (question, answer, one scene, "after" notes with sources) → Quick review → Test yourself.

Map: "Where agent work goes wrong". Reuse the guide 03 bug map layout: symptom first, then cause, each linked to its chapter.

| # | Common question (plan.md) | Chapter | Scene |
|---|---|---|---|
| 1 | When should you not use an AI agent for a task? | Choose the task | A labelled two-axis plot: "how easy is it to check?" and "what does a mistake cost?". Six real tasks. Pick one to read why it sits there. |
| 2 | How do you use AI in your daily work? (the context part) | Give it context | Sort an AGENTS.md draft. Eight lines; for each, keep it, move it to a skill, enforce it with a hook, or delete it because the agent can find it alone. Based on Gloaguen et al. (2026): context files cost over 20% more and help mainly with non-standard rules. |
| 3 | How would you introduce AI coding tools to a team safely? | Set limits | One task, "summarise the open issues in our public repo", with three set-ups: one token for everything, a token for this repo only, and a read-only token for this repo where a person reads the summary first. Play shows the May 2025 GitHub MCP attack and where each set-up stops it. "After" notes: a small team pilot, and what the shell sandbox does not cover. |
| 4 | How do you check what it produces? | Check the result | An annotated diff from an agent: the acceptance criterion, a change, and a test whose assertion was weakened. Pick the line you would question, then reveal the input that breaks it. Test levels stay in guide 7. |
| 5 | Does AI change how junior engineers should learn? | Keep learning | Static annotated chart of the Anthropic trial: 4.15 points lower on a 27-point quiz with AI (n = 52), biggest gap in debugging. Usage patterns shown as observations, not predictions. |
| 6 | How would you measure whether AI tools actually help? | Measure | Static annotated chart of METR 2025, labelled "change in task time": predicted −24%, felt −20%, measured +19%. Then why the 2026 follow-up gave no reliable number, and DORA 2025 as associations. Ends with a local comparison of similar tasks (review time, rework, defects). Delivery metrics link to guide 12. |

Tools from `plan.md` and where they appear:

- Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI: Current tools; chapter 3 for permissions and cloud agents.
- AGENTS.md, CLAUDE.md, skills, subagents, MCP: chapter 2.
- Hooks, sandboxing and permissions: chapters 2 and 3.
- AI code review (CodeRabbit, Copilot code review, Codex review): chapter 4.
- Spec-first tools (Spec Kit, Kiro): chapter 4, as the acceptance criterion that review checks against; and Current tools. No independent evidence that they improve outcomes; a short, reviewed acceptance criterion may be enough.

Reuse: `Chapter`, `Review`, `Quiz`, `QuizItem`, `sim.css`, `sim.ts`. The map layout is now the shared `GuideMap.astro`; each guide passes its zones and its art component. Drawing styles live in `src/styles/art.css`. `QuizItem` takes its drawing in an `art` slot. Guide 03 was rechecked after the change.

### 3. Quick review and Test yourself

Same components as guide 03. Six questions, one for each chapter, each with a scenario, options, evidence and a common mistake.

## First audit (Codex, 27 November 2026), checked and applied

1. Chapter 3: the shell sandbox does not cover MCP servers, so "sandbox network" would not stop the GitHub MCP attack. Applied: the scene now compares token scopes for one task. Invariant ran the attack in demo repositories; say so.
2. Copilot and Codex defaults have exceptions (Copilot pushes to an existing PR branch when called there; Actions can be set to run automatically; Copilot code review can count as an approval when enabled). Applied in the findings below: name the surface and separate defaults from enforced limits.
3. Team rollout needs a worked pilot. Applied to chapter 3 "after" notes.
4. Chapter 4 promised that checks catch defects predictably. Applied: annotated diff instead.
5. Chapter 5 numbers: the paper reports a 4.15-point gap on a 27-point quiz (15.4%); the blog's 50% against 67% does not match. Confirmed on arXiv v3. Applied: use the paper; patterns are observations with 2–7 people each.
6. Chapter 6 measures differ (task time, self-report, associations). Applied. A claim that DORA skipped the 2026 survey came from LinkedIn only; not used. dora.dev lists no 2026 annual report and calls the ROI of AI-assisted Software Development report its latest; its date is not verified.
7. Use labels need real denominators. Confirmed on the survey data pages. Applied below.
8. CodeRabbit CLI is open beta (Experimental); Gemini CLI's consumer route is Retired, the enterprise route continues. Applied.
9. Chapter 2 bar chart taught spare tokens, not context choice; a subagent's summary still uses the parent's context. Confirmed the AGENTS.md study (arXiv 2602.11988). Applied: new scene.
10. Small fixes: the 17.1% answer is "losing job skills or training an AI to replace you"; Nx flags come from secondary coverage, so the page uses the postmortem only. Applied. The spec-driven "benchmark" cited is a vendor blog; not used.

## Second audit (Codex, 27 November 2026), checked and applied

Primary docs were checked for 1 and 3; 2 matches the research notes below.

1. A Read deny rule covers Claude's file tools and commands such as `cat`, but not scripts or `grep -r` ([permissions](https://code.claude.com/docs/en/permissions)). Applied: the `.env` line and quiz 2 no longer promise "every time"; the quiz now names `.gitignore`, a commit hook and server-side push protection.
2. Starting modes depend on the surface: `claude -p` and the Agent SDK start in Manual; `codex exec` starts read-only. Applied in chapter 3.
3. Copilot's firewall covers shell commands, not other MCP servers or setup steps ([firewall](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall)). Copilot code review can count as an approval when enabled. Applied in chapter 3.
4. 4.15 of 27 points is 15.4 percentage points, not "15.4% lower". Applied: the scene, chapter 5 and quiz now say "4.15 points lower on a 27-point quiz".
5. METR says selection likely hid part of the gain; DORA shows associations, not that review is the bottleneck. Applied: both sentences qualified.
6. One survey of developers does not show team use or growth. Applied: "Use" now says how widely a tool is used, and the page says the survey shows no trend; "the leading agents are command-line tools" removed.
7. The trade-off table recommended a broad token. Applied: the row is now write access against read-only, always limited to the repos the task needs; the sandbox row says to prompt only for actions outside the limits.
8. The read-only verdict said the hidden text "could do no harm". Applied: it can still bend the summary, so read it before sharing.
9. Choosing `>=` is a correct first finding, and running the $500 case also shows the bug. Applied in the diff notes and the reveal.
10. The sorter's live region read out all four lists on each change. Applied: only the changed line's feedback is announced.

## Design decisions (answered 27 November 2026)

1. Chapter 2: sort an AGENTS.md draft.
2. Chapter 3: one task with three token scopes.
3. Chapter 4: annotated diff with a reveal.
4. Map and quiz art: share guide 03's layout, with new drawings.

## Research findings (checked 27 November 2026)

Sources are primary unless marked. Quotes are short. "Not verified" means no primary source was found.

### Coding agents

**Claude Code** (Anthropic). `@anthropic-ai/claude-code` 2.1.332, published 24 Nov 2026 ([npm](https://www.npmjs.com/package/@anthropic-ai/claude-code)).

- Permission modes ([docs](https://code.claude.com/docs/en/permission-modes)): `default` (shown as Manual), `acceptEdits`, `plan`, `auto` ("a separate classifier model reviews actions before they run and blocks the ones it judges risky"; "does not guarantee safety"), `dontAsk` (anything that would prompt is denied; for CI), `bypassPermissions` ("isolated containers and VMs only"). "Deny rules block in every mode, including `bypassPermissions`." Since v2.1.283, auto mode is the starting mode for interactive terminal and VS Code sessions; `claude -p` and the Agent SDK start in `default`.
- Sandbox ([docs](https://code.claude.com/docs/en/sandboxing)): "covers shell commands only", off by default. Writes limited to the working directory and temp; reads cover most of the machine, including `~/.ssh`. Network goes through a local proxy with an allow list that starts empty. Seatbelt on macOS, bubblewrap on Linux and WSL2. Not sandboxed: native Windows, the file tools, hooks, local MCP servers. If the sandbox cannot start, commands run without it by default.
- Instruction files ([memory docs](https://code.claude.com/docs/en/memory)): CLAUDE.md files from the working directory and every parent are concatenated. "They aren't enforced configuration"; for enforcement, use a `PreToolUse` hook. Target under 200 lines. Claude Code reads AGENTS.md "only when you have no CLAUDE.md" (v2.1.277+), or through `@AGENTS.md` in CLAUDE.md (this repo does that).
- Skills ([docs](https://code.claude.com/docs/en/skills)): `SKILL.md` with frontmatter; "a skill's body loads only when it's used". Follows the Agent Skills open standard.
- Subagents ([docs](https://code.claude.com/docs/en/sub-agents)): "Each subagent runs in its own context window", with its own tools and permissions; it returns a summary.
- Hooks ([docs](https://code.claude.com/docs/en/hooks)): shell commands (and other handlers) at lifecycle events; `PreToolUse` "can block it", for example with exit code 2.
- MCP ([docs](https://code.claude.com/docs/en/mcp)): "Verify you trust each server before connecting it. Servers that fetch external content can expose you to prompt injection risk." Anthropic "does not security-audit or manage any MCP server" ([security](https://code.claude.com/docs/en/security)).

**Codex** (OpenAI). `@openai/codex` 0.172.0, 24 Nov 2026 ([npm](https://www.npmjs.com/package/@openai/codex)). The docs at developers.openai.com/codex now redirect (308) to learn.chatgpt.com.

- Sandbox modes ([sandboxing](https://learn.chatgpt.com/docs/sandboxing), [approvals](https://learn.chatgpt.com/docs/agent-approvals-security)): `read-only`, `workspace-write` (the CLI default), `danger-full-access`. Approval policies: `on-request` (default), `never`, a granular policy; `untrusted` is retired. Network is off by default in workspace-write. Seatbelt on macOS, bubblewrap on Linux, a native sandbox on Windows. `codex exec` defaults to read-only. Parts of these pages were read as summaries, so wording is paraphrased.
- AGENTS.md ([docs](https://learn.chatgpt.com/docs/agent-configuration/agents-md)): global file in `~/.codex`, then one file per directory from the repo root down to the current directory, joined in that order, so closer files come later. Stops at 32 KiB by default (`project_doc_max_bytes`).
- Skills ([docs](https://learn.chatgpt.com/docs/build-skills)): Agent Skills standard; at start Codex lists each skill's name and description (capped at 2% of the context window); the full SKILL.md loads only when chosen.
- Surfaces ([docs](https://learn.chatgpt.com/docs)): CLI, IDE extension, ChatGPT apps, Codex Cloud. GitHub code review with `@codex review` or automatically; it flags only P0 and P1 issues and follows "Code Review Rules" in AGENTS.md ([GitHub](https://learn.chatgpt.com/docs/third-party/github)).

**GitHub Copilot** (docs.github.com).

- The cloud agent is now under "Copilot in the cloud" (from 28 Oct 2026); article titles still say "Copilot cloud agent" ([about](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)).
- Defaults, with exceptions (from the same page): when called with `@copilot` on an existing pull request, it pushes to that branch; a repository can let Actions run without approval; Copilot code review can count as an approval if that setting is on ([code review](https://docs.github.com/en/copilot/concepts/agents/code-review)).
- Built-in limits ([risks and mitigations](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations)): only users with write access can start it; it pushes only to its own `copilot/` branch and follows branch protections; internet access goes through a firewall; Actions workflows do not run until a person with write access approves them; it "cannot approve or merge a pull request", and the person who asked for it cannot approve it.
- Agent mode in the IDE: plans, edits files and runs commands; commands need approval by default ([docs](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-agent-mode)).
- Code review ([docs](https://docs.github.com/en/copilot/concepts/agents/code-review)): GA; by default its reviews "do not count toward required approvals". Can run automatically.
- Instructions ([support table](https://docs.github.com/en/copilot/reference/custom-instructions-support)): `.github/copilot-instructions.md`, path-specific instructions, and AGENTS.md (nearest wins) or a root CLAUDE.md or GEMINI.md, depending on the surface.
- Copilot CLI: `@github/copilot` 1.0.116, 25 Nov 2026 ([npm](https://www.npmjs.com/package/@github/copilot)). GA on 25 Feb 2026 ([changelog](https://github.blog/changelog/2026-02-25-github-copilot-cli-is-now-generally-available), title and date read from the month archive). "Assisted permissions" GA on 26 Oct 2026: "a large language model evaluates the request. Requests classified as clearly safe automatically proceed" ([changelog](https://github.blog/changelog/2026-10-26-github-copilot-assisted-permissions-generally-available/)).

**Cursor** ([changelog](https://cursor.com/changelog), [rules](https://cursor.com/docs/context/rules)). The changelog shows no version numbers; newest entry 6 Nov 2026. Products are named Agents, Cloud Agents and Code Review (Bugbot). Reads AGENTS.md in the root and in subfolders; project rules live in `.cursor/rules` as `.mdc` files.

**Gemini CLI** ([README](https://github.com/google-gemini/gemini-cli), [Google Developers Blog, 19 May 2026](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli)). Apache 2.0. `@google/gemini-cli` 0.71.1, 24 Nov 2026 ([npm](https://www.npmjs.com/package/@google/gemini-cli)). Important change: since 18 Jun 2026, free and Google AI Pro/Ultra users moved to **Antigravity CLI**; Gemini CLI is "maintained for enterprise Gemini Code Assist workflows on Google Cloud". Not called deprecated. Context file `GEMINI.md`; AGENTS.md only if set in `context.fileName`. Sandbox options: Seatbelt, Docker or Podman, gVisor, and others ([sandbox docs](https://geminicli.com/docs/cli/sandbox/)).

### Open standards

- **AGENTS.md** ([agents.md](https://agents.md/)): "A simple, open format for guiding coding agents"; plain Markdown; "The closest AGENTS.md to the edited file wins; explicit user chat prompts override everything." Released by OpenAI in August 2025; now stewarded by the Agentic AI Foundation. Claims use in over 60,000 open-source projects (its own count).
- **Agentic AI Foundation (AAIF)** ([OpenAI, 9 Dec 2025](https://openai.com/index/agentic-ai-foundation/), [aaif.io/about](https://aaif.io/about)): a directed fund under the Linux Foundation, co-founded by OpenAI, Anthropic and Block. Hosts MCP, AGENTS.md, goose, A2A, agentgateway, and Agent Skills.
- **MCP** ([specification](https://modelcontextprotocol.io/specification)): latest version string `2026-07-28` (the release date itself is not printed; it follows `2025-11-25`). A draft collects later changes. Security section: "Hosts must obtain explicit user consent before invoking any tool"; tool descriptions "should be considered untrusted, unless obtained from a trusted server"; "MCP itself cannot enforce these security principles at the protocol level". The MCP Registry is still "in preview" ([FAQ](https://modelcontextprotocol.io/registry/faq.md)).
- **Agent Skills** ([agentskills.io](https://agentskills.io/), [specification](https://agentskills.io/specification.md)): a folder with `SKILL.md`; `name` and `description` required. Progressive disclosure: about 100 tokens of metadata at start, the body (under 5,000 tokens recommended) on use, other files only when needed. Published as an open standard in December 2025 and donated to the AAIF on 22 Oct 2026 ([Anthropic](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation)): "More than 70 agent platforms, including ChatGPT, Cursor, GitHub Copilot, and VS Code, have integrated Agent Skills"; "1 million skills have been published and nearly 280 million installed" (Anthropic's own counts).

### Review and spec tools

- **CodeRabbit** ([docs](https://docs.coderabbit.ai/knowledge-base/code-guidelines)): AI pull-request review, configured with `.coderabbit.yaml`. Reads AGENTS.md, CLAUDE.md, GEMINI.md, `.github/copilot-instructions.md` and others as review rules. CLI in open beta ([CLI](https://docs.coderabbit.ai/cli/overview)).
- **GitHub Spec Kit** ([repo](https://github.com/github/spec-kit), [releases](https://github.com/github/spec-kit/releases)): open-source toolkit for spec-driven development. Steps: constitution once, then specify → plan → tasks → implement → converge. Latest v1.4.5 (25 Nov; the year is inferred as 2026). Not labelled experimental on the pages read.
- **Kiro** (AWS, [specs](https://kiro.dev/docs/specs/), [GA post](https://kiro.dev/blog/general-availability/)): preview July 2025, GA 17 Nov 2025. Each spec makes `requirements.md`, `design.md` and `tasks.md`. Steering files in `.kiro/steering/`; reads AGENTS.md. Hooks in `.kiro/hooks/`. IDE 1.0 is current.

### Safety cases

- **GitHub MCP "toxic agent flow"** ([Invariant Labs, 26 May 2025](https://invariantlabs.ai/blog/mcp-github-vulnerability)): an attacker opens an issue in a public repo with hidden instructions. The user asks the agent to look at open issues. The agent reads private repos and leaks them in a pull request on the public repo. Per-call confirmation existed, but many users chose "Always Allow". "Not a flaw in the GitHub MCP server code itself." The authors sell detection tools.
- **The lethal trifecta** ([Simon Willison, 16 Jun 2025](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)): "Access to your private data", "Exposure to untrusted content", "The ability to externally communicate". With all three, "an attacker can easily trick it into accessing your private data and sending it to that attacker."
- **Repository context files** ([Gloaguen et al., arXiv 2602.11988, v3 29 Sep 2026](https://arxiv.org/abs/2602.11988)): "providing context files does not generally improve task success rates, while increasing inference cost by over 20% on average". Instructions in the files "are well followed"; "repository overviews … are not helpful"; context files "are useful for specifying non-standard coding practices". Read from the abstract.
- **Nx "s1ngularity"** ([Nx postmortem, 5 Sep 2025](https://nx.dev/blog/s1ngularity-postmortem), [advisory](https://github.com/advisories/GHSA-cxm3-wv7p-598c)): malicious Nx versions, live for about 4 hours on 26–27 Aug 2025, "attempted to use local AI tools (like Claude and Gemini)" to search the disk for secrets, then posted them to GitHub. The exact flags are reported only in secondary analyses such as [Snyk's](https://snyk.io/blog/weaponizing-ai-coding-agents-for-malware-in-the-nx-malicious-package), so the page does not name them. Lesson: an agent that runs with no limits is a tool any local code can use.
- **Package hallucination** ([Spracklen et al., USENIX Security 2025](https://arxiv.org/abs/2406.10279)): across 16 models, at least 5.2% of suggested packages from commercial models and 21.7% from open models did not exist; 205,474 unique made-up names. Attackers can register such names. (Read from the abstract only.)
- **Invariant case detail**: the attack ran in the researchers' demo repositories, not against real victims.

### What the evidence says (for chapters 5 and 6, and "What AI has changed")

- **METR 2025** ([10 Jul 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)): 16 experienced open-source developers, 246 tasks in their own repos. Expected 24% faster; afterwards believed 20% faster; measured 19% slower (CI +2% to +39%, given in the 2026 post). METR now marks it "out of date".
- **METR 2026 rerun** ([24 Feb 2026](https://metr.org/blog/2026-02-24-uplift-update/)): 57 developers, 800+ tasks. Estimates −18% (CI −38% to +9%) for returning developers and −4% (CI −15% to +9%) for new ones. METR calls this "an unreliable signal": many developers would not work without AI, and 30–50% held back tasks they did not want to do without it. METR thinks developers are probably faster now but has "only very weak evidence for the size".
- **METR survey** ([11 May 2026](https://metr.org/blog/2026-05-11-ai-usage-survey/)): 349 technical workers; median self-reported value 1.4–2×. METR: "survey results are not necessarily grounded in reality."
- **DORA 2025** ([Google Cloud, 24 Sep 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report), [dora.dev](https://dora.dev/dora-report-2025/)): nearly 5,000 respondents; 90% use AI at work; over 80% say it raised their productivity; 30% trust AI-generated code little or not at all. AI adoption relates positively to throughput, but "continue[s] to have a negative relationship with software delivery stability". "AI doesn't fix a team; it amplifies what's already there." Seven capabilities in the DORA AI Capabilities Model: clear AI stance, healthy data ecosystems, AI-accessible internal data, strong version control, small batches, user-centric focus, quality internal platforms. No 2026 DORA report found on [dora.dev/research](https://dora.dev/research/).
- **Stack Overflow 2026 survey** ([blog, 6 Oct 2026](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/), [AI section](https://survey.stackoverflow.co/2026/ai)): over 30,000 respondents. 48% trust AI "when they can easily validate the answers"; human-in-the-loop is the main way of working; the top reason to avoid AI is "Concern over losing job skills or training an AI to replace you" (17.1% of 13,857; [data](https://survey.stackoverflow.co/2026/ai/data/ai-avoid)). Some figures on the page do not agree with each other (daily use), so use only the trust and skills figures.
- **Anthropic skill study** ([29 Jan 2026](https://www.anthropic.com/research/AI-assistance-coding-skills), [arXiv 2601.20245 v3](https://arxiv.org/html/2601.20245v3)): randomised trial, 52 mostly junior engineers (26 per group) learning the Trio library. The AI group had a chat assistant (GPT-4o) that could see their code and write the full solution. Paper §5.2.2: "a 4.15 point difference … For a 27-point quiz, this translates into a 15.4% score difference" (d = 0.738, p = 0.01). The blog's 50% against 67% does not match the paper; use the paper; about 2 minutes faster, not significant. The biggest gap was in debugging. Low scores (under 40%): AI delegation, progressive reliance, iterative AI debugging. High scores (65% or more): generation-then-comprehension, hybrid code-explanation, conceptual inquiry. Patterns are qualitative, not causal; sample small; the tool was a chat sidebar, not an agent, and the authors expect agents to have a larger effect.
- **Model-based permission checks are spreading.** Claude Code's `auto` mode (a classifier reviews each action; now the starting mode), Copilot's assisted permissions (GA 26 Oct 2026) and Codex's auto-review all let a model decide which actions need a person. Claude Code's docs: auto mode "does not guarantee safety". The sandbox and deny rules still apply underneath. Sources above.
- **Anthropic internal report** ([2 Dec 2025](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic)): over half of the engineers surveyed said they can "fully delegate" only 0–20% of their work. Self-report from one company; the report says it likely does not generalise.

### Tool labels (revised after the audit)

"How widely used" needs a denominator. The only primary one is the Stack Overflow 2026 survey: "Have you used any of the following coding agents or assistants in the past year?", n = 12,255 who answered ([data](https://survey.stackoverflow.co/2026/ai/data/ai-code-agent)): Claude Code 65.5%, GitHub Copilot 58.7%, OpenAI Codex 29.5%, Cursor 25.5%, Google Antigravity 16.0%, Gemini Code Assist 14.6%. Kiro: 2.8% of 13,193 in the IDE question ([data](https://survey.stackoverflow.co/2026/technology/data/dev-ide)). This measures individual developers who answered, not teams.

| Tool | How widely used | How mature | Basis |
|---|---|---|---|
| Claude Code | Standard | Stable | 65.5% of survey users |
| GitHub Copilot | Standard | Stable | 58.7%; cloud agent, code review and CLI GA |
| Codex | Growing | Stable | 29.5%; "Growing" needs a trend source (OpenAI's own usage post, not yet read) or stays unverified |
| Cursor | Growing (judgement) | Stable | 25.5% |
| Gemini CLI | Not labelled | Stable for enterprise; Retired for individuals (replaced by Antigravity CLI, 18 Jun 2026) | Google blog, README |
| AGENTS.md | Not measured | Stable | Read by most agents above; its own count of 60k projects |
| CLAUDE.md, skills, subagents, hooks | Not measured | Stable | Vendor docs only |
| MCP | Not measured | Stable (spec 2026-07-28); Registry in preview | Spec, FAQ |
| Sandboxes | Not measured | Stable | Default in Codex; off by default in Claude Code |
| CodeRabbit | Not measured | Stable (PR review); Experimental (CLI, open beta) | Docs |
| Copilot code review | Not measured separately | Stable | GA |
| GitHub Spec Kit | Not measured | Stable | v1.4.5 |
| Kiro | 2.8% (IDE question) | Stable | GA 17 Nov 2025 |

Not verified, not used: usage share for Cursor, Codex and Kiro; any claim that spec-first tools improve outcomes (no independent study found).

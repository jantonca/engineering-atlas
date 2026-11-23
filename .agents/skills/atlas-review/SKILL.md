---
name: atlas-review
description: Review Engineering Atlas changes for correctness, teaching accuracy, visual quality and unnecessary complexity. Use for a diff, branch, lesson, component, or pre-commit review. Stay read-only unless fixes are explicitly requested; do not turn a focused review into a whole-repository audit.
---
# Atlas Review

Use the applicable `AGENTS.md` as the standard. Review independently of the author's summary; inspect the evidence yourself.

## Inspect

1. Use the requested files or diff. Otherwise inspect staged, unstaged and relevant untracked changes and state that scope. For a branch review, establish the correct base rather than assuming `main`. Read affected callers and surrounding content before calling something a bug.
2. Review without editing source files. Run relevant, non-destructive checks using existing tools; do not add a review framework, change dependencies, deploy or fix anything unless requested.
3. Check only applicable concerns: broken behaviour, unsafe handling, avoidable client-side work, duplication, or abstractions without a current need. Report a concrete consequence, not a preferred coding style.
4. Check teaching accuracy: trace diagrams against the prose, test the reasoning in examples and answers, and verify material current claims against primary sources. Flag misleading simplifications, unsupported tool labels and missing trade-offs; do not expand this into unrelated research.
5. For visible changes, open affected pages around 390px and 1440px in both themes. First scan the page: can the learner find the main idea and next section? Then trace a diagram and complete a self-test where present. Check keyboard use, zoom, overflow and controls under the existing accessibility rules. A screenshot supports appearance checks, not proof that interaction works.
6. Run the relevant existing build, checks or tests. Separate new regressions from pre-existing issues. When browser access, sources or checks are unavailable, state the gap rather than implying success.

## Report

- Start with **Ready**, **Needs changes**, or **Not fully verified**. Do not use Ready while a material check is missing; report known problems even when verification is incomplete.
- List actionable findings, most important first: **Must fix** or **Improve** | file:line or page/element | evidence and user impact | smallest useful fix.
- Group duplicate causes. Omit taste-only nitpicks and speculative failures; never invent issues to fill a quota. Say when no actionable findings were found, without claiming the whole site is flawless.
- End with checks actually run and any gaps. Keep the report short; do not hide real blockers to meet a word limit. If fixes were requested, make scoped changes and rerun affected checks.

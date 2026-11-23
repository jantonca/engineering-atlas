# Agent skills

Two repo skills add workflows on top of `AGENTS.md`; project rules stay in `AGENTS.md`.

The canonical files are in `.agents/skills/`. `.claude/skills/` holds relative symlinks to them, so both clients read the same instructions. Edit only the canonical files and commit the symlinks.

| Task | Claude Code | Codex |
| --- | --- | --- |
| Create a lesson | `/visual-lesson Build the first frontend system design lesson.` | `$visual-lesson Build the first frontend system design lesson.` |
| Review changes | `/atlas-review Review the current changes. Do not edit.` | `$atlas-review Review the current changes. Do not edit.` |

The review reports evidence, impact and the smallest useful fix. It does not change source files unless explicitly asked. Browser inspection needs browser tools already available to the agent; unavailable checks must be reported.

References (checked 23 November 2026):

- Codex skills: https://developers.openai.com/codex/skills
- Claude Code skills: https://code.claude.com/docs/en/skills
